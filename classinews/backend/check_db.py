from sqlalchemy import create_engine, inspect, text
from sqlalchemy.orm import sessionmaker
import os
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")
print(f"Connecting to: {DATABASE_URL}")

try:
    engine = create_engine(DATABASE_URL)
    connection = engine.connect()
    print("Connection successful!")
    
    inspector = inspect(engine)
    tables = inspector.get_table_names()
    print(f"Tables found: {tables}")
    
    for table in tables:
        result = connection.execute(text(f"SELECT COUNT(*) FROM {table}"))
        count = result.scalar()
        print(f"Table '{table}' has {count} rows.")
        
    connection.close()
except Exception as e:
    print(f"Error: {e}")
