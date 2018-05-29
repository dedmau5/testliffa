var merge = require('deepmerge');
var wdioConf = require('./wdio.conf.js');


/*
  Checklist to get the Edge driver working:

  1. Check the Edge version.
  2. Download a release matching your Edge version from:
     https://developer.microsoft.com/en-us/microsoft-edge/tools/webdriver/
  3. Start MicrosoftWebDriver.exe
  4. Notice the port number the web driver is listening on. Set the port below to that number.
  5. You might need to change the firewall settings if the driver is setup on a remote computer.
*/


exports.config = merge(wdioConf.config, {
    host: "localhost",
    port: "17556",
    path: "/",

    capabilities: [{
        browserName: "MicrosoftEdge",
        platform: "Windows 10"
    }],

    // Saves a screenshot to a given path if a command fails.
    screenshotPath: './screenshots/errors/edge'
});
