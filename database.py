import os
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# Database URL: Support PostgreSQL via environment variable with an automatic SQLite fallback for ease of testing
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./tasks.db")

# For SQLite, we need to disable same thread checking
if DATABASE_URL.startswith("sqlite"):
    engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
else:
    engine = create_engine(DATABASE_URL)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

# Dependency to get db session in path operations
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
