import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Clock,
  Building2,
  DollarSign,
  MapPin,
  Flame,
  Award,
  TrendingUp,
  RefreshCw
} from 'lucide-react';
import MagneticCard from './MagneticCard';
import { playStageSound, playOfferCelebration, playHoverSound } from './SoundEffects';

const stages = [
  {
    key: 'applied',
    label: 'Applied',
    badgeClass: 'badge-applied',
    color: '#f59e0b',
    pct: 25,
    company: 'Stripe',
    avatar: 'S',
    avatarClass: 'avatar-stripe',
    role: 'Senior Full Stack Engineer',
    location: 'San Francisco, CA (Remote)',
    salary: '$195,000 / yr',
    appliedDate: '2 days ago',
    round: 'Screening Round Pending',
    insight: 'Resume parsed & ATS match 96%'
  },
  {
    key: 'interview',
    label: 'Interview',
    badgeClass: 'badge-interview',
    color: '#8b5cf6',
    pct: 50,
    company: 'Google',
    avatar: 'G',
    avatarClass: 'avatar-google',
    role: 'Staff Systems Architect',
    location: 'Mountain View, CA (Hybrid)',
    salary: '$240,000 / yr',
    appliedDate: '1 week ago',
    round: 'Round 3: System Design & Scaling',
    insight: 'Technical debrief scheduled with VP of Eng'
  },
  {
    key: 'selected',
    label: 'Selected 🎉',
    badgeClass: 'badge-selected',
    color: '#10b981',
    pct: 80,
    company: 'Netflix',
    avatar: 'N',
    avatarClass: 'avatar-netflix',
    role: 'Lead Platform Infrastructure',
    location: 'Los Gatos, CA (Remote)',
    salary: '$265,000 / yr',
    appliedDate: '2 weeks ago',
    round: 'Final Hiring Committee Approved',
    insight: 'Offer letter in preparation with sign-on bonus'
  },
  {
    key: 'offer',
    label: 'Offer Signed 🚀',
    badgeClass: 'badge-offer',
    color: '#f59e0b',
    pct: 100,
    company: 'Microsoft',
    avatar: 'M',
    avatarClass: 'avatar-msft',
    role: 'Principal Cloud Architect',
    location: 'Redmond, WA (Hybrid)',
    salary: '$280,000 + Equity',
    appliedDate: '3 weeks ago',
    round: 'Contract Negotiated & Accepted',
    insight: 'Target start date locked for next month'
  }
];

const PipelineSimulator = () => {
  const [currentStageIdx, setCurrentStageIdx] = useState(1);
  const [celebrating, setCelebrating] = useState(false);

  const stage = stages[currentStageIdx];

  const handleStageSelect = (idx) => {
    setCurrentStageIdx(idx);
    if (idx === 2 || idx === 3) {
      setCelebrating(true);
      playOfferCelebration();
      setTimeout(() => setCelebrating(false), 2400);
    } else {
      playStageSound(idx);
    }
  };

  const handleNext = () => {
    const nextIdx = (currentStageIdx + 1) % stages.length;
    handleStageSelect(nextIdx);
  };

  return (
    <div className="pipeline-simulator-wrapper">
      <MagneticCard className="simulator-glass-card" intensity={12}>
        {/* Simulator Top Terminal Bar */}
        <div className="simulator-header">
          <div className="terminal-dots">
            <span className="dot dot-red" />
            <span className="dot dot-yellow" />
            <span className="dot dot-green" />
          </div>
          <div className="terminal-title">
            <span className="terminal-live-blip" />
            <span>LIVE_PIPELINE_ENGINE // 60 FPS</span>
          </div>
          <button
            className="sim-cycle-btn"
            onClick={handleNext}
            onMouseEnter={playHoverSound}
            title="Step through pipeline"
          >
            <RefreshCw size={13} className="spin-on-hover" />
            <span>Simulate Step</span>
          </button>
        </div>

        {/* Interactive Stage Step Indicator */}
        <div className="sim-stages-selector">
          {stages.map((st, i) => {
            const isActive = i === currentStageIdx;
            const isCompleted = i < currentStageIdx;
            return (
              <button
                key={st.key}
                className={`sim-stage-tab ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
                onClick={() => handleStageSelect(i)}
                onMouseEnter={playHoverSound}
                style={{
                  '--accent': st.color
                }}
              >
                <span className="sim-stage-step-num">0{i + 1}</span>
                <span className="sim-stage-label">{st.label.replace(' 🎉', '').replace(' 🚀', '')}</span>
                {isActive && <span className="sim-stage-active-pulse" />}
              </button>
            );
          })}
        </div>

        {/* Dynamic Progress Bar */}
        <div className="sim-progress-track">
          <div
            className="sim-progress-fill"
            style={{
              width: `${stage.pct}%`,
              background: `linear-gradient(90deg, #f59e0b, ${stage.color})`
            }}
          />
          <div className="sim-progress-label">
            <span>PIPELINE VELOCITY</span>
            <span className="sim-pct-val">{stage.pct}% COMPLETION</span>
          </div>
        </div>

        {/* Main Stage Interactive Showcase */}
        <div className={`sim-card-body ${celebrating ? 'celebration-mode' : ''}`}>
          <div className="sim-hero-job-row">
            <div className="sim-job-avatar-wrapper">
              <div className={`sim-company-avatar ${stage.avatarClass}`}>
                {stage.avatar}
              </div>
              <div className="sim-job-primary">
                <div className="sim-job-role">{stage.role}</div>
                <div className="sim-job-company">
                  <Building2 size={14} />
                  <span>{stage.company}</span>
                  <span className="sim-dot-sep">•</span>
                  <MapPin size={14} />
                  <span>{stage.location}</span>
                </div>
              </div>
            </div>
            <div className={`sim-status-pill ${stage.badgeClass}`}>
              <Sparkles size={13} />
              <span>{stage.label}</span>
            </div>
          </div>

          {/* Quick Metrics Bar inside card */}
          <div className="sim-metrics-grid">
            <div className="sim-metric-cell">
              <span className="sim-metric-title">
                <DollarSign size={13} /> Target Compensation
              </span>
              <span className="sim-metric-val">{stage.salary}</span>
            </div>
            <div className="sim-metric-cell">
              <span className="sim-metric-title">
                <Clock size={13} /> Current Status
              </span>
              <span className="sim-metric-val">{stage.round}</span>
            </div>
            <div className="sim-metric-cell sim-metric-full">
              <span className="sim-metric-title">
                <TrendingUp size={13} /> AI Pipeline Intelligence
              </span>
              <span className="sim-metric-val sim-insight-text">
                {stage.insight}
              </span>
            </div>
          </div>

          {/* Next Action trigger */}
          <div className="sim-footer-action">
            <div className="sim-footer-meta">
              <Flame size={14} className="flame-icon" />
              <span>Click any stage above or advance status in 1 click</span>
            </div>
            <button
              className="btn-advance-pipeline"
              onClick={handleNext}
              onMouseEnter={playHoverSound}
            >
              <span>{currentStageIdx === 3 ? 'Restart Flow' : 'Advance Next Stage'}</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </MagneticCard>
    </div>
  );
};

export default PipelineSimulator;
