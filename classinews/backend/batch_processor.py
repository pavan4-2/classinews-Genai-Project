import pandas as pd
import io
from sqlalchemy.orm import Session
import models, classifier
from datetime import datetime

def process_csv(file_content: bytes, db: Session, user_id: int):
    try:
        df = pd.read_csv(io.BytesIO(file_content))
    except Exception as e:
        return {"error": f"Invalid CSV file: {str(e)}"}
    
    # Ensure required columns exist
    if 'title' not in df.columns or 'content' not in df.columns:
        return {"error": "CSV must have 'title' and 'content' columns"}
    
    results = []
    
    print(f"Processing CSV with {len(df)} rows...")
    for _, row in df.iterrows():
        title = row.get('title', '')
        content = row.get('content', '')
        
        if not content:
            continue
            
        category_name = classifier.classifier.predict(content)
        if not category_name:
            category_name = "Unclassified"
            
        # Get or create category
        category = db.query(models.Category).filter(models.Category.name == category_name).first()
        if not category:
            category = models.Category(name=category_name)
            db.add(category)
            db.commit()
            db.refresh(category)
            
        # Create article
        try:
            article = models.Article(
                title=title, 
                content=content, 
                category_id=category.id,
                user_id=user_id
            )
            db.add(article)
            results.append({
                "title": title,
                "category": category_name
            })
        except Exception as e:
            print(f"Error adding article: {e}")
            
    try:
        db.commit()
        print("Batch commit successful!")
    except Exception as e:
        print(f"Commit failed: {e}")
        db.rollback()
        return {"error": f"Database commit failed: {str(e)}"}
        
    return {"message": "Batch processing complete", "processed_count": len(results), "results": results}

def export_articles_csv(db: Session, user_id: int):
    articles = db.query(models.Article).filter(models.Article.user_id == user_id).all()
    
    data = []
    for article in articles:
        category_name = article.category.name if article.category else "Unclassified"
        data.append({
            "Title": article.title,
            "Content": article.content,
            "Category": category_name,
            "Date": article.created_at
        })
        
    df = pd.DataFrame(data)
    stream = io.StringIO()
    df.to_csv(stream, index=False)
    return stream.getvalue()
