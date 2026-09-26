import React from 'react';
import { Briefcase } from 'lucide-react';

const companies = [
  { name: 'Google', role: 'Software Engineer', badge: 'Active' },
  { name: 'Amazon', role: 'Cloud Architect', badge: 'Applied' },
  { name: 'Microsoft', role: 'Full Stack Engineer', badge: 'Interview' },
  { name: 'Meta', role: 'Frontend Engineer', badge: 'Round 2' },
  { name: 'Stripe', role: 'Backend Engineer', badge: 'Offer' },
  { name: 'Netflix', role: 'UI Engineer', badge: 'Screening' },
  { name: 'Apple', role: 'iOS Developer', badge: 'Interview' },
  { name: 'Uber', role: 'Systems Engineer', badge: 'Applied' },
  { name: 'Airbnb', role: 'Product Designer', badge: 'Offer' }
];

const CompanyTicker = () => {
  return (
    <div className="company-ticker-section" aria-label="Target Tech Companies">
      <div className="container">
        <p className="ticker-intro-text">
          <Briefcase size={14} />
          <span>Organize applications across leading companies and high-growth startups</span>
        </p>
      </div>

      <div className="ticker-track-wrapper">
        <div className="ticker-track">
          {companies.concat(companies).map((c, i) => (
            <div key={i} className="ticker-pill">
              <span className="ticker-company">{c.name}</span>
              <span className="ticker-role">{c.role}</span>
              <span className="ticker-badge">{c.badge}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CompanyTicker;
