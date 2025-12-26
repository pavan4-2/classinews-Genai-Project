from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class UserBase(BaseModel):
    email: str
    name: Optional[str] = None
    picture: Optional[str] = None

class UserCreate(UserBase):
    pass

class UserCreateLocal(UserBase):
    password: str

class UserLogin(BaseModel):
    email: str
    password: str

class User(UserBase):
    id: int
    provider: str
    created_at: datetime

    class Config:
        from_attributes = True

class Category(BaseModel):
    id: int
    name: str

    class Config:
        from_attributes = True

class ArticleBase(BaseModel):
    title: str
    content: str

class ArticleCreate(ArticleBase):
    pass

class Article(ArticleBase):
    id: int
    category: Optional[Category] = None
    created_at: datetime
    user_id: Optional[int] = None

    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str
    user_email: Optional[str] = None

class TokenData(BaseModel):
    email: Optional[str] = None
