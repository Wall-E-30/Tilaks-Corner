// Procedural Web Audio Engine for The Mindverse
// Zero external files, zero latency, 100% opt-in accessibility compliant

class AudioEngine {
  constructor() {
    this.ctx = null;
    this.isEnabled = false;
    this.ambientOsc = null;
    this.ambientGain = null;
    this.humInterval = null;
  }

  init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
  }

  toggle() {
    this.init();
    if (!this.ctx) return false;

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    this.isEnabled = !this.isEnabled;

    if (this.isEnabled) {
      this.startAmbientHum();
      this.playTone(523.25, 'sine', 0.1, 0.08); // high welcome chime C5
      setTimeout(() => this.playTone(659.25, 'sine', 0.15, 0.08), 90); // E5
      setTimeout(() => this.playTone(783.99, 'sine', 0.2, 0.1), 180); // G5
    } else {
      this.stopAmbientHum();
    }

    return this.isEnabled;
  }

  startAmbientHum() {
    if (!this.ctx || !this.isEnabled) return;
    try {
      this.stopAmbientHum();
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(55, this.ctx.currentTime); // Low A1 deep space drone

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(140, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.001, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.035, this.ctx.currentTime + 3);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      this.ambientOsc = osc;
      this.ambientGain = gain;
    } catch {
      // Audio autoplay or permissions handled gracefully
    }
  }

  stopAmbientHum() {
    if (this.ambientOsc && this.ambientGain && this.ctx) {
      try {
        this.ambientGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.5);
        setTimeout(() => {
          if (this.ambientOsc) {
            this.ambientOsc.stop();
            this.ambientOsc.disconnect();
            this.ambientOsc = null;
          }
        }, 600);
      } catch {
        this.ambientOsc = null;
      }
    }
  }

  playTone(freq, type = 'sine', duration = 0.08, volume = 0.05) {
    if (!this.isEnabled || !this.ctx) return;
    try {
      if (this.ctx.state === 'suspended') this.ctx.resume();
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      gain.gain.setValueAtTime(volume, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch {
      // Graceful fallback
    }
  }

  playHover() {
    if (!this.isEnabled) return;
    this.playTone(880, 'sine', 0.04, 0.015);
  }

  playClick() {
    if (!this.isEnabled) return;
    this.playTone(440, 'triangle', 0.07, 0.04);
  }

  playStarCatch() {
    if (!this.isEnabled || !this.ctx) return;
    const notes = [587.33, 739.99, 880.0, 1174.66]; // D5, F#5, A5, D6
    notes.forEach((freq, idx) => {
      setTimeout(() => this.playTone(freq, 'sine', 0.18, 0.06), idx * 60);
    });
  }

  playWarp() {
    if (!this.isEnabled || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(100, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(800, this.ctx.currentTime + 0.4);
      osc.frequency.exponentialRampToValueAtTime(80, this.ctx.currentTime + 0.7);

      gain.gain.setValueAtTime(0.01, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.06, this.ctx.currentTime + 0.3);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.7);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.75);
    } catch {
      // Fallback
    }
  }

  playPlanetChord(planetType) {
    if (!this.isEnabled || !this.ctx) return;
    const chordMap = {
      ice: [329.63, 493.88, 659.25], // E4, B4, E5 (crystalline)
      lava: [220.0, 277.18, 329.63], // A3, C#4, E4 (warm)
      gasGiant: [174.61, 261.63, 349.23], // F3, C4, F4 (deep rich)
      ocean: [261.63, 392.0, 523.25], // C4, G4, C5 (fluid)
      desertRinged: [293.66, 369.99, 440.0], // D4, F#4, A4 (radiant)
      crystal: [440.0, 554.37, 659.25] // A4, C#5, E5 (bright)
    };
    const chord = chordMap[planetType] || chordMap.ice;
    chord.forEach((freq, i) => {
      setTimeout(() => this.playTone(freq, 'sine', 0.35, 0.04), i * 40);
    });
  }

  playThrusterRumble() {
    if (!this.isEnabled || !this.ctx) return;
    try {
      if (this.ctx.state === 'suspended') this.ctx.resume();
      const osc = this.ctx.createOscillator();
      const filter = this.ctx.createBiquadFilter();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(45, this.ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(110, this.ctx.currentTime + 1.2);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(120, this.ctx.currentTime);
      filter.frequency.linearRampToValueAtTime(280, this.ctx.currentTime + 1.2);

      gain.gain.setValueAtTime(0.01, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.09, this.ctx.currentTime + 0.6);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 1.8);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 1.85);
    } catch {
      // Audio fallback
    }
  }

  playVictory() {
    if (!this.isEnabled || !this.ctx) return;
    try {
      if (this.ctx.state === 'suspended') this.ctx.resume();
      // Ascending triumphant cosmic fanfare: C5, E5, G5, C6 with layered shimmer
      const fanfare = [
        { freq: 523.25, time: 0, dur: 0.22, vol: 0.08 },    // C5
        { freq: 659.25, time: 100, dur: 0.22, vol: 0.08 },  // E5
        { freq: 783.99, time: 200, dur: 0.25, vol: 0.09 },  // G5
        { freq: 1046.50, time: 320, dur: 0.55, vol: 0.12 }, // C6
        { freq: 1318.51, time: 420, dur: 0.45, vol: 0.07 }  // E6 shimmer
      ];
      fanfare.forEach(({ freq, time, dur, vol }) => {
        setTimeout(() => this.playTone(freq, 'sine', dur, vol), time);
      });
    } catch {
      // Audio fallback
    }
  }

  playRocketLaunch() {
    if (!this.isEnabled || !this.ctx) return;
    try {
      if (this.ctx.state === 'suspended') this.ctx.resume();

      // Deep thruster roar using white noise through sweeping low-pass filter
      const bufferSize = Math.floor(this.ctx.sampleRate * 2.6);
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(80, this.ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(700, this.ctx.currentTime + 1.8);
      filter.frequency.exponentialRampToValueAtTime(100, this.ctx.currentTime + 2.5);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.001, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.12, this.ctx.currentTime + 0.5);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 2.55);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);
      noise.start();

      // Layered sub-bass thruster rumble oscillator
      const osc = this.ctx.createOscillator();
      const oscGain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(45, this.ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(120, this.ctx.currentTime + 1.6);
      oscGain.gain.setValueAtTime(0.001, this.ctx.currentTime);
      oscGain.gain.linearRampToValueAtTime(0.08, this.ctx.currentTime + 0.4);
      oscGain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 2.4);
      osc.connect(oscGain);
      oscGain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 2.45);
    } catch {
      // Audio fallback
    }
  }
}

export const sound = new AudioEngine();
