// seleniumScript.js
const axios = require("axios");
const uuid = require("uuid");

const { By, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const proxy = require("selenium-webdriver/proxy");

const proxyChain = require("proxy-chain");

const getIpAddress = require("../utils/getIpAddress");
const buildDriver = require("../utils/buildDriver");
const saveTrendData = require("../utils/db/saveTrendData");

const login = require("../utils/scrape/login");
const home = require("../utils/scrape/home");

require("dotenv").config();

async function getTrendingTopics() {
  console.log("Starting Selenium script...");

  const driver = await buildDriver();

  try {
    //handle twitter login
    await login(driver);
    // Get the trending topics
    const trendingTopics = await home(driver);

    // Get the IP address
    const ipAddress = await getIpAddress();

    console.log(trendingTopics);

    // Generate unique ID
    const uniqueId = uuid.v4();

    // Get current timestamp
    const endTime = new Date();

    // Save trend data to MongoDB

    await saveTrendData(trendingTopics, ipAddress, uniqueId, endTime);

    //since no error occured quit the driver
    await driver.quit();
    return { uniqueId, trendingTopics, endTime, ipAddress };
  } catch (error) {
    console.error("An unrecoverable error occurred:", error);
  } finally {
    // await driver.quit();
  }
}

module.exports = getTrendingTopics;
