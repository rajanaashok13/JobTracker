import React, { useState } from 'react';

const StatChart = ({ stats = { applied: 0, interview: 0, selected: 0, rejected: 0 }, bare = false }) => {
  const [activeTab, setActiveTab] = useState('bar');

  const total = (stats.applied || 0) + (stats.interview || 0) + (stats.selected || 0) + (stats.rejected || 0);

  const dataItems = [
    {
      label: 'Applied',
      count: stats.applied || 0,
      color: '#F59E0B',
      percentage: total > 0 ? Math.round(((stats.applied || 0) / total) * 100) : 0
    },
    {
      label: 'Interview',
      count: stats.interview || 0,
      color: '#8B5CF6',
      percentage: total > 0 ? Math.round(((stats.interview || 0) / total) * 100) : 0
    },
    {
      label: 'Selected',
      count: stats.selected || 0,
      color: '#FF6B35',
      percentage: total > 0 ? Math.round(((stats.selected || 0) / total) * 100) : 0
    },
    {
      label: 'Rejected',
      count: stats.rejected || 0,
      color: '#EF4444',
      percentage: total > 0 ? Math.round(((stats.rejected || 0) / total) * 100) : 0
    }
  ];

  // SVG Donut calculation
  const radius = 64;
  const circumference = 2 * Math.PI * radius;
  let accumulatedOffset = 0;

  const content = (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
        <div>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>Application Analytics</h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: '0.2rem 0 0 0' }}>Status distribution breakdown</p>
        </div>
        <div style={{ display: 'flex', gap: '0.25rem', backgroundColor: 'var(--bg-tertiary)', padding: '3px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
          <button
            onClick={() => setActiveTab('bar')}
            style={{
              padding: '0.35rem 0.75rem',
              fontSize: '0.75rem',
              fontWeight: 600,
              borderRadius: 'var(--radius-sm)',
              border: 'none',
              cursor: 'pointer',
              backgroundColor: activeTab === 'bar' ? 'var(--bg-secondary)' : 'transparent',
              color: activeTab === 'bar' ? 'var(--primary-600)' : 'var(--text-muted)',
              boxShadow: activeTab === 'bar' ? 'var(--shadow-sm)' : 'none',
              transition: 'all var(--transition-fast)'
            }}
          >
            Bar
          </button>
          <button
            onClick={() => setActiveTab('donut')}
            style={{
              padding: '0.35rem 0.75rem',
              fontSize: '0.75rem',
              fontWeight: 600,
              borderRadius: 'var(--radius-sm)',
              border: 'none',
              cursor: 'pointer',
              backgroundColor: activeTab === 'donut' ? 'var(--bg-secondary)' : 'transparent',
              color: activeTab === 'donut' ? 'var(--primary-600)' : 'var(--text-muted)',
              boxShadow: activeTab === 'donut' ? 'var(--shadow-sm)' : 'none',
              transition: 'all var(--transition-fast)'
            }}
          >
            Donut
          </button>
        </div>
      </div>

      {total === 0 ? (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem 0', color: 'var(--text-muted)' }}>
          <p style={{ fontSize: '0.95rem' }}>No application data yet to display.</p>
          <p style={{ fontSize: '0.85rem' }}>Add your first application to unlock live metrics!</p>
        </div>
      ) : activeTab === 'bar' ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem', flex: 1, justifyContent: 'center' }}>
          {dataItems.map((item) => (
            <div key={item.label}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem', fontSize: '0.875rem' }}>
                <span style={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: item.color }} />
                  {item.label}
                </span>
                <span style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>
                  {item.count} ({item.percentage}%)
                </span>
              </div>
              <div
                style={{
                  height: '10px',
                  width: '100%',
                  backgroundColor: 'var(--bg-tertiary)',
                  borderRadius: 'var(--radius-full)',
                  overflow: 'hidden'
                }}
              >
                <div
                  style={{
                    height: '100%',
                    width: `${item.percentage}%`,
                    backgroundColor: item.color,
                    borderRadius: 'var(--radius-full)',
                    transition: 'width 0.8s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', flex: 1, padding: '1rem 0' }}>
          {/* SVG Donut Chart */}
          <div style={{ position: 'relative', width: '160px', height: '160px' }}>
            <svg width="160" height="160" viewBox="0 0 160 160" style={{ transform: 'rotate(-90deg)' }}>
              <circle
                cx="80"
                cy="80"
                r={radius}
                fill="transparent"
                stroke="var(--bg-tertiary)"
                strokeWidth="18"
              />
              {dataItems.map((item) => {
                const strokeDasharray = `${(item.percentage / 100) * circumference} ${circumference}`;
                const strokeDashoffset = -accumulatedOffset;
                accumulatedOffset += (item.percentage / 100) * circumference;

                if (item.count === 0) return null;

                return (
                  <circle
                    key={item.label}
                    cx="80"
                    cy="80"
                    r={radius}
                    fill="transparent"
                    stroke={item.color}
                    strokeWidth="18"
                    strokeDasharray={strokeDasharray}
                    strokeDashoffset={strokeDashoffset}
                    style={{ transition: 'stroke-dasharray 0.6s ease' }}
                  />
                );
              })}
            </svg>
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <span style={{ fontSize: '1.75rem', fontWeight: 800, fontFamily: 'var(--font-heading)', lineHeight: 1 }}>
                {total}
              </span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Total
              </span>
            </div>
          </div>

          {/* Legend */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            {dataItems.map((item) => (
              <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: item.color }} />
                <span style={{ color: 'var(--text-secondary)', minWidth: '70px' }}>{item.label}:</span>
                <span style={{ fontWeight: 700 }}>{item.count}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  if (bare) {
    return content;
  }

  return (
    <div className="glass-card" style={{ padding: '1.5rem', height: '100%', display: 'flex', flexDirection: 'column' }}>
      {content}
    </div>
  );
};

export default StatChart;
