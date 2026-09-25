import React, { useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { toggleSound, isSoundEnabled, playHoverSound } from './SoundEffects';

const AudioToggle = () => {
  const [enabled, setEnabled] = useState(isSoundEnabled());

  const handleToggle = () => {
    const newState = toggleSound();
    setEnabled(newState);
  };

  return (
    <button
      className={`audio-toggle-btn ${enabled ? 'active' : ''}`}
      onClick={handleToggle}
      onMouseEnter={playHoverSound}
      title={enabled ? 'Mute ambient SFX' : 'Enable ambient SFX'}
      aria-label="Toggle sound effects"
    >
      {enabled ? <Volume2 size={15} /> : <VolumeX size={15} />}
      <span className="audio-label">{enabled ? 'SFX ON' : 'SFX OFF'}</span>
      {enabled && <span className="audio-wave-anim" />}
    </button>
  );
};

export default AudioToggle;
