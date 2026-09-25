import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Briefcase,
  TrendingUp,
  Search,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  BarChart3,
  Clock,
  Layers
} from 'lucide-react';
import '../styles/Landing.css';

const LandingPage = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container hero-container">
          <div className="hero-content">
            <div className="hero-badge">
              <Sparkles size={16} />
              <span>Job Hunt Supercharged</span>
            </div>

            <h1 className="hero-title">
              Organize, Track, and Land Your Dream Job with{' '}
              <span className="gradient-text">JobTrack</span>
            </h1>

            <p className="hero-subtitle">
              Say goodbye to messy spreadsheets. Track every application from Applied
              to Interview, Selection, and Offer with intuitive dashboards and real-time statistics.
            </p>

            <div className="hero-cta-group">
              {isAuthenticated ? (
                <Link to="/dashboard" className="btn btn-primary btn-lg" id="hero-dashboard-btn">
                  <span>Go to My Dashboard</span>
                  <ArrowRight size={18} />
                </Link>
              ) : (
                <>
                  <Link to="/register" className="btn btn-primary btn-lg" id="hero-get-started-btn">
                    <span>Get Started Free</span>
                    <ArrowRight size={18} />
                  </Link>
                  <Link to="/login" className="btn btn-secondary btn-lg" id="hero-signin-btn">
                    <span>Sign In</span>
                  </Link>
                </>
              )}
            </div>

            {/* Micro stats banner */}
            <div className="hero-stats-row">
              <div className="hero-stat-item">
                <span className="hero-stat-num">100%</span>
                <span className="hero-stat-label">Free & Secure</span>
              </div>
              <div className="hero-stat-divider" />
              <div className="hero-stat-item">
                <span className="hero-stat-num">4 Stages</span>
                <span className="hero-stat-label">Clear Status Tracking</span>
              </div>
              <div className="hero-stat-divider" />
              <div className="hero-stat-item">
                <span className="hero-stat-num">Instant</span>
                <span className="hero-stat-label">Analytics & Charts</span>
              </div>
            </div>
          </div>

          {/* Hero Visual Showcase */}
          <div className="hero-visual">
            <div className="showcase-card glass-card">
              <div className="showcase-header">
                <div className="showcase-dots">
                  <span className="dot dot-red" />
                  <span className="dot dot-yellow" />
                  <span className="dot dot-green" />
                </div>
                <span className="showcase-title">JobTrack Application Matrix</span>
                <span className="live-pill">Live Pipeline</span>
              </div>

              <div className="showcase-body">
                {/* Mock Job 1 */}
                <div className="mock-job-card">
                  <div className="mock-job-left">
                    <div className="mock-company-avatar google-avatar">G</div>
                    <div>
                      <div className="mock-job-title">Software Engineer</div>
                      <div className="mock-job-sub">Google • Mountain View, CA (Hybrid)</div>
                    </div>
                  </div>
                  <span className="mock-badge interview-badge">Interview</span>
                </div>

                {/* Mock Job 2 */}
                <div className="mock-job-card">
                  <div className="mock-job-left">
                    <div className="mock-company-avatar microsoft-avatar">M</div>
                    <div>
                      <div className="mock-job-title">Full Stack Developer</div>
                      <div className="mock-job-sub">Microsoft • Redmond, WA (Remote)</div>
                    </div>
                  </div>
                  <span className="mock-badge selected-badge">Selected 🎉</span>
                </div>

                {/* Mock Job 3 */}
                <div className="mock-job-card">
                  <div className="mock-job-left">
                    <div className="mock-company-avatar stripe-avatar">S</div>
                    <div>
                      <div className="mock-job-title">Frontend Engineer</div>
                      <div className="mock-job-sub">Stripe • San Francisco, CA</div>
                    </div>
                  </div>
                  <span className="mock-badge applied-badge">Applied</span>
                </div>

                {/* Mini Stat bar */}
                <div className="showcase-chart-preview">
                  <div className="chart-preview-label">
                    <span>Interview Conversion</span>
                    <span className="chart-preview-pct">75%</span>
                  </div>
                  <div className="chart-preview-bar">
                    <div className="chart-preview-fill" style={{ width: '75%' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section" id="features">
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow">Comprehensive Toolkit</span>
            <h2 className="section-heading">Everything You Need To Master Your Job Pipeline</h2>
            <p className="section-subtext">
              Designed specifically for students, fresh graduates, and career changers looking to organize their job search.
            </p>
          </div>

          <div className="features-grid">
            <div className="feature-card glass-card">
              <div className="feature-icon-wrapper blue-icon">
                <Layers size={24} />
              </div>
              <h3 className="feature-card-title">4-Stage Pipeline</h3>
              <p className="feature-card-desc">
                Seamlessly categorize applications into Applied, Interview, Selected, or Rejected. Update them anytime as your interview process progresses.
              </p>
            </div>

            <div className="feature-card glass-card">
              <div className="feature-icon-wrapper purple-icon">
                <BarChart3 size={24} />
              </div>
              <h3 className="feature-card-title">Visual Analytics</h3>
              <p className="feature-card-desc">
                See your application statistics, interview conversion rates, and volume at a glance with clean interactive Bar and Donut charts.
              </p>
            </div>

            <div className="feature-card glass-card">
              <div className="feature-icon-wrapper cyan-icon">
                <Search size={24} />
              </div>
              <h3 className="feature-card-title">Instant Search & Filter</h3>
              <p className="feature-card-desc">
                Find any application in milliseconds. Filter by company name, job role, status, or search through custom interview notes.
              </p>
            </div>

            <div className="feature-card glass-card">
              <div className="feature-icon-wrapper emerald-icon">
                <ShieldCheck size={24} />
              </div>
              <h3 className="feature-card-title">Secure & Private</h3>
              <p className="feature-card-desc">
                Built with industry standard JWT token authentication and bcrypt password encryption. Your applications and notes are strictly private.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="how-it-works-section" id="how-it-works">
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow">Simple Workflow</span>
            <h2 className="section-heading">Get Started in 3 Simple Steps</h2>
          </div>

          <div className="steps-grid">
            <div className="step-card glass-card">
              <div className="step-number">01</div>
              <h4 className="step-title">Create Free Account</h4>
              <p className="step-desc">
                Register with your name and email in under 30 seconds. No credit card required.
              </p>
            </div>

            <div className="step-card glass-card">
              <div className="step-number">02</div>
              <h4 className="step-title">Log Job Applications</h4>
              <p className="step-desc">
                Record company details, salary, posting link, interview dates, and custom notes.
              </p>
            </div>

            <div className="step-card glass-card">
              <div className="step-number">03</div>
              <h4 className="step-title">Track & Ace Interviews</h4>
              <p className="step-desc">
                Keep notes for every round, follow up on time, and track your progress to an offer.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="cta-banner-section">
        <div className="container">
          <div className="cta-banner glass-card">
            <h2>Ready to Take Control of Your Career?</h2>
            <p>Join thousands of candidates organizing their job search with clarity and confidence.</p>
            <div className="cta-banner-buttons">
              <Link to="/register" className="btn btn-primary btn-lg" id="bottom-cta-register">
                Start Tracking Today – It's Free
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
