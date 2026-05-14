from datetime import datetime
from typing import Optional
from pydantic import BaseModel, Field, EmailStr
from models import TaskStatus

class UserCreate(BaseModel):
    email: EmailStr
    password: str = Field(..., min_length=6)

class UserResponse(BaseModel):
    id: int
    email: str
    created_at: datetime

    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str

class TaskBase(BaseModel):

    title: str = Field(..., min_length=1, max_length=200, description="Title of the task")
    description: Optional[str] = Field(None, description="Detailed task description")
    status: TaskStatus = Field(default=TaskStatus.TODO, description="Task status (todo, in_progress, done)")

class TaskCreate(TaskBase):
    pass

class TaskUpdate(BaseModel):
    title: Optional[str] = Field(None, min_length=1, max_length=200, description="Title of the task")
    description: Optional[str] = Field(None, description="Detailed task description")
    status: Optional[TaskStatus] = Field(None, description="Task status (todo, in_progress, done)")

class TaskResponse(BaseModel):
    id: int
    title: str
    description: Optional[str]
    status: TaskStatus
    created_at: datetime
    updated_at: datetime

    class Config:
        # Pydantic v2 configuration to allow working with ORM models
        from_attributes = True
