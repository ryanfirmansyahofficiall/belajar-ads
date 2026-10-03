const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

/**
 * Belajar Ads - Prisma Schema Selector
 * Automatically selects the appropriate Prisma schema based on DATABASE_URL:
 * - mysql: or mariadb: -> prisma/schema.mysql.prisma (Production WebNesia)
 * - other / sqlite     -> prisma/schema.prisma       (Local Development)
 *
 * Runs without additional external dotenv dependencies.
 */

let dbUrl = process.env.DATABASE_URL || '';

if (!dbUrl) {
  const envPath = path.resolve(__dirname, '..', '.env');
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8');
    const match = envContent.match(/^DATABASE_URL\s*=\s*["']?([^"'\r\n]+)["']?/m);
    if (match) {
      dbUrl = match[1];
    }
  }
}

const isMySQL = dbUrl.startsWith('mysql:') || dbUrl.startsWith('mariadb:');
const schema = isMySQL ? 'prisma/schema.mysql.prisma' : 'prisma/schema.prisma';

console.log(`[Prisma] DATABASE_URL target: ${dbUrl ? (isMySQL ? 'MariaDB/MySQL (Production)' : 'SQLite (Local Development)') : 'Default (SQLite)'}`);
console.log(`[Prisma] Selected schema: ${schema}`);

try {
  execSync(`npx prisma generate --schema=${schema}`, { stdio: 'inherit' });
} catch (error) {
  console.error('[Prisma] Error executing prisma generate:', error.message);
  process.exit(1);
}
