import { Builder } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome.js';

async function runTest() {
  const targetUrl = process.env.APP_URL || 'http://localhost';
  console.log(`Starting Selenium test pointing to: ${targetUrl}`);

  const options = new chrome.Options();
  options.addArguments('--headless');
  options.addArguments('--no-sandbox');
  options.addArguments('--disable-dev-shm-usage');

  const driver = await new Builder()
    .forBrowser('chrome')
    .setChromeOptions(options)
    .build();

  try {
    await driver.get(targetUrl);
    
    // Wait for the title to be loaded
    const title = await driver.getTitle();
    console.log(`Page title: "${title}"`);

    if (title.includes('SCAP Admin')) {
      console.log('Test PASSED: Page title matches expectation!');
      process.exit(0);
    } else {
      console.error('Test FAILED: Page title does not contain "SCAP Admin"');
      process.exit(1);
    }
  } catch (error) {
    console.error('Test FAILED with error:', error);
    process.exit(1);
  } finally {
    await driver.quit();
  }
}

runTest();
