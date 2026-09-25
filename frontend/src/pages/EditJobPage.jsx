import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import api from '../api/axiosConfig';
import {
  Building,
  Briefcase,
  MapPin,
  DollarSign,
  Calendar,
  Link2,
  FileText,
  ArrowLeft,
  Save,
  Trash2
} from 'lucide-react';
import AlertMessage from '../components/AlertMessage';
import LoadingSpinner from '../components/LoadingSpinner';
import ConfirmModal from '../components/ConfirmModal';
import '../styles/JobForm.css';

const EditJobPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    company: '',
    jobRole: '',
    location: '',
    salary: '',
    applicationDate: '',
    status: 'Applied',
    jobUrl: '',
    notes: ''
  });

  const [fetching, setFetching] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Delete modal state
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fetchJob = async () => {
      setFetching(true);
      setError(null);
      try {
        const response = await api.get(`/jobs/${id}`);
        if (response.data.success && response.data.job) {
          const job = response.data.job;
          setFormData({
            company: job.company || '',
            jobRole: job.jobRole || '',
            location: job.location || '',
            salary: job.salary || '',
            applicationDate: job.applicationDate ? job.applicationDate.split('T')[0] : '',
            status: job.status || 'Applied',
            jobUrl: job.jobUrl || '',
            notes: job.notes || ''
          });
        }
      } catch (err) {
        console.error('Error fetching job details:', err);
        setError('Application not found or you are not authorized to edit it.');
      } finally {
        setFetching(false);
      }
    };

    fetchJob();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!formData.company.trim() || !formData.jobRole.trim()) {
      setError('Company name and Job role are required.');
      return;
    }

    setLoading(true);
    try {
      const response = await api.put(`/jobs/${id}`, formData);
      if (response.data.success) {
        navigate(`/applications/${id}`);
      }
    } catch (err) {
      console.error('Error updating job:', err);
      setError(err.response?.data?.message || 'Failed to update job application.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await api.delete(`/jobs/${id}`);
      setDeleteModalOpen(false);
      navigate('/applications');
    } catch (err) {
      console.error('Error deleting job:', err);
      setError('Failed to delete job application.');
    } finally {
      setIsDeleting(false);
    }
  };

  if (fetching) {
    return (
      <div className="container" style={{ padding: '4rem 0' }}>
        <LoadingSpinner message="Loading application details for editing..." />
      </div>
    );
  }

  return (
    <div className="job-form-page container">
      <div className="job-form-header">
        <Link to={`/applications/${id}`} className="btn btn-ghost btn-sm back-link" id="edit-back-link">
          <ArrowLeft size={16} />
          <span>Back to Details</span>
        </Link>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h1 className="job-form-title">Edit Application</h1>
            <p className="job-form-subtitle">
              Modify details for {formData.jobRole} at {formData.company}
            </p>
          </div>
          <button
            type="button"
            className="btn btn-danger btn-sm"
            onClick={() => setDeleteModalOpen(true)}
            id="edit-delete-job-btn"
          >
            <Trash2 size={16} />
            <span>Delete Application</span>
          </button>
        </div>
      </div>

      {error && <AlertMessage type="error" message={error} onClose={() => setError(null)} />}

      <div className="glass-card job-form-card">
        <form onSubmit={handleSubmit} id="edit-job-form">
          <div className="form-grid-2">
            {/* Company Name */}
            <div className="form-group">
              <label className="form-label" htmlFor="edit-company">
                Company Name <span className="required-star">*</span>
              </label>
              <div className="input-icon-wrapper">
                <Building size={18} className="input-icon" />
                <input
                  type="text"
                  id="edit-company"
                  name="company"
                  className="form-input"
                  value={formData.company}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Job Role */}
            <div className="form-group">
              <label className="form-label" htmlFor="edit-jobRole">
                Job Role / Title <span className="required-star">*</span>
              </label>
              <div className="input-icon-wrapper">
                <Briefcase size={18} className="input-icon" />
                <input
                  type="text"
                  id="edit-jobRole"
                  name="jobRole"
                  className="form-input"
                  value={formData.jobRole}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          <div className="form-grid-3">
            {/* Location */}
            <div className="form-group">
              <label className="form-label" htmlFor="edit-location">
                Location
              </label>
              <div className="input-icon-wrapper">
                <MapPin size={18} className="input-icon" />
                <input
                  type="text"
                  id="edit-location"
                  name="location"
                  className="form-input"
                  value={formData.location}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Salary */}
            <div className="form-group">
              <label className="form-label" htmlFor="edit-salary">
                Salary
              </label>
              <div className="input-icon-wrapper">
                <DollarSign size={18} className="input-icon" />
                <input
                  type="text"
                  id="edit-salary"
                  name="salary"
                  className="form-input"
                  value={formData.salary}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Application Date */}
            <div className="form-group">
              <label className="form-label" htmlFor="edit-applicationDate">
                Application Date
              </label>
              <div className="input-icon-wrapper">
                <Calendar size={18} className="input-icon" />
                <input
                  type="date"
                  id="edit-applicationDate"
                  name="applicationDate"
                  className="form-input"
                  value={formData.applicationDate}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div className="form-grid-2">
            {/* Status */}
            <div className="form-group">
              <label className="form-label" htmlFor="edit-status">
                Status
              </label>
              <select
                id="edit-status"
                name="status"
                className="form-select"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="Applied">Applied</option>
                <option value="Interview">Interview</option>
                <option value="Selected">Selected</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>

            {/* Job URL */}
            <div className="form-group">
              <label className="form-label" htmlFor="edit-jobUrl">
                Job Posting URL
              </label>
              <div className="input-icon-wrapper">
                <Link2 size={18} className="input-icon" />
                <input
                  type="url"
                  id="edit-jobUrl"
                  name="jobUrl"
                  className="form-input"
                  value={formData.jobUrl}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          {/* Notes */}
          <div className="form-group">
            <label className="form-label" htmlFor="edit-notes">
              Notes
            </label>
            <textarea
              id="edit-notes"
              name="notes"
              className="form-textarea"
              value={formData.notes}
              onChange={handleChange}
              rows={5}
            />
          </div>

          <div className="form-actions-footer">
            <Link to={`/applications/${id}`} className="btn btn-secondary">
              Cancel
            </Link>
            <button
              type="submit"
              id="submit-edit-job-btn"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? (
                <span>Updating...</span>
              ) : (
                <>
                  <Save size={18} />
                  <span>Save Changes</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      <ConfirmModal
        isOpen={deleteModalOpen}
        title="Delete Application"
        message={`Are you sure you want to permanently delete this application for ${formData.jobRole} at ${formData.company}?`}
        confirmText="Yes, Delete"
        isDanger={true}
        isLoading={isDeleting}
        onConfirm={handleDelete}
        onCancel={() => setDeleteModalOpen(false)}
      />
    </div>
  );
};

export default EditJobPage;
