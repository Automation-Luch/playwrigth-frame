module.exports = {
  clearField: async function (page, element) {
    await page.waitForSelector(element);
    await page.focus(element);
    await page.$eval(element, (element_) =>
      element_.setSelectionRange(0, element_.value.length)
    );
    await page.keyboard.press("Backspace");
  },

  uploadFiles: async function (page, element, file) {
    await page.waitForSelector(element, { state: "attached" });
    const inputsFile = await page.$$(element);
    for (const element of inputsFile) {
      await element.setInputFiles(file);
      await element.evaluate((upload) =>
        upload.dispatchEvent(new Event("change", { bubbles: true }))
      );
    }
  },

  click: async function (selector, page) {
    try {
      await page.waitForSelector(selector);
      await page.click(selector);
    } catch {
      throw new Error(`Could not click on selector: ${selector}`);
    }
  },

  typeText: async function (selector, words, page) {
    try {
      await page.waitForSelector(selector);
      await page.type(selector, words);
    } catch {
      throw new Error(`Could not type text into field: ${selector}`);
    }
  },

  clearAndTypeText: async function (selector, words, page) {
    try {
      await page.waitForSelector(selector, { state: "attached" });
      await page.$eval(selector, (element) =>
        element.setSelectionRange(0, element.value.length)
      );
      await page.keyboard.press("Backspace");
      await page.fill(selector, words);
    } catch {
      throw new Error(`Could not type text into field: ${selector}`);
    }
  },

  waitForValue: async function (page, selector, value) {
    try {
      await page.waitForSelector(selector);
      await page.waitForFunction(
        (selector, value) =>
          document
            .querySelector(selector)
            .getAttribute("value")
            .includes(value),
        {},
        selector,
        value
      );
    } catch {
      throw new Error(`Value: ${value} not found for selector: ${selector}`);
    }
  },

  shouldExist: async function (page, selector) {
    try {
      await page.waitForSelector(selector);
    } catch (error) {
      throw new Error(`Selector: ${selector} does not exist`);
    }
  },
};
