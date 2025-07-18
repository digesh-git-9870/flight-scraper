import puppeteer from 'puppeteer-core';
import { execSync } from 'child_process';

(async () => {
  console.log("📡 Launching Puppeteer...");

  // Try to find Chromium installed on system
  const chromiumPath = execSync('which chromium || which chromium-browser || which google-chrome')
    .toString().trim();

  console.log("🧭 Chromium path:", chromiumPath);

  const browser = await puppeteer.launch({
    executablePath: chromiumPath,
    headless: "new"
  });

  const page = await browser.newPage();
  const url = "https://www.flightstats.com/v2/flight-tracker/LX/155?year=2025&month=7&date=16";
  console.log(`🌐 Navigating to ${url}`);
  await page.goto(url, { waitUntil: 'networkidle0', timeout: 60000 });

  const title = await page.title();
  console.log("📄 Page title:", title);

  await browser.close();
})();
