// index.js (ESM syntax)
import puppeteer from 'puppeteer';

(async () => {
  console.log("📡 Launching Puppeteer...");

  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();

  const url = "https://www.flightstats.com/v2/flight-tracker/LX/155?year=2025&month=7&date=16";
  console.log(`🌐 Navigating to ${url}`);
  await page.goto(url, { waitUntil: 'networkidle0', timeout: 60000 });

  const title = await page.title();
  console.log("📄 Page title:", title);

  await browser.close();
})();
