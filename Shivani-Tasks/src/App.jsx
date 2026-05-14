import React, { useState } from 'react';
import DataTable from './components/DataTable';

const initialStudents = [
  { id: 101, name: 'Shivani Kosambiya', roll: 'STU-01', grade: 'A+', attendance: 100, status: 'ACTIVE' },
  { id: 102, name: 'Aarav Sharma', roll: 'STU-02', grade: 'A', attendance: 95, status: 'ACTIVE' },
  { id: 103, name: 'Kabir Mehta', roll: 'STU-03', grade: 'B+', attendance: 84, status: 'ACTIVE' },
  { id: 104, name: 'Riya Sen', roll: 'STU-04', grade: 'A+', attendance: 92, status: 'ACTIVE' },
  { id: 105, name: 'Dev Shah', roll: 'STU-05', grade: 'C', attendance: 65, status: 'SUSPENDED' },
  { id: 106, name: 'Isha Joshi', roll: 'STU-06', grade: 'A-', attendance: 89, status: 'ACTIVE' },
  { id: 107, name: 'Arjun Verma', roll: 'STU-07', grade: 'B', attendance: 78, status: 'ACTIVE' },
  { id: 108, name: 'Ananya Iyer', roll: 'STU-08', grade: 'A', attendance: 91, status: 'ACTIVE' },
  { id: 109, name: 'Vihaan Gupta', roll: 'STU-09', grade: 'A+', attendance: 98, status: 'ACTIVE' },
  { id: 110, name: 'Saanvi Malhotra', roll: 'STU-10', grade: 'B-', attendance: 72, status: 'ACTIVE' },
  { id: 111, name: 'Krishna Das', roll: 'STU-11', grade: 'C+', attendance: 68, status: 'ACTIVE' },
  { id: 112, name: 'Zoya Khan', roll: 'STU-12', grade: 'A', attendance: 94, status: 'ACTIVE' },
  { id: 113, name: 'Aryan Singh', roll: 'STU-13', grade: 'B+', attendance: 82, status: 'ACTIVE' },
  { id: 114, name: 'Myra Reddy', roll: 'STU-14', grade: 'A-', attendance: 87, status: 'ACTIVE' },
  { id: 115, name: 'Advait Rao', roll: 'STU-15', grade: 'A+', attendance: 100, status: 'ACTIVE' },
  { id: 116, name: 'Navya Nair', roll: 'STU-16', grade: 'B', attendance: 75, status: 'ACTIVE' },
  { id: 117, name: 'Ishaan Bhatt', roll: 'STU-17', grade: 'C', attendance: 60, status: 'SUSPENDED' },
  { id: 118, name: 'Kavya Pillai', roll: 'STU-18', grade: 'A', attendance: 93, status: 'ACTIVE' },
  { id: 119, name: 'Ranbir Kapoor', roll: 'STU-19', grade: 'B+', attendance: 81, status: 'ACTIVE' },
  { id: 120, name: 'Kiara Advani', roll: 'STU-20', grade: 'A+', attendance: 96, status: 'ACTIVE' },
  { id: 121, name: 'Siddharth Roy', roll: 'STU-21', grade: 'B-', attendance: 70, status: 'ACTIVE' },
  { id: 122, name: 'Tanya Mehra', roll: 'STU-22', grade: 'A-', attendance: 88, status: 'ACTIVE' },
  { id: 123, name: 'Pranav Joshi', roll: 'STU-23', grade: 'C+', attendance: 64, status: 'ACTIVE' },
  { id: 124, name: 'Diya Sharma', roll: 'STU-24', grade: 'A', attendance: 90, status: 'ACTIVE' },
  { id: 125, name: 'Rohan Varma', roll: 'STU-25', grade: 'B', attendance: 76, status: 'ACTIVE' },
  { id: 126, name: 'Megha Singh', roll: 'STU-26', grade: 'A+', attendance: 99, status: 'ACTIVE' },
  { id: 127, name: 'Varun Dhawan', roll: 'STU-27', grade: 'B+', attendance: 83, status: 'ACTIVE' },
  { id: 128, name: 'Alia Bhatt', roll: 'STU-28', grade: 'A', attendance: 95, status: 'ACTIVE' },
  { id: 129, name: 'Hrithik Roshan', roll: 'STU-29', grade: 'C', attendance: 55, status: 'SUSPENDED' },
  { id: 130, name: 'Sara Ali Khan', roll: 'STU-30', grade: 'A-', attendance: 86, status: 'ACTIVE' },
];

