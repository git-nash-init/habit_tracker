/**
 * Progress XP - Habits Matrix & Consistency Component
 */

(function (window) {
  'use strict';

  const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  function renderHabits(container, state) {
    const habits = state.habits;
    const avgConsistency = Math.round(habits.reduce((acc, h) => acc + h.consistency, 0) / Math.max(1, habits.length));
    const totalActiveStreaks = habits.reduce((acc, h) => acc + h.streak, 0);

    container.innerHTML = `
      <div class="habits-root">
        <div class="card habits-overview-card" style="margin-bottom: 20px;">
          <div>
            <span class="badge emerald" style="margin-bottom: 6px;">Daily Habit Engine</span>
            <h2 style="font-size: 22px; font-weight: 900; color: #fff;">Habits Consistency Matrix</h2>
            <p style="font-size: 12px; color: var(--text-muted); margin-top: 3px;">
              Check in on your daily non-negotiables. Consistency compounds into mastery.
            </p>
          </div>
          <div class="habit-stats-group">
            <div class="habit-stat-item">
              <b>${avgConsistency}%</b>
              <small>Avg Consistency</small>
            </div>
            <div class="habit-stat-item">
              <b style="color: #fbbf24;">🔥 ${totalActiveStreaks}</b>
              <small>Combined Streaks</small>
            </div>
            <button class="btn sm" id="newHabitModalBtn">
              <i>＋</i> New Habit
            </button>
          </div>
        </div>

        <!-- Habits Table -->
        <div class="card habits-table-card">
          <table class="habits-table">
            <thead>
              <tr>
                <th style="width: 35%;">Habit Discipline</th>
                <th class="center" style="width: 12%;">Category</th>
                <th class="center" style="width: 10%;">Streak</th>
                ${DAYS.map((d, i) => `<th class="center" style="width: 6%;">${d}</th>`).join('')}
              </tr>
            </thead>
            <tbody>
              ${habits.map(habit => `
                <tr>
                  <td>
                    <div class="habit-name-wrap">
                      <b>${habit.name}</b>
                      <small>${habit.notes || 'No notes added.'}</small>
                    </div>
                  </td>
                  <td class="center">
                    <span class="badge" style="font-size: 9px;">${habit.category}</span>
                  </td>
                  <td class="center">
                    <b style="color: #fbbf24; font-size: 13px;">🔥 ${habit.streak}d</b>
                  </td>
                  ${habit.weekDays.map((val, dayIdx) => `
                    <td class="center">
                      <button class="habit-day-cell ${val ? 'active' : ''}" data-habit="${habit.id}" data-day="${dayIdx}">
                        ${val ? '✓' : ''}
                      </button>
                    </td>
                  `).join('')}
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>

        <!-- AI System Habit Prompt Generator Card -->
        <div class="card" style="margin-top: 24px; background: linear-gradient(145deg, rgba(168, 85, 247, 0.08), rgba(8, 20, 36, 0.9)); border-color: rgba(168, 85, 247, 0.3);">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px;">
            <b style="color: #c084fc; font-size: 14px;">🧠 Habit Optimization Prompt Generator</b>
            <button class="btn secondary sm" id="generateHabitAiBtn">Generate AI Habit Suggestion</button>
          </div>
          <p id="aiHabitOutput" style="font-size: 12px; color: var(--text-main); line-height: 1.5; font-style: italic;">
            Click the button above to receive a personalized atomic habit routine generated for your consistency level.
          </p>
        </div>
      </div>

      <!-- Add Habit Modal -->
      <div class="modal-overlay" id="addHabitModal">
        <div class="modal-box">
          <div class="modal-head">
            <div>
              <small>FORGE · ATOMIC HABIT</small>
              <h3 style="margin: 4px 0 0; color: #fff; font-size: 20px; font-weight: 800;">Forge a New Habit</h3>
            </div>
            <button type="button" class="modal-close-btn" id="closeAddHabitBtn" aria-label="Close modal">×</button>
          </div>
          <form id="addHabitForm">
            <div class="form-group">
              <label for="habitNameInput">Habit Name</label>
              <input type="text" id="habitNameInput" class="form-input" placeholder="e.g. Read 15 mins before bed" required autocomplete="off">
            </div>
            <div class="form-group">
              <label for="habitCategoryInput">Category</label>
              <select id="habitCategoryInput" class="form-select">
                <option value="Health & Vitality" selected>Health & Vitality</option>
                <option value="Physical Fitness">Physical Fitness</option>
                <option value="Deep Focus & Productivity">Deep Focus & Productivity</option>
                <option value="Mindset & Stoicism">Mindset & Stoicism</option>
                <option value="Wisdom & Books">Wisdom & Books</option>
              </select>
            </div>
            <div class="form-group">
              <label for="habitNotesInput">Habit Rules / Notes</label>
              <textarea id="habitNotesInput" class="form-input" rows="3" placeholder="Specific triggers or environment design rules..."></textarea>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn-secondary" id="cancelAddHabit">Cancel</button>
              <button type="submit" class="btn-primary">Forge Habit (+20 XP)</button>
            </div>
          </form>
        </div>
      </div>
    `;

    bindHabitEvents(container);
  }

  function bindHabitEvents(container) {
    // Cell check-ins
    container.querySelectorAll('.habit-day-cell').forEach(cell => {
      cell.addEventListener('click', () => {
        const habitId = cell.getAttribute('data-habit');
        const dayIdx = parseInt(cell.getAttribute('data-day'), 10);
        window.ProgressXPStore.toggleHabitDay(habitId, dayIdx);
      });
    });

    // Add Habit modal controls
    const modal = container.querySelector('#addHabitModal');
    const openBtn = container.querySelector('#newHabitModalBtn');
    const closeBtn = container.querySelector('#closeAddHabitBtn');
    const cancelBtn = container.querySelector('#cancelAddHabit');
    const form = container.querySelector('#addHabitForm');

    if (openBtn && modal) {
      openBtn.addEventListener('click', () => {
        modal.classList.add('open');
        if (window.ProgressXPSound) window.ProgressXPSound.play('open');
        const input = container.querySelector('#habitNameInput');
        if (input) setTimeout(() => input.focus(), 100);
      });
    }

    if (closeBtn && modal) {
      closeBtn.addEventListener('click', () => {
        modal.classList.remove('open');
        if (window.ProgressXPSound) window.ProgressXPSound.play('close');
      });
    }

    if (cancelBtn && modal) {
      cancelBtn.addEventListener('click', () => {
        modal.classList.remove('open');
        if (window.ProgressXPSound) window.ProgressXPSound.play('close');
      });
    }

    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = container.querySelector('#habitNameInput').value;
        const cat = container.querySelector('#habitCategoryInput').value;
        const notes = container.querySelector('#habitNotesInput').value;
        window.ProgressXPStore.addHabit(name, cat, notes);
        modal.classList.remove('open');
        form.reset();
        if (window.ProgressXPSound) window.ProgressXPSound.play('complete');
      });
    }

    // AI suggestions generator
    const aiBtn = container.querySelector('#generateHabitAiBtn');
    const aiOutput = container.querySelector('#aiHabitOutput');
    const AI_SUGGESTIONS = [
      '"After I pour my first morning cup of coffee, I will write down the 1 single must-win outcome for today."',
      '"Whenever I sit at my desk, I will immediately close all browser tabs unrelated to the current deep-work task."',
      '"When 9:00 PM arrives, I will set my phone to grayscale mode and place it across the room to optimize sleep architecture."',
      '"Before opening social media or email, I will complete at least 25 minutes of uninterrupted creative output."'
    ];

    if (aiBtn && aiOutput) {
      aiBtn.addEventListener('click', () => {
        const rand = AI_SUGGESTIONS[Math.floor(Math.random() * AI_SUGGESTIONS.length)];
        aiOutput.textContent = rand;
        if (window.ProgressXPAudio) window.ProgressXPAudio.playClick();
      });
    }
  }

  window.ProgressXPHabits = {
    render: renderHabits
  };

})(window);
