import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, ExternalLink, Copy, Check, BarChart3, Globe, Plus, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const API_BASE_URL = 'http://localhost:8000';

function App() {
  const [url, setUrl] = useState('');
  const [shortenedUrl, setShortenedUrl] = useState(null);
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copiedId, setCopiedId] = useState(null);

  useEffect(() => {
    fetchUrls();
  }, []);

  const fetchUrls = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/urls`);
      setUrls(response.data);
    } catch (err) {
      console.error('Failed to fetch URLs', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await axios.post(`${API_BASE_URL}/shorten`, { original_url: url });
      setShortenedUrl(response.data);
      setUrl('');
      fetchUrls();
    } catch (err) {
      setError(err.response?.data?.detail || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(`${API_BASE_URL}/${text}`);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="container">
      <header style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}
        >
          <div style={{ background: 'var(--primary)', padding: '0.75rem', borderRadius: '1rem' }}>
            <Globe size={32} color="white" />
          </div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800 }}>Shorty<span style={{ color: 'var(--primary)' }}>.io</span></h1>
        </motion.div>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>Premium URL Shortener for Modern Developers</p>
      </header>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card" 
        style={{ padding: '2.5rem', marginBottom: '4rem' }}
      >
        <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '1rem' }}>
          <div style={{ flex: 1, position: 'relative' }}>
            <input 
              type="text" 
              placeholder="Paste your long URL here..." 
              className="input-field"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
            />
          </div>
          <button className="btn btn-primary" type="submit" disabled={loading}>
            {loading ? 'Shortening...' : 'Shorten Now'}
            <ArrowRight size={20} />
          </button>
        </form>

        <AnimatePresence>
          {error && (
            <motion.p 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              style={{ color: '#ef4444', marginTop: '1rem', fontSize: '0.875rem' }}
            >
              {error}
            </motion.p>
          )}

          {shortenedUrl && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ 
                marginTop: '2rem', 
                padding: '1.5rem', 
                background: 'rgba(99, 102, 241, 0.1)', 
                borderRadius: '1rem',
                border: '1px solid rgba(99, 102, 241, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <p style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: 600, textTransform: 'uppercase', marginBottom: '0.25rem' }}>Success! Your short link:</p>
                <h3 style={{ fontSize: '1.25rem' }}>{API_BASE_URL}/{shortenedUrl.short_code}</h3>
              </div>
              <button 
                className="btn btn-primary" 
                onClick={() => copyToClipboard(shortenedUrl.short_code, 'new')}
              >
                {copiedId === 'new' ? <Check size={20} /> : <Copy size={20} />}
                {copiedId === 'new' ? 'Copied' : 'Copy'}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <section>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <BarChart3 size={24} color="var(--primary)" />
            Recent Links
          </h2>
          <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>{urls.length} links created</span>
        </div>

        <div className="stats-grid">
          {urls.map((u, index) => (
            <motion.div 
              key={u.short_code}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass-card url-item"
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ maxWidth: '80%' }}>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', marginBottom: '0.5rem' }}>
                    {u.original_url}
                  </p>
                  <h3 style={{ color: 'var(--primary)', cursor: 'pointer' }} onClick={() => window.open(`${API_BASE_URL}/${u.short_code}`, '_blank')}>
                    /{u.short_code}
                  </h3>
                </div>
                <button className="copy-btn" onClick={() => copyToClipboard(u.short_code, u.short_code)}>
                  {copiedId === u.short_code ? <Check size={16} /> : <Copy size={16} />}
                </button>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid var(--border)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent)' }}></div>
                  <span style={{ fontSize: '1.25rem', fontWeight: 700 }}>{u.clicks}</span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Clicks</span>
                </div>
                <div style={{ marginLeft: 'auto' }}>
                   <a href={`${API_BASE_URL}/${u.short_code}`} target="_blank" rel="noreferrer" style={{ color: 'var(--text-muted)' }}>
                     <ExternalLink size={18} />
                   </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default App;
