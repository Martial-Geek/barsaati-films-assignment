// const { Builder, By, until } = require("selenium-webdriver");
// const axios = require("axios");
// const proxy = require("selenium-webdriver/proxy");
// let chrome = require("selenium-webdriver/chrome");
// require("dotenv").config();

// // const opts = new chrome.Options();
// // opts.setProxy(
// //   proxy.manual({
// //     // http: `${process.env.PROXYMESH_HOST}:${process.env.PROXYMESH_PORT}`,
// //     http: "us.proxymesh.com:31280",
// //   })
// // );

// const proxyHost = process.env.PROXYMESH_HOST;
// const proxyPort = process.env.PROXYMESH_PORT;
// const proxyUsername = process.env.PROXYMESH_USER;
// const proxyPassword = process.env.PROXYMESH_PASS;

// const url = `http://@httpbin.org/ip`;

// // Construct the proxy URL

// const proxyUrl = `http://${proxyHost}:${proxyPort}`;

// const proxyConfig = proxy.manual({
//   http: proxyUrl,
//   https: proxyUrl,
// });

// async function getIP() {
//   console.log("Starting Selenium script...");

//   const driver = await new Builder()
//     .forBrowser("chrome")
//     // .setChromeOptions(options)
//     .setProxy(proxyConfig)
//     .build();

//   await driver.get(url);

//   console.log(await driver.findElement(By.tagName("body")).getText());

//   //sleep for 10 seconds
//   await driver.sleep(40000);

//   await driver.quit();
// }

// getIP();

const { Builder, By } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const proxy = require("selenium-webdriver/proxy");
const dns = require("dns");
const proxyChain = require("proxy-chain");
require("dotenv").config();

const url = "http://httpbin.org/ip";

async function getIP() {
  console.log("Starting Selenium script...");

  // Define your proxy details
  const proxyUsername = process.env.PROXYMESH_USER;
  const proxyPassword = process.env.PROXYMESH_PASS;
  const proxyHost = process.env.PROXYMESH_HOST;
  const proxyPort = process.env.PROXYMESH_PORT;
  const proxyUrl = `http://${proxyUsername}:${proxyPassword}@${proxyHost}:${proxyPort}`;

  // Anonymize proxyUrl
  const anonymizedProxy = await proxyChain.anonymizeProxy(proxyUrl);

  // Parse anonymized proxy URL
  const parsedUrl = new URL(anonymizedProxy);

  // Extract the host and port
  const proxyHostParsed = parsedUrl.hostname;
  const proxyPortParsed = parsedUrl.port;

  // Construct the new proxy string
  const newProxyString = `${proxyHostParsed}:${proxyPortParsed}`;

  // Set the Chrome options
  const options = new chrome.Options();

  // Initialize the WebDriver
  const driver = await new Builder()
    .forBrowser("chrome")
    // Add the proxy to the WebDriver
    .setProxy(
      proxy.manual({
        http: newProxyString,
        https: newProxyString,
      })
    )
    .setChromeOptions(options)
    .build();

  try {
    // Navigate to the target website
    await driver.get(url);

    // Get the page text content
    const bodyText = await driver.findElement(By.tagName("body")).getText();

    console.log(bodyText);
  } catch (error) {
    console.error("An error occurred:", error);
  } finally {
    // Clean up resources
    await driver.quit();

    // Close the anonymized proxy connection
    await proxyChain.closeAnonymizedProxy(newProxyString, true);
  }
}

getIP();
