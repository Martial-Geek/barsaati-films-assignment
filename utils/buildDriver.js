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

    // Set the Chrome options
    const options = new chrome.Options();
    options.addArguments("--disable-gpu", "--no-sandbox"); // Add minimal options
    // options.setProxy(
    //   proxy.manual({
    //     http: newProxyString,
    //     https: newProxyString,
    //   })
    // );

    // Log ChromeDriver version
    // console.log("ChromeDriver version:", await chrome.getVersion());

    // // Enable ChromeDriver logs
    // options.setChromeLogFile("/path/to/chromedriver.log");
    // options.addArguments("--verbose");

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
