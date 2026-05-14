# AI Usage Notes - Task 3

## Parts I used AI for
- Setting up the FastAPI `OAuth2PasswordBearer` and JWT utility functions (hashing, verifying, token creation).
- Refactoring the Task 2 `main.py` code to integrate `Depends(get_current_user)` seamlessly.
- Scaffolding the React Vite application and setting up the initial `react-router-dom` boilerplate.
- Styling the premium login and signup interface, getting a sleek dark mode design using standard CSS properties.

## Prompts that worked well
- "Generate FastAPI JWT authentication utility functions using python-jose and passlib" - this quickly provided the standard secure `pwd_context` setup.
- "Create a premium dark mode CSS for a React login page" - resulted in the gorgeous `index.css` setup without having to install bulky component libraries.

## What I had to fix or rewrite
- I had to manually update the SQL relationships in `models.py` because the AI didn't properly link the `User` and `Task` with `back_populates` initially.
- The AI missed handling the `401 Unauthorized` token expiry on the React frontend properly, so I added an intercept to the `fetchTasks` function to clear `localStorage` and redirect to `/login` if `response.status === 401`.
- Tweaked the frontend environment setup to ensure `lucide-react` icons loaded perfectly with the new Vite scaffolding.
