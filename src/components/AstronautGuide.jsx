import { useState, useEffect } from 'react';
import { sound } from '../utils/audioEngine';
import { ASTRONAUT_QUOTES } from '../utils/mindverseData';

export default function AstronautGuide({
  hoveredPlanet = null,
  currentPage = 'home',
  onTriggerQuickTour
}) {
  const [isVisible, setIsVisible] = useState(true);
  const [speech, setSpeech] = useState("Welcome aboard! Pick a planet, any planet.");
  const [speechVisible, setSpeechVisible] = useState(true);
  const [isWaving, setIsWaving] = useState(false);
  const [isSleeping, setIsSleeping] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  // Handle idle sleep timer (60s)
  useEffect(() => {
    let idleTimer = setTimeout(() => {
      setIsSleeping(true);
      setSpeech("Commander is resting thrusters... [Zzz]");
      setSpeechVisible(true);
    }, 60000);

    const resetIdle = (e) => {
      clearTimeout(idleTimer);
      if (isSleeping) {
        setIsSleeping(false);
        setSpeech("Thrusters re-engaged! Ready to explore.");
        setSpeechVisible(true);
      }
      idleTimer = setTimeout(() => {
        setIsSleeping(true);
        setSpeech("Commander is resting thrusters... [Zzz]");
        setSpeechVisible(true);
      }, 60000);

      // Subtle tilt toward cursor
      if (typeof window !== 'undefined') {
        const xPercent = (e.clientX / window.innerWidth - 0.5) * 15;
        const yPercent = (e.clientY / window.innerHeight - 0.5) * 15;
        setTilt({ x: xPercent, y: yPercent });
      }
    };

    window.addEventListener('mousemove', resetIdle);
    return () => {
      clearTimeout(idleTimer);
      window.removeEventListener('mousemove', resetIdle);
    };
  }, [isSleeping]);

  // Contextual reactions
  useEffect(() => {
    if (hoveredPlanet) {
      setSpeech(`Scanning ${hoveredPlanet.title} (${hoveredPlanet.discipline}). Click to initiate landing sequence!`);
      setSpeechVisible(true);
      setIsWaving(true);
      const timer = setTimeout(() => setIsWaving(false), 1500);
      return () => clearTimeout(timer);
    }
  }, [hoveredPlanet]);

  // Page change reactions
  useEffect(() => {
    let text = "";
    if (currentPage === 'fast-lane') {
      text = "Houston, a recruiter has entered the chat. Fast Lane engaged!";
    } else if (currentPage === 'constellation') {
      text = "Look up—the Constellation connects Tilak's flagship achievements.";
    } else if (currentPage === 'lab') {
      text = "Careful with the prototypes! That one is an experiment—it might explode.";
    } else if (currentPage === 'curiosity') {
      text = "The Black Hole of Curiosities! Don't let your afternoon get sucked in.";
    } else if (currentPage === 'contact') {
      text = "Radio array locked on. Choose a frequency to transmit!";
    } else if (currentPage === 'about') {
      text = "Commander Tilak's official dossier and flight credentials.";
    } else if (currentPage === 'skills') {
      text = "Welcome to the Cockpit. All thrust gauges use honest measurements!";
    } else {
      text = ASTRONAUT_QUOTES[Math.floor(Math.random() * ASTRONAUT_QUOTES.length)];
    }
    setSpeech(text);
    setSpeechVisible(true);
  }, [currentPage]);

  if (!isVisible) {
    return (
      <button
        onClick={() => {
          sound.playClick();
          setIsVisible(true);
        }}
        title="Summon Astronaut Guide"
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '160px',
          zIndex: 840,
          background: 'rgba(11, 13, 36, 0.9)',
          border: '1px solid var(--stardust-gold)',
          borderRadius: '20px',
          padding: '6px 12px',
          color: 'var(--stardust-gold)',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.72rem',
          cursor: 'pointer'
        }}
      >
        👨‍🚀 Summon Guide
      </button>
    );
  }

  // Visor reflection color matches hovered planet or default stardust gold
  const visorColor = hoveredPlanet ? hoveredPlanet.primaryColor : '#4CC9F0';

  return (
    <div
      aria-live="polite"
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '160px',
        zIndex: 840,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        pointerEvents: 'none',
        transition: 'transform 300ms ease'
      }}
      className="astronaut-guide-container"
    >
      {/* Speech Bubble */}
      {speechVisible && (
        <div
          style={{
            pointerEvents: 'auto',
            background: 'rgba(5, 6, 15, 0.92)',
            border: '1px solid rgba(255, 200, 87, 0.5)',
            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.6), 0 0 15px rgba(255, 200, 87, 0.15)',
            borderRadius: '12px',
            padding: '10px 14px',
            maxWidth: '240px',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.75rem',
            color: 'var(--moonlight)',
            marginBottom: '10px',
            position: 'relative',
            lineHeight: 1.45,
            animation: 'fadeInGuide 250ms ease-out'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
            <span style={{ fontSize: '0.62rem', color: 'var(--stardust-gold)', letterSpacing: '0.08em' }}>
              GUIDE TRANSMISSION
            </span>
            <button
              onClick={() => {
                sound.playClick();
                setSpeechVisible(false);
              }}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--asteroid-gray)',
                cursor: 'pointer',
                fontSize: '0.7rem',
                padding: '0 4px'
              }}
              title="Close dialogue"
            >
              ✕
            </button>
          </div>
          <div>{speech}</div>

          {/* Quick Tour Prompt on Home page */}
          {currentPage === 'home' && onTriggerQuickTour && (
            <div style={{ marginTop: '8px', borderTop: '1px dashed rgba(138, 143, 176, 0.25)', paddingTop: '6px' }}>
              <button
                onClick={() => {
                  sound.playClick();
                  onTriggerQuickTour();
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--solar-coral)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  padding: 0
                }}
              >
                🚀 Start 60s Quick Tour →
              </button>
            </div>
          )}

          {/* Speech bubble down arrow */}
          <div
            style={{
              position: 'absolute',
              bottom: '-6px',
              right: '24px',
              width: 0,
              height: 0,
              borderLeft: '6px solid transparent',
              borderRight: '6px solid transparent',
              borderTop: '6px solid rgba(255, 200, 87, 0.5)'
            }}
          />
        </div>
      )}

      {/* Floating Astronaut Mascot & Controls */}
      <div
        style={{
          pointerEvents: 'auto',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}
      >
        {/* Dismiss Button */}
        <button
          onClick={() => {
            sound.playClick();
            setIsVisible(false);
          }}
          title="Dismiss Astronaut Guide"
          style={{
            background: 'rgba(5, 6, 15, 0.8)',
            border: '1px solid rgba(138, 143, 176, 0.25)',
            color: 'var(--asteroid-gray)',
            borderRadius: '50%',
            width: '22px',
            height: '22px',
            fontSize: '0.65rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          ✕
        </button>

        {/* Astronaut Avatar SVG */}
        <div
          onClick={() => {
            sound.playClick();
            setSpeech(ASTRONAUT_QUOTES[Math.floor(Math.random() * ASTRONAUT_QUOTES.length)]);
            setSpeechVisible(true);
            setIsWaving(true);
            setTimeout(() => setIsWaving(false), 1500);
          }}
          style={{
            width: '68px',
            height: '68px',
            cursor: 'pointer',
            transform: `translate(${tilt.x}px, ${tilt.y}px) rotate(${tilt.x * 0.5}deg)`,
            transition: 'transform 120ms ease-out',
            animation: isSleeping ? 'astroSleep 3.5s ease-in-out infinite' : 'astroFloat 3.2s ease-in-out infinite'
          }}
          title="Commander Tilak's Astronaut Guide (Click for quote)"
        >
          <svg viewBox="0 0 100 100" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Backpack / Jetpack */}
            <rect x="22" y="32" width="56" height="42" rx="10" fill="#1B1A55" stroke="#7A3FB8" strokeWidth="2.5" />
            <circle x="28" y="40" r="3" fill="#FFC857" />
            <circle x="72" y="40" r="3" fill="#2DE2C6" />

            {/* Astronaut Helmet */}
            <circle cx="50" cy="40" r="24" fill="#EDEBFA" stroke="#8A8FB0" strokeWidth="3" />
            
            {/* Visor reflecting current planet */}
            <rect x="34" y="31" width="32" height="19" rx="8" fill="#0B0D24" stroke={visorColor} strokeWidth="2.5" />
            <path d="M38 35 Q44 33 50 34" stroke="#FFF" strokeWidth="1.5" strokeLinecap="round" opacity="0.75" />
            
            {/* Glowing visor eyes/reflection */}
            <circle cx="43" cy="40" r="2" fill={visorColor} />
            <circle cx="57" cy="40" r="2" fill={visorColor} />

            {/* Space Suit Torso */}
            <rect x="33" y="60" width="34" height="28" rx="8" fill="#EDEBFA" stroke="#8A8FB0" strokeWidth="2.5" />
            {/* Chest patch */}
            <rect x="42" y="66" width="16" height="8" rx="2" fill="#FF6B4A" />
            <circle cx="50" cy="70" r="1.5" fill="#FFC857" />

            {/* Left Arm (Waving animation or resting) */}
            <g style={{
              transformOrigin: '28px 65px',
              transform: isWaving ? 'rotate(-35deg)' : 'rotate(0deg)',
              transition: 'transform 300ms ease'
            }}>
              <rect x="18" y="63" width="16" height="7" rx="3.5" fill="#EDEBFA" stroke="#8A8FB0" strokeWidth="2" />
              <circle cx="16" cy="66.5" r="4.5" fill="#FF6B4A" />
            </g>

            {/* Right Arm */}
            <rect x="66" y="63" width="16" height="7" rx="3.5" fill="#EDEBFA" stroke="#8A8FB0" strokeWidth="2" />
            <circle cx="84" cy="66.5" r="4.5" fill="#FF6B4A" />

            {/* Boots / Thruster boots */}
            <rect x="36" y="86" width="11" height="9" rx="3" fill="#FF6B4A" />
            <rect x="53" y="86" width="11" height="9" rx="3" fill="#FF6B4A" />

            {/* Sleep indicator if idle */}
            {isSleeping && (
              <text x="68" y="24" fill="#FFC857" fontFamily="Space Mono" fontSize="12" fontWeight="bold">Zzz</text>
            )}
          </svg>
        </div>
      </div>

      <style>{`
        @keyframes astroFloat {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-9px) rotate(2deg); }
        }
        @keyframes astroSleep {
          0%, 100% { transform: translateY(0px) rotate(6deg); }
          50% { transform: translateY(4px) rotate(8deg); }
        }
        @keyframes fadeInGuide {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0px); }
        }
        @media (max-width: 768px) {
          .astronaut-guide-container {
            right: 20px !important;
            bottom: 74px !important;
          }
        }
      `}</style>
    </div>
  );
}
