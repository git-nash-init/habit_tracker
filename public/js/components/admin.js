/**
 * Progress XP - Admin Studio Component
 */

(function (window) {
  'use strict';

  function renderAdmin(container, state) {
    const admin = state.admin;
    const users = admin.usersList;

    container.innerHTML = `
      <div class="admin-root">
        <div class="card" style="margin-bottom: 20px; background: linear-gradient(135deg, rgba(18, 38, 68, 0.96), rgba(10, 23, 43, 0.96));">
          <span class="badge purple" style="margin-bottom: 6px;">Executive Control</span>
          <h2 style="font-size: 22px; font-weight: 900; color: #fff;">Admin Studio & Directory</h2>
          <p style="font-size: 12px; color: var(--text-muted); margin-top: 3px;">
            Full administrative control over user accounts, subscription access, broadcast announcements, and telemetry.
          </p>
        </div>

        <div class="admin-layout">
          <!-- Admin Sidebar Rail -->
          <div class="admin-rail">
            <a href="#" class="admin-nav-item active" data-admin-tab="users">
              <i>👥</i> User Directory
            </a>
            <a href="#" class="admin-nav-item" data-admin-tab="broadcast">
              <i>📢</i> System Broadcasts
            </a>
            <a href="#" class="admin-nav-item" data-admin-tab="access">
              <i>💳</i> Access & Plans
            </a>
            <a href="#" class="admin-nav-item" data-admin-tab="telemetry">
              <i>⚡</i> System Telemetry
            </a>
          </div>

          <!-- Admin Main Pane -->
          <div class="admin-main-pane">
            <div id="adminUsersSection">
              <div class="tasks-header">
                <h3>User Accounts (${users.length})</h3>
                <input type="text" id="adminUserSearch" placeholder="Search by name or email..." style="max-width: 260px; padding: 6px 12px; font-size: 12px;">
              </div>

              <div id="adminUsersList">
                ${users.map(u => `
                  <div class="admin-user-card" data-user-card="${u.id}">
                    <div style="display: flex; align-items: center; gap: 12px;">
                      <div style="width: 40px; height: 40px; border-radius: 50%; background: #081427; border: 1px solid var(--accent-cyan); display: grid; place-items: center;">
                        👤
                      </div>
                      <div class="admin-user-meta">
                        <b>${u.name} (@${u.username})</b>
                        <small>${u.email} • ${u.plan}</small>
                      </div>
                    </div>
                    <div style="display: flex; align-items: center; gap: 12px;">
                      <span class="badge cyan">${u.xp.toLocaleString()} XP</span>
                      <span class="badge gold">🔥 ${u.streak}d</span>
                      <span class="badge emerald">${u.status}</span>
                      <button class="btn secondary sm" style="padding: 4px 8px; font-size: 11px;" onclick="alert('Viewing user diagnostics for ${u.username}')">Inspect</button>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>

            <!-- Broadcast Studio (Initially hidden or integrated) -->
            <div id="adminBroadcastSection" class="card" style="margin-top: 20px;">
              <h3 style="font-size: 16px; font-weight: 800; color: #fff; margin-bottom: 12px;">📢 Broadcast Push Announcement</h3>
              <form id="broadcastForm">
                <div class="field">
                  <label>Announcement Headline</label>
                  <input type="text" id="broadcastTitle" value="Season 4 Grandmaster Quest is Live!" required>
                </div>
                <div class="field">
                  <label>Message Content</label>
                  <textarea id="broadcastMsg" rows="2" required>Double XP is active for all focus sessions completed before midnight.</textarea>
                </div>
                <div style="display: flex; justify-content: flex-end; gap: 8px;">
                  <button type="submit" class="btn sm">Broadcast to All Users</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    `;

    bindAdminEvents(container);
  }

  function bindAdminEvents(container) {
    const search = container.querySelector('#adminUserSearch');
    if (search) {
      search.addEventListener('input', (e) => {
        const q = e.target.value.toLowerCase();
        container.querySelectorAll('[data-user-card]').forEach(card => {
          const text = card.textContent.toLowerCase();
          card.style.display = text.includes(q) ? 'flex' : 'none';
        });
      });
    }

    const bForm = container.querySelector('#broadcastForm');
    if (bForm) {
      bForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Broadcast Announcement Dispatched across all active connected clients!');
        if (window.ProgressXPAudio) window.ProgressXPAudio.playLevelUp();
      });
    }
  }

  window.ProgressXPAdmin = {
    render: renderAdmin
  };

})(window);
