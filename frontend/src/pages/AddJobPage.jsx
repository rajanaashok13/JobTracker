import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
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
  PlusCircle
} from 'lucide-react';
import AlertMessage from '../components/AlertMessage';
import '../styles/JobForm.css';

const AddJobPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    company: '',
    jobRole: '',
    location: '',
    salary: '',
    applicationDate: new Date().toISOString().split('T')[0],
    status: 'Applied',
    jobUrl: '',
    notes: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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

    // Basic validation
    if (!formData.company.trim() || !formData.jobRole.trim()) {
      setError('Please provide both company name and job role.');
      return;
    }

    setLoading(true);
    try {
      const response = await api.post('/jobs', formData);
      if (response.data.success) {
        navigate('/applications');
      }
    } catch (err) {
      console.error('Error creating job application:', err);
      setError(err.response?.data?.message || 'Failed to save job application. Please check inputs.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="job-form-page container">
      {/* Header with back button */}
      <div className="job-form-header">
        <Link to="/applications" className="btn btn-ghost btn-sm back-link" id="add-job-back-link">
          <ArrowLeft size={16} />
          <span>Back to Applications</span>
        </Link>
        <h1 className="job-form-title">Add Job Application</h1>
        <p className="job-form-subtitle">
          Record a new career opportunity into your JobTrack pipeline
        </p>
      </div>

      {error && <AlertMessage type="error" message={error} onClose={() => setError(null)} />}

      <div className="glass-card job-form-card">
        <form onSubmit={handleSubmit} id="add-job-form">
          <div className="form-grid-2">
            {/* Company Name */}
            <div className="form-group">
              <label className="form-label" htmlFor="company">
                Company Name <span className="required-star">*</span>
              </label>
              <div className="input-icon-wrapper">
                <Building size={18} className="input-icon" />
                <input
                  type="text"
                  id="company"
                  name="company"
                  className="form-input"
                  placeholder="e.g. Google, Amazon, Startup Inc."
                  value={formData.company}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Job Role / Title */}
            <div className="form-group">
              <label className="form-label" htmlFor="jobRole">
                Job Role / Title <span className="required-star">*</span>
              </label>
              <div className="input-icon-wrapper">
                <Briefcase size={18} className="input-icon" />
                <input
                  type="text"
                  id="jobRole"
                  name="jobRole"
                  className="form-input"
                  placeholder="e.g. Full Stack Developer, SDE 1"
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
              <label className="form-label" htmlFor="location">
                Location
              </label>
              <div className="input-icon-wrapper">
                <MapPin size={18} className="input-icon" />
                <input
                  type="text"
                  id="location"
                  name="location"
                  className="form-input"
                  placeholder="e.g. Remote, New York, NY"
                  value={formData.location}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Salary */}
            <div className="form-group">
              <label className="form-label" htmlFor="salary">
                Salary / Compensation
              </label>
              <div className="input-icon-wrapper">
                <DollarSign size={18} className="input-icon" />
                <input
                  type="text"
                  id="salary"
                  name="salary"
                  className="form-input"
                  placeholder="e.g. $110,000 / yr or ₹12 LPA"
                  value={formData.salary}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Application Date */}
            <div className="form-group">
              <label className="form-label" htmlFor="applicationDate">
                Application Date
              </label>
              <div className="input-icon-wrapper">
                <Calendar size={18} className="input-icon" />
                <input
                  type="date"
                  id="applicationDate"
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
              <label className="form-label" htmlFor="status">
                Application Status
              </label>
              <select
                id="status"
                name="status"
                className="form-select"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="Applied">Applied (Initial submission)</option>
                <option value="Interview">Interview (HR / Technical Round)</option>
                <option value="Selected">Selected (Offer received 🎉)</option>
                <option value="Rejected">Rejected (Opportunity closed)</option>
              </select>
            </div>

            {/* Job Posting URL */}
            <div className="form-group">
              <label className="form-label" htmlFor="jobUrl">
                Job Posting URL
              </label>
              <div className="input-icon-wrapper">
                <Link2 size={18} className="input-icon" />
                <input
                  type="url"
                  id="jobUrl"
                  name="jobUrl"
                  className="form-input"
                  placeholder="https://linkedin.com/jobs/view/..."
                  value={formData.jobUrl}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          {/* Notes */}
          <div className="form-group">
            <label className="form-label" htmlFor="notes">
              Interview Notes & Details
            </label>
            <textarea
              id="notes"
              name="notes"
              className="form-textarea"
              placeholder="Add key notes, recruiter contact details, rounds scheduled, or tech stack requirements..."
              value={formData.notes}
              onChange={handleChange}
              rows={4}
            />
          </div>

          {/* Action buttons */}
          <div className="form-actions-footer">
            <Link to="/applications" className="btn btn-secondary">
              Cancel
            </Link>
            <button
              type="submit"
              id="submit-add-job-btn"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? (
                <span>Saving application...</span>
              ) : (
                <>
                  <Save size={18} />
                  <span>Save Application</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddJobPage;
