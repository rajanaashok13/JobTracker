import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div
      className="container"
      style={{
        minHeight: '65vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '3rem 1rem'
      }}
    >
      <div
        className="glass-card"
        style={{
          padding: '3rem 2rem',
          maxWidth: '520px',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1rem'
        }}
      >
        <span
          style={{
            fontSize: '5rem',
            fontWeight: 800,
            fontFamily: 'var(--font-heading)',
            lineHeight: 1,
            background: 'linear-gradient(135deg, var(--primary-600), var(--accent-cyan))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}
        >
          404
        </span>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 800 }}>Page Not Found</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', maxWidth: '380px' }}>
          The page you are looking for doesn't exist, has been moved, or is temporarily unavailable.
        </p>

        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
          <Link to="/" className="btn btn-secondary">
            <ArrowLeft size={16} />
            <span>Go Home</span>
          </Link>
          <Link to="/dashboard" className="btn btn-primary">
            <Home size={16} />
            <span>Go to Dashboard</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
