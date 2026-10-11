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
      setTimeUtc(`${hrs}:${mins}:${secs}`);
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

  // Primary desktop navigation clusters
  const primaryClusters = [
    {
      id: 'home',
      label: 'Orbit',
      isActive: (page) => page === 'home'
    },
    {
      id: 'projects',
      label: 'Projects',
      isActive: (page) => page === 'projects' || page.startsWith('project-') || page === 'constellation'
    },
    {
      id: 'lab',
      label: 'Labs',
      isActive: (page) => page === 'lab' || page === 'curiosity' || page === 'orbit'
    },
    {
      id: 'about',
      label: 'Commander',
      isActive: (page) => page === 'about' || page === 'skills'
    },
    {
      id: 'contact',
      label: 'Transmission',
      isActive: (page) => page === 'contact' || page === 'secret-signal'
    }
  ];

  // Detailed mobile drawer navigation links
  const mobileNavLinks = [
    { id: 'home', label: 'Orbit Launchpad', subtitle: 'System Core' },
    { id: 'projects', label: 'Planetary Projects', subtitle: '4 Flagship Case Studies' },
    { id: 'constellation', label: 'Constellation Chart', subtitle: 'Best Work Map' },
    { id: 'about', label: 'Commander Profile', subtitle: 'Mission History' },
    { id: 'skills', label: 'Cockpit Telemetry', subtitle: 'Skills Engine' },
    { id: 'lab', label: 'Planet of Experiments', subtitle: 'Prototypes & Labs' },
    { id: 'curiosity', label: 'Black Hole', subtitle: 'Radar & Curiosities' },
    { id: 'orbit', label: 'Orbit Ambitions', subtitle: 'Future Ambitions' },
    { id: 'contact', label: 'Subspace Radio', subtitle: 'Direct Transmission' }
  ];

  return (
    <>
      {/* Top Persistent HUD Mission Bar — Floating Glass Aesthetic */}
      <header
        role="banner"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '60px',
          background: 'rgba(5, 6, 15, 0.72)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow: '0 4px 30px rgba(0, 0, 0, 0.45)',
          zIndex: 900,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 24px'
        }}
      >
        {/* Left: Brand Identity & Subtle Telemetry */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
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
            {/* Glowing Stellar Orb */}
            <div
              style={{
                width: '30px',
                height: '30px',
                borderRadius: '50%',
                background: 'radial-gradient(circle at 35% 35%, #FFC857 0%, #FF6B4A 60%, #7A3FB8 100%)',
                boxShadow: '0 0 16px rgba(255, 200, 87, 0.45)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                flexShrink: 0
              }}
            >
              <div
                style={{
                  width: '9px',
                  height: '9px',
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
                  fontSize: '0.98rem',
                  fontWeight: 800,
                  letterSpacing: '0.05em',
                  color: 'var(--text-primary)',
                  lineHeight: 1.15
                }}
              >
                THE MINDVERSE
              </div>
              <div
                style={{
                  fontSize: '0.64rem',
                  fontFamily: 'var(--font-mono)',
                  letterSpacing: '0.1em',
                  color: 'var(--asteroid-gray)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  marginTop: '1px'
                }}
              >
                <span style={{ color: 'var(--stardust-gold)' }}>TILAK // CDR</span>
                <span style={{ opacity: 0.35 }}>•</span>
                <span className="hud-utc-telemetry">UTC {timeUtc}</span>
              </div>
            </div>
          </button>
        </div>

        {/* Center: Primary Navigation Clusters in Floating Frosted Pill */}
        <nav
          role="navigation"
          aria-label="Mission Navigation"
          className="desktop-nav-container"
          style={{
            display: 'none',
            alignItems: 'center',
            background: 'rgba(11, 13, 36, 0.65)',
            border: '1px solid rgba(138, 143, 176, 0.16)',
            borderRadius: '9999px',
            padding: '3px 5px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.08)'
          }}
        >
          {primaryClusters.map((cluster) => {
            const active = cluster.isActive(currentPage);
            return (
              <button
                key={cluster.id}
                onClick={() => {
                  sound.playClick();
                  onNavigate(cluster.id);
                }}
                onMouseEnter={() => sound.playHover()}
                style={{
                  background: active ? 'rgba(255, 255, 255, 0.09)' : 'transparent',
                  border: active ? '1px solid rgba(255, 200, 87, 0.35)' : '1px solid transparent',
                  color: active ? 'var(--stardust-gold)' : 'var(--asteroid-gray)',
                  padding: '5px 15px',
                  borderRadius: '9999px',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.84rem',
                  fontWeight: active ? 600 : 500,
                  letterSpacing: '0.01em',
                  cursor: 'pointer',
                  transition: 'all 180ms cubic-bezier(0.16, 1, 0.3, 1)',
                  boxShadow: active ? '0 2px 10px rgba(255, 200, 87, 0.15)' : 'none'
                }}
              >
                {cluster.label}
              </button>
            );
          })}
        </nav>

        {/* Right: Unified Recruiter Capsule & Controls Dock */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {/* Unified Recruiter Capsule: Fast Lane + Resume */}
          <div
            className="unified-recruiter-capsule"
            style={{
              display: 'flex',
              alignItems: 'center',
              background: 'rgba(255, 255, 255, 0.035)',
              border: '1px solid rgba(255, 200, 87, 0.28)',
              borderRadius: '9999px',
              padding: '3px',
              boxShadow: '0 2px 12px rgba(0, 0, 0, 0.35)'
            }}
          >
            {/* Fast Lane Primary Button */}
            <button
              onClick={() => {
                sound.playClick();
                onNavigate('fast-lane');
              }}
              onMouseEnter={() => sound.playHover()}
              title="Fast Lane: Clean, text-first recruiter view"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '5px 12px',
                background: 'linear-gradient(135deg, #FF6B4A 0%, #FF856A 100%)',
                color: '#05060F',
                border: 'none',
                borderRadius: '9999px',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.74rem',
                fontWeight: 700,
                letterSpacing: '0.05em',
                cursor: 'pointer',
                transition: 'all 160ms ease',
                boxShadow: '0 2px 8px rgba(255, 107, 74, 0.35)'
              }}
            >
              {/* Lightning SVG */}
              <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
              </svg>
              <span>FAST LANE</span>
            </button>

            {/* Subtle Divider */}
            <div
              style={{
                width: '1px',
                height: '16px',
                background: 'rgba(255, 200, 87, 0.25)',
                margin: '0 3px'
              }}
            />

            {/* 1-Click Resume Download */}
            <a
              href="/resume.pdf"
              download="Tilak-Resume.pdf"
              title="Direct PDF Resume Download"
              onClick={() => sound.playClick()}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                padding: '5px 11px',
                color: 'var(--stardust-gold)',
                textDecoration: 'none',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.74rem',
                fontWeight: 600,
                letterSpacing: '0.04em',
                borderRadius: '9999px',
                transition: 'all 160ms ease'
              }}
            >
              <span>RESUME</span>
              {/* Download Arrow SVG */}
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
            </a>
          </div>

          {/* Unified Controls Capsule: Star Counter + Audio + Theme */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              background: 'rgba(11, 13, 36, 0.65)',
              border: '1px solid rgba(138, 143, 176, 0.18)',
              borderRadius: '9999px',
              padding: '2px 4px',
              boxShadow: '0 2px 10px rgba(0, 0, 0, 0.3)'
            }}
          >
            {/* Live Star Counter / Secret Clearance Badge */}
            <button
              onClick={() => {
                sound.playClick();
                if (caughtStarsCount >= 10) {
                  onNavigate('secret-signal');
                }
              }}
              title={caughtStarsCount >= 10 ? 'Deep Space Clearance Active! Click to warp to Secret Signal' : `${caughtStarsCount}/10 Shooting Stars caught`}
              aria-label={`Shooting stars caught: ${caughtStarsCount} of 10`}
              className="hud-star-counter"
              style={{
                background: caughtStarsCount >= 10 ? 'rgba(255, 200, 87, 0.18)' : 'transparent',
                border: 'none',
                color: caughtStarsCount >= 10 ? 'var(--stardust-gold)' : 'var(--asteroid-gray)',
                borderRadius: '9999px',
                padding: '4px 8px',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.72rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                cursor: caughtStarsCount >= 10 ? 'pointer' : 'default',
                transition: 'all 160ms ease'
              }}
            >
              {/* Star SVG */}
              <svg width="11" height="11" viewBox="0 0 24 24" fill={caughtStarsCount > 0 ? '#FFC857' : 'currentColor'}>
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
              <span>{caughtStarsCount}/10</span>
              {caughtStarsCount >= 10 && (
                <span style={{ fontSize: '0.6rem', background: 'var(--stardust-gold)', color: '#05060F', padding: '1px 4px', borderRadius: '4px', fontWeight: 700 }}>
                  KEY
                </span>
              )}
            </button>

            {/* Subtle Divider */}
            <div style={{ width: '1px', height: '14px', background: 'rgba(138, 143, 176, 0.18)', margin: '0 2px' }} />

            {/* Audio Toggle (Crisp SVG Icon) */}
            <button
              onClick={() => onToggleSound()}
              title={soundActive ? 'Sound On (Web Audio Active)' : 'Sound Off (Click to activate audio)'}
              aria-label="Toggle Sound"
              className="hud-icon-btn"
              style={{
                background: soundActive ? 'rgba(45, 226, 198, 0.12)' : 'transparent',
                border: 'none',
                color: soundActive ? 'var(--aurora-teal)' : 'var(--asteroid-gray)',
                borderRadius: '50%',
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 160ms ease'
              }}
            >
              {soundActive ? (
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                  <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                </svg>
              ) : (
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                  <line x1="23" y1="9" x2="17" y2="15" />
                  <line x1="17" y1="9" x2="23" y2="15" />
                </svg>
              )}
            </button>

            {/* Theme Toggle (Crisp Celestial SVG Icon) */}
            <button
              onClick={() => {
                sound.playClick();
                onToggleTheme();
              }}
              title={theme === 'eclipse' ? 'Return to Deep Void Mode' : 'Switch to Solar Eclipse Mode'}
              aria-label="Toggle Theme"
              className="hud-icon-btn"
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--asteroid-gray)',
                borderRadius: '50%',
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 160ms ease'
              }}
            >
              {theme === 'eclipse' ? (
                /* Crescent Moon SVG */
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              ) : (
                /* Celestial Sun SVG */
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="5" />
                  <line x1="12" y1="1" x2="12" y2="3" />
                  <line x1="12" y1="21" x2="12" y2="23" />
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                  <line x1="1" y1="12" x2="3" y2="12" />
                  <line x1="21" y1="12" x2="23" y2="12" />
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                </svg>
              )}
            </button>
          </div>

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
              border: '1px solid rgba(138, 143, 176, 0.25)',
              color: 'var(--text-primary)',
              borderRadius: '8px',
              width: '40px',
              height: '40px',
              minWidth: '40px',
              minHeight: '40px',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            {mobileMenuOpen ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu — High-Craft Frosted Glass Overlay */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-drawer"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation Drawer"
          style={{
            position: 'fixed',
            top: '60px',
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(5, 6, 15, 0.95)',
            backdropFilter: 'blur(24px)',
            zIndex: 899,
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            overflowY: 'auto'
          }}
        >
          <div
            style={{
              color: 'var(--asteroid-gray)',
              fontSize: '0.72rem',
              fontFamily: 'var(--font-mono)',
              letterSpacing: '0.12em',
              marginBottom: '6px'
            }}
          >
            CELESTIAL SECTORS:
          </div>

          {mobileNavLinks.map((link) => {
            const active = currentPage === link.id || (link.id === 'projects' && currentPage.startsWith('project-'));
            return (
              <button
                key={link.id}
                onClick={() => {
                  sound.playClick();
                  setMobileMenuOpen(false);
                  onNavigate(link.id);
                }}
                style={{
                  background: active ? 'rgba(255, 200, 87, 0.12)' : 'rgba(11, 13, 36, 0.65)',
                  border: active ? '1px solid rgba(255, 200, 87, 0.4)' : '1px solid rgba(138, 143, 176, 0.16)',
                  color: active ? 'var(--stardust-gold)' : 'var(--text-primary)',
                  padding: '12px 18px',
                  minHeight: '48px',
                  borderRadius: '10px',
                  textAlign: 'left',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  cursor: 'pointer',
                  transition: 'all 160ms ease'
                }}
              >
                <span style={{ fontSize: '0.95rem', fontWeight: 600, fontFamily: 'var(--font-body)' }}>{link.label}</span>
                <span style={{ fontSize: '0.72rem', color: 'var(--asteroid-gray)', fontFamily: 'var(--font-mono)' }}>{link.subtitle}</span>
              </button>
            );
          })}

          <div style={{ marginTop: '14px', display: 'flex', gap: '10px' }}>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigate('fast-lane');
              }}
              style={{
                flex: 1,
                minHeight: '44px',
                background: 'linear-gradient(135deg, #FF6B4A 0%, #FF856A 100%)',
                color: '#05060F',
                border: 'none',
                borderRadius: '8px',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8rem',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px'
              }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
              </svg>
              Fast Lane
            </button>
            <a
              href="/resume.pdf"
              download="Tilak-Resume.pdf"
              style={{
                flex: 1,
                minHeight: '44px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 200, 87, 0.3)',
                color: 'var(--stardust-gold)',
                borderRadius: '8px',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8rem',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                textDecoration: 'none'
              }}
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
          width: '120px',
          height: '120px',
          background: 'rgba(5, 6, 15, 0.75)',
          border: '1px solid rgba(138, 143, 176, 0.25)',
          borderRadius: '50%',
          backdropFilter: 'blur(12px)',
          zIndex: 850,
          pointerEvents: 'none',
          boxShadow: '0 0 24px rgba(0, 0, 0, 0.6)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden'
        }}
        className="hud-radar-minimap"
      >
        {/* Radar concentric sweep rings */}
        <div style={{ position: 'absolute', width: '36px', height: '36px', border: '1px dashed rgba(76, 201, 240, 0.25)', borderRadius: '50%' }} />
        <div style={{ position: 'absolute', width: '74px', height: '74px', border: '1px solid rgba(138, 143, 176, 0.16)', borderRadius: '50%' }} />
        <div style={{ position: 'absolute', width: '108px', height: '108px', border: '1px dashed rgba(122, 63, 184, 0.18)', borderRadius: '50%' }} />

        {/* Center Sun */}
        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#FFC857', boxShadow: '0 0 8px #FFC857', zIndex: 2 }} />

        {/* Orbiting planet dots on minimap */}
        <div style={{ position: 'absolute', top: '26px', left: '32px', width: '4px', height: '4px', borderRadius: '50%', background: '#4CC9F0', boxShadow: '0 0 5px #4CC9F0' }} />
        <div style={{ position: 'absolute', top: '70px', left: '20px', width: '5px', height: '5px', borderRadius: '50%', background: '#FF6B4A', boxShadow: '0 0 5px #FF6B4A' }} />
        <div style={{ position: 'absolute', top: '85px', right: '32px', width: '4px', height: '4px', borderRadius: '50%', background: '#7A3FB8', boxShadow: '0 0 5px #7A3FB8' }} />
        <div style={{ position: 'absolute', top: '34px', right: '26px', width: '4px', height: '4px', borderRadius: '50%', background: '#2DE2C6', boxShadow: '0 0 5px #2DE2C6' }} />

        {/* Rotating radar line */}
        <div
          style={{
            position: 'absolute',
            width: '60px',
            height: '1px',
            background: 'linear-gradient(90deg, rgba(45, 226, 198, 0.8), transparent)',
            transformOrigin: 'left center',
            left: '60px',
            top: '59px',
            animation: 'radarSpin 4s linear infinite'
          }}
        />

        {/* Bottom Tag */}
        <div
          style={{
            position: 'absolute',
            bottom: '7px',
            fontSize: '0.52rem',
            fontFamily: 'var(--font-mono)',
            color: 'var(--stardust-gold)',
            letterSpacing: '0.1em'
          }}
        >
          RADAR ACTIVE
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
            background: caughtStarsCount >= 10 ? 'rgba(45, 226, 198, 0.22)' : 'rgba(11, 13, 36, 0.85)',
            border: caughtStarsCount >= 10 ? '1px solid var(--aurora-teal)' : '1px solid rgba(138, 143, 176, 0.25)',
            borderRadius: '9999px',
            padding: '6px 14px',
            color: caughtStarsCount >= 10 ? 'var(--aurora-teal)' : 'var(--stardust-gold)',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.72rem',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            cursor: caughtStarsCount >= 10 ? 'pointer' : 'default',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.4)'
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
        @media (min-width: 960px) {
          .desktop-nav-container {
            display: flex !important;
          }
        }
        @media (max-width: 959px) {
          .mobile-menu-btn {
            display: flex !important;
          }
          .hud-utc-telemetry {
            display: none !important;
          }
          .hud-radar-minimap {
            display: none !important;
          }
        }
        @media (max-width: 640px) {
          header {
            padding: 0 14px !important;
          }
          .unified-recruiter-capsule {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
}
