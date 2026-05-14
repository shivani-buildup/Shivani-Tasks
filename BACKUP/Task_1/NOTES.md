# AI Usage Notes — Task 1: Reusable DataTable

This document details how AI was used to build the Reusable DataTable component for the Full-Stack Assessment.

## 🤖 Parts where AI was used
- **Component Architecture:** I used AI to scaffold the initial `<DataTable />` component using React `useMemo` for performance optimization in filtering and sorting.
- **UI Styling:** AI helped generate the "Premium Dark UI" CSS-in-JS styles to match a high-end boutique aesthetic (slate/cyan palette).
- **Complex Logic:** AI was used to write the logic for:
  - Multi-column client-side searching.
  - Sequential ID and Roll Number auto-generation.
  - Safe pagination (handling edge cases where data might be null).
- **Bug Fixing:** AI helped diagnose syntax errors (unterminated string constants) and runtime crashes (undefined object properties).

## 💡 Prompts that worked well
- *"Create a reusable React DataTable component that takes data and columns as props and supports client-side search and sorting."* (Good for the core logic).
- *"Make the UI extremely premium and dark-themed, matching a professional dashboard with glassmorphism and vibrant accent colors."* (Helped achieve the high-end look).
- *"Update the handleAddStudent logic so that IDs and Roll Numbers continue sequentially from the existing data."* (Specific logic request that worked perfectly).

## 🛠️ What I had to fix or rewrite
- **Inline Style Limitations:** AI initially suggested some pseudo-classes (like `:hover`) inside standard React `style` objects. I had to identify that these don't work in standard React and replaced them with alternative styling or simplified logic.
- **Dependency Issues:** During development, the `email-validator` library was missing for Task 3 schemas. I had to manually install it and update the `requirements.txt`.
- **Typo Debugging:** There were a few instances where backticks or quotes were missing in complex template literals. I had to use browser devtools to find the exact line and fix the syntax so the page wouldn't stay blank.
- **Safety Checks:** I manually added `Array.isArray()` checks to the `DataTable` logic because the AI-generated code would sometimes crash if the `data` prop was not yet loaded or was passed as `null`.

## 🧠 Reflection
Using AI allowed me to build a much more visually impressive and feature-rich component than I could have from scratch in the same timeframe. However, it required careful review to ensure that the logic was robust and that the React-specific styling rules were followed correctly. I understand every line of the final code and can explain the sorting/filtering algorithms used.
