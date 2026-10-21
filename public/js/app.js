/**
 * Progress XP - Master Application Controller
 * Bootstraps and coordinates all reverse-engineered Progress XP components.
 */

(function (window, document) {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    const appSidebar = document.getElementById('appSidebar');
    const appMain = document.getElementById('appMain');
    const mobileBottomNav = document.getElementById('mobileBottomNav');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const cursorDot = document.getElementById('cursorDot');

    // Custom Glowing Cursor Dot
    if (cursorDot) {
      document.addEventListener('mousemove', (e) => {
        cursorDot.style.left = `${e.clientX}px`;
        cursorDot.style.top = `${e.clientY}px`;
      });
    }

    // Toggle Mobile Sidebar Drawer
    if (mobileMenuBtn && appSidebar) {
      mobileMenuBtn.addEventListener('click', () => {
        appSidebar.classList.toggle('mobile-open');
      });
    }

    // Initialize Floating Aura Companion
    if (window.ProgressXPAura) {
      window.ProgressXPAura.init();
    }

    // Master Render Router
    function renderApp() {
      const state = window.ProgressXPStore.getState();

      // Check if user is logged in
      if (!state.auth.isLoggedIn) {
        if (appSidebar) appSidebar.style.display = 'none';
        if (mobileBottomNav) mobileBottomNav.style.display = 'none';
        const mobileTopbar = document.querySelector('.mobile-topbar');
        if (mobileTopbar) mobileTopbar.style.display = 'none';

        window.ProgressXPAuth.render(appMain, () => {
          renderApp();
        });
        return;
      }

      // Restore layout if logged in
      if (appSidebar) appSidebar.style.display = '';
      if (mobileBottomNav) mobileBottomNav.style.display = '';
      const mobileTopbar = document.querySelector('.mobile-topbar');
      if (mobileTopbar) mobileTopbar.style.display = '';

      // Render Navigation
      if (window.ProgressXPNav && appSidebar) {
        window.ProgressXPNav.render(appSidebar, state);
      }

      // Update mobile bottom nav active states
      if (mobileBottomNav) {
        mobileBottomNav.querySelectorAll('.mobile-nav-btn').forEach(btn => {
          const tab = btn.getAttribute('data-nav');
          btn.classList.toggle('active', tab === state.settings.selectedTab);
        });
      }

      // Route to active tab component
      const tab = state.settings.selectedTab;
      switch (tab) {
        case 'dashboard':
          window.ProgressXPDashboard.render(appMain, state);
          break;
        case 'mission':
          window.ProgressXPMissions.render(appMain, state);
          break;
        case 'habits':
          window.ProgressXPHabits.render(appMain, state);
          break;
        case 'shop':
        case 'rewards':
          window.ProgressXPShop.render(appMain, state);
          break;
        case 'achievements':
          window.ProgressXPAchievements.render(appMain, state);
          break;
        case 'leaderboard':
          window.ProgressXPLeaderboard.render(appMain, state);
          break;
        case 'library':
          window.ProgressXPLibrary.render(appMain, state);
          break;
        case 'finance':
          window.ProgressXPFinance.render(appMain, state);
          break;
        case 'community':
          window.ProgressXPCommunity.render(appMain, state);
          break;
        case 'admin':
          window.ProgressXPAdmin.render(appMain, state);
          break;
        default:
          window.ProgressXPDashboard.render(appMain, state);
      }

      // Scroll to top smoothly
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Subscribe to store updates
    window.ProgressXPStore.subscribe((state, path) => {
      // Re-render when tab changes or data updates
      renderApp();
    });

    // Mobile bottom nav clicks
    if (mobileBottomNav) {
      mobileBottomNav.querySelectorAll('[data-nav]').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          const tab = btn.getAttribute('data-nav');
          if (window.ProgressXPAudio) window.ProgressXPAudio.playClick();
          window.ProgressXPStore.setTab(tab);
        });
      });
    }

    // Initial render
    renderApp();
  });

})(window, document);
