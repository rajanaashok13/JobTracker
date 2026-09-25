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
  Terminal,
  Zap,
  Compass,
  Briefcase,
  Flame,
  Award,
  ChevronRight
} from 'lucide-react';
import ThreeHeroScene from '../components/landing/ThreeHeroScene';
import ChapterNav from '../components/landing/ChapterNav';
import PipelineSimulator from '../components/landing/PipelineSimulator';
import CompanyTicker from '../components/landing/CompanyTicker';
import InteractiveSearchDemo from '../components/landing/InteractiveSearchDemo';
import AudioToggle from '../components/landing/AudioToggle';
import MagneticCard from '../components/landing/MagneticCard';
import { playHoverSound, playOfferCelebration } from '../components/landing/SoundEffects';
import '../styles/MugenLanding.css';

const LandingPage = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="mugen-landing-page">
      {/* Three.js Interactive 3D WebGL Canvas Layer */}
      <ThreeHeroScene />

      {/* Atmospheric Ambient Lighting Gradients */}
      <div className="mugen-bg-atmosphere" aria-hidden="true">
        <div className="ambient-light-orb orb-primary" />
        <div className="ambient-light-orb orb-cyan" />
        <div className="ambient-light-orb orb-purple" />
      </div>

      {/* Signature Mugen Vertical Milestone Chapter Rail */}
      <ChapterNav />

      {/* Floating Audio Micro-interaction Toggle */}
      <div className="audio-toggle-wrapper">
        <AudioToggle />
      </div>

      {/* ====================================================================
          CHAPTER 01 // RADAR (HERO SECTION)
          ==================================================================== */}
      <section className="mugen-hero-section" id="hero-chapter">
        <div className="container">
          <div className="hero-matrix-grid">
            {/* Monumental Left Column */}
            <div className="hero-monument-content">
              <div className="cyber-status-badge">
                <span className="radar-blip" />
                <span>PROTOCOL // CAREER_MATRIX_V2.5</span>
              </div>

              <h1 className="monumental-title">
                <span className="monumental-line-1">ORCHESTRATE</span>
                <span className="monumental-line-2">YOUR CAREER</span>
              </h1>

              <p className="monumental-subtitle">
                Say goodbye to fragmented spreadsheets. <strong>JobTrack</strong> accelerates your hiring journey from <strong>Applied</strong> to <strong>Interview</strong>, <strong>Selection</strong>, and <strong>Offer</strong> with real-time pipeline telemetry and sub-second metrics.
              </p>

              {/* Action Buttons */}
              <div className="hero-cta-matrix">
                {isAuthenticated ? (
                  <Link
                    to="/dashboard"
                    className="btn-cyber-primary"
                    id="hero-dashboard-btn"
                    onMouseEnter={playHoverSound}
                  >
                    <span>Enter Mission Control</span>
                    <ArrowRight size={18} />
                  </Link>
                ) : (
                  <>
                    <Link
                      to="/register"
                      className="btn-cyber-primary"
                      id="hero-get-started-btn"
                      onMouseEnter={playHoverSound}
                    >
                      <span>Start Tracking Free</span>
                      <ArrowRight size={18} />
                    </Link>
                    <Link
                      to="/login"
                      className="btn-cyber-secondary"
                      id="hero-signin-btn"
                      onMouseEnter={playHoverSound}
                    >
                      <span>Sign In</span>
                    </Link>
                  </>
                )}
              </div>

              {/* Telemetry Micro Stats */}
              <div className="hero-telemetry-row">
                <div className="telemetry-item">
                  <span className="telemetry-num">100%</span>
                  <span className="telemetry-label">Free & Private</span>
                </div>
                <div className="telemetry-divider" />
                <div className="telemetry-item">
                  <span className="telemetry-num">4 STAGES</span>
                  <span className="telemetry-label">Zero-Friction Matrix</span>
                </div>
                <div className="telemetry-divider" />
                <div className="telemetry-item">
                  <span className="telemetry-num">&lt; 1.0s</span>
                  <span className="telemetry-label">Real-Time Sync</span>
                </div>
              </div>
            </div>

            {/* Interactive 3D Pipeline Simulator Right Column */}
            <div className="hero-monument-visual">
              <PipelineSimulator />
            </div>
          </div>
        </div>
      </section>

      {/* Kinetic Infinite Company Radar Marquee */}
      <CompanyTicker />

      {/* ====================================================================
          CHAPTER 02 // PIPELINE MATRIX (THE 4-STAGE KANBAN CORE)
          ==================================================================== */}
      <section className="mugen-section" id="pipeline-chapter">
        <div className="container">
          <div className="section-monument-header">
            <span className="section-code-pill">
              <Terminal size={14} />
              <span>CHAPTER 02 // PIPELINE ACCELERATOR</span>
            </span>
            <h2 className="section-monument-heading">
              A 4-STAGE ARCHITECTURE DESIGNED TO LAND OFFERS
            </h2>
            <p className="section-monument-desc">
              Every job opportunity flows through a high-precision pipeline with dedicated notes, follow-up timelines, and 1-click status transitions.
            </p>
          </div>

          <div className="telemetry-bento-grid">
            <MagneticCard className="bento-stat-card" intensity={12}>
              <div className="bento-stat-icon cyan-glow">
                <Compass size={22} />
              </div>
              <span className="bento-stat-num">01 // APPLIED</span>
              <h3 className="bento-stat-label">Source & Track Every Lead</h3>
              <p className="bento-stat-sub">
                Capture company, job posting link, compensation expectations, and referral sources in under 15 seconds.
              </p>
            </MagneticCard>

            <MagneticCard className="bento-stat-card" intensity={12}>
              <div className="bento-stat-icon purple-glow">
                <Flame size={22} />
              </div>
              <span className="bento-stat-num">02 // INTERVIEW</span>
              <h3 className="bento-stat-label">Ace Multiple Technical Rounds</h3>
              <p className="bento-stat-sub">
                Document recruiter chats, coding challenges, system design debriefs, and behavioral questions in formatted notes.
              </p>
            </MagneticCard>

            <MagneticCard className="bento-stat-card" intensity={12}>
              <div className="bento-stat-icon emerald-glow">
                <Award size={22} />
              </div>
              <span className="bento-stat-num">03 // SELECTED</span>
              <h3 className="bento-stat-label">Celebrate Round Clearance</h3>
              <p className="bento-stat-sub">
                Hiring committee approvals and final round clearings flagged with celebratory milestones and offer prep.
              </p>
            </MagneticCard>

            <MagneticCard className="bento-stat-card" intensity={12}>
              <div className="bento-stat-icon">
                <Zap size={22} />
              </div>
              <span className="bento-stat-num">04 // OFFERS</span>
              <h3 className="bento-stat-label">Compare & Negotiate</h3>
              <p className="bento-stat-sub">
                Side-by-side total compensation comparison with base salary, equity, and remote work flexibility.
              </p>
            </MagneticCard>
          </div>
        </div>
      </section>

      {/* ====================================================================
          CHAPTER 03 // INTELLIGENCE (LIVE SEARCH & FILTER DEMO)
          ==================================================================== */}
      <section className="mugen-section" id="intelligence-chapter">
        <div className="container">
          <div className="section-monument-header">
            <span className="section-code-pill">
              <Search size={14} />
              <span>CHAPTER 03 // INTERACTIVE SEARCH MATRIX</span>
            </span>
            <h2 className="section-monument-heading">
              TEST THE REAL-TIME MULTI-FILTER ENGINE
            </h2>
            <p className="section-monument-desc">
              Try searching below right now. Filter by company name, role, remote status, or stage in zero milliseconds.
            </p>
          </div>

          {/* Real-time interactive search widget */}
          <InteractiveSearchDemo />
        </div>
      </section>

      {/* ====================================================================
          CHAPTER 04 // TOOLKIT (FEATURES MATRIX)
          ==================================================================== */}
      <section className="mugen-section" id="features-chapter">
        <div className="container">
          <div className="section-monument-header">
            <span className="section-code-pill">
              <Layers size={14} />
              <span>CHAPTER 04 // ENGINEERING SPECIFICATION</span>
            </span>
            <h2 className="section-monument-heading">
              BUILT FOR SPEED, SECURITY & PORTFOLIO EXCELLENCE
            </h2>
            <p className="section-monument-desc">
              Every component is crafted with modern engineering standards to ensure your career data is responsive and private.
            </p>
          </div>

          <div className="features-matrix-grid">
            <MagneticCard className="matrix-feature-card" intensity={10}>
              <div className="feature-holo-icon">
                <BarChart3 size={24} />
              </div>
              <h3 className="feature-title">MongoDB Aggregations</h3>
              <p className="feature-desc">
                High-performance server-side aggregation pipelines compute live status breakdowns and monthly velocity histograms.
              </p>
            </MagneticCard>

            <MagneticCard className="matrix-feature-card" intensity={10}>
              <div className="feature-holo-icon" style={{ color: '#f59e0b', borderColor: 'rgba(245, 158, 11, 0.3)' }}>
                <ShieldCheck size={24} />
              </div>
              <h3 className="feature-title">Stateless JWT Auth</h3>
              <p className="feature-desc">
                10-round salted bcrypt encryption and cryptographic token authorization guarantee strict isolation for your career records.
              </p>
            </MagneticCard>

            <MagneticCard className="matrix-feature-card" intensity={10}>
              <div className="feature-holo-icon" style={{ color: '#10b981', borderColor: 'rgba(16, 185, 129, 0.3)' }}>
                <Zap size={24} />
              </div>
              <h3 className="feature-title">Sub-Second Execution</h3>
              <p className="feature-desc">
                Deployed to Vercel Serverless Functions with connection pool caching for lightning-fast queries and 60 FPS transitions.
              </p>
            </MagneticCard>

            <MagneticCard className="matrix-feature-card" intensity={10}>
              <div className="feature-holo-icon" style={{ color: '#f59e0b', borderColor: 'rgba(245, 158, 11, 0.3)' }}>
                <Sparkles size={24} />
              </div>
              <h3 className="feature-title">Cybernetic Themes</h3>
              <p className="feature-desc">
                Seamless Dark / Light mode toggle with local storage persistence and glassmorphic depth on every device.
              </p>
            </MagneticCard>
          </div>
        </div>
      </section>

      {/* ====================================================================
          CHAPTER 05 // LAUNCHPAD (FINAL MONUMENTAL CTA)
          ==================================================================== */}
      <section className="mugen-cta-section" id="cta-chapter">
        <div className="container">
          <div className="launchpad-card">
            <div className="launchpad-glow" />
            <span className="section-code-pill">
              <CheckCircle2 size={14} />
              <span>CHAPTER 05 // MISSION READY</span>
            </span>

            <h2 className="launchpad-title">
              READY TO ACCELERATE YOUR NEXT CAREER MOVE?
            </h2>

            <p className="launchpad-desc">
              Join students, developers, and professionals managing their entire career pipeline with precision and confidence.
            </p>

            <div className="launchpad-actions">
              {isAuthenticated ? (
                <Link
                  to="/dashboard"
                  className="btn-cyber-primary"
                  id="cta-dashboard-btn"
                  onMouseEnter={playOfferCelebration}
                >
                  <span>Launch Dashboard</span>
                  <ArrowRight size={18} />
                </Link>
              ) : (
                <>
                  <Link
                    to="/register"
                    className="btn-cyber-primary"
                    id="cta-register-btn"
                    onMouseEnter={playOfferCelebration}
                  >
                    <span>Create Your Free Account</span>
                    <ArrowRight size={18} />
                  </Link>
                  <Link
                    to="/login"
                    className="btn-cyber-secondary"
                    id="cta-login-btn"
                    onMouseEnter={playHoverSound}
                  >
                    <span>Access Account</span>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
