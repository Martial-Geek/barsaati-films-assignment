const { By, until } = require("selenium-webdriver");

const home = async (driver) => {
  try {
    // Wait for the page to navigate to the home page
    await driver.wait(until.urlContains("home"), 30000);

    console.log("Navigated to the home page");

    //Wait for the trending topics section to be located
    const trendsDiv = await driver.wait(
      until.elementsLocated(
        By.xpath(
          '//div[@class="css-146c3p1 r-bcqeeo r-1ttztb7 r-qvutc0 r-37j5jr r-a023e6 r-rjixqe r-b88u0q r-1bymd8e"]' //e
        )
      ),
      15000
    );

    console.log("Trending topics section found");

    if (!trendsDiv) await driver.navigate().refresh();

    let trendingTopics = [];
    // Iterate through trending topics and extract text
    for (let i = 0; i < Math.min(trendsDiv.length, 5); i++) {
      trendingTopics.push(await trendsDiv[i].getText());
    }

    //log trending topics with new lines
    console.log(trendingTopics.join("\n"));

    console.log("here");

    if (trendingTopics.length > 0) return trendingTopics;
    else return false;
  } catch (error) {
    console.error("An error occurred while fetching trending topics", error);
  }
};

module.exports = home;
