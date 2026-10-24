/**
 * Progress XP - Growth Library Component
 * Authentic Architecture Replicated from Live Production Application
 */

(function (window) {
  'use strict';

  let activeCategory = 'All';

  function renderLibrary(container, state) {
    const books = state.library || [];
    const categories = ['All', ...new Set(books.map(b => b.category).filter(Boolean))];
    const filtered = activeCategory === 'All' ? books : books.filter(b => b.category === activeCategory);

    container.innerHTML = `
      <div class="library-shell">
        
        <!-- Library Hero Banner -->
        <div class="library-hero">
          <div>
            <span class="card-eyebrow" style="color: #67e8f9; letter-spacing: 0.12em;">MINDSET & ARCHITECTURE</span>
            <h1 class="library-title" style="margin: 6px 0 4px; color: #fff; font-size: clamp(26px, 4vw, 36px); font-weight: 900;">Growth Library</h1>
            <p style="font-size: 13px; color: var(--px-text-secondary, #94a3b8); margin: 0; max-width: 600px;">
              High-leverage book summaries, cognitive frameworks, and stoic wisdom synthesized for rapid execution.
            </p>
          </div>
          <div class="library-count">
            <b>${books.length}</b>
            <span style="font-size: 11px; text-transform: uppercase; color: var(--px-text-secondary, #94a3b8); font-weight: 800; letter-spacing: 0.08em;">Summaries</span>
          </div>
        </div>

        <!-- Category Filter Shelf -->
        <div class="category-shelf">
          ${categories.map(cat => `
            <button type="button" class="book-category ${cat === activeCategory ? 'active' : ''}" data-cat="${cat}">
              ${cat}
              <span>(${cat === 'All' ? books.length : books.filter(b => b.category === cat).length})</span>
            </button>
          `).join('')}
        </div>

        <!-- Book Shelf Grid -->
        <div class="book-shelf">
          ${filtered.map(b => {
            const author = b.author || 'Unknown Author';
            const duration = b.duration || (b.pages ? `${Math.round(parseInt(b.pages, 10) / 15)} min read` : '15 min read');
            const summary = b.summary || 'Essential high-leverage principles distilled for peak consistency.';
            const takeaway = b.keyTakeaway || b.takeaway || 'Systems and daily execution compound faster than motivation.';
            const pct = typeof b.readPercent === 'number' ? b.readPercent : (typeof b.progress === 'number' ? b.progress : 50);

            return `
              <div class="book-card" data-book-id="${b.id}">
                <div>
                  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                    <span class="badge cyan" style="font-size: 9px; font-weight: 800;">${b.category || 'Mindset'}</span>
                    <span style="font-size: 10px; color: var(--px-text-secondary, #94a3b8); font-weight: 700;">${duration}</span>
                  </div>
                  <h3 style="font-size: 17px; font-weight: 800; color: #fff; margin: 4px 0 2px;">${b.title}</h3>
                  <div class="author" style="font-size: 12px; color: var(--px-cyan, #50e5ed); font-weight: 700; margin-bottom: 10px;">By ${author}</div>
                  <p style="font-size: 12px; color: var(--px-text-secondary, #94a3b8); line-height: 1.5; margin: 0 0 10px;">${summary}</p>
                  <div class="book-takeaway" style="font-style: italic; font-size: 11px; color: #cbd5e1; border-left: 2px solid var(--px-cyan, #50e5ed); padding-left: 8px; margin: 10px 0; line-height: 1.45;">
                    "${takeaway}"
                  </div>
                </div>

                <div style="margin-top: 16px; padding-top: 12px; border-top: 1px solid rgba(255, 255, 255, 0.08);">
                  <div style="display: flex; justify-content: space-between; font-size: 11px; margin-bottom: 6px;">
                    <span style="color: var(--px-text-secondary, #94a3b8); font-weight: 700;">Reading Progress</span>
                    <b style="color: var(--px-cyan, #50e5ed); font-weight: 800;">${pct}%</b>
                  </div>
                  <div class="scan-xp-track" style="height: 5px; background: rgba(255, 255, 255, 0.06); border-radius: 999px; overflow: hidden;">
                    <div style="height: 100%; width: ${pct}%; background: linear-gradient(90deg, #50e5ed, #3b82f6); border-radius: 999px; transition: width 0.3s ease;"></div>
                  </div>
                </div>
              </div>
            `;
          }).join('')}
        </div>

      </div>
    `;

    // Category click handler
    container.querySelectorAll('.book-category').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        activeCategory = btn.getAttribute('data-cat');
        if (window.ProgressXPSound) window.ProgressXPSound.play('click');
        renderLibrary(container, state);
      });
    });
  }

  window.ProgressXPLibrary = {
    render: renderLibrary
  };

})(window);
