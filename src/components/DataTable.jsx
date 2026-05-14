import React, { useState, useMemo } from "react";

// Reusable Table Component
const DataTable = ({ data = [], columns = [], defaultPageSize = 10, title = "", description = "" }) => {
  
  // Storage (States)
  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(defaultPageSize);

  // 1. Search Logic
  const filteredData = useMemo(() => {
    const safeData = Array.isArray(data) ? data : [];
    if (!searchQuery) return safeData;
    
    return safeData.filter((row) =>
      Object.values(row || {}).some((val) =>
        String(val).toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [data, searchQuery]);

  // 2. Sort Logic
  const sortedData = useMemo(() => {
    const sortableItems = Array.isArray(filteredData) ? [...filteredData] : [];
    
    if (sortConfig.key !== null) {
      sortableItems.sort((a, b) => {
        const aVal = a[sortConfig.key];
        const bVal = b[sortConfig.key];
        if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
        if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }
    return sortableItems;
  }, [filteredData, sortConfig]);

  // 3. Paging Logic
  const totalPages = Math.max(1, Math.ceil(sortedData.length / pageSize));
  
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return sortedData.slice(start, start + pageSize);
  }, [sortedData, currentPage, pageSize]);

  // Sorting Action
  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  return (
    <div className="table-container">
      {/* Title */}
      <div className="header-section" style={{ marginBottom: '20px' }}>
        <div>
          <h2 className="table-title" style={{ color: '#f8fafc', fontSize: '24px', fontWeight: '700' }}>{title}</h2>
          <p style={{ color: '#94a3b8', fontSize: '14px' }}>{description}</p>
        </div>
      </div>

      <div className="table-card">
        {/* Controls */}
        <div className="toolbar">
          <div className="search-wrapper">
            <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', opacity: 0.5 }}>🔍</span>
            <input
              type="text"
              className="search-input"
              placeholder="Search record..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
             <span style={{ color: '#94a3b8', fontSize: '14px' }}>Show:</span>
             <select 
               value={pageSize} 
               onChange={(e) => setPageSize(Number(e.target.value))}
               className="input-field"
               style={{ padding: '6px 10px', width: 'auto' }}
             >
               {[5, 10, 20, 50].map(sz => <option key={sz} value={sz}>{sz} Rows</option>)}
             </select>
          </div>
        </div>

        {/* Table Body */}
        <div style={{ overflowX: 'auto' }}>
          <table className="data-table">
            {/* Headers */}
            <thead>
              <tr style={{ background: 'rgba(15, 23, 42, 0.4)' }}>
                {columns.map((col) => (
                  <th
                    key={col.accessor}
                    onClick={() => requestSort(col.accessor)}
                    className="th-cell"
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      {(col.header || '').toUpperCase()}
                      <span style={{ fontSize: '10px', color: sortConfig.key === col.accessor ? '#38bdf8' : '#475569' }}>
                        {sortConfig.key === col.accessor ? (sortConfig.direction === "asc" ? "🔼" : "🔽") : "↕️"}
                      </span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            
            {/* Rows */}
            <tbody>
              {paginatedData.length > 0 ? (
                paginatedData.map((row, idx) => (
                  <tr key={idx} className="table-row">
                    {columns.map((col) => (
                      <td key={col.accessor} className="td-cell">
                        {col.cell ? col.cell(row[col.accessor], row) : row[col.accessor]}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={columns.length} style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>
                    No records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="footer">
          <div style={{ color: '#94a3b8', fontSize: '14px' }}>
            {paginatedData.length} of {sortedData.length} items
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <button 
              disabled={currentPage === 1} 
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              className="page-btn"
            >
              Prev
            </button>
            <div style={{ color: '#f1f5f9', fontSize: '14px', fontWeight: '500' }}>
              {currentPage} / {totalPages}
            </div>
            <button 
              disabled={currentPage >= totalPages} 
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              className="page-btn"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
