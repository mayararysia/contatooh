//config/protractor.js

//exports.config = {
 
  //specs: ['../test/e2e/**/*.js'],
 /* onPrepare: function() {
    browser.driver.get('http://localhost:3000');

    browser.wait(function(){
      return browser.driver.isElementPresent(by.id('entrar'));
    });

    browser.driver.findElement(by.id('entrar')).click();
   
    browser.driver.findElement(by.id('login_field'))
      .sendKeys('mayara_rysia@hotmail.com');
    browser.driver.findElement(by.id('password'))
        .sendKeys('mayteste123');
    browser.driver.findElement(by.name('commit')).click();
  }*/

  var config = require('./config')();

  browser.driver.findElement(by.id('login_field'))
    .sendKeys(config.seleniumUser);
  browser.driver.findElement(by.id('password'))
    .sendKeys(config.seleniumUserPassword);
};