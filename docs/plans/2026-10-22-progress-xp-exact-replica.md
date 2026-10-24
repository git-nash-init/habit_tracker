# Progress XP Pixel-Perfect Replication Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a production-ready, pixel-perfect, 100% authentic recreation of Progress XP matching the live application at `https://personal-growth.elitedigitaleducation.in/?_ui=17.10.416-1792585221236` and the user's reference screenshot with all interactive UI/UX features.

**Architecture:** A high-performance, modular client-side progressive web app served via a Node.js HTTP server. Utilizes the extracted production CSS stylesheets from the live Progress XP runtime (`asset_0.js` and inline critical stylesheets) for 1:1 visual fidelity, paired with a vanilla JS reactive state store, Web Audio API harmonic sound synthesizer, SVG vector scene engine, and interactive guided tour controller.

**Tech Stack:** 
- HTML5 Semantic Structure & Micro-interactions
- Extracted Production Progress XP CSS Design System (Glassmorphic cards, cyberpunk midnight gradients, custom typography)
- Vanilla JavaScript ES2022 Modules
- Web Audio API (ProgressXP Mallet Tone Synthesis Engine)
- Node.js Built-in HTTP Server (`server.js`)
- Unit & Integration Test Suite (`test.cjs`)

---

### Task 1: Consolidate the Authentic Progress XP Design System & Stylesheets

**Files:**
- Create: `public/css/progress-xp.css`
- Modify: `public/index.html`

**Description:**
Extract and combine the authentic production CSS rules from the reverse-engineered `asset_0.js` and critical inline stylesheets into a consolidated, clean `progress-xp.css` that provides all glassmorphic backgrounds, rotating highlight slider cards, today plan ring, route dock, buttons, typography, and responsive layouts.

---

### Task 2: Build the Core Shell, Header, Demo Bar & Left Route Dock

**Files:**
- Modify: `public/index.html`
- Create: `public/js/components/header.js`
- Create: `public/js/components/dock.js`

**Description:**
Implement the exact DOM hierarchy for:
1. Top Guided Demo Bar (`px-demo-head`) with `APP DEMO`, `Sample data`, `< Tour ▶ ⟲ > 2x ✕`.
2. App Header with neon-bordered Status emblem, "Progress XP", "Welcome, Mehul Palan. Starter.", "Simple Mode" toggle, and hamburger menu.
3. Left Vertical Route Rail with Home (active), Growth, + Add (gradient square), Wake Up, and Identity.
4. Mobile Bottom Navigation for smaller screens.

---

### Task 3: Implement Dashboard "Now" View: Highlight Slider & Today Plan

**Files:**
- Create: `public/js/components/highlight-slider.js`
- Create: `public/js/components/today-plan.js`
- Modify: `public/index.html`

**Description:**
1. **Highlight Slider**: "Focus on what matters", badges (`STREAK 0 days`, `FOCUSED TODAY 0 min`, `OPEN NOW 3 tasks`), Total XP box (`0`, `0 XP today`, `-50 if inactive`, `100 XP to Level 2`), and the Outside Now box (`Evening mode`, `17:58`, `Location off`, vector mountain night/evening scene with glowing moon/sun, 4 carousel dots).
2. **Today Plan**: Circular progress ring with `0 / 3 TASKS`, eyebrow `TODAY`, subtitle `4 tasks around your current time · 3 total scheduled today`, `● 2 behind` badge, and timeline cards (`2-minute day review`, `One focused work block`, `Plan today's top 3`).
3. **Demo Banner**: "Watch the app in use. Press Play to begin, or skip." with speaker icon and `Try it myself` button.

---

### Task 4: Implement Task Cards, Interactive Complete Actions & Grace Period

**Files:**
- Create: `public/js/components/tasks.js`
- Create: `public/js/components/quick-add-modal.js`
- Modify: `public/js/store.js`

**Description:**
1. Render the 3 primary starter tasks:
   - "2-minute day review" (Priority #1, Starter, Daily, 50 XP, 5 coins, 3 min)
   - "One focused work block" (Priority #2, Starter, Daily, 200 XP, 20 coins, 30 min)
   - "Plan today's top 3" (Priority #3, Starter, Daily, 100 XP, 10 coins, 10 min)
   - "+ More task" container button
2. Interactive `Complete →` button with 3-second undo countdown timer before awarding XP & coins.
3. Quick Add Task Modal triggered by the `+ Add` button.

---

### Task 5: Implement Growth, Wake Up, and Identity Panels

**Files:**
- Create: `public/js/components/growth-panel.js`
- Create: `public/js/components/wake-panel.js`
- Create: `public/js/components/identity-panel.js`

**Description:**
1. **Growth Panel**: RPG Attribute Matrix (Vitality, Focus, Discipline, Mastery, Wisdom), Level 1 progression HUD, standing breakdown.
2. **Wake Up Panel**: Analog clock with live ticking hands (`data-wake-hour`, `minute`, `second`), digital clock, timezone, first wake-up check.
3. **Identity Panel**: Avatar vault showcase, frame customizer, rank titles.

---

### Task 6: Implement Sound Synthesis, Interactive Tour & State Store

**Files:**
- Create: `public/js/components/sound-engine.js`
- Create: `public/js/components/tour-player.js`
- Modify: `public/js/store.js`
- Modify: `public/js/app.js`

**Description:**
1. Re-implement the authentic ProgressXP Web Audio API mallet synthesis engine (`signature` sound pack) for tap, nav, success, focus, and error chimes.
2. Implement the interactive Guided Tour controller with playback (Play, Pause, Step Next, Step Prev, Speed 2x, Voice narration toggle).
3. Connect all interactions to `ProgressXPStore` with LocalStorage persistence.

---

### Task 7: Verification, Server Integration & Production Test Suite

**Files:**
- Modify: `server.js`
- Modify: `test.cjs`

**Description:**
Run the complete automated test suite ensuring all state transitions, store mutations, sound generation hooks, navigation switching, and API mock endpoints pass 100% cleanly.
