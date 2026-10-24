// Progress XP Authentic Web Audio API Mallet Tone Synthesis Engine
(function() {
  'use strict';

  let context = null;
  let bus = null;
  let enabled = true;

  function getAudioContext() {
    try {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return null;
      if (!context) {
        context = new AC();
        bus = context.createGain();
        bus.gain.value = 0.8;
        bus.connect(context.destination);
      }
      if (context.state === 'suspended') {
        context.resume().catch(() => {});
      }
      return context;
    } catch (_) {
      return null;
    }
  }

  function note(c, hz, start, length, level, shape, slide) {
    const o = c.createOscillator();
    const g = c.createGain();
    const filter = c.createBiquadFilter();

    o.type = shape || 'sine';
    o.frequency.setValueAtTime(hz, start);
    if (slide) {
      o.frequency.exponentialRampToValueAtTime(slide, start + length * 0.8);
    }

    filter.type = 'lowpass';
    filter.frequency.value = 4200;
    filter.Q.value = 0.35;

    g.gain.setValueAtTime(0.00001, start);
    g.gain.exponentialRampToValueAtTime(Math.max(0.00002, level), start + 0.006);
    g.gain.exponentialRampToValueAtTime(0.00001, start + length);

    o.connect(filter);
    filter.connect(g);
    g.connect(bus);

    o.start(start);
    o.stop(start + length + 0.012);
  }

  function play(kind) {
    if (!enabled) return;
    const c = getAudioContext();
    if (!c) return;

    const t = c.currentTime + 0.005;
    const hit = (hz, offset, decay, gain, shape, slide) => {
      note(c, hz, t + offset, decay, gain, shape, slide);
    };

    if (kind === 'success') {
      // Harmonic mallet ascending chime
      [[523.25, 0], [659.25, 0.055], [783.99, 0.11], [1174.66, 0.15]].forEach((n, i) => {
        hit(n[0], n[1], 0.28, i === 3 ? 0.045 : 0.13);
      });
      hit(261.63, 0, 0.3, 0.09);
    } else if (kind === 'nav') {
      hit(349.23, 0, 0.115, 0.13, 'sine', 523.25);
      hit(698.46, 0.025, 0.1, 0.035);
    } else if (kind === 'focus') {
      hit(392, 0, 0.25, 0.14);
      hit(587.33, 0.07, 0.28, 0.09);
      hit(783.99, 0.11, 0.24, 0.045);
    } else if (kind === 'error') {
      hit(293.66, 0, 0.15, 0.13);
      hit(261.63, 0.11, 0.17, 0.1);
    } else {
      // Subtle tactile click
      hit(440, 0, 0.065, 0.115);
      hit(1320, 0, 0.045, 0.025, 'triangle');
    }
  }

  window.ProgressXPSound = {
    play,
    toggle: () => { enabled = !enabled; return enabled; },
    isEnabled: () => enabled
  };
})();
