# AI Usage Notes - Task 4

## Parts used AI for:
- Initial project scaffolding for FastAPI and Docker Compose.
- CSS glassmorphism styling and animation transitions.
- Logic for collision-free short code generation.

## Prompts that worked well:
- "Create a premium, dark-mode glassmorphism UI for a URL shortener using React and Framer Motion."
- "FastAPI endpoint for redirection that increments a database field safely."

## What I had to fix/rewrite:
- **Import Paths**: Fixed relative imports in FastAPI for the Docker environment.
- **CORS Configuration**: Had to specifically allow the Vite port to ensure the frontend could talk to the backend during local development.
- **URL Validation**: Replaced manual regex with the `validators` library for better reliability.
