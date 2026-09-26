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
  Search,
  RefreshCw,
  Lightbulb,
  Award,
  TrendingUp,
  Percent
} from 'lucide-react';
import StatsCard from '../components/StatsCard';
import StatChart from '../components/StatChart';
import StatusBadge from '../components/StatusBadge';
import LoadingSpinner from '../components/LoadingSpinner';
import AlertMessage from '../components/AlertMessage';
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
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  // Filter & Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('ALL');

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async (isManualRefresh = false) => {
    if (isManualRefresh) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }
    setError(null);

    try {
      const response = await api.get('/jobs/stats');
      if (response.data.success) {
        setStats(response.data.stats);
        setRecentApplications(response.data.recentApplications || []);
      }
    } catch (err) {
      console.error('Error fetching dashboard statistics:', err);
      setError('Unable to load dashboard data. Please verify your network connection.');
    } finally {
      setLoading(false);
      setRefreshing(false);
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
  const offerRate = (stats.interview + stats.selected) > 0
    ? Math.round((stats.selected / (stats.interview + stats.selected)) * 100)
    : 0;

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
    <div className="container dashboard-page">
      {/* Luxury Static Executive Background */}
      <div className="executive-static-bg" aria-hidden="true">
        <div className="executive-ambient-glow" />
        <div className="executive-grid-pattern" />
      </div>

      {/* ====================================================================
          DASHBOARD HEADER
          ==================================================================== */}
      <div className="dashboard-header">
        <div>
          <h1 className="dashboard-title">
            Welcome back, <span className="user-greeting-name">{user?.name || 'Applicant'}</span> 👋
          </h1>
          <p className="dashboard-subtitle">
            Here is the current overview of your job search and interview progress.
          </p>
        </div>

        <div className="dashboard-header-actions">
          <button
            onClick={() => fetchDashboardData(true)}
            className="btn-sync"
            title="Refresh dashboard data"
            disabled={refreshing}
          >
            <RefreshCw size={14} className={refreshing ? 'spin-icon' : ''} />
            <span>{refreshing ? 'Syncing...' : 'Sync'}</span>
          </button>

          <Link
            to="/add-job"
            id="dash-add-job-btn"
            className="btn btn-primary btn-add-job"
          >
            <PlusCircle size={18} />
            <span>Add Application</span>
          </Link>
        </div>
      </div>

      {error && <AlertMessage type="error" message={error} onClose={() => setError(null)} />}

      {loading ? (
        <div style={{ padding: '4rem 0', display: 'flex', justifyContent: 'center' }}>
          <LoadingSpinner message="Loading your job applications..." size="large" />
        </div>
      ) : (
        <>
          {/* ====================================================================
              5 KEY STATS CARDS
              ==================================================================== */}
          <div className="stats-grid">
            <StatsCard
              title="Total Applications"
              count={stats.total}
              icon={Briefcase}
              color="primary"
              subtext="All tracked positions"
            />
            <StatsCard
              title="Applied"
              count={stats.applied}
              icon={Send}
              color="amber"
              subtext="Awaiting response"
            />
            <StatsCard
              title="In Interview"
              count={stats.interview}
              icon={CalendarCheck}
              color="blue"
              subtext="Active interview rounds"
            />
            <StatsCard
              title="Offers & Selected"
              count={stats.selected}
              icon={CheckCircle}
              color="emerald"
              subtext="Passed evaluation"
            />
            <StatsCard
              title="Archived"
              count={stats.rejected}
              icon={XCircle}
              color="rose"
              subtext="Closed positions"
            />
          </div>

          {/* ====================================================================
              4-STAGE PIPELINE PROGRESS CARD
              ==================================================================== */}
          <div className="pipeline-overview-card glass-card">
            <div className="pipeline-card-header">
              <div className="pipeline-card-title-group">
                <h3>Application Pipeline Stages</h3>
                <p>Click any stage below to filter your recent applications</p>
              </div>

              <div className="pipeline-metrics-row">
                <div className="pipeline-metric-badge">
                  <TrendingUp size={14} style={{ color: 'var(--primary-600)' }} />
                  <span>Interview Rate:</span>
                  <span className="pipeline-metric-val">{interviewRate}%</span>
                </div>
                <div className="pipeline-metric-badge">
                  <Award size={14} style={{ color: '#FF6B35' }} />
                  <span>Offer Rate:</span>
                  <span className="pipeline-metric-val" style={{ color: '#FF6B35' }}>{offerRate}%</span>
                </div>
              </div>
            </div>

            <div className="pipeline-stages-grid">
              {/* Stage 1: Applied */}
              <div
                className={`pipeline-stage-box ${activeFilter === 'APPLIED' ? 'active' : ''}`}
                onClick={() => setActiveFilter(activeFilter === 'APPLIED' ? 'ALL' : 'APPLIED')}
              >
                <div className="stage-box-top">
                  <span className="stage-step-tag">Step 01</span>
                  <div className="stage-box-icon" style={{ backgroundColor: 'var(--status-applied-bg)', color: 'var(--status-applied-text)' }}>
                    <Send size={15} />
                  </div>
                </div>
                <div className="stage-box-count">{stats.applied}</div>
                <div>
                  <div className="stage-box-title">Applied</div>
                  <div className="stage-box-subtitle">Resume under review</div>
                </div>
              </div>

              {/* Stage 2: Interview */}
              <div
                className={`pipeline-stage-box ${activeFilter === 'INTERVIEW' ? 'active' : ''}`}
                onClick={() => setActiveFilter(activeFilter === 'INTERVIEW' ? 'ALL' : 'INTERVIEW')}
              >
                <div className="stage-box-top">
                  <span className="stage-step-tag">Step 02</span>
                  <div className="stage-box-icon" style={{ backgroundColor: 'var(--status-interview-bg)', color: 'var(--status-interview-text)' }}>
                    <CalendarCheck size={15} />
                  </div>
                </div>
                <div className="stage-box-count">{stats.interview}</div>
                <div>
                  <div className="stage-box-title">Interviewing</div>
                  <div className="stage-box-subtitle">Technical & behavioral</div>
                </div>
              </div>

              {/* Stage 3: Selected */}
              <div
                className={`pipeline-stage-box ${activeFilter === 'SELECTED' ? 'active' : ''}`}
                onClick={() => setActiveFilter(activeFilter === 'SELECTED' ? 'ALL' : 'SELECTED')}
              >
                <div className="stage-box-top">
                  <span className="stage-step-tag">Step 03</span>
                  <div className="stage-box-icon" style={{ backgroundColor: 'var(--status-selected-bg)', color: 'var(--status-selected-text)' }}>
                    <CheckCircle size={15} />
                  </div>
                </div>
                <div className="stage-box-count">{stats.selected}</div>
                <div>
                  <div className="stage-box-title">Selected</div>
                  <div className="stage-box-subtitle">Cleared rounds</div>
                </div>
              </div>

              {/* Stage 4: Offers */}
              <div
                className={`pipeline-stage-box ${activeFilter === 'SELECTED' ? 'active' : ''}`}
                onClick={() => setActiveFilter(activeFilter === 'SELECTED' ? 'ALL' : 'SELECTED')}
              >
                <div className="stage-box-top">
                  <span className="stage-step-tag">Step 04</span>
                  <div className="stage-box-icon" style={{ backgroundColor: 'var(--status-selected-bg)', color: 'var(--status-selected-text)' }}>
                    <Award size={15} />
                  </div>
                </div>
                <div className="stage-box-count">{stats.selected}</div>
                <div>
                  <div className="stage-box-title">Offers</div>
                  <div className="stage-box-subtitle">Review & negotiate</div>
                </div>
              </div>
            </div>
          </div>

          {/* ====================================================================
              MAIN DASHBOARD GRID: CHART & RECENT APPLICATIONS
              ==================================================================== */}
          <div className="dashboard-main-grid">
            {/* Left Column: Analytics + Tips */}
            <div className="dashboard-chart-col">
              <div className="glass-card" style={{ padding: '1.5rem', height: '100%' }}>
                <StatChart stats={stats} bare={true} />
              </div>

              <div className="dashboard-tip-card glass-card">
                <div className="tip-icon-box">
                  <Lightbulb size={20} />
                </div>
                <div className="tip-content">
                  <h4>Job Search Recommendation</h4>
                  <p>
                    Follow up on submitted applications after 5 business days if you haven’t received an update. Candidates who follow up politely see a 24% higher interview callback rate.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Recent Applications */}
            <div className="dashboard-recent-col">
              <div className="recent-apps-card glass-card">
                <div className="recent-apps-header">
                  <div>
                    <h3 className="card-title">Recent Applications</h3>
                    <p className="card-subtitle">
                      {filteredApplications.length} {filteredApplications.length === 1 ? 'position' : 'positions'} showing
                    </p>
                  </div>
                  <Link
                    to="/applications"
                    id="dash-view-all-link"
                    className="view-all-link"
                  >
                    <span>View All ({stats.total})</span>
                    <ArrowRight size={15} />
                  </Link>
                </div>

                {/* Filter and Search Controls */}
                <div className="apps-controls-bar">
                  <div className="apps-search-wrapper">
                    <Search size={14} className="apps-search-icon" />
                    <input
                      type="text"
                      className="apps-search-input"
                      placeholder="Search role, company, or location..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>

                  <div className="apps-filter-group">
                    {['ALL', 'APPLIED', 'INTERVIEW', 'SELECTED', 'REJECTED'].map((filterKey) => (
                      <button
                        key={filterKey}
                        className={`apps-filter-btn ${activeFilter === filterKey ? 'active' : ''}`}
                        onClick={() => setActiveFilter(filterKey)}
                      >
                        {filterKey === 'ALL' ? 'All' : filterKey.charAt(0) + filterKey.slice(1).toLowerCase()}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Applications List */}
                <div className="recent-apps-list">
                  {filteredApplications.length === 0 ? (
                    <div className="no-recent-apps">
                      <div className="empty-icon-circle">
                        <Briefcase size={24} />
                      </div>
                      <h4>No Applications Found</h4>
                      <p>
                        {recentApplications.length === 0
                          ? 'You haven’t added any job applications yet. Start tracking your applications to see them here.'
                          : 'No applications match your search query or filter. Try clearing the filter.'}
                      </p>
                      {recentApplications.length === 0 && (
                        <Link
                          to="/add-job"
                          className="btn btn-primary btn-sm"
                          style={{ marginTop: '0.5rem' }}
                        >
                          <PlusCircle size={14} />
                          <span>Add Your First Application</span>
                        </Link>
                      )}
                    </div>
                  ) : (
                    filteredApplications.map((job) => (
                      <Link
                        key={job._id}
                        to={`/applications/${job._id}`}
                        className="recent-app-item"
                        title={`View ${job.jobRole} at ${job.company}`}
                      >
                        <div className="app-item-info">
                          <div className="app-company-badge">
                            {job.company ? job.company.charAt(0).toUpperCase() : 'J'}
                          </div>
                          <div className="app-item-details">
                            <span className="app-item-role">{job.jobRole}</span>
                            <span className="app-item-company">{job.company}</span>
                            <div className="app-item-meta">
                              {job.location && (
                                <span className="meta-tag">
                                  <MapPin size={11} />
                                  <span>{job.location}</span>
                                </span>
                              )}
                              <span className="meta-tag">
                                <Clock size={11} />
                                <span>{formatDate(job.applicationDate)}</span>
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="app-item-right">
                          <StatusBadge status={job.status} />
                          <ArrowRight size={15} className="item-arrow" />
                        </div>
                      </Link>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DashboardPage;
