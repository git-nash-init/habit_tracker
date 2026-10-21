/**
 * Progress XP - Floating AURA AI Companion Component
 */

(function (window) {
  'use strict';

  const AURA_TIPS = [
    "You have completed your top morning blocks! Protect this momentum by tackling your deep work session next.",
    "Remember: consistency compounds. 1% better every day equals 37x growth over a year.",
    "Hydration directly impacts cognitive endurance. Take a quick break and drink a glass of water.",
    "You're 2 tasks away from hitting your daily goal! Keep your focus unbroken."
  ];

  function initAura() {
    let container = document.getElementById('auraRoot');
    if (!container) {
      container = document.createElement('div');
      container.id = 'auraRoot';
      container.className = 'aura-container';
      document.body.appendChild(container);
    }

    container.innerHTML = `
      <div class="aura-popup-panel" id="auraPanel">
        <div class="aura-popup-head">
          <b>⚡ AURA Guide</b>
          <button class="btn secondary sm" id="closeAuraBtn" style="padding: 2px 6px; font-size: 10px;">✕</button>
        </div>
        <div class="aura-popup-body" id="auraText">
          ${AURA_TIPS[0]}
        </div>
        <div style="display: flex; justify-content: flex-end; margin-top: 4px;">
          <button class="btn sm" id="auraNextBtn" style="padding: 4px 10px; font-size: 10px;">Next Tip →</button>
        </div>
      </div>
      <button class="aura-orb-btn" id="auraOrb" title="AURA AI Companion">
        <span>AURA</span>
      </button>
    `;

    const orb = container.querySelector('#auraOrb');
    const panel = container.querySelector('#auraPanel');
    const closeBtn = container.querySelector('#closeAuraBtn');
    const nextBtn = container.querySelector('#auraNextBtn');
    const textEl = container.querySelector('#auraText');
    let tipIdx = 0;

    if (orb && panel) {
      orb.addEventListener('click', () => {
        panel.classList.toggle('open');
        if (window.ProgressXPAudio) window.ProgressXPAudio.playClick();
      });
    }

    if (closeBtn && panel) {
      closeBtn.addEventListener('click', () => {
        panel.classList.remove('open');
      });
    }

    if (nextBtn && textEl) {
      nextBtn.addEventListener('click', () => {
        tipIdx = (tipIdx + 1) % AURA_TIPS.length;
        textEl.textContent = AURA_TIPS[tipIdx];
        if (window.ProgressXPAudio) window.ProgressXPAudio.playClick();
      });
    }
  }

  window.ProgressXPAura = {
    init: initAura
  };

})(window);
