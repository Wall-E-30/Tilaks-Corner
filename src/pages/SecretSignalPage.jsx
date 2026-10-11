import { sound } from '../utils/audioEngine';
import SubpageAtmosphere from '../components/SubpageAtmosphere';
import {
  AsteroidPod,
  WhimsicalRocket,
  WhimsicalSatellite,
  WhimsicalAsteroid
} from '../components/CosmicWhimsyElements';

export default function SecretSignalPage({ onNavigate }) {
  return (
    <SubpageAtmosphere
      nebulaColor1="rgba(45, 226, 198, 0.45)"
      nebulaColor2="rgba(27, 26, 85, 0.5)"
      accentGlow="rgba(45, 226, 198, 0.3)"
    >
      <div
        style={{
          maxWidth: '860px',
          margin: '0 auto',
          padding: '110px 24px 80px 24px',
          fontFamily: 'var(--font-mono)',
          position: 'relative'
        }}
      >
        <div style={{ position: 'absolute', top: '90px', right: '40px' }}>
          <WhimsicalSatellite size={50} />
        </div>
        <div style={{ position: 'absolute', top: '140px', left: '20px' }}>
          <WhimsicalAsteroid size={38} rotation={20} />
        </div>

        <AsteroidPod
          accentColor="var(--aurora-teal)"
          style={{
            padding: '44px 38px',
            borderRadius: '42px 20px 38px 22px',
            border: '2px solid rgba(45, 226, 198, 0.5)',
            boxShadow: '0 0 50px rgba(45, 226, 198, 0.25), 0 20px 50px rgba(0, 0, 0, 0.6)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--aurora-teal)', marginBottom: '18px' }}>
            <span style={{ fontSize: '1.4rem' }}>✦</span>
            <span style={{ fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.12em' }}>
              SECRET SIGNAL // DEEP SPACE FREQUENCY DECRYPTED
            </span>
          </div>

          <h1
            className="font-display"
            style={{
              fontSize: '2.4rem',
              fontWeight: 800,
              color: 'var(--text-primary)',
              marginBottom: '16px'
            }}
          >
            Congratulations, Space Explorer!
          </h1>

          <p style={{ fontFamily: 'var(--font-body)', fontSize: '1.05rem', color: 'var(--moonlight)', lineHeight: 1.65, marginBottom: '28px' }}>
            You either caught shooting stars or successfully tapped into Commander Tilak's encrypted subspace telemetry channel. 
            Curiosity is the exact attribute that drives great software engineering and breakthroughs.
          </p>

          {/* Easter Egg Logs in Sculpted Capsule */}
          <div
            style={{
              background: 'radial-gradient(circle at 10% 10%, rgba(5, 6, 15, 0.95) 0%, rgba(11, 13, 36, 0.8) 100%)',
              border: '1.5px dashed rgba(45, 226, 198, 0.4)',
              borderRadius: '26px 14px 22px 14px',
              padding: '24px',
              fontSize: '0.84rem',
              color: 'var(--stardust-gold)',
              lineHeight: 1.8,
              marginBottom: '32px'
            }}
          >
            <div>&gt; DECRYPTING HIDDEN LOG #42... [OK]</div>
            <div>&gt; ORIGIN: Tilak's Workbench (2:14 AM)</div>
            <div>&gt; MESSAGE: "If you're reading this, reach out via the Transmission array and mention keyword 'STELLAR-CURIOUS' for an instant priority response."</div>
            <div>&gt; SYSTEM STATUS: All celestial orbits operational. Thrusters at 100%.</div>
          </div>

          <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
            <button
              onClick={() => {
                sound.playClick();
                try {
                  window.location.hash = 'clearance';
                } catch {}
                onNavigate('contact');
              }}
              style={{
                padding: '12px 26px',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.82rem',
                borderRadius: '24px',
                border: 'none',
                background: 'linear-gradient(135deg, #2DE2C6 0%, #4CC9F0 100%)',
                color: '#05060F',
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: '0 0 20px rgba(45, 226, 198, 0.4)'
              }}
            >
              Claim Secret Transmission Clearance 📡
            </button>

            <button
              onClick={() => {
                sound.playClick();
                onNavigate('home');
              }}
              style={{
                padding: '12px 26px',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.82rem',
                borderRadius: '24px',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                background: 'rgba(255, 255, 255, 0.05)',
                color: 'var(--text-secondary)',
                cursor: 'pointer'
              }}
            >
              ← Return to Orbit
            </button>
          </div>
        </AsteroidPod>
      </div>
    </SubpageAtmosphere>
  );
}
