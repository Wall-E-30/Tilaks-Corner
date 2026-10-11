import React from 'react';

/**
 * Handcrafted whimsical vector space elements:
 * - WhimsicalRocket: retro spaceship with animated exhaust flame
 * - WhimsicalAsteroid: organic drifting rock with crater pits
 * - WhimsicalSatellite: deep-space probe with solar panels and blinking comm beacon
 * - WhimsicalAstronaut: tethered spacewalker with golden visor
 * - WhimsicalUFO: playful saucer with tractor beam glow
 * - AsteroidPod: organic, bumpy, non-rectangular content container
 */

export function WhimsicalRocket({ size = 48, angle = 0, style = {} }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        transform: `rotate(${angle}deg)`,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        filter: 'drop-shadow(0 0 12px rgba(255, 107, 74, 0.6))',
        ...style
      }}
    >
      <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
        {/* Animated Thruster Flame */}
        <path
          d="M32 46 C28 54, 26 58, 32 63 C38 58, 36 54, 32 46 Z"
          fill="url(#rocketFlameGrad)"
          style={{ animation: 'rocketFlameFlicker 400ms ease-in-out infinite alternate' }}
        />
        <path
          d="M32 47 C30 52, 29 55, 32 59 C35 55, 34 52, 32 47 Z"
          fill="#FFE28A"
        />

        {/* Fins */}
        <path d="M22 36 L12 44 L22 42 Z" fill="#FF6B4A" stroke="#05060F" strokeWidth="1.5" />
        <path d="M42 36 L52 44 L42 42 Z" fill="#FF6B4A" stroke="#05060F" strokeWidth="1.5" />

        {/* Rocket Main Body */}
        <path
          d="M32 6 C24 16, 20 28, 22 44 L42 44 C44 28, 40 16, 32 6 Z"
          fill="#EDEBFA"
          stroke="#05060F"
          strokeWidth="1.5"
        />

        {/* Rocket Nose Cone Accent */}
        <path
          d="M32 6 C28 12, 25 18, 24 22 L40 22 C39 18, 36 12, 32 6 Z"
          fill="#FF6B4A"
        />

        {/* Cockpit Porthole Window */}
        <circle cx="32" cy="28" r="6" fill="#4CC9F0" stroke="#05060F" strokeWidth="1.5" />
        <circle cx="30.5" cy="26.5" r="2" fill="#FFFFFF" opacity="0.8" />

        {/* Bottom Exhaust Nozzle */}
        <rect x="27" y="44" width="10" height="3" rx="1.5" fill="#7A3FB8" />

        <defs>
          <linearGradient id="rocketFlameGrad" x1="32" y1="46" x2="32" y2="63" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FFC857" />
            <stop offset="0.6" stopColor="#FF6B4A" />
            <stop offset="1" stopColor="#FF2E93" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

export function WhimsicalAsteroid({ size = 52, rotationSpeed = 24, style = {} }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        animation: `asteroidTumble ${rotationSpeed}s linear infinite`,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        filter: 'drop-shadow(0 4px 10px rgba(0, 0, 0, 0.7))',
        ...style
      }}
    >
      <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
        {/* Rocky irregular asteroid outline */}
        <path
          d="M32 4 C42 6, 54 14, 58 26 C62 38, 54 52, 42 58 C30 64, 16 58, 8 48 C0 38, 4 22, 12 12 C20 2, 24 2, 32 4 Z"
          fill="#2C2F48"
          stroke="#4F537A"
          strokeWidth="1.8"
        />
        {/* Shading layer */}
        <path
          d="M58 26 C62 38, 54 52, 42 58 C30 64, 24 62, 28 54 C34 50, 48 46, 52 34 C54 28, 56 24, 58 26 Z"
          fill="#1A1C30"
          opacity="0.7"
        />

        {/* Craters */}
        <circle cx="24" cy="22" r="5" fill="#1A1C30" stroke="#3D4063" strokeWidth="1" />
        <circle cx="23" cy="21" r="2" fill="#121324" />

        <circle cx="42" cy="34" r="6" fill="#1A1C30" stroke="#3D4063" strokeWidth="1" />
        <circle cx="41" cy="33" r="2.5" fill="#121324" />

        <circle cx="26" cy="44" r="3.5" fill="#1A1C30" stroke="#3D4063" strokeWidth="0.8" />
        <circle cx="38" cy="16" r="2.5" fill="#1A1C30" stroke="#3D4063" strokeWidth="0.8" />
      </svg>
    </div>
  );
}

