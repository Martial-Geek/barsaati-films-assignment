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

require("dotenv").config();

const twitterUrl = "https://x.com/i/flow/login";

async function getTrendingTopics() {
  console.log("Starting Selenium script...");

  // Initialize the WebDriver
  const driver = await buildDriver();

  try {
    // Navigate to the Twitter login page
    await driver.get(twitterUrl);

    // Then, find the input field with name attribute set to text

    const usernameField = await driver.wait(
      until.elementLocated(By.className("r-30o5oe")),
      20000 // Timeout in milliseconds
    );

    // Enter the Twitter username
    await usernameField.sendKeys(process.env.TWITTER_USERNAME);

    // Locate buttons on the page

    const buttons = await driver.wait(
      until.elementsLocated(By.className("r-sdzlij")),
      10000
    );

    // Click the third button (index 2, as index starts from 0)
    if (buttons.length >= 3) {
      console.log(buttons.length);
      await buttons[3].click();
    } else {
      console.log("Less than 3 buttons found.");
    }

    console.log("Found the next button");

    // Optionally, wait for some time to observe the action
    await driver.sleep(1000);

    // Locate and enter the Twitter password

    const passwordField = await driver.wait(
      until.elementLocated(By.name("password")),
      10000 // Timeout in milliseconds
    );

    await passwordField.sendKeys(process.env.TWITTER_PASSWORD);

    // Click on the login button
    const loginButton = await driver.findElement(
      By.className(
        "css-175oi2r r-sdzlij r-1phboty r-rs99b7 r-lrvibr r-19yznuf r-64el8z r-1fkl15p r-1loqt21 r-o7ynqc r-6416eg r-1ny4l3l"
      )
    );
    await loginButton.click();

    // Wait for the page to navigate to the home page
    await driver.wait(until.urlContains("home"), 30000);

    //Wait for the trending topics section to be located
    const trendsDiv = await driver.wait(
      until.elementsLocated(
        By.xpath(
          '//div[@class="css-146c3p1 r-bcqeeo r-1ttztb7 r-qvutc0 r-37j5jr r-a023e6 r-rjixqe r-b88u0q r-1bymd8e"]'
        )
      ),
      10000
    );

    let trendingTopics = [];
    // Iterate through trending topics and extract text
    for (let i = 0; i < Math.min(trendsDiv.length, 5); i++) {
      trendingTopics.push(await trendsDiv[i].getText());
    }

    //log trending topics with new lines
    console.log(trendingTopics.join("\n"));

    // Get the IP address
    const ipAddress = await getIpAddress();

    // Generate unique ID
    const uniqueId = uuid.v4();

    // Get current timestamp
    const endTime = new Date();

    // Save trend data to MongoDB

    await saveTrendData(trendingTopics, ipAddress, uniqueId, endTime);

    return { uniqueId, trendingTopics, endTime, ipAddress };
  } catch (error) {
    console.error("An error occurred:", error.name, error.message);
    if (error.name === "TimeoutError") {
      // If timeout occurs, refresh the page
      console.log("Timeout occurred. Refreshing page...");
      await driver.navigate().refresh();
      getTrendingTopics();
      // Then try again or handle accordingly
    } else {
      console.error("An error occurred:", error);
      // Handle other errors appropriately
    }
  } finally {
    // Quit the WebDriver session
    await driver.sleep(10000);
    await driver.quit();
  }
}

module.exports = getTrendingTopics;
