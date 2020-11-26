const playwright = require("playwright");

const config = require("../lib/config");
const click = require("../lib/helpers").click;
const typeText = require("../lib/helpers").typeText;
const loadUrl = require("../lib/helpers").loadUrl;
const waitForText = require("../lib/helpers").waitForText;
const pressKey = require("../lib/helpers").pressKey;
const shouldExist = require("../lib/helpers").shouldExist;
const shouldNotExist = require("../lib/helpers").shouldNotExist;

const generateID = require("../lib/utils").generateID;
const generateEmail = require("../lib/utils").generateEmail;
const generateNumbers = require("../lib/utils").generateNumbers;

const utils = require("../lib/utils");

describe("First test", () => {
  let browser;
  let page;

  before(async function () {
    browser = await playwright.launch({
      headless: config.isHeadless,
      slowMo: config.slowMo,
      devtools: config.devTools,
      timeout: config.launchTimeout,
    });
    page = await browser.newPage();
    await page.setDefaultTimeout(config.waitingTimeout);
    await page.setViewport({
      width: config.viewportWidth,
      height: config.viewportHeight,
    });
  });

  after(async function () {
    await browser.close();
  });

  it("My first step", async () => {
    await loadUrl(page, config.baseUrl);
    await shouldExist(page, "#nav-search");

    const url = await page.url();
    const title = await page.title();

    expect(url).to.contain("dev");
    expect(title).to.contains("Community");
  });

  it("browser reload", async () => {
    await page.reload();
    await shouldExist(page, "#page-content");

    await waitForText(page, "body", "WRITE A POST");

    const url = await page.url();
    const title = await page.title();

    //await page.waitFor(1000)

    expect(url).to.contain("dev");
    expect(title).to.contains("Community");
  });

  it("click method", async () => {
    await page.goto("https://dev.to/");
    await click(page, "#write-link");
    await shouldExist(page, ".registration-rainbow");
  });

  it("submit searchbox", async () => {
    await page.goto(config.baseUrl);
    // await typeText(page, 'JavaScript', '#nav-search')
    await typeText(page, utils.generateNumbers(), "#nav-search");
    await page.waitFor(3000);
    await pressKey(page, "Enter");
    await shouldExist(page, "#articles-list");
  });
});
