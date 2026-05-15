# Task 5: Database Schema Design

This directory contains the database schema for a small e-commerce system, designed for **PostgreSQL**.

## Files
- `schema.sql`: Contains the `CREATE TABLE` statements, foreign keys, constraints, and indexes.

## Design Rationale

### Relationship Choices

1.  **Categories and Products (One-to-Many):**
    A category can house multiple products, but each product is typically assigned to one primary category for organized browsing. I used a foreign key `category_id` in the `products` table.
2.  **Users and Addresses (One-to-Many):**
    Users often have multiple addresses (Home, Work, Billing, Shipping). The `addresses` table links back to `users` via `user_id`. I included an `address_type` and an `is_default` flag to manage user preferences.
3.  **Users and Orders (One-to-Many):**
    A user can place many orders over time. The `orders` table includes a `user_id` to track ownership.
4.  **Orders and Addresses (Many-to-One):**
    Each order references specific shipping and billing addresses from the `addresses` table. This is handled via `shipping_address_id` and `billing_address_id` in the `orders` table. `ON DELETE RESTRICT` is used to prevent deleting an address that is linked to a historical order.
5.  **Orders and Order Items (One-to-Many):**
    An order consists of multiple products. The `order_items` table acts as a bridge, linking an order to various products with specific quantities.

### Handling Product Price Changes

One of the most critical aspects of e-commerce database design is ensuring that **historical order totals remain accurate** even if a product's price changes later.

To solve this, I implemented a **Snapshot Pattern**:
- The `products` table stores the *current* price of a product.
- The `order_items` table includes a `unit_price` column.
- **Mechanism:** When a user places an order, the system copies the current price from the `products` table into the `order_items.unit_price` column for that specific transaction.
- **Result:** If the price of "Product A" is changed from $50 to $60 in the `products` table next month, all previous orders in `order_items` will still show the $50 price they were purchased at.

### Performance Optimization (Indexes)

I added several indexes to ensure the system remains performant as the dataset grows:

1.  **`idx_products_category_id`**: Essential for fast filtering of products by category (e.g., "Show me all Electronics").
2.  **`idx_products_name`**: Added to support fast searching and sorting of products by their title.
3.  **`idx_orders_user_id`**: Crucial for the "My Orders" page, allowing the system to quickly retrieve all orders for a specific user.
4.  **`idx_order_items_order_id`**: Used to quickly fetch all line items when viewing a specific order's details.
5.  **`idx_orders_created_at`**: Useful for generating reports (e.g., "Sales from last month") and sorting orders by recency.

## Constraints and Data Integrity
- **Unique Constraints:** Used on `users.email` and `categories.name` to prevent duplicates.
- **Check Constraints:** Applied to `price`, `quantity`, and `total_amount` to ensure they are never negative.
- **Enums (Check Constraints):** Used for `address_type` and `order_status` to enforce strict data categories.
- **Foreign Key Actions:** Used `ON DELETE CASCADE` for order items (if an order is deleted, its items should go too) and `ON DELETE RESTRICT` for orders/addresses to preserve historical data.
