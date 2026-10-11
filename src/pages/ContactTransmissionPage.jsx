import { useState, useEffect } from 'react';
import { sound } from '../utils/audioEngine';
import { ASTRONAUT_PROFILE } from '../utils/mindverseData';
import SubpageAtmosphere from '../components/SubpageAtmosphere';
import { WhimsicalSatellite, WhimsicalAstronautFloating, AsteroidPod } from '../components/CosmicWhimsyElements';

export default function ContactTransmissionPage({ onNavigate }) {
  const [frequency, setFrequency] = useState('Internship');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [transmitting, setTransmitting] = useState(false);
  const [transmitted, setTransmitted] = useState(false);
  const [waveOffset, setWaveOffset] = useState(0);
  const [hasSecretClearance, setHasSecretClearance] = useState(false);

  const frequencies = [
    { id: 'Internship', label: '142.0 MHz: Summer Internship', channel: 'INTERNSHIP', mhz: '142.0 MHz', color: 'var(--aurora-teal)' },
    { id: 'Job', label: '108.5 MHz: Full-Time Engineering', channel: 'CAREER', mhz: '108.5 MHz', color: 'var(--ion-blue)' },
    { id: 'Collaboration', label: '98.2 MHz: Creative Hack / Collab', channel: 'COLLAB', mhz: '98.2 MHz', color: 'var(--magenta-nova)' },
    { id: 'Hi', label: '88.1 MHz: Explorer Comm / Say Hi', channel: 'CASUAL', mhz: '88.1 MHz', color: 'var(--stardust-gold)' }
  ];

  const currentFreqObj = frequencies.find(f => f.id === frequency) || frequencies[0];

  useEffect(() => {
    try {
      const hash = window.location.hash || '';
      if (hash.includes('clearance')) {
        setHasSecretClearance(true);
        setFrequency('Hi');
        setFormData((prev) => ({
          ...prev,
          message: 'STELLAR-CURIOUS: Commander Tilak, I decrypted your subspace transmission frequency! Excited to connect.'
        }));
      } else if (hash.includes('collab:')) {
        const raw = hash.replace(/^#/, '');
        const ideaTitle = decodeURIComponent(raw.split('collab:')[1] || '');
        setFrequency('Collaboration');
        setFormData((prev) => ({
          ...prev,
          message: `Commander Tilak, I saw your Moon of Ideas experiment "${ideaTitle}". Let's build this together!`
        }));
      }
    } catch {}
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setWaveOffset(prev => (prev + 1) % 100);
    }, 60);
    return () => clearInterval(timer);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    sound.playWarp();
    setTransmitting(true);

    setTimeout(() => {
      setTransmitting(false);
      setTransmitted(true);

      const subject = encodeURIComponent(`[${frequency} Transmission] from ${formData.name}`);
      const body = encodeURIComponent(`Commander Tilak,\n\n${formData.message}\n\nFrom: ${formData.name} (${formData.email})`);
      window.location.href = `mailto:${ASTRONAUT_PROFILE.coordinates.email}?subject=${subject}&body=${body}`;
    }, 1400);
  };

  return (
    <SubpageAtmosphere
      nebulaColor1="rgba(27, 26, 85, 0.45)"
      nebulaColor2="rgba(45, 226, 198, 0.25)"
      accentGlow="rgba(76, 201, 240, 0.3)"
      maxWidth="940px"
    >
      <div
        style={{
          margin: '0 auto',
          padding: '20px 12px 60px 12px',
          fontFamily: 'var(--font-body)'
        }}
      >
        {/* Header Telemetry with Floating Space Probe */}
        <div style={{ textAlign: 'center', marginBottom: '36px', position: 'relative' }}>
          <div className="zero-g-float" style={{ marginBottom: '14px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '16px' }}>
            <WhimsicalSatellite size={54} />
            <WhimsicalAstronautFloating size={48} />
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
            SUBSPACE TRANSMITTER DISH // CARRIER LOCKED
          </div>

          <h1
            className="font-display"
            style={{
              fontSize: 'clamp(2.4rem, 5.5vw, 4rem)',
              fontWeight: 800,
              color: 'var(--text-primary)',
              letterSpacing: '-0.02em',
              textShadow: '0 0 35px rgba(45, 226, 198, 0.25)',
              margin: '4px 0'
            }}
          >
            Open Transmission Radio
          </h1>
          <p
            style={{
              color: 'var(--text-secondary)',
              maxWidth: '640px',
              margin: '12px auto 0 auto',
              fontSize: '1rem',
              lineHeight: 1.6
            }}
          >
            Lock onto Commander Tilak's orbital carrier frequency to beam an inquiry, internship prospect, or high-level architecture dialogue.
          </p>

          {/* Light-Speed Lag Indicator */}
          <div
            style={{
              marginTop: '16px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '7px 18px',
              background: 'rgba(255, 200, 87, 0.08)',
              border: '1px solid rgba(255, 200, 87, 0.35)',
              borderRadius: '24px',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              color: 'var(--stardust-gold)',
              boxShadow: '0 0 16px rgba(255, 200, 87, 0.1)'
            }}
          >
            <span>📡</span>
            <span>SIGNAL LATENCY: Earth speed 0.0s // Mars orbit: ~12.4 min</span>
          </div>
        </div>

        {/* Secret Clearance Verified Banner */}
        {hasSecretClearance && (
          <div
            style={{
              marginBottom: '24px',
              padding: '14px 22px',
              borderRadius: '24px',
              border: '1.5px solid var(--aurora-teal)',
              background: 'radial-gradient(circle at 10% 10%, rgba(45, 226, 198, 0.2) 0%, rgba(5, 6, 15, 0.9) 100%)',
              boxShadow: '0 0 30px rgba(45, 226, 198, 0.35)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.8rem',
              color: 'var(--aurora-teal)',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textAlign: 'center'
            }}
          >
            <span>✦</span>
            <span>SECRET TRANSMISSION CLEARANCE VERIFIED // PRIORITY DISPATCH ACTIVE</span>
            <span>✦</span>
          </div>
        )}

        {/* Live Audio / Frequency Waveform Visualizer (Organic rounded dish display) */}
        <div
          style={{
            padding: '20px 28px',
            marginBottom: '32px',
            background: 'radial-gradient(ellipse at 50% 50%, rgba(27, 26, 85, 0.5) 0%, rgba(11, 13, 36, 0.85) 80%)',
            borderRadius: '28px',
            border: `1.5px solid ${currentFreqObj.color}55`,
            boxShadow: `0 8px 32px rgba(0, 0, 0, 0.5), 0 0 25px ${currentFreqObj.color}22`,
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.74rem', color: currentFreqObj.color, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: currentFreqObj.color,
                  boxShadow: `0 0 10px ${currentFreqObj.color}`
                }}
              />
              TRANSMITTER CARRIER: {currentFreqObj.mhz} [{currentFreqObj.channel}]
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--moonlight)' }}>
              SIGNAL STRENGTH: 99.4% (CARRIER LOCKED)
            </div>
          </div>

          {/* SVG Oscillating Waveform */}
          <div style={{ height: '42px', width: '100%', overflow: 'hidden' }}>
            <svg width="100%" height="100%" viewBox="0 0 800 42" preserveAspectRatio="none">
              {Array.from({ length: 48 }).map((_, i) => {
                const heightFactor = Math.abs(Math.sin((i + waveOffset * 0.4) * 0.35)) * 32 + 6;
                const xPos = i * (800 / 48) + 4;
                return (
                  <rect
                    key={i}
                    x={xPos}
                    y={21 - heightFactor / 2}
                    width={5}
                    height={heightFactor}
                    rx={2.5}
                    fill={currentFreqObj.color}
                    opacity={0.3 + (heightFactor / 38) * 0.7}
                  />
                );
              })}
            </svg>
          </div>
        </div>

        {/* Main Radio Interface Module (Organic Asteroid Pod, zero sharp boxes) */}
        <AsteroidPod accentColor="var(--aurora-teal)" style={{ padding: '36px 40px', marginBottom: '44px', borderRadius: '42% 26% 36% 28% / 32% 40% 26% 38%' }}>
          {/* Frequency Dial Selector */}
          <div style={{ marginBottom: '32px' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--asteroid-gray)', marginBottom: '14px', letterSpacing: '0.08em' }}>
              ✦ SELECT BROADCAST CARRIER FREQUENCY:
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: '14px' }}>
              {frequencies.map((freq) => {
                const isSelected = frequency === freq.id;
                return (
                  <button
                    key={freq.id}
                    type="button"
                    onClick={() => {
                      sound.playClick();
                      setFrequency(freq.id);
                    }}
                    onMouseEnter={() => sound.playHover()}
                    style={{
                      background: isSelected ? 'rgba(45, 226, 198, 0.16)' : 'rgba(255, 255, 255, 0.03)',
                      border: isSelected ? `1.5px solid ${freq.color}` : '1px solid rgba(255, 255, 255, 0.08)',
                      color: isSelected ? 'var(--text-primary)' : 'var(--text-secondary)',
                      borderRadius: '24px',
                      padding: '12px 16px',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.75rem',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'all 200ms ease',
                      boxShadow: isSelected ? `0 0 16px ${freq.color}33` : 'none'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontWeight: 700, color: isSelected ? freq.color : 'inherit' }}>{freq.channel}</span>
                      <span style={{ fontSize: '0.68rem', color: 'var(--stardust-gold)' }}>{freq.mhz}</span>
                    </div>
                    <div style={{ fontSize: '0.72rem', opacity: 0.8, marginTop: '4px' }}>{freq.label}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {transmitted ? (
            /* Confirmation Success State */
            <div
              style={{
                padding: '40px',
                textAlign: 'center',
                background: 'rgba(45, 226, 198, 0.08)',
                border: '1.5px solid var(--aurora-teal)',
                borderRadius: '32px',
                animation: 'fadeIn 300ms ease',
                boxShadow: '0 0 35px rgba(45, 226, 198, 0.25)'
              }}
            >
              <div style={{ fontSize: '3.2rem', marginBottom: '14px' }}>🛰️</div>
              <h3 className="font-display" style={{ fontSize: '1.8rem', color: 'var(--aurora-teal)', marginBottom: '10px' }}>
                Transmission Confirmed &amp; Logged!
              </h3>
              <p style={{ color: 'var(--moonlight)', fontSize: '1rem', maxWidth: '520px', margin: '0 auto 24px auto', lineHeight: 1.65 }}>
                Your transmission has been logged into Commander Tilak's orbital comm buffer. Expect an acknowledgment in approximately 48 Earth hours.
              </p>
              <button
                onClick={() => {
                  setTransmitted(false);
                  setFormData({ name: '', email: '', message: '' });
                }}
                className="btn-secondary"
                style={{
                  fontSize: '0.84rem',
                  fontFamily: 'var(--font-mono)',
                  padding: '10px 24px',
                  borderRadius: '24px'
                }}
              >
                Send Another Signal ⚡
              </button>
            </div>
          ) : (
            /* Subspace Radio Form (Organic rounded controls) */
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
                <div>
                  <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.74rem', color: 'var(--asteroid-gray)', marginBottom: '8px' }}>
                    ✦ CALL SIGN / YOUR NAME *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Explorer Jane Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '14px 18px',
                      background: 'rgba(5, 6, 15, 0.75)',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      borderRadius: '20px',
                      color: 'var(--text-primary)',
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.95rem',
                      outline: 'none',
                      transition: 'all 200ms ease'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = 'var(--aurora-teal)';
                      e.target.style.boxShadow = '0 0 14px rgba(45, 226, 198, 0.35)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'rgba(255, 255, 255, 0.12)';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.74rem', color: 'var(--asteroid-gray)', marginBottom: '8px' }}>
                    ✦ RETURN FREQUENCY (EMAIL) *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="jane@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '14px 18px',
                      background: 'rgba(5, 6, 15, 0.75)',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      borderRadius: '20px',
                      color: 'var(--text-primary)',
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.95rem',
                      outline: 'none',
                      transition: 'all 200ms ease'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = 'var(--aurora-teal)';
                      e.target.style.boxShadow = '0 0 14px rgba(45, 226, 198, 0.35)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'rgba(255, 255, 255, 0.12)';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.74rem', color: 'var(--asteroid-gray)', marginBottom: '8px' }}>
                  ✦ SUBSPACE TRANSMISSION MESSAGE *
                </label>
                <textarea
                  required
                  rows={5}
                  placeholder="Greetings Tilak, we saw your work on PRATYAKSHA and want to discuss our engineering openings..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '16px 20px',
                    background: 'rgba(5, 6, 15, 0.75)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    borderRadius: '24px',
                    color: 'var(--text-primary)',
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.96rem',
                    resize: 'vertical',
                    outline: 'none',
                    transition: 'all 200ms ease'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = 'var(--aurora-teal)';
                    e.target.style.boxShadow = '0 0 14px rgba(45, 226, 198, 0.35)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(255, 255, 255, 0.12)';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', paddingTop: '8px' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.74rem', color: 'var(--asteroid-gray)' }}>
                  Direct mailto fallback: <a href={`mailto:${ASTRONAUT_PROFILE.coordinates.email}`} style={{ color: 'var(--ion-blue)', textDecoration: 'none' }}>{ASTRONAUT_PROFILE.coordinates.email}</a>
                </div>

                <button
                  type="submit"
                  disabled={transmitting}
                  className="btn-cosmic"
                  style={{
                    padding: '14px 34px',
                    minWidth: '220px',
                    fontSize: '0.92rem',
                    borderRadius: '24px'
                  }}
                >
                  {transmitting ? 'Transmitting Beam... ⚡' : 'Transmit Signal →'}
                </button>
              </div>
            </form>
          )}
        </AsteroidPod>

        {/* Earth Coordinates: Floating Satellite Relay Probes (Zero boxy feeling) */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '20px',
            fontFamily: 'var(--font-mono)'
          }}
        >
          <a
            href={`mailto:${ASTRONAUT_PROFILE.coordinates.email}`}
            onMouseEnter={() => sound.playHover()}
            style={{
              padding: '20px 24px',
              textDecoration: 'none',
              color: 'inherit',
              background: 'rgba(11, 13, 36, 0.65)',
              backdropFilter: 'blur(16px)',
              borderRadius: '24px',
              border: '1.5px solid rgba(255, 200, 87, 0.35)',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.35)',
              transition: 'all 200ms ease'
            }}
          >
            <div style={{ fontSize: '0.7rem', color: 'var(--stardust-gold)', letterSpacing: '0.1em' }}>📡 EMAIL RELAY</div>
            <div style={{ fontSize: '0.92rem', color: 'var(--text-primary)', fontWeight: 600, marginTop: '6px' }}>
              {ASTRONAUT_PROFILE.coordinates.email}
            </div>
          </a>

          <a
            href={ASTRONAUT_PROFILE.coordinates.github}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => sound.playHover()}
            style={{
              padding: '20px 24px',
              textDecoration: 'none',
              color: 'inherit',
              background: 'rgba(11, 13, 36, 0.65)',
              backdropFilter: 'blur(16px)',
              borderRadius: '24px',
              border: '1.5px solid rgba(76, 201, 240, 0.35)',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.35)',
              transition: 'all 200ms ease'
            }}
          >
            <div style={{ fontSize: '0.7rem', color: 'var(--ion-blue)', letterSpacing: '0.1em' }}>🛰️ GITHUB COMM BEACON</div>
            <div style={{ fontSize: '0.92rem', color: 'var(--text-primary)', fontWeight: 600, marginTop: '6px' }}>
              github.com/tilak ↗
            </div>
          </a>

          <a
            href={ASTRONAUT_PROFILE.coordinates.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => sound.playHover()}
            style={{
              padding: '20px 24px',
              textDecoration: 'none',
              color: 'inherit',
              background: 'rgba(11, 13, 36, 0.65)',
              backdropFilter: 'blur(16px)',
              borderRadius: '24px',
              border: '1.5px solid rgba(45, 226, 198, 0.35)',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.35)',
              transition: 'all 200ms ease'
            }}
          >
            <div style={{ fontSize: '0.7rem', color: 'var(--aurora-teal)', letterSpacing: '0.1em' }}>🪐 LINKEDIN RADAR</div>
            <div style={{ fontSize: '0.92rem', color: 'var(--text-primary)', fontWeight: 600, marginTop: '6px' }}>
              linkedin.com/in/tilak ↗
            </div>
          </a>
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
