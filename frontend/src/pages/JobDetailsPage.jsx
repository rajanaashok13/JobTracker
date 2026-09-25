import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import api from '../api/axiosConfig';
import {
  ArrowLeft,
  Edit,
  Trash2,
  ExternalLink,
  MapPin,
  Calendar,
  DollarSign,
  Building,
  Briefcase,
  Clock,
  FileText,
  CheckCircle,
  Sparkles
} from 'lucide-react';
import StatusBadge from '../components/StatusBadge';
import LoadingSpinner from '../components/LoadingSpinner';
import AlertMessage from '../components/AlertMessage';
import ConfirmModal from '../components/ConfirmModal';
import '../styles/JobDetails.css';

const JobDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  // Delete modal state
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    fetchJobDetails();
  }, [id]);

  const fetchJobDetails = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get(`/jobs/${id}`);
      if (response.data.success) {
        setJob(response.data.job);
      }
    } catch (err) {
      console.error('Error fetching job details:', err);
      setError('Job application not found or you are not authorized to view it.');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickStatusChange = async (newStatus) => {
    if (!job || job.status === newStatus) return;
    setUpdatingStatus(true);
    setSuccessMsg(null);
    try {
      const response = await api.put(`/jobs/${id}`, {
        ...job,
        status: newStatus
      });
      if (response.data.success) {
        setJob(response.data.job);
        setSuccessMsg(`Application status updated to "${newStatus}"!`);
      }
    } catch (err) {
      console.error('Error updating status:', err);
      setError('Failed to update application status.');
    } finally {
      setUpdatingStatus(false);
    }
  };

  const handleDeleteJob = async () => {
    setIsDeleting(true);
    try {
      await api.delete(`/jobs/${id}`);
      setDeleteModalOpen(false);
      navigate('/applications');
    } catch (err) {
      console.error('Error deleting job:', err);
      setError('Failed to delete application.');
    } finally {
      setIsDeleting(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="container" style={{ padding: '5rem 0' }}>
        <LoadingSpinner message="Loading application details..." size="large" />
      </div>
    );
  }

  if (!job) {
    return (
      <div className="container" style={{ padding: '4rem 0', textAlign: 'center' }}>
        <h2>Application Not Found</h2>
        <p style={{ marginTop: '0.5rem', marginBottom: '1.5rem' }}>
          The requested job application could not be found.
        </p>
        <Link to="/applications" className="btn btn-primary">
          Back to Applications
        </Link>
      </div>
    );
  }

  return (
    <div className="job-details-page container">
      {/* Top Navigation */}
      <div className="details-nav-bar">
        <Link to="/applications" className="btn btn-ghost btn-sm back-link" id="details-back-btn">
          <ArrowLeft size={16} />
          <span>Back to Applications</span>
        </Link>

        <div className="details-actions">
          <Link
            to={`/applications/edit/${job._id}`}
            id="details-edit-btn"
            className="btn btn-secondary btn-sm"
          >
            <Edit size={16} />
            <span>Edit</span>
          </Link>
          <button
            type="button"
            id="details-delete-btn"
            className="btn btn-danger btn-sm"
            onClick={() => setDeleteModalOpen(true)}
          >
            <Trash2 size={16} />
            <span>Delete</span>
          </button>
        </div>
      </div>

      {successMsg && (
        <AlertMessage type="success" message={successMsg} onClose={() => setSuccessMsg(null)} />
      )}
      {error && <AlertMessage type="error" message={error} onClose={() => setError(null)} />}

      {/* Main Details Header Card */}
      <div className="glass-card details-header-card">
        <div className="details-header-main">
          <div className="details-company-avatar">
            {job.company.charAt(0).toUpperCase()}
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', flexWrap: 'wrap' }}>
              <h1 className="details-job-role">{job.jobRole}</h1>
              <StatusBadge status={job.status} />
            </div>
            <div className="details-company-name">
              <Building size={16} />
              <span>{job.company}</span>
            </div>
          </div>
        </div>

        {/* Quick Status Bar */}
        <div className="quick-status-section">
          <span className="quick-status-label">Update Status:</span>
          <div className="quick-status-buttons">
            {['Applied', 'Interview', 'Selected', 'Rejected'].map((statusOption) => (
              <button
                key={statusOption}
                type="button"
                id={`quick-status-${statusOption.toLowerCase()}`}
                disabled={updatingStatus}
                onClick={() => handleQuickStatusChange(statusOption)}
                className={`quick-status-btn ${job.status === statusOption ? 'active' : ''} ${statusOption.toLowerCase()}`}
              >
                {statusOption}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid: Metadata Details & Notes */}
      <div className="details-grid">
        {/* Left Column: Key Parameters */}
        <div className="glass-card details-info-card">
          <h3 className="section-title">Application Info</h3>

          <div className="info-item-list">
            <div className="info-item">
              <div className="info-icon-wrapper">
                <MapPin size={18} />
              </div>
              <div className="info-content">
                <span className="info-label">Location</span>
                <span className="info-value">{job.location || 'Remote'}</span>
              </div>
            </div>

            <div className="info-item">
              <div className="info-icon-wrapper">
                <DollarSign size={18} />
              </div>
              <div className="info-content">
                <span className="info-label">Salary / Compensation</span>
                <span className="info-value">{job.salary || 'Not specified'}</span>
              </div>
            </div>

            <div className="info-item">
              <div className="info-icon-wrapper">
                <Calendar size={18} />
              </div>
              <div className="info-content">
                <span className="info-label">Date Applied</span>
                <span className="info-value">{formatDate(job.applicationDate)}</span>
              </div>
            </div>

            <div className="info-item">
              <div className="info-icon-wrapper">
                <Clock size={18} />
              </div>
              <div className="info-content">
                <span className="info-label">Last Updated</span>
                <span className="info-value">{formatDate(job.updatedAt)}</span>
              </div>
            </div>

            {job.jobUrl && (
              <div className="info-item">
                <div className="info-icon-wrapper">
                  <ExternalLink size={18} />
                </div>
                <div className="info-content">
                  <span className="info-label">Job Posting</span>
                  <a
                    href={job.jobUrl.startsWith('http') ? job.jobUrl : `https://${job.jobUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="info-external-link"
                    id="job-posting-external-url"
                  >
                    <span>Open Posting Link</span>
                    <ExternalLink size={14} />
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Interview Notes */}
        <div className="glass-card details-notes-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3 className="section-title">Application Notes & Preparation</h3>
            <Link to={`/applications/edit/${job._id}`} className="btn btn-ghost btn-sm">
              <Edit size={14} />
              <span>Edit Notes</span>
            </Link>
          </div>

          {job.notes ? (
            <div className="notes-text-content">
              {job.notes.split('\n').map((paragraph, index) => (
                <p key={index} style={{ marginBottom: '0.75rem', lineHeight: 1.6 }}>
                  {paragraph}
                </p>
              ))}
            </div>
          ) : (
            <div className="empty-notes-prompt">
              <FileText size={32} color="var(--text-muted)" />
              <p>No notes logged yet for this position.</p>
              <Link to={`/applications/edit/${job._id}`} className="btn btn-secondary btn-sm">
                Add Interview Questions or Notes
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={deleteModalOpen}
        title="Delete Job Application"
        message={`Are you sure you want to permanently delete your application for ${job.jobRole} at ${job.company}?`}
        confirmText="Yes, Delete"
        isDanger={true}
        isLoading={isDeleting}
        onConfirm={handleDeleteJob}
        onCancel={() => setDeleteModalOpen(false)}
      />
    </div>
  );
};

export default JobDetailsPage;
