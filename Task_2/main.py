from typing import List, Optional
from fastapi import FastAPI, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session
import models
import schemas
from database import engine, get_db

# Automatically create database tables on application startup (SQLite/PostgreSQL)
models.Base.metadata.create_all(bind=engine)

from fastapi.openapi.docs import get_swagger_ui_html
from fastapi.responses import HTMLResponse

app = FastAPI(
    title="Tasks Management REST API",
    description="A highly optimized, robust, and secure backend REST API for managing tasks, built using FastAPI, SQLAlchemy, and PostgreSQL/SQLite.",
    version="1.0.0",
    docs_url=None  # Disable default Swagger UI to use our custom themed version below
)

@app.get("/docs", include_in_schema=False)
def custom_swagger_ui_html():
    swagger_html = get_swagger_ui_html(
        openapi_url=app.openapi_url,
        title=app.title + " - Premium Dark UI",
        swagger_js_url="https://cdn.jsdelivr.net/npm/swagger-ui-dist@5/swagger-ui-bundle.js",
        swagger_css_url="https://cdn.jsdelivr.net/npm/swagger-ui-dist@5/swagger-ui.css",
    )
    
    # Modern Premium Dark Blue Slate Theme for Swagger UI (matching Task 1's colors exactly)
    custom_css = """
    <style>
        body {
            background-color: #0f172a !important; /* slate-900 */
            color: #f1f5f9 !important; /* slate-100 */
            font-family: 'Outfit', 'Inter', sans-serif !important;
        }
        .swagger-ui {
            background-color: #0f172a !important;
            filter: invert(0) !important;
        }
        .swagger-ui .info .title {
            color: #38bdf8 !important; /* Sky blue / Cyan */
            text-shadow: 0 0 10px rgba(56, 189, 248, 0.2);
        }
        .swagger-ui .info, .swagger-ui .info p, .swagger-ui .info a, .swagger-ui .info li {
            color: #94a3b8 !important; /* slate-400 */
        }
        .swagger-ui .scheme-container {
            background-color: #1e293b !important; /* slate-800 card */
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3) !important;
            border: 1px solid rgba(148, 163, 184, 0.1) !important;
            border-radius: 12px !important;
        }
        .swagger-ui .opblock {
            background-color: #1e293b !important; /* slate-800 card */
            border-radius: 12px !important;
            border: 1px solid rgba(148, 163, 184, 0.1) !important;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2) !important;
            transition: all 0.3s ease !important;
        }
        .swagger-ui .opblock:hover {
            transform: translateY(-2px) !important;
            border-color: rgba(56, 189, 248, 0.4) !important;
            box-shadow: 0 8px 30px rgba(56, 189, 248, 0.15) !important;
        }
        .swagger-ui .opblock .opblock-summary-path {
            color: #f1f5f9 !important;
        }
        .swagger-ui .opblock .opblock-summary-description {
            color: #94a3b8 !important;
        }
        .swagger-ui .opblock-tag {
            color: #38bdf8 !important;
            border-bottom: 1px solid rgba(56, 189, 248, 0.2) !important;
        }
        .swagger-ui .opblock-tag:hover {
            background-color: rgba(56, 189, 248, 0.05) !important;
        }
        .swagger-ui section.models {
            border: 1px solid rgba(56, 189, 248, 0.15) !important;
            border-radius: 16px !important;
            background: rgba(30, 41, 59, 0.7) !important;
            backdrop-filter: blur(12px) !important;
            box-shadow: 0 10px 45px rgba(0, 0, 0, 0.4) !important;
            padding: 10px 15px !important;
        }
        .swagger-ui section.models h4 {
            color: #38bdf8 !important;
            font-size: 18px !important;
            font-weight: 700 !important;
            letter-spacing: 0.8px !important;
            text-transform: uppercase !important;
            border-bottom: 1px solid rgba(56, 189, 248, 0.1) !important;
            padding-bottom: 10px !important;
            margin-bottom: 15px !important;
        }
        .swagger-ui section.models h4 svg {
            fill: #38bdf8 !important;
        }
        .swagger-ui section.models .model-container {
            background-color: #0f172a !important;
            border: 1px solid rgba(148, 163, 184, 0.08) !important;
            border-radius: 12px !important;
            margin: 12px 0 !important;
            padding: 8px 12px !important;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
        }
        .swagger-ui section.models .model-container:hover {
            transform: translateY(-2px) !important;
            border-color: rgba(56, 189, 248, 0.35) !important;
            box-shadow: 0 8px 30px rgba(56, 189, 248, 0.12) !important;
            background-color: #111b30 !important;
        }
        .swagger-ui .model-box {
            background-color: transparent !important;
            color: #94a3b8 !important;
        }
        .swagger-ui .model-title {
            color: #f1f5f9 !important;
            font-size: 15px !important;
            font-weight: 600 !important;
            letter-spacing: 0.5px !important;
        }
        .swagger-ui .model-box-control {
            outline: none !important;
        }
        .swagger-ui .model-box-control:hover .model-title {
            color: #38bdf8 !important;
        }
        .swagger-ui .model-toggle {
            fill: #38bdf8 !important;
        }
        .swagger-ui .prop-name {
            color: #38bdf8 !important;
            font-weight: 600 !important;
        }
        .swagger-ui .prop-type {
            color: #94a3b8 !important;
        }
        .swagger-ui .model .property {
            border-bottom: 1px solid rgba(148, 163, 184, 0.05) !important;
            padding: 8px 0 !important;
        }
        .swagger-ui .model-box .model-jump-to-path {
            color: #38bdf8 !important;
        }
        .swagger-ui select, .swagger-ui input[type=text] {
            background-color: #0f172a !important;
            color: #f1f5f9 !important;
            border: 1px solid rgba(56, 189, 248, 0.2) !important;
            border-radius: 6px !important;
        }
        .swagger-ui .btn {
            background-color: #3b82f6 !important; /* primary blue matching React buttons */
            color: #ffffff !important;
            border: none !important;
            font-weight: bold !important;
            border-radius: 8px !important;
            transition: all 0.2s ease !important;
        }
        .swagger-ui .btn:hover {
            background-color: #2563eb !important;
            box-shadow: 0 0 15px rgba(59, 130, 246, 0.4) !important;
        }
        .swagger-ui .opblock.opblock-post {
            border-left: 5px solid #10b981 !important;
            background-color: rgba(16, 185, 129, 0.05) !important;
        }
        .swagger-ui .opblock.opblock-get {
            border-left: 5px solid #3b82f6 !important;
            background-color: rgba(59, 130, 246, 0.05) !important;
        }
        .swagger-ui .opblock.opblock-patch {
            border-left: 5px solid #eab308 !important;
            background-color: rgba(234, 179, 8, 0.05) !important;
        }
        .swagger-ui .opblock.opblock-delete {
            border-left: 5px solid #ef4444 !important;
            background-color: rgba(239, 68, 68, 0.05) !important;
        }
        .swagger-ui .opblock.opblock-post .opblock-summary-method { background-color: #10b981 !important; }
        .swagger-ui .opblock.opblock-get .opblock-summary-method { background-color: #3b82f6 !important; }
        .swagger-ui .opblock.opblock-patch .opblock-summary-method { background-color: #eab308 !important; }
        .swagger-ui .opblock.opblock-delete .opblock-summary-method { background-color: #ef4444 !important; }
        
        .swagger-ui table thead tr td, .swagger-ui table thead tr th {
            color: #38bdf8 !important;
            border-bottom: 2px solid rgba(56, 189, 248, 0.2) !important;
        }
        .swagger-ui .parameters-col_name {
            color: #f1f5f9 !important;
        }
        .swagger-ui .responses-table {
            background-color: #0f172a !important;
        }
        .swagger-ui .response-col_status {
            color: #38bdf8 !important;
        }
        .swagger-ui .tabli {
            color: #94a3b8 !important;
        }
        .swagger-ui .tabli.active a {
            color: #38bdf8 !important;
        }
        .swagger-ui .responses-wrapper {
            background-color: #1e293b !important;
        }
        .swagger-ui .response-col_links {
            color: #94a3b8 !important;
        }
        .swagger-ui .model-box-control:focus {
            outline: none !important;
        }
    </style>
    """
    
    html_content = swagger_html.body.decode("utf-8")
    injected_html = html_content.replace("</head>", f"{custom_css}</head>")
    return HTMLResponse(content=injected_html, status_code=200)

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
