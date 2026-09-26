import React from 'react';
import { Send, CalendarCheck, CheckCircle2, Award, ArrowRight, Sparkles, TrendingUp } from 'lucide-react';
import { playHoverSound, playClickSound, playOfferCelebration } from '../landing/SoundEffects';
import './JobApplicationPipelineTracker.css';

/**
 * JobApplicationPipelineTracker
 * Provides a prominent, well-labeled 4-stage pipeline animation and visualizer
 * for JobTrack Dashboard.
 */
const JobApplicationPipelineTracker = ({ stats, activeFilter, onSelectFilter }) => {
  const total = stats?.total || 0;
  const appliedCount = stats?.applied || 0;
  const interviewCount = stats?.interview || 0;
  const selectedCount = stats?.selected || 0;

  // Real-time Conversion calculations
  const interviewRate = total > 0 ? Math.round(((interviewCount + selectedCount) / total) * 100) : 0;
  const offerRate = (interviewCount + selectedCount) > 0
    ? Math.round((selectedCount / (interviewCount + selectedCount)) * 100)
    : 0;

  const pipelineStages = [
    {
      key: 'APPLIED',
      stageNum: '01',
      title: 'Applied',
      subtitle: 'ATS Review & Outreach',
      count: appliedCount,
      icon: Send,
      color: '#f59e0b',
      accentClass: 'stage-applied',
      metricLabel: 'Resume Submitted',
      checklist: ['ATS Keyword Match', 'Recruiter Review', 'Initial Screening']
    },
    {
      key: 'INTERVIEW',
      stageNum: '02',
      title: 'Interview',
      subtitle: 'Technical & Rounds',
      count: interviewCount,
      icon: CalendarCheck,
      color: '#8b5cf6',
      accentClass: 'stage-interview',
      metricLabel: `${interviewRate}% Conv. Rate`,
      checklist: ['Live Coding & DSA', 'System Architecture', 'Hiring Manager']
    },
    {
      key: 'SELECTED',
      stageNum: '03',
      title: 'Selected',
      subtitle: 'Committee Clearance',
      count: selectedCount,
      icon: CheckCircle2,
      color: '#10b981',
      accentClass: 'stage-selected',
      metricLabel: 'Passed Evaluation',
      checklist: ['Committee Approval', 'Team Matching', 'Reference Verification']
    },
    {
      key: 'OFFER',
      stageNum: '04',
      title: 'Offer Package',
      subtitle: 'Contract & Signing',
      count: selectedCount,
      icon: Award,
      color: '#ff6b35',
      accentClass: 'stage-offer',
      metricLabel: `${offerRate}% Win Rate`,
      checklist: ['Base Salary & Bonus', 'Equity / RSUs Grant', 'Signing & Start Date']
    }
  ];

  const handleStageClick = (key) => {
    playClickSound();
    if (key === 'OFFER' || key === 'SELECTED') {
      playOfferCelebration();
    }
    // Filter by corresponding key in parent
    const targetFilter = key === 'OFFER' ? 'SELECTED' : key;
    if (onSelectFilter) {
      onSelectFilter(targetFilter);
    }
  };

  return (
    <div className="job-pipeline-tracker-container">
      {/* Top Header Row with Well-Labeled Legend */}
      <div className="pipeline-tracker-header">
        <div className="pipeline-tracker-title-group">
          <div className="pipeline-live-indicator">
            <span className="pipeline-pulse-dot" />
            <span className="pipeline-badge-text">LIFECYCLE MATRIX</span>
          </div>
          <h2 className="pipeline-tracker-heading">Job Application Pipeline & Milestone Progression</h2>
        </div>

        <div className="pipeline-velocity-chips">
          <div className="velocity-chip" title="Percentage of applied jobs progressing to interview">
            <TrendingUp size={13} style={{ color: '#f59e0b' }} />
            <span>Interview Rate: <strong>{interviewRate}%</strong></span>
          </div>
          <div className="velocity-chip" title="Percentage of interviews converting to offers">
            <Sparkles size={13} style={{ color: '#10b981' }} />
            <span>Offer Conversion: <strong>{offerRate}%</strong></span>
          </div>
        </div>
      </div>

      {/* 4-Stage Interactive Pipeline Ribbon */}
      <div className="pipeline-stages-track">
        {pipelineStages.map((stg, index) => {
          const Icon = stg.icon;
          const isSelected = activeFilter === stg.key || (stg.key === 'OFFER' && activeFilter === 'SELECTED');

          return (
            <React.Fragment key={stg.key}>
              <div
                className={`pipeline-stage-card ${stg.accentClass} ${isSelected ? 'is-active-filter' : ''}`}
                onClick={() => handleStageClick(stg.key)}
                onMouseEnter={playHoverSound}
                role="button"
                tabIndex={0}
                title={`Click to filter applications in ${stg.title}`}
              >
                {/* Stage Header */}
                <div className="stage-card-top">
                  <span className="stage-step-tag">// STAGE {stg.stageNum}</span>
                  <div className="stage-icon-circle">
                    <Icon size={16} />
                  </div>
                </div>

                {/* Count & Stage Title */}
                <div className="stage-body">
                  <div className="stage-count">{stg.count}</div>
                  <div className="stage-name">{stg.title}</div>
                  <div className="stage-sub">{stg.subtitle}</div>
                </div>

                {/* Stage Metric Badge */}
                <div className="stage-footer">
                  <span className="stage-metric-badge">{stg.metricLabel}</span>
                </div>

                {/* Active Indicator Underline */}
                {isSelected && <div className="stage-active-line" />}
              </div>

              {/* Connecting Pipeline Conduit between cards */}
              {index < pipelineStages.length - 1 && (
                <div className="pipeline-conduit" aria-hidden="true">
                  <div className="conduit-line" />
                  <div className="conduit-pulse" />
                  <ArrowRight size={13} className="conduit-arrow" />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default JobApplicationPipelineTracker;