export function WhimsicalSatellite({ size = 48, style = {} }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        filter: 'drop-shadow(0 0 10px rgba(76, 201, 240, 0.4))',
        ...style
      }}
    >
      <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
        {/* Left Solar Panel */}
        <rect x="4" y="24" width="16" height="16" rx="2" fill="#1B4965" stroke="#4CC9F0" strokeWidth="1.2" />
        <line x1="12" y1="24" x2="12" y2="40" stroke="#4CC9F0" strokeWidth="0.8" />
        <line x1="4" y1="32" x2="20" y2="32" stroke="#4CC9F0" strokeWidth="0.8" />

        {/* Right Solar Panel */}
        <rect x="44" y="24" width="16" height="16" rx="2" fill="#1B4965" stroke="#4CC9F0" strokeWidth="1.2" />
        <line x1="52" y1="24" x2="52" y2="40" stroke="#4CC9F0" strokeWidth="0.8" />
        <line x1="44" y1="32" x2="60" y2="32" stroke="#4CC9F0" strokeWidth="0.8" />

        {/* Panel Struts */}
        <line x1="20" y1="32" x2="26" y2="32" stroke="#EDEBFA" strokeWidth="2" />
        <line x1="38" y1="32" x2="44" y2="32" stroke="#EDEBFA" strokeWidth="2" />

        {/* Central Satellite Body */}
        <rect x="26" y="22" width="12" height="20" rx="3" fill="#FFC857" stroke="#05060F" strokeWidth="1.5" />
        <circle cx="32" cy="28" r="2.5" fill="#4CC9F0" />

        {/* Dish Antenna */}
        <path d="M26 14 C28 8, 36 8, 38 14" stroke="#EDEBFA" strokeWidth="1.8" fill="none" />
        <line x1="32" y1="14" x2="32" y2="22" stroke="#EDEBFA" strokeWidth="1.5" />
        {/* Blinking Beacon Light */}
        <circle cx="32" cy="8" r="2" fill="#FF6B4A" style={{ animation: 'satelliteBeacon 1s ease-in-out infinite alternate' }} />
      </svg>
    </div>
  );
}

export function WhimsicalAstronautFloating({ size = 56, style = {} }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        animation: 'astronautDrift 5s ease-in-out infinite',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        filter: 'drop-shadow(0 0 12px rgba(45, 226, 198, 0.4))',
        ...style
      }}
    >
      <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
        {/* Oxygen Tether Cable (Wavy) */}
        <path
          d="M8 58 C16 54, 18 42, 26 40"
          stroke="#FFC857"
          strokeWidth="1.8"
          strokeDasharray="3 3"
          fill="none"
        />

        {/* Backpack */}
        <rect x="18" y="24" width="8" height="18" rx="3" fill="#8A8FB0" stroke="#05060F" strokeWidth="1.2" />

        {/* Helmet */}
        <circle cx="36" cy="18" r="12" fill="#EDEBFA" stroke="#05060F" strokeWidth="1.5" />
        {/* Visor (Gold Shading) */}
        <path d="M32 14 C36 12, 44 14, 46 18 C46 22, 38 24, 32 22 Z" fill="#FFC857" stroke="#05060F" strokeWidth="1" />
        <path d="M34 15 C37 14, 41 15, 43 17" stroke="#FFF" strokeWidth="1" strokeLinecap="round" />

        {/* Spacesuit Body */}
        <path
          d="M26 30 C26 26, 44 26, 44 30 L42 46 C42 48, 38 52, 34 52 C30 52, 28 48, 28 46 Z"
          fill="#EDEBFA"
          stroke="#05060F"
          strokeWidth="1.5"
        />

        {/* Mission Patch on Chest */}
        <circle cx="34" cy="34" r="2.5" fill="#FF6B4A" />

        {/* Waving Arm */}
        <path d="M42 30 C48 26, 52 20, 50 16" stroke="#EDEBFA" strokeWidth="4" strokeLinecap="round" />
        <circle cx="50" cy="16" r="3" fill="#8A8FB0" />

        {/* Boots */}
        <ellipse cx="31" cy="54" rx="4" ry="2.5" fill="#8A8FB0" />
        <ellipse cx="39" cy="54" rx="4" ry="2.5" fill="#8A8FB0" />
      </svg>
    </div>
  );
}

