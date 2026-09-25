import React from 'react';

const LoadingSpinner = ({ size = 'medium', message = 'Loading...' }) => {
  const sizeMap = {
    small: { width: '20px', height: '20px', border: '2px' },
    medium: { width: '36px', height: '36px', border: '3px' },
    large: { width: '56px', height: '56px', border: '4px' }
  };

  const currentSize = sizeMap[size] || sizeMap.medium;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem', gap: '0.75rem' }}>
      <div
        style={{
          width: currentSize.width,
          height: currentSize.height,
          border: `${currentSize.border} solid var(--border-color)`,
          borderTopColor: 'var(--primary-600)',
          borderRadius: '50%',
          animation: 'spin 0.75s linear infinite'
        }}
      />
      {message && (
        <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: 500 }}>
          {message}
        </span>
      )}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default LoadingSpinner;
