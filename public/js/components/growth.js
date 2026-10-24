/**
 * Progress XP - Growth, Performance & AURA Attribute Intelligence Component
 * Replicated 1:1 with Mathematical Radar Polygon & Live Consistency Heatmap
 */

(function (window) {
  'use strict';

  // 8 Capability Dimensions in Canonical Order
  const ATTRIBUTE_ORDER = [
    'discipline',
    'focus',
    'knowledge',
    'health',
    'career',
    'creativity',
    'execution',
    'consistency'
  ];

  const ATTRIBUTE_LABELS = {
    discipline: 'Discipline',
    focus: 'Focus',
    knowledge: 'Knowledge',
    health: 'Health',
    career: 'Career',
    creativity: 'Creativity',
    execution: 'Execution',
    consistency: 'Consistency'
  };

  /**
   * Calculate SVG polygon points for the 8-axis radar
   * Exact algorithm from live app runtime
   */
  function calcRadarPoints(stats, order) {
    const cx = 130;
    const cy = 130;
    const r = 94;
    const n = Math.max(1, order.length);
    const pts = [];

    order.forEach((key, i) => {
      const row = stats[key] || {};
      const v = Math.max(0, Math.min(100, Number(row.value) || 0));
      const a = -Math.PI / 2 + (2 * Math.PI * i) / n;
      const rr = r * (v / 100);
      pts.push((cx + Math.cos(a) * rr).toFixed(1) + ',' + (cy + Math.sin(a) * rr).toFixed(1));
    });

    return pts.join(' ');
  }

  function calcRadarPotentialPoints(stats, order) {
    const copy = {};
    order.forEach(k => {
      copy[k] = Object.assign({}, stats[k] || {}, {
        value: Number((stats[k] || {}).potential) || 0
      });
    });
    return calcRadarPoints(copy, order);
  }

  /**
   * Calculate SVG trend line for 30-day capability trajectory
   */
  function calcTrendPoints(trend) {
    const n = trend.length;
    const w = 520;
    const h = 145;
    if (!n) return '';
    return trend
      .map((row, i) => {
        const x = 10 + (n > 1 ? ((w - 20) * i) / (n - 1) : 0);
        const v = Math.max(0, Math.min(100, Number(row.value) || 0));
        const y = h - 12 - ((h - 26) * v) / 100;
        return x.toFixed(1) + ',' + y.toFixed(1);
      })
      .join(' ');
  }

  function getMonthDays(year, monthIndex) {
    const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
    // 0 = Sunday, 1 = Monday. We want Monday = 0, Sunday = 6
    let firstDayIndex = new Date(year, monthIndex, 1).getDay();
    let startDayOffset = firstDayIndex === 0 ? 6 : firstDayIndex - 1;

    const days = [];
    // Pad previous month blanks
    for (let i = 0; i < startDayOffset; i++) {
      days.push({ blank: true });
    }
    for (let d = 1; d <= daysInMonth; d++) {
      days.push({ dayNumber: d, dateStr: `${year}-${String(monthIndex + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}` });
    }
    return days;
  }

  function render(container, state) {
    const user = state.user || {};
    const tasks = state.tasks || [];
    const habits = state.habits || [];

    // Calculate completed counts & totals
    const completedTasks = tasks.filter(t => t.done).length;
    const focusedMinutes = user.focusedTodayMinutes || 0;
    const activeDays = user.streakDays > 0 ? user.streakDays : (completedTasks > 0 ? 1 : 0);
    const currentStreak = user.streakDays || 0;
    const bestStreak = Math.max(currentStreak, 3);
    const totalXp = user.totalXp || 0;
    const nextLevelXp = user.xpToNextLevel || 100;
    const level = user.level || 1;
    const levelPct = Math.min(100, Math.round(((totalXp % 100) / 100) * 100));

    // Calculate capability stats
    const stats = {};
    ATTRIBUTE_ORDER.forEach(attr => {
      // Base calculation on tasks / habits done
      let baseVal = 5;
      if (attr === 'focus') baseVal = Math.min(100, 15 + focusedMinutes);
      if (attr === 'discipline') baseVal = Math.min(100, 10 + completedTasks * 10);
      if (attr === 'consistency') baseVal = Math.min(100, 10 + currentStreak * 12);
      if (attr === 'execution') baseVal = Math.min(100, 12 + completedTasks * 8);
      if (attr === 'knowledge') baseVal = 10;
      if (attr === 'health') baseVal = 15;
      if (attr === 'career') baseVal = 20;
      if (attr === 'creativity') baseVal = 10;

      stats[attr] = {
        value: baseVal,
        potential: Math.min(100, baseVal + 25),
        peak: Math.max(baseVal, 10),
        decay: 0,
        delta7: completedTasks > 0 ? completedTasks : 0
      };
    });

    const radarCurrentPoints = calcRadarPoints(stats, ATTRIBUTE_ORDER);
    const radarPotentialPoints = calcRadarPotentialPoints(stats, ATTRIBUTE_ORDER);

    // 30-Day trend points (baseline line)
    const trendData = [
      { label: '24 Sep', value: 0 },
      { label: '29 Sep', value: 0 },
      { label: '04 Oct', value: 2 },
      { label: '09 Oct', value: 3 },
      { label: '14 Oct', value: 5 },
      { label: '19 Oct', value: 8 },
      { label: '23 Oct', value: completedTasks > 0 ? 15 : 0 }
    ];
    const trendPts = calcTrendPoints(trendData);
    const trendAreaPts = trendPts ? `10,133 ${trendPts} 510,133` : '';

    // Calendar for October 2026
    const octDays = getMonthDays(2026, 9); // 9 is October (0-indexed)

    container.innerHTML = `
      <div class="growth-view-container">

        <!-- ====================================================================
             TOP SECTION: 30-DAY PERFORMANCE SCAN & AVATAR/MOMENTUM
             ==================================================================== -->
        <div class="growth-top-grid">

          <!-- LEFT COLUMN: 30-DAY PERFORMANCE SCAN -->
          <div class="futuristic-progress">
            
            <div class="scan-head">
              <div>
                <span class="scan-eyebrow">30-DAY PERFORMANCE SCAN</span>
                <h2 class="scan-title">Level progress and work intelligence</h2>
              </div>
              
              <!-- Circular Growth Tier Badge -->
              <div class="growth-tier-badge">
                <span class="badge-tag">GROWTH TIER</span>
                <span class="badge-val">${level}</span>
                <span class="badge-sub">LEVEL ${level}</span>
              </div>
            </div>

            <!-- Class & Standing 3-Cards -->
            <div class="scan-class-row">
              <div class="scan-subcard">
                <span class="scan-subcard-tag">OVERALL</span>
                <div class="scan-subcard-val">
                  162 <small>MAXIMUM</small>
                </div>
              </div>

              <div class="scan-subcard">
                <span class="scan-subcard-tag">PERFORMANCE CLASS</span>
                <div class="scan-subcard-val">
                  E <small>STARTER</small>
                </div>
              </div>

              <div class="scan-subcard level-card">
                <span class="scan-subcard-tag">LEVEL</span>
                <div class="level-num">${level}</div>
              </div>
            </div>

            <!-- XP Progress Bar -->
            <div class="scan-xp-bar-block">
              <div class="scan-xp-caption">
                <span>${totalXp} XP earned</span>
                <span>${nextLevelXp} XP to next level</span>
              </div>
              <div class="scan-xp-track">
                <div class="scan-xp-fill" style="width: ${Math.max(12, levelPct)}%;"></div>
              </div>
            </div>

            <!-- 6-Metric Stat Grid -->
            <div class="scan-metric-grid">
              <div class="scan-stat-cell">
                <b>${completedTasks}</b>
                <span>Tasks completed</span>
              </div>
              <div class="scan-stat-cell">
                <b>${focusedMinutes} min</b>
                <span>Focused time</span>
              </div>
              <div class="scan-stat-cell">
                <b>${activeDays}</b>
                <span>Active days</span>
              </div>
              <div class="scan-stat-cell">
                <b>${focusedMinutes > 0 ? focusedMinutes : 0} min</b>
                <span>Average active day</span>
              </div>
              <div class="scan-stat-cell">
                <b>${currentStreak}</b>
                <span>Current streak</span>
              </div>
              <div class="scan-stat-cell">
                <b>${bestStreak}</b>
                <span>Best streak</span>
              </div>
            </div>

            <!-- Mini 14-day Sparkline Bars -->
            <div class="scan-sparkline-row">
              ${Array.from({ length: 14 }).map((_, idx) => {
                const isToday = idx === 13;
                const h = isToday ? (completedTasks > 0 ? 32 : 12) : (idx % 3 === 0 ? 18 : 8);
                const days = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun','Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
                return `
                  <div class="spark-bar-wrap" title="Day ${idx + 1}">
                    <div class="spark-bar ${isToday ? 'active-today' : ''}" style="height: ${h}px;"></div>
                    <span class="spark-label">${days[idx]}</span>
                  </div>
                `;
              }).join('')}
            </div>

            <!-- Consistency Calendar -->
            <div class="heat-calendar-section">
              <div class="heat-header">
                <div>
                  <h3>Consistency calendar</h3>
                  <div class="heat-sub">October 2026 · darker cells mean more completed work</div>
                </div>
                <div class="heat-nav-btns">
                  <button type="button" class="heat-nav-btn" id="calPrevBtn">Previous</button>
                  <button type="button" class="heat-nav-btn" id="calCurrBtn">Current</button>
                </div>
              </div>

              <div class="heat-toolbar">
                <div class="heat-select-month">
                  <span>Select month</span>
                  <select class="heat-select-picker" id="calMonthPicker">
                    <option value="2026-10" selected>October 2026 📅</option>
                    <option value="2026-09">September 2026 📅</option>
                    <option value="2026-11">November 2026 📅</option>
                  </select>
                </div>
                <span class="heat-instructions">Hover or tap a date for XP, time, and task details.</span>
              </div>

              <!-- 7-Day Matrix -->
              <div class="calendar-grid-wrap">
                <div class="cal-day-name">MON</div>
                <div class="cal-day-name">TUE</div>
                <div class="cal-day-name">WED</div>
                <div class="cal-day-name">THU</div>
                <div class="cal-day-name">FRI</div>
                <div class="cal-day-name">SAT</div>
                <div class="cal-day-name">SUN</div>

                ${octDays.map(item => {
                  if (item.blank) {
                    return `<div class="cal-cell blank"></div>`;
                  }
                  const d = item.dayNumber;
                  const isToday = d === 24;
                  const actClass = isToday && completedTasks > 0 ? 'has-activity-3' : (d % 4 === 0 ? 'has-activity-1' : '');
                  return `
                    <div class="cal-cell ${actClass}" data-date="${item.dateStr}" title="October ${d}, 2026: ${isToday ? completedTasks + ' tasks completed' : 'Normal routine'}">
                      <span class="cal-cell-num">${d}</span>
                      <span class="cal-cell-meta">${isToday && completedTasks > 0 ? '+' + (completedTasks * 50) + ' XP' : ''}</span>
                    </div>
                  `;
                }).join('')}
              </div>

              <div class="heat-summary-footer">
                <span><strong>${completedTasks}</strong> Tasks saved</span>
                <span><strong>${focusedMinutes} min</strong> Focused time</span>
                <span><strong>${activeDays}</strong> Active days</span>
                <span><strong>${totalXp} XP</strong> XP earned</span>
              </div>

            </div>

          </div>

          <!-- RIGHT COLUMN: AVATAR VAULT PROFILE & LIVE MOMENTUM -->
          <div class="growth-side-col">
            
            <!-- Avatar Profile Card -->
            <div class="avatar-profile-card">
              <h3>Profile and level avatar</h3>
              
              <div class="avatar-meta-row">
                <img src="assets/avatars/starter_avatar_thumb.jpg" alt="Avatar" class="avatar-meta-thumb" onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><circle cx=%2250%22 cy=%2250%22 r=%2250%22 fill=%22%232563eb%22/></svg>'">
                <div class="avatar-meta-copy">
                  <b>Starter Level Avatar</b>
                  <small>Male avatar set selected from anime collection</small>
                </div>
              </div>

              <div class="avatar-artwork-frame">
                <img src="assets/avatars/starter_avatar.jpg" alt="Starter Anime Avatar" loading="eager">
              </div>

              <div class="avatar-artwork-caption">
                <h4>Starter Level Avatar</h4>
                <div class="tier-info">Shown from level 1 to 4</div>
                <div class="set-info">Avatar Set: Male</div>
              </div>
            </div>

            <!-- LIVE MOMENTUM Pulse Card -->
            <div class="live-momentum-card">
              <div class="momentum-head">
                <span class="momentum-head-title">LIVE MOMENTUM</span>
                <span class="momentum-live-pill">LIVE</span>
              </div>
              <div class="momentum-sub">14-day activity pulse</div>

              <div class="momentum-pulse-row">
                ${Array.from({ length: 14 }).map((_, i) => {
                  const isCurrent = i === 13;
                  const pulseClass = isCurrent && completedTasks > 0 ? 'peak' : (i >= 10 ? 'active' : '');
                  return `<div class="momentum-pulse-pill ${pulseClass}" title="Day ${i + 1} activity"></div>`;
                }).join('')}
              </div>
            </div>

          </div>

        </div>

        <!-- ====================================================================
             BOTTOM SECTION: AURA ATTRIBUTE INTELLIGENCE (CAPABILITY MATRIX)
             ==================================================================== -->
        <div class="growth-attribute-matrix" data-growth-attributes>
          
          <div class="gam-head">
            <div>
              <span class="scan-eyebrow">AURA · ATTRIBUTE INTELLIGENCE</span>
              <h2>Your earned capability matrix</h2>
              <p>AURA reads the language, duration and rhythm of work you actually complete. Planned tasks show potential; inactivity slowly softens current scores without deleting what you built.</p>
            </div>
            <div class="gam-live">LIVE ATTRIBUTE INDEX</div>
          </div>

          <!-- Top Grid: 8-Axis Radar & Capability Summary -->
          <div class="gam-top">

            <!-- LEFT: 8-AXIS RADAR CHART -->
            <div class="gam-radar-card">
              <svg class="gam-radar" viewBox="0 0 260 260" xmlns="http://www.w3.org/2000/svg">
                <!-- Concentric Web Rings -->
                <polygon class="ring" points="130.0,36.0 196.5,63.5 224.0,130.0 196.5,196.5 130.0,224.0 63.5,196.5 36.0,130.0 63.5,63.5" />
                <polygon class="ring" points="130.0,59.5 179.8,80.2 200.5,130.0 179.8,179.8 130.0,200.5 80.2,179.8 59.5,130.0 80.2,80.2" />
                <polygon class="ring" points="130.0,83.0 163.2,96.8 177.0,130.0 163.2,163.2 130.0,177.0 96.8,163.2 83.0,130.0 96.8,96.8" />
                <polygon class="ring" points="130.0,106.5 146.6,113.4 153.5,130.0 146.6,146.6 130.0,153.5 113.4,146.6 106.5,130.0 113.4,113.4" />

                <!-- Axes Lines -->
                <line class="axis" x1="130" y1="130" x2="130" y2="36" />
                <line class="axis" x1="130" y1="130" x2="196.5" y2="63.5" />
                <line class="axis" x1="130" y1="130" x2="224" y2="130" />
                <line class="axis" x1="130" y1="130" x2="196.5" y2="196.5" />
                <line class="axis" x1="130" y1="130" x2="130" y2="224" />
                <line class="axis" x1="130" y1="130" x2="63.5" y2="196.5" />
                <line class="axis" x1="130" y1="130" x2="36" y2="130" />
                <line class="axis" x1="130" y1="130" x2="63.5" y2="63.5" />

                <!-- Dynamic Polygons -->
                <polygon class="potential" data-growth-radar-potential points="${radarPotentialPoints}" />
                <polygon class="current" data-growth-radar-current points="${radarCurrentPoints}" />

                <!-- Axis Labels -->
                <text x="130" y="24" text-anchor="middle">DISCIPLINE</text>
                <text x="214" y="58" text-anchor="start">FOCUS</text>
                <text x="234" y="133" text-anchor="start">KNOWLEDGE</text>
                <text x="212" y="210" text-anchor="start">HEALTH</text>
                <text x="130" y="244" text-anchor="middle">CAREER</text>
                <text x="46" y="210" text-anchor="end">CREATIVITY</text>
                <text x="26" y="133" text-anchor="end">EXECUTION</text>
                <text x="48" y="58" text-anchor="end">CONSISTENCY</text>
              </svg>
            </div>

            <!-- RIGHT: SCORE RING & SUMMARY -->
            <div class="gam-summary-card">
              <div class="gam-score-row">
                <div class="gam-core-score" data-growth-overall-ring style="--score: ${completedTasks > 0 ? 15 : 0};">
                  <div>
                    <b data-growth-overall>${completedTasks > 0 ? 15 : 0}</b>
                    <span>OVERALL</span>
                  </div>
                </div>

                <div class="gam-summary-copy">
                  <small>AURA GROWTH SIGNAL</small>
                  <h3 data-growth-overall-title>${completedTasks > 0 ? 'Momentum is rising' : 'Capability profile stable'}</h3>
                  <p>Scores are earned with a push, not permanently fallen. Levels can rise again quickly when you return to the work that built them.</p>
                </div>
              </div>

              <div class="gam-summary-metrics">
                <div>
                  <b data-growth-potential>${tasks.filter(t => !t.done).length}</b>
                  <span>Planned ready</span>
                </div>
                <div>
                  <b data-growth-week-delta>+${completedTasks}</b>
                  <span>Next win trend</span>
                </div>
                <div>
                  <b data-growth-signal-count>0</b>
                  <span>Spoil decay</span>
                </div>
              </div>

              <div class="gam-legend">
                <span><i></i> Current earned score</span>
                <span><i class="future"></i> Planned score connection</span>
              </div>
            </div>

          </div>

          <!-- Middle Grid: 8 Dimension Cards -->
          <div class="gam-stat-grid">
            ${ATTRIBUTE_ORDER.map(key => {
              const row = stats[key] || {};
              const label = ATTRIBUTE_LABELS[key] || key;
              return `
                <div class="gam-stat" data-growth-stat="${key}" style="--value: ${row.value}; --potential: ${row.potential};">
                  <div class="gam-stat-head">
                    <b>${label}</b>
                    <em>Rank 0</em>
                  </div>
                  <small>Capability dimension</small>
                  <div class="gam-stat-track">
                    <i data-growth-bar></i>
                  </div>
                  <div class="gam-stat-foot">
                    <strong>steady</strong>
                    <span>Growth ${row.value}</span>
                  </div>
                </div>
              `;
            }).join('')}
          </div>

          <!-- Bottom Grid: 30-Day Trajectory & AURA Analysis -->
          <div class="gam-bottom">

            <!-- 30-Day Line Chart -->
            <div class="gam-trend">
              <div class="gam-trend-head">
                <div>
                  <span class="scan-eyebrow" style="font-size: 9px;">30-DAY CAPABILITY TRAJECTORY</span>
                  <h3>Overall attribute movement</h3>
                </div>
                <span data-growth-trend-caption>24 Sep → 23 Oct</span>
              </div>

              <svg class="gam-trend-svg" viewBox="0 0 520 145" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="gamArea" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="#06b6d4" stop-opacity="0.32" />
                    <stop offset="100%" stop-color="#06b6d4" stop-opacity="0" />
                  </linearGradient>
                </defs>
                <line class="grid" x1="10" y1="35" x2="510" y2="35" />
                <line class="grid" x1="10" y1="75" x2="510" y2="75" />
                <line class="grid" x1="10" y1="115" x2="510" y2="115" />
                <polygon class="area" data-growth-trend-area points="${trendAreaPts}" />
                <polyline class="line" data-growth-trend-line points="${trendPts}" />
              </svg>

              <div class="gam-trend-axis">
                <span>24 Sep</span>
                <span>Today</span>
              </div>
            </div>

            <!-- AURA Analysis Panel -->
            <div class="gam-insights">
              <div class="gam-insights-head">
                <h3>AURA analysis</h3>
                <button type="button" class="gam-insights-action" id="peakTaskBtn">SET A PEAK TASK SEQUENCE</button>
              </div>

              <div data-growth-insights>
                <div class="gam-insight">
                  <i></i>
                  <div>
                    <b>Strongest earned attribute</b>
                    <p>Needs real completion data to produce a reliable profile of demonstrated strength.</p>
                  </div>
                </div>

                <div class="gam-insight">
                  <i></i>
                  <div>
                    <b>Dominant pattern</b>
                    <p>No habit-backed pattern emerged yet: variety appears higher than single-focus repetition in the last 14d.</p>
                  </div>
                </div>

                <div class="gam-insight">
                  <i></i>
                  <div>
                    <b>Best planned upside</b>
                    <p>Potential exists in ${tasks.filter(t => !t.done).length} queued items: execution and career are poised to rise fastest on completion.</p>
                  </div>
                </div>
              </div>
            </div>

          </div>

          <div class="gam-note">
            <b>Heuristic note:</b> capability is calculated from actual task & habit actions and duration; planned tasks only show potential. Dimensions without relevant activity can slowly soften in score without deleting earned historical credit.
          </div>

        </div>

        <div class="growth-creator-footer">
          created by Abdul Cizen Siddiqui
        </div>

      </div>
    `;

    // Event listeners for month selection and peak task button
    const peakBtn = container.querySelector('#peakTaskBtn');
    if (peakBtn) {
      peakBtn.addEventListener('click', () => {
        if (window.ProgressXPAudio) window.ProgressXPAudio.playClick();
        if (window.ProgressXPStore) {
          window.ProgressXPStore.setTab('mission');
        }
      });
    }

    const calMonthPicker = container.querySelector('#calMonthPicker');
    if (calMonthPicker) {
      calMonthPicker.addEventListener('change', (e) => {
        if (window.ProgressXPAudio) window.ProgressXPAudio.playClick();
      });
    }

    // Cell hover / click tooltips
    container.querySelectorAll('.cal-cell:not(.blank)').forEach(cell => {
      cell.addEventListener('click', () => {
        if (window.ProgressXPAudio) window.ProgressXPAudio.playClick();
      });
    });
  }

  window.ProgressXPGrowth = {
    render: render
  };

})(window);
