/**
 * Progress XP - Central Reactive State Store & Persistence
 * Reverse-Engineered from Progress XP Core Runtime v17.10.416
 */

(function (window) {
  'use strict';

  const STORAGE_KEY = 'progressxp_app_state_v1710416';

  const DEFAULT_STATE = {
    auth: {
      isLoggedIn: true, // Default to demo user for instantaneous interactive exploration
      user: {
        id: 'usr_7430faf6',
        username: 'AlexGrowth',
        name: 'Alex Hunter',
        email: 'alex@progressxp.app',
        phone: '+91 98765 43210',
        role: 'admin', // Grants access to Admin Studio
        level: 14,
        xp: 4850,
        next_level_xp: 5500,
        coins: 680,
        streak: 14,
        best_streak: 31,
        rank: 'Diamond',
        rank_tier: 'IV',
        rank_prefix: 'RANK',
        rank_number: '14',
        title: 'Master Habit Architect',
        avatar: 'cyborg_neon',
        joined_date: '2026-01-15'
      }
    },
    settings: {
      appExperience: 'standard', // 'standard' | 'clutter_free'
      soundEnabled: true,
      musicDockOpen: false,
      ambientPlaying: false,
      bgOpacity: 0.94,
      bgBlur: 0.5,
      bgBrightness: 1.8,
      selectedTab: 'dashboard'
    },
    dashboard: {
      greeting: 'Focus on the execution today.',
      weather: { temp: '26°C', condition: 'Clear Sky', icon: '☀️' },
      goal_pct: 75,
      life_status: {
        physical: 85,
        mental: 90,
        financial: 78,
        skill: 92,
        social: 65
      }
    },
    tasks: [
      {
        id: 'task_1',
        title: 'Complete deep work block (90 mins without distractions)',
        category: 'Focus',
        xp: 45,
        coins: 20,
        minutes: 90,
        done: true,
        completedAt: new Date(Date.now() - 3600000).toISOString()
      },
      {
        id: 'task_2',
        title: 'Morning workout & mobility routine',
        category: 'Health',
        xp: 35,
        coins: 15,
        minutes: 45,
        done: true,
        completedAt: new Date(Date.now() - 7200000).toISOString()
      },
      {
        id: 'task_3',
        title: 'Review weekly progress and update habit tracker metrics',
        category: 'Growth',
        xp: 25,
        coins: 10,
        minutes: 20,
        done: false,
        completedAt: null
      },
      {
        id: 'task_4',
        title: 'Read 20 pages of "Atomic Habits" and record takeaways',
        category: 'Learning',
        xp: 30,
        coins: 15,
        minutes: 30,
        done: false,
        completedAt: null
      },
      {
        id: 'task_5',
        title: 'Log daily expenses in Personal Finance ledger',
        category: 'Finance',
        xp: 20,
        coins: 10,
        minutes: 10,
        done: false,
        completedAt: null
      }
    ],
    habits: [
      {
        id: 'h_1',
        name: 'Morning Cold Water & Hydration',
        category: 'Health',
        streak: 18,
        consistency: 94,
        notes: 'Drink 750ml water immediately upon waking.',
        // Array of 7 days (Mon-Sun): 1=completed, 0=not completed
        weekDays: [1, 1, 1, 1, 1, 1, 1]
      },
      {
        id: 'h_2',
        name: 'Daily 45-Min Physical Exercise',
        category: 'Fitness',
        streak: 14,
        consistency: 88,
        notes: 'Mix of HIIT, weight training, and mobility.',
        weekDays: [1, 1, 1, 1, 1, 1, 0]
      },
      {
        id: 'h_3',
        name: 'No Phone First 30 Mins After Wakeup',
        category: 'Mindset',
        streak: 9,
        consistency: 82,
        notes: 'Keep morning brain clear of external noise.',
        weekDays: [1, 1, 1, 1, 1, 0, 1]
      },
      {
        id: 'h_4',
        name: 'Deep Work Flow State (Zero Alt-Tab)',
        category: 'Productivity',
        streak: 12,
        consistency: 91,
        notes: 'Use timer and focus music.',
        weekDays: [1, 1, 1, 1, 1, 1, 0]
      },
      {
        id: 'h_5',
        name: 'Read 20+ Pages Daily',
        category: 'Wisdom',
        streak: 21,
        consistency: 96,
        notes: 'Non-fiction books on mindset and tech.',
        weekDays: [1, 1, 1, 1, 1, 1, 1]
      },
      {
        id: 'h_6',
        name: 'Evening Journal & Tomorrow Planning',
        category: 'Mindset',
        streak: 8,
        consistency: 79,
        notes: 'Reflect on 3 wins and write top 3 priorities.',
        weekDays: [1, 1, 1, 1, 0, 1, 0]
      }
    ],
    missions: {
      primaryQuest: {
        id: 'quest_boss_1',
        title: 'Master the 21-Day Consistency Challenge',
        description: 'Maintain 80%+ habit completion rate for 21 days straight to unlock the Mythic Titanium Crest.',
        reward_xp: 350,
        reward_coins: 150,
        progress: 14,
        target: 21,
        unit: 'days',
        tier: 'Boss Quest'
      },
      dailyList: [
        {
          id: 'm_1',
          title: 'Complete all 5 daily growth tasks',
          xp: 60,
          coins: 25,
          done: false
        },
        {
          id: 'm_2',
          title: 'Engage with community discussion post',
          xp: 25,
          coins: 10,
          done: true
        },
        {
          id: 'm_3',
          title: 'Log daily budget & savings update',
          xp: 30,
          coins: 15,
          done: false
        }
      ],
      timedMission: {
        active: false,
        title: 'Hyperfocus Deep Sprint',
        durationMinutes: 25,
        remainingSeconds: 1500,
        reward_xp: 80,
        reward_coins: 35
      }
    },
    rewards: [
      {
        id: 'r_1',
        title: 'Guilt-Free Cheat Meal',
        category: 'Lifestyle',
        icon: '🍕',
        cost_coins: 150,
        description: 'Enjoy your favorite dessert or cheat meal without regret.'
      },
      {
        id: 'r_2',
        title: '2-Hour Video Gaming Session',
        category: 'Leisure',
        icon: '🎮',
        cost_coins: 250,
        description: 'Uninterrupted gaming time after completing all tasks.'
      },
      {
        id: 'r_3',
        title: 'Order a New Book on Amazon',
        category: 'Growth',
        icon: '📚',
        cost_coins: 400,
        description: 'Reward your intellect with a brand new physical book.'
      },
      {
        id: 'r_4',
        title: 'Specialty Coffee at Artisan Cafe',
        category: 'Leisure',
        icon: '☕',
        cost_coins: 120,
        description: 'Treat yourself to your favorite pour-over or latte.'
      },
      {
        id: 'r_5',
        title: 'Full Day Off / Nature Hike',
        category: 'Wellness',
        icon: '🌲',
        cost_coins: 800,
        description: 'A full recharge day away from all work and screens.'
      }
    ],
    claimedRewards: [
      {
        id: 'cr_1',
        title: 'Specialty Coffee at Artisan Cafe',
        cost_coins: 120,
        claimedAt: 'Yesterday'
      }
    ],
    achievements: [
      {
        id: 'ach_1',
        title: 'First Step to Greatness',
        category: 'Task Mastery',
        description: 'Complete your first ever task in Progress XP.',
        tier: 'uncommon',
        unlocked: true,
        progress: 1,
        target: 1,
        icon: '🏁'
      },
      {
        id: 'ach_2',
        title: 'Centurion of Focus',
        category: 'Task Mastery',
        description: 'Complete 100 total growth tasks.',
        tier: 'rare',
        unlocked: true,
        progress: 184,
        target: 100,
        icon: '⚔️'
      },
      {
        id: 'ach_3',
        title: 'The 30-Day Flame',
        category: 'Streak Titan',
        description: 'Achieve a 30-day unbroken daily streak.',
        tier: 'epic',
        unlocked: true,
        progress: 31,
        target: 30,
        icon: '🔥'
      },
      {
        id: 'ach_4',
        title: 'Habit Architect',
        category: 'Habit Architect',
        description: 'Track 6 habits concurrently with >85% monthly consistency.',
        tier: 'legendary',
        unlocked: false,
        progress: 88,
        target: 100,
        icon: '🏛️'
      },
      {
        id: 'ach_5',
        title: 'Mind of Steel',
        category: 'Knowledge Seeker',
        description: 'Complete reading 10 book summaries in the Growth Library.',
        tier: 'mythic',
        unlocked: false,
        progress: 6,
        target: 10,
        icon: '🧠'
      },
      {
        id: 'ach_6',
        title: 'Transcendent Evolution',
        category: 'Grandmaster',
        description: 'Attain Rank Transcendent and accumulate over 25,000 XP.',
        tier: 'transcendent',
        unlocked: false,
        progress: 4850,
        target: 25000,
        icon: '💎'
      }
    ],
    leaderboard: [
      {
        rank: 1,
        name: 'Sarah Connor',
        username: 'sarah_c',
        xp: 12450,
        streak: 48,
        best_streak: 48,
        tier: 'Legendary',
        avatar: 'cyborg_neon'
      },
      {
        rank: 2,
        name: 'Vikram Mehta',
        username: 'vikram_m',
        xp: 9800,
        streak: 35,
        best_streak: 42,
        tier: 'Master',
        avatar: 'samurai_blade'
      },
      {
        rank: 3,
        name: 'Elena Rostova',
        username: 'elena_r',
        xp: 7600,
        streak: 29,
        best_streak: 30,
        tier: 'Diamond',
        avatar: 'mage_arcane'
      },
      {
        rank: 4,
        name: 'Alex Hunter (You)',
        username: 'AlexGrowth',
        xp: 4850,
        streak: 14,
        best_streak: 31,
        tier: 'Diamond',
        avatar: 'cyborg_neon',
        isCurrentUser: true
      },
      {
        rank: 5,
        name: 'Marcus Vance',
        username: 'marcus_v',
        xp: 4200,
        streak: 11,
        best_streak: 25,
        tier: 'Platinum',
        avatar: 'pilot_exo'
      },
      {
        rank: 6,
        name: 'Ananya Sharma',
        username: 'ananya_s',
        xp: 3850,
        streak: 16,
        best_streak: 20,
        tier: 'Gold',
        avatar: 'valkyrie'
      }
    ],
    library: [
      {
        id: 'b_1',
        title: 'Atomic Habits',
        author: 'James Clear',
        category: 'Habits & Systems',
        readPercent: 100,
        summary: 'Small habits make a remarkable difference. Focus on systems rather than goals.',
        keyTakeaway: 'You do not rise to the level of your goals. You fall to the level of your systems.',
        duration: '15 min summary'
      },
      {
        id: 'b_2',
        title: 'Deep Work',
        author: 'Cal Newport',
        category: 'Productivity',
        readPercent: 70,
        summary: 'Rules for focused success in a distracted world. The ability to perform deep work is becoming rare and valuable.',
        keyTakeaway: 'Clarity about what matters provides clarity about what does not.',
        duration: '18 min summary'
      },
      {
        id: 'b_3',
        title: 'The Psychology of Money',
        author: 'Morgan Housel',
        category: 'Finance',
        readPercent: 45,
        summary: 'Timeless lessons on wealth, greed, and happiness. Doing well with money has a little to do with how smart you are and a lot to do with how you behave.',
        keyTakeaway: 'Spending money to show people how much money you have is the fastest way to have less money.',
        duration: '14 min summary'
      },
      {
        id: 'b_4',
        title: 'Meditations',
        author: 'Marcus Aurelius',
        category: 'Stoicism & Philosophy',
        readPercent: 30,
        summary: 'Personal reflections by the Roman Emperor on stoic philosophy, resilience, and virtue.',
        keyTakeaway: 'You have power over your mind - not outside events. Realize this, and you will find strength.',
        duration: '20 min summary'
      }
    ],
    finance: {
      monthlyIncome: 120000,
      monthlyExpenses: 48000,
      savingsRate: 60,
      transactions: [
        { id: 'f_1', title: 'Salary / Client Retainer', type: 'income', amount: 120000, category: 'Work', date: '2026-10-01' },
        { id: 'f_2', title: 'Rent & Utilities', type: 'expense', amount: 25000, category: 'Living', date: '2026-10-03' },
        { id: 'f_3', title: 'SIP Mutual Funds', type: 'expense', amount: 35000, category: 'Investment', date: '2026-10-05' },
        { id: 'f_4', title: 'Healthy Groceries & Nutrition', type: 'expense', amount: 12000, category: 'Food', date: '2026-10-10' }
      ]
    },
    community: [
      {
        id: 'post_1',
        author: 'Sarah Connor',
        avatar: 'cyborg_neon',
        rank: 'Legendary',
        content: 'Hit Day 48 on my streak! What helped me most was keeping my morning habit stack down to just 3 essential non-negotiables. Don’t overload your mornings.',
        likes: 24,
        commentsCount: 6,
        timeAgo: '2h ago'
      },
      {
        id: 'post_2',
        author: 'Vikram Mehta',
        avatar: 'samurai_blade',
        rank: 'Master',
        content: 'Just redeemed my 250 XP coins for a guilt-free 2-hour gaming session. Pairing RPG rewards with real-life habit completion works wonders.',
        likes: 19,
        commentsCount: 3,
        timeAgo: '4h ago'
      }
    ],
    admin: {
      broadcastNotification: {
        active: false,
        title: 'Season 4 Grandmaster Quest is Live!',
        message: 'Double XP is active for all focus sessions completed before midnight.',
        countdownEnd: new Date(Date.now() + 86400000).toISOString(),
        ctaText: 'Claim Daily Boost',
        ctaLink: '?tab=mission'
      },
      usersList: [
        { id: 'usr_1', name: 'Alex Hunter', username: 'AlexGrowth', email: 'alex@progressxp.app', xp: 4850, streak: 14, role: 'admin', plan: 'Lifetime Pro', status: 'Active' },
        { id: 'usr_2', name: 'Sarah Connor', username: 'sarah_c', email: 'sarah@resistance.net', xp: 12450, streak: 48, role: 'user', plan: 'Monthly Elite', status: 'Active' },
        { id: 'usr_3', name: 'Vikram Mehta', username: 'vikram_m', email: 'vikram@growth.in', xp: 9800, streak: 35, role: 'user', plan: 'Lifetime Pro', status: 'Active' },
        { id: 'usr_4', name: 'Elena Rostova', username: 'elena_r', email: 'elena@orbit.io', xp: 7600, streak: 29, role: 'user', plan: 'Free Trial', status: 'Active' },
        { id: 'usr_5', name: 'Marcus Vance', username: 'marcus_v', email: 'marcus@corp.com', xp: 4200, streak: 11, role: 'user', plan: 'Monthly Elite', status: 'Active' }
      ]
    }
  };

  class Store {
    constructor() {
      this.listeners = [];
      this.pendingUndoTimers = new Map();
      this.state = this.loadState();
    }

    loadState() {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) {
          const parsed = JSON.parse(raw);
          // Merge with default state to ensure any new keys exist
          return Object.assign({}, DEFAULT_STATE, parsed, {
            auth: Object.assign({}, DEFAULT_STATE.auth, parsed.auth || {}),
            settings: Object.assign({}, DEFAULT_STATE.settings, parsed.settings || {})
          });
        }
      } catch (e) {
        console.warn('ProgressXP Store: Failed to load from localStorage, using default seed', e);
      }
      return JSON.parse(JSON.stringify(DEFAULT_STATE));
    }

    saveState() {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
      } catch (e) {
        console.error('ProgressXP Store: Failed to save to localStorage', e);
      }
    }

    subscribe(listener) {
      this.listeners.push(listener);
      return () => {
        this.listeners = this.listeners.filter(l => l !== listener);
      };
    }

    notify(changedPath) {
      this.saveState();
      this.listeners.forEach(fn => {
        try {
          fn(this.state, changedPath);
        } catch (err) {
          console.error('ProgressXP Store Listener Error:', err);
        }
      });
    }

    getState() {
      return this.state;
    }

    // --- ACTIONS ---

    setTab(tabName) {
      this.state.settings.selectedTab = tabName;
      this.notify('settings.selectedTab');
    }

    setAppExperience(mode) {
      this.state.settings.appExperience = mode;
      if (typeof document !== 'undefined') {
        document.documentElement.setAttribute('data-app-experience', mode);
        if (mode === 'clutter_free') {
          document.body.classList.add('simple-mode-on');
        } else {
          document.body.classList.remove('simple-mode-on');
        }
      }
      this.notify('settings.appExperience');
    }

    toggleAppExperience() {
      const next = this.state.settings.appExperience === 'standard' ? 'clutter_free' : 'standard';
      this.setAppExperience(next);
    }

    // Task Actions with 3-Second Undo Grace Period
    completeTask(taskId, onGraceTick, onGraceFinished) {
      const task = this.state.tasks.find(t => t.id === taskId);
      if (!task || task.done) return;

      task.done = true;
      task.completedAt = new Date().toISOString();
      task.inGracePeriod = true;
      task.graceRemaining = 3.0;

      // Add XP & Coins immediately
      this.state.auth.user.xp += task.xp;
      this.state.auth.user.coins += task.coins;
      this.checkLevelUp();
      this.notify('tasks');

      // Play audio chime if available
      if (window.ProgressXPAudio) {
        window.ProgressXPAudio.playTaskComplete();
      }

      // Start 3-second countdown
      const startTime = Date.now();
      const interval = setInterval(() => {
        const elapsed = (Date.now() - startTime) / 1000;
        const remaining = Math.max(0, 3.0 - elapsed);
        task.graceRemaining = parseFloat(remaining.toFixed(1));

        if (onGraceTick) onGraceTick(task.graceRemaining);

        if (remaining <= 0) {
          clearInterval(interval);
          this.pendingUndoTimers.delete(taskId);
          delete task.inGracePeriod;
          delete task.graceRemaining;
          this.notify('tasks');
          if (onGraceFinished) onGraceFinished();
        }
      }, 100);

      this.pendingUndoTimers.set(taskId, {
        interval,
        rollback: () => {
          clearInterval(interval);
          task.done = false;
          task.completedAt = null;
          delete task.inGracePeriod;
          delete task.graceRemaining;
          this.state.auth.user.xp = Math.max(0, this.state.auth.user.xp - task.xp);
          this.state.auth.user.coins = Math.max(0, this.state.auth.user.coins - task.coins);
          this.checkLevelUp();
          this.notify('tasks');
        }
      });
    }

    undoTask(taskId) {
      const entry = this.pendingUndoTimers.get(taskId);
      if (entry) {
        entry.rollback();
        this.pendingUndoTimers.delete(taskId);
        if (window.ProgressXPAudio) {
          window.ProgressXPAudio.playClick();
        }
        return true;
      }
      return false;
    }

    addTask(title, category = 'Growth', xp = 30, coins = 15, minutes = 25) {
      const newTask = {
        id: 'task_' + Date.now(),
        title: title.trim(),
        category: category,
        xp: parseInt(xp, 10) || 30,
        coins: parseInt(coins, 10) || 15,
        minutes: parseInt(minutes, 10) || 25,
        done: false,
        completedAt: null
      };
      this.state.tasks.unshift(newTask);
      this.notify('tasks');
      return newTask;
    }

    deleteTask(taskId) {
      this.state.tasks = this.state.tasks.filter(t => t.id !== taskId);
      this.notify('tasks');
    }

    reorderTasks(newOrderIds) {
      const taskMap = new Map(this.state.tasks.map(t => [t.id, t]));
      const reordered = [];
      newOrderIds.forEach(id => {
        if (taskMap.has(id)) {
          reordered.push(taskMap.get(id));
          taskMap.delete(id);
        }
      });
      // Append any remaining
      taskMap.forEach(t => reordered.push(t));
      this.state.tasks = reordered;
      this.notify('tasks');
    }

    // Habit Actions
    toggleHabitDay(habitId, dayIndex) {
      const habit = this.state.habits.find(h => h.id === habitId);
      if (!habit) return;

      const current = habit.weekDays[dayIndex];
      const next = current ? 0 : 1;
      habit.weekDays[dayIndex] = next;

      // If marked done, grant XP
      if (next === 1) {
        this.state.auth.user.xp += 15;
        this.state.auth.user.coins += 5;
        habit.streak += 1;
        if (window.ProgressXPAudio) window.ProgressXPAudio.playTaskComplete();
      } else {
        this.state.auth.user.xp = Math.max(0, this.state.auth.user.xp - 15);
        this.state.auth.user.coins = Math.max(0, this.state.auth.user.coins - 5);
        habit.streak = Math.max(0, habit.streak - 1);
      }

      this.checkLevelUp();
      this.notify('habits');
    }

    addHabit(name, category = 'Health', notes = '') {
      const newHabit = {
        id: 'h_' + Date.now(),
        name: name.trim(),
        category: category,
        streak: 1,
        consistency: 100,
        notes: notes,
        weekDays: [0, 0, 0, 0, 0, 0, 0]
      };
      // Mark today as 1
      const todayDay = (new Date().getDay() + 6) % 7; // 0=Mon, 6=Sun
      newHabit.weekDays[todayDay] = 1;
      this.state.auth.user.xp += 20;
      this.state.habits.push(newHabit);
      this.checkLevelUp();
      this.notify('habits');
      return newHabit;
    }

    // Mission Actions
    completeMission(missionId) {
      const mission = this.state.missions.dailyList.find(m => m.id === missionId);
      if (!mission || mission.done) return;

      mission.done = true;
      this.state.auth.user.xp += mission.xp;
      this.state.auth.user.coins += mission.coins;
      this.checkLevelUp();
      this.notify('missions');
      if (window.ProgressXPAudio) window.ProgressXPAudio.playTaskComplete();
    }

    copyYesterdayMissions() {
      // Simulate cloning yesterday's list
      this.state.missions.dailyList.forEach(m => {
        m.done = false;
      });
      this.notify('missions');
      if (window.ProgressXPAudio) window.ProgressXPAudio.playClick();
    }

    // Reward Actions
    redeemReward(rewardId) {
      const reward = this.state.rewards.find(r => r.id === rewardId);
      if (!reward) return { ok: false, msg: 'Reward not found' };
      if (this.state.auth.user.coins < reward.cost_coins) {
        return { ok: false, msg: 'Insufficient coins! Earn more by completing tasks and habits.' };
      }

      this.state.auth.user.coins -= reward.cost_coins;
      this.state.claimedRewards.unshift({
        id: 'cr_' + Date.now(),
        title: reward.title,
        cost_coins: reward.cost_coins,
        claimedAt: 'Just now'
      });
      this.notify('rewards');
      if (window.ProgressXPAudio) window.ProgressXPAudio.playLevelUp();
      return { ok: true, msg: `Unlocked: ${reward.title}!` };
    }

    addCustomReward(title, cost, icon = '🎁') {
      const newReward = {
        id: 'r_' + Date.now(),
        title: title.trim(),
        category: 'Personal',
        icon: icon,
        cost_coins: parseInt(cost, 10) || 100,
        description: 'Custom self-crafted reward.'
      };
      this.state.rewards.push(newReward);
      this.notify('rewards');
    }

    // Finance Actions
    addTransaction(title, type, amount, category) {
      const num = parseFloat(amount) || 0;
      const trans = {
        id: 'f_' + Date.now(),
        title: title.trim(),
        type: type,
        amount: num,
        category: category,
        date: new Date().toISOString().slice(0, 10)
      };
      this.state.finance.transactions.unshift(trans);
      if (type === 'income') {
        this.state.finance.monthlyIncome += num;
      } else {
        this.state.finance.monthlyExpenses += num;
      }
      const diff = this.state.finance.monthlyIncome - this.state.finance.monthlyExpenses;
      this.state.finance.savingsRate = Math.round((diff / Math.max(1, this.state.finance.monthlyIncome)) * 100);
      this.notify('finance');
    }

    // Community Actions
    addPost(content) {
      const newPost = {
        id: 'post_' + Date.now(),
        author: this.state.auth.user.name,
        avatar: this.state.auth.user.avatar,
        rank: this.state.auth.user.rank,
        content: content.trim(),
        likes: 0,
        commentsCount: 0,
        timeAgo: 'Just now'
      };
      this.state.community.unshift(newPost);
      this.state.auth.user.xp += 10;
      this.notify('community');
      return newPost;
    }

    likePost(postId) {
      const post = this.state.community.find(p => p.id === postId);
      if (post) {
        post.likes += 1;
        this.notify('community');
      }
    }

    // User & Avatar Actions
    setAvatar(avatarKey) {
      this.state.auth.user.avatar = avatarKey;
      this.notify('auth.user.avatar');
    }

    login(username, password) {
      this.state.auth.isLoggedIn = true;
      this.state.auth.user.username = username || 'User';
      this.state.auth.user.name = username || 'Alex Hunter';
      this.notify('auth');
      return true;
    }

    logout() {
      this.state.auth.isLoggedIn = false;
      this.notify('auth');
    }

    checkLevelUp() {
      const user = this.state.auth.user;
      if (user.xp >= user.next_level_xp) {
        user.level += 1;
        user.next_level_xp = Math.round(user.next_level_xp * 1.35);
        if (user.level >= 20) user.rank = 'Transcendent';
        else if (user.level >= 16) user.rank = 'Master';
        else if (user.level >= 12) user.rank = 'Diamond';
        else if (user.level >= 8) user.rank = 'Platinum';
        else if (user.level >= 5) user.rank = 'Gold';
        else if (user.level >= 3) user.rank = 'Silver';
        else user.rank = 'Bronze';

        if (window.ProgressXPAudio) window.ProgressXPAudio.playLevelUp();
      }
    }
  }

  // Global singleton
  window.ProgressXPStore = new Store();

})(window);
