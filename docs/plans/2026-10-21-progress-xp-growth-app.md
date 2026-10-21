# Progress XP — Complete Personal Growth Web App Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build the complete, 1:1 pixel-perfect and feature-complete replica of the Progress XP personal growth web application (from `https://personal-growth.elitedigitaleducation.in/`), reverse-engineered using REA and GhidraMCP methodology, featuring full interactive dashboards, habits matrix, missions, rewards shop, achievement vault, leaderboard, growth library, personal finance, community hub, floating Aura AI companion, avatar vault, admin studio, and seamless offline persistence.

**Architecture:** A modern single-page web application architecture built with clean vanilla HTML5, CSS3 design tokens, and modular JavaScript. State is managed via a reactive Central Store with full localStorage persistence and optional mock API handlers mirroring the reverse-engineered `?api=*` endpoints. The UI features a high-fidelity glassmorphism design system supporting both Standard Gamified RPG Mode and Clutter-Free Minimal Mode.

**Tech Stack:** HTML5, Modern Vanilla CSS3 (Custom Properties, Glassmorphism, Responsive Grid/Flexbox), Vanilla ES6+ JavaScript, Phosphor & Heroicons SVGs, Web Audio API for sound effects, LocalStorage Persistence.

---

### Task 1: Project Setup and Foundational Design System (`index.css`)

**Files:**
- Create: `public/index.html`
- Create: `public/css/index.css`
- Create: `public/css/themes.css`

**Step 1: Write core HTML skeleton and styling tokens**
Define CSS variables for colors (`--bg-primary: #07111d`, `--bg-card: #0d1a28`, `--accent-cyan: #67e8f9`, `--accent-emerald: #10b981`, `--accent-purple: #a855f7`, `--text-main: #edf5ff`, `--line: rgba(138, 181, 238, 0.14)`), font families, elevation, and animations (`pxBootPulse`, `achievementSweep`).

**Step 2: Verify styles load and render correctly**
Verify by viewing HTML with Chrome/browser or Node tests.

**Step 3: Commit**
`git add public/index.html public/css/`
`git commit -m "feat: setup project structure and Progress XP core design system"`

---

### Task 2: State Management & Storage Layer (`src/store.js`)

**Files:**
- Create: `public/js/store.js`
- Test: `scratch/test_store.cjs`

**Step 1: Implement ProgressXP Store**
Implement reactive state store managing:
- User profile (`username`, `email`, `role`, `avatar`, `level`, `xp`, `coins`, `streak`, `best_streak`, `rank`)
- Tasks array with completion timestamps, category, minutes, XP reward, coins
- Habits matrix with days grid and streak counter
- Daily Missions (Primary & Secondary quests, timed countdowns)
- Rewards and inventory
- Achievements with criteria checks
- Community posts and comments
- Personal Finance transactions and budgets
- Experience settings (`appExperience`: 'standard' | 'clutter_free')
- Auto-sync with `localStorage` and initial demo seed data for guest users.

**Step 2: Run verification test**
Run `node scratch/test_store.cjs` to confirm state updates, XP level calculation, streak calculation, and persistence.

**Step 3: Commit**
`git add public/js/store.js`
`git commit -m "feat: add reactive store and persistence layer"`

---

### Task 3: Navigation, Topbar & Mode Switcher (`public/js/components/nav.js`)

**Files:**
- Create: `public/js/components/nav.js`
- Modify: `public/index.html`
- Create: `public/css/nav.css`

**Step 1: Implement Navigation Rail and Mobile Drawer**
Implement `#mainAppNav` matching the reverse-engineered layout:
- Brand header with animated "XP" mark
- Navigation items: Dashboard, Mission, Habits, Tasks, Rewards/Shop, History, Achievements, Leaderboard, Library, Community, Admin (if admin role), Account
- Mode toggle button ("Standard Gamified" ⇄ "Clutter-Free Minimal")
- Mobile hamburger trigger and bottom bar for phone viewports
- Sound effect triggers on tab click.

**Step 2: Commit**
`git add public/js/components/nav.js public/css/nav.css`
`git commit -m "feat: implement responsive navigation and experience switcher"`

---

