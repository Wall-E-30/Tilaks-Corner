import { useState, useEffect, useRef } from 'react';
import { sound } from '../utils/audioEngine';

export default function RocketLaunchIntro({ onLaunchComplete }) {
  const [countdown, setCountdown] = useState(3);
  const [phase, setPhase] = useState('countdown'); // 'countdown' | 'ignition' | 'liftoff' | 'warp'
  const [screenShake, setScreenShake] = useState(false);
  const canvasRef = useRef(null);

  useEffect(() => {
    // Respect prefers-reduced-motion
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      onLaunchComplete();
      return;
    }

    // Escape key listener to skip immediately
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onLaunchComplete();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    // Countdown timer: 3 -> 2 -> 1 -> Ignition
    const t3 = setTimeout(() => setCountdown(2), 700);
    const t2 = setTimeout(() => setCountdown(1), 1400);
    const t1 = setTimeout(() => {
      setCountdown(0);
      setPhase('ignition');
      setScreenShake(true);
      if (sound.playThrusterRumble) sound.playThrusterRumble();
    }, 2000);

    const tLiftoff = setTimeout(() => {
      setPhase('liftoff');
    }, 2400);

    const tWarp = setTimeout(() => {
      setPhase('warp');
      sound.playWarp();
    }, 3600);

    const tDone = setTimeout(() => {
      onLaunchComplete();
    }, 4300);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      clearTimeout(t3);
      clearTimeout(t2);
      clearTimeout(t1);
      clearTimeout(tLiftoff);
      clearTimeout(tWarp);
      clearTimeout(tDone);
    };
  }, [onLaunchComplete]);

  // Particle System for Thruster Flames & Smoke Plumes
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let particles = [];
    let animId;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Rocket position calculation
      let rocketY = height * 0.65;
      if (phase === 'liftoff') {
        const elapsed = Date.now() % 10000;
        // Ascends rapidly
      }

      // Spawn particles if in ignition or liftoff
      if (phase === 'ignition' || phase === 'liftoff') {
        const spawnCount = phase === 'liftoff' ? 14 : 8;
        const emitterX = width / 2;
        const emitterY = phase === 'liftoff' ? height * 0.45 : height * 0.68;

        for (let i = 0; i < spawnCount; i++) {
          // Flame particles
          particles.push({
            x: emitterX + (Math.random() - 0.5) * 24,
            y: emitterY + (Math.random() * 8),
            vx: (Math.random() - 0.5) * 4,
            vy: Math.random() * 9 + 6, // shoots downwards
            radius: Math.random() * 8 + 4,
            color: Math.random() > 0.4 ? '#FF6B4A' : '#FFC857',
            alpha: 1,
            decay: 0.035,
            isSmoke: false
          });

          // Smoke puff particles
          if (Math.random() > 0.5) {
            particles.push({
              x: emitterX + (Math.random() - 0.5) * 40,
              y: emitterY + Math.random() * 15,
              vx: (Math.random() - 0.5) * 8, // expands horizontally
              vy: Math.random() * 3 + 1,
              radius: Math.random() * 18 + 10,
              color: '#8A8FB0',
              alpha: 0.55,
              decay: 0.015,
              isSmoke: true
            });
          }
        }
      }

      // Update and draw particles
      particles.forEach((p, idx) => {
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= p.decay;
        if (p.isSmoke) {
          p.radius += 0.8; // smoke billows
        }

        if (p.alpha <= 0) {
          particles.splice(idx, 1);
          return;
        }

        ctx.save();
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.isSmoke ? 'transparent' : '#FF6B4A';
        ctx.shadowBlur = p.isSmoke ? 0 : 12;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [phase]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Mission Launchpad Sequence"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 10000,
        background: '#05060F',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        animation: screenShake ? 'launchShake 80ms ease-in-out infinite' : 'none'
      }}
    >
      {/* Background Starfield */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at 50% 70%, #1B1A55 0%, #0B0D24 45%, #05060F 100%)',
          opacity: 0.85
        }}
      />

      {/* Particle Canvas */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 2
        }}
      />

      {/* Top Telemetry & Skip Button */}
      <div
        style={{
          position: 'absolute',
          top: '24px',
          left: '24px',
          right: '24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          zIndex: 10,
          fontFamily: 'var(--font-mono)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#FF6B4A', boxShadow: '0 0 8px #FF6B4A' }} />
          <span style={{ fontSize: '0.78rem', color: 'var(--stardust-gold)', letterSpacing: '0.12em' }}>
            LAUNCH COMPLEX 01 // MISSION: MINDVERSE
          </span>
        </div>

        <button
          onClick={onLaunchComplete}
          style={{
            background: 'rgba(255, 255, 255, 0.06)',
            border: '1px solid rgba(138, 143, 176, 0.35)',
            color: 'var(--moonlight)',
            padding: '6px 14px',
            borderRadius: '4px',
            fontSize: '0.75rem',
            fontFamily: 'var(--font-mono)',
            cursor: 'pointer'
          }}
        >
          [ESC] Skip Launch ✕
        </button>
      </div>

      {/* Center Countdown HUD */}
      <div
        style={{
          position: 'absolute',
          top: '16%',
          textAlign: 'center',
          zIndex: 10,
          fontFamily: 'var(--font-mono)'
        }}
      >
        <div style={{ fontSize: '0.85rem', color: 'var(--asteroid-gray)', letterSpacing: '0.18em', marginBottom: '8px' }}>
          COMMANDER TILAK // ORBITAL INSERTION
        </div>

        <div
          className="font-display"
          style={{
            fontSize: 'clamp(2.5rem, 7vw, 4.5rem)',
            fontWeight: 800,
            color: phase === 'countdown' ? 'var(--stardust-gold)' : 'var(--solar-coral)',
            textShadow: phase === 'countdown' ? '0 0 24px rgba(255, 200, 87, 0.6)' : '0 0 35px rgba(255, 107, 74, 0.9)'
          }}
        >
          {phase === 'countdown' && `T-MINUS 0${countdown}`}
          {phase === 'ignition' && 'THRUSTERS IGNITED!'}
          {phase === 'liftoff' && 'LIFTOFF DETECTED!'}
          {phase === 'warp' && 'BREAKING ORBIT...'}
        </div>
      </div>

      {/* The Rocket Spacecraft (SVG) */}
      <div
        style={{
          position: 'relative',
          zIndex: 3,
          width: '120px',
          height: '240px',
          animation: phase === 'liftoff'
            ? 'rocketAscent 1.8s cubic-bezier(0.4, 0, 0.2, 1) forwards'
            : phase === 'ignition'
            ? 'rocketIgnitionShudder 100ms ease-in-out infinite'
            : 'none'
        }}
      >
        <svg viewBox="0 0 100 200" width="100%" height="100%" fill="none">
          {/* Rocket Nose Cone */}
          <path d="M50 10 Q68 55 70 85 L30 85 Q32 55 50 10 Z" fill="#EDEBFA" stroke="#8A8FB0" strokeWidth="2" />
          <path d="M50 10 L50 45" stroke="#FF6B4A" strokeWidth="3" />

          {/* Rocket Fuselage */}
          <rect x="30" y="85" width="40" height="70" fill="#EDEBFA" stroke="#8A8FB0" strokeWidth="2" />

          {/* Cockpit Window */}
          <circle cx="50" cy="70" r="9" fill="#0B0D24" stroke="#4CC9F0" strokeWidth="2.5" />
          <circle cx="50" cy="70" r="4" fill="#2DE2C6" />

          {/* Side Fins */}
          <path d="M30 115 L12 165 L30 155 Z" fill="#7A3FB8" stroke="#E040A0" strokeWidth="1.5" />
          <path d="M70 115 L88 165 L70 155 Z" fill="#7A3FB8" stroke="#E040A0" strokeWidth="1.5" />

          {/* Center Thruster Nozzle */}
          <polygon points="36,155 64,155 68,172 32,172" fill="#1B1A55" stroke="#8A8FB0" strokeWidth="1.5" />

          {/* Telemetry insignia */}
          <text x="50" y="112" fill="#1B1A55" fontSize="8" fontWeight="bold" fontFamily="Space Mono" textAnchor="middle">TILAK</text>
          <text x="50" y="125" fill="#FF6B4A" fontSize="7" fontWeight="bold" fontFamily="Space Mono" textAnchor="middle">CORE-1</text>
        </svg>
      </div>

      {/* Launch Pad Base Gantry */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          width: '100%',
          height: '140px',
          background: 'linear-gradient(180deg, rgba(11, 13, 36, 0.4) 0%, #05060F 100%)',
          borderTop: '1px solid rgba(138, 143, 176, 0.25)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
          zIndex: 1
        }}
      >
        <div style={{ width: '180px', height: '14px', background: '#1B1A55', borderRadius: '4px', border: '1px solid #7A3FB8', marginTop: '10px' }} />
      </div>

      <style>{`
        @keyframes launchShake {
          0%, 100% { transform: translate(0, 0); }
          25% { transform: translate(-3px, 2px); }
          50% { transform: translate(3px, -2px); }
          75% { transform: translate(-2px, -3px); }
        }
        @keyframes rocketIgnitionShudder {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(0, 2px); }
        }
        @keyframes rocketAscent {
          0% {
            transform: translateY(0px) scale(1);
          }
          30% {
            transform: translateY(-80px) scale(1.05);
          }
          100% {
            transform: translateY(-900px) scale(1.6);
            opacity: 0.1;
          }
        }
      `}</style>
    </div>
  );
}
