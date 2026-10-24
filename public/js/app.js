// Progress XP Production Main Application Controller
(function() {
  'use strict';

  const store = window.ProgressXPStore;

  function init() {
    setupRailNav();
    setupHeader();
    setupQuickAddModal();
    setupOutsideScene();
    setupWakeClock();
    setupCarousel();

    store.subscribe(render);
    render(store.getState());

    if (window.ProgressXPTour) {
      window.ProgressXPTour.init();
    }
  }

  // DAYPART & OUTSIDE SCENE LOGIC
  function getDaypart(hour) {
    if (hour >= 5 && hour < 11) return { name: 'Morning mode', kind: 'morning' };
    if (hour >= 11 && hour < 16) return { name: 'Daytime mode', kind: 'daytime' };
    if (hour >= 16 && hour < 19) return { name: 'Evening mode', kind: 'evening' };
    return { name: 'Night mode', kind: 'night' };
  }

  function setupOutsideScene() {
    function updateClock() {
      const now = new Date();
      const h = now.getHours();
      const m = String(now.getMinutes()).padStart(2, '0');
      const timeStr = `${String(h).padStart(2, '0')}:${m}`;
      
      const timeEl = document.querySelector('[data-outside-time]');
      if (timeEl) timeEl.textContent = timeStr;

      const part = getDaypart(h);
      const modeEl = document.querySelector('[data-outside-mode]');
      if (modeEl) modeEl.textContent = part.name;
    }

    updateClock();
    setInterval(updateClock, 15000);
  }

  // WAKE UP ANALOG CLOCK TICKER
  function setupWakeClock() {
    function tick() {
      const now = new Date();
      const h = now.getHours();
      const m = now.getMinutes();
      const s = now.getSeconds();

      const hourHand = document.querySelector('.clock-hand.hour');
      const minHand = document.querySelector('.clock-hand.minute');
      const secHand = document.querySelector('.clock-hand.second');
      const digitalEl = document.querySelector('[data-wake-digital-time]');

      if (hourHand) hourHand.style.transform = `rotate(${(h % 12) * 30 + m * 0.5}deg)`;
      if (minHand) minHand.style.transform = `rotate(${m * 6 + s * 0.1}deg)`;
      if (secHand) secHand.style.transform = `rotate(${s * 6}deg)`;

      if (digitalEl) {
        digitalEl.textContent = now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', second: '2-digit' });
      }
    }

    tick();
    setInterval(tick, 1000);
  }

  // CAROUSEL LOGIC
  function setupCarousel() {
    const dots = document.querySelectorAll('.carousel-dot');
    dots.forEach((dot, idx) => {
      dot.addEventListener('click', () => {
        dots.forEach(d => d.classList.remove('active'));
        dot.classList.add('active');
        if (window.ProgressXPSound) window.ProgressXPSound.play('click');
      });
    });
  }

  // RAIL & TAB NAVIGATION
  function setupRailNav() {
    const railButtons = document.querySelectorAll('[data-rail-tab]');
    railButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const targetTab = btn.getAttribute('data-rail-tab');
        store.setActiveTab(targetTab);
      });
    });

    const mobileButtons = document.querySelectorAll('[data-mobile-tab]');
    mobileButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const targetTab = btn.getAttribute('data-mobile-tab');
        store.setActiveTab(targetTab);
      });
    });
  }

  // HEADER, NOTIFICATIONS & DRAWER MENU
  function setupHeader() {
    const modeBtn = document.getElementById('simpleModeToggle');
    if (modeBtn) {
      modeBtn.addEventListener('click', () => {
        store.toggleSimpleMode();
      });
    }

    const menuBtn = document.getElementById('menuToggle');
    const backdrop = document.getElementById('appDrawerBackdrop');
    const closeBtn = document.getElementById('drawerCloseBtn');

    if (menuBtn && backdrop) {
      menuBtn.addEventListener('click', () => {
        backdrop.classList.add('open');
        if (window.ProgressXPSound) window.ProgressXPSound.play('open');
      });
    }

    if (closeBtn && backdrop) {
      closeBtn.addEventListener('click', () => {
        backdrop.classList.remove('open');
        if (window.ProgressXPSound) window.ProgressXPSound.play('close');
      });
    }

    if (backdrop) {
      backdrop.addEventListener('click', (e) => {
        if (e.target === backdrop) {
          backdrop.classList.remove('open');
          if (window.ProgressXPSound) window.ProgressXPSound.play('close');
        }
      });

      backdrop.querySelectorAll('[data-drawer-nav]').forEach(link => {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          const tab = link.getAttribute('data-drawer-nav');
          store.setActiveTab(tab);
          backdrop.classList.remove('open');
        });
      });
    }

    const notifBtn = document.getElementById('notifBellBtn');
    if (notifBtn) {
      notifBtn.addEventListener('click', () => {
        if (window.ProgressXPSound) window.ProgressXPSound.play('focus');
        alert('🔔 Notifications (4 Unread)\n\n• Streak Protected: Yesterday’s consistency secured!\n• New Boss Quest Available: 3-Hour Deep Work Sprint\n• Rank Perk Unlocked: Starter Male Anime Avatar\n• Weekly Consistency: Capability profile is stable.');
      });
    }
  }

  // QUICK ADD TASK MODAL
  function setupQuickAddModal() {
    const addBtns = document.querySelectorAll('[data-open-add-task]');
    const modal = document.getElementById('quickAddModal');
    const closeBtns = document.querySelectorAll('[data-close-modal]');
    const form = document.getElementById('quickAddForm');

    addBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        if (modal) modal.classList.add('open');
        if (window.ProgressXPSound) window.ProgressXPSound.play('open');
        const input = document.getElementById('taskTitleInput');
        if (input) setTimeout(() => input.focus(), 100);
      });
    });

    closeBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        if (modal) modal.classList.remove('open');
        if (window.ProgressXPSound) window.ProgressXPSound.play('close');
      });
    });

    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const titleInput = document.getElementById('taskTitleInput');
        const durationSelect = document.getElementById('taskDurationSelect');
        const categorySelect = document.getElementById('taskCategorySelect');

        const title = titleInput.value.trim();
        const duration = parseInt(durationSelect.value, 10) || 30;
        const category = categorySelect.value || 'Personal';

        if (title) {
          store.addTask(title, category, duration * 3, Math.round(duration / 3), duration);
          titleInput.value = '';
          if (modal) modal.classList.remove('open');
        }
      });
    }
  }

  // MAIN RENDER LOOP
  function render(state) {
    // 1. Sync Simple Mode
    document.body.classList.toggle('mode-simple', state.simpleMode);
    const modeBtn = document.getElementById('simpleModeToggle');
    if (modeBtn) {
      modeBtn.textContent = state.simpleMode ? 'Standard Mode' : 'Simple Mode';
    }

    // 2. Active View Panels
    document.querySelectorAll('.view-panel').forEach(p => p.classList.remove('active'));
    const activePanel = document.getElementById(`panel_${state.activeTab}`);
    if (activePanel) activePanel.classList.add('active');

    // Sync Rail Buttons
    document.querySelectorAll('[data-rail-tab]').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-rail-tab') === state.activeTab);
    });
    document.querySelectorAll('[data-mobile-tab]').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-mobile-tab') === state.activeTab);
    });

    // 3. User Stats & XP
    const totalXpEl = document.querySelector('[data-total-xp]');
    if (totalXpEl) totalXpEl.textContent = state.user.totalXp;

    const todayXpEl = document.querySelector('[data-today-xp]');
    if (todayXpEl) todayXpEl.textContent = `${state.user.xpToday} XP today`;

    const streakEl = document.querySelector('[data-streak-days]');
    if (streakEl) streakEl.textContent = `${state.user.streakDays} days`;

    const focusedEl = document.querySelector('[data-focused-minutes]');
    if (focusedEl) focusedEl.textContent = `${state.user.focusedTodayMinutes} min`;

    const openTasksCount = state.tasks.filter(t => !t.done).length;
    const openTasksEl = document.querySelector('[data-open-tasks]');
    if (openTasksEl) openTasksEl.textContent = `${openTasksCount} tasks`;

    // Level progress
    const levelProgressEl = document.querySelector('[data-xp-progress-fill]');
    const levelLabelEl = document.querySelector('[data-level-label]');
    if (levelProgressEl && levelLabelEl) {
      const pct = Math.min(100, Math.round((state.user.totalXp / state.user.xpToNextLevel) * 100));
      levelProgressEl.style.width = `${Math.max(8, pct)}%`;
      levelLabelEl.textContent = `${state.user.xpToNextLevel - state.user.totalXp} XP to Level ${state.user.level + 1}`;
    }

    // 4. Today Plan Card Ring & Metrics
    const completedTasksCount = state.tasks.filter(t => t.done).length;
    const totalTasksCount = state.tasks.length;
    const planCountEl = document.querySelector('[data-today-plan-count]');
    if (planCountEl) planCountEl.textContent = `${completedTasksCount} / ${totalTasksCount}`;

    // Render Timeline Items
    renderTimelineItems(state.tasks);

    // 5. Render Tasks List
    renderTasksList(state.tasks);

    // 6. Growth & Work Intelligence View
    if (window.ProgressXPGrowth) {
      const growthContainer = document.getElementById('growthWorkspace');
      if (growthContainer) {
        window.ProgressXPGrowth.render(growthContainer, state);
      }
    }

    // 7. Full Application Modules Renderers
    if (state.activeTab === 'mission' && window.ProgressXPMissions) {
      const el = document.getElementById('missionWorkspace');
      if (el) window.ProgressXPMissions.render(el, state);
    }
    if (state.activeTab === 'habits' && window.ProgressXPHabits) {
      const el = document.getElementById('habitsWorkspace');
      if (el) window.ProgressXPHabits.render(el, state);
    }
    if (state.activeTab === 'shop' && window.ProgressXPShop) {
      const el = document.getElementById('shopWorkspace');
      if (el) window.ProgressXPShop.render(el, state);
    }
    if (state.activeTab === 'achievements' && window.ProgressXPAchievements) {
      const el = document.getElementById('achievementsWorkspace');
      if (el) window.ProgressXPAchievements.render(el, state);
    }
    if (state.activeTab === 'leaderboard' && window.ProgressXPLeaderboard) {
      const el = document.getElementById('leaderboardWorkspace');
      if (el) window.ProgressXPLeaderboard.render(el, state);
    }
    if (state.activeTab === 'library' && window.ProgressXPLibrary) {
      const el = document.getElementById('libraryWorkspace');
      if (el) window.ProgressXPLibrary.render(el, state);
    }
    if (state.activeTab === 'finance' && window.ProgressXPFinance) {
      const el = document.getElementById('financeWorkspace');
      if (el) window.ProgressXPFinance.render(el, state);
    }
    if (state.activeTab === 'community' && window.ProgressXPCommunity) {
      const el = document.getElementById('communityWorkspace');
      if (el) window.ProgressXPCommunity.render(el, state);
    }
    if (state.activeTab === 'admin' && window.ProgressXPAdmin) {
      const el = document.getElementById('adminWorkspace');
      if (el) window.ProgressXPAdmin.render(el, state);
    }

    // Sync drawer active highlights
    document.querySelectorAll('[data-drawer-nav]').forEach(item => {
      item.classList.toggle('active', item.getAttribute('data-drawer-nav') === state.activeTab);
    });
  }

  function renderTimelineItems(tasks) {
    const timelineGrid = document.querySelector('.timeline-grid');
    if (!timelineGrid) return;

    timelineGrid.innerHTML = '';
    const displayTasks = tasks.slice(0, 3);

    displayTasks.forEach(task => {
      const item = document.createElement('div');
      item.className = `timeline-item ${task.done ? 'is-done' : (task.paceStatus === 'behind' ? 'is-behind' : 'is-next')}`;
      
      const icon = task.done ? '✓' : (task.paceStatus === 'behind' ? '!' : '○');
      const statusText = task.done ? 'Done' : (task.paceStatus === 'behind' ? 'Behind' : 'Next');

      item.innerHTML = `
        <div class="timeline-icon-box">${icon}</div>
        <div class="timeline-content">
          <div class="timeline-title-row">
            <span class="timeline-title">${escapeHtml(task.title)}</span>
            <span class="timeline-time-state">${task.scheduledTime} ${statusText}</span>
          </div>
          <p class="timeline-sub">By ${task.scheduledTime} · ${task.durationMinutes} min</p>
        </div>
      `;
      timelineGrid.appendChild(item);
    });
  }

  function renderTasksList(tasks) {
    const listContainer = document.querySelector('.tasks-container');
    if (!listContainer) return;

    listContainer.innerHTML = '';

    tasks.forEach(task => {
      const card = document.createElement('article');
      card.className = `task-card ${task.done ? 'is-completed' : ''}`;
      card.id = `task_card_${task.id}`;

      const isPending = store.isPendingGrace(task.id);

      card.innerHTML = `
        <div class="task-details">
          <h3 class="task-heading">${escapeHtml(task.title)}</h3>
          <p class="task-subtext">${escapeHtml(task.desc)}</p>
          <div class="task-badges-row">
            <span class="task-tag priority">Priority #${task.priority}</span>
            <span class="task-tag">${task.category}</span>
            <span class="task-tag">${task.recurrence}</span>
            <span class="task-tag xp">${task.xp} XP</span>
            <span class="task-tag coins">${task.coins} coins</span>
            <span class="task-tag">${task.durationMinutes} min</span>
          </div>
        </div>
        <button type="button" class="btn-complete ${task.done ? 'is-done' : ''} ${isPending ? 'undo-state' : ''}" data-task-action="${task.id}">
          ${task.done ? 'Completed ✓' : (isPending ? 'Cancel (3s)' : 'Complete →')}
        </button>
      `;

      const btn = card.querySelector(`[data-task-action="${task.id}"]`);
      if (btn) {
        btn.addEventListener('click', () => {
          if (task.done) {
            store.undoTask(task.id);
          } else if (store.isPendingGrace(task.id)) {
            store.cancelCompleteTask(task.id);
            btn.classList.remove('undo-state');
            btn.textContent = 'Complete →';
          } else {
            btn.classList.add('undo-state');
            store.startCompleteTaskGracePeriod(
              task.id,
              (sec) => {
                btn.textContent = `Cancel (${sec}s)`;
              },
              () => {
                btn.classList.remove('undo-state');
                btn.classList.add('is-done');
                btn.textContent = 'Completed ✓';
              }
            );
          }
        });
      }

      listContainer.appendChild(card);
    });
  }

  function renderAttributes(attrs) {
    const container = document.getElementById('attributeMatrixGrid');
    if (!container || !attrs) return;

    container.innerHTML = '';
    const items = [
      { key: 'vitality', name: 'Vitality', icon: '❤️' },
      { key: 'focus', name: 'Focus', icon: '🎯' },
      { key: 'discipline', name: 'Discipline', icon: '⚡' },
      { key: 'mastery', name: 'Mastery', icon: '🛡️' },
      { key: 'wisdom', name: 'Wisdom', icon: '🔮' }
    ];

    items.forEach(item => {
      const val = attrs[item.key] || 0;
      const el = document.createElement('div');
      el.className = 'attribute-card';
      el.innerHTML = `
        <div class="attribute-head">
          <span class="attribute-name">${item.icon} ${item.name}</span>
          <span class="attribute-val">${val} / 100</span>
        </div>
        <div class="attribute-bar">
          <div class="attribute-fill" style="width: ${val}%;"></div>
        </div>
      `;
      container.appendChild(el);
    });
  }

  function escapeHtml(str) {
    return String(str || '').replace(/[&<>"']/g, c => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[c]));
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
