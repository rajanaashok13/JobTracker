import React from 'react';
import { Send, CalendarCheck, CheckCircle2, XCircle } from 'lucide-react';
import './StatusBadge.css';

/**
 * StatusBadge Component
 * Well-labeled, animated status indicator for job application states:
 * - Applied (Amber beacon)
 * - Interview (Violet active pulse)
 * - Selected (Emerald celebration shimmer)
 * - Rejected (Subtle slate/rose badge)
 */
const StatusBadge = ({ status, showIcon = true, size = 'md' }) => {
  const normalizedStatus = status || 'Applied';

  const configs = {
    Applied: {
      label: 'Applied',
      sublabel: 'Under Review',
      badgeClass: 'status-badge-applied',
      icon: Send,
      color: '#f59e0b'
    },
    Interview: {
      label: 'Interview',
      sublabel: 'Active Rounds',
      badgeClass: 'status-badge-interview',
      icon: CalendarCheck,
      color: '#8b5cf6'
    },
    Selected: {
      label: 'Selected',
      sublabel: 'Offer / Cleared',
      badgeClass: 'status-badge-selected',
      icon: CheckCircle2,
      color: '#10b981'
    },
    Rejected: {
      label: 'Archived',
      sublabel: 'Closed',
      badgeClass: 'status-badge-rejected',
      icon: XCircle,
      color: '#f43f5e'
    }
  };

  const current = configs[normalizedStatus] || configs.Applied;
  const IconComponent = current.icon;

  return (
    <span
      className={`status-badge-root ${current.badgeClass} size-${size}`}
      title={`Application Status: ${current.label} (${current.sublabel})`}
    >
      <span className="status-badge-dot-wrapper">
        <span className="status-badge-dot" />
        <span className="status-badge-pulse" />
      </span>
      {showIcon && <IconComponent size={13} className="status-badge-icon" />}
      <span className="status-badge-text">{current.label}</span>
    </span>
  );
};

export default StatusBadge;
