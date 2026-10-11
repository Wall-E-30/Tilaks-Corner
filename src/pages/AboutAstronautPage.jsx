import { useState } from 'react';
import { sound } from '../utils/audioEngine';
import { ASTRONAUT_PROFILE } from '../utils/mindverseData';
import SubpageAtmosphere from '../components/SubpageAtmosphere';
import {
  AsteroidPod,
  WhimsicalAstronautFloating,
  WhimsicalRocket,
  WhimsicalSatellite,
  WhimsicalAsteroid
} from '../components/CosmicWhimsyElements';

export default function AboutAstronautPage({ onNavigate }) {
  const [bioLength, setBioLength] = useState('short'); // 'oneLine' | 'short' | 'full'

  return (
    <SubpageAtmosphere
      nebulaColor1="#7A3FB8"
      nebulaColor2="#1B1A55"
      accentGlow="#FFC857"
      maxWidth="1120px"
    >
      <div style={{ position: 'relative' }}>
        {/* Whimsical celestial elements */}
        <div style={{ position: 'absolute', top: '10px', right: '20px', opacity: 0.85 }}>
          <WhimsicalSatellite size={50} />
        </div>
        <div style={{ position: 'absolute', top: '80px', left: '10px', opacity: 0.8 }}>
          <WhimsicalAsteroid size={42} rotation={40} />
        </div>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '38px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '8px 20px',
              background: 'radial-gradient(circle, rgba(255, 200, 87, 0.15) 0%, rgba(11, 13, 36, 0.85) 100%)',
              border: '1.5px solid rgba(255, 200, 87, 0.4)',
              borderRadius: '26px 14px 24px 16px',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.74rem',
              color: 'var(--stardust-gold)',
              letterSpacing: '0.12em',
              marginBottom: '16px',
              boxShadow: '0 0 24px rgba(255, 200, 87, 0.16)'
            }}
          >
            <span
              style={{
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                background: 'var(--stardust-gold)',
                boxShadow: '0 0 10px var(--stardust-gold)'
              }}
            />
            PERSONNEL DOSSIER // MISSION COMMANDER FLIGHT LOG
          </div>

          <h1
            className="font-display"
            style={{
              fontSize: 'clamp(2.4rem, 5.5vw, 4rem)',
              fontWeight: 800,
              color: 'var(--text-primary)',
              textShadow: '0 0 35px rgba(122, 63, 184, 0.5)',
              letterSpacing: '-0.02em',
              margin: '4px 0'
            }}
          >
            Commander Profile &amp; Mission History
          </h1>
          <p style={{ color: 'var(--asteroid-gray)', maxWidth: '640px', margin: '14px auto 0 auto', fontSize: '1rem', lineHeight: 1.6 }}>
            Engineering credentials, hackathon victories, and academic trajectory inside the Mindverse.
          </p>
        </div>

        {/* Free-Floating Zero-G Astronaut Dossier (Organic contours, vector spacewalker) */}
        <section style={{ marginBottom: '56px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '36px', flexWrap: 'wrap', marginBottom: '32px' }}>
            {/* Handcrafted Vector Astronaut Floating in Zero-G Orbit */}
            <div
              className="zero-g-float"
              style={{
                position: 'relative',
                width: '140px',
                height: '140px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}
            >
              {/* Spinning Orbit Rings */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: '50%',
                  border: '2px dashed var(--stardust-gold)',
                  boxShadow: '0 0 25px rgba(255, 200, 87, 0.3)',
                  animation: 'spinOrbitClockwise 30s linear infinite'
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: '12px',
                  borderRadius: '50%',
                  border: '1.5px dashed rgba(45, 226, 198, 0.4)',
                  animation: 'spinOrbitCounter 20s linear infinite'
                }}
              />

              {/* Handcrafted Vector Floating Astronaut */}
              <WhimsicalAstronautFloating size={105} />
            </div>

            <div style={{ flex: 1, minWidth: '280px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.74rem',
                    color: 'var(--solar-coral)',
                    letterSpacing: '0.14em',
                    fontWeight: 700,
                    background: 'rgba(255, 107, 74, 0.12)',
                    padding: '4px 12px',
                    borderRadius: '16px',
                    border: '1.5px solid rgba(255, 107, 74, 0.35)'
                  }}
                >
                  CALL SIGN: {ASTRONAUT_PROFILE.callSign}
                </span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.74rem', color: 'var(--aurora-teal)' }}>
                  HOME BASE: {ASTRONAUT_PROFILE.homeBase}
                </span>
              </div>

              <h2 className="font-display" style={{ fontSize: '2.7rem', fontWeight: 800, color: 'var(--text-primary)', margin: '4px 0' }}>
                {ASTRONAUT_PROFILE.name}
              </h2>
              <p style={{ fontSize: '1.1rem', color: 'var(--moonlight)', margin: '4px 0 0 0' }}>
                Full-Stack Developer &amp; Autonomous Systems Explorer
              </p>
            </div>
          </div>

          {/* Current Mission Directive (Sculpted Pebble Ribbon) */}
          <div
            style={{
              background: 'radial-gradient(circle at 10% 50%, rgba(255, 200, 87, 0.15) 0%, rgba(11, 13, 36, 0.7) 100%)',
              border: '1.5px solid rgba(255, 200, 87, 0.35)',
              borderRadius: '34px 16px 30px 18px',
              padding: '22px 28px',
              marginBottom: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '18px',
              boxShadow: '0 12px 35px rgba(0, 0, 0, 0.4), 0 0 20px rgba(255, 200, 87, 0.1)'
            }}
          >
            <div>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--stardust-gold)', letterSpacing: '0.08em' }}>
                ✦ CURRENT MISSION DIRECTIVE:
              </span>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.08rem', color: 'var(--text-primary)', fontWeight: 700, marginTop: '4px' }}>
                {ASTRONAUT_PROFILE.currentMission}
              </div>
            </div>

            <a
              href="/resume.pdf"
              download="Tilak-Resume.pdf"
              onClick={() => sound.playClick()}
              style={{
                padding: '12px 24px',
                fontSize: '0.82rem',
                borderRadius: '24px',
                textDecoration: 'none',
                fontFamily: 'var(--font-mono)',
                background: 'linear-gradient(135deg, #FFC857 0%, #FF6B4A 100%)',
                color: '#05060F',
                fontWeight: 700,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 0 20px rgba(255, 200, 87, 0.4)'
              }}
            >
              <span>Download Mission Dossier (Resume)</span>
              <span>↓</span>
            </a>
          </div>

          {/* Bio in 3 Lengths Interactive Switcher in AsteroidPod */}
          <AsteroidPod accentColor="var(--stardust-gold)" style={{ borderRadius: '38px 20px 34px 22px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '14px', marginBottom: '18px' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.74rem', color: 'var(--stardust-gold)', letterSpacing: '0.08em' }}>
                ✦ BIO TELEMETRY DEPTH:
              </span>
              <div style={{ display: 'flex', gap: '8px' }}>
                {[
                  { id: 'oneLine', label: '1-Line Hook' },
                  { id: 'short', label: 'Brief Dossier' },
                  { id: 'full', label: 'Full Log' }
                ].map((b) => (
                  <button
                    key={b.id}
                    onClick={() => {
                      sound.playClick();
                      setBioLength(b.id);
                    }}
                    onMouseEnter={() => sound.playHover()}
                    style={{
                      background: bioLength === b.id ? 'var(--stardust-gold)' : 'rgba(255, 255, 255, 0.05)',
                      border: bioLength === b.id ? '1px solid var(--stardust-gold)' : '1px solid rgba(255, 255, 255, 0.1)',
                      color: bioLength === b.id ? '#05060F' : 'var(--text-secondary)',
                      borderRadius: '20px',
                      padding: '8px 18px',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.76rem',
                      fontWeight: bioLength === b.id ? 700 : 500,
                      cursor: 'pointer',
                      boxShadow: bioLength === b.id ? '0 0 16px rgba(255, 200, 87, 0.4)' : 'none',
                      transition: 'all 200ms ease'
                    }}
                  >
                    {b.label}
                  </button>
                ))}
              </div>
            </div>

            <div
              style={{
                fontSize: '1.05rem',
                lineHeight: 1.85,
                color: 'var(--moonlight)'
              }}
            >
              {bioLength === 'oneLine' && ASTRONAUT_PROFILE.dossier.oneLine}
              {bioLength === 'short' && ASTRONAUT_PROFILE.dossier.shortBio}
              {bioLength === 'full' && ASTRONAUT_PROFILE.dossier.fullStory}
            </div>
          </AsteroidPod>
        </section>

        {/* Mission History Timeline with AsteroidPods (No generic rectangles) */}
        <section style={{ marginBottom: '64px' }}>
          <h2 className="font-display" style={{ fontSize: '2.1rem', color: 'var(--text-primary)', marginBottom: '32px', fontWeight: 800 }}>
            Mission History &amp; Battle Patches
          </h2>

          <div style={{ position: 'relative', borderLeft: '2px dashed rgba(255, 200, 87, 0.45)', marginLeft: '22px', paddingLeft: '40px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {ASTRONAUT_PROFILE.timeline.map((m, idx) => {
              const radii = [
                '36px 18px 32px 20px',
                '20px 36px 18px 32px',
                '34px 20px 36px 18px',
                '18px 34px 22px 36px'
              ];
              const radius = radii[idx % radii.length];

              return (
                <div key={idx} style={{ position: 'relative' }} onMouseEnter={() => sound.playHover()}>
                  {/* Glowing Orbit Beacon Dot */}
                  <div
                    style={{
                      position: 'absolute',
                      left: '-51px',
                      top: '16px',
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      background: 'var(--stardust-gold)',
                      border: '3px solid var(--void-black)',
                      boxShadow: '0 0 18px var(--stardust-gold)'
                    }}
                  />

                  <AsteroidPod
                    accentColor="var(--stardust-gold)"
                    style={{
                      borderRadius: radius,
                      padding: '26px 30px'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                      <span
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.74rem',
                          color: 'var(--stardust-gold)',
                          fontWeight: 700,
                          background: 'rgba(255, 200, 87, 0.12)',
                          padding: '4px 12px',
                          borderRadius: '16px',
                          border: '1px solid rgba(255, 200, 87, 0.35)'
                        }}
                      >
                        [{m.badge}]
                      </span>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', color: 'var(--asteroid-gray)' }}>
                        {m.year}
                      </span>
                    </div>

                    <h3 className="font-display" style={{ fontSize: '1.4rem', color: 'var(--text-primary)', marginBottom: '6px', fontWeight: 700 }}>
                      {m.title}
                    </h3>
                    <div style={{ fontSize: '0.86rem', color: 'var(--aurora-teal)', fontFamily: 'var(--font-mono)', marginBottom: '12px' }}>
                      {m.role} • {m.category}
                    </div>
                    <p style={{ fontSize: '0.96rem', color: 'var(--moonlight)', lineHeight: 1.65, margin: 0 }}>
                      {m.summary}
                    </p>
                  </AsteroidPod>
                </div>
              );
            })}
          </div>
        </section>

        {/* Flight Log & Certifications (Organic Asteroid Pebble Badges) */}
        <section style={{ marginBottom: '56px' }}>
          <h2 className="font-display" style={{ fontSize: '1.9rem', color: 'var(--text-primary)', marginBottom: '24px', fontWeight: 800 }}>
            Flight Log: Certifications &amp; Deep Studies
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            {ASTRONAUT_PROFILE.flightLog.map((log, idx) => (
              <AsteroidPod
                key={idx}
                accentColor="var(--aurora-teal)"
                onMouseEnter={() => sound.playHover()}
                style={{
                  borderRadius: idx % 2 === 0 ? '34px 16px 30px 18px' : '18px 34px 16px 30px',
                  padding: '24px'
                }}
              >
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--aurora-teal)' }}>
                  ✦ {log.year} // VERIFIED CREDENTIAL
                </div>
                <div className="font-display" style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '1.2rem', margin: '10px 0 6px 0' }}>
                  {log.title}
                </div>
                <div style={{ fontSize: '0.86rem', color: 'var(--asteroid-gray)' }}>
                  {log.issuer}
                </div>
              </AsteroidPod>
            ))}
          </div>
        </section>

        {/* Return Button */}
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
            <span>← Return to Solar Orbit</span>
          </button>
        </div>
      </div>
    </SubpageAtmosphere>
  );
}
