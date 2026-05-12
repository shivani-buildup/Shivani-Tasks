import React, { useState, useEffect } from 'react';
import DataTable from './components/DataTable';
import './App.css';

// --- MOCK DATA SET 1: STUDENTS ---
const MOCK_STUDENTS = [
  { id: 101, name: "Aarav Sharma", rollNo: "STU-01", grade: "A+", attendance: 95, status: "Active" },
  { id: 102, name: "Shivani Patel", rollNo: "STU-02", grade: "A", attendance: 98, status: "Active" },
  { id: 103, name: "Kabir Mehta", rollNo: "STU-03", grade: "B+", attendance: 84, status: "Active" },
  { id: 104, name: "Riya Sen", rollNo: "STU-04", grade: "A+", attendance: 92, status: "Active" },
  { id: 105, name: "Dev Shah", rollNo: "STU-05", grade: "C", attendance: 65, status: "Suspended" },
  { id: 106, name: "Isha Joshi", rollNo: "STU-06", grade: "A-", attendance: 89, status: "Active" },
  { id: 107, name: "Rohan Das", rollNo: "STU-07", grade: "B", attendance: 78, status: "On_Leave" },
  { id: 108, name: "Myra Kapoor", rollNo: "STU-08", grade: "A+", attendance: 97, status: "Active" },
  { id: 109, name: "Yash Singhal", rollNo: "STU-09", grade: "B-", attendance: 72, status: "Active" },
  { id: 110, name: "Ananya Roy", rollNo: "STU-10", grade: "A", attendance: 91, status: "Active" },
  { id: 111, name: "Vihaan Gupta", rollNo: "STU-11", grade: "D", attendance: 58, status: "Suspended" },
  { id: 112, name: "Kiara Malhotra", rollNo: "STU-12", grade: "B+", attendance: 86, status: "On_Leave" },
  { id: 113, name: "Dhruv Saxena", rollNo: "STU-13", grade: "A-", attendance: 88, status: "Active" },
  { id: 114, name: "Dia Nair", rollNo: "STU-14", grade: "A+", attendance: 96, status: "Active" },
  { id: 115, name: "Arjun Verma", rollNo: "STU-15", grade: "C+", attendance: 70, status: "Active" }
];

// --- MOCK DATA SET 2: PRODUCTS ---
const MOCK_PRODUCTS = [
  { id: 1001, title: "iPhone 15 Pro", category: "Electronics", price: 1099, stock: 42, status: "In_Stock" },
  { id: 1002, title: "MacBook Air M3", category: "Electronics", price: 1299, stock: 15, status: "In_Stock" },
  { id: 1003, title: "Sony WH-1000XM5", category: "Audio", price: 399, stock: 5, status: "Low_Stock" },
  { id: 1004, title: "Dell UltraSharp 27", category: "Office", price: 499, stock: 0, status: "Out_Of_Stock" },
  { id: 1005, title: "Mechanical Keyboard", category: "Accessories", price: 120, stock: 50, status: "In_Stock" },
  { id: 1006, title: "Logitech MX Master 3S", category: "Accessories", price: 99, stock: 8, status: "Low_Stock" },
  { id: 1007, title: "iPad Pro 11-inch", category: "Electronics", price: 799, stock: 20, status: "In_Stock" },
  { id: 1008, title: "Leather Desk Mat", category: "Office", price: 45, stock: 110, status: "In_Stock" },
  { id: 1009, title: "Ergonomic Office Chair", category: "Furniture", price: 349, stock: 3, status: "Low_Stock" },
  { id: 1010, title: "Anker USB-C Docking Station", category: "Electronics", price: 199, stock: 0, status: "Out_Of_Stock" },
  { id: 1011, title: "Smart LED Desk Lamp", category: "Office", price: 65, stock: 18, status: "In_Stock" },
  { id: 1012, title: "Bose QuietComfort Ultra", category: "Audio", price: 429, stock: 25, status: "In_Stock" }
];

