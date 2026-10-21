/**
 * Progress XP - Leaderboard Component
 */

(function (window) {
  'use strict';

  function renderLeaderboard(container, state) {
    const list = state.leaderboard;

    container.innerHTML = `
      <div class="leaderboard-root">
        <div class="card" style="margin-bottom: 20px; background: linear-gradient(145deg, #0f2038, #081427); border-color: rgba(103, 232, 249, 0.3);">
          <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 14px;">
            <div>
              <span class="badge gold" style="margin-bottom: 6px;">Global Rankings</span>
              <h2 style="font-size: 22px; font-weight: 900; color: #fff;">Consistency Hall of Fame</h2>
              <p style="font-size: 12px; color: var(--text-muted); margin-top: 3px;">
                Top players ranked by total XP points, weekly velocity, and uninterrupted streaks.
              </p>
            </div>
            <div style="display: flex; gap: 8px;">
              <button class="btn sm" id="globalLeagueBtn">All-Time</button>
              <button class="btn secondary sm" id="weeklyLeagueBtn">This Week</button>
            </div>
          </div>
        </div>

        <div class="card" style="padding: 0; overflow: hidden;">
          <table class="leaderboard-table">
            <thead>
              <tr>
                <th style="width: 8%;">Rank</th>
                <th style="width: 42%;">Player</th>
                <th style="width: 20%;">League Tier</th>
                <th style="width: 15%;">Streak</th>
                <th style="width: 15%;">Total XP</th>
              </tr>
            </thead>
            <tbody>
              ${list.map(user => `
                <tr class="${user.isCurrentUser ? 'current-user-row' : ''}">
                  <td>
                    <b style="font-size: 15px; color: ${user.rank === 1 ? '#fbbf24' : user.rank === 2 ? '#cbd5e1' : user.rank === 3 ? '#cd7f32' : 'var(--text-muted)'};">
                      #${user.rank}
                    </b>
                  </td>
                  <td>
                    <div style="display: flex; align-items: center; gap: 10px;">
                      <div style="width: 34px; height: 34px; border-radius: 50%; background: #142a42; border: 1px solid var(--accent-cyan); display: grid; place-items: center; font-size: 14px;">
                        ⚡
                      </div>
                      <div>
                        <b style="color: #fff; font-size: 14px;">${user.name}</b>
                        <small style="display: block; color: var(--text-muted); font-size: 11px;">@${user.username}</small>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span class="badge cyan">${user.tier}</span>
                  </td>
                  <td>
                    <div class="leaderboard-streak-pill">
                      <span>🔥</span>
                      <b>${user.streak}d</b>
                    </div>
                  </td>
                  <td>
                    <b style="font-family: var(--font-mono); font-size: 14px; color: #fff;">${user.xp.toLocaleString()} XP</b>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  window.ProgressXPLeaderboard = {
    render: renderLeaderboard
  };

})(window);
