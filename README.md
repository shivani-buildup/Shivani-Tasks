# Task 3: Authentication Flow

## Overview
This task implements a JWT-based authentication flow on top of the Task 2 REST API. It includes user registration, login, protected task endpoints, and a React frontend to manage authentication.

## Tech Stack
**Backend**: FastAPI, SQLAlchemy, PostgreSQL/SQLite, PassLib (Bcrypt), Python-JOSE (JWT)
**Frontend**: React (Vite), React Router, Lucide Icons, Vanilla CSS

## Setup Instructions

### Backend Setup
1. Navigate to the `Task_3` folder.
2. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   .\venv\Scripts\activate   # Windows
   source venv/bin/activate  # Mac/Linux
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Run the FastAPI server:
   ```bash
   uvicorn main:app --reload
   ```
   The backend will run at `http://localhost:8000`.

### Frontend Setup
1. Open a new terminal and navigate to `Task_3/auth-frontend`.
2. Install Node dependencies:
   ```bash
   npm install
   ```
3. Run the Vite development server:
   ```bash
   npm run dev
   ```
   The frontend will run at `http://localhost:5173`.

## Features
- **Secure Hashing**: Passwords are securely hashed using bcrypt.
- **JWT Authorization**: All `/tasks` routes require a valid Bearer token.
- **User Segregation**: Users can only fetch, create, and update their own tasks.
- **Modern UI**: A premium React UI built with dark mode semantics and Lucide icons.
- **Session Management**: Handled via `localStorage` on the frontend with automatic redirects upon token expiry (401 Unauthorized).
