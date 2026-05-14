# Task 1: Reusable DataTable Component

## 🚀 Overview
This project implements a highly reusable and premium-designed `<DataTable />` component in React. It demonstrates advanced client-side data management features like sorting, searching, and pagination.

## ✨ Features
- **Dynamic Data Support:** Works with any array of objects and column configurations.
- **Advanced Sorting:** Toggle between ascending and descending order by clicking headers.
- **Global Search:** Real-time filtering across all data fields.
- **Configurable Pagination:** Supports custom page sizes (5, 10, 20, 50 rows).
- **Premium UI:** Dark-themed dashboard design with glassmorphism, progress bars, and status badges.
- **Interactive Forms:** Functional UI to add new students and products with auto-generated sequential IDs and roll numbers.

## 🛠️ Tech Choices
- **React (Vite):** Chosen for fast development and optimized bundle size.
- **CSS-in-JS (Inline Styles):** Used to keep the component fully self-contained and easy to move between projects without external CSS dependencies.
- **useMemo Hooks:** Utilized for sorting and filtering logic to ensure high performance even with larger datasets (e.g., 30+ records).

## 🏃 How to Run
1. Navigate to the folder: `cd Task_1`
2. Install dependencies: `npm install`
3. Start the dev server: `npm run dev`
4. Open your browser at: `http://localhost:5173`

## 📝 Assumptions Made
- Data is handled client-side for this specific task (as per requirements).
- The "Roll Number" and "SKU" are unique identifiers that should follow a specific string-number pattern (e.g., STU-01).
- The component assumes a modern browser that supports standard CSS properties like `backdrop-filter`.
