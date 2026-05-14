import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, PlusCircle, CheckCircle2, Clock, Circle } from 'lucide-react';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/tasks', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.status === 401) {
        // Token expired or invalid
        localStorage.removeItem('token');
        navigate('/login');
        return;
      }

      if (!response.ok) {
        throw new Error('Failed to fetch tasks');
      }

      const data = await response.json();
      setTasks(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const createTask = async () => {
    const title = prompt('Enter task title:');
    if (!title) return;

    const token = localStorage.getItem('token');
    try {
      const response = await fetch('http://localhost:8000/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ title, description: 'New task created from dashboard', status: 'todo' })
      });

      if (response.ok) {
        fetchTasks();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const renderStatusIcon = (status) => {
    switch(status) {
      case 'done': return <CheckCircle2 size={16} color="var(--success)" />;
      case 'in_progress': return <Clock size={16} color="var(--primary)" />;
      default: return <Circle size={16} color="var(--text-muted)" />;
    }
  };

  if (loading) {
    return <div className="auth-container">Loading...</div>;
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div>
          <h1 style={{ color: 'var(--primary)', marginBottom: '4px' }}>My Tasks</h1>
          <p style={{ color: 'var(--text-muted)' }}>Manage your personal tasks securely.</p>
        </div>
        <div style={{ display: 'flex', gap: '16px' }}>
          <button onClick={createTask} className="btn-primary" style={{ marginTop: 0, padding: '8px 16px', display: 'flex', alignItems: 'center', gap: '8px', width: 'auto' }}>
            <PlusCircle size={18} /> New Task
          </button>
          <button onClick={handleLogout} className="btn-logout" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <LogOut size={18} /> Logout
          </button>
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}

      {tasks.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px', background: 'var(--card-bg)', borderRadius: '12px', border: '1px dashed var(--border)' }}>
          <h3 style={{ marginBottom: '10px' }}>No tasks found</h3>
          <p style={{ color: 'var(--text-muted)' }}>You don't have any tasks yet. Create one to get started!</p>
        </div>
      ) : (
        <div className="tasks-grid">
          {tasks.map(task => (
            <div key={task.id} className="task-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                <h3 className="task-title">{task.title}</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }} className={`badge badge-${task.status}`}>
                  {renderStatusIcon(task.status)}
                  {task.status.replace('_', ' ')}
                </div>
              </div>
              <p className="task-desc">{task.description || 'No description provided.'}</p>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '20px', borderTop: '1px solid var(--border)', paddingTop: '12px' }}>
                Created: {new Date(task.created_at).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