export function WhimsicalUFO({ size = 48, style = {} }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        animation: 'ufoHover 4s ease-in-out infinite',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        filter: 'drop-shadow(0 0 14px rgba(224, 64, 160, 0.5))',
        ...style
      }}
    >
      <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
        {/* Tractor Beam Cone */}
        <polygon points="26,38 12,62 52,62 38,38" fill="url(#tractorBeamGrad)" opacity="0.45" />

        {/* Glass Dome */}
        <path d="M22 28 C22 18, 42 18, 42 28 Z" fill="#2DE2C6" opacity="0.85" stroke="#05060F" strokeWidth="1.2" />
        {/* Friendly Little Alien Inside */}
        <circle cx="32" cy="24" r="3.5" fill="#7A3FB8" />
        <circle cx="31" cy="23.5" r="1" fill="#FFF" />
        <circle cx="33" cy="23.5" r="1" fill="#FFF" />

        {/* Saucer Hull */}
        <ellipse cx="32" cy="32" rx="24" ry="7" fill="#EDEBFA" stroke="#05060F" strokeWidth="1.5" />
        <ellipse cx="32" cy="34" rx="20" ry="4" fill="#7A3FB8" />

        {/* Glowing Hull Lights */}
        <circle cx="18" cy="33" r="1.8" fill="#FFC857" />
        <circle cx="27" cy="35" r="1.8" fill="#FF6B4A" />
        <circle cx="37" cy="35" r="1.8" fill="#2DE2C6" />
        <circle cx="46" cy="33" r="1.8" fill="#FFC857" />

        <defs>
          <linearGradient id="tractorBeamGrad" x1="32" y1="38" x2="32" y2="62" gradientUnits="userSpaceOnUse">
            <stop stopColor="#2DE2C6" stopOpacity="0.8" />
            <stop offset="1" stopColor="#2DE2C6" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

/**
 * AsteroidPod: An organic, sculpted asteroid-shaped container.
 * Completely eliminates box-inside-a-box feeling with sculpted, natural organic contours.
 */
export function AsteroidPod({
  children,
  accentColor = 'var(--stardust-gold)',
  style = {},
  className = '',
  onMouseEnter,
  onClick
}) {
  return (
    <div
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      className={className}
      style={{
        position: 'relative',
        background: 'radial-gradient(ellipse at 25% 25%, rgba(27, 26, 85, 0.45) 0%, rgba(11, 13, 36, 0.8) 75%)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        /* Organic non-rectangular pebble / asteroid silhouette */
        borderRadius: '38px 18px 34px 22px',
        border: `1.5px solid ${accentColor}33`,
        boxShadow: `0 14px 40px rgba(0, 0, 0, 0.5), 0 0 25px ${accentColor}15`,
        padding: '28px',
        transition: 'all 250ms ease',
        ...style
      }}
    >
      {/* Whimsical Corner Meteor Sparkle */}
      <div
        style={{
          position: 'absolute',
          top: '12px',
          right: '16px',
          fontSize: '0.8rem',
          color: accentColor,
          opacity: 0.7,
          pointerEvents: 'none'
        }}
      >
        ✦
      </div>
      {children}
    </div>
  );
}
