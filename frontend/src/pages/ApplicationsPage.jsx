import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/axiosConfig';
import {
  Search,
  Filter,
  PlusCircle,
  Eye,
  Edit,
  Trash2,
  ExternalLink,
  MapPin,
  Calendar,
  DollarSign,
  Grid,
  List,
  RotateCcw,
  Building,
  Briefcase
} from 'lucide-react';
import StatusBadge from '../components/StatusBadge';
import LoadingSpinner from '../components/LoadingSpinner';
import AlertMessage from '../components/AlertMessage';
import ConfirmModal from '../components/ConfirmModal';
import '../styles/Applications.css';

const ApplicationsPage = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  // Filters & Search State
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [companyFilter, setCompanyFilter] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState('cards'); // 'cards' | 'table'

  // Pagination
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  // Delete modal state
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [jobToDelete, setJobToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const navigate = useNavigate();

  const fetchJobs = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = {
        page,
        limit: 12,
        sort: sortBy
      };

      if (search.trim()) params.search = search.trim();
      if (statusFilter && statusFilter !== 'all') params.status = statusFilter;
      if (companyFilter.trim()) params.company = companyFilter.trim();
      if (roleFilter.trim()) params.role = roleFilter.trim();

      const response = await api.get('/jobs', { params });
      if (response.data.success) {
        setJobs(response.data.jobs);
        setTotalPages(response.data.totalPages || 1);
        setTotalCount(response.data.total || 0);
      }
    } catch (err) {
      console.error('Error fetching jobs:', err);
      setError('Failed to load applications. Please ensure backend server is running.');
    } finally {
      setLoading(false);
    }
  }, [page, sortBy, statusFilter, companyFilter, roleFilter, search]);

  useEffect(() => {
    // Debounce search/filter changes
    const timer = setTimeout(() => {
      fetchJobs();
    }, 250);

    return () => clearTimeout(timer);
  }, [fetchJobs]);

  const handleResetFilters = () => {
    setSearch('');
    setStatusFilter('all');
    setCompanyFilter('');
    setRoleFilter('');
    setSortBy('newest');
    setPage(1);
  };

  const handleOpenDelete = (job) => {
    setJobToDelete(job);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!jobToDelete) return;
    setIsDeleting(true);
    try {
      await api.delete(`/jobs/${jobToDelete._id}`);
      setDeleteModalOpen(false);
      setSuccessMsg(`Successfully deleted application for ${jobToDelete.jobRole} at ${jobToDelete.company}`);
      setJobToDelete(null);
      // Refresh list
      fetchJobs();
    } catch (err) {
      console.error('Error deleting job:', err);
      setError(err.response?.data?.message || 'Failed to delete application.');
    } finally {
      setIsDeleting(false);
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
    <div className="applications-page container">
      {/* Top Header */}
      <div className="apps-header">
        <div>
          <h1 className="apps-title">Job Applications</h1>
          <p className="apps-subtitle">
            Manage, filter, and track all your submitted opportunities ({totalCount} total)
          </p>
        </div>

        <Link to="/add-job" id="btn-create-application" className="btn btn-primary">
          <PlusCircle size={18} />
          <span>Add Application</span>
        </Link>
      </div>

      {successMsg && (
        <AlertMessage type="success" message={successMsg} onClose={() => setSuccessMsg(null)} />
      )}
      {error && <AlertMessage type="error" message={error} onClose={() => setError(null)} />}

      {/* Filter and Search Bar Section */}
      <div className="filter-panel glass-card">
        {/* Search Row */}
        <div className="filter-row search-row">
          <div className="input-icon-wrapper search-wrapper">
            <Search size={18} className="input-icon" />
            <input
              type="text"
              id="filter-search-input"
              className="form-input"
              placeholder="Search by company, role, location, or notes..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
            />
          </div>

          {/* Quick Status Filter Tabs */}
          <div className="status-tabs-wrapper">
            {['all', 'Applied', 'Interview', 'Selected', 'Rejected'].map((status) => (
              <button
                key={status}
                id={`status-tab-${status.toLowerCase()}`}
                type="button"
                className={`status-tab-btn ${statusFilter === status ? 'active' : ''}`}
                onClick={() => {
                  setStatusFilter(status);
                  setPage(1);
                }}
              >
                {status === 'all' ? 'All Applications' : status}
              </button>
            ))}
          </div>
        </div>

        {/* Secondary Filter Controls */}
        <div className="filter-row secondary-filters">
          <div className="filter-input-group">
            <div className="input-icon-wrapper">
              <Building size={16} className="input-icon" />
              <input
                type="text"
                id="filter-company-input"
                className="form-input form-input-sm"
                placeholder="Filter by company..."
                value={companyFilter}
                onChange={(e) => {
                  setCompanyFilter(e.target.value);
                  setPage(1);
                }}
              />
            </div>
          </div>

          <div className="filter-input-group">
            <div className="input-icon-wrapper">
              <Briefcase size={16} className="input-icon" />
              <input
                type="text"
                id="filter-role-input"
                className="form-input form-input-sm"
                placeholder="Filter by job role..."
                value={roleFilter}
                onChange={(e) => {
                  setRoleFilter(e.target.value);
                  setPage(1);
                }}
              />
            </div>
          </div>

          {/* Sort By Dropdown */}
          <div className="sort-dropdown-wrapper">
            <label htmlFor="sort-select" className="filter-label">Sort:</label>
            <select
              id="sort-select"
              className="form-select form-input-sm"
              value={sortBy}
              onChange={(e) => {
                setSortBy(e.target.value);
                setPage(1);
              }}
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="company-asc">Company (A-Z)</option>
              <option value="company-desc">Company (Z-A)</option>
              <option value="status">Status</option>
            </select>
          </div>

          {/* View Mode Toggle & Reset */}
          <div className="view-mode-group">
            <button
              type="button"
              id="view-mode-cards"
              className={`btn btn-ghost btn-icon ${viewMode === 'cards' ? 'active-view' : ''}`}
              onClick={() => setViewMode('cards')}
              title="Cards view"
            >
              <Grid size={18} />
            </button>
            <button
              type="button"
              id="view-mode-table"
              className={`btn btn-ghost btn-icon ${viewMode === 'table' ? 'active-view' : ''}`}
              onClick={() => setViewMode('table')}
              title="Table view"
            >
              <List size={18} />
            </button>

            <button
              type="button"
              id="reset-filters-btn"
              className="btn btn-secondary btn-sm"
              onClick={handleResetFilters}
              title="Reset all filters"
            >
              <RotateCcw size={14} />
              <span>Reset</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      {loading ? (
        <LoadingSpinner message="Loading applications..." size="medium" />
      ) : jobs.length === 0 ? (
        <div className="glass-card empty-applications">
          <div className="empty-icon-circle">
            <Briefcase size={32} />
          </div>
          <h3>No applications found</h3>
          <p>
            {search || statusFilter !== 'all' || companyFilter || roleFilter
              ? 'No jobs match your current search or filter criteria. Try resetting filters.'
              : "You haven't added any job applications yet. Start tracking your pipeline now!"}
          </p>
          {search || statusFilter !== 'all' || companyFilter || roleFilter ? (
            <button onClick={handleResetFilters} className="btn btn-secondary">
              Reset Filters
            </button>
          ) : (
            <Link to="/add-job" className="btn btn-primary">
              <PlusCircle size={18} />
              <span>Add Your First Application</span>
            </Link>
          )}
        </div>
      ) : viewMode === 'cards' ? (
        /* Grid / Card View */
        <div className="jobs-cards-grid">
          {jobs.map((job) => (
            <div key={job._id} className="job-card glass-card">
              <div className="job-card-header">
                <div className="job-company-block">
                  <div className="job-avatar-icon">
                    {job.company.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="job-role-text" title={job.jobRole}>
                      {job.jobRole}
                    </h3>
                    <span className="job-company-name">{job.company}</span>
                  </div>
                </div>
                <StatusBadge status={job.status} />
              </div>

              <div className="job-card-details">
                <div className="detail-item">
                  <MapPin size={15} className="detail-icon" />
                  <span>{job.location || 'Remote'}</span>
                </div>
                <div className="detail-item">
                  <DollarSign size={15} className="detail-icon" />
                  <span>{job.salary || 'Not specified'}</span>
                </div>
                <div className="detail-item">
                  <Calendar size={15} className="detail-icon" />
                  <span>Applied {formatDate(job.applicationDate)}</span>
                </div>
              </div>

              {job.notes && (
                <p className="job-card-notes-preview">
                  "{job.notes.length > 90 ? `${job.notes.substring(0, 90)}...` : job.notes}"
                </p>
              )}

              <div className="job-card-footer">
                {job.jobUrl ? (
                  <a
                    href={job.jobUrl.startsWith('http') ? job.jobUrl : `https://${job.jobUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="job-external-link"
                    title="Open job posting"
                  >
                    <ExternalLink size={15} />
                    <span>Job Post</span>
                  </a>
                ) : (
                  <span />
                )}

                <div className="job-action-buttons">
                  <Link
                    to={`/applications/${job._id}`}
                    id={`view-job-${job._id}`}
                    className="btn btn-ghost btn-icon"
                    title="View application details"
                  >
                    <Eye size={17} />
                  </Link>
                  <Link
                    to={`/applications/edit/${job._id}`}
                    id={`edit-job-${job._id}`}
                    className="btn btn-ghost btn-icon"
                    title="Edit application"
                  >
                    <Edit size={17} />
                  </Link>
                  <button
                    type="button"
                    id={`delete-job-${job._id}`}
                    className="btn btn-ghost btn-icon btn-action-delete"
                    onClick={() => handleOpenDelete(job)}
                    title="Delete application"
                  >
                    <Trash2 size={17} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Table View */
        <div className="glass-card table-responsive-container">
          <table className="apps-table">
            <thead>
              <tr>
                <th>Company</th>
                <th>Role</th>
                <th>Location</th>
                <th>Salary</th>
                <th>Applied Date</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job) => (
                <tr key={job._id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                      <div className="job-avatar-icon table-avatar">
                        {job.company.charAt(0).toUpperCase()}
                      </div>
                      <span style={{ fontWeight: 600 }}>{job.company}</span>
                    </div>
                  </td>
                  <td>
                    <Link
                      to={`/applications/${job._id}`}
                      style={{ fontWeight: 600, color: 'var(--text-primary)' }}
                    >
                      {job.jobRole}
                    </Link>
                  </td>
                  <td>{job.location || 'Remote'}</td>
                  <td>{job.salary || 'Not specified'}</td>
                  <td>{formatDate(job.applicationDate)}</td>
                  <td>
                    <StatusBadge status={job.status} />
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <div style={{ display: 'inline-flex', gap: '0.35rem' }}>
                      <Link
                        to={`/applications/${job._id}`}
                        className="btn btn-ghost btn-icon btn-sm"
                        title="View details"
                      >
                        <Eye size={16} />
                      </Link>
                      <Link
                        to={`/applications/edit/${job._id}`}
                        className="btn btn-ghost btn-icon btn-sm"
                        title="Edit application"
                      >
                        <Edit size={16} />
                      </Link>
                      <button
                        type="button"
                        className="btn btn-ghost btn-icon btn-sm btn-action-delete"
                        onClick={() => handleOpenDelete(job)}
                        title="Delete application"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination Bar */}
      {totalPages > 1 && (
        <div className="pagination-bar">
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            Previous
          </button>
          <span className="pagination-info">
            Page {page} of {totalPages}
          </span>
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={deleteModalOpen}
        title="Delete Job Application"
        message={`Are you sure you want to permanently delete your application for "${jobToDelete?.jobRole}" at "${jobToDelete?.company}"? This action cannot be undone.`}
        confirmText="Yes, Delete Application"
        cancelText="Cancel"
        isDanger={true}
        isLoading={isDeleting}
        onConfirm={handleConfirmDelete}
        onCancel={() => {
          setDeleteModalOpen(false);
          setJobToDelete(null);
        }}
      />
    </div>
  );
};

export default ApplicationsPage;
