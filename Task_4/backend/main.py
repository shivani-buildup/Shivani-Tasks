from fastapi import FastAPI, Depends, HTTPException, Request
from fastapi.responses import RedirectResponse
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List
import validators

from . import models, schemas, utils
from .database import engine, get_db

models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="URL Shortener API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/shorten", response_model=schemas.URLInfo)
def shorten_url(url_in: schemas.URLCreate, db: Session = Depends(get_db)):
    if not validators.url(url_in.original_url):
        raise HTTPException(status_code=400, detail="Invalid URL")
    
    # Check if URL already shortened
    db_url = db.query(models.URL).filter(models.URL.original_url == url_in.original_url).first()
    if db_url:
        return db_url
    
    # Generate unique code
    short_code = utils.generate_short_code()
    while db.query(models.URL).filter(models.URL.short_code == short_code).first():
        short_code = utils.generate_short_code()
        
    db_url = models.URL(original_url=url_in.original_url, short_code=short_code)
    db.add(db_url)
    db.commit()
    db.refresh(db_url)
    return db_url

@app.get("/urls", response_model=List[schemas.URLInfo])
def get_urls(db: Session = Depends(get_db)):
    return db.query(models.URL).order_by(models.URL.created_at.desc()).all()

@app.get("/{short_code}")
def redirect_to_url(short_code: str, db: Session = Depends(get_db)):
    db_url = db.query(models.URL).filter(models.URL.short_code == short_code).first()
    if db_url:
        db_url.clicks += 1
        db.commit()
        return RedirectResponse(url=db_url.original_url)
    raise HTTPException(status_code=404, detail="Short URL not found")

@app.get("/stats/{short_code}", response_model=schemas.URLInfo)
def get_stats(short_code: str, db: Session = Depends(get_db)):
    db_url = db.query(models.URL).filter(models.URL.short_code == short_code).first()
    if db_url:
        return db_url
    raise HTTPException(status_code=404, detail="Short URL not found")
