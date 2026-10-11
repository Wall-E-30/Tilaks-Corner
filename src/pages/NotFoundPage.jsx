import { sound } from '../utils/audioEngine';
import SubpageAtmosphere from '../components/SubpageAtmosphere';
import {
  AsteroidPod,
  WhimsicalAstronautFloating,
  WhimsicalAsteroid,
  WhimsicalRocket
} from '../components/CosmicWhimsyElements';

export default function NotFoundPage({ onNavigate }) {
  return (
    <SubpageAtmosphere
      nebulaColor1="rgba(255, 107, 74, 0.4)"
      nebulaColor2="rgba(27, 26, 85, 0.5)"
      accentGlow="rgba(255, 107, 74, 0.3)"
    >
      <div
        style={{
          maxWidth: '740px',
          margin: '0 auto',
          padding: '120px 24px 80px 24px',
          textAlign: 'center',
          fontFamily: 'var(--font-body)',
          position: 'relative'
        }}
      >
        <div style={{ position: 'absolute', top: '100px', left: '20px' }}>
          <WhimsicalAsteroid size={42} rotation={-35} />
        </div>

        <AsteroidPod
          accentColor="var(--solar-coral)"
          style={{
            padding: '50px 36px',
            borderRadius: '44px 22px 40px 20px',
            border: '2px solid rgba(255, 107, 74, 0.45)',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6), 0 0 35px rgba(255, 107, 74, 0.2)'
          }}
        >
          {/* Floating Spacewalker */}
          <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'center' }}>
            <WhimsicalAstronautFloating size={96} />
          </div>

          <div
            style={{
              display: 'inline-block',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.74rem',
              color: 'var(--solar-coral)',
              letterSpacing: '0.12em',
              background: 'rgba(255, 107, 74, 0.12)',
              padding: '5px 16px',
              borderRadius: '16px',
              border: '1px solid rgba(255, 107, 74, 0.35)',
              marginBottom: '14px'
            }}
          >
            ERROR 404 // TRAJECTORY LOSS DETECTED
          </div>

          <h1
            className="font-display"
            style={{
              fontSize: '2.6rem',
              fontWeight: 800,
              color: 'var(--text-primary)',
              marginBottom: '14px'
            }}
          >
            Lost in Space
          </h1>

          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.6, maxWidth: '520px', margin: '0 auto 32px auto' }}>
            "You drifted past the outer asteroid belt. Mission Control is recalibrating your thrusters to steer you home."
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <button
              onClick={() => {
                sound.playClick();
                onNavigate('home');
              }}
              style={{
                padding: '12px 28px',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.85rem',
                borderRadius: '24px',
                border: 'none',
                background: 'linear-gradient(135deg, #FFC857 0%, #FF6B4A 100%)',
                color: '#05060F',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 0 20px rgba(255, 200, 87, 0.4)'
              }}
            >
              <WhimsicalRocket size={18} angle={-45} />
              <span>Return to Solar Orbit</span>
            </button>

            <button
              onClick={() => {
                sound.playClick();
                onNavigate('fast-lane');
              }}
              style={{
                padding: '12px 24px',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.85rem',
                borderRadius: '24px',
                border: '1.5px solid rgba(255, 107, 74, 0.4)',
                background: 'rgba(255, 107, 74, 0.12)',
                color: 'var(--solar-coral)',
                cursor: 'pointer',
                fontWeight: 600
              }}
            >
              ⚡ Fast Lane Dossier
            </button>
          </div>
        </AsteroidPod>
      </div>
    </SubpageAtmosphere>
  );
}
