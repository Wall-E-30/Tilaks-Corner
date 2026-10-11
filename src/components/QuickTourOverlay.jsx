import { useState, useEffect } from 'react';
import { sound } from '../utils/audioEngine';

export default function QuickTourOverlay({ onNavigate, onComplete }) {
  const [currentStep, setCurrentStep] = useState(0);

  const tourSteps = [
    {
      page: 'project-pratyaksha',
      title: 'Stop 1 of 4: Flagship Planet (PRATYAKSHA)',
      content: 'Winner of Aetrix 2026. A satellite environmental intelligence platform analyzing raster telemetry in under 250ms for municipal governance.',
      cta: 'Next Stop: The Constellation →'
    },
    {
      page: 'constellation',
      title: 'Stop 2 of 4: Constellation of Best Work',
      content: 'An interconnected stellar map linking Tilak\'s flagship achievements across software engineering, AI, and creative technology.',
      cta: 'Next Stop: The Cockpit →'
    },
    {
      page: 'skills',
      title: 'Stop 3 of 4: The Cockpit (Skills & Systems)',
      content: 'Honest thrust meters measuring daily-use propulsion (React, Python, SQL) and active learning horizons without fake percentages.',
      cta: 'Final Stop: Radio Transmission →'
    },
    {
      page: 'contact',
      title: 'Stop 4 of 4: Transmission Radio (Contact)',
      content: 'Tune into Tilak\'s broadcast frequency to transmit summer internship inquiries or collaboration signals. Reaches Earth in 0.0s!',
      cta: 'Finish Tour 🚀'
    }
  ];

  const step = tourSteps[currentStep];

  useEffect(() => {
    // Navigate automatically to current step page
    if (step.page === 'project-pratyaksha') {
      onNavigate('project-pratyaksha');
    } else {
      onNavigate(step.page);
    }
  }, [currentStep]);

  const handleNext = () => {
    sound.playClick();
    if (currentStep < tourSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const handleSkip = () => {
    sound.playClick();
    onComplete();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Guided Cosmic Quick Tour"
      style={{
        position: 'fixed',
        bottom: '24px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 960,
        width: '92%',
        maxWidth: '560px',
        background: 'rgba(5, 6, 15, 0.95)',
        border: '2px solid var(--stardust-gold)',
        boxShadow: '0 12px 50px rgba(0, 0, 0, 0.8), 0 0 30px rgba(255, 200, 87, 0.3)',
        borderRadius: '12px',
        padding: '20px 24px',
        fontFamily: 'var(--font-mono)',
        animation: 'fadeInTour 300ms ease-out'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '1.2rem' }}>🚀</span>
          <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--stardust-gold)', letterSpacing: '0.1em' }}>
            ASTRONAUT GUIDED QUICK TOUR
          </span>
        </div>

        <button
          onClick={handleSkip}
          aria-label="Skip guided tour"
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--asteroid-gray)',
            cursor: 'pointer',
            fontSize: '0.75rem',
            fontFamily: 'var(--font-mono)'
          }}
        >
          [ESC] Skip Tour ✕
        </button>
      </div>

      <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '6px' }}>
        {step.title}
      </div>

      <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.92rem', color: 'var(--moonlight)', lineHeight: 1.5, marginBottom: '16px' }}>
        {step.content}
      </p>

      {/* Progress Dots & Navigation */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: '8px' }}>
          {tourSteps.map((_, i) => (
            <div
              key={i}
              style={{
                width: i === currentStep ? '20px' : '8px',
                height: '8px',
                borderRadius: '4px',
                background: i === currentStep ? 'var(--stardust-gold)' : 'rgba(138, 143, 176, 0.3)',
                transition: 'all 200ms ease'
              }}
            />
          ))}
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={handleNext}
            className="btn-cosmic"
            style={{ padding: '8px 16px', fontSize: '0.78rem' }}
          >
            {step.cta}
          </button>
        </div>
      </div>

      <style>{`
        @keyframes fadeInTour {
          from { opacity: 0; transform: translate(-50%, 15px); }
          to { opacity: 1; transform: translate(-50%, 0); }
        }
      `}</style>
    </div>
  );
}
