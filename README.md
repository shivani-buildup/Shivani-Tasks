# 📊 Task 1: Reusable `<DataTable />` React Component

This branch contains a premium, highly flexible, and reusable `<DataTable />` component built with **React** and **Vite**. It is completely responsive, beautiful, and handles empty and loading states gracefully.

---

## ✨ Features Built

1. **Fully Reusable Schema**: Accepts a `columns` configuration array and `data` array of objects. It can render any data shape dynamically.
2. **Interactive Header Sorting**: Click headers to toggle data sorting: **Ascending ➡️ Descending ➡️ Neutral** (original order).
3. **Global Client-Side Search**: A responsive search input that filters rows dynamically across all searchable columns instantly.
4. **Custom Cell Rendering**: Supports passing custom JSX renders (e.g., progress bars, custom badges, styling price strings, etc.) in column configurations.
5. **Interactive Controls & Skeletons**:
   - **Simulation Loading**: Click the button to view a pulsing skeleton loader.
   - **Empty State UI**: Click the empty state toggle to view a clean SVG empty state.
6. **Descriptive Testing IDs**: All input, button, select, and header elements contain distinct IDs for automated testing (e.g., Selenium/Cypress).

---

## 🛠️ Tech Stack & Architecture

- **Framework**: React 18+ (scaffolded via Vite)
- **Styling**: Vanilla CSS (Premium Dark Theme & Glassmorphism)
- **Icons**: Inline SVGs
- **Typography**: Google Fonts (Outfit & Inter)

---

## 🚀 How to Set Up and Run the Project

Follow these steps to run the project locally on your machine:

1. **Navigate to the Project Directory**:
   ```bash
   cd datatable-demo
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Run the Development Server**:
   ```bash
   npm run dev
   ```

4. **Open in Browser**:
   Open [http://localhost:5173](http://localhost:5173) in your browser to see the live showcase!

---

## 🧩 Column Configuration Example

Here is how you can use the component in any React file:

```javascript
import DataTable from './components/DataTable';

const columns = [
  { key: "id", label: "ID", sortable: true },
  { key: "name", label: "Name", sortable: true },
  { 
    key: "status", 
    label: "Status", 
    sortable: true,
    render: (val) => <span className={`badge-${val}`}>{val}</span> 
  }
];

const data = [
  { id: 1, name: "Shivani", status: "Active" },
  { id: 2, name: "Aarav", status: "Inactive" }
];

function MyComponent() {
  return (
    <DataTable 
      columns={columns} 
      data={data} 
      defaultPageSize={10} 
    />
  );
}
```
