import { useState, useEffect } from 'react';
import { sound } from '../utils/audioEngine';
import { CURIOSITIES_BLACK_HOLE } from '../utils/mindverseData';
import SubpageAtmosphere from '../components/SubpageAtmosphere';
import {
  AsteroidPod,
  WhimsicalAsteroid,
  WhimsicalUFO,
  WhimsicalAstronautFloating,
  WhimsicalRocket
} from '../components/CosmicWhimsyElements';

export default function CuriosityPage({ onNavigate }) {
  const [selectedCuriosity, setSelectedCuriosity] = useState(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && selectedCuriosity) {
        setSelectedCuriosity(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedCuriosity]);

  return (
    <SubpageAtmosphere
      nebulaColor1="rgba(122, 63, 184, 0.45)"
      nebulaColor2="rgba(224, 64, 160, 0.28)"
      accentGlow="rgba(255, 200, 87, 0.35)"
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
        {/* Floating Spacewalker observing the black hole */}
        <div style={{ position: 'absolute', top: '80px', right: '30px', opacity: 0.9 }}>
          <WhimsicalAstronautFloating size={68} />
        </div>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '8px 20px',
              background: 'radial-gradient(circle, rgba(224, 64, 160, 0.15) 0%, rgba(11, 13, 36, 0.85) 100%)',
              border: '1.5px solid rgba(224, 64, 160, 0.45)',
              borderRadius: '26px 14px 24px 16px',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.74rem',
              color: 'var(--magenta-nova)',
              letterSpacing: '0.12em',
              marginBottom: '16px',
              boxShadow: '0 0 24px rgba(224, 64, 160, 0.2)'
            }}
          >
            <span
              style={{
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                background: 'var(--magenta-nova)',
                boxShadow: '0 0 10px var(--magenta-nova)'
              }}
            />
            GRAVITATIONAL SINGULARITY // ACCRETION DISK RADAR
          </div>

          <h1
            className="font-display"
            style={{
              fontSize: 'clamp(2.4rem, 5vw, 3.8rem)',
              fontWeight: 800,
              color: 'var(--text-primary)',
              letterSpacing: '-0.02em',
              textShadow: '0 0 35px rgba(224, 64, 160, 0.3)'
            }}
          >
            Black Hole of Curiosities
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
            Deep intellectual obsessions and engineering questions exerting unrelenting gravitational pull on my orbit.
          </p>
        </div>

        {/* Free-Floating Accretion Disk Vortex - Zero Rectangles! */}
        <div
          style={{
            minHeight: '260px',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '20px 0 50px 0'
          }}
        >
          {/* Swirling accretion disk glow layers */}
          <div
            style={{
              position: 'absolute',
              width: '420px',
              height: '420px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(224, 64, 160, 0.25) 0%, rgba(122, 63, 184, 0.2) 40%, transparent 70%)',
              filter: 'blur(35px)',
              pointerEvents: 'none'
            }}
          />

          {/* Outer dashed spinning ring */}
          <div
            style={{
              position: 'absolute',
              width: '380px',
              height: '140px',
              borderRadius: '50%',
              border: '2px dashed rgba(255, 200, 87, 0.45)',
              transform: 'rotate(-14deg)',
              boxShadow: '0 0 30px rgba(255, 200, 87, 0.3)',
              animation: 'spinOrbitClockwise 45s linear infinite',
              pointerEvents: 'none'
            }}
          />

          {/* Inner counter-spinning glow ring */}
          <div
            style={{
              position: 'absolute',
              width: '260px',
              height: '95px',
              borderRadius: '50%',
              border: '2px solid rgba(224, 64, 160, 0.6)',
              transform: 'rotate(18deg)',
              boxShadow: '0 0 25px rgba(224, 64, 160, 0.5)',
              animation: 'spinOrbitCounter 30s linear infinite',
              pointerEvents: 'none'
            }}
          />

          {/* Caught UFO hovering over event horizon */}
          <div
            style={{
              position: 'absolute',
              top: '15px',
              left: 'calc(50% + 110px)',
              animation: 'ufoHover 4s ease-in-out infinite'
            }}
          >
            <WhimsicalUFO size={52} />
          </div>

          {/* Caught Asteroid drifting */}
          <div
            style={{
              position: 'absolute',
              bottom: '25px',
              left: 'calc(50% - 140px)'
            }}
          >
            <WhimsicalAsteroid size={38} rotation={65} />
          </div>

          {/* Singularity Core (Black Hole Eye) */}
          <div
            style={{
              width: '100px',
              height: '100px',
              borderRadius: '50%',
              background: '#05060F',
              border: '3px solid rgba(255, 200, 87, 0.85)',
              boxShadow: '0 0 60px rgba(224, 64, 160, 0.95), 0 0 110px rgba(122, 63, 184, 0.8), inset 0 0 25px rgba(255, 200, 87, 0.4)',
              zIndex: 3,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative'
            }}
          >
            <span style={{ fontSize: '1.8rem', filter: 'drop-shadow(0 0 8px #FFC857)' }}>🕳️</span>
          </div>

          {/* Telemetry pill under singularity */}
          <div
            style={{
              marginTop: '28px',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.74rem',
              color: 'var(--stardust-gold)',
              letterSpacing: '0.14em',
              background: 'rgba(5, 6, 15, 0.85)',
              padding: '6px 20px',
              borderRadius: '24px',
              border: '1.5px solid rgba(255, 200, 87, 0.4)',
              zIndex: 4,
              boxShadow: '0 0 20px rgba(255, 200, 87, 0.2)'
            }}
          >
            EVENT HORIZON // ESCAPE VELOCITY: c // PHOTON SPHERE LOCKED
          </div>
        </div>

        {/* Curiosities as Asteroid Pods */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(330px, 1fr))', gap: '28px' }}>
          {CURIOSITIES_BLACK_HOLE.map((item, idx) => {
            const radii = [
              '38px 18px 34px 22px',
              '22px 38px 20px 34px',
              '34px 20px 38px 18px',
              '20px 36px 22px 38px'
            ];
            const currentRadius = radii[idx % radii.length];

            return (
              <AsteroidPod
                key={idx}
                accentColor="var(--magenta-nova)"
                tabIndex={0}
                role="button"
                aria-label={`Curiosity: ${item.topic}, pull: ${item.pull}. Press Enter to view orbit details.`}
                onMouseEnter={() => sound.playHover()}
                onClick={() => {
                  sound.playClick();
                  setSelectedCuriosity(item);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    sound.playClick();
                    setSelectedCuriosity(item);
                  }
                }}
                style={{
                  borderRadius: currentRadius,
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  minHeight: '260px'
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        padding: '4px 14px',
                        borderRadius: '16px',
                        background: 'rgba(224, 64, 160, 0.16)',
                        color: 'var(--magenta-nova)',
                        border: '1.5px solid var(--magenta-nova)'
                      }}
                    >
                      {item.type.toUpperCase()}
                    </span>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ fontSize: '0.85rem' }}>🧲</span>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.74rem', color: 'var(--stardust-gold)' }}>
                        {item.pull}
                      </span>
                    </div>
                  </div>

                  <h3 className="font-display" style={{ fontSize: '1.35rem', color: 'var(--text-primary)', marginBottom: '12px', lineHeight: 1.35 }}>
                    {item.topic}
                  </h3>

                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.94rem', lineHeight: 1.65 }}>
                    {item.notes}
                  </p>
                </div>

                <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <WhimsicalAsteroid size={20} rotation={idx * 35} />
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--asteroid-gray)' }}>
                      DEBRIS CLUSTER #{idx + 1}
                    </span>
                  </div>

                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.74rem',
                      color: 'var(--aurora-teal)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    Orbit Details <span>→</span>
                  </span>
                </div>
              </AsteroidPod>
            );
          })}
        </div>

        {/* Selected Curiosity Detail Overlay Modal */}
        {selectedCuriosity && (
          <div
            role="dialog"
            aria-modal="true"
            aria-label={`Curiosity Orbit Details: ${selectedCuriosity.topic}`}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(5, 6, 15, 0.85)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              zIndex: 100,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '24px'
            }}
            onClick={() => setSelectedCuriosity(null)}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              style={{
                maxWidth: '560px',
                width: '100%',
                background: 'radial-gradient(circle at 30% 20%, rgba(122, 63, 184, 0.4) 0%, rgba(11, 13, 36, 0.95) 100%)',
                border: '2px solid rgba(224, 64, 160, 0.5)',
                borderRadius: '40px 18px 36px 20px',
                padding: '36px',
                boxShadow: '0 24px 60px rgba(0, 0, 0, 0.8), 0 0 40px rgba(224, 64, 160, 0.3)',
                position: 'relative'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem',
                    padding: '4px 14px',
                    borderRadius: '16px',
                    background: 'rgba(224, 64, 160, 0.2)',
                    color: 'var(--magenta-nova)',
                    border: '1.5px solid var(--magenta-nova)'
                  }}
                >
                  {selectedCuriosity.type.toUpperCase()}
                </span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--stardust-gold)' }}>
                  PULL: {selectedCuriosity.pull}
                </span>
              </div>

              <h2 className="font-display" style={{ fontSize: '1.8rem', color: 'var(--text-primary)', marginBottom: '16px' }}>
                {selectedCuriosity.topic}
              </h2>

              <p style={{ color: 'var(--text-secondary)', fontSize: '1.02rem', lineHeight: 1.7, marginBottom: '28px' }}>
                {selectedCuriosity.notes}
              </p>

              <div style={{ display: 'flex', gap: '14px', justifyContent: 'flex-end' }}>
                <button
                  onClick={() => {
                    sound.playClick();
                    setSelectedCuriosity(null);
                    onNavigate('contact');
                  }}
                  style={{
                    padding: '10px 22px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.82rem',
                    borderRadius: '22px',
                    border: 'none',
                    background: 'linear-gradient(135deg, #E040A0 0%, #7A3FB8 100%)',
                    color: '#FFF',
                    fontWeight: 700,
                    cursor: 'pointer',
                    boxShadow: '0 0 20px rgba(224, 64, 160, 0.4)'
                  }}
                >
                  Discuss this topic 🛰️
                </button>
                <button
                  onClick={() => {
                    sound.playClick();
                    setSelectedCuriosity(null);
                  }}
                  style={{
                    padding: '10px 20px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.82rem',
                    borderRadius: '22px',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    background: 'rgba(255, 255, 255, 0.05)',
                    color: 'var(--text-secondary)',
                    cursor: 'pointer'
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Back Button */}
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
              border: '1.5px solid rgba(224, 64, 160, 0.4)',
              background: 'rgba(224, 64, 160, 0.1)',
              color: 'var(--magenta-nova)',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              boxShadow: '0 0 20px rgba(224, 64, 160, 0.15)',
              transition: 'all 200ms ease'
            }}
            onMouseEnter={(e) => {
              sound.playHover();
              e.currentTarget.style.background = 'rgba(224, 64, 160, 0.25)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(224, 64, 160, 0.1)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <WhimsicalRocket size={20} angle={-45} />
            <span>← Escape Singularity Orbit</span>
          </button>
        </div>
      </div>
    </SubpageAtmosphere>
  );
}
