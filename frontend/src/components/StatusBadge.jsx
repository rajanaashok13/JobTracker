import React from 'react';

const StatusBadge = ({ status }) => {
  const normalizedStatus = status || 'Applied';

  const statusStyles = {
    Applied: {
      bg: 'var(--status-applied-bg)',
      color: 'var(--status-applied-text)',
      border: 'var(--status-applied-border)',
      dotColor: '#2563EB'
    },
    Interview: {
      bg: 'var(--status-interview-bg)',
      color: 'var(--status-interview-text)',
      border: 'var(--status-interview-border)',
      dotColor: '#D97706'
    },
    Selected: {
      bg: 'var(--status-selected-bg)',
      color: 'var(--status-selected-text)',
      border: 'var(--status-selected-border)',
      dotColor: '#059669'
    },
    Rejected: {
      bg: 'var(--status-rejected-bg)',
      color: 'var(--status-rejected-text)',
      border: 'var(--status-rejected-border)',
      dotColor: '#DC2626'
    }
  };

  const style = statusStyles[normalizedStatus] || statusStyles.Applied;

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.4rem',
        padding: '0.28rem 0.75rem',
        borderRadius: 'var(--radius-full)',
        backgroundColor: style.bg,
        color: style.color,
        border: `1px solid ${style.border}`,
        fontSize: '0.8rem',
        fontWeight: 600,
        letterSpacing: '0.02em',
        textTransform: 'capitalize'
      }}
    >
      <span
        style={{
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          backgroundColor: style.dotColor
        }}
      />
      {normalizedStatus}
    </span>
  );
};

export default StatusBadge;
