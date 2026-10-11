import { useEffect, useState } from 'react';
import { sound } from '../utils/audioEngine';
import { PROJECTS_DATA } from '../utils/mindverseData';
import SubpageAtmosphere from '../components/SubpageAtmosphere';
import { WhimsicalRocket, WhimsicalAsteroid, WhimsicalAstronautFloating } from '../components/CosmicWhimsyElements';

export default function ProjectDetailPage({
  project,
  onNavigate,
  onSelectProject
}) {
  const [hoveredStage, setHoveredStage] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [project?.slug]);

  if (!project) return null;

  // Next project in orbit
  const activeProjects = PROJECTS_DATA.filter((p) => !p.unexplored);
  const currentIndex = activeProjects.findIndex((p) => p.slug === project.slug);
  const nextProject = activeProjects[(currentIndex + 1) % activeProjects.length];

  const stageIcons = ['🚀', '🛰️', '☄️', '🪐'];

  return (
    <SubpageAtmosphere
      nebulaColor1={project.primaryColor}
      nebulaColor2={project.secondaryColor}
      accentGlow={project.primaryColor}
      maxWidth="1040px"
    >
      {/* Top Floating Orbit Navigation Bar */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
          marginBottom: '36px'
        }}
      >
        <button
          onClick={() => {
            sound.playClick();
            onNavigate('home');
          }}
          className="btn-secondary"
          style={{
            fontSize: '0.82rem',
            background: 'rgba(11, 13, 36, 0.6)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            borderRadius: '24px',
            padding: '8px 18px'
          }}
        >
          ← Return to 3D Orbit Map
        </button>

        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            color: project.primaryColor,
            background: 'rgba(11, 13, 36, 0.65)',
            padding: '6px 16px',
            borderRadius: '24px',
            border: `1px solid ${project.primaryColor}44`,
            backdropFilter: 'blur(16px)',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.74rem',
            letterSpacing: '0.1em'
          }}
        >
          <span
            style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: project.primaryColor,
              boxShadow: `0 0 8px ${project.primaryColor}`
            }}
          />
          PLANETARY DESCENT // {project.title.toUpperCase()} // SECTOR {project.discipline.toUpperCase()}
        </div>
      </div>

      {/* Zero-G Free-Floating Planetary Hero (No bounding box) */}
      <header
        style={{
          padding: '20px 0 40px 0',
          position: 'relative',
          marginBottom: '32px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '36px', flexWrap: 'wrap', marginBottom: '28px' }}>
          {/* Rotating Zero-G Shaded Planet Sphere */}
          <div
            className="zero-g-float"
            style={{
              position: 'relative',
              width: '120px',
              height: '120px',
              borderRadius: '50%',
              background: `radial-gradient(circle at 32% 32%, #FFFFFF 0%, ${project.primaryColor} 45%, ${project.secondaryColor} 80%, #05060F 100%)`,
              boxShadow: `0 0 50px ${project.glowColor}, inset -12px -12px 30px rgba(0,0,0,0.85)`,
              flexShrink: 0
            }}
          >
            {/* Ambient Planetary Rings */}
            {project.rings > 0 && (
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  width: '190px',
                  height: '52px',
                  border: `3px solid ${project.primaryColor}`,
                  borderRadius: '50%',
                  transform: 'translate(-50%, -50%) rotate(-25deg)',
                  opacity: 0.85,
                  boxShadow: `0 0 20px ${project.glowColor}`,
                  pointerEvents: 'none'
                }}
              />
            )}
            {/* Orbital Star Dust Beacon */}
            <div
              className="starlight-pulse"
              style={{
                position: 'absolute',
                top: '-8px',
                right: '12px',
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                background: '#FFF',
                color: project.primaryColor
              }}
            />
          </div>

          {/* Floating Spacewalker Astronaut near Planet */}
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <WhimsicalAstronautFloating size={58} />
          </div>

          <div style={{ flex: 1, minWidth: '280px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  color: project.primaryColor,
                  letterSpacing: '0.14em',
                  background: `${project.primaryColor}18`,
                  padding: '3px 10px',
                  borderRadius: '12px',
                  border: `1px solid ${project.primaryColor}40`
                }}
              >
                🪐 {project.planetType.toUpperCase()} CLASS
              </span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--asteroid-gray)' }}>
                COORDINATES: {project.slug}.orbit.mindverse
              </span>
            </div>

            <h1
              className="font-display"
              style={{
                fontSize: 'clamp(2.6rem, 6vw, 4.2rem)',
                fontWeight: 800,
                color: 'var(--text-primary)',
                lineHeight: 1.1,
                margin: '4px 0',
                letterSpacing: '-0.02em',
                textShadow: `0 0 30px ${project.glowColor}`
              }}
            >
              {project.title}
            </h1>
            <p style={{ fontSize: '1.25rem', color: project.primaryColor, fontWeight: 500, margin: '6px 0 0 0' }}>
              {project.subtitle}
            </p>
          </div>
        </div>

        {/* Floating Telemetry Coordinates Strip (Organic Starlight Ribbon) */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '16px',
            padding: '18px 24px',
            background: 'rgba(11, 13, 36, 0.45)',
            backdropFilter: 'blur(20px)',
            borderRadius: '16px',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
            fontFamily: 'var(--font-mono)',
            marginBottom: '20px'
          }}
        >
          <div>
            <div style={{ fontSize: '0.68rem', color: 'var(--asteroid-gray)' }}>✦ CREW ROLE</div>
            <div style={{ fontSize: '0.92rem', color: 'var(--text-primary)', fontWeight: 600, marginTop: '2px' }}>{project.role}</div>
          </div>
          <div>
            <div style={{ fontSize: '0.68rem', color: 'var(--asteroid-gray)' }}>✦ CADENCE &amp; LAUNCH</div>
            <div style={{ fontSize: '0.92rem', color: 'var(--text-primary)', fontWeight: 600, marginTop: '2px' }}>{project.timeline}</div>
          </div>
          <div>
            <div style={{ fontSize: '0.68rem', color: 'var(--asteroid-gray)' }}>✦ COLLABORATORS</div>
            <div style={{ fontSize: '0.92rem', color: 'var(--text-primary)', fontWeight: 600, marginTop: '2px' }}>{project.team}</div>
          </div>
          <div>
            <div style={{ fontSize: '0.68rem', color: 'var(--stardust-gold)' }}>✦ OUTCOME VERIFICATION</div>
            <div style={{ fontSize: '0.92rem', color: 'var(--stardust-gold)', fontWeight: 700, marginTop: '2px' }}>{project.oneLineOutcome}</div>
          </div>
        </div>

        {/* Operational Directive (Soft Cosmic Gradient Ribbon) */}
        <div
          style={{
            padding: '20px 24px',
            background: `linear-gradient(90deg, ${project.primaryColor}18 0%, rgba(11, 13, 36, 0.35) 60%, transparent 100%)`,
            borderLeft: `4px solid ${project.primaryColor}`,
            borderRadius: '0 16px 16px 0',
            fontSize: '1rem',
            lineHeight: 1.65,
            color: 'var(--moonlight)',
            marginBottom: '24px'
          }}
        >
          <strong style={{ color: project.primaryColor }}>Operational Directive: </strong>
          {project.missionBrief.problem} {project.missionBrief.solution}
        </div>

        {/* Constellation Tech Stack & Launch Triggers */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '18px' }}>
          {/* Constellation Star-Map Links */}
          <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--asteroid-gray)', marginRight: '6px' }}>
              CONSTELLATION:
            </span>
            {project.tools.map((t, idx) => (
              <span
                key={t}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.78rem',
                  padding: '5px 14px',
                  borderRadius: '20px',
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  color: 'var(--text-primary)',
                  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)'
                }}
              >
                <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: project.primaryColor }} />
                {t}
              </span>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            {project.liveUrl && project.liveUrl !== '#' && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.playClick()}
                className="btn-cosmic"
                style={{ padding: '10px 22px', fontSize: '0.82rem', borderRadius: '24px' }}
              >
                Launch Live View ↗
              </a>
            )}
            {project.githubUrl && project.githubUrl !== '#' && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.playClick()}
                className="btn-secondary"
                style={{ padding: '10px 22px', fontSize: '0.82rem', borderRadius: '24px' }}
              >
                Source Repository ↗
              </a>
            )}
          </div>
        </div>
      </header>

      {/* Floating Telemetry Satellite Orbit Rings (Replaces rigid metric boxes) */}
      <section style={{ margin: '48px 0 64px 0' }}>
        <div style={{ textAlign: 'center', marginBottom: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '14px' }}>
          <WhimsicalAsteroid size={32} rotationSpeed={18} />
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.74rem',
              color: project.primaryColor,
              letterSpacing: '0.14em'
            }}
          >
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: project.primaryColor, boxShadow: `0 0 8px ${project.primaryColor}` }} />
            VERIFIED TELEMETRY RADAR // PLANETARY PROBE MEASUREMENTS
          </div>
          <WhimsicalAsteroid size={26} rotationSpeed={24} />
        </div>


        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '36px'
          }}
        >
          {project.stats.map((s, idx) => (
            <div
              key={idx}
              onMouseEnter={() => sound.playHover()}
              style={{
                position: 'relative',
                width: '180px',
                height: '180px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              {/* Outer Spinning Dashed Orbit Ring */}
              <div
                className="orbit-spin-slow"
                style={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: '50%',
                  border: `2px dashed ${project.primaryColor}55`,
                  boxShadow: `0 0 25px ${project.glowColor}22`
                }}
              >
                {/* Orbiting Satellite Dot */}
                <div
                  style={{
                    position: 'absolute',
                    top: '-4px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: project.primaryColor,
                    boxShadow: `0 0 10px ${project.primaryColor}`
                  }}
                />
              </div>

              {/* Inner Counter-Spinning Orbit Ring */}
              <div
                className="orbit-spin-reverse"
                style={{
                  position: 'absolute',
                  inset: '16px',
                  borderRadius: '50%',
                  border: '1px dashed rgba(255, 255, 255, 0.15)'
                }}
              />

              {/* Core Telemetry Node */}
              <div
                style={{
                  position: 'relative',
                  width: '110px',
                  height: '110px',
                  borderRadius: '50%',
                  background: 'rgba(11, 13, 36, 0.75)',
                  backdropFilter: 'blur(16px)',
                  border: `1px solid ${project.primaryColor}40`,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: `0 8px 30px rgba(0, 0, 0, 0.5), inset 0 0 20px ${project.glowColor}33`,
                  textAlign: 'center',
                  padding: '8px'
                }}
              >
                <div
                  className="font-display"
                  style={{
                    fontSize: '1.5rem',
                    fontWeight: 800,
                    color: project.primaryColor,
                    lineHeight: 1.1,
                    textShadow: `0 0 16px ${project.glowColor}`
                  }}
                >
                  {s.value}
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.66rem',
                    color: 'var(--moonlight)',
                    marginTop: '4px',
                    letterSpacing: '0.04em'
                  }}
                >
                  {s.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Winding SVG Orbital Trajectory Flight Path (Replaces stacked rectangular cards) */}
      <section style={{ margin: '60px 0 80px 0' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.74rem',
              color: 'var(--stardust-gold)',
              letterSpacing: '0.14em',
              marginBottom: '8px'
            }}
          >
            <span>☄️</span> FLIGHT LOG // ORBITAL DESCENT TRAJECTORY
          </div>
          <h2
            className="font-display"
            style={{
              fontSize: 'clamp(2rem, 4.5vw, 2.8rem)',
              color: 'var(--text-primary)',
              margin: 0,
              fontWeight: 800
            }}
          >
            The Four Mission Stages
          </h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '580px', margin: '8px auto 0 auto', fontSize: '0.95rem' }}>
            Follow the spacecraft's journey from initial atmospheric ignition to planetary landing.
          </p>
        </div>

        {/* Winding Trajectory Flow */}
        <div style={{ position: 'relative', maxWidth: '840px', margin: '0 auto' }}>
          {/* Whimsical Rocket flying down the trajectory */}
          <div
            className="zero-g-float"
            style={{
              position: 'absolute',
              top: '-24px',
              left: 'calc(50% - 24px)',
              zIndex: 3,
              pointerEvents: 'none'
            }}
          >
            <WhimsicalRocket size={48} angle={180} />
          </div>

          {/* Animated Connecting Trajectory Line (Desktop/Tablet) */}
          <div
            style={{
              position: 'absolute',
              top: '40px',
              bottom: '40px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '2px',
              background: `linear-gradient(180deg, ${project.primaryColor} 0%, var(--stardust-gold) 50%, ${project.secondaryColor} 100%)`,
              opacity: 0.35,
              zIndex: 0
            }}
          />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '36px', position: 'relative', zIndex: 1 }}>
            {project.missionStages.map((stage, idx) => {
              const isEven = idx % 2 === 0;
              const isHovered = hoveredStage === idx;
              const stageColor = idx === 0 ? 'var(--solar-coral)' : idx === 1 ? project.primaryColor : idx === 2 ? 'var(--aurora-teal)' : 'var(--stardust-gold)';

              return (
                <div
                  key={idx}
                  onMouseEnter={() => {
                    sound.playHover();
                    setHoveredStage(idx);
                  }}
                  onMouseLeave={() => setHoveredStage(null)}
                  style={{
                    display: 'flex',
                    flexDirection: isEven ? 'row' : 'row-reverse',
                    alignItems: 'center',
                    gap: '24px',
                    transition: 'all 250ms ease'
                  }}
                >
                  {/* Waypoint Card (Organic celestial pod, zero boxy feel) */}
                  <div
                    style={{
                      flex: 1,
                      padding: '24px 28px',
                      background: isHovered ? 'rgba(11, 13, 36, 0.85)' : 'rgba(11, 13, 36, 0.55)',
                      backdropFilter: 'blur(20px)',
                      borderRadius: isEven ? '28px 12px 28px 12px' : '12px 28px 12px 28px',
                      border: `1px solid ${isHovered ? stageColor : 'rgba(255, 255, 255, 0.08)'}`,
                      boxShadow: isHovered ? `0 12px 36px rgba(0, 0, 0, 0.5), 0 0 25px ${stageColor}33` : '0 8px 24px rgba(0, 0, 0, 0.3)',
                      transform: isHovered ? 'scale(1.02)' : 'scale(1)',
                      transition: 'all 200ms ease'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <span
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.72rem',
                          fontWeight: 700,
                          color: stageColor,
                          letterSpacing: '0.12em'
                        }}
                      >
                        STAGE 0{idx + 1} // {stage.stage.toUpperCase()}
                      </span>
                      <span style={{ fontSize: '1.2rem' }}>{stageIcons[idx]}</span>
                    </div>

                    <h3
                      className="font-display"
                      style={{
                        fontSize: '1.35rem',
                        color: 'var(--text-primary)',
                        marginBottom: '8px',
                        fontWeight: 700
                      }}
                    >
                      {stage.title}
                    </h3>

                    <p style={{ color: 'var(--moonlight)', fontSize: '0.94rem', lineHeight: 1.65, margin: 0, opacity: 0.9 }}>
                      {stage.content}
                    </p>
                  </div>

                  {/* Central Celestial Waypoint Orb */}
                  <div
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '50%',
                      background: isHovered ? stageColor : 'rgba(11, 13, 36, 0.9)',
                      border: `2px solid ${stageColor}`,
                      boxShadow: `0 0 ${isHovered ? '24px' : '12px'} ${stageColor}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: isHovered ? '#05060F' : stageColor,
                      fontSize: '1rem',
                      fontWeight: 800,
                      fontFamily: 'var(--font-mono)',
                      flexShrink: 0,
                      zIndex: 2,
                      transition: 'all 200ms ease'
                    }}
                  >
                    0{idx + 1}
                  </div>

                  {/* Spacer for symmetry */}
                  <div style={{ flex: 1, display: 'none' }} className="trajectory-spacer" />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Floating Black Box Flight Recorder (Organic Retro Capsule) */}
      <section
        style={{
          background: 'radial-gradient(ellipse at top, rgba(255, 107, 74, 0.12) 0%, rgba(11, 13, 36, 0.7) 70%)',
          backdropFilter: 'blur(20px)',
          borderRadius: '24px',
          border: '1px solid rgba(255, 107, 74, 0.35)',
          boxShadow: '0 16px 48px rgba(0, 0, 0, 0.6), 0 0 30px rgba(255, 107, 74, 0.12)',
          padding: '32px 36px',
          marginBottom: '60px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '1.6rem' }}>📼</span>
            <div>
              <h3
                className="font-display"
                style={{
                  fontSize: '1.3rem',
                  color: 'var(--solar-coral)',
                  letterSpacing: '0.04em',
                  margin: 0
                }}
              >
                BLACK BOX RECORDER: UNFILTERED POST-MORTEM
              </h3>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--asteroid-gray)', marginTop: '2px' }}>
                FLIGHT ANOMALIES &amp; ARCHITECTURAL HARDENING LOG
              </div>
            </div>
          </div>

          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.72rem',
              color: 'var(--solar-coral)',
              background: 'rgba(255, 107, 74, 0.1)',
              padding: '4px 12px',
              borderRadius: '16px',
              border: '1px solid rgba(255, 107, 74, 0.3)'
            }}
          >
            STATUS: DECRYPTED
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
          <div
            style={{
              background: 'rgba(255, 107, 74, 0.04)',
              padding: '20px 22px',
              borderRadius: '16px',
              border: '1px solid rgba(255, 107, 74, 0.2)'
            }}
          >
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--solar-coral)', marginBottom: '8px', fontWeight: 700 }}>
              CRITICAL ANOMALY // WHAT WENT WRONG:
            </div>
            <p style={{ fontSize: '0.94rem', color: 'var(--moonlight)', lineHeight: 1.65, margin: 0 }}>
              {project.blackBox.failure}
            </p>
          </div>

          <div
            style={{
              background: 'rgba(45, 226, 198, 0.04)',
              padding: '20px 22px',
              borderRadius: '16px',
              border: '1px solid rgba(45, 226, 198, 0.2)'
            }}
          >
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--aurora-teal)', marginBottom: '8px', fontWeight: 700 }}>
              SYSTEMIC RESOLUTION // PERMANENT LESSON:
            </div>
            <p style={{ fontSize: '0.94rem', color: 'var(--moonlight)', lineHeight: 1.65, margin: 0 }}>
              {project.blackBox.learning}
            </p>
          </div>
        </div>
      </section>

      {/* Orbital Nav Footer */}
      <footer
        style={{
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          paddingTop: '36px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px'
        }}
      >
        <button
          onClick={() => {
            sound.playClick();
            onNavigate('home');
          }}
          className="btn-secondary"
          style={{ borderRadius: '24px', padding: '10px 24px', fontFamily: 'var(--font-mono)', fontSize: '0.82rem' }}
        >
          ← Return to 3D Orbit Map
        </button>

        <button
          onClick={() => {
            sound.playPlanetChord(nextProject.planetType);
            onSelectProject(nextProject);
          }}
          className="btn-cosmic"
          style={{ borderRadius: '24px', padding: '10px 24px', fontFamily: 'var(--font-mono)', fontSize: '0.82rem' }}
        >
          Next Planet: {nextProject.title} →
        </button>
      </footer>
    </SubpageAtmosphere>
  );
}

