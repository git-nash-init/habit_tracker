// Progress XP Authentic Guided Demo & Tour Controller
(function() {
  'use strict';

  const TOUR_STEPS = [
    {
      title: 'Focus on what matters',
      caption: 'Watch the app in use. Press Play to begin, or skip.',
      action: 'highlight'
    },
    {
      title: 'Today plan',
      caption: 'Review your scheduled tasks and identify what is on pace or behind schedule.',
      action: 'todayPlan'
    },
    {
      title: 'Completing tasks',
      caption: 'Tap Complete to finish a work block and earn XP, coins, and level progress.',
      action: 'tasks'
    },
    {
      title: 'Growth & Identity',
      caption: 'Explore your attribute matrix, wake rhythm, and character avatar vault.',
      action: 'growth'
    }
  ];

  let currentStep = 0;
  let isPlaying = false;
  let speed = 1;
  let timer = null;

  function speakCaption(text) {
    if (!window.speechSynthesis) return;
    try {
      window.speechSynthesis.cancel();
      const utter = new SpeechSynthesisUtterance(text);
      utter.rate = speed === 2 ? 1.25 : 1.0;
      const voices = window.speechSynthesis.getVoices();
      const preferred = voices.find(v => v.name.includes('Aria') || v.name.includes('Google') || v.lang.startsWith('en'));
      if (preferred) utter.voice = preferred;
      window.speechSynthesis.speak(utter);
    } catch (_) {}
  }

  const TourPlayer = {
    init() {
      this.bindElements();
      this.render();
    },

    bindElements() {
      const playBtn = document.querySelector('[data-demo="play"]');
      const prevBtn = document.querySelector('[data-demo="previous"]');
      const jumpBtn = document.querySelector('[data-demo="jump"]');
      const replayBtn = document.querySelector('[data-demo="replay"]');
      const speedBtn = document.querySelector('[data-demo="speed"]');
      const skipBtn = document.querySelector('[data-demo="skip"]');
      const voiceBtn = document.querySelector('[data-demo="voice"]');
      const tryBtn = document.querySelector('[data-demo="try"]');

      if (playBtn) playBtn.addEventListener('click', () => this.togglePlay());
      if (prevBtn) prevBtn.addEventListener('click', () => this.prev());
      if (jumpBtn) jumpBtn.addEventListener('click', () => this.next());
      if (replayBtn) replayBtn.addEventListener('click', () => this.replay());
      if (speedBtn) speedBtn.addEventListener('click', () => this.toggleSpeed());
      if (skipBtn) skipBtn.addEventListener('click', () => this.skip());
      if (voiceBtn) voiceBtn.addEventListener('click', () => this.toggleVoice());
      if (tryBtn) tryBtn.addEventListener('click', () => this.tryMyself());
    },

    render() {
      const step = TOUR_STEPS[currentStep];
      const countEl = document.querySelector('.px-guide-count');
      const captionEl = document.querySelector('.banner-caption-text');
      const playBtn = document.querySelector('[data-demo="play"]');
      const speedBtn = document.querySelector('[data-demo="speed"]');

      if (countEl) countEl.textContent = `Tour ${currentStep + 1}/${TOUR_STEPS.length}`;
      if (captionEl) captionEl.textContent = step.caption;
      if (playBtn) playBtn.innerHTML = isPlaying ? '❚❚' : '▶';
      if (speedBtn) speedBtn.textContent = `${speed}×`;

      // Highlight target element on step
      document.querySelectorAll('.px-tour-highlight').forEach(el => el.classList.remove('px-tour-highlight'));
      if (step.action === 'highlight') {
        const el = document.querySelector('.highlight-card');
        if (el) el.classList.add('px-tour-highlight');
      } else if (step.action === 'todayPlan') {
        const el = document.querySelector('.today-plan-card');
        if (el) el.classList.add('px-tour-highlight');
      } else if (step.action === 'tasks') {
        const el = document.querySelector('.tasks-container');
        if (el) el.classList.add('px-tour-highlight');
      }
    },

    togglePlay() {
      isPlaying = !isPlaying;
      if (window.ProgressXPSound) window.ProgressXPSound.play('click');
      if (isPlaying) {
        speakCaption(TOUR_STEPS[currentStep].caption);
        this.scheduleNext();
      } else {
        if (timer) clearTimeout(timer);
        if (window.speechSynthesis) window.speechSynthesis.cancel();
      }
      this.render();
    },

    scheduleNext() {
      if (timer) clearTimeout(timer);
      const delay = (speed === 2 ? 3500 : 6000);
      timer = setTimeout(() => {
        if (!isPlaying) return;
        if (currentStep < TOUR_STEPS.length - 1) {
          this.next();
        } else {
          isPlaying = false;
          this.render();
        }
      }, delay);
    },

    next() {
      if (currentStep < TOUR_STEPS.length - 1) {
        currentStep++;
        if (window.ProgressXPSound) window.ProgressXPSound.play('nav');
        if (isPlaying) speakCaption(TOUR_STEPS[currentStep].caption);
        this.render();
        if (isPlaying) this.scheduleNext();
      }
    },

    prev() {
      if (currentStep > 0) {
        currentStep--;
        if (window.ProgressXPSound) window.ProgressXPSound.play('nav');
        if (isPlaying) speakCaption(TOUR_STEPS[currentStep].caption);
        this.render();
        if (isPlaying) this.scheduleNext();
      }
    },

    replay() {
      if (window.ProgressXPSound) window.ProgressXPSound.play('click');
      speakCaption(TOUR_STEPS[currentStep].caption);
      this.render();
      if (isPlaying) this.scheduleNext();
    },

    toggleSpeed() {
      speed = speed === 1 ? 2 : 1;
      if (window.ProgressXPSound) window.ProgressXPSound.play('click');
      this.render();
      if (isPlaying) this.scheduleNext();
    },

    skip() {
      isPlaying = false;
      if (timer) clearTimeout(timer);
      if (window.speechSynthesis) window.speechSynthesis.cancel();
      const demoHead = document.querySelector('.px-demo-head');
      if (demoHead) demoHead.style.display = 'none';
      if (window.ProgressXPSound) window.ProgressXPSound.play('click');
    },

    toggleVoice() {
      if (window.ProgressXPSound) window.ProgressXPSound.toggle();
    },

    tryMyself() {
      this.skip();
      const firstTask = document.querySelector('.tasks-container');
      if (firstTask) firstTask.scrollIntoView({ behavior: 'smooth' });
    }
  };

  window.ProgressXPTour = TourPlayer;
})();
