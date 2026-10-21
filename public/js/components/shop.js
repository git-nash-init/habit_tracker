/**
 * Progress XP - Reward Vault & Shop Component
 */

(function (window) {
  'use strict';

  function renderShop(container, state) {
    const user = state.auth.user;
    const rewards = state.rewards;
    const history = state.claimedRewards;

    container.innerHTML = `
      <div class="shop-root">
        <!-- Balance Banner -->
        <div class="shop-balance-banner">
          <div>
            <span class="badge gold" style="margin-bottom: 6px;">The Dopamine Vault</span>
            <h2 style="font-size: 22px; font-weight: 900; color: #fff;">Reward & Motivation Store</h2>
            <p style="font-size: 12px; color: var(--text-muted); margin-top: 3px;">
              Exchange your hard-earned XP coins for guilt-free real-world rewards and recreational perks.
            </p>
          </div>
          <div style="display: flex; align-items: center; gap: 14px;">
            <div class="shop-coin-pill">
              <span>🪙</span>
              <b>${user.coins.toLocaleString()}</b>
              <small style="font-size: 11px; text-transform: uppercase; color: #f59e0b;">Coins</small>
            </div>
            <button class="btn sm" id="craftRewardBtn">
              <i>＋</i> Craft Custom Reward
            </button>
          </div>
        </div>

        <!-- Rewards Catalog -->
        <div class="rewards-grid">
          ${rewards.map(reward => `
            <div class="card reward-card">
              <div>
                <div class="reward-card-icon">${reward.icon}</div>
                <h3 style="font-size: 16px; font-weight: 800; color: #fff; line-height: 1.25;">${reward.title}</h3>
                <p style="font-size: 12px; color: var(--text-muted); margin-top: 6px;">${reward.description}</p>
              </div>
              <div style="display: flex; align-items: center; justify-content: space-between; margin-top: 18px; padding-top: 12px; border-top: 1px solid var(--card-border);">
                <div class="reward-cost-tag">
                  <span>🪙</span>
                  <span>${reward.cost_coins}</span>
                </div>
                <button class="btn sm ${user.coins >= reward.cost_coins ? '' : 'secondary'}" data-redeem="${reward.id}">
                  ${user.coins >= reward.cost_coins ? 'Unlock Reward' : 'Need More Coins'}
                </button>
              </div>
            </div>
          `).join('')}
        </div>

        <!-- Redemption Ledger -->
        ${history.length > 0 ? `
          <div class="card" style="margin-top: 28px;">
            <h3 style="font-size: 15px; font-weight: 800; color: #fff; margin-bottom: 12px;">Recently Unlocked Rewards</h3>
            <div style="display: flex; flex-direction: column; gap: 8px;">
              ${history.map(item => `
                <div style="display: flex; align-items: center; justify-content: space-between; padding: 10px 14px; background: rgba(255,255,255,0.02); border-radius: var(--radius-sm); border: 1px solid var(--card-border);">
                  <span style="font-size: 13px; color: #fff;">${item.title}</span>
                  <div style="display: flex; gap: 12px; align-items: center;">
                    <span style="color: #fbbf24; font-size: 11px; font-weight: 800;">-${item.cost_coins} Coins</span>
                    <span style="color: var(--text-dim); font-size: 11px;">${item.claimedAt}</span>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        ` : ''}
      </div>

      <!-- Craft Custom Reward Modal -->
      <div class="modal-overlay" id="craftRewardModal">
        <div class="modal-card">
          <div class="modal-head">
            <h3>Craft Your Personal Reward</h3>
            <button class="btn secondary sm" id="closeCraftModalBtn">✕</button>
          </div>
          <form id="craftRewardForm">
            <div class="field">
              <label>Reward Title</label>
              <input type="text" id="customRewardTitle" placeholder="e.g. Saturday Movie Night & Popcorn" required>
            </div>
            <div class="field">
              <label>Coin Price</label>
              <input type="number" id="customRewardCost" value="200" min="20" max="5000" required>
            </div>
            <div class="field">
              <label>Icon Emoji</label>
              <input type="text" id="customRewardIcon" value="🍿" maxlength="2" required>
            </div>
            <div style="display: flex; justify-content: flex-end; gap: 8px; margin-top: 14px;">
              <button type="button" class="btn secondary sm" id="cancelCraftBtn">Cancel</button>
              <button type="submit" class="btn sm">Add to Vault</button>
            </div>
          </form>
        </div>
      </div>
    `;

    bindShopEvents(container);
  }

  function bindShopEvents(container) {
    // Redeem button clicks
    container.querySelectorAll('[data-redeem]').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-redeem');
        const res = window.ProgressXPStore.redeemReward(id);
        if (!res.ok) {
          alert(res.msg);
        }
      });
    });

    // Custom reward modal
    const modal = container.querySelector('#craftRewardModal');
    const openBtn = container.querySelector('#craftRewardBtn');
    const closeBtn = container.querySelector('#closeCraftModalBtn');
    const cancelBtn = container.querySelector('#cancelCraftBtn');
    const form = container.querySelector('#craftRewardForm');

    if (openBtn && modal) openBtn.addEventListener('click', () => modal.classList.add('open'));
    if (closeBtn && modal) closeBtn.addEventListener('click', () => modal.classList.remove('open'));
    if (cancelBtn && modal) cancelBtn.addEventListener('click', () => modal.classList.remove('open'));

    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = container.querySelector('#customRewardTitle').value;
        const cost = container.querySelector('#customRewardCost').value;
        const icon = container.querySelector('#customRewardIcon').value;
        window.ProgressXPStore.addCustomReward(title, cost, icon);
        modal.classList.remove('open');
        form.reset();
        if (window.ProgressXPAudio) window.ProgressXPAudio.playTaskComplete();
      });
    }
  }

  window.ProgressXPShop = {
    render: renderShop
  };

})(window);
