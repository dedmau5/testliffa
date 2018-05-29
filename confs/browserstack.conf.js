// Documentation:
// http://webdriver.io/guide/testrunner/configurationfile.html
// https://github.com/webdriverio/webdriverio/blob/master/docs/guide/getstarted/configuration.md
// https://www.browserstack.com/automate/node#setting-local-tunnel generate different browser configs

let moment = require('moment'),
    gm = require('gm'),
    util = require('gulp-util'),
    browserstack = require('browserstack-local');


let user, key;

try {
    user = require('./.browserstack.auth.js').user;
    key = require('./.browserstack.auth.js').key;
} catch (err) {
    throw new Error(
        "Please create a .browserstack.auth.js in confs with the following exports:\n" +
        "exports.user = 'username at browserstack'\n" +
        "exports.key = 'the access key'\n\n" +
        "You'll find your username and access key at the bottom of https://www.browserstack.com/accounts/settings"
    );
}


let capabilities;

if ( util.env['browserstack_os'] === "iOS" ) {
    let browserName = "";

    if ( util.env['browserstack_device'].includes("iPhone") ) {
        browserName = "iPhone";
    } else if ( util.env['browserstack_device'].includes("iPad") ) {
        browserName = "iPad";
    } else {
        throw new Error("Unknown model!");
    }

    capabilities = {
        "browserName": browserName,
        "platform": "MAC",
        "device": util.env['browserstack_device'],
        'browserstack.local': util.env['browserstack_local'] === "true"
    };
} else if ( util.env['browserstack_os'] === "Android" ) {
    capabilities = {
        "browserName": "android",
        "platform": "ANDROID",
        "device": util.env['browserstack_device'],
        'browserstack.local': util.env['browserstack_local'] === "true"
    };
} else {
    capabilities = {
        'os': util.env['browserstack_os'],
        'os_version': util.env['browserstack_os_version'],
        'browser': util.env['browserstack_browser'],
        'browser_version': util.env['browserstack_browser_version'],
        'resolution': '1920x1080',
        'browserstack.local': util.env['browserstack_local'] === "true"
    };
}


exports.config = {
    user: user,
    key: key,

    // Code to start browserstack local before start of test
    onPrepare: function (config, capabilities) {
        if ( util.env['browserstack_local'] === "true" ) {
            console.log("Connecting local");

            return new Promise(function(resolve, reject){
                exports.bs_local = new browserstack.Local();
                exports.bs_local.start({'key': exports.config.key }, function(error) {
                    if (error) return reject(error);
                    console.log('Connected. Now testing...');

                    resolve();
                });
            });
        }
    },

    // Code to stop browserstack local after end of test
    onComplete: function (capabilties, specs) {
        if ( util.env['browserstack_local'] === "true" ) {
            exports.bs_local.stop(function() {});
        }
    },

    capabilities: [capabilities],

    specs: [],

    services: ['browserstack'],

    // Patterns to exclude.
    exclude: [
        // 'path/to/excluded/files'
    ],

    maxInstances: 10,

    sync: true,
    logLevel: 'error', // allowed: silent | verbose | command | data | result | error
    coloredLogs: true,

    connectionRetryCount: 3,
    waitforTimeout: 10000,
    connectionRetryTimeout: 90000,

    framework: 'mocha',
    reporters: ['spec'],
    plugins: {
        'wdio-screenshot': {}
    },

    screenshotOnReject: {
        connectionRetryTimeout: 10000,
        connectionRetryCount: 3
    },

    mochaOpts: {
        bail: true, // Stops the test after the first fail.
        compilers: [
            'js:babel-register'
        ],
        timeout: 100000,
        ui: 'bdd'
    },

    seleniumLogs: "./",

    before: function(capabilities, specs) {
        // http://chaijs.com/guide/styles/
        var chai = require('chai');
        chai.config.truncateThreshold = 0;
        chai.config.includeStack = true;

        global.expect = chai.expect;
        global.should = chai.should();

        browser.windowHandleMaximize();
    },

    after: function() {
        let
            datestamp = moment().format("YYYYMMDD_HHmmss"),
            viewportJpgPath = `./screenshots/teardown_viewport_${datestamp}.jpg`,
            documentJpgPath = `./screenshots/teardown_document_${datestamp}.jpg`;

        if ( browser.getViewportSize().width < 996 ) {
            gm( Buffer.from( browser.saveViewportScreenshot(), 'base64' ) )
                .setFormat("jpg")
                .write( viewportJpgPath, ( error ) => {
                    if ( error ) {
                        throw new Error(error);
                    }

                    console.log(`Screenshot saved to ${viewportJpgPath}`);
                });
        }

        if ( browser.getViewportSize().width >= 996 ) {
            gm( Buffer.from( browser.saveDocumentScreenshot(), 'base64' ) )
                .setFormat("jpg")
                .write( documentJpgPath, ( error ) => {
                    if ( error ) {
                        throw new Error(error);
                    }

                    console.log(`Screenshot saved to ${documentJpgPath}`);
                });
        }
    },

    // Saves a screenshot to a given path if a command fails.
    screenshotPath: './screenshots/errors/chrome',

};
