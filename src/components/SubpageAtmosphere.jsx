import { WhimsicalAsteroid, WhimsicalSatellite } from './CosmicWhimsyElements';

export default function SubpageAtmosphere({
  children,
  nebulaColor1 = '#7A3FB8', // default cosmic violet
  nebulaColor2 = '#1B1A55', // default nebula indigo
  accentGlow = '#FFC857',   // default stardust gold
  maxWidth = '1050px'
}) {
  return (
    <div
      style={{
        position: 'relative',
        minHeight: '100vh',
        width: '100%',
        paddingTop: '80px',
        paddingBottom: '120px',
        overflow: 'hidden',
        background: '#05060F'
      }}
    >
      {/* 1. Ambient Glowing Nebula Gradients */}
      <div
        style={{
          position: 'fixed',
          top: '-15%',
          left: '-10%',
          width: '70vw',
          height: '70vh',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${nebulaColor1}33 0%, ${nebulaColor2}18 50%, transparent 75%)`,
          filter: 'blur(70px)',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />

      <div
        style={{
          position: 'fixed',
          bottom: '-15%',
          right: '-10%',
          width: '65vw',
          height: '65vh',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${nebulaColor2}40 0%, ${accentGlow}15 50%, transparent 75%)`,
          filter: 'blur(80px)',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />

      {/* 2. Delicate Celestial Orbit Rings */}
      <div
        style={{
          position: 'fixed',
          top: '20%',
          right: '-180px',
          width: '650px',
          height: '650px',
          borderRadius: '50%',
          border: '1px dashed rgba(138, 143, 176, 0.12)',
          transform: 'rotate(-20deg)',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />
      <div
        style={{
          position: 'fixed',
          bottom: '10%',
          left: '-220px',
          width: '750px',
          height: '750px',
          borderRadius: '50%',
          border: '1px solid rgba(138, 143, 176, 0.08)',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />

      {/* 3. Whimsical Drifting Asteroids in Background */}
      <div
        style={{
          position: 'fixed',
          top: '12%',
          left: '3%',
          pointerEvents: 'none',
          zIndex: 0,
          opacity: 0.75
        }}
      >
        <WhimsicalAsteroid size={42} rotationSpeed={32} />
      </div>

      <div
        style={{
          position: 'fixed',
          bottom: '22%',
          right: '4%',
          pointerEvents: 'none',
          zIndex: 0,
          opacity: 0.65
        }}
      >
        <WhimsicalAsteroid size={56} rotationSpeed={44} />
      </div>

      <div
        style={{
          position: 'fixed',
          top: '55%',
          left: '2%',
          pointerEvents: 'none',
          zIndex: 0,
          opacity: 0.5
        }}
      >
        <WhimsicalAsteroid size={28} rotationSpeed={22} />
      </div>

      {/* 4. Drifting Whimsical Satellite in Background */}
      <div
        className="zero-g-float"
        style={{
          position: 'fixed',
          top: '25%',
          right: '5%',
          pointerEvents: 'none',
          zIndex: 0,
          opacity: 0.85
        }}
      >
        <WhimsicalSatellite size={46} />
      </div>

      {/* 5. Deep-Space Star Dust Particles & Starbursts */}
      <svg
        style={{
          position: 'fixed',
          inset: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 0,
          opacity: 0.6
        }}
      >
        {Array.from({ length: 45 }).map((_, i) => (
          <circle
            key={i}
            cx={`${(i * 37) % 98 + 1}%`}
            cy={`${(i * 53) % 96 + 2}%`}
            r={(i % 3) * 0.7 + 0.5}
            fill="#EDEBFA"
            opacity={(i % 5) * 0.15 + 0.25}
          />
        ))}
      </svg>

      {/* 6. Page Content Layer */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          maxWidth: maxWidth,
          margin: '0 auto',
          padding: '0 24px'
        }}
      >
        {children}
      </div>
    </div>
  );
}

