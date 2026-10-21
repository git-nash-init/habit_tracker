/**
 * Progress XP - Achievement Vault Component
 */

(function (window) {
  'use strict';

  function renderAchievements(container, state) {
    const achievements = state.achievements;
    const unlockedCount = achievements.filter(a => a.unlocked).length;
    const pct = Math.round((unlockedCount / Math.max(1, achievements.length)) * 100);

    container.innerHTML = `
      <div class="achievements-root">
        <!-- Hero Vault Header -->
        <div class="achievement-hero">
          <div style="display: flex; align-items: center; justify-content: space-between; gap: 20px; flex-wrap: wrap;">
            <div>
              <span class="badge cyan" style="margin-bottom: 6px;">Hall of Trophies</span>
              <h2 style="font-size: 24px; font-weight: 900; color: #fff;">Achievement Vault</h2>
              <p style="font-size: 13px; color: var(--text-muted); max-width: 650px; margin-top: 4px;">
                Prove your dedication across 6 prestigious tiers. Unlock badges to earn permanent multipliers and profile crests.
              </p>
            </div>
            <div class="achievement-progress-orb" style="--pct: ${pct}%;">
              <div class="achievement-orb-text">
                <b>${pct}%</b>
                <span>Unlocked</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Badges Grid -->
        <div class="achievement-grid">
          ${achievements.map(ach => `
            <div class="card achievement-card ${ach.unlocked ? 'unlocked' : ''}">
              <div style="font-size: 32px; padding: 10px; background: rgba(255,255,255,0.03); border-radius: 12px; border: 1px solid rgba(255,255,255,0.1);">
                ${ach.icon}
              </div>
              <div style="flex: 1; min-width: 0;">
                <div style="display: flex; align-items: center; justify-content: space-between;">
                  <b style="font-size: 15px; color: #fff;">${ach.title}</b>
                  <span class="tier-badge tier-${ach.tier}">${ach.tier}</span>
                </div>
                <p style="font-size: 12px; color: var(--text-muted); margin: 6px 0 10px;">${ach.description}</p>
                <div class="status-rail" style="height: 4px;">
                  <div class="status-rail-fill" style="width: ${Math.min(100, (ach.progress / ach.target) * 100)}%;"></div>
                </div>
                <div style="display: flex; justify-content: space-between; font-size: 10px; color: var(--text-dim); margin-top: 4px;">
                  <span>Progress: ${ach.progress} / ${ach.target}</span>
                  <span style="color: ${ach.unlocked ? 'var(--accent-teal)' : 'var(--text-muted)'}; font-weight: 800;">
                    ${ach.unlocked ? 'UNLOCKED ✓' : 'LOCKED 🔒'}
                  </span>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  window.ProgressXPAchievements = {
    render: renderAchievements
  };

})(window);
