import React from 'react';
import './BrandLogo.css';

/**
 * BrandLogo Component
 * Bespoke, modern vector logo tailored for JobTrack - Job Application Management System.
 * Combines a smart career portfolio briefcase with an ascending pipeline trajectory arrow
 * and a live telemetry radar pulse beacon.
 */
const BrandLogo = ({
  size = 'md',
  showBadge = true,
  badgeText = 'SYSTEM',
  showSubtitle = false,
  subtitleText = 'Job Application OS',
  interactive = true,
  className = ''
}) => {
  return (
    <div className={`brand-logo-container size-${size} ${interactive ? 'is-interactive' : ''} ${className}`}>
      <div className="brand-logo-mark" aria-hidden="true">
        <svg
          viewBox="0 0 44 44"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="brand-logo-svg"
        >
          <defs>
            <linearGradient id="brandGradBg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f59e0b" />
              <stop offset="50%" stopColor="#ff6b35" />
              <stop offset="100%" stopColor="#d97706" />
            </linearGradient>

            <linearGradient id="brandArrowGrad" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#ffffff" />
            </linearGradient>

            <filter id="brandGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#f59e0b" floodOpacity="0.4" />
            </filter>
          </defs>

          {/* Squircle Background Base */}
          <rect
            x="2"
            y="2"
            width="40"
            height="40"
            rx="11"
            fill="url(#brandGradBg)"
            className="logo-bg-squircle"
          />

          {/* Briefcase Handle */}
          <path
            d="M15 15V13C15 11.3431 16.3431 10 18 10H26C27.6569 10 29 11.3431 29 13V15"
            stroke="white"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeOpacity="0.85"
          />

          {/* Briefcase Body Top Edge */}
          <path
            d="M9 17C9 15.8954 9.89543 15 11 15H33C34.1046 15 35 15.8954 35 17V31C35 32.6569 33.6569 34 32 34H12C10.3431 34 9 32.6569 9 31V17Z"
            stroke="white"
            strokeWidth="2.4"
            strokeLinejoin="round"
            strokeOpacity="0.3"
          />

          {/* Center Ascending Trajectory & Milestone Path (Career Growth Arrow) */}
          <path
            d="M14 27L20.5 20.5L25 25L30.5 18.5"
            stroke="url(#brandArrowGrad)"
            strokeWidth="2.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="logo-trajectory-path"
          />

          {/* Arrowhead on trajectory */}
          <path
            d="M26.5 18.5H30.5V22.5"
            stroke="url(#brandArrowGrad)"
            strokeWidth="2.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="logo-arrowhead"
          />

          {/* Pipeline Milestone Beads on path */}
          <circle cx="14" cy="27" r="2.2" fill="#ffffff" />
          <circle cx="20.5" cy="20.5" r="2" fill="#ffffff" />
          <circle cx="25" cy="25" r="2" fill="#ffffff" />

          {/* Real-time Tracking Beacon (Pulsing Top Right) */}
          <circle cx="34" cy="10" r="3.5" fill="#10b981" className="logo-beacon-dot" />
          <circle cx="34" cy="10" r="6" stroke="#10b981" strokeWidth="1.5" className="logo-beacon-ring" />
        </svg>
      </div>

      <div className="brand-logo-text-col">
        <div className="brand-title-row">
          <span className="brand-name-main">Job</span>
          <span className="brand-name-accent">Track</span>
          {showBadge && (
            <span className="brand-badge-pill">
              <span className="badge-pulse-indicator" />
              {badgeText}
            </span>
          )}
        </div>
        {showSubtitle && <span className="brand-subtitle-label">{subtitleText}</span>}
      </div>
    </div>
  );
};

export default BrandLogo;
