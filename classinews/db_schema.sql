-- Users Table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR UNIQUE NOT NULL,
    name VARCHAR,
    picture VARCHAR,
    hashed_password VARCHAR,
    provider VARCHAR DEFAULT 'local',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Categories Table
CREATE TABLE IF NOT EXISTS categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR UNIQUE NOT NULL
);

-- Articles Table
CREATE TABLE IF NOT EXISTS articles (
    id SERIAL PRIMARY KEY,
    title VARCHAR,
    content TEXT,
    category_id INTEGER REFERENCES categories(id),
    user_id INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
