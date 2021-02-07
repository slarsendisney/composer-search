var fs = require("fs");
const puppeteer = require("puppeteer");
const csv = require("csvtojson");
const csvFilePath = "./data.csv";

(async () => {
  const jsonData = await csv().fromFile(csvFilePath);
  const composers = jsonData
    .map(({ composers }) => composers.split(",")[0].toLowerCase())
    .filter((composer) => typeof composer === "string" && composer.length > 0);
  const sites = jsonData
    .map(({ urls }) => urls)
    .filter((url) => typeof url === "string" && url.length > 0);
  const browser = await puppeteer.launch({
    args: ["--no-sandbox"],
    headless: true,
  });
  const page = await browser.newPage();
  const results = [];
  for (const site of sites) {
    await page.goto(site);
    console.log(`🔎 Checking ${site}`);
    let pageData = await page.$eval("*", (el) => el.innerText);
    pageData = pageData.toLowerCase();
    for (const composer of composers) {
      const pageParts = pageData.split(/\s/g);
      for (part of pageParts) {
        if (part.toLowerCase() == composer) {
          console.log(`✅ Found Mention: ${composer}`);
          const siteIndex = results.findIndex(
            ({ website }) => website === site
          );
          if (siteIndex > -1) {
            if (!results[siteIndex].composers.includes(composer)) {
              results[siteIndex].composers.push(composer);
            }
          } else {
            results.push({ website: site, composers: [composer] });
          }
        }
      }
    }
  }
  fs.writeFile("results.json", JSON.stringify(results), function (err) {
    if (err) throw err;
    console.log("💾 Saved Data!");
  });

  await browser.close();
})();
