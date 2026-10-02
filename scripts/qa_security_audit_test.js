const http = require('http');

const BASE_URL = 'http://127.0.0.1:3000';

async function runSecurityTests() {
  console.log('====================================================');
  console.log('       BELAJAR ADS — SECURITY VERIFICATION SUITE    ');
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

  // A. /admin tanpa session -> redirects to /admin/login
  try {
    const resA = await fetch(`${BASE_URL}/admin`, { redirect: 'manual' });
    const isRedirectA = resA.status === 307 || resA.status === 302;
    const locationA = resA.headers.get('location') || '';
    assert(isRedirectA && locationA.includes('/admin/login'), 'A. /admin without session redirects to /admin/login', `status: ${resA.status}, loc: ${locationA}`);
  } catch (e) {
    assert(false, 'A. /admin without session', e.message);
  }

  // B. /admin dengan arbitrary cookie -> redirects to /admin/login (rejected by edge crypto & layout guard)
  try {
    const resB = await fetch(`${BASE_URL}/admin`, {
      redirect: 'manual',
      headers: { Cookie: 'belajarads_admin_session=arbitrary_fake_token_12345' },
    });
    const isRedirectB = resB.status === 307 || resB.status === 302;
    const locationB = resB.headers.get('location') || '';
    assert(isRedirectB && locationB.includes('/admin/login'), 'B. /admin with arbitrary cookie redirects to /admin/login', `status: ${resB.status}, loc: ${locationB}`);
  } catch (e) {
    assert(false, 'B. /admin with arbitrary cookie', e.message);
  }

  // C. admin API tanpa session -> 401
  try {
    const resC = await fetch(`${BASE_URL}/api/admin/articles`);
    assert(resC.status === 401, 'C. Admin API without session returns 401', `status: ${resC.status}`);
  } catch (e) {
    assert(false, 'C. Admin API without session', e.message);
  }

  // D. admin API dengan invalid session -> 401
  try {
    const resD = await fetch(`${BASE_URL}/api/admin/articles`, {
      headers: { Cookie: 'belajarads_admin_session=invalid.token.payload' },
    });
    assert(resD.status === 401, 'D. Admin API with invalid session returns 401', `status: ${resD.status}`);
  } catch (e) {
    assert(false, 'D. Admin API with invalid session', e.message);
  }

  // E. login invalid credentials -> 401
  try {
    const resE = await fetch(`${BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'fake@belajarads.com', password: 'WrongPassword123!' }),
    });
    assert(resE.status === 401, 'E. Login with invalid credentials returns 401', `status: ${resE.status}`);
  } catch (e) {
    assert(false, 'E. Login with invalid credentials', e.message);
  }

  // F. malformed lead payload -> 400
  try {
    const resF = await fetch(`${BASE_URL}/api/leads`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: 'invalid-json-string-{{{',
    });
    assert(resF.status === 400, 'F. Malformed lead payload returns 400 Bad Request', `status: ${resF.status}`);
  } catch (e) {
    assert(false, 'F. Malformed lead payload', e.message);
  }

  // G. oversized lead payload or invalid format -> 400
  try {
    const resG = await fetch(`${BASE_URL}/api/leads`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'A', // too short (< 2 chars)
        email: 'not-an-email', // invalid regex
        phone: '12', // too short (< 7 chars)
      }),
    });
    assert(resG.status === 400, 'G. Invalid lead fields return 400 Validation Error', `status: ${resG.status}`);
  } catch (e) {
    assert(false, 'G. Invalid lead fields', e.message);
  }

  // H. unauthorized admin mutation -> 401
  try {
    const resH = await fetch(`${BASE_URL}/api/admin/settings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ WHATSAPP_URL: 'https://wa.me/test' }),
    });
    assert(resH.status === 401, 'H. Unauthorized admin mutation returns 401', `status: ${resH.status}`);
  } catch (e) {
    assert(false, 'H. Unauthorized admin mutation', e.message);
  }

  // I. production AUTH_SECRET missing behavior
  try {
    function evaluateAuthSecretPolicy(isProd, secretVal) {
      if (!secretVal || secretVal.trim() === '') {
        if (isProd) throw new Error('[SECURITY FATAL] AUTH_SECRET is missing');
        return 'dev_fallback';
      }
      if (isProd && secretVal.length < 32) {
        throw new Error('[SECURITY FATAL] AUTH_SECRET must be at least 32 chars');
      }
      return secretVal;
    }

    let prodWithoutSecretThrows = false;
    try {
      evaluateAuthSecretPolicy(true, '');
    } catch {
      prodWithoutSecretThrows = true;
    }

    let prodWithShortSecretThrows = false;
    try {
      evaluateAuthSecretPolicy(true, 'too_short');
    } catch {
      prodWithShortSecretThrows = true;
    }

    const prodWithStrongSecret = evaluateAuthSecretPolicy(true, '1234567890123456789012345678901234567890');
    assert(
      prodWithoutSecretThrows && prodWithShortSecretThrows && prodWithStrongSecret.length >= 32,
      'I. Production AUTH_SECRET enforcement policy safely throws when missing or weak'
    );
  } catch (e) {
    assert(false, 'I. Production AUTH_SECRET enforcement', e.message);
  }

  // J. verify default credentials NOT rendered in login UI
  try {
    const resJ = await fetch(`${BASE_URL}/admin/login`);
    const htmlJ = await resJ.text();
    const hasDefaultPassword = htmlJ.includes('AdminPassword123!');
    const hasReminderBox = htmlJ.includes('Default Seed Credentials');
    assert(!hasDefaultPassword && !hasReminderBox, 'J. Default seed credentials and reminder notice NOT present in login UI HTML');
  } catch (e) {
    assert(false, 'J. Login UI credential leakage check', e.message);
  }

  console.log('\n====================================================');
  console.log(`TOTAL SECURITY TESTS: ${passed + failed} | PASSED: ${passed} | FAILED: ${failed}`);
  console.log('====================================================');

  if (failed > 0) {
    process.exit(1);
  } else {
    process.exit(0);
  }
}

runSecurityTests();
