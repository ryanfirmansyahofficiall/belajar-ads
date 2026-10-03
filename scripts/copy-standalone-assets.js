const fs = require('fs');
const path = require('path');

/**
 * Automates copying of static assets and public directory to Next.js standalone build.
 * Next.js output: 'standalone' compiles server chunks and bundled node_modules,
 * but intentionally excludes .next/static and public/ from .next/standalone.
 * This script ensures all CSS, JS bundles, and static assets are served properly
 * by the standalone server in production (cPanel / Phusion Passenger).
 */

const rootDir = path.resolve(__dirname, '..');
const standaloneDir = path.join(rootDir, '.next', 'standalone');

if (!fs.existsSync(standaloneDir)) {
  console.log('[standalone-assets] .next/standalone directory not found, skipping asset copy.');
  process.exit(0);
}

// 1. Copy .next/static -> .next/standalone/.next/static
const staticSrc = path.join(rootDir, '.next', 'static');
const staticDest = path.join(standaloneDir, '.next', 'static');

if (fs.existsSync(staticSrc)) {
  fs.mkdirSync(path.dirname(staticDest), { recursive: true });
  fs.cpSync(staticSrc, staticDest, { recursive: true, force: true });
  console.log('[standalone-assets] Copied .next/static -> .next/standalone/.next/static');
} else {
  console.warn('[standalone-assets] Warning: .next/static not found.');
}

// 2. Copy public -> .next/standalone/public (if exists)
const publicSrc = path.join(rootDir, 'public');
const publicDest = path.join(standaloneDir, 'public');

if (fs.existsSync(publicSrc)) {
  fs.cpSync(publicSrc, publicDest, { recursive: true, force: true });
  console.log('[standalone-assets] Copied public/ -> .next/standalone/public');
}