function App() {
  const [activeDemo, setActiveDemo] = useState("students"); // "students" or "products"
  const [isLoading, setIsLoading] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);

  // Column config for Students
  const studentColumns = [
    { key: "id", label: "ID", sortable: true, width: "10%" },
    { key: "name", label: "Student Name", sortable: true, width: "30%" },
    { key: "rollNo", label: "Roll Number", sortable: true, width: "20%" },
    { key: "grade", label: "Grade", sortable: true, width: "12%" },
    { 
      key: "attendance", 
      label: "Attendance", 
      sortable: true, 
      width: "15%",
      render: (val) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontWeight: 600 }}>{val}%</span>
          <div className="attendance-progress-bar">
            <div 
              className="attendance-progress-fill" 
              style={{ 
                width: `${val}%`,
                background: val >= 85 ? '#10b981' : val >= 75 ? '#f59e0b' : '#ef4444' 
              }} 
            />
          </div>
        </div>
      )
    },
    { 
      key: "status", 
      label: "Status", 
      sortable: true, 
      width: "13%",
      render: (val) => <span className={`badge badge-${val.toLowerCase()}`}>{val.replace('_', ' ')}</span>
    }
  ];

  // Column config for Products
  const productColumns = [
    { key: "id", label: "SKU ID", sortable: true, width: "12%" },
    { key: "title", label: "Product Title", sortable: true, width: "35%" },
    { key: "category", label: "Category", sortable: true, width: "18%" },
    { 
      key: "price", 
      label: "Price", 
      sortable: true, 
      width: "12%",
      render: (val) => <span style={{ color: '#c7d2fe', fontWeight: 600 }}>${val.toLocaleString()}</span>
    },
    { 
      key: "stock", 
      label: "Stock Qty", 
      sortable: true, 
      width: "12%",
      render: (val) => <span style={{ fontWeight: 500 }}>{val} pcs</span>
    },
    { 
      key: "status", 
      label: "Status", 
      sortable: true, 
      width: "11%",
      render: (val) => <span className={`badge badge-${val.toLowerCase()}`}>{val.replace('_', ' ')}</span>
    }
  ];

  // Simulate a loading trigger for testability
  const triggerLoading = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="app-workspace-container">
      {/* Header and Brand */}
      <header className="app-brand-header">
        <div className="badge-intern">Task 1: Reusable Component</div>
        <h1 className="app-title-main">Premium Reusable DataTable</h1>
        <p className="app-subtitle">
          Highly flexible React components displaying advanced sorting, client-side searching, 
          custom layouts, dynamic badge renderers, and responsive pagination.
        </p>
      </header>

      {/* Control Panel */}
      <div className="app-control-panel">
        <div className="segment-tabs-container">
          <button 
            className={`segment-tab ${activeDemo === "students" ? "active-segment" : ""}`}
            onClick={() => { setActiveDemo("students"); setIsEmpty(false); }}
          >
            👨‍🎓 Students Demo
          </button>
          <button 
            className={`segment-tab ${activeDemo === "products" ? "active-segment" : ""}`}
            onClick={() => { setActiveDemo("products"); setIsEmpty(false); }}
          >
            📦 Products Demo
          </button>
        </div>

        <div className="state-switches-container">
          <button 
            className="action-btn-secondary" 
            onClick={triggerLoading}
            disabled={isLoading}
          >
            🔄 Test Loading State
          </button>
          <button 
            className={`action-btn-secondary ${isEmpty ? 'active-empty-state' : ''}`}
            onClick={() => setIsEmpty(!isEmpty)}
          >
            🗑️ Test Empty State: {isEmpty ? 'ON' : 'OFF'}
          </button>
        </div>
      </div>

      {/* Main Table View Section */}
      <main className="table-showcase-view">
        {activeDemo === "students" ? (
          <div className="showcase-card">
            <div className="card-header">
              <h3>Students Enrollment Database</h3>
              <p>Active directory of academic students with attendance bars and status badge values.</p>
            </div>
            <DataTable 
              columns={studentColumns}
              data={isEmpty ? [] : MOCK_STUDENTS}
              loading={isLoading}
              defaultPageSize={10}
              searchPlaceholder="Search student by name, grade or status..."
            />
          </div>
        ) : (
          <div className="showcase-card">
            <div className="card-header">
              <h3>Warehouse Products Catalog</h3>
              <p>Real-time list of inventory products with SKU ids, pricing, and stock status alert indicators.</p>
            </div>
            <DataTable 
              columns={productColumns}
              data={isEmpty ? [] : MOCK_PRODUCTS}
              loading={isLoading}
              defaultPageSize={5}
              searchPlaceholder="Search product by title, category or price..."
            />
          </div>
        )}
      </main>

      {/* Footer Branding */}
      <footer className="workspace-footer">
        Submitted by <strong>Shivani</strong> • Powered by React & Vite • Full-Stack Developer Assessment
      </footer>
    </div>
  );
}

export default App;
