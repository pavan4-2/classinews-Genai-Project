# Classinews

A full-stack news management and classification application with ML model.

---

## Project Objective

Classinews aims to create an intelligent news management platform that enables users to:
- Upload and manage news articles efficiently
- Automatically classify articles into appropriate categories using machine learning
- Access a centralized hub for viewing and organizing news content by category
- Provide a seamless user experience with secure authentication

---

## Project Outcomes

### Functional Outcomes
1. **User Authentication System** - Secure login with Google OAuth and email/password authentication
2. **Article Management** - Upload, store, and retrieve articles from a central database
3. **ML-Based Classification** - Automatic article categorization using trained ML models
4. **Category Management** - Organize articles into predefined and custom categories
5. **User Dashboard** - Personalized dashboard displaying user's articles and activity
6. **Search & Filter** - Browse articles by category and view user-specific content

### Technical Outcomes
1. **Scalable Backend API** - RESTful API built with FastAPI for high performance
2. **Responsive Frontend** - React application with Vite for fast development and builds
3. **Relational Database** - PostgreSQL schema with proper indexing and relationships
4. **ML Integration** - Scikit-learn models for content classification
5. **Security** - JWT-based authentication and secure password hashing
6. **CORS Support** - Cross-origin resource sharing for frontend-backend communication

---

## Quick Start

### Backend Setup
```bash
cd backend
python -m venv venv
venv\Scripts\activate  # Windows
pip install -r requirements.txt

# Create .env file with:
DATABASE_URL=postgresql://username:password@localhost:5432/classinews
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
SECRET_KEY=your_secret_key
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

# Setup database
psql -U postgres -d classinews -f db_schema.sql

# Run server
uvicorn main:app --reload --port 8000
```
Server runs at `http://localhost:8000`

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
App runs at `http://localhost:5173`

---

## Tech Stack

**Backend:** Python, FastAPI, SQLAlchemy, PostgreSQL, JWT Auth
**Frontend:** React 19, Vite, Axios, React Router
**ML:** Scikit-learn, NLTK
**Auth:** Google OAuth, JWT tokens

---

## Database Schema

### Users
- id, email (unique), name, picture, hashed_password, provider, created_at

### Categories
- id, name (unique)

### Articles
- id, title, content, category_id (FK), user_id (FK), created_at

---

## Main Features

- User authentication (Google OAuth + email/password)
- Upload and manage articles
- ML-based article classification
- View articles by category
- User dashboard and settings

---

## Key Files

**Backend:**
- `main.py` - API endpoints
- `auth.py` - Authentication
- `database.py` - Database connection
- `models.py` - SQLAlchemy models
- `classifier.py` - ML classification

**Frontend:**
- `src/pages/` - Page components (Home, Login, Dashboard, Upload, etc.)
- `src/components/` - Navbar components
- `src/api.js` - API calls to backend
- `src/styles/` - Component styling

---

## API Endpoints

**Auth:**
- `POST /auth/google` - Google login
- `POST /auth/login` - Email login
- `POST /auth/register` - Register user

**Articles:**
- `GET /articles/` - Get all articles
- `POST /articles/upload` - Upload article
- `GET /articles/category/{id}` - Articles by category
- `DELETE /articles/{id}` - Delete article

**Categories:**
- `GET /categories/` - Get all categories
- `POST /categories/` - Create category

---

## Troubleshooting

**Backend won't start:**
- PostgreSQL running?
- Database `classinews` exists?
- Check `.env` credentials

**Frontend won't load:**
- Node.js installed?
- `npm install` completed?
- Port 5173 available?

**API not working:**
- Both servers running?
- Check API URL in `src/api.js`
- CORS enabled in backend

---

