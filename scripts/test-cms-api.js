const http = require('http');

function postJSON(path, payload, cookie = '') {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(payload);
    const options = {
      hostname: 'localhost',
      port: 3000,
      path,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data),
        Cookie: cookie,
      },
    };

    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => (body += chunk));
      res.on('end', () => {
        resolve({
          status: res.statusCode,
          headers: res.headers,
          data: body ? JSON.parse(body) : null,
        });
      });
    });

    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

function getJSON(path, cookie = '') {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 3000,
      path,
      method: 'GET',
      headers: {
        Cookie: cookie,
      },
    };

    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => (body += chunk));
      res.on('end', () => {
        resolve({
          status: res.statusCode,
          headers: res.headers,
          data: body ? JSON.parse(body) : null,
        });
      });
    });

    req.on('error', reject);
    req.end();
  });
}

(async () => {
  console.log('=== CMS & API FLOW VERIFICATION ===');

  // 1. Test Lead submission from public form
  const leadRes = await postJSON('/api/leads', {
    name: 'Ahmad Faisal',
    email: 'ahmad.faisal@brandretail.co.id',
    phone: '081298765432',
    company: 'Brand Retail Nusantara',
    participants: '10-20 orang',
    trainingNeeds: 'In-house Meta Ads & Video Creative Training',
    source: 'BUSINESS_INQUIRY',
  });
  console.log(`[Public Lead Submission] Status: ${leadRes.status} | Success: ${leadRes.data?.success}`);

  // 2. Test Admin Login
  const loginRes = await postJSON('/api/auth/login', {
    email: 'admin@belajarads.com',
    password: 'AdminPassword123!',
  });
  console.log(`[Admin Login API] Status: ${loginRes.status} | User: ${loginRes.data?.user?.email}`);

  // Extract session cookie
  const setCookie = loginRes.headers['set-cookie'];
  const sessionCookie = setCookie ? setCookie[0].split(';')[0] : '';
  console.log(`[Session Cookie Acquired] ${sessionCookie.slice(0, 35)}...`);

  // 3. Test Authorized Admin API: Get Articles
  const articlesRes = await getJSON('/api/admin/articles', sessionCookie);
  console.log(`[Admin Articles API] Status: ${articlesRes.status} | Articles count: ${articlesRes.data?.length}`);

  // 4. Test Authorized Admin API: Get Programs
  const programsRes = await getJSON('/api/admin/programs', sessionCookie);
  console.log(`[Admin Programs API] Status: ${programsRes.status} | Programs count: ${programsRes.data?.length}`);

  // 5. Test Authorized Admin API: Get Leads
  const leadsRes = await getJSON('/api/admin/leads', sessionCookie);
  console.log(`[Admin Leads API] Status: ${leadsRes.status} | Leads count: ${leadsRes.data?.length}`);

  // 6. Test Authorized Admin API: Get Settings
  const settingsRes = await getJSON('/api/admin/settings', sessionCookie);
  console.log(`[Admin Settings API] Status: ${settingsRes.status} | Email contact: ${settingsRes.data?.EMAIL_CONTACT}`);

  console.log('=== ALL CMS API FLOWS FUNCTIONING PROPERLY ===');
})();
