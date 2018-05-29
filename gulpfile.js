
const path = require('path');
const fs = require('fs');

const gulp = require('gulp');
const mocha = require('gulp-mocha');
const webdriver = require('gulp-webdriver');
const jsdoc = require('gulp-jsdoc3');
const sourcemaps = require('gulp-sourcemaps');
const util = require('gulp-util');

const testEnvironments = Object.keys(require('./confs/urls.js').baseUrls).join('|');

const requiredArgumentsAndTheirOptions = {
  browser: 'browserstack|chrome|edge|firefox|ie|safari',
  language: 'dk|fi|no|se|globe',
  environment: testEnvironments,
  suite: fs
    .readdirSync(path.join('test-suites'))
    .join('|')
    .replace(new RegExp('.js', 'g'), ''),
};

const browserstackOptions = {
  /* Please visit
     https://www.browserstack.com/automate/webdriverio#configure-capabilities
     for more information. */
  browserstack_os: ['Windows', 'OS X', 'Android', 'iOS'].join('|'),
  browserstack_os_version: [
    'XP',
    '7',
    '8',
    '8.1',
    '10', // Windows
    'Sierra',
    'El Capitan',
    'Yosemite',
    'Mavericks',
    'Mountain Lion',
    'Lion',
    'Snow Leopard', // OS X
  ].join('|'),
  browserstack_browser: [
    'Chrome', // Windows XP, Windows 7-10, OS X
    'Edge', // Windows 10
    'Firefox', //
    'IE', // Windows XP, Windows 7-10
    'Opera', // Windows XP, Windows 7-8.1, OS X
    'Safari', // OS X
  ].join('|'),
  browserstack_browser_version: [
    'latest',
    '51.0', // Firefox
    '56.0', // Chrome
    '13.0',
    '14.0', // Edge
    '6.0',
    '7.0',
    '8.0',
    '9.0',
    '10.0',
    '11.0', // IE
    '12.16',
    '12.15', // Opera
  ].join('|'),
  browserstack_device: 'any|any',
  browserstack_local: 'true|false',
  browserstack_debug: 'true|false',
};

const timeouts = {
  page_load: 300000,
  script: 30000,
  implicit: 0,
};

function getOptionalArgumentsAndTheirOptions() {
  const optionalArgumentsAndTheirOptions = browserstackOptions;

  const pathToPersonas = path.join('confs', 'personas');

  if (fs.existsSync(pathToPersonas)) {
    optionalArgumentsAndTheirOptions.persona = fs
      .readdirSync(pathToPersonas)
      .join('|')
      .replace(new RegExp('.js', 'g'), '');
  }

  return optionalArgumentsAndTheirOptions;
}

function parseTestSuiteArguments() {
  const optionalArgumentsAndTheirOptions = getOptionalArgumentsAndTheirOptions();

  const requiredArguments = Object.keys(requiredArgumentsAndTheirOptions);
  const allRequiredArgumentHasBeenProvided = requiredArguments.every(argument => argument in util.env);

  if (!allRequiredArgumentHasBeenProvided) {
    for (const argument of requiredArguments) {
      const argumentIsProvided = argument in util.env;
      const hasAValidOption = argumentIsProvided && requiredArgumentsAndTheirOptions[argument].split('|').some(listItem => util.env[argument] === listItem);

      if (!argumentIsProvided || !hasAValidOption) {
        throw new Error(`Missing required argument or valid option for --${argument}, options: ${requiredArgumentsAndTheirOptions[argument]}`);
      }
    }
  }

  const optionalArguments = Object.keys(optionalArgumentsAndTheirOptions);

  const validProvidedOptionalArguments = optionalArguments.filter((argument) => {
    const argumentIsProvided = argument in util.env;
    const givenOptionIsValidForGivenArgument =
      argumentIsProvided &&
      optionalArgumentsAndTheirOptions[argument].split('|').some((listItem) => {
        const arg = util.env[argument];

        if (listItem === 'any') {
          return true;
        }

        if (typeof arg === 'number') {
          return arg.toString() === listItem || `${arg.toString()}.0` === listItem;
        }

        return util.env[argument] === listItem;
      });

    return givenOptionIsValidForGivenArgument;
  });

  const parsedArgumentAndTheirValues = Object.keys(requiredArgumentsAndTheirOptions)
    .concat(validProvidedOptionalArguments)
    .reduce(
      (accumulator, argument) => {
        accumulator[argument] = util.env[argument];
        return accumulator;
      },
      {} // Initial value, accumulator will become this value during the first iteration.
    );

  return parsedArgumentAndTheirValues;
}

