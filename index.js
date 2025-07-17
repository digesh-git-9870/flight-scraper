const puppeteer = require('puppeteer');

(async () => {
  console.log("📡 Launching browser...");

  const browser = await puppeteer.launch({
    headless: "new",
    executablePath: "/usr/bin/chromium-browser", // Or try "/usr/bin/chromium"
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  const flightUrl = 'https://www.flightstats.com/v2/flight-tracker/LX/155?year=2025&month=7&date=16';
  console.log(`🌐 Navigating to: ${flightUrl}`);
  await page.goto(flightUrl, { waitUntil: 'networkidle2' });

  const title = await page.title();
  console.log("📄 Page Title:", title);

  // You can add more scraping logic here (DOM parsing etc.)

  await browser.close();
  console.log("✅ Done.");
})();
