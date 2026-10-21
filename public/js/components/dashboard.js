/**
 * Progress XP - Dashboard & Task Flow Component
 */

(function (window) {
  'use strict';

  function renderDashboard(container, state) {
    const user = state.auth.user;
    const tasks = state.tasks;
    const db = state.dashboard;
    const completedCount = tasks.filter(t => t.done).length;
    const progressPct = Math.round((user.xp / user.next_level_xp) * 100);

    container.innerHTML = `
      <div class="dashboard-root">
        <!-- 4-Card Status Board -->
        <div class="dashboard-grid">
          <div class="card status-card">
            <div class="status-card-head">
              <span>Total Progression</span>
              <span class="badge cyan">Lv. ${user.level}</span>
            </div>
            <div class="status-card-value">
              ${user.xp.toLocaleString()} <small>XP</small>
            </div>
            <div class="status-rail">
              <div class="status-rail-fill" style="width: ${progressPct}%"></div>
            </div>
            <small style="color: var(--text-muted); font-size: 10px; margin-top: 4px;">
              ${user.next_level_xp - user.xp} XP until Level ${user.level + 1}
            </small>
          </div>

          <div class="card status-card">
            <div class="status-card-head">
              <span>Rank Standing</span>
              <span class="badge gold">Tier ${user.rank_tier}</span>
            </div>
            <div style="display: flex; align-items: center; gap: 12px; margin: 6px 0;">
              <div class="rank-emblem rank-${user.rank.toLowerCase()}">
                <span>XP</span>
              </div>
              <div>
                <b style="font-size: 16px; color: #fff; display: block;">${user.rank}</b>
                <small style="font-size: 10px; color: var(--accent-cyan);">${user.title}</small>
              </div>
            </div>
            <small style="color: var(--text-muted); font-size: 10px;">
              Top 8% of all consistency players
            </small>
          </div>

          <div class="card status-card">
            <div class="status-card-head">
              <span>Active Streak</span>
              <span class="badge emerald">Best: ${user.best_streak} Days</span>
            </div>
            <div class="status-card-value">
              🔥 ${user.streak} <small>Days</small>
            </div>
            <div class="status-rail">
              <div class="status-rail-fill" style="width: ${Math.min(100, (user.streak / user.best_streak) * 100)}%; background: linear-gradient(90deg, #f59e0b, #ef4444);"></div>
            </div>
            <small style="color: var(--text-muted); font-size: 10px; margin-top: 4px;">
              Keep momentum alive today!
            </small>
          </div>

          <div class="card status-card">
            <div class="status-card-head">
              <span>Life Status Balance</span>
              <span class="badge purple">${db.goal_pct}% Overall</span>
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 6px; margin-top: 8px;">
              <div style="font-size: 10px; color: var(--text-muted);">Physical: <b style="color: #34d399;">${db.life_status.physical}%</b></div>
              <div style="font-size: 10px; color: var(--text-muted);">Mental: <b style="color: #67e8f9;">${db.life_status.mental}%</b></div>
              <div style="font-size: 10px; color: var(--text-muted);">Finance: <b style="color: #fbbf24;">${db.life_status.financial}%</b></div>
              <div style="font-size: 10px; color: var(--text-muted);">Skill: <b style="color: #c084fc;">${db.life_status.skill}%</b></div>
            </div>
          </div>
        </div>

        <!-- Available Tasks Section -->
        <div class="tasks-header">
          <h2>
            <span>Today's Available Tasks</span>
            <span class="badge cyan">${completedCount} / ${tasks.length} Completed</span>
          </h2>
          <div style="display: flex; gap: 8px;">
            <button class="btn secondary sm" id="reorderTasksBtn">
              <i>↕️</i> Priority Order
            </button>
            <button class="btn sm" id="quickAddTaskBtn">
              <i>＋</i> Add Task
            </button>
          </div>
        </div>

        <!-- Inline Quick Add Task (hidden by default) -->
        <div class="card" id="addTaskPanel" style="display: none; margin-bottom: 14px;">
          <form id="addTaskForm" style="display: grid; grid-template-columns: 2fr 1fr auto auto; gap: 10px; align-items: flex-end;">
            <div class="field" style="margin: 0;">
              <label>Task Description</label>
              <input type="text" id="newTaskTitle" placeholder="What needs to get done?" required>
            </div>
            <div class="field" style="margin: 0;">
              <label>Category</label>
              <select id="newTaskCategory">
                <option value="Focus">Focus / Deep Work</option>
                <option value="Health">Health & Fitness</option>
                <option value="Learning">Learning & Wisdom</option>
                <option value="Finance">Personal Finance</option>
                <option value="Personal">Personal Routine</option>
              </select>
            </div>
            <div class="field" style="margin: 0;">
              <label>XP Reward</label>
              <input type="number" id="newTaskXp" value="30" min="10" max="100" style="width: 80px;">
            </div>
            <div style="display: flex; gap: 6px;">
              <button type="submit" class="btn sm">Save</button>
              <button type="button" class="btn secondary sm" id="cancelAddTaskBtn">Cancel</button>
            </div>
          </form>
        </div>

        <!-- Tasks List -->
        <div class="tasks-list" id="dashboardTasksList">
          ${tasks.map(task => renderTaskItem(task)).join('')}
        </div>
      </div>

      <!-- Priority Reorder Modal -->
      <div class="modal-overlay" id="reorderModal">
        <div class="modal-card">
          <div class="modal-head">
            <h3>Reorder Task Priority</h3>
            <button class="btn secondary sm" id="closeReorderModalBtn">✕</button>
          </div>
          <p style="font-size: 12px; color: var(--text-muted); margin-bottom: 14px;">
            Adjust the priority order of tasks for optimal daily execution flow.
          </p>
          <div id="reorderList" style="display: flex; flex-direction: column; gap: 8px;">
            ${tasks.map((t, idx) => `
              <div class="task-item" data-reorder-id="${t.id}" style="padding: 10px 14px; justify-content: space-between;">
                <span style="font-size: 13px; color: #fff;">${idx + 1}. ${t.title}</span>
                <div style="display: flex; gap: 4px;">
                  <button class="btn secondary sm move-up-btn" data-id="${t.id}" ${idx === 0 ? 'disabled' : ''}>↑</button>
                  <button class="btn secondary sm move-down-btn" data-id="${t.id}" ${idx === tasks.length - 1 ? 'disabled' : ''}>↓</button>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;

    bindDashboardEvents(container);
  }

  function renderTaskItem(task) {
    if (task.inGracePeriod) {
      return `
        <div class="task-item" id="taskRow_${task.id}" style="border-color: rgba(239, 68, 68, 0.4); background: rgba(239, 68, 68, 0.05);">
          <div class="task-check-btn" style="background: var(--accent-teal); border-color: var(--accent-teal); color: #04101e;">✓</div>
          <div class="task-info">
            <div class="task-title" style="text-decoration: line-through; color: var(--text-dim);">${task.title}</div>
            <div class="task-meta">
              <span class="task-reward-xp">+${task.xp} XP</span>
              <span class="task-reward-coins">+${task.coins} Coins</span>
            </div>
          </div>
          <div class="task-undo-countdown">
            <span>Cancel</span>
            <b id="countdown_${task.id}">${task.graceRemaining}s</b>
            <button class="undo-cancel-btn" data-undo="${task.id}">Undo</button>
          </div>
        </div>
      `;
    }

    return `
      <div class="task-item ${task.done ? 'completed' : ''}" id="taskRow_${task.id}">
        <button class="task-check-btn" data-complete="${task.id}" ${task.done ? 'disabled' : ''}>
          ${task.done ? '✓' : ''}
        </button>
        <div class="task-info">
          <div class="task-title">${task.title}</div>
          <div class="task-meta">
            <span class="badge" style="font-size: 9px;">${task.category}</span>
            <span class="task-reward-xp">+${task.xp} XP</span>
            <span class="task-reward-coins">+${task.coins} Coins</span>
            <span>⏱️ ${task.minutes}m</span>
          </div>
        </div>
        <div class="task-actions">
          <button class="btn secondary sm" style="padding: 4px 8px; font-size: 10px;" data-delete="${task.id}">✕</button>
        </div>
      </div>
    `;
  }

  function bindDashboardEvents(container) {
    // Complete task click
    container.querySelectorAll('[data-complete]').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-complete');
        window.ProgressXPStore.completeTask(
          id,
          (remaining) => {
            const cd = document.getElementById(`countdown_${id}`);
            if (cd) cd.textContent = `${remaining}s`;
          },
          () => {
            // Re-render when grace period completes
            const store = window.ProgressXPStore;
            renderDashboard(container, store.getState());
          }
        );
      });
    });

    // Undo task click
    container.querySelectorAll('[data-undo]').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-undo');
        window.ProgressXPStore.undoTask(id);
      });
    });

    // Delete task click
    container.querySelectorAll('[data-delete]').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-delete');
        if (confirm('Delete this task?')) {
          window.ProgressXPStore.deleteTask(id);
        }
      });
    });

    // Add task panel toggle
    const addBtn = container.querySelector('#quickAddTaskBtn');
    const addPanel = container.querySelector('#addTaskPanel');
    const cancelBtn = container.querySelector('#cancelAddTaskBtn');
    const addForm = container.querySelector('#addTaskForm');

    if (addBtn && addPanel) {
      addBtn.addEventListener('click', () => {
        addPanel.style.display = addPanel.style.display === 'none' ? 'block' : 'none';
        if (addPanel.style.display === 'block') {
          container.querySelector('#newTaskTitle').focus();
        }
      });
    }

    if (cancelBtn && addPanel) {
      cancelBtn.addEventListener('click', () => {
        addPanel.style.display = 'none';
      });
    }

    if (addForm) {
      addForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = container.querySelector('#newTaskTitle').value;
        const category = container.querySelector('#newTaskCategory').value;
        const xp = container.querySelector('#newTaskXp').value;
        window.ProgressXPStore.addTask(title, category, xp, Math.round(xp / 2), 25);
        addForm.reset();
        addPanel.style.display = 'none';
        if (window.ProgressXPAudio) window.ProgressXPAudio.playClick();
      });
    }

    // Reorder modal
    const reorderBtn = container.querySelector('#reorderTasksBtn');
    const modal = container.querySelector('#reorderModal');
    const closeModalBtn = container.querySelector('#closeReorderModalBtn');

    if (reorderBtn && modal) {
      reorderBtn.addEventListener('click', () => {
        modal.classList.add('open');
      });
    }

    if (closeModalBtn && modal) {
      closeModalBtn.addEventListener('click', () => {
        modal.classList.remove('open');
      });
    }

    // Move Up / Down
    container.querySelectorAll('.move-up-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        const tasks = window.ProgressXPStore.getState().tasks;
        const idx = tasks.findIndex(t => t.id === id);
        if (idx > 0) {
          const ids = tasks.map(t => t.id);
          const tmp = ids[idx];
          ids[idx] = ids[idx - 1];
          ids[idx - 1] = tmp;
          window.ProgressXPStore.reorderTasks(ids);
        }
      });
    });

    container.querySelectorAll('.move-down-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        const tasks = window.ProgressXPStore.getState().tasks;
        const idx = tasks.findIndex(t => t.id === id);
        if (idx < tasks.length - 1) {
          const ids = tasks.map(t => t.id);
          const tmp = ids[idx];
          ids[idx] = ids[idx + 1];
          ids[idx + 1] = tmp;
          window.ProgressXPStore.reorderTasks(ids);
        }
      });
    });
  }

  window.ProgressXPDashboard = {
    render: renderDashboard
  };

})(window);
