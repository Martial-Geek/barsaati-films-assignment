const { By, until } = require("selenium-webdriver");
const logger = require("../../logger");

const home = async (driver) => {
  try {
    await driver.wait(until.urlContains("home"), 60000);
    logger.sendLog("Navigated to the home page");

    const trendsDiv = await driver.wait(
      until.elementsLocated(
        By.xpath(
          '//div[@class="css-146c3p1 r-bcqeeo r-1ttztb7 r-qvutc0 r-37j5jr r-a023e6 r-rjixqe r-b88u0q r-1bymd8e"]'
        )
      ),
      60000
    );
    logger.sendLog("Trending topics section found");

    if (!trendsDiv) await driver.navigate().refresh();

    let trendingTopics = [];
    for (let i = 0; i < Math.min(trendsDiv.length, 5); i++) {
      trendingTopics.push(await trendsDiv[i].getText());
    }

    logger.sendLog(`Trending topics: ${trendingTopics.join("\n")}`);

    return trendingTopics.length > 0 ? trendingTopics : false;
  } catch (error) {
    logger.sendLog(`Error fetching trending topics: ${error}`);
    throw error;
  }
};

module.exports = home;
