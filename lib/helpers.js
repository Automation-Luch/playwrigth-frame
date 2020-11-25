module.exports = {
  async clearField(page, element) {
    await page.waitForSelector(element);
    await page.focus(element);
    await page.$eval(element, (element_) =>
      element_.setSelectionRange(0, element_.value.length)
    );
    await page.keyboard.press("Backspace");
  },

  async uploadFiles(page, element, file) {
    await page.waitForSelector(element, { state: "attached" });
    const inputsFile = await page.$$(element);
    for (const element of inputsFile) {
      await element.setInputFiles(file);
      await element.evaluate((upload) =>
        upload.dispatchEvent(new Event("change", { bubbles: true }))
      );
    }
  },

  async click(selector, page) {
    try {
      await page.waitForSelector(selector);
      await page.click(selector);
    } catch {
      throw new Error(`Could not click on selector: ${selector}`);
    }
  },

  async typeText(selector, words, page) {
    try {
      await page.waitForSelector(selector);
      await page.type(selector, words);
    } catch {
      throw new Error(`Could not type text into field: ${selector}`);
    }
  },

  async clearAndTypeText(selector, words, page) {
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

  async waitForValue(page, selector, value) {
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
};
