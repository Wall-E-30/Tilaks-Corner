import { useState, useEffect } from 'react';
import { sound } from '../utils/audioEngine';
import { SHOOTING_STAR_FACTS } from '../utils/mindverseData';

export default function ShootingStars({
  caughtCount,
  onStarCaught,
  onNavigate
}) {
  const [activeStar, setActiveStar] = useState(null);
  const [activeFact, setActiveFact] = useState(null);
  const [showCelebration, setShowCelebration] = useState(false);

  // Close modals on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setActiveFact(null);
        setShowCelebration(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    // Schedule random star appearance every 14 to 20 seconds
    let timeoutId;

    const scheduleStar = () => {
      const delay = Math.floor(Math.random() * 6000) + 14000; // 14s - 20s
      timeoutId = setTimeout(() => {
        if (!activeStar && typeof window !== 'undefined') {
          // Generate trajectory
          const startX = Math.random() * (window.innerWidth * 0.7) + 50;
          const startY = Math.random() * 200 + 40;
          const length = Math.random() * 250 + 180;
          const angle = 35 + Math.random() * 20; // diagonal streak

          setActiveStar({
            id: Date.now(),
            startX,
            startY,
            length,
            angle,
            factIndex: Math.floor(Math.random() * SHOOTING_STAR_FACTS.length)
          });

          // Disappear after 1.6s streak if not caught
          setTimeout(() => {
            setActiveStar((curr) => (curr && curr.id ? null : curr));
          }, 1800);
        }
        scheduleStar();
      }, delay);
    };

    scheduleStar();
    return () => clearTimeout(timeoutId);
  }, [activeStar]);

  const handleCatch = (e, star) => {
    e.stopPropagation();
    sound.playStarCatch();
    const fact = SHOOTING_STAR_FACTS[star.factIndex];
    setActiveFact(fact);
    setActiveStar(null);
    onStarCaught();

    if (caughtCount + 1 === 10) {
      setTimeout(() => {
        sound.playVictory();
        setShowCelebration(true);
        try {
          localStorage.setItem('mindverse_secret_unlocked', 'true');
        } catch {}
      }, 500);
    }
  };

  return (
    <>
      {/* Streaking Star Animation */}
      {activeStar && (
        <div
          role="button"
          aria-label="Catch shooting star for a personal fact"
          onClick={(e) => handleCatch(e, activeStar)}
          style={{
            position: 'fixed',
            left: `${activeStar.startX}px`,
            top: `${activeStar.startY}px`,
            zIndex: 880,
            cursor: 'pointer',
            padding: '20px', // generous hit target
            transform: `rotate(${activeStar.angle}deg)`,
            pointerEvents: 'auto',
            animation: 'shootingStreak 1.6s cubic-bezier(0.25, 1, 0.5, 1) forwards'
          }}
          title="✦ Click to catch shooting star!"
        >
          {/* Star Head & Particle Trail */}
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <div
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: '#FFF',
                boxShadow: '0 0 12px #FFC857, 0 0 24px #FF6B4A',
                zIndex: 2
              }}
            />
            {/* Glowing tail */}
            <div
              style={{
                width: `${activeStar.length}px`,
                height: '2px',
                background: 'linear-gradient(90deg, rgba(255, 200, 87, 0.95), rgba(255, 107, 74, 0.6), transparent)',
                marginLeft: '-4px'
              }}
            />
          </div>
        </div>
      )}

      {/* Fact Card Modal / Notification */}
      {activeFact && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Shooting star fact revealed"
          style={{
            position: 'fixed',
            top: '80px',
            right: '24px',
            zIndex: 950,
            maxWidth: '360px',
            background: 'rgba(5, 6, 15, 0.96)',
            border: '1px solid var(--stardust-gold)',
            boxShadow: '0 12px 40px rgba(0, 0, 0, 0.7), 0 0 24px rgba(255, 200, 87, 0.25)',
            borderRadius: '12px',
            padding: '16px 20px',
            fontFamily: 'var(--font-mono)',
            animation: 'fadeInFact 300ms ease-out'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ color: 'var(--stardust-gold)', fontSize: '0.9rem' }}>✦</span>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--stardust-gold)', letterSpacing: '0.08em' }}>
                STAR CAPTURED! [FACT #{caughtCount}]
              </span>
            </div>
            <button
              onClick={() => {
                sound.playClick();
                setActiveFact(null);
              }}
              aria-label="Close star fact"
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--asteroid-gray)',
                cursor: 'pointer',
                fontSize: '0.85rem'
              }}
            >
              ✕
            </button>
          </div>

          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.92rem', color: 'var(--moonlight)', lineHeight: 1.5, margin: '8px 0 12px 0' }}>
            "{activeFact}"
          </p>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(138, 143, 176, 0.2)', paddingTop: '8px' }}>
            <span style={{ fontSize: '0.68rem', color: 'var(--asteroid-gray)' }}>
              Collected: {caughtCount}/10 for Secret Signal
            </span>
            {caughtCount >= 10 && (
              <button
                onClick={() => {
                  sound.playClick();
                  setActiveFact(null);
                  onNavigate('secret-signal');
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--aurora-teal)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                Access Signal →
              </button>
            )}
          </div>
        </div>
      )}

      {/* 10-Star Celebratory Milestone Modal */}
      {showCelebration && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Deep Space Clearance Unlocked"
          onClick={() => setShowCelebration(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(5, 6, 15, 0.88)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px'
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: '540px',
              width: '100%',
              background: 'radial-gradient(circle at 30% 20%, rgba(45, 226, 198, 0.25) 0%, rgba(11, 13, 36, 0.98) 100%)',
              border: '2px solid var(--aurora-teal)',
              boxShadow: '0 0 50px rgba(45, 226, 198, 0.4), 0 20px 60px rgba(0, 0, 0, 0.8)',
              borderRadius: '36px 18px 32px 20px',
              padding: '36px',
              textAlign: 'center',
              fontFamily: 'var(--font-mono)',
              position: 'relative'
            }}
          >
            <div style={{ fontSize: '2.5rem', marginBottom: '10px' }}>✦ 🌟 ✦</div>
            <div style={{ color: 'var(--aurora-teal)', fontSize: '0.82rem', fontWeight: 700, letterSpacing: '0.14em', marginBottom: '12px' }}>
              DEEP SPACE CLEARANCE UNLOCKED
            </div>
            <h2 className="font-display" style={{ fontSize: '1.8rem', color: 'var(--text-primary)', marginBottom: '16px', fontWeight: 800 }}>
              10 Shooting Stars Harvested!
            </h2>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', color: 'var(--moonlight)', lineHeight: 1.6, marginBottom: '28px' }}>
              You have tracked and caught 10 shooting stars across Commander Tilak's mindverse. The encrypted subspace frequency is now fully decrypted.
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button
                onClick={() => {
                  sound.playClick();
                  setShowCelebration(false);
                  onNavigate('secret-signal');
                }}
                style={{
                  background: 'linear-gradient(135deg, #2DE2C6 0%, #4CC9F0 100%)',
                  border: 'none',
                  borderRadius: '24px',
                  padding: '12px 28px',
                  color: '#05060F',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  boxShadow: '0 0 24px rgba(45, 226, 198, 0.5)'
                }}
              >
                Warp to Secret Signal 📡
              </button>
              <button
                onClick={() => setShowCelebration(false)}
                style={{
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '24px',
                  padding: '12px 24px',
                  color: 'var(--text-secondary)',
                  fontSize: '0.85rem',
                  cursor: 'pointer'
                }}
              >
                Continue Exploring
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes shootingStreak {
          0% {
            opacity: 0;
            transform: translate(0, 0) scale(0.6);
          }
          15% {
            opacity: 1;
            transform: translate(60px, 45px) scale(1);
          }
          100% {
            opacity: 0;
            transform: translate(380px, 260px) scale(0.4);
          }
        }
        @keyframes fadeInFact {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
}
