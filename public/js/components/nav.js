/**
 * Progress XP - Navigation Component
 */

(function (window) {
  'use strict';

  function renderNav(container, state) {
    const activeTab = state.settings.selectedTab;
    const user = state.auth.user;
    const isClutterFree = state.settings.appExperience === 'clutter_free';

    const navItems = [
      { key: 'dashboard', label: 'Dashboard', icon: '📊' },
      { key: 'mission', label: 'Missions', icon: '🎯' },
      { key: 'habits', label: 'Habits Matrix', icon: '⚡' },
      { key: 'shop', label: 'Reward Vault', icon: '💎' },
      { key: 'achievements', label: 'Achievements', icon: '🏆' },
      { key: 'leaderboard', label: 'Leaderboard', icon: '🔥' },
      { key: 'library', label: 'Growth Library', icon: '📚' },
      { key: 'finance', label: 'Personal Finance', icon: '💰' },
      { key: 'community', label: 'Community Hub', icon: '💬' }
    ];

    if (user.role === 'admin') {
      navItems.push({ key: 'admin', label: 'Admin Studio', icon: '⚙️' });
    }

    container.innerHTML = `
      <div class="sidebar-brand">
        <div class="brand-mark">XP</div>
        <div class="brand-info">
          <h1>Progress XP</h1>
          <small>Personal Growth RPG</small>
        </div>
      </div>

      <nav class="nav-scroll">
        ${navItems.map(item => `
          <a href="#" class="nav-link ${item.key === activeTab ? 'active' : ''}" data-nav="${item.key}">
            <i>${item.icon}</i>
            <span>${item.label}</span>
          </a>
        `).join('')}
      </nav>

      <div class="sidebar-footer">
        <button class="mode-toggle-btn" id="modeToggleBtn">
          <span>Mode: ${isClutterFree ? 'Clutter-Free' : 'RPG Standard'}</span>
          <i>${isClutterFree ? '⚪' : '⚡'}</i>
        </button>

        <div class="sidebar-user" id="profileTrigger" style="cursor: pointer;">
          <div class="sidebar-avatar">⚡</div>
          <div class="sidebar-user-meta">
            <b>${user.name}</b>
            <small>${user.rank} • Lv.${user.level}</small>
          </div>
        </div>
      </div>
    `;

    // Bind navigation clicks
    container.querySelectorAll('[data-nav]').forEach(el => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        const tab = el.getAttribute('data-nav');
        if (window.ProgressXPAudio) window.ProgressXPAudio.playClick();
        window.ProgressXPStore.setTab(tab);
        // Close mobile drawer if open
        const sidebar = document.getElementById('appSidebar');
        if (sidebar) sidebar.classList.remove('mobile-open');
      });
    });

    // Bind mode toggle
    const toggleBtn = container.querySelector('#modeToggleBtn');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => {
        if (window.ProgressXPAudio) window.ProgressXPAudio.playClick();
        window.ProgressXPStore.toggleAppExperience();
      });
    }

    // Bind user profile trigger to open avatar vault / account
    const profileTrigger = container.querySelector('#profileTrigger');
    if (profileTrigger) {
      profileTrigger.addEventListener('click', () => {
        if (window.ProgressXPAvatars) {
          window.ProgressXPAvatars.openModal();
        }
      });
    }
  }

  window.ProgressXPNav = {
    render: renderNav
  };

})(window);
