const http = require('http');

const routes = [
  '/',
  '/id',
  '/en',
  '/id/programs',
  '/id/programs/meta-ads',
  '/id/programs/e-course',
  '/id/programs/training',
  '/id/programs/workshop',
  '/id/programs/private-mentoring',
  '/id/events',
  '/id/events/meta-ads-scaling-intensive',
  '/id/community',
  '/id/for-business',
  '/id/resources',
  '/id/resources/articles',
  '/id/resources/articles/panduan-lengkap-meta-ads-untuk-pemula',
  '/id/resources/tutorials',
  '/id/resources/case-studies',
  '/id/resources/ads-breakdown',
  '/id/resources/free-resources',
  '/id/about',
  '/id/contact',
  '/admin/login',
  '/admin',
  '/sitemap.xml',
  '/robots.txt'
];

async function checkRoute(path) {
  return new Promise((resolve) => {
    http.get('http://localhost:3000' + path, (res) => {
      resolve({ path, status: res.statusCode, location: res.headers.location || null });
    }).on('error', (err) => resolve({ path, error: err.message }));
  });
}

(async () => {
  console.log('=== ROUTE VERIFICATION QA REPORT ===');
  let passCount = 0;
  for (const r of routes) {
    const res = await checkRoute(r);
    const isExpected = 
      (r === '/' && (res.status === 307 || res.status === 308)) ||
      (r === '/admin' && (res.status === 307 || res.status === 308)) ||
      res.status === 200;
    
    if (isExpected) passCount++;
    console.log(`${isExpected ? '✔ PASS' : '❌ FAIL'} [${res.status}] ${res.path} ${res.location ? '-> ' + res.location : ''}`);
  }
  console.log(`\nResult: ${passCount}/${routes.length} routes passed QA.`);
})();