### Task 4: Authentication & Guest Demo Exploration (`public/js/components/auth.js`)

**Files:**
- Create: `public/js/components/auth.js`
- Create: `public/css/auth.css`

**Step 1: Implement Authentication Views**
- Login Card matching the exact screenshot:
  - Username or Email input
  - Password input with show/hide password eye button
  - Login button with loading animation
  - "New to Progress XP? Create an account →"
  - "Forgot password?" modal
  - "Email OTP login" form with 6-digit verification code input
  - Instant "Guest Exploration / Demo Mode" button to preview full app without login
- Signup Form:
  - Name, username, email, password, phone/whatsapp
  - Welcome bonus: +50 XP and Starter Avatar!

**Step 2: Commit**
`git add public/js/components/auth.js public/css/auth.css`
`git commit -m "feat: implement auth screens, OTP login, and guest demo mode"`

---

### Task 5: Interactive Dashboard & Quick Task Flow (`public/js/components/dashboard.js`)

**Files:**
- Create: `public/js/components/dashboard.js`
- Create: `public/css/dashboard.css`

**Step 1: Implement Dashboard View**
- Top metric cards:
  - Total XP & Next Level progress rail
  - Rank emblem badge (Iron -> Bronze -> Silver -> Gold -> Platinum -> Diamond -> Master -> Transcendent)
  - Active Streak 🔥 counter with flame animation
  - Daily Goal progress (%) and Life Balance indicators
- Today's Available Tasks:
  - Task item card with checkbox/complete button
  - XP gain animation (+25 XP) with floating pill and sound chime
  - **3-Second Undo Grace Period**: when completed, the task displays a live 3.0s countdown pill with a "Cancel / Undo" button! If cancelled within 3s, XP is rolled back.
  - Quick Add Task inline form with title, category, XP reward
  - Priority Reorder modal (`task_order`) with drag-and-drop or move up/down controls.

**Step 2: Commit**
`git add public/js/components/dashboard.js public/css/dashboard.css`
`git commit -m "feat: implement dashboard, status cards, and undo grace period"`

---

### Task 6: Habits Tracker Matrix (`public/js/components/habits.js`)

**Files:**
- Create: `public/js/components/habits.js`
- Create: `public/css/habits.css`

**Step 1: Implement Habits Grid Matrix**
- Weekly / Monthly matrix displaying each habit across days of the week (Mon-Sun)
- Interactive cell click to toggle check-in (+10 XP)
- Habit streak badges and completion percentage
- "Add New Habit" dialog (name, category, frequency, target days)
- Habit Rich Notes editor (`simple_habit_notes`)
- AI Habit System suggestions generator (`habit_system_prompt`).

**Step 2: Commit**
`git add public/js/components/habits.js public/css/habits.css`
`git commit -m "feat: implement interactive habits matrix and rich habit notes"`

---

### Task 7: Daily Missions & Quest Hub (`public/js/components/missions.js`)

**Files:**
- Create: `public/js/components/missions.js`
- Create: `public/css/missions.css`

**Step 1: Implement Missions View**
- Mission Command Brief: Primary Quest and daily objectives
- "Copy Yesterday's Missions" button
- Timed Mission widget with real-time countdown timer and audio tick
- Add Mission modal with difficulty selection (Easy, Medium, Hard, Boss)
- Mission history drawer and completion feed.

**Step 2: Commit**
`git add public/js/components/missions.js public/css/missions.css`
`git commit -m "feat: implement daily quests and timed missions hub"`

---

### Task 8: Reward Store & XP Redemption (`public/js/components/shop.js`)

**Files:**
- Create: `public/js/components/shop.js`
- Create: `public/css/shop.css`

**Step 1: Implement Shop View**
- Balance display: Available XP & Coins
- Catalog of redeemable real-life and digital rewards (e.g., Cheat Meal, 2h Gaming Session, New Book, Coffee treat, Movie night)
- Redeem action with celebratory confetti effect and coin deduction
- "Create Custom Reward" modal (title, icon, coin cost, description)
- Redemption history ledger.

**Step 2: Commit**
`git add public/js/components/shop.js public/css/shop.css`
`git commit -m "feat: implement reward vault and XP redemption shop"`

