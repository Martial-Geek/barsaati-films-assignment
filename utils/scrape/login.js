const { By, until } = require("selenium-webdriver");

const login = async (driver) => {
  const twitterUrl = "https://x.com/i/flow/login";

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

  // await buttons.findElement(By.className("r-1fkl15p")).click();

  //if button contains text 'Next' click it
  for (let i = 0; i < buttons.length; i++) {
    const buttonText = await buttons[i].getText();
    if (buttonText.toLowerCase().includes("next")) {
      await buttons[i].click();
      break;
    }
  }

  console.log("Found the next button");

  // Optionally, wait for some time to observe the action

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
};

module.exports = login;
