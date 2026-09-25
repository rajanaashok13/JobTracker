import React from 'react';
import { Briefcase, Heart, Github, Linkedin, ExternalLink } from 'lucide-react';

const Footer = () => {
  return (
    <footer
      style={{
        borderTop: '1px solid var(--border-color)',
        backgroundColor: 'var(--bg-secondary)',
        padding: '3rem 0 2rem 0',
        marginTop: 'auto'
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '2.5rem',
            marginBottom: '2.5rem'
          }}
        >
          {/* Brand & Mission */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.9rem' }}>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: 'var(--radius-md)',
                  background: 'linear-gradient(135deg, var(--primary-600), var(--accent-cyan))',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFFFFF'
                }}
              >
                <Briefcase size={17} />
              </div>
              <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 800 }}>
                Job<span style={{ color: 'var(--primary-600)' }}>Track</span>
              </span>
            </div>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              A full-stack MERN application to organize, track, and master your career opportunities with status insights and performance metrics.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Application
            </h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.9rem' }}>
              <li>
                <a href="/dashboard">Dashboard</a>
              </li>
              <li>
                <a href="/applications">All Applications</a>
              </li>
              <li>
                <a href="/add-job">Add New Job</a>
              </li>
              <li>
                <a href="/profile">User Profile</a>
              </li>
            </ul>
          </div>

          {/* Technology Stack */}
          <div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              MERN Architecture
            </h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
              {['React.js', 'Vite', 'Node.js', 'Express.js', 'MongoDB Atlas', 'JWT Auth', 'Mongoose', 'REST API'].map((tech) => (
                <span
                  key={tech}
                  style={{
                    fontSize: '0.78rem',
                    padding: '0.2rem 0.6rem',
                    backgroundColor: 'var(--bg-tertiary)',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border-color)',
                    color: 'var(--text-secondary)'
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: '1px solid var(--border-color)',
            paddingTop: '1.5rem',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            fontSize: '0.875rem',
            color: 'var(--text-muted)'
          }}
        >
          <div>
            © {new Date().getFullYear()} JobTrack. Built for college portfolio & professional demonstrations.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <span>Crafted with</span>
            <Heart size={14} color="#EF4444" fill="#EF4444" />
            <span>using the MERN Stack</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
