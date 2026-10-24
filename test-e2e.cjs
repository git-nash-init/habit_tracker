const http = require('http');
const assert = require('assert');
const server = require('./server.js');

const PORT = 3099;

server.listen(PORT, async () => {
  console.log(`Running Progress XP E2E Server Tests on port ${PORT}...`);
  try {
    // 1. Root HTML
    const resRoot = await fetch(`http://localhost:${PORT}/`);
    assert.strictEqual(resRoot.status, 200, 'Root should return 200');
    const html = await resRoot.text();
    assert.ok(html.includes('Progress XP'), 'HTML must contain Progress XP title');
    assert.ok(html.includes('Mehul Palan. Starter.'), 'HTML must contain Mehul Palan. Starter.');
    assert.ok(html.includes('Focus on what matters'), 'HTML must contain Focus on what matters');
    assert.ok(html.includes('2-minute day review'), 'HTML must contain 2-minute day review');
    assert.ok(html.includes('One focused work block'), 'HTML must contain One focused work block');
    assert.ok(html.includes('Plan today\'s top 3'), 'HTML must contain Plan today\'s top 3');
    assert.ok(html.includes('APP DEMO'), 'HTML must contain APP DEMO bar');
    console.log('✓ Root HTML & pre-rendered components verified');

    // 2. CSS Stylesheets
    const stylesheets = [
      'css/progress-xp.css',
      'css/growth-system.css',
      'css/missions.css',
      'css/habits.css',
      'css/shop.css',
      'css/achievements.css',
      'css/modules.css',
      'css/admin.css'
    ];
    for (const cssFile of stylesheets) {
      const resCss = await fetch(`http://localhost:${PORT}/${cssFile}`);
      assert.strictEqual(resCss.status, 200, `${cssFile} should return 200`);
      const css = await resCss.text();
      assert.ok(css.length > 50, `${cssFile} should not be empty`);
      console.log(`✓ CSS ${cssFile} verified (${css.length} bytes)`);
    }

    // 3. JS Scripts
    const scripts = [
      'js/store.js',
      'js/app.js',
      'js/components/sound-engine.js',
      'js/components/growth.js',
      'js/components/missions.js',
      'js/components/habits.js',
      'js/components/shop.js',
      'js/components/achievements.js',
      'js/components/leaderboard.js',
      'js/components/library.js',
      'js/components/finance.js',
      'js/components/community.js',
      'js/components/admin.js',
      'js/components/avatars.js',
      'js/components/tour-player.js'
    ];
    for (const script of scripts) {
      const resScript = await fetch(`http://localhost:${PORT}/${script}`);
      assert.strictEqual(resScript.status, 200, `${script} should return 200`);
      const code = await resScript.text();
      assert.ok(code.length > 50, `${script} should not be empty`);
      console.log(`✓ Script ${script} verified (${code.length} bytes)`);
    }

    // 4. Static Image Assets
    const images = [
      'assets/avatars/starter_avatar.jpg',
      'assets/avatars/starter_avatar_thumb.jpg'
    ];
    for (const img of images) {
      const resImg = await fetch(`http://localhost:${PORT}/${img}`);
      assert.strictEqual(resImg.status, 200, `${img} should return 200`);
      const buf = await resImg.arrayBuffer();
      assert.ok(buf.byteLength > 1000, `${img} should have valid binary size`);
      console.log(`✓ Image ${img} verified (${buf.byteLength} bytes)`);
    }

    // 5. API endpoint
    const resApi = await fetch(`http://localhost:${PORT}/?api=test_endpoint`);
    assert.strictEqual(resApi.status, 200, 'API endpoint should return 200');
    const apiJson = await resApi.json();
    assert.strictEqual(apiJson.ok, true, 'API should return ok: true');
    console.log('✓ Mock API endpoint verified');

    console.log('\nAll E2E Server & Production Asset tests PASSED with 100% success!');
    server.close();
  } catch (err) {
    console.error('E2E Test Failed:', err);
    server.close();
    process.exit(1);
  }
});
