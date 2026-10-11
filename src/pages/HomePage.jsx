import { useState } from 'react';
import { sound } from '../utils/audioEngine';
import Cosmos3DScene from '../components/Cosmos3DScene';
import CelestialSystem from '../components/CelestialSystem';

export default function HomePage({
  onSelectProject,
  onHoverPlanet,
  onNavigate,
  onStartQuickTour
}) {
  // Default to interactive 3D Cosmos stage
  const [stageView, setStageView] = useState('3d');

  return (
    <div
      style={{
        position: 'relative',
        width: '100vw',
        height: 'calc(100vh - 60px)',
        marginTop: '60px',
        overflow: 'hidden',
        background: '#05060F'
      }}
    >
      {/* 1. Full-Screen 3D Cosmos Stage or Accessible 2D List View */}
      {stageView === '3d' ? (
        <div style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
          <Cosmos3DScene
            onSelectProject={onSelectProject}
            onHoverPlanet={onHoverPlanet}
          />
        </div>
      ) : (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 1,
            overflowY: 'auto',
            padding: '24px',
            background: 'rgba(5, 6, 15, 0.95)'
          }}
        >
          <div style={{ maxWidth: '1100px', margin: '0 auto', paddingTop: '20px' }}>
            <CelestialSystem
              onSelectProject={onSelectProject}
              onHoverPlanet={onHoverPlanet}
              onStartQuickTour={onStartQuickTour}
              onNavigate={onNavigate}
            />
          </div>
        </div>
      )}

      {/* 2. Sleek Floating Bottom Control Dock (View Switcher + Quick Tour) */}
      <div
        className="hud-bottom-dock"
        style={{
          position: 'absolute',
          bottom: '24px',
          left: '24px',
          zIndex: 20,
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}
      >
        {/* Unified View Mode Pill Switcher */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            background: 'rgba(11, 13, 36, 0.68)',
            border: '1px solid rgba(138, 143, 176, 0.2)',
            borderRadius: '9999px',
            padding: '3px',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.45)'
          }}
        >
          <button
            onClick={() => {
              sound.playClick();
              setStageView('3d');
            }}
            title="Switch to Interactive 3D Cosmos Orbit"
            aria-label="3D Cosmos View"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 14px',
              background: stageView === '3d' ? 'rgba(255, 200, 87, 0.15)' : 'transparent',
              border: stageView === '3d' ? '1px solid rgba(255, 200, 87, 0.4)' : '1px solid transparent',
              color: stageView === '3d' ? 'var(--stardust-gold)' : 'var(--asteroid-gray)',
              borderRadius: '9999px',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.74rem',
              fontWeight: stageView === '3d' ? 700 : 500,
              letterSpacing: '0.04em',
              cursor: 'pointer',
              transition: 'all 160ms ease',
              boxShadow: stageView === '3d' ? '0 2px 10px rgba(255, 200, 87, 0.18)' : 'none'
            }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <path d="M2 12h20" />
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
            <span>3D COSMOS</span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              setStageView('list');
            }}
            title="Switch to Accessible 2D Planetary Index"
            aria-label="Accessible 2D List View"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 14px',
              background: stageView === 'list' ? 'rgba(255, 200, 87, 0.15)' : 'transparent',
              border: stageView === 'list' ? '1px solid rgba(255, 200, 87, 0.4)' : '1px solid transparent',
              color: stageView === 'list' ? 'var(--stardust-gold)' : 'var(--asteroid-gray)',
              borderRadius: '9999px',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.74rem',
              fontWeight: stageView === 'list' ? 700 : 500,
              letterSpacing: '0.04em',
              cursor: 'pointer',
              transition: 'all 160ms ease',
              boxShadow: stageView === 'list' ? '0 2px 10px rgba(255, 200, 87, 0.18)' : 'none'
            }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="8" y1="6" x2="21" y2="6" />
              <line x1="8" y1="12" x2="21" y2="12" />
              <line x1="8" y1="18" x2="21" y2="18" />
              <line x1="3" y1="6" x2="3.01" y2="6" />
              <line x1="3" y1="12" x2="3.01" y2="12" />
              <line x1="3" y1="18" x2="3.01" y2="18" />
            </svg>
            <span>2D LIST</span>
          </button>
        </div>

        {/* 60s Guided Quick Tour Pill Button */}
        <button
          onClick={() => {
            sound.playClick();
            onStartQuickTour();
          }}
          title="Start 60-Second Guided Tour of Tilak's Mindverse"
          aria-label="Start Quick Tour"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '7px',
            padding: '7px 16px',
            background: 'rgba(11, 13, 36, 0.68)',
            border: '1px solid rgba(138, 143, 176, 0.2)',
            borderRadius: '9999px',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            color: 'var(--text-primary)',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.74rem',
            fontWeight: 600,
            letterSpacing: '0.04em',
            cursor: 'pointer',
            transition: 'all 160ms ease',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.45)'
          }}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--stardust-gold)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
          </svg>
          <span>QUICK TOUR</span>
        </button>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .hud-bottom-dock {
            bottom: 16px !important;
            left: 50% !important;
            transform: translateX(-50%) !important;
            width: max-content !important;
          }
        }
      `}</style>
    </div>
  );
}