const initialProducts = [
  { sku: 'PRO-01', title: 'MacBook Pro M3', category: 'Laptops', price: 1999, stock: 45, status: 'INSTOCK' },
  { sku: 'PRO-02', title: 'iPhone 15 Pro', category: 'Mobile', price: 1099, stock: 120, status: 'INSTOCK' },
  { sku: 'PRO-03', title: 'AirPods Max', category: 'Audio', price: 549, stock: 0, status: 'OUTOFSTOCK' },
  { sku: 'PRO-04', title: 'Samsung S24 Ultra', category: 'Mobile', price: 1299, stock: 85, status: 'INSTOCK' },
  { sku: 'PRO-05', title: 'Dell XPS 15', category: 'Laptops', price: 1799, stock: 30, status: 'INSTOCK' },
  { sku: 'PRO-06', title: 'iPad Pro 12.9', category: 'Tablets', price: 1099, stock: 60, status: 'INSTOCK' },
  { sku: 'PRO-07', title: 'Sony WH-1000XM5', category: 'Audio', price: 399, stock: 200, status: 'INSTOCK' },
  { sku: 'PRO-08', title: 'Logitech MX Master 3', category: 'Accessories', price: 99, stock: 150, status: 'INSTOCK' },
  { sku: 'PRO-09', title: 'Keychron K2', category: 'Accessories', price: 89, stock: 0, status: 'OUTOFSTOCK' },
  { sku: 'PRO-10', title: 'LG UltraFine 4K', category: 'Monitors', price: 699, stock: 15, status: 'INSTOCK' },
  { sku: 'PRO-11', title: 'GoPro Hero 12', category: 'Cameras', price: 399, stock: 40, status: 'INSTOCK' },
  { sku: 'PRO-12', title: 'Nintendo Switch', category: 'Gaming', price: 299, stock: 100, status: 'INSTOCK' },
  { sku: 'PRO-13', title: 'PS5 Console', category: 'Gaming', price: 499, stock: 5, status: 'INSTOCK' },
  { sku: 'PRO-14', title: 'Xbox Series X', category: 'Gaming', price: 499, stock: 0, status: 'OUTOFSTOCK' },
  { sku: 'PRO-15', title: 'Kindle Paperwhite', category: 'E-Readers', price: 139, stock: 80, status: 'INSTOCK' },
  { sku: 'PRO-16', title: 'Razer Blade 16', category: 'Laptops', price: 2499, stock: 10, status: 'INSTOCK' },
  { sku: 'PRO-17', title: 'Bose QuietComfort', category: 'Audio', price: 329, stock: 50, status: 'INSTOCK' },
  { sku: 'PRO-18', title: 'Apple Watch Ultra', category: 'Wearables', price: 799, stock: 25, status: 'INSTOCK' },
  { sku: 'PRO-19', title: 'DJI Mavic 3', category: 'Drones', price: 2199, stock: 8, status: 'INSTOCK' },
  { sku: 'PRO-20', title: 'Canon EOS R5', category: 'Cameras', price: 3899, stock: 3, status: 'INSTOCK' },
  { sku: 'PRO-21', title: 'SteelSeries Apex Pro', category: 'Accessories', price: 199, stock: 45, status: 'INSTOCK' },
  { sku: 'PRO-22', title: 'Western Digital 4TB', category: 'Storage', price: 120, stock: 300, status: 'INSTOCK' },
  { sku: 'PRO-23', title: 'Seagate 8TB HDD', category: 'Storage', price: 180, stock: 0, status: 'OUTOFSTOCK' },
  { sku: 'PRO-24', title: 'Corsair Vengeance 32GB', category: 'Components', price: 110, stock: 60, status: 'INSTOCK' },
  { sku: 'PRO-25', title: 'NVIDIA RTX 4090', category: 'Components', price: 1599, stock: 2, status: 'INSTOCK' },
  { sku: 'PRO-26', title: 'ASUS ROG Swift', category: 'Monitors', price: 899, stock: 12, status: 'INSTOCK' },
  { sku: 'PRO-27', title: 'Elgato Stream Deck', category: 'Streaming', price: 149, stock: 55, status: 'INSTOCK' },
  { sku: 'PRO-28', title: 'Blue Yeti Mic', category: 'Audio', price: 129, stock: 100, status: 'INSTOCK' },
  { sku: 'PRO-29', title: 'HyperX Cloud II', category: 'Audio', price: 99, stock: 200, status: 'INSTOCK' },
  { sku: 'PRO-30', title: 'Philips Hue Starter Kit', category: 'Smart Home', price: 199, stock: 35, status: 'INSTOCK' },
];

