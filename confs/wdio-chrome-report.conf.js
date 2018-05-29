var merge = require('deepmerge');
var wdioConf = require('./wdio.conf.js');

exports.config = merge(wdioConf.config, {
  capabilities: [{
    maxInstances: 1,
    browserName: 'chrome',
    chromeOptions: {
      args: ['--no-default-browser-check', '--incognito'], // "--headless", "--remote-debugging-port=9222"
    },
  }],

  // Saves a screenshot to a given path if a command fails.
  screenshotPath: './screenshots/chrome',
  services: ['selenium-standalone'],
  reporterOptions: {
    outputDir: './',
  },
});
