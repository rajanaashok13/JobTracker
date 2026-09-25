import React from 'react';
import { AlertTriangle } from 'lucide-react';

const ConfirmModal = ({
  isOpen,
  title = 'Confirm Action',
  message = 'Are you sure you want to proceed?',
  confirmText = 'Delete',
  cancelText = 'Cancel',
  isDanger = true,
  onConfirm,
  onCancel,
  isLoading = false
}) => {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.65)',
        backdropFilter: 'blur(4px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        padding: '1rem',
        animation: 'fadeIn 0.2s ease-out'
      }}
      onClick={onCancel}
    >
      <div
        className="glass-card"
        style={{
          width: '100%',
          maxWidth: '440px',
          padding: '1.75rem',
          backgroundColor: 'var(--bg-secondary)',
          boxShadow: 'var(--shadow-xl)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-lg)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
          <div
            style={{
              padding: '0.65rem',
              borderRadius: '50%',
              backgroundColor: isDanger ? 'var(--status-rejected-bg)' : 'var(--primary-50)',
              color: isDanger ? '#DC2626' : 'var(--primary-600)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}
          >
            <AlertTriangle size={24} />
          </div>

          <div>
            <h4 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.35rem', color: 'var(--text-primary)' }}>
              {title}
            </h4>
            <p style={{ fontSize: '0.925rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
              {message}
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onCancel}
            disabled={isLoading}
          >
            {cancelText}
          </button>
          <button
            type="button"
            className={`btn ${isDanger ? 'btn-danger' : 'btn-primary'}`}
            onClick={onConfirm}
            disabled={isLoading}
          >
            {isLoading ? 'Processing...' : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
