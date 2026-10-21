/**
 * Progress XP - Avatar Vault Component
 */

(function (window) {
  'use strict';

  const AVATARS = [
    { id: 'cyborg_neon', name: 'Cyber Neon', icon: '🤖', unlockLevel: 1 },
    { id: 'samurai_blade', name: 'Shadow Samurai', icon: '⚔️', unlockLevel: 3 },
    { id: 'mage_arcane', name: 'Arcane Sage', icon: '🧙‍♂️', unlockLevel: 5 },
    { id: 'valkyrie', name: 'Solar Valkyrie', icon: '🛡️', unlockLevel: 8 },
    { id: 'pilot_exo', name: 'Exo Vanguard', icon: '🚀', unlockLevel: 12 },
    { id: 'titan_prime', name: 'Titan Prime', icon: '👑', unlockLevel: 15 }
  ];

  function openModal() {
    let modal = document.getElementById('avatarVaultModal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'avatarVaultModal';
      modal.className = 'modal-overlay';
      document.body.appendChild(modal);
    }

    const state = window.ProgressXPStore.getState();
    const currentAvatar = state.auth.user.avatar;
    const currentLevel = state.auth.user.level;

    modal.innerHTML = `
      <div class="modal-card">
        <div class="modal-head">
          <h3>Avatar Vault</h3>
          <button class="btn secondary sm" id="closeAvatarModalBtn">✕</button>
        </div>
        <p style="font-size: 12px; color: var(--text-muted); margin-bottom: 16px;">
          Choose your digital hero avatar. Higher rank tiers unlock exclusive cybernetic and arcane portraits.
        </p>

        <div class="avatar-grid">
          ${AVATARS.map(av => {
            const isUnlocked = currentLevel >= av.unlockLevel;
            const isSelected = currentAvatar === av.id;
            return `
              <div class="avatar-choice-card ${isSelected ? 'selected' : ''}" data-avatar-id="${av.id}" style="${isUnlocked ? '' : 'opacity: 0.5; filter: grayscale(1);'}">
                <div class="avatar-big-icon">${av.icon}</div>
                <b style="font-size: 12px; color: #fff;">${av.name}</b>
                <small style="font-size: 10px; color: ${isUnlocked ? 'var(--accent-teal)' : 'var(--text-dim)'};">
                  ${isUnlocked ? (isSelected ? 'EQUIPPED' : 'Equip') : `Unlocks Lv.${av.unlockLevel}`}
                </small>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;

    modal.classList.add('open');

    const closeBtn = modal.querySelector('#closeAvatarModalBtn');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => modal.classList.remove('open'));
    }

    modal.querySelectorAll('[data-avatar-id]').forEach(card => {
      card.addEventListener('click', () => {
        const id = card.getAttribute('data-avatar-id');
        const av = AVATARS.find(a => a.id === id);
        if (av && currentLevel >= av.unlockLevel) {
          window.ProgressXPStore.setAvatar(id);
          modal.classList.remove('open');
          if (window.ProgressXPAudio) window.ProgressXPAudio.playTaskComplete();
        } else {
          alert(`Requires Level ${av.unlockLevel} to equip! Complete more tasks to level up.`);
        }
      });
    });
  }

  window.ProgressXPAvatars = {
    openModal: openModal
  };

})(window);
