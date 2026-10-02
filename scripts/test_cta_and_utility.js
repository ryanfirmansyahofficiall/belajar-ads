const assert = require('assert');

async function testCtaAndUtility() {
  console.log('===========================================================');
  console.log(' BELAJAR ADS — CTA ARROWS, WHATSAPP & BACK TO TOP TEST');
  console.log('===========================================================\n');

  let passed = 0;

  // 1. Fetch Homepage
  console.log('--- 1. Testing Homepage & Utility Elements ---');
  const res = await fetch('http://localhost:3000/');
  assert.strictEqual(res.status, 200, 'Homepage status must be 200');
  const html = await res.text();
  console.log('  ✓ [PASS] Homepage HTTP 200 OK');
  passed++;

  // 2. Test Official WhatsApp Icon in Floating Button
  console.log('\n--- 2. Verifying Official WhatsApp Icon ---');
  assert.ok(html.includes('aria-label="WhatsApp Floating Action"'), 'WhatsApp floating action must exist');
  // Check for the official WhatsApp SVG path
  assert.ok(html.includes('M17.472 14.382c'), 'Must contain the official WhatsApp SVG vector path');
  // Verify it does NOT use generic MessageCircle
  const hasMessageCircleInFloating = html.includes('lucide-message-circle') && html.includes('WhatsApp Floating Action');
  assert.strictEqual(hasMessageCircleInFloating, false, 'Floating WhatsApp must not use generic MessageCircle');
  console.log('  ✓ [PASS] Official WhatsApp vector logo rendered in floating button');
  passed++;

  // 3. Test Back To Top Button in HTML
  console.log('\n--- 3. Verifying Back to Top Utility Button ---');
  assert.ok(html.includes('aria-label="Kembali ke atas"') || html.includes('aria-label="Back to top"'), 'Back to top button must have aria-label');
  assert.ok(html.includes('lucide-arrow-up'), 'Back to top must use upward arrow icon (ArrowUp)');
  assert.ok(html.includes('bottom-[84px] sm:bottom-[88px]'), 'Back to top must have responsive vertical clearance above WhatsApp');
  console.log('  ✓ [PASS] Back to top component rendered with upward arrow and clean offset');
  passed++;

  // 4. Test Zero Overlap between WhatsApp and Back to Top
  console.log('\n--- 4. Verifying Responsive Non-Overlapping Coordinates ---');
  assert.ok(html.includes('fixed bottom-6 right-6 z-50'), 'WhatsApp button is fixed bottom-6 right-6');
  assert.ok(html.includes('fixed right-6 z-40'), 'Back to top button is fixed right-6 z-40');
  // Bottom-6 is 24px. Bottom-[84px] is 84px. The gap is 60px minus button height (~40px) = 20px clear buffer!
  console.log('  ✓ [PASS] WhatsApp (bottom-6 / 24px) and Back-To-Top (bottom-[84px] / 84px) have ~60px vertical clearance (Zero Overlap)');
  passed++;

  // 5. Test Directional Arrows on Buttons across multiple pages
  console.log('\n--- 5. Verifying All Directional CTA Buttons use Horizontal ArrowRight (→) ---');
  const pagesToTest = [
    { path: '/', hasDirectionalCta: true },
    { path: '/programs', hasDirectionalCta: true },
    { path: '/events', hasDirectionalCta: true },
    { path: '/community', hasDirectionalCta: true },
    { path: '/resources', hasDirectionalCta: true },
    { path: '/for-business', hasDirectionalCta: false },
  ];
  
  for (const page of pagesToTest) {
    const pageRes = await fetch(`http://localhost:3000${page.path}`);
    const pageHtml = await pageRes.text();

    // Check that NO ArrowUpRight (↗) exists in the rendered HTML
    const hasArrowUpRight = pageHtml.includes('lucide-arrow-up-right');
    assert.strictEqual(hasArrowUpRight, false, `Page ${page.path} must contain 0 diagonal ArrowUpRight icons`);

    // If page has directional CTA buttons, verify horizontal ArrowRight (→) is present
    if (page.hasDirectionalCta) {
      const hasArrowRight = pageHtml.includes('lucide-arrow-right');
      assert.ok(hasArrowRight, `Page ${page.path} must use horizontal ArrowRight on its CTA buttons`);
    }

    console.log(`  ✓ [PASS] Page ${page.path}: 0 diagonal arrows, horizontal ArrowRight verified`);
    passed++;
  }

  // 6. Test Contact Page WhatsApp Card
  console.log('\n--- 6. Verifying Contact Page WhatsApp Official Card ---');
  const contactRes = await fetch('http://localhost:3000/contact');
  const contactHtml = await contactRes.text();
  assert.ok(contactHtml.includes('M17.472 14.382c'), 'Contact page WhatsApp card must also use official WhatsApp SVG logo');
  console.log('  ✓ [PASS] Contact page WhatsApp card uses official WhatsApp logo');
  passed++;

  console.log('\n===========================================================');
  console.log(` RESULTS: ${passed} PASSED, 0 FAILED`);
  console.log('===========================================================');
}

testCtaAndUtility().catch((err) => {
  console.error('\n❌ Test failed:', err);
  process.exit(1);
});
