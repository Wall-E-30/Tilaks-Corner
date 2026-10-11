import { useState } from 'react';
import { sound } from '../utils/audioEngine';
import { UNFINISHED_IDEAS } from '../utils/mindverseData';
import SubpageAtmosphere from '../components/SubpageAtmosphere';
import {
  AsteroidPod,
  WhimsicalAsteroid,
  WhimsicalSatellite,
  WhimsicalRocket,
  WhimsicalUFO
} from '../components/CosmicWhimsyElements';

export default function LabExperimentsPage({ onNavigate }) {
  const [activeTab, setActiveTab] = useState('moon'); // 'moon' | 'lab'
  const [copiedIdea, setCopiedIdea] = useState(null);

  const labNotes = [
    {
      title: "Canvas Particle Emitter in 45 Lines",
      date: "Spring 2026",
      desc: "Built a zero-dependency 2D particle simulation simulating zero-gravity orbital mechanics for web interfaces.",
      tag: "Code Toy",
      color: "var(--aurora-teal)"
    },
    {
      title: "Audio Synthesizer Harmonics",
      date: "Winter 2025",
      desc: "Profiling Web Audio API oscillators to generate real-time ambient drones without downloading MP3 loops.",
      tag: "DSP / Audio",
      color: "var(--stardust-gold)"
    },
    {
      title: "Air Gesture Media Control Test",
      date: "Autumn 2024",
      desc: "Running MediaPipe hands over local webcam streams to map pinch gestures to YouTube playback.",
      tag: "Vision / HCI",
      color: "var(--solar-coral)"
    }
  ];

  return (
    <SubpageAtmosphere
      nebulaColor1="rgba(27, 26, 85, 0.45)"
      nebulaColor2="rgba(255, 200, 87, 0.18)"
      accentGlow="rgba(255, 200, 87, 0.25)"
    >
      <div
        style={{
          maxWidth: '1120px',
          margin: '0 auto',
          padding: '100px 24px 80px 24px',
          fontFamily: 'var(--font-body)',
          position: 'relative'
        }}
      >
        {/* Floating probe & UFO whimsical accents */}
        <div style={{ position: 'absolute', top: '70px', right: '40px', opacity: 0.85 }}>
          <WhimsicalSatellite size={54} />
        </div>
        <div style={{ position: 'absolute', top: '120px', left: '20px', opacity: 0.8 }}>
          <WhimsicalAsteroid size={48} rotation={25} />
        </div>

        {/* Lunar Outpost Header */}
        <div style={{ textAlign: 'center', marginBottom: '40px', position: 'relative' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '8px 20px',
              background: 'radial-gradient(circle, rgba(255, 200, 87, 0.14) 0%, rgba(11, 13, 36, 0.85) 100%)',
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
            SECTOR 9 // LUNAR CRATER EXPERIMENTS &amp; UNRESOLVED PROTOTYPES
          </div>

          <h1
            className="font-display"
            style={{
              fontSize: 'clamp(2.4rem, 5vw, 3.8rem)',
              fontWeight: 800,
              color: 'var(--text-primary)',
              letterSpacing: '-0.02em',
              textShadow: '0 0 32px rgba(255, 200, 87, 0.25)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '16px',
              flexWrap: 'wrap'
            }}
          >
            <span>Moon of Ideas</span>
            <span style={{ fontSize: '2rem', opacity: 0.8 }}>&amp;</span>
            <span style={{ color: 'var(--stardust-gold)' }}>Experimental Craters</span>
          </h1>

          <p
            style={{
              color: 'var(--text-secondary)',
              maxWidth: '680px',
              margin: '14px auto 0 auto',
              fontSize: '1rem',
              lineHeight: 1.6
            }}
          >
            Where calculated risks crash-land, unproven hypotheses are stress-tested, and ideas orbit without corporate constraints.
          </p>

          {/* Whimsical Capsule Pill Switcher */}
          <div style={{ display: 'inline-flex', gap: '8px', marginTop: '28px', background: 'rgba(5, 6, 15, 0.7)', padding: '6px', borderRadius: '30px', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
            <button
              onClick={() => {
                sound.playClick();
                setActiveTab('moon');
              }}
              onMouseEnter={() => sound.playHover()}
              style={{
                fontSize: '0.82rem',
                padding: '10px 22px',
                fontFamily: 'var(--font-mono)',
                borderRadius: '24px',
                border: 'none',
                cursor: 'pointer',
                background: activeTab === 'moon' ? 'linear-gradient(135deg, #FFC857 0%, #FF6B4A 100%)' : 'transparent',
                color: activeTab === 'moon' ? '#05060F' : 'var(--text-secondary)',
                fontWeight: activeTab === 'moon' ? 700 : 500,
                boxShadow: activeTab === 'moon' ? '0 0 20px rgba(255, 200, 87, 0.4)' : 'none',
                transition: 'all 200ms ease'
              }}
            >
              🌙 Moon of Ideas ({UNFINISHED_IDEAS.length})
            </button>
            <button
              onClick={() => {
                sound.playClick();
                setActiveTab('lab');
              }}
              onMouseEnter={() => sound.playHover()}
              style={{
                fontSize: '0.82rem',
                padding: '10px 22px',
                fontFamily: 'var(--font-mono)',
                borderRadius: '24px',
                border: 'none',
                cursor: 'pointer',
                background: activeTab === 'lab' ? 'linear-gradient(135deg, #2DE2C6 0%, #4CC9F0 100%)' : 'transparent',
                color: activeTab === 'lab' ? '#05060F' : 'var(--text-secondary)',
                fontWeight: activeTab === 'lab' ? 700 : 500,
                boxShadow: activeTab === 'lab' ? '0 0 20px rgba(45, 226, 198, 0.4)' : 'none',
                transition: 'all 200ms ease'
              }}
            >
              🧪 Lab Prototypes ({labNotes.length})
            </button>
          </div>
        </div>

        {activeTab === 'moon' ? (
          /* Moon of Unfinished Ideas in Organic Asteroid Crater Pods */
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(330px, 1fr))', gap: '28px' }}>
            {UNFINISHED_IDEAS.map((idea, idx) => {
              const borderStyles = [
                '44px 22px 38px 20px',
                '22px 42px 20px 38px',
                '36px 18px 44px 22px',
                '26px 40px 18px 36px'
              ];
              const customRadius = borderStyles[idx % borderStyles.length];

              return (
                <AsteroidPod
                  key={idea.id}
                  accentColor="var(--stardust-gold)"
                  onMouseEnter={() => sound.playHover()}
                  style={{
                    borderRadius: customRadius,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    minHeight: '380px'
                  }}
                >
                  <div>
                    {/* Crater Pod Title Bar */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <WhimsicalAsteroid size={22} rotation={idx * 40} />
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--stardust-gold)', letterSpacing: '0.08em' }}>
                          CRATER #{idea.crater.toUpperCase()}
                        </span>
                      </div>
                      <span
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.7rem',
                          fontWeight: 700,
                          padding: '4px 12px',
                          borderRadius: '16px',
                          background: idea.status === 'Prototype' ? 'rgba(45, 226, 198, 0.15)' : 'rgba(255, 107, 74, 0.15)',
                          color: idea.status === 'Prototype' ? 'var(--aurora-teal)' : 'var(--solar-coral)',
                          border: `1.5px solid ${idea.status === 'Prototype' ? 'var(--aurora-teal)' : 'var(--solar-coral)'}`
                        }}
                      >
                        {idea.status.toUpperCase()}
                      </span>
                    </div>

                    <h3
                      className="font-display"
                      style={{
                        fontSize: '1.35rem',
                        color: 'var(--text-primary)',
                        marginBottom: '12px',
                        lineHeight: 1.3
                      }}
                    >
                      {idea.title}
                    </h3>

                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', marginBottom: '18px', lineHeight: 1.6 }}>
                      {idea.summary}
                    </p>

                    {/* Crater Mission Gap Callout - Sculpted pod */}
                    <div
                      style={{
                        background: 'radial-gradient(circle at 10% 10%, rgba(255, 107, 74, 0.12) 0%, rgba(5, 6, 15, 0.8) 100%)',
                        border: '1.5px dashed rgba(255, 107, 74, 0.45)',
                        padding: '16px',
                        borderRadius: '24px 12px 20px 14px',
                        marginBottom: '20px'
                      }}
                    >
                      <div
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.7rem',
                          color: 'var(--solar-coral)',
                          fontWeight: 700,
                          marginBottom: '6px',
                          letterSpacing: '0.06em',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}
                      >
                        <span>☄️</span>
                        <span>UNSOLVED CHALLENGE:</span>
                      </div>
                      <div style={{ fontSize: '0.85rem', color: 'var(--moonlight)', lineHeight: 1.5 }}>
                        {idea.whatIsMissing}
                      </div>
                    </div>
                  </div>

                  {/* Tags and Action Launch */}
                  <div>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '18px' }}>
                      {idea.tags.map((t) => (
                        <span
                          key={t}
                          style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.68rem',
                            color: 'var(--stardust-gold)',
                            background: 'rgba(255, 200, 87, 0.08)',
                            padding: '4px 10px',
                            borderRadius: '14px',
                            border: '1px solid rgba(255, 200, 87, 0.2)'
                          }}
                        >
                          #{t}
                        </span>
                      ))}
                    </div>

                    <button
                      onClick={() => {
                        sound.playClick();
                        setCopiedIdea(idea.id);
                        onNavigate('contact');
                      }}
                      style={{
                        width: '100%',
                        fontSize: '0.82rem',
                        fontFamily: 'var(--font-mono)',
                        padding: '12px 18px',
                        borderRadius: '24px',
                        border: '1px solid rgba(255, 200, 87, 0.35)',
                        background: 'rgba(255, 200, 87, 0.08)',
                        color: 'var(--text-primary)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        transition: 'all 200ms ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(255, 200, 87, 0.2)';
                        e.currentTarget.style.transform = 'translateY(-2px)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'rgba(255, 200, 87, 0.08)';
                        e.currentTarget.style.transform = 'translateY(0)';
                      }}
                    >
                      <WhimsicalRocket size={20} angle={-30} />
                      <span>Co-Pilot This Experiment →</span>
                    </button>
                  </div>
                </AsteroidPod>
              );
            })}
          </div>
        ) : (
          /* Lab Notes in Cosmic Pebble Pods */
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(330px, 1fr))', gap: '28px' }}>
            {labNotes.map((note, idx) => (
              <AsteroidPod
                key={idx}
                accentColor={note.color}
                onMouseEnter={() => sound.playHover()}
                style={{
                  borderRadius: idx % 2 === 0 ? '38px 16px 36px 18px' : '20px 38px 16px 36px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  minHeight: '260px'
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.72rem',
                        padding: '4px 12px',
                        borderRadius: '16px',
                        background: `${note.color}1a`,
                        color: note.color,
                        border: `1.5px solid ${note.color}55`
                      }}
                    >
                      {note.tag}
                    </span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--asteroid-gray)' }}>
                      {note.date}
                    </span>
                  </div>

                  <h3 className="font-display" style={{ fontSize: '1.35rem', color: 'var(--text-primary)', marginBottom: '12px' }}>
                    {note.title}
                  </h3>

                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.94rem', lineHeight: 1.65 }}>
                    {note.desc}
                  </p>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '20px', color: note.color, fontSize: '0.78rem', fontFamily: 'var(--font-mono)' }}>
                  <span>✦ RESEARCH NOTE ARCHIVE</span>
                </div>
              </AsteroidPod>
            ))}
          </div>
        )}

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
            <span>← Return to Solar Orbit</span>
          </button>
        </div>
      </div>
    </SubpageAtmosphere>
  );
}
