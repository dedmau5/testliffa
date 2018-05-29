var merge = require('deepmerge');
var wdioConf = require('./wdio.conf.js');


//  Documentation can be found here:
//  https://github.com/SeleniumHQ/selenium/wiki/SafariDriver
//  https://github.com/SeleniumHQ/selenium/wiki/DesiredCapabilities


/**
 *
 *   NOT WORKING AT THE MOMENT.
 *   Please use BrowserStack, SauceLabs etc instead.
 *
 */

exports.config = merge(wdioConf.config, {
    capabilities: [{
        maxInstances: 1,
        browserName: 'safari',
        "safari.options": {
            cleanSession: true
        }
    }],

    // Saves a screenshot to a given path if a command fails.
    screenshotPath: './screenshots/errors/safari',
    services: ['selenium-standalone'],
});


