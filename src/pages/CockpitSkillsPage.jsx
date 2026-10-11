import { useState } from 'react';
import { sound } from '../utils/audioEngine';
import { SKILLS_COCKPIT } from '../utils/mindverseData';
import SubpageAtmosphere from '../components/SubpageAtmosphere';
import { WhimsicalRocket, WhimsicalAsteroid, WhimsicalSatellite, AsteroidPod } from '../components/CosmicWhimsyElements';

export default function CockpitSkillsPage({ onNavigate }) {
  const getLevelColor = (level) => {
    switch (level) {
      case 'Expert': return 'var(--aurora-teal)';
      case 'Confident': return 'var(--stardust-gold)';
      case 'Learning': return 'var(--magenta-nova)';
      default: return 'var(--ion-blue)';
    }
  };

  const getMeterFill = (level) => {
    switch (level) {
      case 'Expert': return 92;
      case 'Confident': return 75;
      case 'Learning': return 50;
      default: return 65;
    }
  };

  return (
    <SubpageAtmosphere
      nebulaColor1="rgba(27, 26, 85, 0.5)"
      nebulaColor2="rgba(76, 201, 240, 0.25)"
      accentGlow="rgba(45, 226, 198, 0.3)"
      maxWidth="1100px"
    >
      <div
        style={{
          margin: '0 auto',
          padding: '20px 12px 60px 12px',
          fontFamily: 'var(--font-body)'
        }}
      >
        {/* Header Telemetry & Central Floating Starship */}
        <div style={{ textAlign: 'center', marginBottom: '44px', position: 'relative' }}>
          {/* Central Spacecraft Powering the Cockpit */}
          <div className="zero-g-float" style={{ marginBottom: '16px' }}>
            <WhimsicalRocket size={64} angle={0} />
          </div>

          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 16px',
              background: 'rgba(45, 226, 198, 0.08)',
              border: '1px solid rgba(45, 226, 198, 0.35)',
              borderRadius: '24px',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.72rem',
              color: 'var(--aurora-teal)',
              letterSpacing: '0.14em',
              marginBottom: '12px',
              boxShadow: '0 0 16px rgba(45, 226, 198, 0.15)'
            }}
          >
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: 'var(--aurora-teal)',
                boxShadow: '0 0 8px var(--aurora-teal)'
              }}
            />
            STARSHIP FLIGHT DECK // TELEMETRY LINK ACTIVE
          </div>

          <h1
            className="font-display"
            style={{
              fontSize: 'clamp(2.4rem, 5.5vw, 4rem)',
              fontWeight: 800,
              color: 'var(--text-primary)',
              letterSpacing: '-0.02em',
              textShadow: '0 0 35px rgba(76, 201, 240, 0.25)',
              margin: '4px 0'
            }}
          >
            The Cockpit: Systems &amp; Propulsion
          </h1>
          <p
            style={{
              color: 'var(--text-secondary)',
              maxWidth: '680px',
              margin: '12px auto 0 auto',
              fontSize: '1rem',
              lineHeight: 1.6
            }}
          >
            Flight deck instruments gauging core technical engines and workflows. In accordance with the Mindverse Honesty Rule, all meters reflect verified production proficiencies rather than fabricated 99% sliders.
          </p>

          {/* Organic Floating Diagnostic Status Strip */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '12px',
              marginTop: '24px',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.74rem'
            }}
          >
            <span style={{ color: 'var(--aurora-teal)', background: 'rgba(45, 226, 198, 0.1)', padding: '5px 14px', borderRadius: '20px', border: '1px solid rgba(45, 226, 198, 0.25)' }}>
              🔥 THRUST: 100% NOMINAL
            </span>
            <span style={{ color: 'var(--ion-blue)', background: 'rgba(76, 201, 240, 0.1)', padding: '5px 14px', borderRadius: '20px', border: '1px solid rgba(76, 201, 240, 0.25)' }}>
              🧭 NAV-BEACON: LOCKED
            </span>
            <span style={{ color: 'var(--stardust-gold)', background: 'rgba(255, 200, 87, 0.1)', padding: '5px 14px', borderRadius: '20px', border: '1px solid rgba(255, 200, 87, 0.25)' }}>
              🛡️ LIFE SUPPORT: 100%
            </span>
            <span style={{ color: 'var(--magenta-nova)', background: 'rgba(224, 64, 160, 0.1)', padding: '5px 14px', borderRadius: '20px', border: '1px solid rgba(224, 64, 160, 0.25)' }}>
              ⛽ RESEARCH: ACTIVE
            </span>
          </div>
        </div>

        {/* Cockpit Systems: Organic Asteroid & Space Pod Layout (Zero box-in-a-box) */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '32px' }}>
          {/* Module 1: Propulsion Thrusters */}
          <AsteroidPod accentColor="var(--solar-coral)" style={{ borderRadius: '44% 20% 36% 24% / 28% 36% 24% 44%' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '24px' }}>
              <div
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '50%',
                  background: 'rgba(255, 107, 74, 0.15)',
                  border: '1.5px solid var(--solar-coral)',
                  boxShadow: '0 0 16px rgba(255, 107, 74, 0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.4rem'
                }}
              >
                🔥
              </div>
              <div>
                <h2 className="font-display" style={{ fontSize: '1.35rem', color: 'var(--text-primary)', margin: 0, fontWeight: 700 }}>
                  PROPULSION ENGINES
                </h2>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--solar-coral)', letterSpacing: '0.08em' }}>
                  DAILY-USE ENGINES &amp; CORE ARCHITECTURES
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {SKILLS_COCKPIT.propulsion.map((skill, idx) => {
                const fill = getMeterFill(skill.level);
                return (
                  <div
                    key={idx}
                    onMouseEnter={() => sound.playHover()}
                    style={{
                      background: 'rgba(255, 255, 255, 0.02)',
                      padding: '14px 16px',
                      borderRadius: '20px',
                      border: '1px solid rgba(255, 255, 255, 0.06)',
                      transition: 'all 200ms ease'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <span style={{ fontWeight: 600, color: 'var(--moonlight)', fontSize: '0.94rem' }}>{skill.name}</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--asteroid-gray)' }}>
                          {fill}% THRUST
                        </span>
                        <span
                          style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.7rem',
                            fontWeight: 700,
                            padding: '2px 8px',
                            borderRadius: '12px',
                            background: `${getLevelColor(skill.level)}18`,
                            color: getLevelColor(skill.level),
                            border: `1px solid ${getLevelColor(skill.level)}`
                          }}
                        >
                          {skill.level.toUpperCase()}
                        </span>
                      </div>
                    </div>

                    {/* Rocket Exhaust Flame Thrust Gauge */}
                    <div
                      style={{
                        width: '100%',
                        height: '8px',
                        background: 'rgba(5, 6, 15, 0.8)',
                        borderRadius: '10px',
                        overflow: 'hidden',
                        padding: '1px',
                        border: '1px solid rgba(255, 107, 74, 0.25)'
                      }}
                    >
                      <div
                        style={{
                          width: `${fill}%`,
                          height: '100%',
                          borderRadius: '8px',
                          background: `linear-gradient(90deg, var(--solar-coral), ${getLevelColor(skill.level)})`,
                          boxShadow: `0 0 12px rgba(255, 107, 74, 0.7)`
                        }}
                      />
                    </div>
                    <div style={{ fontSize: '0.76rem', color: 'var(--asteroid-gray)', marginTop: '6px' }}>
                      {skill.desc}
                    </div>
                  </div>
                );
              })}
            </div>
          </AsteroidPod>

          {/* Module 2: Navigation Radar */}
          <AsteroidPod accentColor="var(--ion-blue)" style={{ borderRadius: '24% 40% 20% 36% / 36% 22% 42% 28%' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '24px' }}>
              <div
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '50%',
                  background: 'rgba(76, 201, 240, 0.15)',
                  border: '1.5px solid var(--ion-blue)',
                  boxShadow: '0 0 16px rgba(76, 201, 240, 0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.4rem'
                }}
              >
                🧭
              </div>
              <div>
                <h2 className="font-display" style={{ fontSize: '1.35rem', color: 'var(--text-primary)', margin: 0, fontWeight: 700 }}>
                  NAVIGATION RADAR
                </h2>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--ion-blue)', letterSpacing: '0.08em' }}>
                  TOOLKIT, INFRASTRUCTURE &amp; WORKFLOWS
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {SKILLS_COCKPIT.navigation.map((tool, idx) => {
                const fill = getMeterFill(tool.level);
                return (
                  <div
                    key={idx}
                    onMouseEnter={() => sound.playHover()}
                    style={{
                      background: 'rgba(255, 255, 255, 0.02)',
                      padding: '14px 16px',
                      borderRadius: '20px',
                      border: '1px solid rgba(255, 255, 255, 0.06)',
                      transition: 'all 200ms ease'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <span style={{ fontWeight: 600, color: 'var(--moonlight)', fontSize: '0.94rem' }}>{tool.name}</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--asteroid-gray)' }}>
                          {fill}% RADAR
                        </span>
                        <span
                          style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.7rem',
                            fontWeight: 700,
                            padding: '2px 8px',
                            borderRadius: '12px',
                            background: `${getLevelColor(tool.level)}18`,
                            color: getLevelColor(tool.level),
                            border: `1px solid ${getLevelColor(tool.level)}`
                          }}
                        >
                          {tool.level.toUpperCase()}
                        </span>
                      </div>
                    </div>

                    <div
                      style={{
                        width: '100%',
                        height: '8px',
                        background: 'rgba(5, 6, 15, 0.8)',
                        borderRadius: '10px',
                        overflow: 'hidden',
                        padding: '1px',
                        border: '1px solid rgba(76, 201, 240, 0.25)'
                      }}
                    >
                      <div
                        style={{
                          width: `${fill}%`,
                          height: '100%',
                          borderRadius: '8px',
                          background: 'linear-gradient(90deg, var(--nebula-indigo), var(--ion-blue))',
                          boxShadow: '0 0 12px rgba(76, 201, 240, 0.7)'
                        }}
                      />
                    </div>
                    <div style={{ fontSize: '0.76rem', color: 'var(--asteroid-gray)', marginTop: '6px' }}>
                      {tool.desc}
                    </div>
                  </div>
                );
              })}
            </div>
          </AsteroidPod>

          {/* Module 3: Life Support Pods */}
          <AsteroidPod accentColor="var(--aurora-teal)" style={{ borderRadius: '34% 22% 40% 18% / 22% 38% 26% 40%' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '24px' }}>
              <div
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '50%',
                  background: 'rgba(45, 226, 198, 0.15)',
                  border: '1.5px solid var(--aurora-teal)',
                  boxShadow: '0 0 16px rgba(45, 226, 198, 0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.4rem'
                }}
              >
                🛡️
              </div>
              <div>
                <h2 className="font-display" style={{ fontSize: '1.35rem', color: 'var(--text-primary)', margin: 0, fontWeight: 700 }}>
                  LIFE SUPPORT BIOSPHERES
                </h2>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--aurora-teal)', letterSpacing: '0.08em' }}>
                  TEAM COMMUNICATION &amp; HUMAN SYNERGY
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {SKILLS_COCKPIT.lifeSupport.map((ls, idx) => (
                <div
                  key={idx}
                  onMouseEnter={() => sound.playHover()}
                  style={{
                    background: 'rgba(45, 226, 198, 0.04)',
                    padding: '18px 20px',
                    borderRadius: '24px',
                    border: '1px solid rgba(45, 226, 198, 0.25)',
                    transition: 'all 200ms ease'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <span style={{ fontWeight: 600, color: 'var(--moonlight)', fontSize: '0.94rem' }}>{ls.name}</span>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        color: 'var(--aurora-teal)',
                        padding: '2px 10px',
                        background: 'rgba(45, 226, 198, 0.12)',
                        borderRadius: '12px',
                        border: '1px solid var(--aurora-teal)'
                      }}
                    >
                      {ls.level.toUpperCase()}
                    </span>
                  </div>
                  <p style={{ fontSize: '0.82rem', color: 'var(--asteroid-gray)', lineHeight: 1.55, margin: 0 }}>
                    {ls.desc}
                  </p>
                </div>
              ))}
            </div>
          </AsteroidPod>

          {/* Module 4: Fuel Gauge & Warp Rods */}
          <AsteroidPod accentColor="var(--magenta-nova)" style={{ borderRadius: '20% 36% 22% 44% / 38% 24% 40% 22%' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '24px' }}>
              <div
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '50%',
                  background: 'rgba(224, 64, 160, 0.15)',
                  border: '1.5px solid var(--magenta-nova)',
                  boxShadow: '0 0 16px rgba(224, 64, 160, 0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.4rem'
                }}
              >
                ⛽
              </div>
              <div>
                <h2 className="font-display" style={{ fontSize: '1.35rem', color: 'var(--text-primary)', margin: 0, fontWeight: 700 }}>
                  WARP CORE FUEL RODS
                </h2>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--magenta-nova)', letterSpacing: '0.08em' }}>
                  ACTIVE RESEARCH &amp; LEARNING HORIZONS
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {SKILLS_COCKPIT.fuelGauge.map((fg, idx) => (
                <div
                  key={idx}
                  onMouseEnter={() => sound.playHover()}
                  style={{
                    background: 'rgba(224, 64, 160, 0.05)',
                    padding: '18px 20px',
                    borderRadius: '24px',
                    border: '1px solid rgba(224, 64, 160, 0.3)',
                    transition: 'all 200ms ease'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '0.94rem' }}>{fg.name}</span>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        color: 'var(--stardust-gold)',
                        padding: '2px 10px',
                        borderRadius: '12px',
                        background: 'rgba(255, 200, 87, 0.12)',
                        border: '1px solid rgba(255, 200, 87, 0.35)'
                      }}
                    >
                      ETA: {fg.eta}
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span
                      style={{
                        width: '7px',
                        height: '7px',
                        borderRadius: '50%',
                        background: 'var(--magenta-nova)',
                        boxShadow: '0 0 8px var(--magenta-nova)'
                      }}
                    />
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--magenta-nova)' }}>
                      STATUS: {fg.progress}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </AsteroidPod>
        </div>

        {/* Return to Orbit Trigger */}
        <div style={{ textAlign: 'center', marginTop: '56px' }}>
          <button
            onClick={() => {
              sound.playClick();
              onNavigate('home');
            }}
            className="btn-secondary"
            style={{
              padding: '12px 32px',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.85rem',
              borderRadius: '24px'
            }}
          >
            ← Return to Orbit
          </button>
        </div>
      </div>
    </SubpageAtmosphere>
  );
}
