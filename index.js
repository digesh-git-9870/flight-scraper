const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: "new",
    executablePath: "/usr/bin/chromium-browser",
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  const flightUrl = 'https://www.flightstats.com/v2/flight-tracker/LX/155?year=2025&month=7&date=16';

  console.log(`📡 Fetching: ${flightUrl}`);
  await page.goto(flightUrl, { waitUntil: 'networkidle2', timeout: 60000 });

  const title = await page.title();
  console.log(`🧾 Page Title: ${title}`);

  // Later, you can add scraping logic here...

  await browser.close();
  console.log("✅ Done.");
})();
