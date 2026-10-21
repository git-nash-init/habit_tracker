/**
 * Progress XP - Personal Finance Component
 */

(function (window) {
  'use strict';

  function renderFinance(container, state) {
    const fin = state.finance;

    container.innerHTML = `
      <div class="finance-root">
        <!-- Summary Cards -->
        <div class="finance-summary-grid">
          <div class="card">
            <span class="badge emerald" style="font-size: 9px;">Monthly Cash Inflow</span>
            <div style="font-size: 26px; font-weight: 900; color: #34d399; margin: 8px 0;">
              ₹${fin.monthlyIncome.toLocaleString()}
            </div>
            <small style="color: var(--text-muted); font-size: 11px;">Tracked Inflow</small>
          </div>

          <div class="card">
            <span class="badge" style="font-size: 9px; color: #f87171; border-color: rgba(248, 113, 113, 0.3);">Monthly Outflow</span>
            <div style="font-size: 26px; font-weight: 900; color: #f87171; margin: 8px 0;">
              ₹${fin.monthlyExpenses.toLocaleString()}
            </div>
            <small style="color: var(--text-muted); font-size: 11px;">Fixed & Discretionary</small>
          </div>

          <div class="card">
            <span class="badge gold" style="font-size: 9px;">Savings & Invest Rate</span>
            <div style="font-size: 26px; font-weight: 900; color: #fbbf24; margin: 8px 0;">
              ${fin.savingsRate}%
            </div>
            <small style="color: var(--text-muted); font-size: 11px;">Target: >50%</small>
          </div>
        </div>

        <!-- Transactions Header & Button -->
        <div class="tasks-header">
          <h2>
            <span>Recent Financial Entries</span>
          </h2>
          <button class="btn sm" id="addTransactionBtn">
            <i>＋</i> Log Transaction
          </button>
        </div>

        <div class="card" style="padding: 0; overflow: hidden;">
          <table class="finance-table">
            <thead>
              <tr>
                <th>Description</th>
                <th>Category</th>
                <th>Date</th>
                <th style="text-align: right;">Amount</th>
              </tr>
            </thead>
            <tbody>
              ${fin.transactions.map(t => `
                <tr>
                  <td><b>${t.title}</b></td>
                  <td><span class="badge" style="font-size: 9px;">${t.category}</span></td>
                  <td style="color: var(--text-muted); font-size: 11px;">${t.date}</td>
                  <td style="text-align: right;" class="${t.type === 'income' ? 'amount-income' : 'amount-expense'}">
                    ${t.type === 'income' ? '+' : '-'} ₹${t.amount.toLocaleString()}
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>

      <!-- Add Transaction Modal -->
      <div class="modal-overlay" id="addTransactionModal">
        <div class="modal-card">
          <div class="modal-head">
            <h3>Log Financial Transaction</h3>
            <button class="btn secondary sm" id="closeFinModalBtn">✕</button>
          </div>
          <form id="addFinForm">
            <div class="field">
              <label>Description</label>
              <input type="text" id="finTitle" placeholder="e.g. Dividend payment or Groceries" required>
            </div>
            <div class="field">
              <label>Type</label>
              <select id="finType">
                <option value="expense">Expense (-)</option>
                <option value="income">Income (+)</option>
              </select>
            </div>
            <div class="field">
              <label>Amount (₹)</label>
              <input type="number" id="finAmount" placeholder="Amount in INR" required>
            </div>
            <div class="field">
              <label>Category</label>
              <select id="finCategory">
                <option value="Living">Living / Rent</option>
                <option value="Food">Food & Nutrition</option>
                <option value="Investment">Investment & SIP</option>
                <option value="Work">Work / Income</option>
                <option value="Personal">Personal</option>
              </select>
            </div>
            <div style="display: flex; justify-content: flex-end; gap: 8px; margin-top: 14px;">
              <button type="button" class="btn secondary sm" id="cancelFinBtn">Cancel</button>
              <button type="submit" class="btn sm">Save Entry</button>
            </div>
          </form>
        </div>
      </div>
    `;

    bindFinanceEvents(container);
  }

  function bindFinanceEvents(container) {
    const modal = container.querySelector('#addTransactionModal');
    const openBtn = container.querySelector('#addTransactionBtn');
    const closeBtn = container.querySelector('#closeFinModalBtn');
    const cancelBtn = container.querySelector('#cancelFinBtn');
    const form = container.querySelector('#addFinForm');

    if (openBtn && modal) openBtn.addEventListener('click', () => modal.classList.add('open'));
    if (closeBtn && modal) closeBtn.addEventListener('click', () => modal.classList.remove('open'));
    if (cancelBtn && modal) cancelBtn.addEventListener('click', () => modal.classList.remove('open'));

    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = container.querySelector('#finTitle').value;
        const type = container.querySelector('#finType').value;
        const amount = container.querySelector('#finAmount').value;
        const cat = container.querySelector('#finCategory').value;
        window.ProgressXPStore.addTransaction(title, type, amount, cat);
        modal.classList.remove('open');
        form.reset();
        if (window.ProgressXPAudio) window.ProgressXPAudio.playTaskComplete();
      });
    }
  }

  window.ProgressXPFinance = {
    render: renderFinance
  };

})(window);
