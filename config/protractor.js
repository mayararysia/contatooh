//config/protractor.js

  var config = require('./config')();

  browser.driver.findElement(by.id('login_field'))
    .sendKeys(config.seleniumUser);
  browser.driver.findElement(by.id('password'))
    .sendKeys(config.seleniumUserPassword);
};