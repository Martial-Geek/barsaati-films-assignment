const { Builder } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const proxy = require("selenium-webdriver/proxy");
const proxyChain = require("proxy-chain");
const getAnonymizedProxy = require("../config/proxyConfig");
require("dotenv").config();

const getProxyDriver = async () => {
  console.log("Starting test Selenium script...");

  try {
    // Define your proxy details

    // Construct the new proxy string
    const newProxyString = await getAnonymizedProxy();

    const chromePath =
      process.env.CHROME_BIN ||
      "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"; // Adjust the path as needed
    console.log(`Using Chrome binary: ${chromePath}`);

    // Set the Chrome options
    const options = new chrome.Options().setChromeBinaryPath(chromePath);
    options.setProxy(
      proxy.manual({
        http: newProxyString,
        https: newProxyString,
      })
    );

    console.log("Chrome options set");

    // Initialize the WebDriver
    const driver = await new Builder()
      .forBrowser("chrome")
      .setChromeOptions(options)
      .build();

    console.log("Driver built successfully");

    if (driver) return driver;
    else throw new Error("Driver not initialized");
  } catch (error) {
    console.error("Error during WebDriver initialization:", error);
    throw error;
  }
};

module.exports = getProxyDriver;
