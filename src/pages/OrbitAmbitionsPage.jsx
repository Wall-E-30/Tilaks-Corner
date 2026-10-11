import { useState } from 'react';
import { sound } from '../utils/audioEngine';
import { ORBIT_AMBITIONS } from '../utils/mindverseData';
import SubpageAtmosphere from '../components/SubpageAtmosphere';
import {
  AsteroidPod,
  WhimsicalRocket,
  WhimsicalSatellite,
  WhimsicalUFO,
  WhimsicalAstronautFloating,
  WhimsicalAsteroid
} from '../components/CosmicWhimsyElements';

export default function OrbitAmbitionsPage({ onNavigate }) {
  const [activeRingIndex, setActiveRingIndex] = useState(0);

  const getRingColor = (idx) => {
    switch (idx) {
      case 0: return 'var(--aurora-teal)';
      case 1: return 'var(--stardust-gold)';
      case 2: return 'var(--solar-coral)';
      default: return 'var(--magenta-nova)';
    }
  };

  const getVehicleForRing = (idx) => {
    switch (idx) {
      case 0: return <WhimsicalRocket size={34} angle={-35} />;
      case 1: return <WhimsicalSatellite size={38} />;
      case 2: return <WhimsicalUFO size={36} />;
      default: return <WhimsicalAstronautFloating size={42} />;
    }
  };

  return (
    <SubpageAtmosphere
      nebulaColor1="rgba(27, 26, 85, 0.45)"
      nebulaColor2="rgba(255, 200, 87, 0.2)"
      accentGlow="rgba(45, 226, 198, 0.3)"
    >
      <div
        style={{
          maxWidth: '1120px',
          margin: '0 auto',
          padding: '100px 24px 80px 24px',
          fontFamily: 'var(--font-body)',
          position: 'relative'
        }}
      >
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '8px 20px',
              background: 'radial-gradient(circle, rgba(255, 200, 87, 0.14) 0%, rgba(11, 13, 36, 0.85) 100%)',
              border: '1.5px solid rgba(255, 200, 87, 0.4)',
              borderRadius: '26px 14px 24px 16px',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.74rem',
              color: 'var(--stardust-gold)',
              letterSpacing: '0.12em',
              marginBottom: '16px',
              boxShadow: '0 0 24px rgba(255, 200, 87, 0.16)'
            }}
          >
            <span
              style={{
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                background: 'var(--stardust-gold)',
                boxShadow: '0 0 10px var(--stardust-gold)'
              }}
            />
            FLIGHT TRAJECTORY // MULTI-ORBIT ASCENT PROTOCOL
          </div>

          <h1
            className="font-display"
            style={{
              fontSize: 'clamp(2.4rem, 5vw, 3.8rem)',
              fontWeight: 800,
              color: 'var(--text-primary)',
              letterSpacing: '-0.02em',
              textShadow: '0 0 32px rgba(255, 200, 87, 0.25)'
            }}
          >
            Orbit of Future Ambitions
          </h1>
          <p
            style={{
              color: 'var(--text-secondary)',
              maxWidth: '680px',
              margin: '14px auto 0 auto',
              fontSize: '1rem',
              lineHeight: 1.6
            }}
          >
            Concentric orbital paths tracking where Commander Tilak is steering: high-impact engineering, distributed systems architecture, and deep frontier horizons.
          </p>
        </div>

        {/* Centerpiece: Concentric Orbital Trajectory Fleet Map (Non-rectangular, pure celestial SVG) */}
        <div
          style={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '20px 0 46px 0',
            minHeight: '280px'
          }}
        >
          {/* Orbital Ellipses Canvas (Pure SVG) */}
          <svg
            width="100%"
            height="260"
            viewBox="0 0 800 260"
            fill="none"
            style={{ overflow: 'visible', maxWidth: '800px' }}
          >
            {/* Ambient Nebula Glow Behind Orbits */}
            <defs>
              <radialGradient id="orbitCenterGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#FFC857" stopOpacity="0.25" />
                <stop offset="50%" stopColor="#2DE2C6" stopOpacity="0.1" />
                <stop offset="100%" stopColor="transparent" stopOpacity="0" />
              </radialGradient>
            </defs>
            <ellipse cx="400" cy="130" rx="380" ry="110" fill="url(#orbitCenterGlow)" />

            {/* Orbit Ring 4: Deep Cosmos */}
            <ellipse
              cx="400"
              cy="130"
              rx="370"
              ry="105"
              stroke="var(--magenta-nova)"
              strokeWidth={activeRingIndex === 3 ? "2.5" : "1"}
              strokeDasharray="6 8"
              opacity={activeRingIndex === 3 ? 0.9 : 0.35}
            />

            {/* Orbit Ring 3: Interplanetary */}
            <ellipse
              cx="400"
              cy="130"
              rx="280"
              ry="80"
              stroke="var(--solar-coral)"
              strokeWidth={activeRingIndex === 2 ? "2.5" : "1"}
              strokeDasharray="5 7"
              opacity={activeRingIndex === 2 ? 0.9 : 0.4}
            />

            {/* Orbit Ring 2: Geostationary */}
            <ellipse
              cx="400"
              cy="130"
              rx="190"
              ry="55"
              stroke="var(--stardust-gold)"
              strokeWidth={activeRingIndex === 1 ? "2.5" : "1"}
              strokeDasharray="4 6"
              opacity={activeRingIndex === 1 ? 0.95 : 0.45}
            />

            {/* Orbit Ring 1: Low Earth Orbit */}
            <ellipse
              cx="400"
              cy="130"
              rx="110"
              ry="32"
              stroke="var(--aurora-teal)"
              strokeWidth={activeRingIndex === 0 ? "2.5" : "1.2"}
              strokeDasharray="3 5"
              opacity={activeRingIndex === 0 ? 1 : 0.55}
            />

            {/* Earth Core Beacon */}
            <circle cx="400" cy="130" r="20" fill="#0B0D24" stroke="var(--aurora-teal)" strokeWidth="2" />
            <circle cx="400" cy="130" r="14" fill="radial-gradient(circle, #2DE2C6 0%, #1B1A55 100%)" />
            <circle cx="400" cy="130" r="6" fill="#FFF" opacity="0.9" />
          </svg>

          {/* Floating Craft Positioning Over The SVG */}
          {/* LEO Rocket */}
          <div
            onClick={() => { sound.playClick(); setActiveRingIndex(0); }}
            style={{
              position: 'absolute',
              top: '100px',
              left: 'calc(50% + 75px)',
              cursor: 'pointer',
              filter: activeRingIndex === 0 ? 'drop-shadow(0 0 14px var(--aurora-teal))' : 'none',
              transform: activeRingIndex === 0 ? 'scale(1.15)' : 'scale(1)',
              transition: 'all 200ms ease'
            }}
          >
            <WhimsicalRocket size={34} angle={-45} />
          </div>

          {/* GEO Satellite */}
          <div
            onClick={() => { sound.playClick(); setActiveRingIndex(1); }}
            style={{
              position: 'absolute',
              top: '75px',
              left: 'calc(50% - 190px)',
              cursor: 'pointer',
              filter: activeRingIndex === 1 ? 'drop-shadow(0 0 14px var(--stardust-gold))' : 'none',
              transform: activeRingIndex === 1 ? 'scale(1.15)' : 'scale(1)',
              transition: 'all 200ms ease'
            }}
          >
            <WhimsicalSatellite size={42} />
          </div>

          {/* Interplanetary UFO */}
          <div
            onClick={() => { sound.playClick(); setActiveRingIndex(2); }}
            style={{
              position: 'absolute',
              bottom: '50px',
              left: 'calc(50% + 220px)',
              cursor: 'pointer',
              filter: activeRingIndex === 2 ? 'drop-shadow(0 0 14px var(--solar-coral))' : 'none',
              transform: activeRingIndex === 2 ? 'scale(1.15)' : 'scale(1)',
              transition: 'all 200ms ease'
            }}
          >
            <WhimsicalUFO size={44} />
          </div>

          {/* Deep Cosmos Spacewalker */}
          <div
            onClick={() => { sound.playClick(); setActiveRingIndex(3); }}
            style={{
              position: 'absolute',
              top: '30px',
              left: 'calc(50% + 310px)',
              cursor: 'pointer',
              filter: activeRingIndex === 3 ? 'drop-shadow(0 0 14px var(--magenta-nova))' : 'none',
              transform: activeRingIndex === 3 ? 'scale(1.15)' : 'scale(1)',
              transition: 'all 200ms ease'
            }}
          >
            <WhimsicalAstronautFloating size={48} />
          </div>

          {/* Orbital Filter Pills */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '10px',
              flexWrap: 'wrap',
              marginTop: '16px',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.74rem'
            }}
          >
            {ORBIT_AMBITIONS.map((ring, idx) => {
              const color = getRingColor(idx);
              const isSelected = activeRingIndex === idx;
              return (
                <button
                  key={idx}
                  onClick={() => {
                    sound.playClick();
                    setActiveRingIndex(idx);
                  }}
                  onMouseEnter={() => sound.playHover()}
                  style={{
                    color: isSelected ? '#05060F' : color,
                    background: isSelected ? color : `${color}14`,
                    padding: '8px 18px',
                    borderRadius: '24px',
                    border: `1.5px solid ${color}${isSelected ? 'ff' : '44'}`,
                    fontWeight: isSelected ? 700 : 500,
                    cursor: 'pointer',
                    boxShadow: isSelected ? `0 0 20px ${color}55` : 'none',
                    transition: 'all 200ms ease'
                  }}
                >
                  RING {idx + 1}: {ring.ring.toUpperCase()} ({ring.timeframe})
                </button>
              );
            })}
          </div>
        </div>

        {/* Ambitions Waypoint Pods (Organic, sculpted AsteroidPod with zero rectangular edges) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          {ORBIT_AMBITIONS.map((ring, idx) => {
            const ringColor = getRingColor(idx);
            const isHighlighted = activeRingIndex === idx;

            const radii = [
              '42px 20px 38px 22px',
              '22px 42px 20px 38px',
              '38px 18px 44px 20px',
              '24px 38px 18px 42px'
            ];
            const currentRadius = radii[idx % radii.length];

            return (
              <AsteroidPod
                key={idx}
                accentColor={ringColor}
                onMouseEnter={() => sound.playHover()}
                onClick={() => setActiveRingIndex(idx)}
                style={{
                  borderRadius: currentRadius,
                  border: `2px solid ${ringColor}${isHighlighted ? '88' : '28'}`,
                  boxShadow: `0 16px 45px rgba(0, 0, 0, 0.5), 0 0 ${isHighlighted ? '35px' : '15px'} ${ringColor}${isHighlighted ? '33' : '11'}`,
                  transform: isHighlighted ? 'scale(1.01)' : 'scale(1)',
                  transition: 'all 250ms ease'
                }}
              >
                {/* Header row with craft icon */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', flexWrap: 'wrap', gap: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {getVehicleForRing(idx)}
                    </div>
                    <div>
                      <span
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.78rem',
                          fontWeight: 700,
                          color: ringColor,
                          letterSpacing: '0.12em',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}
                      >
                        ORBIT TRAJECTORY #{idx + 1} // {ring.timeframe}
                      </span>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
                        ALTITUDE: {ring.ring}
                      </span>
                    </div>
                  </div>

                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.72rem',
                      padding: '4px 14px',
                      borderRadius: '16px',
                      background: `${ringColor}18`,
                      color: ringColor,
                      border: `1.5px solid ${ringColor}44`
                    }}
                  >
                    STATUS: LOCKED VECTOR
                  </span>
                </div>

                <h3 className="font-display" style={{ fontSize: '1.65rem', color: 'var(--text-primary)', marginBottom: '10px', lineHeight: 1.3 }}>
                  {ring.role}
                </h3>

                <p style={{ color: 'var(--text-secondary)', fontSize: '0.96rem', marginBottom: '22px', lineHeight: 1.65 }}>
                  {ring.focus}
                </p>

                {/* Target Milestones Pebble Pod */}
                <div
                  style={{
                    background: 'radial-gradient(circle at 10% 10%, rgba(5, 6, 15, 0.9) 0%, rgba(11, 13, 36, 0.8) 100%)',
                    padding: '20px 24px',
                    borderRadius: '26px 14px 22px 16px',
                    border: `1px dashed ${ringColor}44`
                  }}
                >
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.72rem',
                      color: ringColor,
                      fontWeight: 700,
                      marginBottom: '12px',
                      letterSpacing: '0.08em',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                  >
                    <span>🧭</span>
                    <span>MISSION SUCCESS CRITERIA:</span>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '12px' }}>
                    {ring.targets.map((tgt, i) => (
                      <div
                        key={i}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          fontSize: '0.9rem',
                          color: 'var(--moonlight)',
                          background: 'rgba(255, 255, 255, 0.03)',
                          padding: '10px 14px',
                          borderRadius: '18px 10px 16px 12px',
                          border: '1px solid rgba(255, 255, 255, 0.06)'
                        }}
                      >
                        <span style={{ color: ringColor, fontSize: '0.85rem' }}>✦</span>
                        <span>{tgt}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </AsteroidPod>
            );
          })}
        </div>

        {/* Orbit Return Button */}
        <div style={{ textAlign: 'center', marginTop: '54px' }}>
          <button
            onClick={() => {
              sound.playClick();
              onNavigate('home');
            }}
            style={{
              padding: '12px 30px',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.85rem',
              borderRadius: '26px',
              border: '1.5px solid rgba(255, 200, 87, 0.4)',
              background: 'rgba(255, 200, 87, 0.1)',
              color: 'var(--stardust-gold)',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              boxShadow: '0 0 20px rgba(255, 200, 87, 0.15)',
              transition: 'all 200ms ease'
            }}
            onMouseEnter={(e) => {
              sound.playHover();
              e.currentTarget.style.background = 'rgba(255, 200, 87, 0.25)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 200, 87, 0.1)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <WhimsicalRocket size={20} angle={-45} />
            <span>← Return to Solar Orbit</span>
          </button>
        </div>
      </div>
    </SubpageAtmosphere>
  );
}
