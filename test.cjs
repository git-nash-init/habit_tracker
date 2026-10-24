const assert = require('assert');

// Mock localStorage and window
global.window = global;
global.localStorage = {
  store: {},
  getItem(k) { return this.store[k] || null; },
  setItem(k, v) { this.store[k] = String(v); },
  removeItem(k) { delete this.store[k]; }
};

// Load store
require('./public/js/store.js');

const store = window.ProgressXPStore;
console.log('Testing ProgressXP Production Store (Mehul Palan — Authentic Seed)...');

// Test 1: Initial state load with real user profile
const state = store.getState();
assert.ok(state.auth.isLoggedIn, 'User should be logged in by default');
assert.strictEqual(state.user.name, 'Mehul Palan', 'User display name should be Mehul Palan');
assert.strictEqual(state.user.title, 'Starter', 'User rank should be Starter');
assert.strictEqual(state.tasks.length, 3, 'Should start with 3 authentic starter tasks');
console.log('✓ Initial state verified (Mehul Palan, Starter, 3 tasks)');

// Test 2: Add task
const initialTasks = state.tasks.length;
store.addTask('Deep Work Focus Block', 'Focus', 50, 10, 45);
assert.strictEqual(store.getState().tasks.length, initialTasks + 1, 'Task count should increase');
console.log('✓ Add task verified');

// Test 3: Complete task
const taskToComplete = store.getState().tasks[0];
const initialXp = store.getState().user.totalXp;
store.completeTask(taskToComplete.id);
assert.strictEqual(taskToComplete.done, true, 'Task should be marked done');
assert.strictEqual(store.getState().user.totalXp, initialXp + taskToComplete.xp, 'XP should increase correctly');
console.log('✓ Complete task verified');

// Test 4: Undo task
const undoSuccess = store.undoTask(taskToComplete.id);
assert.strictEqual(undoSuccess, true, 'Undo should succeed');
assert.strictEqual(taskToComplete.done, false, 'Task should be undone');
assert.strictEqual(store.getState().user.totalXp, initialXp, 'XP should be rolled back');
console.log('✓ Task undo verified');

// Test 5: Tab navigation
assert.strictEqual(store.getState().activeTab, 'home');
store.setActiveTab('growth');
assert.strictEqual(store.getState().activeTab, 'growth', 'Should switch to growth tab');
store.setActiveTab('wake');
assert.strictEqual(store.getState().activeTab, 'wake', 'Should switch to wake tab');
store.setActiveTab('home');
console.log('✓ Tab navigation state verified');

// Test 6: Simple mode toggle
assert.strictEqual(store.getState().simpleMode, false);
store.toggleSimpleMode();
assert.strictEqual(store.getState().simpleMode, true, 'Simple mode toggled on');
store.toggleSimpleMode();
assert.strictEqual(store.getState().simpleMode, false, 'Simple mode toggled off');
console.log('✓ Simple mode toggle verified');

// Test 7: Growth view component DOM generator
require('./public/js/components/growth.js');
const mockGrowthEl = { innerHTML: '', querySelector: () => null, querySelectorAll: () => [] };
window.ProgressXPGrowth.render(mockGrowthEl, store.getState());
assert.ok(mockGrowthEl.innerHTML.includes('30-DAY PERFORMANCE SCAN'), 'Growth view must render 30-Day Performance Scan');
assert.ok(mockGrowthEl.innerHTML.includes('Consistency Calendar'), 'Growth view must render Consistency Calendar');
assert.ok(mockGrowthEl.innerHTML.includes('AURA · ATTRIBUTE INTELLIGENCE'), 'Growth view must render AURA Intelligence');
assert.ok(mockGrowthEl.innerHTML.includes('data-growth-radar-potential'), 'Growth view must render Radar polygon');
assert.ok(mockGrowthEl.innerHTML.includes('30-DAY CAPABILITY TRAJECTORY'), 'Growth view must render Trajectory chart');
console.log('✓ Growth View & AURA Intelligence component rendering verified');

console.log('\nAll 7 Progress XP production test suites PASSED successfully!');
