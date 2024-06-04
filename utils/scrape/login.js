const { By, until } = require("selenium-webdriver");
const logger = require("../../logger");

const login = async (driver) => {
  logger.sendLog("Navigating to login page...");

  const twitterUrl = "https://x.com/i/flow/login";
  await driver.get(twitterUrl);

  const usernameField = await driver.wait(
    until.elementLocated(By.className("r-30o5oe")),
    20000
  );
  await usernameField.sendKeys(process.env.TWITTER_USERNAME);
  logger.sendLog("Entered username");

  const buttons = await driver.wait(
    until.elementsLocated(By.className("r-sdzlij")),
    10000
  );

  for (let i = 0; i < buttons.length; i++) {
    const buttonText = await buttons[i].getText();
    if (buttonText.toLowerCase().includes("next")) {
      await buttons[i].click();
      break;
    }
  }

  logger.sendLog("Clicked Next button");

  const passwordField = await driver.wait(
    until.elementLocated(By.name("password")),
    10000
  );
  logger.sendLog("Found the password field");

  await passwordField.sendKeys(process.env.TWITTER_PASSWORD);

  const loginButton = await driver.findElement(
    By.className(
      "css-175oi2r r-sdzlij r-1phboty r-rs99b7 r-lrvibr r-19yznuf r-64el8z r-1fkl15p r-1loqt21 r-o7ynqc r-6416eg r-1ny4l3l"
    )
  );
  logger.sendLog("Found the login button");
  await loginButton.click();
};

module.exports = login;
