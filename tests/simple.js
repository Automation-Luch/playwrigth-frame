const { chromium } = require("playwright");
const expect = require("chai").expect;

const config = require("../lib/config");
const initBrowserAndPage = require("../lib/helpers").initBrowserAndPage;

const followToPage = require("../lib/helpers").followToPage;
const shouldExist = require("../lib/helpers").shouldExist;
const click = require("../lib/helpers").click;
const typeText = require("../lib/helpers").typeText;
const { LOGIN, PASSWORD } = require("../lib/credentions");

const mainPage = require("../lib/page-objects/mainPage");
const loginPage = require("../lib/page-objects/loginPage");

describe("Login to ROZETKA with valid data", () => {
  let browser;
  let page;

  before(async () => {
    const data = await initBrowserAndPage();
    browser = data.browser;
    page = data.page;
  });

  after(async () => {
    await browser.close();
  });

  it("Go to the ROZETKA main page, check search field and title", async () => {
    await followToPage(mainPage.URL, page);
    await shouldExist(mainPage.SEARCH_BUTTON, page);
    const title = await page.title();
    expect(title).to.contains("ROZETKA");
  });

  it("Follow to the login page", async () => {
    await click(mainPage.LOGIN_LINK, page);
    await shouldExist(loginPage.LOGIN_BUTTON, page);
  });

  it("Submit login form", async () => {
    await click(loginPage.USERNAME_FIELD, page);
    await typeText(loginPage.USERNAME_FIELD, LOGIN, page);
    await typeText(loginPage.PASSWORD_FIELD, PASSWORD, page);
    await click(loginPage.LOGIN_BUTTON, page);
  });
});
