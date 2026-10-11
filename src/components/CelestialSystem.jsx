import { useState } from 'react';
import { sound } from '../utils/audioEngine';
import { PROJECTS_DATA } from '../utils/mindverseData';
import { AsteroidPod } from './CosmicWhimsyElements';

export default function CelestialSystem({
  onSelectProject,
  onHoverPlanet,
  onStartQuickTour,
  onNavigate
}) {
  const [viewMode, setViewMode] = useState('orbit'); // 'orbit' | 'list'
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [activeHoverId, setActiveHoverId] = useState(null);

  const filterOptions = ['All', 'Code', 'Design', 'Research', 'Creative'];

  const filteredProjects = PROJECTS_DATA.filter((p) => {
    if (selectedFilter === 'All') return true;
    return p.category === selectedFilter;
  });

  // Calculate planetary orbit dimensions
  const orbitalRadii = [110, 170, 235, 305, 375, 435];

  return (
    <div style={{ position: 'relative', width: '100%', minHeight: '85vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {/* Top Filter and View Mode HUD Bar */}
      <div
        style={{
          width: '100%',
          maxWidth: '1100px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
          margin: '20px 0',
          padding: '0 16px',
          zIndex: 10
        }}
      >
        {/* Star System Filters */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--asteroid-gray)', letterSpacing: '0.08em' }}>
            SYSTEM FILTER:
          </span>
          {filterOptions.map((f) => (
            <button
              key={f}
              onClick={() => {
                sound.playClick();
                setSelectedFilter(f);
              }}
              style={{
                background: selectedFilter === f ? 'rgba(255, 200, 87, 0.16)' : 'rgba(11, 13, 36, 0.6)',
                border: selectedFilter === f ? '1px solid var(--stardust-gold)' : '1px solid rgba(138, 143, 176, 0.25)',
                color: selectedFilter === f ? 'var(--stardust-gold)' : 'var(--text-secondary)',
                borderRadius: '4px',
                padding: '4px 12px',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.74rem',
                cursor: 'pointer',
                transition: 'all 150ms ease'
              }}
            >
              {f}
            </button>
          ))}
        </div>

        {/* View Mode Toggle: Orbit vs List */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <button
            onClick={() => {
              sound.playClick();
              setViewMode('orbit');
            }}
            style={{
              background: viewMode === 'orbit' ? 'rgba(122, 63, 184, 0.35)' : 'rgba(255,255,255,0.05)',
              border: viewMode === 'orbit' ? '1px solid var(--cosmic-violet)' : '1px solid rgba(138, 143, 176, 0.2)',
              color: viewMode === 'orbit' ? 'var(--text-primary)' : 'var(--asteroid-gray)',
              borderRadius: '4px',
              padding: '6px 12px',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.74rem',
              cursor: 'pointer'
            }}
          >
            🪐 Orbit Map
          </button>
          <button
            onClick={() => {
              sound.playClick();
              setViewMode('list');
            }}
            style={{
              background: viewMode === 'list' ? 'rgba(122, 63, 184, 0.35)' : 'rgba(255,255,255,0.05)',
              border: viewMode === 'list' ? '1px solid var(--cosmic-violet)' : '1px solid rgba(138, 143, 176, 0.2)',
              color: viewMode === 'list' ? 'var(--text-primary)' : 'var(--asteroid-gray)',
              borderRadius: '4px',
              padding: '6px 12px',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.74rem',
              cursor: 'pointer'
            }}
          >
            📋 List View
          </button>
        </div>
      </div>

      {/* Mode A: Interactive Celestial Orbit Map */}
      {viewMode === 'orbit' ? (
        <div
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: '1000px',
            height: '760px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden'
          }}
          className="celestial-orbit-stage"
        >
          {/* Central Mind Star */}
          <div
            style={{
              position: 'absolute',
              width: '90px',
              height: '90px',
              borderRadius: '50%',
              background: 'radial-gradient(circle at 35% 35%, #FFF0B3 0%, #FFC857 40%, #FF6B4A 80%, #7A3FB8 100%)',
              boxShadow: '0 0 50px rgba(255, 200, 87, 0.6), 0 0 100px rgba(255, 107, 74, 0.3)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 5,
              cursor: 'default',
              animation: 'starPulse 4s ease-in-out infinite'
            }}
          >
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.8rem', fontWeight: 800, color: '#05060F' }}>
              THE MIND
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', fontWeight: 700, color: '#1B1A55' }}>
              CORE ORIGIN
            </div>
          </div>

          {/* Concentric Orbit Paths and Orbiting Planet Bodies */}
          {PROJECTS_DATA.map((planet, index) => {
            const radius = orbitalRadii[index % orbitalRadii.length];
            const isHovered = activeHoverId === planet.slug;
            // Base orbital speeds and positions
            const duration = 28 + index * 10; // seconds per orbit
            const initialAngle = (index * 60) + 15;

            return (
              <div
                key={planet.slug}
                style={{
                  position: 'absolute',
                  width: `${radius * 2}px`,
                  height: `${radius * 1.5}px`, // ellipse perspective
                  border: isHovered
                    ? `1px solid ${planet.primaryColor}`
                    : '1px dashed rgba(138, 143, 176, 0.22)',
                  borderRadius: '50%',
                  pointerEvents: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transform: 'rotate(-12deg)'
                }}
              >
                {/* Orbiting Container */}
                <div
                  style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    animation: `spinOrbit ${duration}s linear infinite`,
                    animationDelay: `-${(index * 5)}s`
                  }}
                >
                  {/* Planet Object (Positioned on perimeter) */}
                  <div
                    role="button"
                    tabIndex={0}
                    aria-label={`Planet ${planet.title}: ${planet.subtitle}`}
                    onClick={() => {
                      if (!planet.unexplored) {
                        sound.playPlanetChord(planet.planetType);
                        onSelectProject(planet);
                      }
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !planet.unexplored) {
                        sound.playPlanetChord(planet.planetType);
                        onSelectProject(planet);
                      }
                    }}
                    onMouseEnter={() => {
                      setActiveHoverId(planet.slug);
                      sound.playHover();
                      onHoverPlanet(planet);
                    }}
                    onMouseLeave={() => {
                      setActiveHoverId(null);
                      onHoverPlanet(null);
                    }}
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: '0%',
                      transform: 'translate(-50%, -50%)',
                      pointerEvents: 'auto',
                      cursor: planet.unexplored ? 'not-allowed' : 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      opacity: planet.unexplored ? 0.45 : 1
                    }}
                  >
                    {/* Planet Sphere Graphic */}
                    <div
                      style={{
                        width: `${planet.weight * 0.52}px`,
                        height: `${planet.weight * 0.52}px`,
                        borderRadius: '50%',
                        background: `radial-gradient(circle at 30% 30%, #FFF 0%, ${planet.primaryColor} 45%, ${planet.secondaryColor} 90%, #05060F 100%)`,
                        boxShadow: isHovered
                          ? `0 0 32px ${planet.primaryColor}, 0 0 16px ${planet.secondaryColor}`
                          : `0 0 16px ${planet.glowColor}`,
                        position: 'relative',
                        transition: 'transform 250ms ease, box-shadow 250ms ease',
                        transform: isHovered ? 'scale(1.22)' : 'scale(1)'
                      }}
                    >
                      {/* Planetary Ring */}
                      {planet.rings > 0 && (
                        <div
                          style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            width: `${planet.weight * 0.88}px`,
                            height: `${planet.weight * 0.28}px`,
                            border: `2px solid ${planet.primaryColor}`,
                            borderRadius: '50%',
                            transform: 'translate(-50%, -50%) rotate(-25deg)',
                            opacity: 0.8
                          }}
                        />
                      )}

                      {/* Small Moon */}
                      {planet.moons > 0 && (
                        <div
                          style={{
                            position: 'absolute',
                            top: '-8px',
                            right: '-8px',
                            width: '9px',
                            height: '9px',
                            borderRadius: '50%',
                            background: '#EDEBFA',
                            boxShadow: '0 0 6px #FFF'
                          }}
                        />
                      )}
                    </div>

                    {/* Planet Label */}
                    <div
                      style={{
                        marginTop: '8px',
                        background: 'rgba(5, 6, 15, 0.88)',
                        border: isHovered
                          ? `1px solid ${planet.primaryColor}`
                          : '1px solid rgba(138, 143, 176, 0.25)',
                        padding: '3px 8px',
                        borderRadius: '4px',
                        textAlign: 'center',
                        whiteSpace: 'nowrap',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.6)'
                      }}
                    >
                      <div
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: '0.78rem',
                          fontWeight: 700,
                          color: isHovered ? planet.primaryColor : 'var(--text-primary)'
                        }}
                      >
                        {planet.title}
                      </div>
                      <div
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.62rem',
                          color: 'var(--stardust-gold)'
                        }}
                      >
                        {planet.unexplored ? 'UNEXPLORED' : planet.discipline}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Mode B: Accessible Grid / List View */
        <div
          style={{
            width: '100%',
            maxWidth: '1100px',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '24px',
            padding: '16px'
          }}
        >
          {filteredProjects.map((planet, idx) => {
            const radii = [
              '36px 18px 32px 20px',
              '20px 36px 18px 32px',
              '34px 20px 36px 18px'
            ];
            const currentRadius = radii[idx % radii.length];

            return (
              <AsteroidPod
                key={planet.slug}
                accentColor={planet.primaryColor}
                style={{
                  borderRadius: currentRadius,
                  padding: '26px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  opacity: planet.unexplored ? 0.6 : 1
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <span className="telemetry-tag" style={{ color: planet.primaryColor }}>
                      {planet.unexplored ? 'COMMENCE 2026' : planet.discipline}
                    </span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--asteroid-gray)' }}>
                      {planet.year}
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                    <div
                      style={{
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        background: planet.primaryColor,
                        boxShadow: `0 0 10px ${planet.primaryColor}`
                      }}
                    />
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', color: 'var(--text-primary)' }}>
                      {planet.title}
                    </h3>
                  </div>

                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '16px', lineHeight: 1.5 }}>
                    {planet.subtitle} — {planet.missionBrief.solution}
                  </p>

                  {/* Tech Tools Tags */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '18px' }}>
                    {planet.tools.map((tool) => (
                      <span
                        key={tool}
                        style={{
                          fontSize: '0.7rem',
                          fontFamily: 'var(--font-mono)',
                          background: 'rgba(255, 255, 255, 0.05)',
                          border: '1px solid rgba(138, 143, 176, 0.2)',
                          padding: '2px 8px',
                          borderRadius: '12px',
                          color: 'var(--moonlight)'
                        }}
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

                <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--stardust-gold)' }}>
                    {planet.oneLineOutcome}
                  </span>

                  {!planet.unexplored ? (
                    <button
                      onClick={() => {
                        sound.playPlanetChord(planet.planetType);
                        onSelectProject(planet);
                      }}
                      className="btn-cosmic"
                      style={{ padding: '6px 14px', fontSize: '0.75rem', borderRadius: '18px' }}
                    >
                      Land →
                    </button>
                  ) : (
                    <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--asteroid-gray)' }}>
                      [In Orbit]
                    </span>
                  )}
                </div>
              </AsteroidPod>
            );
          })}
        </div>
      )}

      {/* Orbit Animation Keyframes */}
      <style>{`
        @keyframes spinOrbit {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes starPulse {
          0%, 100% { transform: scale(1); filter: brightness(1); }
          50% { transform: scale(1.05); filter: brightness(1.18); }
        }
        @media (max-width: 768px) {
          .celestial-orbit-stage {
            height: 520px !important;
            transform: scale(0.75);
          }
        }
      `}</style>
    </div>
  );
}
