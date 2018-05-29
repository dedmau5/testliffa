var merge = require('deepmerge');
var wdioConf = require('./wdio.conf.js');


//  Documentation can be found here:
//  https://github.com/SeleniumHQ/selenium/wiki/ChromeDriver
//  https://sites.google.com/a/chromium.org/chromedriver/capabilities
//  https://github.com/SeleniumHQ/selenium/wiki/DesiredCapabilities


exports.config = merge(wdioConf.config, {
    capabilities: [{
        maxInstances: 1,
        browserName: 'chrome',
        chromeOptions: {
            args: ["--no-default-browser-check", "--incognito"] // "--headless", "--remote-debugging-port=9222"
        }
    }],

    // Saves a screenshot to a given path if a command fails.
    screenshotPath: './screenshots/errors/chrome',
    services: ['selenium-standalone'],
});


