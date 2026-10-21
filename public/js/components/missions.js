/**
 * Progress XP - Missions & Quests Component
 */

(function (window) {
  'use strict';

  let timerInterval = null;

  function renderMissions(container, state) {
    const missions = state.missions;
    const quest = missions.primaryQuest;
    const daily = missions.dailyList;
    const timed = missions.timedMission;

    container.innerHTML = `
      <div class="missions-root">
        <!-- Hero Primary Boss Quest -->
        <div class="card mission-hero">
          <div class="mission-hero-top">
            <div>
              <span class="badge purple">👑 ${quest.tier}</span>
              <h2>${quest.title}</h2>
              <p>${quest.description}</p>
            </div>
            <div style="text-align: right;">
              <span class="badge gold" style="font-size: 11px;">Reward: +${quest.reward_xp} XP & ${quest.reward_coins} Coins</span>
              <div style="font-family: var(--font-mono); font-size: 26px; font-weight: 900; color: #fff; margin-top: 6px;">
                ${quest.progress} / ${quest.target} ${quest.unit}
              </div>
            </div>
          </div>
          <div class="status-rail" style="height: 6px; margin-top: 14px;">
            <div class="status-rail-fill" style="width: ${(quest.progress / quest.target) * 100}%; background: linear-gradient(90deg, #c084fc, #67e8f9);"></div>
          </div>
        </div>

        <!-- Timed Sprint Challenge Box -->
        <div class="timed-mission-box">
          <div>
            <span class="badge cyan">⚡ Focused Deep Sprint</span>
            <h3 style="font-size: 18px; font-weight: 900; color: #fff; margin: 4px 0;">25-Minute High-Velocity Execution</h3>
            <p style="font-size: 12px; color: var(--text-muted);">
              Lock in for 25 uninterrupted minutes. Earn bonus +80 XP & 35 Coins upon completion.
            </p>
          </div>
          <div style="display: flex; align-items: center; gap: 16px;">
            <div class="timer-digits" id="timedSprintDisplay">25:00</div>
            <button class="btn sm" id="sprintToggleBtn">Start Sprint</button>
          </div>
        </div>

        <!-- Daily Quests List -->
        <div class="tasks-header">
          <h2>
            <span>Daily Objectives & Quests</span>
            <span class="badge gold">${daily.filter(d => d.done).length} / ${daily.length} Claimed</span>
          </h2>
          <button class="btn secondary sm" id="copyYesterdayBtn">
            <i>📋</i> Copy Yesterday's Missions
          </button>
        </div>

        <div class="mission-card-list">
          ${daily.map(m => `
            <div class="card mission-card ${m.done ? 'completed' : ''}">
              <div style="display: flex; align-items: flex-start; justify-content: space-between; gap: 12px;">
                <b style="font-size: 14px; color: #fff; line-height: 1.3;">${m.title}</b>
                <span class="badge cyan">+${m.xp} XP</span>
              </div>
              <div style="display: flex; align-items: center; justify-content: space-between; margin-top: 14px;">
                <span style="font-size: 11px; color: #fbbf24; font-weight: 800;">🪙 +${m.coins} Coins</span>
                <button class="btn sm ${m.done ? 'secondary' : ''}" data-claim-mission="${m.id}" ${m.done ? 'disabled' : ''}>
                  ${m.done ? 'Claimed ✓' : 'Complete Quest'}
                </button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    bindMissionEvents(container);
  }

  function bindMissionEvents(container) {
    // Claim Mission
    container.querySelectorAll('[data-claim-mission]').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-claim-mission');
        window.ProgressXPStore.completeMission(id);
      });
    });

    // Copy Yesterday's Missions
    const copyBtn = container.querySelector('#copyYesterdayBtn');
    if (copyBtn) {
      copyBtn.addEventListener('click', () => {
        window.ProgressXPStore.copyYesterdayMissions();
      });
    }

    // Timed sprint logic
    const sprintBtn = container.querySelector('#sprintToggleBtn');
    const display = container.querySelector('#timedSprintDisplay');
    let isRunning = false;
    let secondsLeft = 25 * 60;

    if (sprintBtn && display) {
      sprintBtn.addEventListener('click', () => {
        if (!isRunning) {
          isRunning = true;
          sprintBtn.textContent = 'Pause';
          sprintBtn.classList.add('secondary');
          if (window.ProgressXPAudio) window.ProgressXPAudio.playClick();

          timerInterval = setInterval(() => {
            secondsLeft--;
            const m = Math.floor(secondsLeft / 60);
            const s = secondsLeft % 60;
            display.textContent = `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;

            if (secondsLeft <= 0) {
              clearInterval(timerInterval);
              isRunning = false;
              sprintBtn.textContent = 'Completed!';
              sprintBtn.disabled = true;
              window.ProgressXPStore.getState().auth.user.xp += 80;
              window.ProgressXPStore.getState().auth.user.coins += 35;
              window.ProgressXPStore.checkLevelUp();
              window.ProgressXPStore.notify('missions');
              if (window.ProgressXPAudio) window.ProgressXPAudio.playLevelUp();
            }
          }, 1000);
        } else {
          isRunning = false;
          clearInterval(timerInterval);
          sprintBtn.textContent = 'Resume Sprint';
          sprintBtn.classList.remove('secondary');
        }
      });
    }
  }

  window.ProgressXPMissions = {
    render: renderMissions
  };

})(window);
