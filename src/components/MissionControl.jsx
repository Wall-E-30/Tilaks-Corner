import { useState, useEffect } from 'react';
import { sound } from '../utils/audioEngine';

export default function MissionControl({
  currentPage,
  onNavigate,
  theme,
  onToggleTheme,
  soundActive,
  onToggleSound,
  caughtStarsCount = 0
}) {
  const [timeUtc, setTimeUtc] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const d = new Date();
      const hrs = String(d.getUTCHours()).padStart(2, '0');
      const mins = String(d.getUTCMinutes()).padStart(2, '0');
      const secs = String(d.getUTCSeconds()).padStart(2, '0');
      setTimeUtc(`UTC ${hrs}:${mins}:${secs}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Close mobile drawer on Escape key (WCAG 2.2 AA compliance)
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const navLinks = [
    { id: 'home', label: 'Orbit', subtitle: 'System Core' },
    { id: 'projects', label: 'Planets', subtitle: 'Work' },
    { id: 'constellation', label: 'Constellation', subtitle: 'Best' },
    { id: 'about', label: 'Profile', subtitle: 'Commander' },
    { id: 'skills', label: 'Cockpit', subtitle: 'Tech' },
    { id: 'lab', label: 'Lab & Moon', subtitle: 'Ideas' },
    { id: 'curiosity', label: 'Black Hole', subtitle: 'Radar' },
    { id: 'contact', label: 'Transmission', subtitle: 'Radio' },
  ];

  return (
    <>
      {/* Top Persistent HUD Mission Bar */}
      <header
        role="banner"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '64px',
          background: 'rgba(5, 6, 15, 0.82)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderBottom: '1px solid rgba(138, 143, 176, 0.2)',
          zIndex: 900,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 24px',
          fontFamily: 'var(--font-mono)'
        }}
      >
        {/* Left: Brand Identity & Telemetry */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <button
            onClick={() => {
              sound.playClick();
              onNavigate('home');
            }}
            aria-label="Return to Launch Pad Orbit"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: 0,
              textAlign: 'left'
            }}
          >
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: 'radial-gradient(circle at 35% 35%, #FFC857 0%, #FF6B4A 60%, #7A3FB8 100%)',
                boxShadow: '0 0 14px rgba(255, 200, 87, 0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative'
              }}
            >
              <div
                style={{
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  background: '#EDEBFA',
                  boxShadow: '0 0 6px #fff'
                }}
              />
            </div>
            <div>
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.05rem',
                  fontWeight: 800,
                  letterSpacing: '0.04em',
                  color: 'var(--text-primary)'
                }}
              >
                THE MINDVERSE
              </div>
              <div
                style={{
                  fontSize: '0.65rem',
                  letterSpacing: '0.12em',
                  color: 'var(--stardust-gold)',
                  opacity: 0.9
                }}
              >
                TILAK // COMMANDER
              </div>
            </div>
          </button>

          {/* Time Telemetry (Hidden on small mobile) */}
          <div
            className="hud-telemetry-badge"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '0.72rem',
              color: 'var(--asteroid-gray)',
              padding: '4px 10px',
              background: 'rgba(11, 13, 36, 0.7)',
              borderRadius: '4px',
              border: '1px solid rgba(138, 143, 176, 0.15)'
            }}
          >
            <span
              style={{
                display: 'inline-block',
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: '#2DE2C6',
                boxShadow: '0 0 6px #2DE2C6'
              }}
            />
            <span>{timeUtc || 'UTC --:--:--'}</span>
          </div>
        </div>

        {/* Center: Desktop Navigation Links */}
        <nav
          role="navigation"
          aria-label="Mission Navigation"
          style={{
            display: 'none',
            alignItems: 'center',
            gap: '6px'
          }}
          className="desktop-nav-container"
        >
          {navLinks.map((link) => {
            const isActive = currentPage === link.id || (link.id === 'projects' && currentPage.startsWith('project-'));
            return (
              <button
                key={link.id}
                onClick={() => {
                  sound.playClick();
                  onNavigate(link.id);
                }}
                onMouseEnter={() => sound.playHover()}
                style={{
                  background: isActive ? 'rgba(122, 63, 184, 0.28)' : 'transparent',
                  border: isActive ? '1px solid var(--stardust-gold)' : '1px solid transparent',
                  color: isActive ? 'var(--stardust-gold)' : 'var(--text-primary)',
                  padding: '6px 14px',
                  borderRadius: '4px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.78rem',
                  letterSpacing: '0.06em',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  transition: 'all 160ms ease'
                }}
              >
                <span style={{ fontWeight: 700 }}>{link.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right: Fast Lane, Resume & HUD Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {/* 1-Click Fast Lane Button */}
          <button
            onClick={() => {
              sound.playClick();
              onNavigate('fast-lane');
            }}
            onMouseEnter={() => sound.playHover()}
            title="Fast Lane: Clean, text-first recruiter view"
            className="btn-fast-lane"
            style={{
              padding: '6px 14px',
              fontSize: '0.76rem',
              fontWeight: 800
            }}
          >
            ⚡ FAST LANE
          </button>

          {/* 1-Click Direct Resume Download */}
          <a
            href="/resume.pdf"
            download="Tilak-Resume.pdf"
            title="Direct PDF Resume Download"
            onClick={() => sound.playClick()}
            style={{
              textDecoration: 'none',
              padding: '6px 12px',
              fontSize: '0.75rem',
              fontFamily: 'var(--font-mono)',
              color: 'var(--stardust-gold)',
              border: '1px solid rgba(255, 200, 87, 0.4)',
              borderRadius: '4px',
              background: 'rgba(255, 200, 87, 0.08)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontWeight: 600,
              transition: 'all 160ms ease'
            }}
          >
            <span>RESUME</span>
            <span style={{ fontSize: '0.7rem' }}>↓</span>
          </a>

          {/* Sound Toggle (Opt-in) */}
          <button
            onClick={() => {
              onToggleSound();
            }}
            title={soundActive ? 'Sound On (Web Audio Synth Active)' : 'Sound Off (Click to activate audio)'}
            aria-label="Toggle Sound"
            style={{
              background: soundActive ? 'rgba(45, 226, 198, 0.16)' : 'rgba(255, 255, 255, 0.05)',
              border: soundActive ? '1px solid var(--aurora-teal)' : '1px solid rgba(138, 143, 176, 0.25)',
              color: soundActive ? 'var(--aurora-teal)' : 'var(--asteroid-gray)',
              borderRadius: '4px',
              width: '34px',
              height: '34px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              fontSize: '0.85rem'
            }}
          >
            {soundActive ? '🔊' : '🔇'}
          </button>

          {/* Eclipse Theme Toggle */}
          <button
            onClick={() => {
              sound.playClick();
              onToggleTheme();
            }}
            title={theme === 'eclipse' ? 'Return to Deep Void Dark Mode' : 'Switch to Solar Eclipse Light Mode'}
            aria-label="Toggle Theme"
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(138, 143, 176, 0.25)',
              color: 'var(--text-primary)',
              borderRadius: '4px',
              width: '34px',
              height: '34px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              fontSize: '0.85rem'
            }}
          >
            {theme === 'eclipse' ? '🌑' : '☀️'}
          </button>

          {/* Mobile Navigation Drawer Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav-drawer"
            className="mobile-menu-btn"
            style={{
              display: 'none',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(138, 143, 176, 0.3)',
              color: 'var(--text-primary)',
              borderRadius: '4px',
              width: '36px',
              height: '34px',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-drawer"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation Drawer"
          style={{
            position: 'fixed',
            top: '64px',
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(5, 6, 15, 0.96)',
            backdropFilter: 'blur(20px)',
            zIndex: 899,
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            fontFamily: 'var(--font-mono)'
          }}
        >
          <div style={{ color: 'var(--asteroid-gray)', fontSize: '0.75rem', letterSpacing: '0.1em', marginBottom: '8px' }}>
            SECTORS &amp; CELESTIAL STATIONS:
          </div>
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => {
                sound.playClick();
                setMobileMenuOpen(false);
                onNavigate(link.id);
              }}
              style={{
                background: currentPage === link.id ? 'rgba(122, 63, 184, 0.25)' : 'rgba(11, 13, 36, 0.6)',
                border: currentPage === link.id ? '1px solid var(--stardust-gold)' : '1px solid rgba(138, 143, 176, 0.2)',
                color: currentPage === link.id ? 'var(--stardust-gold)' : 'var(--text-primary)',
                padding: '12px 18px',
                borderRadius: '6px',
                textAlign: 'left',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                cursor: 'pointer'
              }}
            >
              <span style={{ fontSize: '1rem', fontWeight: 700 }}>{link.label}</span>
              <span style={{ fontSize: '0.75rem', color: 'var(--asteroid-gray)' }}>{link.subtitle}</span>
            </button>
          ))}
          <div style={{ marginTop: '16px', display: 'flex', gap: '12px' }}>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigate('fast-lane');
              }}
              className="btn-fast-lane"
              style={{ flex: 1 }}
            >
              ⚡ Fast Lane
            </button>
            <a
              href="/resume.pdf"
              download="Tilak-Resume.pdf"
              className="btn-secondary"
              style={{ flex: 1, textAlign: 'center', justifyContent: 'center' }}
            >
              Resume PDF ↓
            </a>
          </div>
        </div>
      )}

      {/* Floating Radar Minimap (Bottom-Right HUD Corner) */}
      <aside
        aria-label="Cosmic Minimap"
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          width: '130px',
          height: '130px',
          background: 'rgba(5, 6, 15, 0.78)',
          border: '1px solid rgba(138, 143, 176, 0.35)',
          borderRadius: '50%',
          backdropFilter: 'blur(10px)',
          zIndex: 850,
          pointerEvents: 'none',
          boxShadow: '0 0 20px rgba(0, 0, 0, 0.6)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden'
        }}
        className="hud-radar-minimap"
      >
        {/* Radar concentric sweep rings */}
        <div style={{ position: 'absolute', width: '38px', height: '38px', border: '1px dashed rgba(76, 201, 240, 0.3)', borderRadius: '50%' }} />
        <div style={{ position: 'absolute', width: '80px', height: '80px', border: '1px solid rgba(138, 143, 176, 0.2)', borderRadius: '50%' }} />
        <div style={{ position: 'absolute', width: '116px', height: '116px', border: '1px dashed rgba(122, 63, 184, 0.2)', borderRadius: '50%' }} />
        
        {/* Center Sun */}
        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#FFC857', boxShadow: '0 0 8px #FFC857', zIndex: 2 }} />

        {/* Orbiting planet dots on minimap */}
        <div style={{ position: 'absolute', top: '28px', left: '34px', width: '5px', height: '5px', borderRadius: '50%', background: '#4CC9F0', boxShadow: '0 0 5px #4CC9F0' }} title="Pratyaksha" />
        <div style={{ position: 'absolute', top: '75px', left: '22px', width: '6px', height: '6px', borderRadius: '50%', background: '#FF6B4A', boxShadow: '0 0 5px #FF6B4A' }} title="CashScript" />
        <div style={{ position: 'absolute', top: '92px', right: '35px', width: '5px', height: '5px', borderRadius: '50%', background: '#7A3FB8', boxShadow: '0 0 5px #7A3FB8' }} title="AI Engine" />
        <div style={{ position: 'absolute', top: '38px', right: '28px', width: '5px', height: '5px', borderRadius: '50%', background: '#2DE2C6', boxShadow: '0 0 5px #2DE2C6' }} title="Scrapbook" />

        {/* Rotating radar line */}
        <div
          style={{
            position: 'absolute',
            width: '65px',
            height: '1px',
            background: 'linear-gradient(90deg, rgba(45, 226, 198, 0.8), transparent)',
            transformOrigin: 'left center',
            left: '65px',
            top: '64px',
            animation: 'radarSpin 4s linear infinite'
          }}
        />

        {/* Bottom Tag */}
        <div
          style={{
            position: 'absolute',
            bottom: '8px',
            fontSize: '0.55rem',
            fontFamily: 'var(--font-mono)',
            color: 'var(--stardust-gold)',
            letterSpacing: '0.1em'
          }}
        >
          RADAR: ACTIVE
        </div>
      </aside>

      {/* Secret Signal Shortcut indicator if caught stars > 0 */}
      {caughtStarsCount > 0 && (
        <button
          onClick={() => {
            sound.playClick();
            if (caughtStarsCount >= 10) {
              onNavigate('secret-signal');
            }
          }}
          title={caughtStarsCount >= 10 ? 'Secret Signal Unlocked! Click to enter.' : `Stars caught: ${caughtStarsCount}/10`}
          style={{
            position: 'fixed',
            bottom: '24px',
            left: '24px',
            zIndex: 850,
            background: caughtStarsCount >= 10 ? 'rgba(45, 226, 198, 0.25)' : 'rgba(11, 13, 36, 0.85)',
            border: caughtStarsCount >= 10 ? '1px solid var(--aurora-teal)' : '1px solid rgba(138, 143, 176, 0.3)',
            borderRadius: '20px',
            padding: '6px 14px',
            color: caughtStarsCount >= 10 ? 'var(--aurora-teal)' : 'var(--stardust-gold)',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.72rem',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            cursor: caughtStarsCount >= 10 ? 'pointer' : 'default',
            boxShadow: '0 4px 16px rgba(0,0,0,0.4)'
          }}
        >
          <span>✦ STARS: {caughtStarsCount}/10</span>
          {caughtStarsCount >= 10 && <span style={{ fontWeight: 800 }}>[ENTER TRANSMISSION]</span>}
        </button>
      )}

      {/* Inline styles for responsive header */}
      <style>{`
        @keyframes radarSpin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @media (min-width: 1024px) {
          .desktop-nav-container {
            display: flex !important;
          }
        }
        @media (max-width: 1023px) {
          .mobile-menu-btn {
            display: flex !important;
          }
          .hud-telemetry-badge {
            display: none !important;
          }
          .hud-radar-minimap {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
}
