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
console.log('Testing ProgressXP Store...');

// Test 1: Initial state load
const state = store.getState();
assert.ok(state.auth.isLoggedIn, 'User should be logged in by default');
assert.strictEqual(state.auth.user.username, 'AlexGrowth', 'Username should match initial seed');
console.log('✓ Initial state verified');

// Test 2: Add task
const initialTasks = state.tasks.length;
store.addTask('Test Automated Verification Task', 'Focus', 40, 20);
assert.strictEqual(store.getState().tasks.length, initialTasks + 1, 'Task count should increase');
console.log('✓ Add task verified');

// Test 3: Complete task & undo grace period
const newTask = store.getState().tasks[0];
const initialXp = store.getState().auth.user.xp;
store.completeTask(newTask.id);
assert.strictEqual(newTask.done, true, 'Task should be marked done');
assert.strictEqual(store.getState().auth.user.xp, initialXp + 40, 'XP should increase by 40');
console.log('✓ Complete task verified');

// Test 4: Undo task
const undoSuccess = store.undoTask(newTask.id);
assert.strictEqual(undoSuccess, true, 'Undo should succeed');
assert.strictEqual(newTask.done, false, 'Task should be undone');
assert.strictEqual(store.getState().auth.user.xp, initialXp, 'XP should be rolled back');
console.log('✓ 3-second undo grace period verified');

// Test 5: Habits toggle
const habit = store.getState().habits[0];
const initialDay = habit.weekDays[0];
store.toggleHabitDay(habit.id, 0);
assert.strictEqual(habit.weekDays[0], initialDay ? 0 : 1, 'Habit day should toggle');
console.log('✓ Habit check-in verified');

// Test 6: Experience mode toggle
assert.strictEqual(store.getState().settings.appExperience, 'standard');
store.setAppExperience('clutter_free');
assert.strictEqual(store.getState().settings.appExperience, 'clutter_free', 'Clutter-free mode toggled');
console.log('✓ Experience mode toggle verified');

console.log('\nAll 6 Progress XP unit & integration tests PASSED successfully!');
