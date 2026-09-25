import React, { useEffect, useState } from 'react';
import { playHoverSound, playStageSound } from './SoundEffects';

const chapters = [
  { id: 'hero-chapter', number: '01', title: 'RADAR', label: 'Discovery' },
  { id: 'pipeline-chapter', number: '02', title: 'PIPELINE', label: 'Stage Matrix' },
  { id: 'intelligence-chapter', number: '03', title: 'METRICS', label: 'Analytics' },
  { id: 'features-chapter', number: '04', title: 'TOOLKIT', label: 'Features' },
  { id: 'cta-chapter', number: '05', title: 'LAUNCH', label: 'Get Started' }
];

const ChapterNav = () => {
  const [activeChapter, setActiveChapter] = useState('hero-chapter');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight * 0.35;

      for (let i = chapters.length - 1; i >= 0; i--) {
        const el = document.getElementById(chapters[i].id);
        if (el && el.offsetTop <= scrollPos) {
          setActiveChapter(chapters[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id, idx) => {
    playStageSound(idx);
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="mugen-chapter-nav" aria-label="Milestone chapters">
      <div className="chapter-nav-rail">
        <div className="chapter-nav-line" />
        {chapters.map((ch, idx) => {
          const isActive = activeChapter === ch.id;
          return (
            <button
              key={ch.id}
              className={`chapter-nav-item ${isActive ? 'active' : ''}`}
              onClick={() => scrollTo(ch.id, idx)}
              onMouseEnter={playHoverSound}
              title={`${ch.number} ${ch.title} - ${ch.label}`}
              aria-current={isActive ? 'step' : undefined}
            >
              <span className="chapter-number">{ch.number}</span>
              <div className="chapter-dot" />
              <div className="chapter-meta">
                <span className="chapter-code">{ch.title}</span>
                <span className="chapter-desc">{ch.label}</span>
              </div>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default ChapterNav;
