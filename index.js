var fs = require("fs");
const puppeteer = require("puppeteer");
const csv = require("csvtojson");
const csvFilePath = "./data.csv";

(async () => {
  const jsonData = await csv().fromFile(csvFilePath);
  const composers = jsonData.map(({ composers }) => composers.toLowerCase());
  const sites = jsonData.map(({ urls }) => urls);
  const browser = await puppeteer.launch({ args: ['--no-sandbox'], headless:true });
  const page = await browser.newPage();
  const results = [];
  for (const site of sites) {
    await page.goto(site);
    console.log(`🔎 Checking ${site}`);
    let pageData = await page.$eval("*", (el) => el.innerText);
    pageData = pageData.toLowerCase();
    for (const composer of composers) {
      if (pageData.includes(composer)) {
        console.log(`✅ Found Mention: ${composer}`);
        const siteIndex = results.findIndex(({ website }) => website === site);
        if (siteIndex > -1) {
          results[siteIndex].composers.push(composer);
        } else {
          results.push({ website: site, composers: [composer] });
        }
      }
    }
    fs.writeFile("results.json", JSON.stringify(results), function (err) {
      if (err) throw err;
      console.log("Saved Data!");
    });
  }

  await browser.close();
})();
