# AI Usage Notes - Task 5

## Parts completed using AI
- **Schema Design:** I used AI to brainstorm the necessary tables for a standard e-commerce system and to ensure the normalization rules were followed.
- **PostgreSQL Syntax:** AI assisted in writing the correct syntax for `CHECK` constraints and the `TRIGGER` function for automatic `updated_at` timestamps.
- **Rationale Writing:** AI helped structure the explanation for handling price changes and indexing.

## Prompts that worked well
- "Design a PostgreSQL schema for an e-commerce site with users, products, categories, orders, order_items, and addresses. Ensure historical price integrity."
- "Write a PostgreSQL trigger function to update the updated_at column on every row update."

## Fixes and Rewrites
- **Price Integrity:** I initially forgot to add the `unit_price` to `order_items`, which would have broken historical orders if a product price changed. I caught this during the design phase and added it to the `order_items` table.
- **Address Relationships:** I initially considered putting address fields directly in the `orders` table, but decided to link them to the `addresses` table to allow users to reuse addresses and maintain a cleaner schema.
- **Constraints:** Added strict `CHECK` constraints to prevent negative prices or quantities, ensuring data quality.
