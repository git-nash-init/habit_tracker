// Progress XP Production Reactive Store
(function() {
  'use strict';

  const STORAGE_KEY = 'progressxp_store_v1710';

  const DEFAULT_STATE = {
    user: {
      name: 'Mehul Palan',
      title: 'Starter',
      totalXp: 0,
      xpToday: 0,
      coins: 0,
      level: 1,
      xpToNextLevel: 100,
      streakDays: 0,
      focusedTodayMinutes: 0,
      attributes: {
        vitality: 25,
        focus: 30,
        discipline: 20,
        mastery: 15,
        wisdom: 20
      }
    },
    tasks: [
      {
        id: 'task_review',
        title: '2-minute day review',
        desc: 'Mark what moved forward and decide the first action for tomorrow.',
        priority: 1,
        category: 'Starter',
        recurrence: 'Daily',
        xp: 50,
        coins: 5,
        durationMinutes: 3,
        scheduledTime: '11:00 AM',
        paceStatus: 'behind',
        done: false
      },
      {
        id: 'task_block',
        title: 'One focused work block',
        desc: 'Give one important task 30 minutes of undivided attention.',
        priority: 2,
        category: 'Starter',
        recurrence: 'Daily',
        xp: 200,
        coins: 20,
        durationMinutes: 30,
        scheduledTime: '3:00 PM',
        paceStatus: 'behind',
        done: false
      },
      {
        id: 'task_top3',
        title: "Plan today's top 3",
        desc: 'Choose the three things that would make today feel genuinely productive.',
        priority: 3,
        category: 'Starter',
        recurrence: 'Daily',
        xp: 100,
        coins: 10,
        durationMinutes: 10,
        scheduledTime: '7:00 PM',
        paceStatus: 'next',
        done: false
      }
    ],
    activeTab: 'home',
    simpleMode: false,
    auth: {
      isLoggedIn: true,
      user: {
        username: 'Mehul Palan',
        name: 'Mehul Palan',
        xp: 0,
        role: 'user'
      }
    },
    settings: {
      appExperience: 'standard',
      selectedTab: 'home'
    },
    habits: [
      { id: 'h1', name: 'Morning hydration & meditation', category: 'Health', streak: 4, consistency: 85, weekDays: [1, 1, 1, 1, 0, 0, 0] },
      { id: 'h2', name: 'Focused deep work session', category: 'Focus', streak: 3, consistency: 75, weekDays: [1, 1, 1, 0, 0, 0, 0] },
      { id: 'h3', name: 'Evening learning & reflection', category: 'Mindset', streak: 2, consistency: 60, weekDays: [1, 1, 0, 0, 0, 0, 0] }
    ],
    missions: {
      primaryQuest: {
        id: 'q1',
        title: 'Deep Work Sprint (3 Hours)',
        description: 'Sustain uninterrupted focus to defeat the procrastination boss.',
        tier: 'Boss Quest',
        progress: 45,
        target: 180,
        unit: 'mins',
        reward_xp: 300,
        reward_coins: 40
      },
      dailyList: [
        { id: 'm1', title: 'Complete Morning Routine', category: 'Habits', reward_xp: 50, reward_coins: 5, done: false },
        { id: 'm2', title: 'Clear Priority #1 Task', category: 'Focus', reward_xp: 100, reward_coins: 10, done: true },
        { id: 'm3', title: 'Evening Reflection Review', category: 'Review', reward_xp: 50, reward_coins: 5, done: false }
      ],
      timedMission: {
        id: 't1',
        title: 'Lightning Focus Sprint',
        duration_seconds: 1500,
        remaining_seconds: 1500,
        active: false,
        reward_xp: 150,
        reward_coins: 15
      }
    },
    rewards: [
      { id: 'r1', title: '1-Hour Gaming Session', description: 'Guilt-free session in your favorite game.', cost_coins: 50, cost_xp: 200, category: 'Leisure', icon: '🎮', stock: 5 },
      { id: 'r2', title: 'Specialty Coffee Treat', description: 'Artisanal latte at local coffee bar.', cost_coins: 80, cost_xp: 350, category: 'Treats', icon: '☕', stock: 3 },
      { id: 'r3', title: 'Weekend Movie Night', description: 'Stream any premier movie with snacks.', cost_coins: 120, cost_xp: 500, category: 'Entertainment', icon: '🎬', stock: 2 }
    ],
    claimedRewards: [],
    achievements: [
      { id: 'a1', title: 'First Step', desc: 'Complete your first task in Progress XP.', tier: 'Uncommon', icon: '🌱', category: 'Task Mastery', unlocked: true },
      { id: 'a2', title: 'Streak Titan', desc: 'Maintain a 7-day uninterrupted consistency streak.', tier: 'Rare', icon: '🔥', category: 'Streak Titan', unlocked: false },
      { id: 'a3', title: 'Centurion of Focus', desc: 'Accumulate 100+ focused deep work minutes.', tier: 'Epic', icon: '⚡', category: 'Task Mastery', unlocked: false },
      { id: 'a4', title: 'Avatar Awakened', desc: 'Equip an anime avatar in your profile vault.', tier: 'Legendary', icon: '👑', category: 'Identity', unlocked: true }
    ],
    leaderboard: [
      { rank: 1, name: 'Abdul Cizen Siddiqui', tier: 'Mythic Grandmaster', streak: 42, totalXp: 18450, avatar: '👑' },
      { rank: 2, name: 'Alex Rivera', tier: 'Diamond Sentinel', streak: 28, totalXp: 14200, avatar: '⚔️' },
      { rank: 3, name: 'Mehul Palan (You)', tier: 'Metal Rank Starter', streak: 4, totalXp: 162, avatar: '⚡' },
      { rank: 4, name: 'Sophia Chen', tier: 'Gold Vanguard', streak: 12, totalXp: 8900, avatar: '🌟' }
    ],
    library: [
      { 
        id: 'b1', 
        title: 'Atomic Habits', 
        author: 'James Clear', 
        category: 'Habits & Systems', 
        duration: '18 min read',
        summary: 'Tiny changes lead to remarkable results. Systems > Goals.',
        keyTakeaway: 'You do not rise to the level of your goals. You fall to the level of your systems.',
        readPercent: 68,
        pages: '320 pages'
      },
      { 
        id: 'b2', 
        title: 'Deep Work', 
        author: 'Cal Newport', 
        category: 'Focus & Mastery', 
        duration: '22 min read',
        summary: 'Rules for focused success in a distracted world.',
        keyTakeaway: 'Clarity about what matters provides clarity about what does not.',
        readPercent: 45,
        pages: '296 pages'
      },
      { 
        id: 'b3', 
        title: 'The Psychology of Money', 
        author: 'Morgan Housel', 
        category: 'Finance & Mindset', 
        duration: '16 min read',
        summary: 'Doing well with money is about behavior and patience.',
        keyTakeaway: 'Spending money to show people how much money you have is the fastest way to have less money.',
        readPercent: 82,
        pages: '256 pages'
      },
      { 
        id: 'b4', 
        title: 'Can’t Hurt Me', 
        author: 'David Goggins', 
        category: 'Resilience & Drive', 
        duration: '25 min read',
        summary: 'Master your mind and defy the odds through self-discipline.',
        keyTakeaway: 'The 40% rule: when your mind says you are done, you are really only 40% done.',
        readPercent: 90,
        pages: '364 pages'
      }
    ],
    finance: {
      summary: { income: 4500, expenses: 1850, savingsRate: 59 },
      transactions: [
        { id: 't1', title: 'Freelance Design Milestone', amount: 2500, type: 'income', date: '2026-10-21', category: 'Career' },
        { id: 't2', title: 'Growth Books & Software', amount: -140, type: 'expense', date: '2026-10-22', category: 'Education' }
      ]
    },
    community: [
      { id: 'p1', author: 'Abdul Cizen Siddiqui', rank: 'Grandmaster', time: '2 hours ago', content: 'Consistency is not about never missing; it is about returning to your rhythm immediately after any slip.', likes: 24, comments: [ { author: 'Mehul Palan', text: 'Huge mindset unlock. Building my streak now!' } ] }
    ]
  };

  let state = loadInitialState();
  const listeners = new Set();
  const pendingUndos = new Map();

  function loadInitialState() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return Object.assign({}, DEFAULT_STATE, parsed, {
          user: Object.assign({}, DEFAULT_STATE.user, parsed.user || {}),
          auth: Object.assign({}, DEFAULT_STATE.auth, parsed.auth || {})
        });
      }
    } catch (_) {}
    return JSON.parse(JSON.stringify(DEFAULT_STATE));
  }

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (_) {}
  }

  function notify() {
    listeners.forEach(fn => {
      try { fn(state); } catch (e) { console.error('Store subscriber error:', e); }
    });
    saveState();
  }

  const ProgressXPStore = {
    getState() {
      return state;
    },

    subscribe(listener) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },

    setActiveTab(tab) {
      if (state.activeTab === tab) return;
      state.activeTab = tab;
      if (window.ProgressXPSound) window.ProgressXPSound.play('nav');
      notify();
    },

    toggleSimpleMode() {
      state.simpleMode = !state.simpleMode;
      state.settings.appExperience = state.simpleMode ? 'clutter_free' : 'standard';
      if (window.ProgressXPSound) window.ProgressXPSound.play('click');
      notify();
    },

    setAppExperience(exp) {
      state.simpleMode = (exp === 'clutter_free');
      state.settings.appExperience = exp;
      notify();
    },

    addTask(title, category = 'Personal', xp = 50, coins = 5, duration = 30) {
      const newTask = {
        id: 'task_' + Date.now(),
        title: title.trim(),
        desc: 'Complete this focused task to earn XP and level up.',
        priority: state.tasks.length + 1,
        category: category,
        recurrence: 'Daily',
        xp: Number(xp) || 50,
        coins: Number(coins) || 5,
        durationMinutes: Number(duration) || 30,
        scheduledTime: 'Anytime',
        paceStatus: 'upcoming',
        done: false
      };
      state.tasks.push(newTask);
      if (window.ProgressXPSound) window.ProgressXPSound.play('focus');
      notify();
      return newTask;
    },

    startCompleteTaskGracePeriod(taskId, onTimerTick, onFinalize) {
      const task = state.tasks.find(t => t.id === taskId);
      if (!task || task.done || pendingUndos.has(taskId)) return;

      if (window.ProgressXPSound) window.ProgressXPSound.play('click');

      let remainingSec = 3;
      if (onTimerTick) onTimerTick(remainingSec);

      const interval = setInterval(() => {
        remainingSec--;
        if (remainingSec > 0) {
          if (onTimerTick) onTimerTick(remainingSec);
        } else {
          clearInterval(interval);
          pendingUndos.delete(taskId);
          this.finalizeCompleteTask(taskId);
          if (onFinalize) onFinalize();
        }
      }, 1000);

      pendingUndos.set(taskId, { interval });
    },

    cancelCompleteTask(taskId) {
      if (!pendingUndos.has(taskId)) return false;
      const { interval } = pendingUndos.get(taskId);
      clearInterval(interval);
      pendingUndos.delete(taskId);
      if (window.ProgressXPSound) window.ProgressXPSound.play('click');
      notify();
      return true;
    },

    isPendingGrace(taskId) {
      return pendingUndos.has(taskId);
    },

    finalizeCompleteTask(taskId) {
      const task = state.tasks.find(t => t.id === taskId);
      if (!task || task.done) return;

      task.done = true;
      task.paceStatus = 'done';
      state.user.totalXp += task.xp;
      state.user.xpToday += task.xp;
      state.user.coins += task.coins;
      state.user.focusedTodayMinutes += task.durationMinutes;

      // Sync auth mock state for compatibility
      state.auth.user.xp = state.user.totalXp;

      // Level calculation
      while (state.user.totalXp >= state.user.xpToNextLevel) {
        state.user.level++;
        state.user.xpToNextLevel = state.user.level * 100;
      }

      if (window.ProgressXPSound) window.ProgressXPSound.play('success');
      notify();
    },

    completeTask(taskId) {
      this.finalizeCompleteTask(taskId);
    },

    undoTask(taskId) {
      const task = state.tasks.find(t => t.id === taskId);
      if (!task || !task.done) return false;

      task.done = false;
      task.paceStatus = 'behind';
      state.user.totalXp = Math.max(0, state.user.totalXp - task.xp);
      state.user.xpToday = Math.max(0, state.user.xpToday - task.xp);
      state.user.coins = Math.max(0, state.user.coins - task.coins);
      state.user.focusedTodayMinutes = Math.max(0, state.user.focusedTodayMinutes - task.durationMinutes);
      state.auth.user.xp = state.user.totalXp;

      notify();
      return true;
    },

    toggleHabitDay(habitId, dayIndex) {
      const habit = state.habits.find(h => h.id === habitId);
      if (!habit) return;
      habit.weekDays[dayIndex] = habit.weekDays[dayIndex] ? 0 : 1;
      saveState();
      notify();
    },

    addHabit(name, category, notes) {
      const newHabit = {
        id: 'h_' + Date.now(),
        name: name.trim(),
        category: category || 'Health & Vitality',
        notes: notes ? notes.trim() : '',
        streak: 1,
        consistency: 100,
        weekDays: [0, 0, 0, 0, 0, 0, 1]
      };
      state.habits.unshift(newHabit);
      // Award 20 XP for forging a new habit
      state.user.totalXp += 20;
      state.user.xpToday += 20;
      state.auth.user.xp = state.user.totalXp;
      saveState();
      notify();
      return newHabit;
    },

    resetAll() {
      state = JSON.parse(JSON.stringify(DEFAULT_STATE));
      saveState();
      notify();
    }
  };

  window.ProgressXPStore = ProgressXPStore;
})();
