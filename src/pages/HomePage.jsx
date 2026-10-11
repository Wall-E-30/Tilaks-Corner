import { useState, useEffect } from 'react';
import { sound } from '../utils/audioEngine';
import Cosmos3DScene from '../components/Cosmos3DScene';
import CelestialSystem from '../components/CelestialSystem';
import { ASTRONAUT_PROFILE } from '../utils/mindverseData';

export default function HomePage({
  onSelectProject,
  onHoverPlanet,
  onNavigate,
  onStartQuickTour
}) {
  // Default to accessible 2D list if user prefers reduced motion
  const [stageView, setStageView] = useState(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return 'list';
    }
    return '3d';
  });
  const [hudCollapsed, setHudCollapsed] = useState(false);

  return (
    <div
      style={{
        position: 'relative',
        width: '100vw',
        height: 'calc(100vh - 64px)',
        marginTop: '64px',
        overflow: 'hidden',
        background: '#05060F'
      }}
    >
      {/* 1. Full-Screen 3D Cosmos Stage or Accessible List View */}
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

      {/* 2. Floating Glass HUD Card (Top-Left) */}
      <aside
        aria-label="Commander Tilak Introduction HUD"
        style={{
          position: 'absolute',
          top: '24px',
          left: '24px',
          zIndex: 20,
          maxWidth: hudCollapsed ? 'auto' : '460px',
          background: 'rgba(5, 6, 15, 0.82)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid rgba(255, 200, 87, 0.35)',
          boxShadow: '0 12px 40px rgba(0, 0, 0, 0.7), 0 0 20px rgba(255, 200, 87, 0.15)',
          borderRadius: '12px',
          padding: hudCollapsed ? '8px 14px' : '22px 24px',
          fontFamily: 'var(--font-body)',
          transition: 'all 240ms ease'
        }}
      >
        {/* Header Strip with Minimize Toggle */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: hudCollapsed ? '0' : '12px', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#2DE2C6', boxShadow: '0 0 8px #2DE2C6' }} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--stardust-gold)', letterSpacing: '0.1em' }}>
              ONLINE // {ASTRONAUT_PROFILE.homeBase}
            </span>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              setHudCollapsed(!hudCollapsed);
            }}
            title={hudCollapsed ? "Expand HUD" : "Minimize HUD to view pure 3D cosmos"}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--asteroid-gray)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              cursor: 'pointer',
              padding: '2px 6px'
            }}
          >
            {hudCollapsed ? '[+] Expand HUD' : '[-] Hide HUD'}
          </button>
        </div>

        {/* Expanded Content */}
        {!hudCollapsed && (
          <>
            <h1
              className="font-display"
              style={{
                fontSize: 'clamp(1.8rem, 3.5vw, 2.4rem)',
                fontWeight: 800,
                lineHeight: 1.15,
                color: 'var(--text-primary)',
                marginBottom: '8px'
              }}
            >
              Hi, I am <span style={{ color: 'var(--stardust-gold)' }}>Tilak</span>.
            </h1>

            <p style={{ fontSize: '0.92rem', color: 'var(--moonlight)', lineHeight: 1.5, marginBottom: '18px' }}>
              Welcome to the universe inside my mind. An explorable 3D cosmos where projects are planets, ideas are moons, and best work is a constellation.
            </p>

            {/* Quick Action Buttons */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '16px' }}>
              <button
                onClick={() => {
                  sound.playClick();
                  onNavigate('fast-lane');
                }}
                className="btn-fast-lane"
                style={{ padding: '7px 14px', fontSize: '0.76rem' }}
                title="Direct 1-click recruiter view with resume & outcomes"
              >
                ⚡ Fast Lane (Recruiter)
              </button>

              <a
                href="/resume.pdf"
                download="Tilak-Resume.pdf"
                onClick={() => sound.playClick()}
                className="btn-cosmic"
                style={{ padding: '7px 14px', fontSize: '0.76rem', textDecoration: 'none' }}
                title="Download Tilak's PDF Resume"
              >
                Resume.pdf ↓
              </a>

              <button
                onClick={() => {
                  sound.playClick();
                  onStartQuickTour();
                }}
                className="btn-secondary"
                style={{ padding: '7px 12px', fontSize: '0.76rem' }}
                title="60-second guided tour"
              >
                ⏱️ Quick Tour
              </button>
            </div>

            {/* View Mode Switcher */}
            <div style={{ borderTop: '1px solid rgba(138, 143, 176, 0.2)', paddingTop: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--asteroid-gray)' }}>
                VIEW MODE:
              </span>
              <div style={{ display: 'flex', gap: '6px' }}>
                <button
                  onClick={() => {
                    sound.playClick();
                    setStageView('3d');
                  }}
                  style={{
                    background: stageView === '3d' ? 'var(--stardust-gold)' : 'rgba(255, 255, 255, 0.05)',
                    color: stageView === '3d' ? '#05060F' : 'var(--text-secondary)',
                    border: '1px solid rgba(138, 143, 176, 0.25)',
                    padding: '3px 8px',
                    borderRadius: '4px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  🌌 3D Space
                </button>
                <button
                  onClick={() => {
                    sound.playClick();
                    setStageView('list');
                  }}
                  style={{
                    background: stageView === 'list' ? 'var(--stardust-gold)' : 'rgba(255, 255, 255, 0.05)',
                    color: stageView === 'list' ? '#05060F' : 'var(--text-secondary)',
                    border: '1px solid rgba(138, 143, 176, 0.25)',
                    padding: '3px 8px',
                    borderRadius: '4px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  📋 List
                </button>
              </div>
            </div>
          </>
        )}
      </aside>

      {/* 3. Floating Bottom Celestial Shortcuts Strip */}
      <nav
        aria-label="Celestial Sector Shortcuts"
        style={{
          position: 'absolute',
          bottom: '20px',
          left: '24px',
          zIndex: 15,
          display: 'flex',
          flexWrap: 'wrap',
          gap: '8px'
        }}
        className="hud-celestial-strip"
      >
        <button
          onClick={() => {
            sound.playClick();
            onNavigate('constellation');
          }}
          className="btn-secondary"
          style={{ padding: '6px 12px', fontSize: '0.74rem', background: 'rgba(5, 6, 15, 0.85)', backdropFilter: 'blur(10px)' }}
        >
          ★ Constellation
        </button>
        <button
          onClick={() => {
            sound.playClick();
            onNavigate('skills');
          }}
          className="btn-secondary"
          style={{ padding: '6px 12px', fontSize: '0.74rem', background: 'rgba(5, 6, 15, 0.85)', backdropFilter: 'blur(10px)' }}
        >
          ⚙ Cockpit
        </button>
        <button
          onClick={() => {
            sound.playClick();
            onNavigate('lab');
          }}
          className="btn-secondary"
          style={{ padding: '6px 12px', fontSize: '0.74rem', background: 'rgba(5, 6, 15, 0.85)', backdropFilter: 'blur(10px)' }}
        >
          🧪 Lab &amp; Moon
        </button>
        <button
          onClick={() => {
            sound.playClick();
            onNavigate('curiosity');
          }}
          className="btn-secondary"
          style={{ padding: '6px 12px', fontSize: '0.74rem', background: 'rgba(5, 6, 15, 0.85)', backdropFilter: 'blur(10px)' }}
        >
          🌀 Black Hole
        </button>
      </nav>

      {/* Floating Mobile 2D/3D View Switcher (< 768px viewports) */}
      <div className="mobile-view-toggle-container">
        <button
          onClick={() => {
            sound.playClick();
            setStageView(prev => prev === '3d' ? 'list' : '3d');
          }}
          className="btn-cosmic mobile-view-toggle-btn"
          aria-label={stageView === '3d' ? 'Switch to Accessible 2D List View' : 'Switch to 3D Space View'}
          style={{
            padding: '10px 20px',
            fontSize: '0.8rem',
            borderRadius: '24px',
            boxShadow: '0 8px 24px rgba(0,0,0,0.6)',
            letterSpacing: '0.04em'
          }}
        >
          {stageView === '3d' ? '📋 Switch to 2D List' : '🌌 Switch to 3D Space'}
        </button>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .mobile-view-toggle-container {
            display: none !important;
          }
        }
        @media (max-width: 767px) {
          .mobile-view-toggle-container {
            position: absolute;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            z-index: 50;
            display: flex !important;
          }
        }
        @media (max-width: 640px) {
          .hud-celestial-strip {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}
