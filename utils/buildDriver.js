const { Builder } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const getAnonymizedProxy = require("../config/proxyConfig");
const logger = require("../logger");
require("dotenv").config();

const getProxyDriver = async () => {
  logger.sendLog("Starting Selenium script...");

  try {
    const newProxyString = await getAnonymizedProxy();
    logger.sendLog(`Using proxy: ${newProxyString}`);

    const options = new chrome.Options();
    options.addArguments("--headless=new");
    options.addArguments("--disable-gpu");
    options.addArguments("--no-sandbox");
    options.addArguments("--disable-dev-shm-usage");
    options.addArguments("--start-maximized");

    logger.sendLog("Chrome options set");

    const driver = await new Builder()
      .forBrowser("chrome")
      .setChromeOptions(options)
      .build();

    logger.sendLog("Driver built successfully");

    return driver;
  } catch (error) {
    logger.sendLog(`Error during WebDriver initialization: ${error}`);
    throw error;
  }
};

module.exports = getProxyDriver;
