module.exports = {
  clearField: async (selector, page) => {
    await page.waitForSelector(selector);
    await page.focus(selector);
    await page.$eval(selector, (selector_) =>
      selector_.setSelectionRange(0, selector_.value.length)
    );
    await page.keyboard.press("Backspace");
  },

  uploadFiles: async (selector, file, page) => {
    await page.waitForSelector(selector, { state: "attached" });
    const inputsFile = await page.$$(selector);
    for (const element of inputsFile) {
      await element.setInputFiles(file);
      await element.evaluate((upload) =>
        upload.dispatchEvent(new Event("change", { bubbles: true }))
      );
    }
  },

  click: async (selector, page) => {
    try {
      await page.waitForSelector(selector);
      await page.click(selector);
    } catch {
      throw new Error(`Could not click on selector: ${selector}`);
    }
  },

  typeText: async (selector, words, page) => {
    try {
      await page.waitForSelector(selector);
      await page.type(selector, words);
    } catch {
      throw new Error(`Could not type text into field: ${selector}`);
    }
  },

  getText: async (selector, page) => {
    try {
      await page.waitForSelector(selector, { state: "attached" });
      return page.$eval(selector, (e) => e.innerHTML);
    } catch (error) {
      throw new Error(`Cannot find text from selector: ${selector}`);
    }
  },

  clearAndTypeText: async (selector, words, page) => {
    this.clearField;
    try {
      await page.type(selector, words);
    } catch {
      throw new Error(`Could not type text into field: ${selector}`);
    }
  },

  waitForValue: async (selector, value, page) => {
    await page.waitForSelector(selector);
    const result = await page.evaluate(
      (selector) => document.querySelector(selector).getAttribute("value"),
      selector
    );
    if (result !== value)
      throw new Error(`Value: ${value} not found for selector: ${selector}`);
  },

  shouldExist: async (selector, page) => {
    try {
      await page.waitForSelector(selector);
    } catch (error) {
      throw new Error(`Selector: ${selector} does not exist`);
    }
  },

  getCount: async (selector, page) => {
    const links = await page.$$eval(selector, (selector) => selector.length);
    return links;
  },

  followToPage: async (url, page) => {
    await page.goto(url, { waitUntil: "networkidle" });
  },
};
