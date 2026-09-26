import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Sparkles,
  ArrowRight,
  TrendingUp,
  Search,
  ShieldCheck,
  Layers,
  BarChart3,
  CheckCircle2,
  Briefcase,
  CalendarCheck,
  Send,
  Award
} from 'lucide-react';
import CompanyTicker from '../components/landing/CompanyTicker';
import InteractiveSearchDemo from '../components/landing/InteractiveSearchDemo';
import '../styles/Landing.css';

const LandingPage = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="landing-page">
      {/* Luxury Static Executive Background */}
      <div className="executive-static-bg" aria-hidden="true">
        <div className="executive-ambient-glow" />
        <div className="executive-grid-pattern" />
      </div>

      {/* ====================================================================
          HERO SECTION
          ==================================================================== */}
      <section className="hero-section" id="hero-section">
        <div className="container">
          <div className="hero-container">
            {/* Left Content Column */}
            <div className="hero-content">
              <div className="hero-badge">
                <Sparkles size={14} />
                <span>The Modern Job Application Tracker</span>
              </div>

              <h1 className="hero-title">
                Keep Your Job Search <span className="gradient-text">Organized</span> & Land Your Next Role
              </h1>

              <p className="hero-subtitle">
                Say goodbye to scattered spreadsheets and forgotten follow-ups. <strong>JobTrack</strong> gives you a clean, visual pipeline to track every job application, schedule interview rounds, compare offers, and accelerate your career.
              </p>

              <div className="hero-cta-group">
                {isAuthenticated ? (
                  <Link
                    to="/dashboard"
                    className="btn btn-primary btn-lg"
                    id="hero-dashboard-btn"
                  >
                    <span>Go to My Dashboard</span>
                    <ArrowRight size={18} />
                  </Link>
                ) : (
                  <>
                    <Link
                      to="/register"
                      className="btn btn-primary btn-lg"
                      id="hero-get-started-btn"
                    >
                      <span>Start Tracking Free</span>
                      <ArrowRight size={18} />
                    </Link>
                    <Link
                      to="/login"
                      className="btn btn-secondary btn-lg"
                      id="hero-signin-btn"
                    >
                      <span>Sign In</span>
                    </Link>
                  </>
                )}
              </div>

              <div className="hero-stats-row">
                <div className="hero-stat-item">
                  <span className="hero-stat-num">100%</span>
                  <span className="hero-stat-label">Free & Private</span>
                </div>
                <div className="hero-stat-divider" />
                <div className="hero-stat-item">
                  <span className="hero-stat-num">4 STAGES</span>
                  <span className="hero-stat-label">Visual Pipeline</span>
                </div>
                <div className="hero-stat-divider" />
                <div className="hero-stat-item">
                  <span className="hero-stat-num">INSTANT</span>
                  <span className="hero-stat-label">Search & Filters</span>
                </div>
              </div>
            </div>

            {/* Right Showcase Card Column */}
            <div className="hero-visual">
              <div className="showcase-card glass-card">
                <div className="showcase-header">
                  <div className="showcase-dots">
                    <span className="dot dot-red" />
                    <span className="dot dot-yellow" />
                    <span className="dot dot-green" />
                  </div>
                  <span className="showcase-title">JobTrack Pipeline Preview</span>
                  <span className="live-pill">Live Tracker</span>
                </div>

                <div className="showcase-body">
                  {/* Job 1: Stripe */}
                  <div className="mock-job-card">
                    <div className="mock-job-left">
                      <div className="mock-company-avatar stripe-avatar">S</div>
                      <div>
                        <div className="mock-job-title">Staff Backend Engineer</div>
                        <div className="mock-job-sub">Stripe • Remote • $190k - $220k</div>
                      </div>
                    </div>
                    <span className="mock-badge selected-badge">Offer Received</span>
                  </div>

                  {/* Job 2: Google */}
                  <div className="mock-job-card">
                    <div className="mock-job-left">
                      <div className="mock-company-avatar google-avatar">G</div>
                      <div>
                        <div className="mock-job-title">Senior Frontend Engineer</div>
                        <div className="mock-job-sub">Google • Mountain View • Hybrid</div>
                      </div>
                    </div>
                    <span className="mock-badge interview-badge">Interview Round 2</span>
                  </div>

                  {/* Job 3: Microsoft */}
                  <div className="mock-job-card">
                    <div className="mock-job-left">
                      <div className="mock-company-avatar microsoft-avatar">M</div>
                      <div>
                        <div className="mock-job-title">Cloud Systems Architect</div>
                        <div className="mock-job-sub">Microsoft • Seattle, WA • Onsite</div>
                      </div>
                    </div>
                    <span className="mock-badge applied-badge">Applied (Under Review)</span>
                  </div>

                  {/* Conversion Preview */}
                  <div className="showcase-chart-preview">
                    <div className="chart-preview-label">
                      <span>Interview Conversion Rate</span>
                      <span className="chart-preview-pct">68%</span>
                    </div>
                    <div className="chart-preview-bar">
                      <div className="chart-preview-fill" style={{ width: '68%' }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Target Companies Strip */}
      <CompanyTicker />

      {/* ====================================================================
          FEATURES SECTION
          ==================================================================== */}
      <section className="features-section" id="features">
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow">Everything You Need</span>
            <h2 className="section-heading">Designed for Focused Job Seekers</h2>
            <p className="section-subtext">
              Track applications effortlessly, keep interview rounds organized, and compare total compensation packages without messy spreadsheets.
            </p>
          </div>

          <div className="features-grid">
            <div className="feature-card glass-card">
              <div className="feature-icon-wrapper blue-icon">
                <Briefcase size={22} />
              </div>
              <h3 className="feature-card-title">Visual Application Pipeline</h3>
              <p className="feature-card-desc">
                Follow each position from the moment you submit your resume through initial screening, technical interviews, and final offers.
              </p>
            </div>

            <div className="feature-card glass-card">
              <div className="feature-icon-wrapper purple-icon">
                <CalendarCheck size={22} />
              </div>
              <h3 className="feature-card-title">Interview Round Notes</h3>
              <p className="feature-card-desc">
                Store recruiter contacts, interview dates, behavioral talking points, and technical questions in clean, dedicated application cards.
              </p>
            </div>

            <div className="feature-card glass-card">
              <div className="feature-icon-wrapper cyan-icon">
                <TrendingUp size={22} />
              </div>
              <h3 className="feature-card-title">Clear Conversion Metrics</h3>
              <p className="feature-card-desc">
                Gain real visibility into your application funnel with automatic conversion rates, active interview counts, and offer velocity.
              </p>
            </div>

            <div className="feature-card glass-card">
              <div className="feature-icon-wrapper emerald-icon">
                <Search size={22} />
              </div>
              <h3 className="feature-card-title">Instant Search & Filtering</h3>
              <p className="feature-card-desc">
                Find any job in seconds by role title, company name, location, or pipeline status with zero lag or delay.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          INTERACTIVE SEARCH DEMO
          ==================================================================== */}
      <section className="features-section" id="interactive-demo">
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow">Try It Live</span>
            <h2 className="section-heading">Filter & Search in Real Time</h2>
            <p className="section-subtext">
              Experience the fast, responsive search engine built into JobTrack. Test keywords and status filters below.
            </p>
          </div>

          <InteractiveSearchDemo />
        </div>
      </section>

      {/* ====================================================================
          HOW IT WORKS SECTION
          ==================================================================== */}
      <section className="how-it-works-section" id="how-it-works">
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow">Simple Workflow</span>
            <h2 className="section-heading">How JobTrack Works in 3 Steps</h2>
            <p className="section-subtext">
              Built to save you time so you can focus on interview preparation and landing the right offer.
            </p>
          </div>

          <div className="steps-grid">
            <div className="step-card glass-card">
              <div className="step-number">01</div>
              <h3 className="step-title">Log Applications</h3>
              <p className="step-desc">
                Add job title, company, salary range, and job posting link in under 15 seconds. Keep your pipeline populated.
              </p>
            </div>

            <div className="step-card glass-card">
              <div className="step-number">02</div>
              <h3 className="step-title">Manage Interview Stages</h3>
              <p className="step-desc">
                Move applications through screening, technical assessments, and panel interviews with a single click.
              </p>
            </div>

            <div className="step-card glass-card">
              <div className="step-number">03</div>
              <h3 className="step-title">Compare Offers & Decide</h3>
              <p className="step-desc">
                Review base salary, benefits, and working arrangements side-by-side to make the best decision for your career.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          FINAL CALL TO ACTION
          ==================================================================== */}
      <section className="container" id="cta">
        <div className="cta-banner">
          <h2>Ready to Take Control of Your Job Search?</h2>
          <p className="text-secondary">
            Join candidates tracking their job applications with clarity, confidence, and zero stress.
          </p>
          <div className="hero-cta-group" style={{ justifyContent: 'center' }}>
            {isAuthenticated ? (
              <Link to="/dashboard" className="btn btn-primary btn-lg" id="final-dashboard-btn">
                <span>Open Your Dashboard</span>
                <ArrowRight size={18} />
              </Link>
            ) : (
              <>
                <Link to="/register" className="btn btn-primary btn-lg" id="final-register-btn">
                  <span>Create Free Account</span>
                  <ArrowRight size={18} />
                </Link>
                <Link to="/login" className="btn btn-secondary btn-lg" id="final-signin-btn">
                  <span>Sign In</span>
                </Link>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
