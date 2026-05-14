import React, { useState, useEffect } from 'react';
import DataTable from './components/DataTable';
import './App.css';

// --- INITIAL DATA SET 1: STUDENTS ---
const INITIAL_STUDENTS = [
  { id: 101, name: "Shivani Kosambiya", rollNo: "STU-01", grade: "A+", attendance: 100, status: "Active" },
  { id: 102, name: "Aarav Sharma", rollNo: "STU-02", grade: "A", attendance: 95, status: "Active" },
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

// --- INITIAL DATA SET 2: PRODUCTS ---
const INITIAL_PRODUCTS = [
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
  const [students, setStudents] = useState(INITIAL_STUDENTS);
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [isLoading, setIsLoading] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);

  // Form states
  const [studentForm, setStudentForm] = useState({
    name: "",
    rollNo: "",
    grade: "A+",
    attendance: "95",
    status: "Active"
  });

  const [productForm, setProductForm] = useState({
    title: "",
    category: "Electronics",
    price: "",
    stock: "",
    status: "In_Stock"
  });

  // Keep form state closed when switching between demos
  useEffect(() => {
    setShowAddForm(false);
  }, [activeDemo]);

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
      render: (val) => <span style={{ color: '#c7d2fe', fontWeight: 600 }}>${Number(val).toLocaleString()}</span>
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

  // Handle Form Submission for adding a Student
  const handleAddStudent = (e) => {
    e.preventDefault();
    if (!studentForm.name || !studentForm.rollNo) {
      alert("Please fill out all required fields!");
      return;
    }

    const nextId = students.length > 0 ? Math.max(...students.map(s => s.id)) + 1 : 101;
    const newStudent = {
      id: nextId,
      name: studentForm.name,
      rollNo: studentForm.rollNo,
      grade: studentForm.grade,
      attendance: Number(studentForm.attendance) || 0,
      status: studentForm.status
    };

    setStudents([newStudent, ...students]);
    // Reset form
    setStudentForm({
      name: "",
      rollNo: "",
      grade: "A+",
      attendance: "95",
      status: "Active"
    });
    setShowAddForm(false);
  };

  // Handle Form Submission for adding a Product
  const handleAddProduct = (e) => {
    e.preventDefault();
    if (!productForm.title || !productForm.price || productForm.stock === "") {
      alert("Please fill out all required fields!");
      return;
    }

    const nextId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1001;
    const newProduct = {
      id: nextId,
      title: productForm.title,
      category: productForm.category,
      price: Number(productForm.price) || 0,
      stock: Number(productForm.stock) || 0,
      status: productForm.status
    };

    setProducts([newProduct, ...products]);
    // Reset form
    setProductForm({
      title: "",
      category: "Electronics",
      price: "",
      stock: "",
      status: "In_Stock"
    });
    setShowAddForm(false);
  };

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
          custom layouts, dynamic badge renderers, and responsive pagination. Now fully interactive!
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
            {/* Dynamic Card Header with Add Button */}
            <div className="card-header-flex">
              <div className="card-header-text">
                <h3>Students Enrollment Database</h3>
                <p>Active directory of academic students with attendance bars and status badge values.</p>
              </div>
              <button 
                className="action-btn-primary" 
                onClick={() => setShowAddForm(!showAddForm)}
              >
                {showAddForm ? "✕ Close Form" : "➕ Add New Student"}
              </button>
            </div>

            {/* Slide Down Form for Adding Student */}
            {showAddForm && (
              <form className="add-record-form-container" onSubmit={handleAddStudent}>
                <div className="form-title-row">
                  <h4>➕ Register New Student</h4>
                </div>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Student Name *</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Shivani Kosambiya" 
                      className="form-input"
                      value={studentForm.name}
                      onChange={(e) => setStudentForm({ ...studentForm, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Roll Number *</label>
                    <input 
                      type="text" 
                      placeholder="e.g. STU-16" 
                      className="form-input"
                      value={studentForm.rollNo}
                      onChange={(e) => setStudentForm({ ...studentForm, rollNo: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Grade</label>
                    <select 
                      className="form-select"
                      value={studentForm.grade}
                      onChange={(e) => setStudentForm({ ...studentForm, grade: e.target.value })}
                    >
                      <option value="A+">A+</option>
                      <option value="A">A</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B">B</option>
                      <option value="C">C</option>
                      <option value="D">D</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Attendance (%) *</label>
                    <input 
                      type="number" 
                      min="0" 
                      max="100" 
                      placeholder="0-100" 
                      className="form-input"
                      value={studentForm.attendance}
                      onChange={(e) => setStudentForm({ ...studentForm, attendance: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Status</label>
                    <select 
                      className="form-select"
                      value={studentForm.status}
                      onChange={(e) => setStudentForm({ ...studentForm, status: e.target.value })}
                    >
                      <option value="Active">Active</option>
                      <option value="Suspended">Suspended</option>
                      <option value="On_Leave">On Leave</option>
                    </select>
                  </div>
                </div>
                <div className="form-actions">
                  <button 
                    type="button" 
                    className="action-btn-secondary"
                    onClick={() => setShowAddForm(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="action-btn-primary">
                    Save Student
                  </button>
                </div>
              </form>
            )}

            <DataTable 
              columns={studentColumns}
              data={isEmpty ? [] : students}
              loading={isLoading}
              defaultPageSize={10}
              searchPlaceholder="Search student by name, grade or status..."
            />
          </div>
        ) : (
          <div className="showcase-card">
            {/* Dynamic Card Header with Add Button */}
            <div className="card-header-flex">
              <div className="card-header-text">
                <h3>Warehouse Products Catalog</h3>
                <p>Real-time list of inventory products with SKU ids, pricing, and stock status alert indicators.</p>
              </div>
              <button 
                className="action-btn-primary" 
                onClick={() => setShowAddForm(!showAddForm)}
              >
                {showAddForm ? "✕ Close Form" : "➕ Add New Product"}
              </button>
            </div>

            {/* Slide Down Form for Adding Product */}
            {showAddForm && (
              <form className="add-record-form-container" onSubmit={handleAddProduct}>
                <div className="form-title-row">
                  <h4>➕ Catalog New Product</h4>
                </div>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Product Title *</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Sony WH-1000XM5" 
                      className="form-input"
                      value={productForm.title}
                      onChange={(e) => setProductForm({ ...productForm, title: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Category</label>
                    <select 
                      className="form-select"
                      value={productForm.category}
                      onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                    >
                      <option value="Electronics">Electronics</option>
                      <option value="Audio">Audio</option>
                      <option value="Office">Office</option>
                      <option value="Accessories">Accessories</option>
                      <option value="Furniture">Furniture</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Price ($) *</label>
                    <input 
                      type="number" 
                      min="0" 
                      placeholder="Price" 
                      className="form-input"
                      value={productForm.price}
                      onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Stock Qty *</label>
                    <input 
                      type="number" 
                      min="0" 
                      placeholder="Stock quantity" 
                      className="form-input"
                      value={productForm.stock}
                      onChange={(e) => setProductForm({ ...productForm, stock: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Status</label>
                    <select 
                      className="form-select"
                      value={productForm.status}
                      onChange={(e) => setProductForm({ ...productForm, status: e.target.value })}
                    >
                      <option value="In_Stock">In Stock</option>
                      <option value="Low_Stock">Low Stock</option>
                      <option value="Out_Of_Stock">Out Of Stock</option>
                    </select>
                  </div>
                </div>
                <div className="form-actions">
                  <button 
                    type="button" 
                    className="action-btn-secondary"
                    onClick={() => setShowAddForm(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="action-btn-primary">
                    Save Product
                  </button>
                </div>
              </form>
            )}

            <DataTable 
              columns={productColumns}
              data={isEmpty ? [] : products}
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
