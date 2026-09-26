import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api/axiosConfig';
import {
  Briefcase,
  Send,
  CalendarCheck,
  CheckCircle,
  XCircle,
  PlusCircle,
  ArrowRight,
  MapPin,
  Clock,
  Terminal,
  Activity,
  Radio,
  Cpu,
  Search,
  RefreshCw,
  Sparkles
} from 'lucide-react';
import DashboardCareerBackground from '../components/dashboard/DashboardCareerBackground';
import JobApplicationPipelineTracker from '../components/dashboard/JobApplicationPipelineTracker';
import BrandLogo from '../components/BrandLogo';
import StatChart from '../components/StatChart';
import StatusBadge from '../components/StatusBadge';
import LoadingSpinner from '../components/LoadingSpinner';
import AlertMessage from '../components/AlertMessage';
import { playHoverSound, playClickSound } from '../components/landing/SoundEffects';
import '../styles/CortexaDashboard.css';
import '../styles/Dashboard.css';

const DashboardPage = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    total: 0,
    applied: 0,
    interview: 0,
    selected: 0,
    rejected: 0
  });
  const [recentApplications, setRecentApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Tactical Filter & Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('ALL');

  // Real-time Tactical Clock
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    fetchDashboardData();

    // Clock ticker
    const updateClock = () => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString('en-US', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
      setCurrentTime(`${timeStr} UTC`);
    };
    updateClock();
    const timer = setInterval(updateClock, 1000);
    return () => clearInterval(timer);
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get('/jobs/stats');
      if (response.data.success) {
        setStats(response.data.stats);
        setRecentApplications(response.data.recentApplications || []);
      }
    } catch (err) {
      console.error('Error fetching dashboard statistics:', err);
      setError('Unable to load telemetry data. Please verify your backend connection.');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  // Conversion calculations
  const total = stats.total || 0;
  const interviewRate = total > 0 ? Math.round(((stats.interview + stats.selected) / total) * 100) : 0;
  const offerRate = total > 0 ? Math.round((stats.selected / total) * 100) : 0;

  // Filtered applications
  const filteredApplications = useMemo(() => {
    return recentApplications.filter((app) => {
      const matchesSearch =
        !searchQuery ||
        app.jobRole?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.company?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.location?.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus =
        activeFilter === 'ALL' ||
        app.status?.toUpperCase() === activeFilter.toUpperCase();

      return matchesSearch && matchesStatus;
    });
  }, [recentApplications, searchQuery, activeFilter]);

  return (
    <div className="cortexa-dashboard-wrapper">
      {/* Modern 3D Career Pipeline Perspective Background */}
      <DashboardCareerBackground />

      {/* Ambient Aurora Gradient Lighting (Zero CRT Scanlines) */}
      <div className="cortexa-crt-overlay" />

      {/* Main Dashboard Interactive Surface */}
      <div className="cortexa-dashboard-content">
        {/* Top Telemetry Diagnostic HUD Bar */}
        <div className="cortexa-top-bar">
          <div className="cortexa-status-nodes">
            <span className="status-node active">
              <span className="led-indicator" />
              <span>PIPELINE_RADAR: ACTIVE</span>
            </span>
            <span className="status-node">
              <span className="led-indicator amethyst" />
              <span>ATS_ENGINE: OPTIMIZED</span>
            </span>
            <span className="status-node">
              <Activity size={13} style={{ color: '#10b981' }} />
              <span>REALTIME_SYNC: CONNECTED</span>
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <span className="cortexa-clock">{currentTime || '00:00:00 UTC'}</span>
            <button
              onClick={() => {
                playClickSound();
                fetchDashboardData();
              }}
              title="Refresh Pipeline Telemetry"
              style={{
                background: 'rgba(245, 158, 11, 0.1)',
                border: '1px solid rgba(245, 158, 11, 0.3)',
                color: '#fbbf24',
                padding: '4px 8px',
                borderRadius: '4px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '0.72rem'
              }}
              onMouseEnter={playHoverSound}
            >
              <RefreshCw size={12} />
              <span>SYNC</span>
            </button>
          </div>
        </div>

        {/* Console Header Area */}
        <div className="cortexa-header">
          <div>
            <div className="cortexa-operator-callout">
              <Radio size={12} />
              <span>CANDIDATE: {user?.name?.toUpperCase() || 'CAREER EXPLORER'}</span>
              <span style={{ color: '#64748b' }}>//</span>
              <span style={{ color: '#10b981' }}>PIPELINE_ACTIVE</span>
            </div>
            <h1 className="cortexa-title">
              <span className="glow-orange">CAREER COMMAND</span>{' '}
              <span className="glow-gold">CENTER</span>
            </h1>
            <p className="cortexa-subtitle">
              Live job application telemetry, interview milestone progression, and offer analytics.
            </p>
          </div>

          <div className="cortexa-header-actions">
            <Link
              to="/add-job"
              id="dash-add-job-btn"
              className="btn-cortexa-primary"
              onMouseEnter={playHoverSound}
              onClick={playClickSound}
            >
              <PlusCircle size={17} />
              <span>+ NEW APPLICATION</span>
            </Link>
          </div>
        </div>

        {error && <AlertMessage type="error" message={error} onClose={() => setError(null)} />}

        {loading ? (
          <div style={{ padding: '4rem 0', display: 'flex', justifyContent: 'center' }}>
            <LoadingSpinner message="Scanning application pipeline channels..." size="large" />
          </div>
        ) : (
          <>
            {/* Interactive 4-Stage Job Application Lifecycle Ribbon */}
            <JobApplicationPipelineTracker
              stats={stats}
              activeFilter={activeFilter}
              onSelectFilter={(f) => setActiveFilter(f)}
            />

            {/* Tactical Telemetry Metric Pods (5 Grid) */}
            <div className="cortexa-stats-grid">
              {/* Pod 1: Total Pipeline */}
              <div className="cortexa-stat-pod" onMouseEnter={playHoverSound}>
                <div className="stat-pod-top">
                  <span className="stat-pod-tag">// 01 TOTAL PIPELINE</span>
                  <div className="stat-pod-icon-box">
                    <Briefcase size={18} />
                  </div>
                </div>
                <div className="stat-pod-count">{stats.total}</div>
                <div className="stat-pod-label">All Tracked Positions</div>
                {/* Mini SVG Sparkline */}
                <svg className="stat-pod-sparkline" viewBox="0 0 100 20">
                  <path
                    d="M0,15 Q25,5 50,12 T100,6"
                    fill="none"
                    stroke="#f59e0b"
                    strokeWidth="2"
                    strokeDasharray="100"
                    strokeDashoffset="0"
                  />
                </svg>
              </div>

              {/* Pod 2: Applied */}
              <div className="cortexa-stat-pod pod-applied" onMouseEnter={playHoverSound}>
                <div className="stat-pod-top">
                  <span className="stat-pod-tag" style={{ color: '#f59e0b' }}>// 02 APPLIED [PENDING]</span>
                  <div className="stat-pod-icon-box">
                    <Send size={18} />
                  </div>
                </div>
                <div className="stat-pod-count" style={{ color: '#fbbf24' }}>{stats.applied}</div>
                <div className="stat-pod-label">Awaiting Response</div>
                {/* Mini SVG Sparkline */}
                <svg className="stat-pod-sparkline" viewBox="0 0 100 20">
                  <path
                    d="M0,12 Q20,18 45,8 T100,10"
                    fill="none"
                    stroke="#f59e0b"
                    strokeWidth="2"
                  />
                </svg>
              </div>

              {/* Pod 3: In Interview */}
              <div className="cortexa-stat-pod pod-interview" onMouseEnter={playHoverSound}>
                <div className="stat-pod-top">
                  <span className="stat-pod-tag" style={{ color: '#8b5cf6' }}>// 03 IN INTERVIEW</span>
                  <div className="stat-pod-icon-box">
                    <CalendarCheck size={18} />
                  </div>
                </div>
                <div className="stat-pod-count" style={{ color: '#a78bfa' }}>{stats.interview}</div>
                <div className="stat-pod-label">Active Rounds</div>
                {/* Mini SVG Sparkline */}
                <svg className="stat-pod-sparkline" viewBox="0 0 100 20">
                  <path
                    d="M0,16 Q20,2 40,16 T80,4 L100,10"
                    fill="none"
                    stroke="#8b5cf6"
                    strokeWidth="2"
                  />
                </svg>
              </div>

              {/* Pod 4: Selected / Offers */}
              <div className="cortexa-stat-pod pod-selected" onMouseEnter={playHoverSound}>
                <div className="stat-pod-top">
                  <span className="stat-pod-tag" style={{ color: '#ff6b35' }}>// 04 SELECTED [OFFER]</span>
                  <div className="stat-pod-icon-box">
                    <CheckCircle size={18} />
                  </div>
                </div>
                <div className="stat-pod-count" style={{ color: '#ff8800' }}>{stats.selected}</div>
                <div className="stat-pod-label">Offers & Passed</div>
                {/* Mini SVG Sparkline */}
                <svg className="stat-pod-sparkline" viewBox="0 0 100 20">
                  <path
                    d="M0,18 L30,14 L60,8 L100,2"
                    fill="none"
                    stroke="#ff6b35"
                    strokeWidth="2"
                  />
                </svg>
              </div>

              {/* Pod 5: Rejected */}
              <div className="cortexa-stat-pod pod-rejected" onMouseEnter={playHoverSound}>
                <div className="stat-pod-top">
                  <span className="stat-pod-tag" style={{ color: '#f43f5e' }}>// 05 ARCHIVED</span>
                  <div className="stat-pod-icon-box">
                    <XCircle size={18} />
                  </div>
                </div>
                <div className="stat-pod-count" style={{ color: '#fda4af' }}>{stats.rejected}</div>
                <div className="stat-pod-label">Closed Applications</div>
                {/* Mini SVG Sparkline */}
                <svg className="stat-pod-sparkline" viewBox="0 0 100 20">
                  <path
                    d="M0,5 Q50,15 100,18"
                    fill="none"
                    stroke="#f43f5e"
                    strokeWidth="2"
                  />
                </svg>
              </div>
            </div>

            {/* Conversion Telemetry Strip */}
            <div className="cortexa-telemetry-strip">
              <div className="telemetry-metric">
                <Activity size={16} style={{ color: '#f59e0b' }} />
                <div>
                  <div className="telemetry-title">INTERVIEW CONVERSION RATE</div>
                  <div className="telemetry-rate">{interviewRate}%</div>
                </div>
                <div className="telemetry-bar-outer">
                  <div className="telemetry-bar-fill" style={{ width: `${Math.min(interviewRate, 100)}%` }} />
                </div>
              </div>

              <div className="telemetry-metric">
                <Sparkles size={16} style={{ color: '#f59e0b' }} />
                <div>
                  <div className="telemetry-title">OFFER SUCCESS RATE</div>
                  <div className="telemetry-rate gold">{offerRate}%</div>
                </div>
                <div className="telemetry-bar-outer">
                  <div className="telemetry-bar-fill gold" style={{ width: `${Math.min(offerRate, 100)}%` }} />
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', color: '#64748b', fontFamily: 'JetBrains Mono, monospace' }}>
                <Cpu size={14} />
                <span>SAMPLING: ALL PIPELINE DATA POINTS</span>
              </div>
            </div>

            {/* Main Command Center Split Grid */}
            <div className="cortexa-main-grid">
              {/* Left Column: Analytics Spectrum & Visualizer */}
              <div className="cortexa-panel-card">
                <StatChart stats={stats} bare={true} />
              </div>

              {/* Right Column: Live Signal Stream (Recent Applications) */}
              <div className="cortexa-panel-card">
                <div className="cortexa-panel-header">
                  <div className="panel-header-title">
                    <span className="panel-tag">// LIVE SIGNAL STREAM</span>
                    <h3 className="panel-title">Recent Career Applications</h3>
                  </div>
                  <Link
                    to="/applications"
                    id="dash-view-all-link"
                    className="view-all-link"
                    style={{ color: '#f59e0b', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.78rem' }}
                    onMouseEnter={playHoverSound}
                    onClick={playClickSound}
                  >
                    <span>VIEW ALL [{stats.total}]</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>

                {/* Filter and Search Bar */}
                <div className="signal-controls">
                  <div className="signal-search-wrapper">
                    <span className="signal-search-prefix">&gt;</span>
                    <input
                      type="text"
                      className="signal-search-input"
                      placeholder="FILTER_BY_ROLE_OR_COMPANY..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>

                  <div className="signal-filter-chips">
                    {['ALL', 'APPLIED', 'INTERVIEW', 'SELECTED', 'REJECTED'].map((filterKey) => (
                      <button
                        key={filterKey}
                        className={`filter-chip ${activeFilter === filterKey ? 'active' : ''}`}
                        onClick={() => {
                          playClickSound();
                          setActiveFilter(filterKey);
                        }}
                        onMouseEnter={playHoverSound}
                      >
                        [{filterKey}]
                      </button>
                    ))}
                  </div>
                </div>

                {/* Applications Stream List */}
                <div className="signal-list">
                  {filteredApplications.length === 0 ? (
                    <div className="signal-empty-state">
                      <div className="signal-empty-icon">
                        <Terminal size={24} />
                      </div>
                      <h4 style={{ margin: 0, color: '#f1f5f9', fontSize: '1rem' }}>No Matching Signals Found</h4>
                      <p style={{ margin: 0, fontSize: '0.8rem', color: '#94a3b8' }}>
                        {recentApplications.length === 0
                          ? 'No applications logged yet. Deploy your first job to start telemetry.'
                          : 'Try modifying your search or status filter above.'}
                      </p>
                      {recentApplications.length === 0 && (
                        <Link
                          to="/add-job"
                          className="btn-cortexa-primary"
                          style={{ marginTop: '0.5rem', padding: '0.5rem 1rem', fontSize: '0.8rem' }}
                          onMouseEnter={playHoverSound}
                          onClick={playClickSound}
                        >
                          <PlusCircle size={14} />
                          <span>LOG FIRST APPLICATION</span>
                        </Link>
                      )}
                    </div>
                  ) : (
                    filteredApplications.map((job) => (
                      <Link
                        key={job._id}
                        to={`/applications/${job._id}`}
                        className="signal-item-card"
                        title={`Inspect ${job.jobRole} at ${job.company}`}
                        onMouseEnter={playHoverSound}
                        onClick={playClickSound}
                      >
                        <div className="signal-item-left">
                          <div className="signal-avatar">
                            {job.company ? job.company.charAt(0).toUpperCase() : 'J'}
                          </div>
                          <div className="signal-item-meta">
                            <span className="signal-role">{job.jobRole}</span>
                            <span className="signal-company">{job.company}</span>
                            <div className="signal-details-row">
                              {job.location && (
                                <span className="signal-tag">
                                  <MapPin size={11} />
                                  <span>{job.location}</span>
                                </span>
                              )}
                              <span className="signal-tag">
                                <Clock size={11} />
                                <span>{formatDate(job.applicationDate)}</span>
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="signal-item-right">
                          <StatusBadge status={job.status} />
                          <ArrowRight size={15} className="signal-arrow" />
                        </div>
                      </Link>
                    ))
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
