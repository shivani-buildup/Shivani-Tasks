# Task 4: URL Shortener (End-to-End Mini Project)

A complete URL shortener application built with FastAPI, React, and PostgreSQL.

## Features
- **URL Shortening**: Convert long URLs into 6-character unique codes.
- **Redirection**: Instant redirection from short URL to original destination.
- **Click Tracking**: Analytics for each shortened URL.
- **Premium UI**: Dark-themed, glassmorphism design with smooth animations.
- **Edge Case Handling**: Validates URLs and handles non-existent codes.

## Tech Stack
- **Backend**: FastAPI, SQLAlchemy, PostgreSQL.
- **Frontend**: React, Vite, Framer Motion, Lucide React.
- **Infrastructure**: Docker & Docker Compose.

## How to Run
1. Ensure you have Docker and Docker Compose installed.
2. Navigate to the `Task_4` directory.
3. Run:
   ```bash
   docker-compose up --build
   ```
4. Access the app:
   - Frontend: `http://localhost:5173`
   - Backend API Docs: `http://localhost:8000/docs`

## API Endpoints
- `POST /shorten`: Creates a short code for a given URL.
- `GET /urls`: Fetches all shortened URLs and their stats.
- `GET /{short_code}`: Redirects to the original URL and increments click count.
- `GET /stats/{short_code}`: Returns statistics for a specific URL.
