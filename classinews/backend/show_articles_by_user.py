from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv
import os

load_dotenv()
DATABASE_URL = os.getenv("DATABASE_URL")

engine = create_engine(DATABASE_URL)
Session = sessionmaker(bind=engine)

with engine.connect() as conn:
    print(f"Connected to: {DATABASE_URL}")
    users = conn.execute(text("SELECT id, email FROM users ORDER BY id")).fetchall()
    if not users:
        print("No users found.")
    for user in users:
        uid = user[0]
        email = user[1]
        count = conn.execute(text("SELECT COUNT(*) FROM articles WHERE user_id = :uid"), {"uid": uid}).scalar()
        print(f"\nUser id={uid}, email={email} — articles={count}")
        rows = conn.execute(text(
            "SELECT id, title, substr(content,1,200) as snippet, created_at FROM articles WHERE user_id = :uid ORDER BY created_at DESC LIMIT 5"
        ), {"uid": uid}).fetchall()
        if not rows:
            print("  (no articles)")
        else:
            for r in rows:
                print(f"  article id={r[0]} title={r[1]!r} created_at={r[3]} snippet={r[2]!r}")

print("\nDone.")
