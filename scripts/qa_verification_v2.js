const BASE_URL = 'http://localhost:3000';

async function runQA() {
  console.log('====================================================');
  console.log('      BELAJAR ADS — V2 MASTER REFACTOR QA SUITE     ');
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

  // 1. CANONICAL ROUTES TEST
  console.log('--- 1. Testing Canonical Public Routes (Expected: 200 OK) ---');
  const canonicalRoutes = [
    '/',
    '/programs',
    '/programs/meta-ads',
    '/programs/e-course',
    '/programs/training',
    '/programs/workshop',
    '/programs/private-mentoring',
    '/events',
    '/events/meta-ads-scaling-intensive',
    '/community',
    '/for-business',
    '/resources',
    '/resources/articles',
    '/resources/articles/panduan-lengkap-meta-ads-untuk-pemula',
    '/resources/tutorials',
    '/resources/case-studies',
    '/resources/ads-breakdown',
    '/resources/free-resources',
    '/about',
    '/contact',
    '/sitemap.xml',
    '/robots.txt',
  ];

  for (const route of canonicalRoutes) {
    try {
      const res = await fetch(`${BASE_URL}${route}`, { redirect: 'manual' });
      assert(res.status === 200, `GET ${route} status 200`, `got ${res.status}`);
    } catch (e) {
      assert(false, `GET ${route}`, e.message);
    }
  }

  // 2. LEGACY ROUTE REDIRECTS (301)
  console.log('\n--- 2. Testing Legacy /id and /en Redirects (Expected: 301 Redirect) ---');
  const legacyRoutes = [
    { from: '/id', expectedTo: '/' },
    { from: '/en', expectedTo: '/' },
    { from: '/id/programs', expectedTo: '/programs' },
    { from: '/en/programs', expectedTo: '/programs' },
    { from: '/id/about', expectedTo: '/about' },
  ];

  for (const item of legacyRoutes) {
    try {
      const res = await fetch(`${BASE_URL}${item.from}`, { redirect: 'manual' });
      const isRedirect = res.status === 301 || res.status === 307 || res.status === 308;
      assert(isRedirect, `Legacy ${item.from} redirects with ${res.status}`);
    } catch (e) {
      assert(false, `Legacy ${item.from}`, e.message);
    }
  }

  // 3. ADMIN PROTECTION
  console.log('\n--- 3. Testing Admin Security & Authorization ---');
  try {
    const unauthAdmin = await fetch(`${BASE_URL}/admin`, { redirect: 'manual' });
    const isRedirectedToLogin = unauthAdmin.status === 307 || unauthAdmin.status === 302;
    assert(isRedirectedToLogin, `Unauthenticated /admin redirects to login (${unauthAdmin.status})`);

    const unauthApi = await fetch(`${BASE_URL}/api/admin/pages`, { redirect: 'manual' });
    assert(unauthApi.status === 401, `Unauthenticated /api/admin/pages returns 401 (${unauthApi.status})`);
  } catch (e) {
    assert(false, 'Admin protection check', e.message);
  }

  // 4. ADMIN LOGIN & SESSION
  console.log('\n--- 4. Testing Admin Authentication & Cookies ---');
  let authCookie = '';
  try {
    const loginRes = await fetch(`${BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'admin@belajarads.com',
        password: 'AdminPassword123!',
      }),
    });

    assert(loginRes.status === 200, `Admin login returns 200 OK (${loginRes.status})`);
    
    // In node fetch, use getSetCookie or parse headers
    const rawCookies = typeof loginRes.headers.getSetCookie === 'function'
      ? loginRes.headers.getSetCookie()
      : [loginRes.headers.get('set-cookie')];

    authCookie = rawCookies.map(c => c ? c.split(';')[0] : '').filter(Boolean).join('; ');
    assert(authCookie.includes('belajarads_admin_session'), `Admin session cookie received (${authCookie})`);
  } catch (e) {
    assert(false, 'Admin login test', e.message);
  }

  // 5. CMS PAGES & VISIBILITY API
  console.log('\n--- 5. Testing CMS Pages & Visibility Management ---');
  try {
    const pagesRes = await fetch(`${BASE_URL}/api/admin/pages`, {
      headers: { Cookie: authCookie },
    });
    assert(pagesRes.status === 200, `GET /api/admin/pages returns 200 (${pagesRes.status})`);
    const pagesData = await pagesRes.json();
    assert(Array.isArray(pagesData.pages) && pagesData.pages.length >= 8, `Pages list count: ${pagesData.pages?.length}`);
    assert(Array.isArray(pagesData.resourceCategories) && pagesData.resourceCategories.length === 5, `Resource categories count: ${pagesData.resourceCategories?.length}`);

    // Test visibility toggle
    console.log('  -> Setting "ads-breakdown" to Hidden...');
    const hideRes = await fetch(`${BASE_URL}/api/admin/pages/visibility`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Cookie: authCookie },
      body: JSON.stringify({ pageKey: 'ads-breakdown', isVisible: false }),
    });
    assert(hideRes.status === 200, 'POST /api/admin/pages/visibility (Hide) returns 200');

    // Verify direct URL now returns 404
    const directHiddenRes = await fetch(`${BASE_URL}/resources/ads-breakdown`);
    assert(directHiddenRes.status === 404, `Direct access to hidden page returns 404 Not Found (${directHiddenRes.status})`);

    // Restore visibility to true
    console.log('  -> Restoring "ads-breakdown" to Visible...');
    const showRes = await fetch(`${BASE_URL}/api/admin/pages/visibility`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Cookie: authCookie },
      body: JSON.stringify({ pageKey: 'ads-breakdown', isVisible: true }),
    });
    assert(showRes.status === 200, 'POST /api/admin/pages/visibility (Show) returns 200');

    // Verify direct URL now returns 200
    const directVisibleRes = await fetch(`${BASE_URL}/resources/ads-breakdown`);
    assert(directVisibleRes.status === 200, `Direct access to restored page returns 200 OK (${directVisibleRes.status})`);
  } catch (e) {
    assert(false, 'Visibility test', e.message);
  }

  // 6. CMS SECTION CONTENT EDITING
  console.log('\n--- 6. Testing CMS Section Content Editing ---');
  try {
    const getHomepageRes = await fetch(`${BASE_URL}/api/admin/pages/homepage`, {
      headers: { Cookie: authCookie },
    });
    assert(getHomepageRes.status === 200, 'GET /api/admin/pages/homepage returns 200');
    const hpData = await getHomepageRes.json();
    assert(hpData.sections && hpData.sections.hero, 'Homepage hero section exists in CMS');

    // Update hero section
    const currentHero = hpData.sections.hero;
    const testUpdatedHero = {
      ...currentHero,
      id: {
        ...currentHero.id,
        heading: 'Pusat Edukasi Advertising Terdepan di Indonesia',
      },
      en: {
        ...currentHero.en,
        heading: 'Indonesia’s Leading Advertising Education Platform',
      },
    };

    const updateRes = await fetch(`${BASE_URL}/api/admin/pages/homepage`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Cookie: authCookie },
      body: JSON.stringify({
        sections: {
          ...hpData.sections,
          hero: testUpdatedHero,
        },
      }),
    });
    assert(updateRes.status === 200, 'PUT /api/admin/pages/homepage returns 200');

    // Verify persistence
    const verifyHpRes = await fetch(`${BASE_URL}/api/admin/pages/homepage`, {
      headers: { Cookie: authCookie },
    });
    const verifyData = await verifyHpRes.json();
    assert(
      verifyData.sections.hero.id.heading === 'Pusat Edukasi Advertising Terdepan di Indonesia',
      'Hero Indonesian heading persisted in database'
    );
    assert(
      verifyData.sections.hero.en.heading === 'Indonesia’s Leading Advertising Education Platform',
      'Hero English heading persisted in database'
    );
  } catch (e) {
    assert(false, 'CMS Section test', e.message);
  }

  // 7. CHANGE PASSWORD FLOW
  console.log('\n--- 7. Testing Admin Change Password Feature ---');
  try {
    // A. Invalid case: wrong current password
    const wrongPassRes = await fetch(`${BASE_URL}/api/admin/auth/change-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Cookie: authCookie },
      body: JSON.stringify({
        currentPassword: 'WrongPassword999!',
        newPassword: 'BrandNewPass2026!',
        confirmNewPassword: 'BrandNewPass2026!',
      }),
    });
    assert(wrongPassRes.status === 400, `Wrong current password rejected with 400 (${wrongPassRes.status})`);

    // B. Invalid case: mismatched confirm
    const mismatchRes = await fetch(`${BASE_URL}/api/admin/auth/change-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Cookie: authCookie },
      body: JSON.stringify({
        currentPassword: 'AdminPassword123!',
        newPassword: 'BrandNewPass2026!',
        confirmNewPassword: 'DifferentPass2026!',
      }),
    });
    assert(mismatchRes.status === 400, `Mismatched confirmation rejected with 400 (${mismatchRes.status})`);

    // C. Invalid case: too short (<8 chars)
    const shortRes = await fetch(`${BASE_URL}/api/admin/auth/change-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Cookie: authCookie },
      body: JSON.stringify({
        currentPassword: 'AdminPassword123!',
        newPassword: 'short',
        confirmNewPassword: 'short',
      }),
    });
    assert(shortRes.status === 400, `Too short password rejected with 400 (${shortRes.status})`);

    // D. Valid case: change password to NewPassword2026!
    const changeSuccessRes = await fetch(`${BASE_URL}/api/admin/auth/change-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Cookie: authCookie },
      body: JSON.stringify({
        currentPassword: 'AdminPassword123!',
        newPassword: 'NewPassword2026!',
        confirmNewPassword: 'NewPassword2026!',
      }),
    });
    assert(changeSuccessRes.status === 200, `Valid password change returns 200 OK (${changeSuccessRes.status})`);

    // E. Verify old password no longer works
    const oldLoginRes = await fetch(`${BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'admin@belajarads.com',
        password: 'AdminPassword123!',
      }),
    });
    assert(oldLoginRes.status === 401, `Old password fails to login with 401 (${oldLoginRes.status})`);

    // F. Verify new password succeeds
    const newLoginRes = await fetch(`${BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'admin@belajarads.com',
        password: 'NewPassword2026!',
      }),
    });
    assert(newLoginRes.status === 200, `New password succeeds login with 200 (${newLoginRes.status})`);
    const newRawCookies = typeof newLoginRes.headers.getSetCookie === 'function'
      ? newLoginRes.headers.getSetCookie()
      : [newLoginRes.headers.get('set-cookie')];
    const newCookie = newRawCookies.map(c => c ? c.split(';')[0] : '').filter(Boolean).join('; ');

    // G. Restore back to original AdminPassword123!
    const restorePassRes = await fetch(`${BASE_URL}/api/admin/auth/change-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Cookie: newCookie },
      body: JSON.stringify({
        currentPassword: 'NewPassword2026!',
        newPassword: 'AdminPassword123!',
        confirmNewPassword: 'AdminPassword123!',
      }),
    });
    assert(restorePassRes.status === 200, `Password restored back to AdminPassword123! (${restorePassRes.status})`);
  } catch (e) {
    assert(false, 'Change password test suite', e.message);
  }

  console.log('\n====================================================');
  console.log(`TOTAL TESTS: ${passed + failed} | PASSED: ${passed} | FAILED: ${failed}`);
  console.log('====================================================');

  if (failed > 0) {
    process.exit(1);
  } else {
    process.exit(0);
  }
}

runQA();