function App() {
  const [students, setStudents] = useState(initialStudents);
  const [products, setProducts] = useState(initialProducts);
  const [activeTab, setActiveTab] = useState('students');

  // Form states
  const [newStudent, setNewStudent] = useState({ name: '', grade: '', attendance: '', status: 'ACTIVE' });
  const [newProduct, setNewProduct] = useState({ title: '', category: '', price: '', stock: '', status: 'INSTOCK' });

  const [showForm, setShowForm] = useState(false);

  const studentColumns = [
    { header: 'ID', accessor: 'id' },
    { header: 'Student Name', accessor: 'name' },
    { header: 'Roll Number', accessor: 'roll' },
    { header: 'Grade', accessor: 'grade' },
    { 
      header: 'Attendance', 
      accessor: 'attendance',
      cell: (val) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ minWidth: '40px' }}>{val}%</span>
          <div style={{ flex: 1, height: '6px', background: '#334155', borderRadius: '3px', overflow: 'hidden', minWidth: '80px' }}>
            <div style={{ width: `${val}%`, height: '100%', background: val > 80 ? '#10b981' : val > 70 ? '#f59e0b' : '#ef4444' }}></div>
          </div>
        </div>
      )
    },
    { 
      header: 'Status', 
      accessor: 'status',
      cell: (val) => (
        <span style={{ 
          padding: '4px 10px', borderRadius: '99px', fontSize: '12px', fontWeight: 'bold',
          background: val === 'ACTIVE' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
          color: val === 'ACTIVE' ? '#10b981' : '#ef4444',
          border: `1px solid ${val === 'ACTIVE' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)'}`
        }}>
          {val}
        </span>
      )
    },
  ];

  const productColumns = [
    { header: 'SKU', accessor: 'sku' },
    { header: 'Product Title', accessor: 'title' },
    { header: 'Category', accessor: 'category' },
    { header: 'Price', accessor: 'price', cell: (val) => `$${val}` },
    { header: 'Stock', accessor: 'stock' },
    { 
      header: 'Status', 
      accessor: 'status',
      cell: (val) => (
        <span style={{ 
          color: val === 'INSTOCK' ? '#10b981' : '#ef4444',
          fontSize: '12px', fontWeight: 'bold'
        }}>
          ● {val}
        </span>
      )
    },
  ];

  return (
    <div className="page-wrapper">
      {/* --- Header Section --- */}
      <div className="header-card">
        <div className="badge">TASK 1: REUSABLE COMPONENT</div>
        <h1 className="main-title">Premium Reusable DataTable</h1>
        <p className="sub-title">Highly flexible React components displaying advanced sorting, client-side searching, custom layouts, dynamic badge renderers, and responsive pagination.</p>
        
        <div className="tab-container">
          <button onClick={() => { setActiveTab('students'); setShowForm(false); }} className={`tab-btn ${activeTab === 'students' ? 'active' : ''}`}>🎓 Students Demo</button>
          <button onClick={() => { setActiveTab('products'); setShowForm(false); }} className={`tab-btn ${activeTab === 'products' ? 'active' : ''}`}>📦 Products Demo</button>
        </div>
      </div>

      {/* --- Add Toggle Button --- */}
      <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '20px' }}>
        <button 
          onClick={() => setShowForm(!showForm)} 
          className="submit-btn"
          style={{ width: 'auto', padding: '10px 24px', display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          {showForm ? '✕ Close Form' : `+ Add ${activeTab === 'students' ? 'Student' : 'Product'}`}
        </button>
      </div>

      {/* --- Add Form Section (Conditional) --- */}
      {showForm && (
        <div className="form-card">
          <h3 style={{ color: '#f8fafc', margin: '0 0 20px 0' }}>Add New {activeTab === 'students' ? 'Student' : 'Product'}</h3>
          {activeTab === 'students' ? (
            <form onSubmit={(e) => {
              e.preventDefault();
              const nextId = students.length > 0 ? Math.max(...students.map(s => s.id)) + 1 : 101;
              const nextRoll = `STU-${(students.length + 1).toString().padStart(2, '0')}`;
              setStudents([...students, { id: nextId, roll: nextRoll, ...newStudent, attendance: Number(newStudent.attendance) }]);
              setNewStudent({ name: '', grade: '', attendance: '', status: 'ACTIVE' });
              setShowForm(false);
            }} className="form-grid">
              <input required className="input-field" placeholder="Student Name" value={newStudent.name} onChange={e => setNewStudent({...newStudent, name: e.target.value})} />
              <input required className="input-field" placeholder="Grade" value={newStudent.grade} onChange={e => setNewStudent({...newStudent, grade: e.target.value})} />
              <input required className="input-field" type="number" placeholder="Attendance %" value={newStudent.attendance} onChange={e => setNewStudent({...newStudent, attendance: e.target.value})} />
              <button type="submit" className="submit-btn">Save Student</button>
            </form>
          ) : (
            <form onSubmit={(e) => {
              e.preventDefault();
              const nextSkuNum = (products.length + 1).toString().padStart(2, '0');
              const nextSku = `PRO-${nextSkuNum}`;
              setProducts([...products, { sku: nextSku, ...newProduct, price: Number(newProduct.price), stock: Number(newProduct.stock) }]);
              setNewProduct({ title: '', category: '', price: '', stock: '', status: 'INSTOCK' });
              setShowForm(false);
            }} className="form-grid">
              <input required className="input-field" placeholder="Title" value={newProduct.title} onChange={e => setNewProduct({...newProduct, title: e.target.value})} />
              <input required className="input-field" placeholder="Category" value={newProduct.category} onChange={e => setNewProduct({...newProduct, category: e.target.value})} />
              <input required className="input-field" type="number" placeholder="Price" value={newProduct.price} onChange={e => setNewProduct({...newProduct, price: e.target.value})} />
              <input required className="input-field" type="number" placeholder="Stock" value={newProduct.stock} onChange={e => setNewProduct({...newProduct, stock: e.target.value})} />
              <button type="submit" className="submit-btn">Save Product</button>
            </form>
          )}
        </div>
      )}

      {/* --- Table Section --- */}
      {activeTab === 'students' ? (
        <DataTable 
          title="Students Enrollment Database" 
          description="Active directory of academic students with attendance bars and status badge values."
          data={students} 
          columns={studentColumns} 
          defaultPageSize={10} 
        />
      ) : (
        <DataTable 
          title="E-Commerce Product Inventory" 
          description="Real-time stock management with category filtering and inventory status indicators."
          data={products} 
          columns={productColumns} 
          defaultPageSize={10} 
        />
      )}
    </div>
  );
}

export default App;