---

### Task 9: Achievement Vault & Leaderboard (`public/js/components/achievements.js`, `public/js/components/leaderboard.js`)

**Files:**
- Create: `public/js/components/achievements.js`
- Create: `public/js/components/leaderboard.js`
- Create: `public/css/achievements.css`

**Step 1: Implement Achievements & Leaderboard**
- Achievement Vault:
  - 6 Tiers: Uncommon (Emerald), Rare (Blue), Epic (Purple), Legendary (Gold), Mythic (Magenta), Transcendent (Holographic)
  - Accordion categories: Task Mastery, Streak Titan, Habit Architect, Knowledge Seeker, Finance Guru
  - Unlocked percentage circular orb
- Leaderboard:
  - Global and Weekly standings table
  - User ranking with active streak (🔥 Current vs 🏆 Best)
  - Rank emblems and tier distinctions.

**Step 2: Commit**
`git add public/js/components/achievements.js public/js/components/leaderboard.js`
`git commit -m "feat: implement achievement vault and leaderboard standings"`

---

### Task 10: Growth Library, Personal Finance & Community Hub (`public/js/components/library.js`, `finance.js`, `community.js`)

**Files:**
- Create: `public/js/components/library.js`
- Create: `public/js/components/finance.js`
- Create: `public/js/components/community.js`
- Create: `public/css/modules.css`

**Step 1: Implement Secondary Modules**
- Growth Library: Curated book summaries and self-improvement articles with reading progress tracker
- Personal Finance: Income/Expense logger, savings rate calculator, categories, and financial consistency score
- Community Feed: Posts, likes, comment replies, and `@mention` autocomplete menu.

**Step 2: Commit**
`git add public/js/components/library.js public/js/components/finance.js public/js/components/community.js`
`git commit -m "feat: implement growth library, finance tracker, and community feed"`

---

### Task 11: Floating AURA AI Companion, Avatar Vault & Audio Effects (`public/js/components/aura.js`, `avatars.js`, `audio.js`)

**Files:**
- Create: `public/js/components/aura.js`
- Create: `public/js/components/avatars.js`
- Create: `public/js/components/audio.js`
- Create: `public/css/aura.css`

**Step 1: Implement Aura Companion & Avatars**
- Floating pulsing AURA orb in bottom-right corner with expand/collapse panel
- Context-sensitive coaching advice and motivational nudges
- Synthesized Web Audio API sound effects (task complete chime, level up fanfare, button click)
- Avatar Vault modal allowing users to unlock and select RPG character portraits.

**Step 2: Commit**
`git add public/js/components/aura.js public/js/components/avatars.js public/js/components/audio.js`
`git commit -m "feat: implement AURA companion, avatar vault, and sound effects"`

---

### Task 12: Admin Studio & Notification Broadcast Center (`public/js/components/admin.js`)

**Files:**
- Create: `public/js/components/admin.js`
- Create: `public/css/admin.css`

**Step 1: Implement Admin Studio**
- Navigation Rail (Overview, Users, Access & Payments, System Notifications, Storage, Telemetry)
- User Directory card list with user details, streak/XP editing, role toggle, and password reset
- System Broadcast Studio with live countdown preview modal
- Plan access manager (Free, Lifetime, Monthly).

**Step 2: Commit**
`git add public/js/components/admin.js public/css/admin.css`
`git commit -m "feat: implement admin studio and system notification broadcaster"`

---

### Task 13: Local Dev Server & Reverse-Engineering Architecture Documentation

**Files:**
- Create: `server.js`
- Create: `package.json`
- Create: `docs/REVERSE_ENGINEERING_REPORT.md` (detailing REA extraction, GhidraMCP binary analysis workflow, and architecture)

**Step 1: Create server and documentation**
Set up lightweight static server with Node.js `http` module to serve the application locally with full offline support.
Document the reverse engineering findings and GhidraMCP integration guide.

**Step 2: Launch server and verify complete application end-to-end**
Run server and perform end-to-end verification.

**Step 3: Commit**
`git add server.js package.json docs/`
`git commit -m "feat: complete local dev server and reverse-engineering documentation"`
