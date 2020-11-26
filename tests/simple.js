const { chromium } = require("playwright");
const expect = require("chai").expect;

const config = require("../lib/config");
const loadUrl = require("../lib/helpers").loadUrl;
const shouldExist = require("../lib/helpers").shouldExist;

describe("First test", () => {
  let browser;
  let page;

  before(async function () {
    browser = await chromium.launch();
    ({
      headless: config.isHeadless,
      slowMo: config.slowMo,
      devtools: config.devTools,
      timeout: config.launchTimeout,
    });
    page = await browser.newPage();
    await page.setDefaultTimeout(config.waitingTimeout);
    await page.setViewportSize({
      width: config.viewportWidth,
      height: config.viewportHeight,
    });
  });

  after(async function () {
    await browser.close();
  });

  it("My first step", async () => {
    await page.goto("https://www.google.com/", { waitUntil: "networkidle0" });

    await shouldExist(page, '[name="q"]');

    const url = await page.url();
    const title = await page.title();

    expect(url).to.contain("google");
    expect(title).to.contains("Google");
  });
});
