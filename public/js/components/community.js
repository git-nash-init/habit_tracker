/**
 * Progress XP - Community Hub Component
 */

(function (window) {
  'use strict';

  function renderCommunity(container, state) {
    const posts = state.community;

    container.innerHTML = `
      <div class="community-root">
        <div class="card" style="margin-bottom: 20px;">
          <span class="badge cyan" style="margin-bottom: 6px;">Growth Collective</span>
          <h2 style="font-size: 22px; font-weight: 900; color: #fff;">Community Feed & Wins</h2>
          <p style="font-size: 12px; color: var(--text-muted); margin-top: 3px;">
            Share daily wins, discuss consistency strategies, and motivate fellow habit architects.
          </p>
        </div>

        <!-- Post Composer -->
        <div class="community-composer">
          <textarea id="communityPostInput" rows="3" placeholder="Share a win, reflection, or streak milestone with the community..."></textarea>
          <div style="display: flex; align-items: center; justify-content: space-between; margin-top: 10px;">
            <small style="color: var(--text-muted); font-size: 11px;">Earn +10 XP for positive contributions</small>
            <button class="btn sm" id="submitPostBtn">Post Win</button>
          </div>
        </div>

        <!-- Posts List -->
        <div class="community-posts-list">
          ${posts.map(p => `
            <div class="community-post" data-post-id="${p.id}">
              <div class="post-head">
                <div style="width: 38px; height: 38px; border-radius: 50%; background: #142a42; border: 1px solid var(--accent-cyan); display: grid; place-items: center; font-size: 15px;">
                  ⚡
                </div>
                <div>
                  <div style="display: flex; align-items: center; gap: 8px;">
                    <b class="post-author-name">${p.author}</b>
                    <span class="badge" style="font-size: 8px;">${p.rank}</span>
                  </div>
                  <small style="color: var(--text-muted); font-size: 11px;">${p.timeAgo}</small>
                </div>
              </div>
              <p style="font-size: 13px; color: var(--text-main); line-height: 1.5;">${p.content}</p>
              <div class="post-actions">
                <button class="like-btn" data-like="${p.id}">
                  <span>❤️</span>
                  <b>${p.likes}</b> Likes
                </button>
                <button class="like-btn">
                  <span>💬</span>
                  <b>${p.commentsCount}</b> Comments
                </button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    bindCommunityEvents(container);
  }

  function bindCommunityEvents(container) {
    const postBtn = container.querySelector('#submitPostBtn');
    const input = container.querySelector('#communityPostInput');

    if (postBtn && input) {
      postBtn.addEventListener('click', () => {
        const val = input.value.trim();
        if (val) {
          window.ProgressXPStore.addPost(val);
          input.value = '';
          if (window.ProgressXPAudio) window.ProgressXPAudio.playTaskComplete();
        }
      });
    }

    container.querySelectorAll('[data-like]').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-like');
        window.ProgressXPStore.likePost(id);
        if (window.ProgressXPAudio) window.ProgressXPAudio.playClick();
      });
    });
  }

  window.ProgressXPCommunity = {
    render: renderCommunity
  };

})(window);
