import { sound } from '../utils/audioEngine';
import { ASTRONAUT_PROFILE, PROJECTS_DATA, SKILLS_COCKPIT } from '../utils/mindverseData';
import SubpageAtmosphere from '../components/SubpageAtmosphere';
import {
  AsteroidPod,
  WhimsicalRocket,
  WhimsicalAsteroid,
  WhimsicalSatellite
} from '../components/CosmicWhimsyElements';

export default function FastLanePage({ onSelectProject, onNavigate }) {
  return (
    <SubpageAtmosphere
      nebulaColor1="rgba(27, 26, 85, 0.45)"
      nebulaColor2="rgba(255, 107, 74, 0.18)"
      accentGlow="rgba(255, 200, 87, 0.2)"
    >
      <div
        style={{
          maxWidth: '1040px',
          margin: '0 auto',
          padding: '100px 24px 80px 24px',
          fontFamily: 'var(--font-body)',
          position: 'relative'
        }}
      >
        {/* Floating probe & rocket accents */}
        <div style={{ position: 'absolute', top: '70px', right: '30px', opacity: 0.85 }}>
          <WhimsicalRocket size={46} angle={35} />
        </div>
        <div style={{ position: 'absolute', top: '130px', left: '15px', opacity: 0.8 }}>
          <WhimsicalAsteroid size={38} rotation={15} />
        </div>

        {/* Recruiter HUD Header */}
        <div
          style={{
            borderBottom: '2px dashed rgba(255, 107, 74, 0.4)',
            paddingBottom: '32px',
            marginBottom: '44px'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px' }}>
            <div>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.76rem',
                  color: 'var(--solar-coral)',
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  marginBottom: '12px',
                  background: 'rgba(255, 107, 74, 0.12)',
                  padding: '6px 16px',
                  borderRadius: '20px 10px 18px 8px',
                  border: '1.5px solid rgba(255, 107, 74, 0.4)'
                }}
              >
                <span>⚡</span>
                <span>FAST LANE // DIRECT ACCESS CONSOLE</span>
              </div>
              <h1
                className="font-display"
                style={{
                  fontSize: 'clamp(2.2rem, 4.5vw, 3.2rem)',
                  fontWeight: 800,
                  color: 'var(--text-primary)',
                  lineHeight: 1.2,
                  letterSpacing: '-0.02em'
                }}
              >
                {ASTRONAUT_PROFILE.name} — Full-Stack Developer
              </h1>
              <p
                style={{
                  fontSize: '1.1rem',
                  color: 'var(--text-secondary)',
                  marginTop: '12px',
                  maxWidth: '700px',
                  lineHeight: 1.6
                }}
              >
                {ASTRONAUT_PROFILE.dossier.oneLine}
              </p>
            </div>

            {/* Quick Action Buttons */}
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <a
                href="/resume.pdf"
                download="Tilak-Resume.pdf"
                onClick={() => sound.playClick()}
                style={{
                  padding: '12px 24px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.82rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  borderRadius: '24px',
                  background: 'linear-gradient(135deg, #FFC857 0%, #FF6B4A 100%)',
                  color: '#05060F',
                  fontWeight: 700,
                  textDecoration: 'none',
                  boxShadow: '0 0 20px rgba(255, 200, 87, 0.4)'
                }}
              >
                <span>Download Resume (PDF)</span>
                <span>↓</span>
              </a>
              <button
                onClick={() => {
                  sound.playClick();
                  onNavigate('contact');
                }}
                style={{
                  padding: '12px 22px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.82rem',
                  borderRadius: '24px',
                  border: '1.5px solid rgba(255, 107, 74, 0.4)',
                  background: 'rgba(255, 107, 74, 0.12)',
                  color: 'var(--solar-coral)',
                  cursor: 'pointer',
                  fontWeight: 600
                }}
              >
                Direct Message ✉
              </button>
            </div>
          </div>

          {/* Quick Facts Strip (Sculpted Capsule) */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '24px',
              marginTop: '28px',
              padding: '18px 24px',
              background: 'radial-gradient(circle at 10% 50%, rgba(27, 26, 85, 0.6) 0%, rgba(11, 13, 36, 0.85) 100%)',
              borderRadius: '28px 14px 24px 16px',
              border: '1.5px solid rgba(255, 255, 255, 0.1)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.84rem',
              color: 'var(--moonlight)',
              boxShadow: '0 12px 30px rgba(0, 0, 0, 0.4)'
            }}
          >
            <div>
              <strong style={{ color: 'var(--stardust-gold)' }}>LOCATION:</strong> {ASTRONAUT_PROFILE.homeBase}
            </div>
            <div>
              <strong style={{ color: 'var(--aurora-teal)' }}>STATUS:</strong> {ASTRONAUT_PROFILE.currentMission}
            </div>
            <div>
              <strong style={{ color: 'var(--ion-blue)' }}>STACK:</strong> React, Python, FastAPI, PostgreSQL, Three.js
            </div>
          </div>
        </div>

        {/* Flagship Projects Section in Sculpted AsteroidPods */}
        <section style={{ marginBottom: '56px' }}>
          <h2
            className="font-display"
            style={{
              fontSize: '1.8rem',
              color: 'var(--text-primary)',
              marginBottom: '28px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}
          >
            <span style={{ color: 'var(--stardust-gold)', fontFamily: 'var(--font-mono)', fontSize: '1.1rem' }}>01 //</span> Flagship Projects &amp; Verified Outcomes
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
            {PROJECTS_DATA.filter((p) => !p.unexplored).map((project, idx) => {
              const radii = [
                '38px 18px 34px 20px',
                '20px 38px 20px 34px',
                '34px 22px 38px 18px'
              ];
              const customRadius = radii[idx % radii.length];

              return (
                <AsteroidPod
                  key={project.slug}
                  accentColor={project.primaryColor}
                  onMouseEnter={() => sound.playHover()}
                  style={{
                    borderRadius: customRadius,
                    border: `1.5px solid ${project.primaryColor}44`,
                    boxShadow: `0 14px 40px rgba(0, 0, 0, 0.5), 0 0 25px ${project.primaryColor}15`
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px', marginBottom: '12px' }}>
                    <div>
                      <h3 className="font-display" style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
                        {project.title} <span style={{ fontSize: '1rem', color: 'var(--asteroid-gray)', fontWeight: 400 }}>— {project.subtitle}</span>
                      </h3>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: project.primaryColor, marginTop: '6px' }}>
                        {project.role} • {project.timeline}
                      </div>
                    </div>

                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.74rem',
                        fontWeight: 700,
                        padding: '5px 14px',
                        borderRadius: '16px',
                        background: 'rgba(255, 200, 87, 0.12)',
                        color: 'var(--stardust-gold)',
                        border: '1.5px solid rgba(255, 200, 87, 0.35)'
                      }}
                    >
                      {project.oneLineOutcome}
                    </span>
                  </div>

                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.98rem', margin: '14px 0 20px 0', lineHeight: 1.65 }}>
                    <strong style={{ color: 'var(--moonlight)' }}>Problem &amp; Architecture:</strong> {project.missionBrief.problem} {project.missionBrief.solution}
                  </p>

                  {/* Verified Metrics Pod (Organic capsule pill style) */}
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                      gap: '14px',
                      background: 'radial-gradient(circle at 10% 10%, rgba(5, 6, 15, 0.85) 0%, rgba(11, 13, 36, 0.7) 100%)',
                      padding: '16px 20px',
                      borderRadius: '24px 12px 20px 14px',
                      border: '1px dashed rgba(255, 255, 255, 0.1)',
                      marginBottom: '20px'
                    }}
                  >
                    {project.stats.map((stat, sIdx) => (
                      <div key={sIdx} style={{ fontFamily: 'var(--font-mono)' }}>
                        <div style={{ fontSize: '0.72rem', color: 'var(--asteroid-gray)', letterSpacing: '0.04em' }}>{stat.label}</div>
                        <div style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-primary)', marginTop: '3px' }}>{stat.value}</div>
                      </div>
                    ))}
                  </div>

                  {/* Tools & Case Study Launch */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px' }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                      {project.tools.map((tool) => (
                        <span
                          key={tool}
                          style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.72rem',
                            padding: '4px 12px',
                            borderRadius: '14px',
                            background: 'rgba(255, 255, 255, 0.05)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            color: 'var(--moonlight)'
                          }}
                        >
                          {tool}
                        </span>
                      ))}
                    </div>

                    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            fontSize: '0.82rem',
                            fontFamily: 'var(--font-mono)',
                            color: 'var(--ion-blue)',
                            textDecoration: 'none'
                          }}
                        >
                          Code Repo ↗
                        </a>
                      )}
                      <button
                        onClick={() => {
                          sound.playPlanetChord(project.planetType);
                          onSelectProject(project);
                        }}
                        style={{
                          background: 'rgba(255, 200, 87, 0.1)',
                          border: '1px solid rgba(255, 200, 87, 0.35)',
                          color: 'var(--stardust-gold)',
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.82rem',
                          fontWeight: 700,
                          cursor: 'pointer',
                          padding: '8px 16px',
                          borderRadius: '18px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}
                      >
                        <span>Full Case Study →</span>
                      </button>
                    </div>
                  </div>
                </AsteroidPod>
              );
            })}
          </div>
        </section>

        {/* Technical Skills Cockpit in Organic AsteroidPods */}
        <section style={{ marginBottom: '56px' }}>
          <h2
            className="font-display"
            style={{
              fontSize: '1.8rem',
              color: 'var(--text-primary)',
              marginBottom: '28px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}
          >
            <span style={{ color: 'var(--stardust-gold)', fontFamily: 'var(--font-mono)', fontSize: '1.1rem' }}>02 //</span> Technical Proficiency &amp; Daily Toolkit
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
            {/* Propulsion / Core */}
            <AsteroidPod accentColor="var(--solar-coral)" style={{ borderRadius: '36px 18px 32px 20px' }}>
              <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', color: 'var(--solar-coral)', letterSpacing: '0.08em', marginBottom: '18px' }}>
                PROPULSION (DAILY USE / CORE)
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {SKILLS_COCKPIT.propulsion.map((s, idx) => (
                  <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.92rem' }}>
                    <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{s.name}</span>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        padding: '3px 10px',
                        borderRadius: '14px',
                        background: s.level === 'Expert' ? 'rgba(45, 226, 198, 0.15)' : 'rgba(255, 200, 87, 0.15)',
                        color: s.level === 'Expert' ? 'var(--aurora-teal)' : 'var(--stardust-gold)',
                        border: `1px solid ${s.level === 'Expert' ? 'var(--aurora-teal)' : 'var(--stardust-gold)'}`
                      }}
                    >
                      {s.level.toUpperCase()}
                    </span>
                  </div>
                ))}
              </div>
            </AsteroidPod>

            {/* Navigation / Infra */}
            <AsteroidPod accentColor="var(--ion-blue)" style={{ borderRadius: '20px 36px 20px 32px' }}>
              <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', color: 'var(--ion-blue)', letterSpacing: '0.08em', marginBottom: '18px' }}>
                NAVIGATION (TOOLKIT &amp; INFRA)
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {SKILLS_COCKPIT.navigation.map((s, idx) => (
                  <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.92rem' }}>
                    <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{s.name}</span>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        padding: '3px 10px',
                        borderRadius: '14px',
                        background: 'rgba(76, 201, 240, 0.15)',
                        color: 'var(--ion-blue)',
                        border: '1px solid var(--ion-blue)'
                      }}
                    >
                      {s.level.toUpperCase()}
                    </span>
                  </div>
                ))}
              </div>
            </AsteroidPod>
          </div>
        </section>

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