gulp.task('test-browserstack', () => {
  const args = parseTestSuiteArguments();

  const testsInArgs = require(`./test-suites/${args.suite}.js`).tests;
  const testFiles = Array.isArray(testsInArgs) ? testsInArgs : Object.keys(testsInArgs);

  if (args.browser === 'browserstack') {
    if (args.browserstack_os === 'iOS' || args.browserstack_os === 'Android') {
      if (!args.browserstack_device) {
        throw new Error('You must provide the argument browserstack_device!');
      }
    } else {
      if (!args.browserstack_os) {
        throw new Error('You must provide the argument browserstack_os!');
      }

      if (!args.browserstack_os_version) {
        throw new Error('You must provide the argument browserstack_os_version!');
      }

      if (!args.browserstack_browser) {
        throw new Error('You must provide the argument browserstack_browser!');
      }

      if (!args.browserstack_browser_version) {
        throw new Error('You must provide the argument browserstack_browser_version!');
      }
    }

    if (args.browserstack_debug) {
      args.browserstack_debug = args.browserstack_debug === 'true';
    }
  }

  return gulp
    .src(path.join('confs', 'browserstack.conf.js'), { base: './' })
    .pipe(sourcemaps.init())
    .pipe(sourcemaps.write())
    .pipe(webdriver({
      tc: {
        environment: args.environment,
        language: args.language,
        testSuite: require(`./test-suites/${args.suite}.js`).tests,
      },

      timeouts,
      specs: testFiles,
    }));
});

gulp.task('test-suite', () => {
  const args = parseTestSuiteArguments();

  const testsInArgs = require(`./test-suites/${args.suite}.js`).tests;
  const testFiles = Array.isArray(testsInArgs) ? testsInArgs : Object.keys(testsInArgs);

  return gulp
    .src(path.join('confs', `wdio-${args.browser}.conf.js`), { base: './' })
    .pipe(sourcemaps.init({ loadMaps: false }))
    .pipe(sourcemaps.identityMap())
    .pipe(sourcemaps.write())
    .pipe(webdriver({
      tc: {
        environment: args.environment,
        language: args.language,
        testSuite: require(`./test-suites/${args.suite}.js`).tests,
      },

      specs: testFiles,

      timeouts,
    }));
});

gulp.task('test', () =>
  gulp
    .src(path.join('confs', `wdio-${util.env.browser}.conf.js`), { base: './' })
    .pipe(sourcemaps.init({ loadMaps: false }))
    .pipe(sourcemaps.identityMap())
    .pipe(sourcemaps.write())
    .pipe(webdriver({
      tc: {
        environment: util.env.environment,
        language: util.env.language,
      },
      specs: `./tests/${util.env.spec}.js`,
      timeouts,
    })));

gulp.task('test-api', () => {
  if (!util.env.suite && !util.env.testfile) {
    throw new Error('You must provide a test suite (--suite my-suite) or test file (--testfile test.js) parameter!');
  }

  if (util.env.suite) {
    const { tests } = require(`./test-suites/app/api/${util.env.suite}.js`);
    gulp
      .src(tests, { read: false })
      .pipe(mocha({ compilers: 'js:babel-core/register', reporter: 'spec', timeout: 2000 }))
      .on('error', process.exit.bind(process, 1));
  } else {
    gulp
      .src(util.env.testfile, { read: false })
      .pipe(mocha({ compilers: 'js:babel-core/register', reporter: 'spec', timeout: 2000 }))
      .on('error', process.exit.bind(process, 1));
  }
});

gulp.task('generate-docs', cb => gulp.src(['./README.md', './localization/**/*.js', './pages/**/*.js', './tests/**/*.js', './tools/**/*.js'], { read: false }).pipe(jsdoc(cb)));
