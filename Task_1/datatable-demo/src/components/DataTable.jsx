import React, { useState, useMemo } from 'react';
import './DataTable.css';

/**
 * Reusable DataTable Component
 * @param {Array} data - Array of objects to display
 * @param {Array} columns - Array of column configuration objects
 * @param {boolean} loading - Boolean to show loading skeleton
 * @param {number} defaultPageSize - Default number of rows per page
 * @param {string} searchPlaceholder - Placeholder text for search bar
 */
const DataTable = ({
  data = [],
  columns = [],
  loading = false,
  defaultPageSize = 10,
  searchPlaceholder = "Search records..."
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(defaultPageSize);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'none' }); // 'asc', 'desc', 'none'

  // Handle header sorting click
  const handleSort = (key, sortable) => {
    if (!sortable) return;

    let direction = 'asc';
    if (sortConfig.key === key) {
      if (sortConfig.direction === 'asc') {
        direction = 'desc';
      } else if (sortConfig.direction === 'desc') {
        direction = 'none';
      }
    }
    
    setSortConfig({ key: direction === 'none' ? null : key, direction });
    setCurrentPage(1); // Reset to first page when sorting changes
  };

  // 1. Client-Side Global Search Filtering
  const filteredData = useMemo(() => {
    if (!searchQuery.trim()) return data;
    
    const query = searchQuery.toLowerCase().trim();
    return data.filter(row => {
      return columns.some(col => {
        const value = row[col.key];
        if (value === null || value === undefined) return false;
        
        // If there's a custom render function, try searching its output or original value
        const stringVal = String(value).toLowerCase();
        return stringVal.includes(query);
      });
    });
  }, [data, columns, searchQuery]);

  // 2. Client-Side Sorting
  const sortedData = useMemo(() => {
    const { key, direction } = sortConfig;
    if (!key || direction === 'none') return filteredData;

    const sorted = [...filteredData];
    sorted.sort((a, b) => {
      let valA = a[key];
      let valB = b[key];

      // Handle null/undefined values gracefully
      if (valA === undefined || valA === null) valA = '';
      if (valB === undefined || valB === null) valB = '';

      // Check numeric sort vs string sort
      if (typeof valA === 'number' && typeof valB === 'number') {
        return direction === 'asc' ? valA - valB : valB - valA;
      }

      const strA = String(valA).toLowerCase();
      const strB = String(valB).toLowerCase();

      if (strA < strB) return direction === 'asc' ? -1 : 1;
      if (strA > strB) return direction === 'asc' ? 1 : -1;
      return 0;
    });

    return sorted;
  }, [filteredData, sortConfig]);

  // 3. Client-Side Pagination
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return sortedData.slice(startIndex, startIndex + pageSize);
  }, [sortedData, currentPage, pageSize]);

  // Total pages calculation
  const totalPages = Math.ceil(sortedData.length / pageSize) || 1;

  // Handle Search Input Change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to first page when search changes
  };

  // Page selection handlers
  const goToPage = (page) => {
    const pageNumber = Math.max(1, Math.min(page, totalPages));
    setCurrentPage(pageNumber);
  };

  return (
    <div className="premium-table-container">
      {/* Table Control Header */}
      <div className="table-controls">
        <div className="search-box-container">
          <svg className="search-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input
            id="table-search-input"
            type="text"
            className="search-input"
            placeholder={searchPlaceholder}
            value={searchQuery}
            onChange={handleSearchChange}
          />
          {searchQuery && (
            <button className="clear-search-btn" onClick={() => { setSearchQuery(""); setCurrentPage(1); }}>
              &times;
            </button>
          )}
        </div>

        <div className="page-size-selector">
          <label htmlFor="page-size-select">Show:</label>
          <select
            id="page-size-select"
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setCurrentPage(1);
            }}
          >
            <option value={5}>5 Rows</option>
            <option value={10}>10 Rows</option>
            <option value={20}>20 Rows</option>
            <option value={50}>50 Rows</option>
          </select>
        </div>
      </div>

      {/* Main Table Element */}
      <div className="table-scroll-wrapper">
        <table className="premium-data-table">
          <thead>
            <tr>
              {columns.map((col) => {
                const isSortedCol = sortConfig.key === col.key;
                const isSortable = col.sortable !== false;
                return (
                  <th
                    key={col.key}
                    id={`th-${col.key}`}
                    className={`${isSortable ? 'sortable-header' : ''} ${isSortedCol ? 'active-sort' : ''}`}
                    onClick={() => handleSort(col.key, isSortable)}
                    style={{ width: col.width || 'auto' }}
                  >
                    <div className="header-cell-content">
                      <span>{col.label}</span>
                      {isSortable && (
                        <span className="sort-icons">
                          {sortConfig.key === col.key ? (
                            sortConfig.direction === 'asc' ? ' 🔼' : ' 🔽'
                          ) : (
                            <span className="sort-placeholder"> ↕️</span>
                          )}
                        </span>
                      )}
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              // Pulse Loading Skeletons
              Array.from({ length: pageSize }).map((_, rowIndex) => (
                <tr key={`skeleton-row-${rowIndex}`}>
                  {columns.map((col, colIndex) => (
                    <td key={`skeleton-cell-${rowIndex}-${colIndex}`}>
                      <div className="skeleton-pulse-bar" />
                    </td>
                  ))}
                </tr>
              ))
            ) : paginatedData.length > 0 ? (
              // Real Data Rows
              paginatedData.map((row, rowIndex) => (
                <tr key={row.id || rowIndex} className="table-data-row">
                  {columns.map((col) => {
                    const value = row[col.key];
                    return (
                      <td key={`${row.id || rowIndex}-${col.key}`}>
                        {col.render ? col.render(value, row) : String(value ?? '')}
                      </td>
                    );
                  })}
                </tr>
              ))
            ) : (
              // Empty State UI
              <tr>
                <td colSpan={columns.length} className="empty-state-cell">
                  <div className="empty-state-container">
                    <svg className="empty-state-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
                      <line x1="9" y1="9" x2="9.01" y2="9"></line>
                      <line x1="15" y1="9" x2="15.01" y2="9"></line>
                    </svg>
                    <h4>No matching records found</h4>
                    <p>Try adjusting your search query or clear filter to view records.</p>
                    {searchQuery && (
                      <button className="reset-search-btn" onClick={() => { setSearchQuery(""); setCurrentPage(1); }}>
                        Clear Search
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Table Footer with Pagination Controls */}
      {!loading && sortedData.length > 0 && (
        <div className="table-footer">
          <div className="table-info">
            Showing <span>{Math.min(sortedData.length, (currentPage - 1) * pageSize + 1)}</span> to <span>{Math.min(sortedData.length, currentPage * pageSize)}</span> of <span>{sortedData.length}</span> entries
          </div>

          <div className="pagination-controls">
            <button
              id="prev-page-btn"
              className="page-nav-btn"
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Prev
            </button>

            <div className="page-numbers-container">
              {Array.from({ length: totalPages }).map((_, i) => {
                const pageNum = i + 1;
                return (
                  <button
                    key={`page-btn-${pageNum}`}
                    id={`page-btn-${pageNum}`}
                    className={`page-number-btn ${currentPage === pageNum ? 'active-page' : ''}`}
                    onClick={() => goToPage(pageNum)}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>

            <button
              id="next-page-btn"
              className="page-nav-btn"
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataTable;
