const { chromium } = require('playwright');
const testConfig = require('./config.js');

async function setupBrowserPage() {
  const browser = await chromium.launch(testConfig.browserOptions);
  const page = await browser.newPage();
  return { browser, page };
}

async function setupTest() {
  const { browser, page } = await setupBrowserPage();
  return { browser, page };
}

async function searchAndClickNextPage(page, searchText) {
  while (true) {
    // Check if the search text exists on the current page
    
    const searchElement = await page.$(`.hrefch:has-text("${searchText}")`);
    if (searchElement) {
      // If found, click on it
      await searchElement.click();
      break;
    }

    // Check if the "Next Page" button exists
    const nextPageButton = await page.$('#next2');
    if (nextPageButton) {
      // Click on "Next Page" button and wait for navigation
      await nextPageButton.click();
      await page.waitForNavigation();
    } else {
      // Break the loop if "Next Page" button is not found
      break;
    }
  }
}

async function deleteOrders(page) {
  while (await page.$('.success')) {
    await page.click('a[href="#"]:has-text("Delete")');
    await page.waitForTimeout(5000);
  }
}



module.exports = { setupTest , searchAndClickNextPage , deleteOrders };
