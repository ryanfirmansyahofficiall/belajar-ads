const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const BASE_URL = 'http://localhost:3001';

async function testSettingsMutation() {
  console.log('=== CMS SETTINGS REAL-TIME MUTATION & REVALIDATION TEST ===');

  // 1. Read existing settings
  const originalSettings = await prisma.siteSetting.findMany();
  const originalMap = {};
  originalSettings.forEach(s => originalMap[s.key] = s.value);
  console.log('Original Settings Backed Up:', originalMap);

  // 2. Perform test update on Community URL
  const testCommunityUrl = 'https://t.me/belajarads_live_test_channel';
  await prisma.siteSetting.upsert({
    where: { key: 'COMMUNITY_URL' },
    update: { value: testCommunityUrl },
    create: { key: 'COMMUNITY_URL', value: testCommunityUrl },
  });

  // Query /api/settings
  const resUpdated = await fetch(`${BASE_URL}/api/settings`);
  const dataUpdated = await resUpdated.json();
  console.log('API returned updated communityUrl:', dataUpdated.communityUrl);

  if (dataUpdated.communityUrl === testCommunityUrl) {
    console.log('✓ [PASS] Frontend settings layer immediately returns updated Community URL!');
  } else {
    console.error('✗ [FAIL] Updated setting did not propagate to API');
    process.exit(1);
  }

  // 3. Restore original Community URL
  await prisma.siteSetting.upsert({
    where: { key: 'COMMUNITY_URL' },
    update: { value: originalMap['COMMUNITY_URL'] || 'https://t.me/belajaradsofficial' },
    create: { key: 'COMMUNITY_URL', value: originalMap['COMMUNITY_URL'] || 'https://t.me/belajaradsofficial' },
  });

  const resRestored = await fetch(`${BASE_URL}/api/settings`);
  const dataRestored = await resRestored.json();
  console.log('API returned restored communityUrl:', dataRestored.communityUrl);

  if (dataRestored.communityUrl === (originalMap['COMMUNITY_URL'] || 'https://t.me/belajaradsofficial')) {
    console.log('✓ [PASS] Settings cleanly restored to genuine initial value.');
  } else {
    console.error('✗ [FAIL] Setting restore failed');
    process.exit(1);
  }

  console.log('=== SETTINGS MUTATION TEST PASSED 100% ===');
}

testSettingsMutation()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
