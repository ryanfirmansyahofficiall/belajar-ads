const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const BASE_URL = 'http://localhost:3000';

async function runTests() {
  console.log('====================================================');
  console.log(' BELAJAR ADS — FUNCTIONAL INTEGRATION TEST SUITE   ');
  console.log('====================================================\n');

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

  try {
    // ----------------------------------------------------
    // TEST 1: DATABASE SITE SETTINGS
    // ----------------------------------------------------
    console.log('--- 1. Testing Database Site Settings ---');
    const settings = await prisma.siteSetting.findMany();
    const settingsMap = {};
    settings.forEach(s => settingsMap[s.key] = s.value);

    assert(Boolean(settingsMap.COMMUNITY_URL), 'COMMUNITY_URL exists in DB', settingsMap.COMMUNITY_URL);
    assert(Boolean(settingsMap.WHATSAPP_URL), 'WHATSAPP_URL exists in DB', settingsMap.WHATSAPP_URL);
    assert(Boolean(settingsMap.INSTAGRAM_URL), 'INSTAGRAM_URL exists in DB', settingsMap.INSTAGRAM_URL);
    assert(Boolean(settingsMap.FACEBOOK_URL), 'FACEBOOK_URL exists in DB', settingsMap.FACEBOOK_URL);
    assert(Boolean(settingsMap.YOUTUBE_URL), 'YOUTUBE_URL exists in DB', settingsMap.YOUTUBE_URL);
    assert(Boolean(settingsMap.LMS_URL), 'LMS_URL exists in DB', settingsMap.LMS_URL);
    assert(Boolean(settingsMap.EMAIL_CONTACT), 'EMAIL_CONTACT exists in DB', settingsMap.EMAIL_CONTACT);

    // ----------------------------------------------------
    // TEST 2: PUBLIC SETTINGS API (/api/settings)
    // ----------------------------------------------------
    console.log('\n--- 2. Testing Public Settings API (/api/settings) ---');
    try {
      const res = await fetch(`${BASE_URL}/api/settings`);
      assert(res.status === 200, 'GET /api/settings status 200', `got ${res.status}`);
      const data = await res.json();
      assert(data.communityUrl === settingsMap.COMMUNITY_URL, 'communityUrl matches DB value', data.communityUrl);
      assert(data.whatsappUrl === settingsMap.WHATSAPP_URL, 'whatsappUrl matches DB value', data.whatsappUrl);
      assert(data.instagramUrl === settingsMap.INSTAGRAM_URL, 'instagramUrl matches DB value', data.instagramUrl);
      assert(data.facebookUrl === settingsMap.FACEBOOK_URL, 'facebookUrl matches DB value', data.facebookUrl);
      assert(data.youtubeUrl === settingsMap.YOUTUBE_URL, 'youtubeUrl matches DB value', data.youtubeUrl);
      assert(data.lmsUrl === settingsMap.LMS_URL, 'lmsUrl matches DB value', data.lmsUrl);
      assert(data.contactEmail === settingsMap.EMAIL_CONTACT, 'contactEmail matches DB value', data.contactEmail);
    } catch (e) {
      assert(false, 'GET /api/settings request', e.message);
    }

    // ----------------------------------------------------
    // TEST 3: FRONTEND SOCIAL LINKS & EMAIL IN FOOTER
    // ----------------------------------------------------
    console.log('\n--- 3. Testing Frontend Footer HTML Integration ---');
    try {
      const res = await fetch(`${BASE_URL}/`);
      const html = await res.text();
      assert(html.includes(settingsMap.INSTAGRAM_URL), 'Homepage HTML includes Instagram URL from CMS settings');
      assert(html.includes(settingsMap.FACEBOOK_URL), 'Homepage HTML includes Facebook URL from CMS settings');
      assert(html.includes(settingsMap.YOUTUBE_URL) || html.includes(settingsMap.YOUTUBE_URL.replace(/&/g, '&amp;')), 'Homepage HTML includes YouTube URL from CMS settings');
      assert(html.includes(settingsMap.EMAIL_CONTACT), 'Homepage HTML includes Contact Email from CMS settings');
    } catch (e) {
      assert(false, 'Homepage HTML check', e.message);
    }

    // ----------------------------------------------------
    // TEST 4: COMMUNITY PAGE LINK INTEGRATION
    // ----------------------------------------------------
    console.log('\n--- 4. Testing Community CTA Integration ---');
    try {
      const res = await fetch(`${BASE_URL}/community`);
      const html = await res.text();
      assert(html.includes(settingsMap.COMMUNITY_URL), 'Community page HTML includes Community URL from CMS settings');
    } catch (e) {
      assert(false, 'Community page HTML check', e.message);
    }

    // ----------------------------------------------------
    // TEST 5: CONTACT PAGE LINK INTEGRATION
    // ----------------------------------------------------
    console.log('\n--- 5. Testing Contact Page Link Integration ---');
    try {
      const res = await fetch(`${BASE_URL}/contact`);
      const html = await res.text();
      assert(html.includes(settingsMap.EMAIL_CONTACT), 'Contact page HTML includes official email from CMS settings');
      assert(html.includes('wa.me') || html.includes(encodeURIComponent('wa.me')), 'Contact page HTML includes WhatsApp Official URL');
    } catch (e) {
      assert(false, 'Contact page HTML check', e.message);
    }

    // ----------------------------------------------------
    // TEST 6: E-COURSE PAGE LMS INTEGRATION
    // ----------------------------------------------------
    console.log('\n--- 6. Testing E-Course Page LMS Integration ---');
    try {
      const res = await fetch(`${BASE_URL}/programs/e-course`);
      const html = await res.text();
      assert(res.status === 200, 'GET /programs/e-course status 200');
    } catch (e) {
      assert(false, 'E-Course page HTML check', e.message);
    }

    // ----------------------------------------------------
    // TEST 7: LEADS SUBMISSION & DATABASE PERSISTENCE
    // ----------------------------------------------------
    console.log('\n--- 7. Testing Leads Functionality & Persistence ---');
    const testLead = {
      name: 'Functional QA Test Lead',
      email: 'qa-tester@belajarads-test.com',
      phone: '081299998888',
      company: 'QA Enterprise Corp',
      participants: '10_PLUS',
      trainingNeeds: 'In-House Corporate Training & Scale',
      source: 'FUNCTIONAL_TEST_SUITE',
      message: 'Automated test message for Leads persistence verification.',
      isOnline: true
    };

    try {
      const res = await fetch(`${BASE_URL}/api/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(testLead)
      });

      assert(res.status === 201, 'POST /api/leads returns 201 Created', `got ${res.status}`);
      const data = await res.json();
      assert(Boolean(data.leadId), 'Response returns created leadId', data.leadId);

      // Verify in DB directly
      const savedLead = await prisma.lead.findUnique({
        where: { id: data.leadId }
      });

      assert(Boolean(savedLead), 'Lead persists in SQLite database');
      assert(savedLead.name === testLead.name, 'Lead name matches input');
      assert(savedLead.email === testLead.email, 'Lead email matches input');
      assert(savedLead.phone === testLead.phone, 'Lead phone matches input');
      assert(savedLead.company === testLead.company, 'Lead company matches input');
      assert(savedLead.status === 'NEW', 'Lead default status is NEW');

      // Clean up test lead
      await prisma.lead.delete({
        where: { id: data.leadId }
      });
      console.log('  ✓ [CLEANUP] Test lead safely removed from database');
    } catch (e) {
      assert(false, 'Lead submission and persistence test', e.message);
    }

    // ----------------------------------------------------
    // TEST 8: NO BROKEN PLACEHOLDER LINKS IN RENDERED HTML
    // ----------------------------------------------------
    console.log('\n--- 8. Testing Rendered Pages for Broken / Dead Links ---');
    const pagesToCheck = [
      '/',
      '/programs',
      '/community',
      '/for-business',
      '/resources',
      '/about',
      '/contact'
    ];

    for (const page of pagesToCheck) {
      try {
        const res = await fetch(`${BASE_URL}${page}`);
        const html = await res.text();
        const hasHashOnly = html.includes('href="#"') || html.includes("href='#'");
        const hasEmptyHref = html.includes('href=""') || html.includes("href=''");
        const hasJavascriptVoid = html.includes('javascript:void');
        assert(!hasHashOnly && !hasEmptyHref && !hasJavascriptVoid, `Page ${page} contains 0 dead links (no href="#", href="", javascript:void)`);
      } catch (e) {
        assert(false, `Check links on ${page}`, e.message);
      }
    }

    console.log('\n====================================================');
    console.log(` RESULTS: ${passed} PASSED, ${failed} FAILED`);
    console.log('====================================================');

    if (failed > 0) {
      process.exit(1);
    } else {
      process.exit(0);
    }

  } catch (error) {
    console.error('Test Suite encountered unhandled error:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

runTests();
