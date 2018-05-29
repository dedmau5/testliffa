// Documentation:
// http://webdriver.io/guide/testrunner/configurationfile.html
// https://github.com/webdriverio/webdriverio/blob/master/docs/guide/getstarted/configuration.md
let moment = require('moment'), gm = require('gm'), path = require('path');
let { CreateMapFromTestDictionary } = require('../tools/build');
const util = require('gulp-util');

// get debug argument from gulp command. Set boolean value
const debug = util.env.debug === true || util.env.debug === 'true';
const execArgv = debug ? ['--inspect-brk'] : [];

exports.config = {
  baseUrl: 'https://www.ving.se',

  specs: [],

  // Patterns to exclude.
  exclude: [
    // 'path/to/excluded/files'
  ],

  maxInstances: 1,
  execArgv: execArgv,

  sync: true,
  logLevel: 'error', // allowed: silent | verbose | command | data | result | error
  coloredLogs: true,

  connectionRetryCount: 3,
  waitforTimeout: 10000,
  connectionRetryTimeout: 90000,

  framework: 'mocha',
  reporters: ['spec', 'junit', 'mochawesome'],
  mochawesomeOpts: {
    includeScreenshots: true,
    screenshotUseRelativePath: true,
  },
  reporterOptions: {
    outputDir: 'reports/',
    junit: {
      outputDir: './',
    },
  },
  plugins: {
    'wdio-screenshot': {},
  },

  screenshotOnReject: {
    connectionRetryTimeout: 10000,
    connectionRetryCount: 3,
  },

  mochaOpts: {
    bail: true, // Stops the test after the first fail.
    compilers: ['js:babel-register'],
    timeout: 1000000,
    ui: 'bdd',
  },

  seleniumLogs: './',
  debug: false, // debug,

  // beforeSession: function (config, capabilities, specs) {
  //     // console.log(config);
  // },

  before: function(capabilities, specs) {
    const isTestSuiteWithPersona =
      Array.isArray(browser.options.tc.testSuite) === false;
    if (isTestSuiteWithPersona) {
      const currentTest = specs[0];
      const relativePathToCurrentTestFile = path.relative(
        process.cwd(),
        currentTest
      );
      const normalizePathToCurrentTestFile = path.normalize(
        relativePathToCurrentTestFile
      );
      const suiteMap = CreateMapFromTestDictionary(
        browser.options.tc.testSuite
      );

      browser.options.tc.testSuiteMap = suiteMap;

      if(browser.options.tc.testSuite){
        browser.options.tc.personas = suiteMap.get(
          normalizePathToCurrentTestFile
        ).personas;
      }
    }

    // http://chaijs.com/guide/styles/
    var chai = require('chai');
    chai.config.truncateThreshold = 0;
    chai.config.includeStack = true;

    global.expect = chai.expect;
    global.should = chai.should();

    browser.windowHandleMaximize();
  },

  after: function() {
    // let
    //     datestamp = moment().format("YYYYMMDD_HHmmss"),
    //     viewportJpgPath = `./screenshots/teardown_viewport_${datestamp}.jpg`,
    //     documentJpgPath = `./screenshots/teardown_document_${datestamp}.jpg`;
    // if ( browser.getViewportSize().width < 996 ) {
    //     gm( Buffer.from( browser.saveViewportScreenshot(), 'base64' ) )
    //         .setFormat("jpg")
    //         .write( viewportJpgPath, ( error ) => {
    //             if ( error ) {
    //                 throw new Error(error);
    //             }
    //             console.log(`Screenshot saved to ${viewportJpgPath}`);
    //         });
    // }
    // if ( browser.getViewportSize().width >= 996 ) {
    //     gm( Buffer.from( browser.saveDocumentScreenshot(), 'base64' ) )
    //         .setFormat("jpg")
    //         .write( documentJpgPath, ( error ) => {
    //             if ( error ) {
    //                 throw new Error(error);
    //             }
    //             console.log(`Screenshot saved to ${documentJpgPath}`);
    //         });
    // }
  },
  afterTest(test) {
    if (!test.passed) {
      console.log('Test failed on:', browser.getUrl());
    }
  },
};
