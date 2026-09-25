import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api/axiosConfig';
import {
  User,
  Mail,
  Calendar,
  Shield,
  Briefcase,
  LogOut,
  Award,
  Clock,
  Sparkles
} from 'lucide-react';
import ConfirmModal from '../components/ConfirmModal';
import LoadingSpinner from '../components/LoadingSpinner';
import '../styles/Profile.css';

const ProfilePage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);

  useEffect(() => {
    const fetchUserStats = async () => {
      try {
        const response = await api.get('/jobs/stats');
        if (response.data.success) {
          setStats(response.data.stats);
        }
      } catch (err) {
        console.error('Error fetching profile stats:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserStats();
  }, []);

  const handleConfirmLogout = () => {
    logout();
    navigate('/');
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Member';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="profile-page container">
      <div className="profile-header">
        <h1 className="profile-title">Account Profile</h1>
        <p className="profile-subtitle">
          Manage your personal account details and session settings
        </p>
      </div>

      <div className="profile-layout-grid">
        {/* Left Column: User Card */}
        <div className="glass-card profile-user-card">
          <div className="profile-avatar-large">
            {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
          </div>

          <h2 className="profile-user-name">{user?.name || 'Candidate'}</h2>
          <span className="profile-user-email">{user?.email}</span>

          <div className="profile-tag">
            <Sparkles size={14} />
            <span>Active Job Seeker</span>
          </div>

          <div className="profile-stats-mini">
            <div className="mini-stat">
              <span className="mini-stat-num">{stats?.total || 0}</span>
              <span className="mini-stat-label">Applications</span>
            </div>
            <div className="mini-stat-divider" />
            <div className="mini-stat">
              <span className="mini-stat-num">{stats?.interview || 0}</span>
              <span className="mini-stat-label">Interviews</span>
            </div>
            <div className="mini-stat-divider" />
            <div className="mini-stat">
              <span className="mini-stat-num">{stats?.selected || 0}</span>
              <span className="mini-stat-label">Offers</span>
            </div>
          </div>

          <button
            type="button"
            id="profile-logout-btn"
            className="btn btn-danger btn-full profile-logout-btn"
            onClick={() => setLogoutModalOpen(true)}
          >
            <LogOut size={18} />
            <span>Sign Out of Account</span>
          </button>
        </div>

        {/* Right Column: Account Details & Security Information */}
        <div className="profile-details-column">
          <div className="glass-card profile-info-card">
            <h3 className="card-section-title">Personal Information</h3>

            <div className="profile-fields-list">
              <div className="profile-field-row">
                <div className="field-icon-box">
                  <User size={18} />
                </div>
                <div className="field-info-text">
                  <span className="field-label">Full Name</span>
                  <span className="field-value">{user?.name || 'Not provided'}</span>
                </div>
              </div>

              <div className="profile-field-row">
                <div className="field-icon-box">
                  <Mail size={18} />
                </div>
                <div className="field-info-text">
                  <span className="field-label">Email Address</span>
                  <span className="field-value">{user?.email || 'Not provided'}</span>
                </div>
              </div>

              <div className="profile-field-row">
                <div className="field-icon-box">
                  <Calendar size={18} />
                </div>
                <div className="field-info-text">
                  <span className="field-label">Member Since</span>
                  <span className="field-value">{formatDate(user?.createdAt)}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-card profile-security-card">
            <h3 className="card-section-title">Security & Session</h3>

            <div className="profile-fields-list">
              <div className="profile-field-row">
                <div className="field-icon-box green-icon-box">
                  <Shield size={18} />
                </div>
                <div className="field-info-text">
                  <span className="field-label">Password Protection</span>
                  <span className="field-value">Encrypted via bcrypt with 10 salt rounds</span>
                </div>
              </div>

              <div className="profile-field-row">
                <div className="field-icon-box green-icon-box">
                  <Award size={18} />
                </div>
                <div className="field-info-text">
                  <span className="field-label">Session Token</span>
                  <span className="field-value">Secured with JSON Web Token (JWT)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      <ConfirmModal
        isOpen={logoutModalOpen}
        title="Sign Out"
        message="Are you sure you want to end your current session? You will need to log back in to access your applications."
        confirmText="Yes, Sign Out"
        cancelText="Stay Signed In"
        isDanger={false}
        onConfirm={handleConfirmLogout}
        onCancel={() => setLogoutModalOpen(false)}
      />
    </div>
  );
};

export default ProfilePage;
