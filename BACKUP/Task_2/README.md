# Task 2: Tasks REST API (FastAPI)

## 🚀 Overview
A high-performance Task Management API built with FastAPI and SQLAlchemy. Supports full CRUD operations and follows RESTful best practices.

## 🛠️ Features
- **Create Task:** `POST /tasks` with validation.
- **List Tasks:** `GET /tasks` with status filtering and pagination.
- **Update Task:** `PATCH /tasks/{id}` for partial updates.
- **Delete Task:** `DELETE /tasks/{id}` with proper error handling.
- **Premium Documentation:** Custom dark-themed Swagger UI at `/docs`.

## 🏃 How to Run
1. Navigate to: `cd Task_2`
2. Install requirements: `pip install -r requirements.txt`
3. Start server: `uvicorn main:app --reload`
4. Open: `http://127.0.0.1:8000/docs`

## 📡 API Examples (CURL)
### Create a Task:
```bash
curl -X 'POST' 'http://127.0.0.1:8000/tasks' \
-H 'Content-Type: application/json' \
-d '{"title": "Complete Task 5", "description": "Finish the SQL schema design"}'
```

### List Tasks (Filter by 'todo'):
```bash
curl -X 'GET' 'http://127.0.0.1:8000/tasks?status=todo&page=1&limit=10'
```

## 📝 Tech Choices
- **FastAPI:** For its speed and automatic documentation.
- **SQLAlchemy:** For robust database interaction.
- **SQLite (Default):** Used for easy testing, but fully compatible with PostgreSQL.
