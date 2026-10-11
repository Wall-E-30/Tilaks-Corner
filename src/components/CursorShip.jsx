import { useState, useEffect } from 'react';

export default function CursorShip({ isEnabled = true, isTelescope = false }) {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [trail, setTrail] = useState([]);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!isEnabled || typeof window === 'undefined') return;

    // Check if device has fine pointer (mouse)
    const hasMouse = window.matchMedia('(pointer: fine)').matches;
    if (!hasMouse) return;

    let trailCounter = 0;

    const handleMouseMove = (e) => {
      setVisible(true);
      const x = e.clientX;
      const y = e.clientY;
      setPos({ x, y });

      trailCounter++;
      if (trailCounter % 3 === 0) {
        setTrail((prev) => [
          ...prev.slice(-6),
          { id: Math.random(), x, y: y + 8, opacity: 0.8, size: Math.random() * 3 + 2 }
        ]);
      }
    };

    const handleMouseLeave = () => setVisible(false);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isEnabled]);

  if (!isEnabled || !visible) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 9990
      }}
    >
      {/* Particle trail */}
      {trail.map((p, i) => (
        <div
          key={p.id}
          style={{
            position: 'absolute',
            left: `${p.x}px`,
            top: `${p.y}px`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            borderRadius: '50%',
            background: i % 2 === 0 ? 'var(--solar-coral)' : 'var(--stardust-gold)',
            boxShadow: '0 0 6px rgba(255, 107, 74, 0.8)',
            transform: 'translate(-50%, -50%)',
            opacity: p.opacity * ((i + 1) / trail.length),
            transition: 'opacity 150ms ease, transform 150ms ease'
          }}
        />
      ))}

      {/* Spaceship or Telescope Cursor */}
      <div
        style={{
          position: 'absolute',
          left: `${pos.x}px`,
          top: `${pos.y}px`,
          transform: 'translate(-50%, -50%)',
          width: '24px',
          height: '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        {isTelescope ? (
          <span style={{ fontSize: '18px', filter: 'drop-shadow(0 0 6px #4CC9F0)' }}>🔭</span>
        ) : (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            {/* Tiny sleek spacecraft */}
            <path
              d="M12 2L17 19L12 16L7 19L12 2Z"
              fill="#EDEBFA"
              stroke="#7A3FB8"
              strokeWidth="1.5"
            />
            <circle cx="12" cy="11" r="2" fill="#2DE2C6" />
            <path d="M12 16L12 21" stroke="#FF6B4A" strokeWidth="2" strokeLinecap="round" />
          </svg>
        )}
      </div>
    </div>
  );
}
