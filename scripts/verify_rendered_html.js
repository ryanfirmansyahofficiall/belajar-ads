const BASE_URL = 'http://localhost:3000';

async function verifyHtml() {
  console.log('=== VERIFYING RENDERED HTML ON LIVE SERVER (http://localhost:3000) ===\n');

  let passed = 0;
  let failed = 0;

  function assert(condition, testName, detail = '') {
    if (condition) {
      console.log(`  ✓ [PASS] ${testName}`);
      passed++;
    } else {
      console.error(`  ✗ [FAIL] ${testName} ${detail ? `(${detail})` : ''}`);
      failed++;
    }
  }

  // 1. Check Homepage for Floating WhatsApp button
  const homeRes = await fetch(`${BASE_URL}/`);
  const homeHtml = await homeRes.text();

  assert(homeHtml.includes('WhatsApp Floating Action'), 'Floating WhatsApp button container is rendered');
  assert(homeHtml.includes('https://wa.me/6281573005000'), 'Floating WhatsApp button links to CMS WhatsApp URL');

  // 2. Check Homepage for Ecosystem Manifesto in ID (default SSR)
  assert(homeHtml.includes('MANIFESTO EKOSISTEM'), 'Ecosystem Manifesto heading rendered in Indonesian: MANIFESTO EKOSISTEM');
  assert(homeHtml.includes('01 // JARINGAN SEJAWAT'), 'Ecosystem Manifesto item 01 rendered: 01 // JARINGAN SEJAWAT');
  assert(homeHtml.includes('Komunitas Praktisi Sejawat'), 'Ecosystem Manifesto item 01 title rendered: Komunitas Praktisi Sejawat');
  assert(homeHtml.includes('02 // PEMECAHAN MASALAH'), 'Ecosystem Manifesto item 02 rendered: 02 // PEMECAHAN MASALAH');
  assert(homeHtml.includes('Troubleshooting Kampanye Harian'), 'Ecosystem Manifesto item 02 title rendered: Troubleshooting Kampanye Harian');
  assert(homeHtml.includes('03 // PERTUMBUHAN BERSAMA'), 'Ecosystem Manifesto item 03 rendered: 03 // PERTUMBUHAN BERSAMA');
  assert(homeHtml.includes('Pembelajaran Empiris Nyata'), 'Ecosystem Manifesto item 03 title rendered: Pembelajaran Empiris Nyata');

  // 3. Check Homepage Footer for Social Media Icons
  assert(homeHtml.includes('https://www.instagram.com/belajaradsofficial?stkn=a3g2ZTBxbmNtZWJh'), 'Footer contains CMS Instagram URL');
  assert(homeHtml.includes('youtube.com') && homeHtml.includes('belajaradsofficial'), 'Footer contains CMS YouTube URL');
  assert(homeHtml.includes('mailto:belajaradsofficial@gmail.com'), 'Footer contains CMS official email mailto');

  // 4. Check Community Page
  const commRes = await fetch(`${BASE_URL}/community`);
  const commHtml = await commRes.text();
  assert(commHtml.includes('https://t.me/belajaradsofficial'), 'Community page CTA links to CMS Community URL (https://t.me/belajaradsofficial)');

  // 5. Check Contact Page
  const contactRes = await fetch(`${BASE_URL}/contact`);
  const contactHtml = await contactRes.text();
  assert(contactHtml.includes('https://wa.me/6281573005000'), 'Contact page WhatsApp CTA links to CMS WhatsApp URL');
  assert(contactHtml.includes('mailto:belajaradsofficial@gmail.com'), 'Contact page email card links to mailto:belajaradsofficial@gmail.com');

  // 6. Check E-Course Page
  const ecourseRes = await fetch(`${BASE_URL}/programs/e-course`);
  const ecourseHtml = await ecourseRes.text();
  assert(ecourseHtml.includes('https://ryanfirmansyah.my.id'), 'E-course page CTA links to CMS LMS URL (https://ryanfirmansyah.my.id)');

  console.log(`\nRESULTS: ${passed} PASSED, ${failed} FAILED`);
  if (failed > 0) process.exit(1);
}

verifyHtml().catch(console.error);
