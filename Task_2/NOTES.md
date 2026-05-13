# 📝 AI Usage Notes - Task 2

This document outlines how AI was leveraged during the development of the secure Tasks REST API with FastAPI, the prompts that yielded the best results, and the critical manual overrides made to ensure production-grade performance.

---

### 🧠 1. Parts Built Using AI

- **FastAPI Router Structuring**: Boilerplate route definitions for GET, POST, PATCH, and DELETE.
- **SQLAlchemy Schema Definitions**: Mapping task model attributes to appropriate database data types.
- **Pydantic Validation Scaffolding**: Initial schema attributes for request/response serialization.

---

### 💬 2. Prompts That Worked Well

1. **For Database Modeling**:
   > *"Write a models.py file using SQLAlchemy 2.0. Define a 'Task' class mapping to 'tasks' table. Attributes: id (PK), title (non-nullable string max 200), description (optional text), status (enum values: todo, in_progress, done with default as todo), created_at and updated_at datetime stamps."*

2. **For Schema Validations**:
   > *"Write schemas.py containing Pydantic schemas for Task validation (TaskCreate, TaskUpdate, TaskResponse). Ensure constraints are applied so title is restricted to 200 characters and status enforces the string enum. Ensure it is compatible with Pydantic V2."*

---

### 🛠️ 3. Manual Corrections & Customizations

Several manual rewrites were made to the AI's output to guarantee the code is warning-free, highly compatible, and fully stable:

1. **Pydantic V2/V1 Hybrid Compatibility**:
   - *Problem*: The AI-generated models used Pydantic v1's `class Config: orm_mode = True` which triggers warning messages in Pydantic v2.
   - *Fix*: Manual update of `schemas.py` to use both `from_attributes = True` (Pydantic v2 standard) and `orm_mode = True` (Pydantic v1 fallback), guaranteeing it runs smoothly regardless of the examiner's local python package versions.
2. **SQLite Thread Safety for Local Tests**:
   - *Problem*: The AI set a generic `create_engine(DATABASE_URL)` which triggers thread-lock crashes in multi-threaded FastAPI servers when using the local SQLite fallback.
   - *Fix*: Appended `connect_args={"check_same_thread": False}` when a SQLite connection string is detected, ensuring flawless out-of-the-box local testing.
3. **Database Migration Initialization**:
   - *Problem*: The AI's routing script required manual table creation commands in a separate terminal.
   - *Fix*: Embedded `models.Base.metadata.create_all(bind=engine)` inside `main.py`'s startup execution block, ensuring all database tables auto-generate seamlessly upon running `uvicorn`.
