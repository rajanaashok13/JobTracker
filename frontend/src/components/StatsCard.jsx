import React from 'react';

const StatsCard = ({ title, count = 0, icon: Icon, color = 'primary', subtext }) => {
  const colorThemes = {
    primary: {
      gradient: 'linear-gradient(135deg, #D97706, #F59E0B)',
      bgLight: 'var(--primary-50)',
      textColor: 'var(--primary-700)',
      border: 'var(--primary-200)'
    },
    blue: {
      gradient: 'linear-gradient(135deg, #7C3AED, #8B5CF6)',
      bgLight: 'rgba(139, 92, 246, 0.1)',
      textColor: '#8B5CF6',
      border: 'rgba(139, 92, 246, 0.2)'
    },
    amethyst: {
      gradient: 'linear-gradient(135deg, #7C3AED, #8B5CF6)',
      bgLight: 'rgba(139, 92, 246, 0.1)',
      textColor: '#8B5CF6',
      border: 'rgba(139, 92, 246, 0.2)'
    },
    amber: {
      gradient: 'linear-gradient(135deg, #D97706, #F59E0B)',
      bgLight: 'rgba(217, 119, 6, 0.1)',
      textColor: '#D97706',
      border: 'rgba(217, 119, 6, 0.2)'
    },
    orange: {
      gradient: 'linear-gradient(135deg, #EA580C, #FF6B35)',
      bgLight: 'rgba(255, 107, 53, 0.1)',
      textColor: '#EA580C',
      border: 'rgba(255, 107, 53, 0.25)'
    },
    emerald: {
      gradient: 'linear-gradient(135deg, #EA580C, #FF6B35)',
      bgLight: 'rgba(255, 107, 53, 0.1)',
      textColor: '#EA580C',
      border: 'rgba(255, 107, 53, 0.25)'
    },
    rose: {
      gradient: 'linear-gradient(135deg, #DC2626, #EF4444)',
      bgLight: 'rgba(220, 38, 38, 0.1)',
      textColor: '#DC2626',
      border: 'rgba(220, 38, 38, 0.2)'
    }
  };

  const currentTheme = colorThemes[color] || colorThemes.primary;

  return (
    <div
      className="glass-card"
      style={{
        padding: '1.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
        <span
          style={{
            fontSize: '0.85rem',
            fontWeight: 600,
            color: 'var(--text-secondary)',
            textTransform: 'uppercase',
            letterSpacing: '0.04em'
          }}
        >
          {title}
        </span>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
          <span
            style={{
              fontSize: '2.25rem',
              fontWeight: 800,
              fontFamily: 'var(--font-heading)',
              color: 'var(--text-primary)',
              lineHeight: 1
            }}
          >
            {count}
          </span>
        </div>
        {subtext && (
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            {subtext}
          </span>
        )}
      </div>

      <div
        style={{
          width: '52px',
          height: '52px',
          borderRadius: 'var(--radius-lg)',
          background: currentTheme.gradient,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#FFFFFF',
          boxShadow: '0 8px 16px -4px rgba(0, 0, 0, 0.15)',
          flexShrink: 0
        }}
      >
        {Icon && <Icon size={26} strokeWidth={2} />}
      </div>
    </div>
  );
};

export default StatsCard;
