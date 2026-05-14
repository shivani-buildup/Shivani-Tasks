# NOTES: Task 2 AI Usage & Logic

## 🤖 AI Usage
- **Custom Swagger UI:** I used AI to generate the CSS injection logic to make the `/docs` page match our premium dark theme.
- **SQLAlchemy Boilerplate:** Used AI to quickly scaffold the `database.py` and `models.py` files.

## 💡 Prompts Used
- *"How do I customize the CSS of FastAPI's Swagger UI documentation page?"*
- *"Write a FastAPI endpoint for listing items with pagination and status filtering using SQLAlchemy."*

## 🔧 Fixes & Rewrites
- **The Filter Bug:** Initially, the status filter was case-sensitive. I rewrote it to use SQLAlchemy Enums properly so it works seamlessly.
- **Validation:** Added a max character limit (200) to the Task title in Pydantic to match the project requirements.

## 🎓 Key Learnings
- Learned how to use `Depends(get_db)` to manage database sessions safely.
- Understood the importance of returning correct HTTP status codes (201 for create, 404 for missing items).
