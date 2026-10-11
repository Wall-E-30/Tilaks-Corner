import { useState, useEffect } from 'react';

export default function AudioPermissionPrompt({ isSoundActive, onToggleSound }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const alreadyPrompted = localStorage.getItem('mindverse_audio_prompted');
      // If user hasn't made a choice and sound is currently off, show prompt after brief delay
      if (!alreadyPrompted && !isSoundActive) {
        const timer = setTimeout(() => {
          setVisible(true);
        }, 1800);
        return () => clearTimeout(timer);
      }
    } catch {
      // Storage unavailable
    }
  }, [isSoundActive]);

  const handleEnable = () => {
    try {
      localStorage.setItem('mindverse_audio_prompted', 'true');
    } catch {}
    setVisible(false);
    onToggleSound();
  };

  const handleDismiss = () => {
    try {
      localStorage.setItem('mindverse_audio_prompted', 'true');
    } catch {}
    setVisible(false);
  };

  if (!visible || isSoundActive) return null;

  return (
    <div
      role="region"
      aria-label="Cosmic Audio Prompt"
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 900,
        background: 'rgba(5, 6, 15, 0.94)',
        border: '1.5px solid var(--stardust-gold)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.7), 0 0 20px rgba(255, 200, 87, 0.25)',
        borderRadius: '30px',
        padding: '10px 18px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.78rem',
        animation: 'fadeInPrompt 300ms ease-out'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--moonlight)' }}>
        <span style={{ color: 'var(--stardust-gold)', fontSize: '0.9rem' }}>✦</span>
        <span>Enable Cosmic Audio? Procedural soundscape &amp; flight telemetry</span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <button
          onClick={handleEnable}
          style={{
            background: 'linear-gradient(135deg, #FFC857 0%, #FF6B4A 100%)',
            border: 'none',
            borderRadius: '16px',
            padding: '6px 14px',
            color: '#05060F',
            fontWeight: 700,
            cursor: 'pointer',
            fontSize: '0.74rem',
            boxShadow: '0 0 12px rgba(255, 200, 87, 0.4)'
          }}
        >
          Enable Sound 🔊
        </button>

        <button
          onClick={handleDismiss}
          aria-label="Dismiss audio prompt"
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--asteroid-gray)',
            cursor: 'pointer',
            fontSize: '0.82rem',
            padding: '4px 6px'
          }}
        >
          ✕
        </button>
      </div>

      <style>{`
        @keyframes fadeInPrompt {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
