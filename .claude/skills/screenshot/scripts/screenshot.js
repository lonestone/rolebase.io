#!/usr/bin/env node
/**
 * Takes a clean 1920x1080 screenshot of a webpage.
 *
 * Usage: node screenshot.js <url> [output.png]
 *
 * - Removes cookie banners and chat widgets (see cleanup.js)
 * - Defaults to viewport screenshot; pass --full for full page
 */
const { chromium } = require('playwright');
const path = require('path');
const cleanup = require('./cleanup');

async function main() {
  const args = process.argv.slice(2);
  const fullPage = args.includes('--full');
  const positional = args.filter((a) => !a.startsWith('--'));

  const url = positional[0];
  if (!url) {
    console.error('Usage: node screenshot.js <url> [output.png] [--full]');
    process.exit(1);
  }

  // Default filename from URL hostname
  const defaultName = new URL(url).hostname.replace(/\./g, '-') + '.png';
  const output = positional[1] || defaultName;

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
  });
  const page = await context.newPage();

  await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
  await page.evaluate(cleanup);
  await page.waitForTimeout(500);

  const outputPath = path.resolve(process.cwd(), output);
  await page.screenshot({ path: outputPath, fullPage, type: 'png' });

  console.log(outputPath);

  await browser.close();
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
