var merge = require('deepmerge');
var wdioConf = require('./wdio.conf.js');


exports.config = merge(wdioConf.config, {
    capabilities: [{
        // Please see:
        // https://github.com/SeleniumHQ/selenium/wiki/DesiredCapabilities
        maxInstances: 1,
        browserName: 'phantomjs',
    }],

    // Saves a screenshot to a given path if a command fails.
    screenshotPath: './screenshots/errors/phantomjs',
    services: ['phantomjs'],
});
