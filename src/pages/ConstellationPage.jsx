import { useState } from 'react';
import { sound } from '../utils/audioEngine';
import { PROJECTS_DATA } from '../utils/mindverseData';
import SubpageAtmosphere from '../components/SubpageAtmosphere';
import {
  AsteroidPod,
  WhimsicalRocket,
  WhimsicalAsteroid,
  WhimsicalUFO
} from '../components/CosmicWhimsyElements';

export default function ConstellationPage({ onSelectProject, onNavigate }) {
  const [hoveredStar, setHoveredStar] = useState(null);

  const flagshipProjects = PROJECTS_DATA.filter((p) => p.featured && !p.unexplored);

  // Defined coordinate positions for the constellation polygon
  const starCoords = [
    { x: 180, y: 140 }, // Aurelia / Pratyaksha
    { x: 500, y: 80 },  // Cashscript
    { x: 740, y: 220 }, // AI Complaint Engine
    { x: 380, y: 340 }  // Digital Scrapbook
  ];

  return (
    <SubpageAtmosphere
      nebulaColor1="rgba(122, 63, 184, 0.45)"
      nebulaColor2="rgba(45, 226, 198, 0.2)"
      accentGlow="rgba(255, 200, 87, 0.25)"
    >
      <div
        style={{
          maxWidth: '1080px',
          margin: '0 auto',
          padding: '100px 24px 80px 24px',
          fontFamily: 'var(--font-body)',
          position: 'relative'
        }}
      >
        <div style={{ position: 'absolute', top: '70px', right: '30px' }}>
          <WhimsicalUFO size={48} />
        </div>
        <div style={{ position: 'absolute', top: '120px', left: '20px' }}>
          <WhimsicalAsteroid size={38} rotation={-20} />
        </div>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.74rem',
              color: 'var(--stardust-gold)',
              letterSpacing: '0.12em',
              marginBottom: '14px',
              background: 'rgba(255, 200, 87, 0.1)',
              padding: '6px 18px',
              borderRadius: '20px 10px 18px 8px',
              border: '1.5px solid rgba(255, 200, 87, 0.35)'
            }}
          >
            <span>✦</span>
            <span>SECTOR 04 // INTERSTELLAR CONSTELLATION MAP</span>
          </div>
          <h1
            className="font-display"
            style={{
              fontSize: 'clamp(2.2rem, 5vw, 3.4rem)',
              fontWeight: 800,
              color: 'var(--text-primary)',
              textShadow: '0 0 32px rgba(122, 63, 184, 0.3)'
            }}
          >
            Constellation of Best Work
          </h1>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '640px', margin: '14px auto 0 auto', fontSize: '1rem', lineHeight: 1.6 }}>
            An interconnected stellar formation linking flagship systems. Hover to illuminate the celestial ties; click any star or pod to land on that project planet.
          </p>
        </div>

        {/* Sculpted Non-Rectangular Celestial Constellation Map */}
        <div
          style={{
            width: '100%',
            height: '460px',
            position: 'relative',
            overflow: 'hidden',
            background: 'radial-gradient(ellipse at center, rgba(27, 26, 85, 0.5) 0%, rgba(5, 6, 15, 0.95) 75%)',
            borderRadius: '46px 20px 42px 22px',
            border: '2px solid rgba(255, 200, 87, 0.3)',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6), 0 0 30px rgba(122, 63, 184, 0.2)',
            marginBottom: '44px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <svg
            viewBox="0 0 900 440"
            style={{ width: '100%', height: '100%' }}
          >
            {/* Background Ambient Stars */}
            {Array.from({ length: 40 }).map((_, i) => (
              <circle
                key={i}
                cx={(i * 97) % 880 + 10}
                cy={(i * 63) % 420 + 10}
                r={(i % 3) * 0.8 + 0.6}
                fill="#EDEBFA"
                opacity={(i % 5) * 0.15 + 0.2}
              />
            ))}

            {/* Glowing Constellation Lines */}
            <path
              d={`M ${starCoords[0].x} ${starCoords[0].y} L ${starCoords[1].x} ${starCoords[1].y} L ${starCoords[2].x} ${starCoords[2].y} L ${starCoords[3].x} ${starCoords[3].y} Z`}
              fill="rgba(122, 63, 184, 0.08)"
              stroke={hoveredStar ? '#FFC857' : 'rgba(76, 201, 240, 0.5)'}
              strokeWidth="2"
              strokeDasharray={hoveredStar ? 'none' : '4 4'}
              style={{ transition: 'stroke 300ms ease' }}
            />

            {/* Star Nodes */}
            {flagshipProjects.map((proj, idx) => {
              const coord = starCoords[idx % starCoords.length];
              const isHovered = hoveredStar?.slug === proj.slug;

              return (
                <g
                  key={proj.slug}
                  onClick={() => {
                    sound.playPlanetChord(proj.planetType);
                    onSelectProject(proj);
                  }}
                  onMouseEnter={() => {
                    sound.playHover();
                    setHoveredStar(proj);
                  }}
                  onMouseLeave={() => setHoveredStar(null)}
                  style={{ cursor: 'pointer' }}
                >
                  {/* Outer halo */}
                  <circle
                    cx={coord.x}
                    cy={coord.y}
                    r={isHovered ? 28 : 15}
                    fill={proj.primaryColor}
                    opacity={isHovered ? 0.4 : 0.18}
                    style={{ transition: 'all 200ms ease' }}
                  />
                  {/* Central shining star */}
                  <circle
                    cx={coord.x}
                    cy={coord.y}
                    r={isHovered ? 8 : 5}
                    fill="#FFF"
                    stroke={proj.primaryColor}
                    strokeWidth="2.5"
                  />
                  {/* Label text */}
                  <text
                    x={coord.x}
                    y={coord.y + 28}
                    fill={isHovered ? '#FFC857' : '#EDEBFA'}
                    fontSize="12"
                    fontWeight="bold"
                    fontFamily="Space Mono"
                    textAnchor="middle"
                  >
                    {proj.title}
                  </text>
                  <text
                    x={coord.x}
                    y={coord.y + 42}
                    fill="#8A8FB0"
                    fontSize="10"
                    fontFamily="Space Mono"
                    textAnchor="middle"
                  >
                    {proj.discipline}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Hover Star Preview HUD tooltip */}
          {hoveredStar && (
            <div
              style={{
                position: 'absolute',
                bottom: '24px',
                left: '50%',
                transform: 'translateX(-50%)',
                background: 'rgba(5, 6, 15, 0.94)',
                border: '1.5px solid var(--stardust-gold)',
                padding: '12px 24px',
                borderRadius: '24px',
                fontFamily: 'var(--font-mono)',
                textAlign: 'center',
                pointerEvents: 'none',
                boxShadow: '0 0 20px rgba(255, 200, 87, 0.3)'
              }}
            >
              <div style={{ color: 'var(--stardust-gold)', fontSize: '0.86rem', fontWeight: 700 }}>
                {hoveredStar.title}: {hoveredStar.subtitle}
              </div>
              <div style={{ color: 'var(--moonlight)', fontSize: '0.76rem', marginTop: '3px' }}>
                {hoveredStar.oneLineOutcome} • Click star to land
              </div>
            </div>
          )}
        </div>

        {/* Grid of Flagship Cards as AsteroidPods */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
          {flagshipProjects.map((proj, idx) => {
            const radii = [
              '36px 18px 32px 20px',
              '20px 36px 18px 32px',
              '34px 20px 36px 18px',
              '18px 34px 20px 36px'
            ];
            const currentRadius = radii[idx % radii.length];

            return (
              <AsteroidPod
                key={proj.slug}
                accentColor={proj.primaryColor}
                onMouseEnter={() => sound.playHover()}
                onClick={() => {
                  sound.playPlanetChord(proj.planetType);
                  onSelectProject(proj);
                }}
                style={{
                  borderRadius: currentRadius,
                  cursor: 'pointer',
                  padding: '26px'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.72rem',
                      color: proj.primaryColor,
                      background: `${proj.primaryColor}16`,
                      padding: '3px 10px',
                      borderRadius: '12px',
                      border: `1px solid ${proj.primaryColor}44`
                    }}
                  >
                    {proj.discipline}
                  </span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.76rem', color: 'var(--asteroid-gray)' }}>
                    {proj.year}
                  </span>
                </div>

                <h3 className="font-display" style={{ fontSize: '1.35rem', color: 'var(--text-primary)', margin: '8px 0 6px 0', fontWeight: 700 }}>
                  {proj.title}
                </h3>

                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '16px', lineHeight: 1.55 }}>
                  {proj.subtitle}
                </p>

                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.76rem', color: 'var(--stardust-gold)' }}>
                  ★ {proj.oneLineOutcome}
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
            <span>← Return to Celestial Orbit</span>
          </button>
        </div>
      </div>
    </SubpageAtmosphere>
  );
}
