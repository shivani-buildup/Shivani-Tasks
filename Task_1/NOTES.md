# 📝 AI Usage Notes - Task 1

This document outlines how AI was leveraged during the development of the Reusable `<DataTable />` React component, the prompts that yielded the best results, and the manual adjustments made to ensure high code quality.

---

### 🧠 1. Parts Built Using AI

- **Component Scaffolding**: Initial React state setup for pagination, sorting, and search filtering.
- **CSS Design System**: Creating the modern slate-900 glassmorphic dark-theme styles, pulse shimmer animations for skeletons, and responsive grid layouts.
- **Mock Data Generation**: Creating comprehensive lists of 15 students and 12 products to test pagination limits and empty states.

---

### 💬 2. Prompts That Worked Well

1. **For Component Structuring**:
   > *"Generate a fully reusable React DataTable component that accepts data (array of objects) and columns (array of configs) props. Include Client-Side global filtering across all cell values, interactive multi-state sorting (Ascending, Descending, Neutral), and configurable page pagination."*

2. **For Premium Styling**:
   > *"Write a CSS file for a React DataTable component using a premium glassmorphic dark-theme design. Avoid basic primary colors; use rich slates (`#0b0f19`, `#1e293b`) and a purple-to-indigo gradient (`linear-gradient(135deg, #6366f1 0%, #a855f7 100%)`) for interactive states. Add pulse animation for loading state skeletons."*

---

### 🛠️ 3. Manual Corrections & Customizations

Although the AI provided a solid structure, several critical improvements and rewrites were made manually to ensure production-grade quality:

1. **Neutral Sorting State Addition**: 
   - *Problem*: AI's sorting logic was a permanent toggle between ASC and DESC, making it impossible to return to the original data order.
   - *Fix*: Rewrote the sorting handler to support a 3-way toggle (`asc` ➡️ `desc` ➡️ `none`). When state is `none`, it returns to the original order of the input dataset.
2. **Search Optimization on Custom Renderers**:
   - *Problem*: If a column configuration had a custom rendering function, searching that column directly returned string matches on `[object Object]` instead of matching the raw data.
   - *Fix*: Optimized the `filteredData` selector to search on the raw row values dynamically, ensuring search accuracy even with custom cell renderers.
3. **Automated Testing IDs**:
   - *Problem*: The AI-generated elements lacked any testing hooks.
   - *Fix*: Manually appended unique ID attributes (`table-search-input`, `prev-page-btn`, `next-page-btn`, `th-{columnKey}`, and `page-btn-{pageNum}`) to ensure the component is 100% testable using automated frameworks like Selenium, Cypress, or Playwright.
