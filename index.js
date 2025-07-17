{\rtf1\ansi\ansicpg1252\cocoartf2639
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;\f1\fnil\fcharset0 AppleColorEmoji;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx566\tx1133\tx1700\tx2267\tx2834\tx3401\tx3968\tx4535\tx5102\tx5669\tx6236\tx6803\pardirnatural\partightenfactor0

\f0\fs24 \cf0 const express = require('express');\
const puppeteer = require('puppeteer');\
\
const app = express();\
const PORT = process.env.PORT || 3000;\
\
app.get('/scrape', async (req, res) => \{\
  const flight = req.query.flight || "LX155";\
  const date = req.query.date || "2025-07-16";\
\
  const url = `https://www.flightstats.com/v2/flight-tracker/$\{flight.slice(0, 2)\}/$\{flight.slice(2)\}?year=$\{date.slice(0, 4)\}&month=$\{Number(date.slice(5, 7))\}&date=$\{Number(date.slice(8))\}`;\
  console.log("
\f1 \uc0\u55356 \u57104 
\f0  Scraping URL:", url);\
\
  try \{\
    const browser = await puppeteer.launch(\{\
      headless: true,\
      args: ['--no-sandbox']\
    \});\
    const page = await browser.newPage();\
    await page.goto(url, \{ waitUntil: 'networkidle2' \});\
\
    // This is just a placeholder until we refine the selectors.\
    const title = await page.title();\
\
    await browser.close();\
\
    res.json(\{\
      message: `Scraped flight $\{flight\} for $\{date\}`,\
      pageTitle: title\
    \});\
\
  \} catch (e) \{\
    console.error("
\f1 \uc0\u10060 
\f0  Error scraping:", e.message);\
    res.status(500).json(\{ error: e.message \});\
  \}\
\});\
\
app.listen(PORT, () => \{\
  console.log(`
\f1 \uc0\u55357 \u56960 
\f0  Server running on port $\{PORT\}`);\
\});}