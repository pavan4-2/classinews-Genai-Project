from fastapi import FastAPI, Depends, HTTPException, status, Header
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
import models, schemas, auth, database, classifier
from database import engine

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

# CORS
origins = [
    "http://localhost:5173", # Vite default
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Helper function to get user_id from email
def get_user_id_from_email(email: str, db: Session) -> int:
    """Get user ID from email"""
    user = db.query(models.User).filter(models.User.email == email).first()
    if not user:
        raise HTTPException(status_code=401, detail="User not found")
    return user.id

@app.post("/auth/google", response_model=schemas.Token)
def google_login(token_data: schemas.Token, db: Session = Depends(database.get_db)):
    user_info = auth.verify_google_token(token_data.access_token)
    if not user_info:
        raise HTTPException(status_code=400, detail="Invalid token")
    
    email = user_info['email']
    name = user_info.get('name')
    picture = user_info.get('picture')
    
    user = db.query(models.User).filter(models.User.email == email).first()
    if not user:
        user = models.User(email=email, name=name, picture=picture, provider="google")
        db.add(user)
        db.commit()
        db.refresh(user)
    
    return {"access_token": token_data.access_token, "token_type": "bearer", "user_email": email}

from passlib.context import CryptContext
import hashlib

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def verify_password(plain_password, hashed_password):
    # Hash the incoming password the same way before verifying
    plain_password = _truncate_password(plain_password)
    try:
        return pwd_context.verify(plain_password, hashed_password)
    except ValueError:
        return False

def _truncate_password(password):
    """Truncate password to 72 bytes safely"""
    password_bytes = password.encode('utf-8')
    if len(password_bytes) > 72:
        return password_bytes[:72].decode('utf-8', errors='ignore')
    return password

def get_password_hash(password):
    # Truncate password to 72 bytes before hashing
    password = _truncate_password(password)
    return pwd_context.hash(password)

@app.post("/auth/register", response_model=schemas.User)
def register(user: schemas.UserCreateLocal, db: Session = Depends(database.get_db)):
    db_user = db.query(models.User).filter(models.User.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    try:
        hashed_password = get_password_hash(user.password)
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Password hashing failed: {str(e)}")
    
    try:
        new_user = models.User(
            email=user.email, 
            name=user.name, 
            hashed_password=hashed_password, 
            provider="local"
        )
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
        return new_user
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=400, detail=f"Registration failed: {str(e)}")

@app.post("/auth/login", response_model=schemas.Token)
def login(user: schemas.UserLogin, db: Session = Depends(database.get_db)):
    db_user = db.query(models.User).filter(models.User.email == user.email).first()
    if not db_user:
        raise HTTPException(status_code=400, detail="Invalid credentials")
    
    try:
        if not verify_password(user.password, db_user.hashed_password):
            raise HTTPException(status_code=400, detail="Invalid credentials")
    except ValueError:
        # Bcrypt limitation: password too long
        raise HTTPException(status_code=400, detail="Invalid credentials")
        
    # Return token with user email
    return {"access_token": f"local-user-{db_user.id}", "token_type": "bearer", "user_email": db_user.email}

@app.post("/classify", response_model=schemas.Article)
def classify_article(
    article: schemas.ArticleCreate, 
    db: Session = Depends(database.get_db),
    user_email: str = Header(None)
):
    if not user_email:
        raise HTTPException(status_code=401, detail="User email not provided")
    
    user_id = get_user_id_from_email(user_email, db)
    
    category_name = classifier.classifier.predict(article.content)
    if not category_name:
        category_name = "Unclassified"
        
    # Check if category exists
    category = db.query(models.Category).filter(models.Category.name == category_name).first()
    if not category:
        category = models.Category(name=category_name)
        db.add(category)
        db.commit()
        db.refresh(category)
        
    db_article = models.Article(
        title=article.title, 
        content=article.content, 
        category_id=category.id,
        user_id=user_id
    )
    db.add(db_article)
    db.commit()
    db.refresh(db_article)
    return db_article

@app.get("/articles", response_model=list[schemas.Article])
def get_articles(
    skip: int = 0, 
    limit: int = 100, 
    db: Session = Depends(database.get_db),
    user_email: str = Header(None)
):
    if not user_email:
        raise HTTPException(status_code=401, detail="User email not provided")
    
    user_id = get_user_id_from_email(user_email, db)
    
    articles = db.query(models.Article).filter(
        models.Article.user_id == user_id
    ).offset(skip).limit(limit).all()
    return articles

from fastapi import File, UploadFile
from fastapi.responses import StreamingResponse
import batch_processor
import io

@app.post("/upload")
async def upload_file(
    file: UploadFile = File(...), 
    db: Session = Depends(database.get_db),
    user_email: str = Header(None)
):
    if not user_email:
        raise HTTPException(status_code=401, detail="User email not provided")
    
    user_id = get_user_id_from_email(user_email, db)
    content = await file.read()
    result = batch_processor.process_csv(content, db, user_id)
    return result

@app.get("/export")
def export_results(
    db: Session = Depends(database.get_db),
    user_email: str = Header(None)
):
    if not user_email:
        raise HTTPException(status_code=401, detail="User email not provided")
    
    user_id = get_user_id_from_email(user_email, db)
    csv_content = batch_processor.export_articles_csv(db, user_id)
    
    response = StreamingResponse(io.StringIO(csv_content), media_type="text/csv")
    response.headers["Content-Disposition"] = "attachment; filename=classification_results.csv"
    return response
