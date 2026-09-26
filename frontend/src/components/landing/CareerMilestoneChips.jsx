import React from 'react';
import { Send, Calendar, CheckCircle2, Award, Sparkles, TrendingUp } from 'lucide-react';
import './CareerMilestoneChips.css';

/**
 * CareerMilestoneChips
 * Provides well-labeled, authentic job application cards and animated micro-badges
 * around the hero section, making it crystal clear that this is a premier job application system.
 */
const milestones = [
  {
    id: 'applied',
    stageLabel: 'STAGE 01 // APPLIED',
    stageBadge: 'Applied',
    badgeClass: 'badge-chip-applied',
    company: 'Stripe',
    role: 'Senior Full Stack Engineer',
    metric: 'ATS Match 98%',
    time: '2h ago',
    icon: Send,
    positionClass: 'chip-pos-top-left'
  },
  {
    id: 'interview',
    stageLabel: 'STAGE 02 // INTERVIEW',
    stageBadge: 'In Progress',
    badgeClass: 'badge-chip-interview',
    company: 'Google',
    role: 'Staff Systems Architect',
    metric: 'Round 3: System Design',
    time: 'Tomorrow 10:00 AM',
    icon: Calendar,
    positionClass: 'chip-pos-bottom-left'
  },
  {
    id: 'selected',
    stageLabel: 'STAGE 03 // SELECTED',
    stageBadge: 'Round Passed',
    badgeClass: 'badge-chip-selected',
    company: 'Netflix',
    role: 'Platform Infrastructure Lead',
    metric: 'Committee Approved',
    time: 'Just now',
    icon: CheckCircle2,
    positionClass: 'chip-pos-top-right'
  },
  {
    id: 'offer',
    stageLabel: 'STAGE 04 // OFFER',
    stageBadge: 'Offer Extended',
    badgeClass: 'badge-chip-offer',
    company: 'Microsoft',
    role: 'Principal Cloud Architect',
    metric: '$280,000 / yr + Equity',
    time: 'Finalized',
    icon: Award,
    positionClass: 'chip-pos-bottom-right'
  }
];

const CareerMilestoneChips = () => {
  return (
    <div className="career-milestone-chips-wrapper" aria-hidden="true">
      {milestones.map((item) => {
        const IconComponent = item.icon;
        return (
          <div key={item.id} className={`career-milestone-chip ${item.positionClass}`}>
            <div className="milestone-chip-header">
              <span className="milestone-stage-label">{item.stageLabel}</span>
              <span className={`milestone-badge ${item.badgeClass}`}>
                <span className="milestone-pulse-dot" />
                {item.stageBadge}
              </span>
            </div>

            <div className="milestone-chip-body">
              <div className="milestone-icon-box">
                <IconComponent size={15} />
              </div>
              <div className="milestone-info">
                <div className="milestone-title-row">
                  <span className="milestone-company">{item.company}</span>
                  <span className="milestone-role-divider">•</span>
                  <span className="milestone-role">{item.role}</span>
                </div>
                <div className="milestone-sub-row">
                  <span className="milestone-metric-highlight">{item.metric}</span>
                  <span className="milestone-time">{item.time}</span>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CareerMilestoneChips;
