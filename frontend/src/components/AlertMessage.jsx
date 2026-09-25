import React from 'react';
import { AlertCircle, CheckCircle, Info, X, AlertTriangle } from 'lucide-react';

const AlertMessage = ({ type = 'error', message, onClose }) => {
  if (!message) return null;

  const config = {
    error: {
      bg: 'var(--status-rejected-bg)',
      border: 'var(--status-rejected-border)',
      text: 'var(--status-rejected-text)',
      Icon: AlertCircle
    },
    success: {
      bg: 'var(--status-selected-bg)',
      border: 'var(--status-selected-border)',
      text: 'var(--status-selected-text)',
      Icon: CheckCircle
    },
    warning: {
      bg: 'var(--status-interview-bg)',
      border: 'var(--status-interview-border)',
      text: 'var(--status-interview-text)',
      Icon: AlertTriangle
    },
    info: {
      bg: 'var(--status-applied-bg)',
      border: 'var(--status-applied-border)',
      text: 'var(--status-applied-text)',
      Icon: Info
    }
  };

  const { bg, border, text, Icon } = config[type] || config.error;

  return (
    <div
      role="alert"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0.85rem 1.15rem',
        borderRadius: 'var(--radius-md)',
        backgroundColor: bg,
        border: `1px solid ${border}`,
        color: text,
        marginBottom: '1.25rem',
        gap: '0.75rem',
        fontSize: '0.925rem',
        animation: 'fadeIn 0.25s ease'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
        <Icon size={18} style={{ flexShrink: 0 }} />
        <span>{message}</span>
      </div>

      {onClose && (
        <button
          onClick={onClose}
          aria-label="Dismiss alert"
          style={{
            color: text,
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '2px',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
};

export default AlertMessage;
