const express = require('express');
const puppeteer = require('puppeteer');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/scrape', async (req, res) => {
  const flight = req.query.flight || "LX155";
  const date = req.query.date || "2025-07-16";

  const url = `https://www.flightstats.com/v2/flight-tracker/${flight.slice(0, 2)}/${flight.slice(2)}?year=${date.slice(0, 4)}&month=${Number(date.slice(5, 7))}&date=${Number(date.slice(8))}`;
  console.log("🌐 Scraping URL:", url);

  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox']
    });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle2' });

    // This is just a placeholder until we refine the selectors.
    const title = await page.title();

    await browser.close();

    res.json({
      message: `Scraped flight ${flight} for ${date}`,
      pageTitle: title
    });

  } catch (e) {
    console.error("❌ Error scraping:", e.message);
    res.status(500).json({ error: e.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
