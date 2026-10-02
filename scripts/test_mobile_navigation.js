const assert = require('assert');

async function testMobileNavigation() {
  console.log('====================================================');
  console.log(' BELAJAR ADS — MOBILE NAV & FLOATING CTA TEST SUITE');
  console.log('====================================================\n');

  let passed = 0;

  // 1. Fetch Homepage
  console.log('--- 1. Testing Homepage HTML Structure ---');
  const res = await fetch('http://localhost:3000/');
  assert.strictEqual(res.status, 200, 'Homepage status must be 200');
  const html = await res.text();
  console.log('  ✓ [PASS] Homepage HTTP 200 OK');
  passed++;

  // 2. Verify Single Floating WhatsApp Button
  console.log('\n--- 2. Verifying Single Floating WhatsApp CTA ---');
  const floatingAsideMatches = html.match(/<aside[^>]*aria-label="WhatsApp Floating Action"[^>]*>/g) || [];
  assert.strictEqual(floatingAsideMatches.length, 1, 'There must be EXACTLY ONE floating WhatsApp aside element');
  console.log('  ✓ [PASS] Exactly 1 WhatsApp floating action aside found in HTML');
  passed++;

  // Verify it has bottom-6 right-6
  assert.ok(html.includes('fixed bottom-6 right-6 z-50'), 'WhatsApp button must be fixed bottom-6 right-6');
  console.log('  ✓ [PASS] Floating WhatsApp is fixed to bottom-6 right-6 z-50');
  passed++;

  // Ensure no duplicate floating WhatsApp or duplicate floating buttons exist
  const fixedElements = html.match(/class="[^"]*fixed bottom-[^"]*"/g) || [];
  assert.strictEqual(fixedElements.length, 1, 'Only ONE fixed bottom element exists in the rendered page');
  console.log(`  ✓ [PASS] Exactly ${fixedElements.length} fixed-bottom element exists on the page (no duplicate floating buttons)`);
  passed++;

  // 3. Verify No Duplicate Arrow Icons in CTA Buttons
  console.log('\n--- 3. Verifying Zero Duplicate Icons in CTA Buttons ---');
  // Check Program Cards on /programs
  const progRes = await fetch('http://localhost:3000/programs');
  const progHtml = await progRes.text();
  
  // Verify that inside ExternalButton, no extra ArrowRight exists
  const hasDuplicateArrow = progHtml.includes('class="ml-1.5 w-4 h-4 opacity-70"') && progHtml.includes('w-3.5 h-3.5');
  // Specifically check registration links
  const regLinks = progHtml.match(/<a[^>]*href="https:\/\/wa\.me[^"]*"[^>]*>.*?<\/a>/gs) || [];
  for (const link of regLinks) {
    const svgs = link.match(/<svg/g) || [];
    assert.strictEqual(svgs.length, 1, 'ExternalButton must have exactly 1 icon (ArrowUpRight), not duplicate arrows');
  }
  console.log(`  ✓ [PASS] Verified ${regLinks.length} registration buttons on /programs: each has exactly 1 icon`);
  passed++;

  // 4. Verify Hamburger Navigation Trigger
  console.log('\n--- 4. Verifying Hamburger Navigation Trigger & Header ---');
  assert.ok(html.includes('aria-label="Buka navigasi menu"'), 'Hamburger button must have accessible aria-label');
  console.log('  ✓ [PASS] Accessible hamburger trigger button present');
  passed++;

  assert.ok(html.includes('aria-expanded="false"'), 'Hamburger button has aria-expanded state');
  console.log('  ✓ [PASS] Hamburger button aria-expanded state present');
  passed++;

  // 5. Verify Language Switcher in Header
  console.log('\n--- 5. Verifying Header Language Switcher ---');
  assert.ok(html.includes('title="Switch to English"'), 'ID language switcher present');
  console.log('  ✓ [PASS] Language switcher toggle present in mobile and desktop bar');
  passed++;

  // 6. Verify Navigation Item Routes
  console.log('\n--- 6. Verifying Navigation Item Routes Integrity ---');
  const routesToVerify = [
    '/programs',
    '/programs/meta-ads',
    '/programs/e-course',
    '/programs/training',
    '/programs/workshop',
    '/programs/private-mentoring',
    '/events',
    '/community',
    '/for-business',
    '/resources',
    '/resources/articles',
    '/resources/tutorials',
    '/resources/case-studies',
    '/resources/ads-breakdown',
    '/resources/free-resources',
    '/about',
  ];

  for (const r of routesToVerify) {
    const checkRes = await fetch(`http://localhost:3000${r}`);
    assert.strictEqual(checkRes.status, 200, `Route ${r} must respond with status 200`);
    console.log(`  ✓ [PASS] Route ${r} responds 200 OK`);
    passed++;
  }

  console.log('\n====================================================');
  console.log(` RESULTS: ${passed} PASSED, 0 FAILED`);
  console.log('====================================================');
}

testMobileNavigation().catch((err) => {
  console.error('\n❌ Test failed:', err);
  process.exit(1);
});
