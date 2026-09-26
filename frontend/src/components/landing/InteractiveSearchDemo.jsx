import React, { useState } from 'react';
import { Search, Filter, Building2, MapPin, DollarSign, Calendar, ExternalLink } from 'lucide-react';


const sampleJobs = [
  {
    id: 1,
    company: 'Google',
    role: 'Staff Software Engineer',
    location: 'Mountain View, CA (Hybrid)',
    salary: '$245,000 / yr',
    status: 'Interview',
    statusClass: 'badge-interview',
    date: 'Sep 24, 2026'
  },
  {
    id: 2,
    company: 'Stripe',
    role: 'Lead Infrastructure Engineer',
    location: 'San Francisco, CA (Remote)',
    salary: '$215,000 / yr',
    status: 'Selected',
    statusClass: 'badge-selected',
    date: 'Sep 22, 2026'
  },
  {
    id: 3,
    company: 'Amazon',
    role: 'Full Stack Cloud Architect',
    location: 'Seattle, WA (Onsite)',
    salary: '$180,000 / yr',
    status: 'Applied',
    statusClass: 'badge-applied',
    date: 'Sep 25, 2026'
  },
  {
    id: 4,
    company: 'Netflix',
    role: 'Senior UI/UX Technologist',
    location: 'Los Gatos, CA (Remote)',
    salary: '$260,000 / yr',
    status: 'Interview',
    statusClass: 'badge-interview',
    date: 'Sep 21, 2026'
  }
];

const InteractiveSearchDemo = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredJobs = sampleJobs.filter((job) => {
    const matchesSearch =
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      activeFilter === 'All' || job.status.toLowerCase() === activeFilter.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="search-demo-container">
      {/* Interactive Controls Bar */}
      <div className="search-demo-controls glass-card">
        <div className="search-input-wrapper">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            className="search-demo-input"
            placeholder='Try typing "Remote", "Staff", "Google", "Stripe"...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            id="landing-mock-search"
          />
          {searchTerm && (
            <button className="clear-btn" onClick={() => setSearchTerm('')}>
              ✕
            </button>
          )}
        </div>

        <div className="filter-pill-group">
          {['All', 'Applied', 'Interview', 'Selected'].map((status) => (
            <button
              key={status}
              className={`filter-pill ${activeFilter === status ? 'active' : ''}`}
              onClick={() => setActiveFilter(status)}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Filtered Results Stream */}
      <div className="search-demo-grid">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <div key={job.id} className="demo-job-card glass-card">
              <div className="demo-job-header">
                <div>
                  <div className="demo-job-company">
                    <Building2 size={14} />
                    <span>{job.company}</span>
                  </div>
                  <h4 className="demo-job-role">{job.role}</h4>
                </div>
                <span className={`demo-status-badge ${job.statusClass}`}>{job.status}</span>
              </div>

              <div className="demo-job-meta">
                <span className="demo-meta-item">
                  <MapPin size={13} /> {job.location}
                </span>
                <span className="demo-meta-item">
                  <DollarSign size={13} /> {job.salary}
                </span>
                <span className="demo-meta-item">
                  <Calendar size={13} /> {job.date}
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="search-demo-empty glass-card">
            <p>No matching applications found. Clear your filter to see all!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default InteractiveSearchDemo;
