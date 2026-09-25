import React from 'react';
import { Sparkles, CheckCircle2 } from 'lucide-react';

const companies = [
  { name: 'Google', role: 'Senior SDE', status: 'Interviewing', badge: 'Active' },
  { name: 'Amazon', role: 'AWS Solutions Architect', status: 'Offer Stage', badge: 'High Match' },
  { name: 'Microsoft', role: 'Full Stack Engineer', status: 'Applied', badge: 'Referral' },
  { name: 'Meta', role: 'Production Engineer', status: 'Interviewing', badge: 'Round 2' },
  { name: 'Stripe', role: 'Staff Backend Dev', status: 'Offer Received', badge: '$225k' },
  { name: 'Netflix', role: 'Platform Systems Lead', status: 'Screening', badge: 'Remote' },
  { name: 'Apple', role: 'iOS Core Frameworks', status: 'Interviewing', badge: 'Round 3' },
  { name: 'OpenAI', role: 'Inference Infrastructure', status: 'Applied', badge: 'High Priority' },
  { name: 'Uber', role: 'Distributed Systems', status: 'Selected', badge: 'Verified' },
  { name: 'Airbnb', role: 'Design Technologist', status: 'Offer Received', badge: '$210k' }
];

const CompanyTicker = () => {
  return (
    <div className="kinetic-ticker-section" aria-label="Target Tech Companies">
      <div className="ticker-label-strip">
        <span className="ticker-pulse-light" />
        <span className="ticker-strip-text">LIVE CAREER FLOWSTREAM // ACTIVE PIPELINE RADAR</span>
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
