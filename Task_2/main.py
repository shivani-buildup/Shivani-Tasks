from typing import List, Optional
from fastapi import FastAPI, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session
import models
import schemas
from database import engine, get_db

# Automatically create database tables on application startup (SQLite/PostgreSQL)
models.Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Tasks Management REST API",
    description="A highly optimized, robust, and secure backend REST API for managing tasks, built using FastAPI, SQLAlchemy, and PostgreSQL/SQLite.",
    version="1.0.0"
)

# API ROOT welcome route
@app.get("/", tags=["Root"])
def root_welcome():
    return {
        "status": "online",
        "message": "Welcome to the Tasks Management REST API! Explore documentation at /docs",
        "documentation": "/docs"
    }

# 1. POST /tasks: Create a new task (Status: 201 Created)
@app.post("/tasks", response_model=schemas.TaskResponse, status_code=status.HTTP_201_CREATED, tags=["Tasks"])
def create_task(task: schemas.TaskCreate, db: Session = Depends(get_db)):
    db_task = models.Task(
        title=task.title,
        description=task.description,
        status=task.status
    )
    db.add(db_task)
    db.commit()
    db.refresh(db_task)
    return db_task

# 2. GET /tasks: List tasks with status filtering and pagination
@app.get("/tasks", response_model=List[schemas.TaskResponse], tags=["Tasks"])
def get_tasks(
    status_filter: Optional[models.TaskStatus] = Query(None, alias="status", description="Filter tasks by status (todo, in_progress, done)"),
    page: int = Query(1, ge=1, description="Page number (starting from 1)"),
    limit: int = Query(20, ge=1, le=100, description="Number of items per page"),
    db: Session = Depends(get_db)
):
    query = db.query(models.Task)
    
    # Apply filtering if status_filter is supplied
    if status_filter:
        query = query.filter(models.Task.status == status_filter)
    
    # Calculate offset and slice list for pagination
    offset = (page - 1) * limit
    tasks = query.order_by(models.Task.id.desc()).offset(offset).limit(limit).all()
    return tasks

# 3. GET /tasks/{id}: Retrieve a single task by ID
@app.get("/tasks/{id}", response_model=schemas.TaskResponse, tags=["Tasks"])
def get_task_by_id(id: int, db: Session = Depends(get_db)):
    db_task = db.query(models.Task).filter(models.Task.id == id).first()
    if not db_task:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, 
            detail=f"Task with ID {id} does not exist"
        )
    return db_task

# 4. PATCH /tasks/{id}: Partial update of task attributes
@app.patch("/tasks/{id}", response_model=schemas.TaskResponse, tags=["Tasks"])
def update_task(id: int, task_update: schemas.TaskUpdate, db: Session = Depends(get_db)):
    db_task = db.query(models.Task).filter(models.Task.id == id).first()
    if not db_task:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, 
            detail=f"Task with ID {id} does not exist"
        )
    
    # Exclude non-provided fields to execute a true PATCH partial-update
    update_data = task_update.dict(exclude_unset=True)
    if not update_data:
        # Return untouched task if no update parameters are passed
        return db_task
        
    for key, value in update_data.items():
        setattr(db_task, key, value)
        
    db.commit()
    db.refresh(db_task)
    return db_task

# 5. DELETE /tasks/{id}: Remove a task by ID
@app.delete("/tasks/{id}", status_code=status.HTTP_200_OK, tags=["Tasks"])
def delete_task(id: int, db: Session = Depends(get_db)):
    db_task = db.query(models.Task).filter(models.Task.id == id).first()
    if not db_task:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, 
            detail=f"Task with ID {id} does not exist"
        )
        
    db.delete(db_task)
    db.commit()
    return {
        "status": "success",
        "message": f"Task with ID {id} has been successfully deleted"
    }
