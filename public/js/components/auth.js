/**
 * Progress XP - Authentication Component (1:1 Replica of Live Target Screen)
 */

(function (window) {
  'use strict';

  function renderAuth(container, onLoginSuccess) {
    container.innerHTML = `
      <div class="auth-viewport">
        <div class="login-card">
          <div class="login-brand">
            <div class="login-logo">XP</div>
            <div class="login-brand-copy">
              <h1>Progress XP</h1>
              <p>Complete tasks, earn XP, unlock upgrades, and improve your consistency through a private growth dashboard.</p>
            </div>
          </div>

          <h2>Build your daily growth system</h2>

          <form id="loginForm">
            <div class="field">
              <label>Username or Email</label>
              <input type="text" id="loginUsername" placeholder="e.g. AlexGrowth" value="AlexGrowth" required autocomplete="username">
            </div>

            <div class="field">
              <label>Password</label>
              <div class="password-eye-wrap">
                <input type="password" id="loginPassword" value="••••••••" required autocomplete="current-password">
                <button type="button" class="password-eye-btn" id="togglePasswordBtn" aria-label="Toggle password visibility">
                  👁️
                </button>
              </div>
            </div>

            <button type="submit" class="btn" id="loginSubmitBtn">Login</button>

            <a class="login-signup-link" href="#" id="createAccountLink">
              <span>New to Progress XP?</span>
              <b>Create an account →</b>
            </a>
          </form>

          <p style="text-align: center; margin: 14px 0 0; font-size: 11px;">
            <a href="#" id="forgotPasswordLink" style="color: var(--text-muted); text-decoration: none;">Forgot password?</a>
          </p>

          <div class="otp-box">
            <b style="font-size: 12px; color: #fff; display: block; margin-bottom: 8px;">Email OTP login</b>
            <div class="field" style="margin-bottom: 8px;">
              <label>Email</label>
              <input type="email" id="otpEmail" placeholder="Enter your email" value="demo@progressxp.app">
            </div>
            <button type="button" class="btn secondary sm" id="sendOtpBtn" style="width: 100%;">Send OTP</button>
          </div>

          <div class="guest-demo-pill">
            <a href="#" id="guestExploreBtn">⚡ One-Click Instant Guest Exploration (Demo Mode)</a>
          </div>
        </div>
      </div>
    `;

    // Password Eye toggle
    const pwdInput = container.querySelector('#loginPassword');
    const eyeBtn = container.querySelector('#togglePasswordBtn');
    if (eyeBtn && pwdInput) {
      eyeBtn.addEventListener('click', () => {
        const isPwd = pwdInput.type === 'password';
        pwdInput.type = isPwd ? 'text' : 'password';
      });
    }

    // Login Form Submit
    const form = container.querySelector('#loginForm');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = container.querySelector('#loginUsername').value;
        const password = container.querySelector('#loginPassword').value;
        if (window.ProgressXPAudio) window.ProgressXPAudio.playClick();
        window.ProgressXPStore.login(username, password);
        if (onLoginSuccess) onLoginSuccess();
      });
    }

    // Guest Explore Button
    const guestBtn = container.querySelector('#guestExploreBtn');
    if (guestBtn) {
      guestBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (window.ProgressXPAudio) window.ProgressXPAudio.playLevelUp();
        window.ProgressXPStore.login('Guest Hero', 'demo');
        if (onLoginSuccess) onLoginSuccess();
      });
    }

    // Send OTP handler
    const otpBtn = container.querySelector('#sendOtpBtn');
    if (otpBtn) {
      otpBtn.addEventListener('click', () => {
        otpBtn.textContent = 'OTP Sent (Code: 743099)';
        setTimeout(() => {
          if (window.ProgressXPAudio) window.ProgressXPAudio.playTaskComplete();
          window.ProgressXPStore.login('OTP Hero', 'demo');
          if (onLoginSuccess) onLoginSuccess();
        }, 1000);
      });
    }
  }

  window.ProgressXPAuth = {
    render: renderAuth
  };

})(window);
