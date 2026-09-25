import React, { useState, useEffect } from 'react';
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
  ExternalLink,
  MapPin,
  Clock
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
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDashboardData();
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
      setError('Unable to load dashboard data. Please check your backend connection.');
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

  return (
    <div className="dashboard-page container">
      {/* Header section with greeting and quick action */}
      <div className="dashboard-header">
        <div>
          <h1 className="dashboard-title">
            Welcome back, <span className="user-greeting-name">{user?.name || 'Candidate'}</span> 👋
          </h1>
          <p className="dashboard-subtitle">
            Here is your current career pipeline and application progress summary.
          </p>
        </div>

        <Link to="/add-job" id="dash-add-job-btn" className="btn btn-primary btn-add-job">
          <PlusCircle size={18} />
          <span>Add Application</span>
        </Link>
      </div>

      {error && <AlertMessage type="error" message={error} onClose={() => setError(null)} />}

      {loading ? (
        <LoadingSpinner message="Calculating application metrics..." size="large" />
      ) : (
        <>
          {/* Key Metrics Stats Grid */}
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
              color="amethyst"
              subtext="Active interview rounds"
            />
            <StatsCard
              title="Selected"
              count={stats.selected}
              icon={CheckCircle}
              color="emerald"
              subtext="Job offers / Passed"
            />
            <StatsCard
              title="Rejected"
              count={stats.rejected}
              icon={XCircle}
              color="rose"
              subtext="Closed applications"
            />
          </div>

          {/* Main Dashboard Section: Analytics Chart & Recent Applications */}
          <div className="dashboard-main-grid">
            {/* Chart Breakdown */}
            <div className="dashboard-chart-col">
              <StatChart stats={stats} />
            </div>

            {/* Recent Applications List */}
            <div className="dashboard-recent-col">
              <div className="glass-card recent-apps-card">
                <div className="recent-apps-header">
                  <div>
                    <h3 className="card-title">Recent Applications</h3>
                    <p className="card-subtitle">Latest opportunities you've logged</p>
                  </div>
                  <Link to="/applications" id="dash-view-all-link" className="view-all-link">
                    <span>View all</span>
                    <ArrowRight size={16} />
                  </Link>
                </div>

                <div className="recent-apps-list">
                  {recentApplications.length === 0 ? (
                    <div className="no-recent-apps">
                      <div className="empty-icon-circle">
                        <Briefcase size={28} />
                      </div>
                      <h4>No applications yet</h4>
                      <p>Start tracking your job search by adding your first application.</p>
                      <Link to="/add-job" className="btn btn-primary btn-sm">
                        <PlusCircle size={16} />
                        <span>Add First Job</span>
                      </Link>
                    </div>
                  ) : (
                    recentApplications.map((job) => (
                      <Link
                        key={job._id}
                        to={`/applications/${job._id}`}
                        className="recent-app-item"
                        title={`View ${job.jobRole} at ${job.company}`}
                      >
                        <div className="app-item-info">
                          <div className="app-company-badge">
                            {job.company.charAt(0).toUpperCase()}
                          </div>
                          <div className="app-item-details">
                            <span className="app-item-role">{job.jobRole}</span>
                            <span className="app-item-company">{job.company}</span>
                            <div className="app-item-meta">
                              {job.location && (
                                <span className="meta-tag">
                                  <MapPin size={12} />
                                  {job.location}
                                </span>
                              )}
                              <span className="meta-tag">
                                <Clock size={12} />
                                {formatDate(job.applicationDate)}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="app-item-right">
                          <StatusBadge status={job.status} />
                          <ArrowRight size={16} className="item-arrow" />
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
