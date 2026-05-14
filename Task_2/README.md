# ⚙️ Task 2: Tasks REST API (FastAPI)

This folder contains a secure, production-grade, and highly-optimized backend **REST API** built with **FastAPI** and **SQLAlchemy (v2.0)**. It supports full CRUD operations on tasks and stores the records in a relational database (**PostgreSQL** with an automatic local **SQLite** fallback for frictionless evaluation).

---

## ✨ Features Built

1. **Automatic Database Connection**: Works with a `DATABASE_URL` environment variable for production PostgreSQL, and gracefully falls back to creating a local `tasks.db` SQLite file for local developer testing.
2. **Schema & Input Validation**: Powered by **Pydantic (v2.0+)** to ensure that raw client input matches bounds (e.g., restricted title string lengths, enum bounds).
3. **Full CRUD Operations**:
   * `POST /tasks`: Adds a task (Returns `201 Created`).
   * `GET /tasks`: Lists all tasks with dynamic status query filtering and page/limit offset pagination.
   * `GET /tasks/{id}`: Returns a single task, or raises a structured `404 Not Found` if missing.
   * `PATCH /tasks/{id}`: Supports partial attribute updates (true `PATCH` behavior).
   * `DELETE /tasks/{id}`: Deletes a task cleanly.
4. **Interactive OpenAPI Docs**: Standard Swagger UI is available out-of-the-box at `/docs`.

---

## 🚀 How to Set Up and Run the API

Follow these simple steps to run the API locally on your machine:

1. **Navigate to the Project Directory**:
   ```bash
   cd Task_2
   ```

2. **Create a Python Virtual Environment** (Optional but Recommended):
   ```bash
   python -m venv venv
   venv\Scripts\activate
   ```

3. **Install Dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

4. **Run the FastAPI Development Server**:
   ```bash
   uvicorn main:app --reload
   ```

5. **Open Interactive Swagger Documentation**:
   Once the server starts, open [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs) in your browser to test each endpoint live!

---

## 📑 API Endpoints Summary

| Method | Endpoint | Description | Request Body | Query Parameters | Response Code |
| :---: | :--- | :--- | :---: | :---: | :---: |
| **GET** | `/` | Root Welcome | None | None | `200 OK` |
| **POST** | `/tasks` | Create Task | `TaskCreate` | None | `201 Created` |
| **GET** | `/tasks` | List Tasks | None | `status`, `page`, `limit` | `200 OK` |
| **GET** | `/tasks/{id}` | Get Task by ID | None | None | `200 OK` |
| **PATCH** | `/tasks/{id}`| Partial Update | `TaskUpdate` | None | `200 OK` |
| **DELETE**| `/tasks/{id}`| Delete Task | None | None | `200 OK` |

---

## ⚡ curl Examples for Testing

You can use these `curl` commands in your terminal to test the API directly:

### 1. Root Welcome API
```bash
curl -X GET "http://127.0.0.1:8000/"
```

### 2. Create a Task (POST)
```bash
curl -X POST "http://127.0.0.1:8000/tasks" \
     -H "Content-Type: application/json" \
     -d "{\"title\": \"Complete Full-Stack Assessment\", \"description\": \"Finish Part A of the evaluation\", \"status\": \"in_progress\"}"
```

### 3. List All Tasks with Pagination & Filtering (GET)
```bash
curl -X GET "http://127.0.0.1:8000/tasks?status=in_progress&page=1&limit=10"
```

### 4. Get a Specific Task by ID (GET)
```bash
curl -X GET "http://127.0.0.1:8000/tasks/1"
```

### 5. Partial Update of a Task (PATCH)
```bash
curl -X PATCH "http://127.0.0.1:8000/tasks/1" \
     -H "Content-Type: application/json" \
     -d "{\"status\": \"done\"}"
```

### 6. Delete a Task (DELETE)
```bash
curl -X DELETE "http://127.0.0.1:8000/tasks/1"
```

