const {logger} = require('facilitator');
const webdriver = require('selenium-webdriver');
const driver = new webdriver.Builder().forBrowser('chrome').build();
const By = webdriver.By;

const IF_EXISTS_REGEX = '( if exists)?';

module.exports = {
  install: (facilitator) => {
    facilitator.register("visit {website}", (website) => {
      driver.get(website);
    });

    facilitator.register("fill {field} with {value}", (field, value) => {
      driver.findElement(By.xpath('//input[@id=(//label[text()="' + field + '"]/@for)]')).then((input) => {
        input.sendKeys(value);
      });
    });

    facilitator.register("fill element by id {id} with {value}", (id, value) => {
      driver.findElement(By.id(id)).sendKeys(value);
    });

    facilitator.register("fill element by css {css} with {value}", (css, value) => {
      driver.findElement(By.css(css)).sendKeys(value);
    });

    facilitator.register("fill element by class {className} with {value}", (className, value) => {
      driver.findElement(By.className(className)).sendKeys(value);
    });

    facilitator.register("fill element by name {name} with {value}", (name, value) => {
      driver.findElement(By.name(name)).sendKeys(value);
    });

    facilitator.register("fill element by xpath {xpath} with {value}", (xpath, value) => {
      driver.findElement(By.xpath(xpath)).sendKeys(value);
    });

    facilitator.register("check checkbox {value}", (value) => {
      driver.findElement(By.xpath("//input[@type='checkbox'][text()[contains(.,'" + value + "')]]")).click();
    });

    facilitator.register("check checkbox with name {value}", (value) => {
      driver.findElement(By.css("input[type='checkbox'][name='" + value + "']")).click();
    });

    facilitator.register("check radio {value}", (value) => {
      driver.findElement(By.xpath("//input[@type='radio'][text()[contains(.,'" + value + "')]]")).click();
    });

    facilitator.register("click on {button} button", (button) => {
      driver.findElement(By.css('input[value="' + button + '"]')).click();
    });

    facilitator.register("click on {link} link{exists}", (link, exists) => {
      driver.findElement(By.linkText(link)).then((element) => {
        element.click();
      }, () => {
        if (exists === undefined) {
          logger.error(link + ' link was not found');
        }
      }, {exists: IF_EXISTS_REGEX});
    });

    facilitator.register("webdriver done", () => {
      driver.quit();
    });
  }
};
