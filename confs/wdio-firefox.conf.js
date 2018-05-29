var merge = require('deepmerge');
var wdioConf = require('./wdio.conf.js');


//  Documentation can be found here:
//  https://github.com/SeleniumHQ/selenium/wiki/FirefoxDriver
//  https://github.com/SeleniumHQ/selenium/wiki/DesiredCapabilities


exports.config = merge(wdioConf.config, {
    capabilities: [{
    rotatable: true,
    marionette: true,
    locationContextEnabled: true,
    loggingPrefs: 'org.openqa.selenium.logging.LoggingPreferences @10b2d2b',
    browserName: 'firefox',
    javascriptEnabled: true,
    handlesAlerts: true,
    maxInstances: 1,
    
    moz: {
        binary: 'Optional.empty',
        args: [],
        legacy: null,
        logLevel: null,
        prefs: {},
        profile: null
    },
    requestOrigins: {
        name: 'webdriverio',
        version: '4.6.2',
        url: 'http://webdriver.io'
    }
}],

    // Saves a screenshot to a given path if a command fails.
    screenshotPath: './screenshots/errors/firefox',
    services: ['selenium-standalone'],
});
