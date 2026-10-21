/**
 * Progress XP - Growth Library Component
 */

(function (window) {
  'use strict';

  function renderLibrary(container, state) {
    const books = state.library;

    container.innerHTML = `
      <div class="library-root">
        <div class="card" style="margin-bottom: 20px;">
          <span class="badge purple" style="margin-bottom: 6px;">Mindset & Architecture</span>
          <h2 style="font-size: 22px; font-weight: 900; color: #fff;">Growth Library</h2>
          <p style="font-size: 12px; color: var(--text-muted); margin-top: 3px;">
            High-leverage book summaries, cognitive frameworks, and stoic wisdom synthesized for rapid execution.
          </p>
        </div>

        <div class="library-grid">
          ${books.map(b => `
            <div class="card book-card">
              <div>
                <span class="badge" style="font-size: 9px; margin-bottom: 8px;">${b.category}</span>
                <h3>${b.title}</h3>
                <div class="author">By ${b.author} • ${b.duration}</div>
                <p style="font-size: 12px; color: var(--text-muted); line-height: 1.45;">${b.summary}</p>
                <div class="book-takeaway">"${b.keyTakeaway}"</div>
              </div>
              <div style="margin-top: 14px; padding-top: 12px; border-top: 1px solid var(--card-border);">
                <div style="display: flex; justify-content: space-between; font-size: 11px; margin-bottom: 6px;">
                  <span style="color: var(--text-muted);">Reading Progress</span>
                  <b style="color: var(--accent-cyan);">${b.readPercent}%</b>
                </div>
                <div class="status-rail" style="height: 4px;">
                  <div class="status-rail-fill" style="width: ${b.readPercent}%;"></div>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  window.ProgressXPLibrary = {
    render: renderLibrary
  };

})(window);
