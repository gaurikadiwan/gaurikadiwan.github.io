// Renders scripts/og.html to public/og.png (1200x630) with Playwright.
// Usage: node scripts/make-og.cjs   (requires Playwright + Chromium installed)
const path = require("node:path");
let chromium;
try { ({ chromium } = require("playwright")); } catch {
  ({ chromium } = require(require("node:child_process").execSync("npm root -g").toString().trim() + "/playwright"));
}
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
  await page.goto("file://" + path.join(__dirname, "og.html"));
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(__dirname, "..", "public", "og.png") });
  await browser.close();
  console.log("wrote public/og.png");
})();
