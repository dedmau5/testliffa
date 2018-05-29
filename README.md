# OWAutotestWDIO 

## Getting Started with Windows
1. You need to install
   - NodeJS, https://nodejs.org/en/ (preferably the LTS version)
   - yarn, https://yarnpkg.com/lang/en/docs/install/
   - Java 8, http://www.oracle.com/technetwork/java/javase/downloads/index.html
   - GIT, https://git-for-windows.github.io/
   - Graphics Magick, http://www.graphicsmagick.org/INSTALL-windows.html#retrieve-install-package
   
2. Install the following browsers:
   - Google Chrome
   - Mozilla Firefox
   - Microsoft Edge

3. Install `gulp` globally.
   ```
   npm install -g gulp
   ```

4. Checkout the source code `git clone git@github.com:ThomasCookNE/OWAutotestWDIO.git`

6. Run `yarn setup`



## Getting started with Mac OS
1. Install `brew` using instructions from https://brew.sh, then do
   ```
   brew install nodejs yarn graphicsmagick
   ```

2. You need to install Java 8. You can download it at http://www.oracle.com/technetwork/java/javase/downloads/index.html .
   If you have any Terminal window open, please restart it now to refresh the Java PATH. Verify that Java 8 is installed by running `java -version`.
   It should say something like 1.8.0.

3. Install the following browsers:
   - Google Chrome
   - Mozilla Firefox

4. Install `gulp` globally.
   ```npm install -g gulp```

5. Checkout the source code `git clone git@github.com:ThomasCookNE/OWAutotestWDIO.git`

6. Run `yarn setup`


## Set up Browserstack credentials
1. Login to, https://www.browserstack.com/accounts/settings , and scroll to the bottom. There you'll find your _Username_ and _Access Key_. 
2. Create a `.browserstack.auth.js` file in `confs` and enter the _Username_ and _Access key_.
   ```
   exports.user = "your username";
   exports.key = "your access key";
   ```


## Running Tests
There are three ways to run tests. Locally, with Jenkins or Browserstack. They are all executed through a terminal.

### Testing locally
#### GUI tests
##### As single file
`gulp test --browser chrome --language se --environment production --spec system/sanity`

##### As a test suite
`gulp test-suite --browser chrome --language se --environment production --suite system/sanity`

#### API tests
Example for running a API test or API test suite:

##### As single file
`gulp test-api --testfile ./playground/template_for_api_test.js`

##### As a test suite
`gulp test-api --suite api`

### Testing with Jenkins
The jenkins-job needs to have three basic parts. 

##### 1. Setup github-repository in the SCM-section:
Add `git@github.com:ThomasCookNE/OWAutotestWDIO.git` in `Repository-URL` and pick the `Credentials` in the dropdown which is linked to a ssh-deploykey from the github-repository

##### 2. Install the repository from the Build-section:
Add build-step `Execute windows batch command` with `yarn setup`

##### 3. Run the test from the Build-section:
Add build-step `Execute windows batch command` with `gulp test-suite --browser chrome --language se --environment production --suite system/sanity`

Settings like build-triggers such as `Build periodicly`(nightly builds) and in `Trigger builds remotely`(on octopus deploy with auth-token) is recommended. Also see other testing-jobs in jenkins to inspire the adaption of your teams job-flavours.

### Testing with Browserstack
Please see the top of `gulpfile.js` and, https://www.browserstack.com/automate/webdriverio#configure-capabilities , for all available options.

#### Against a desktop browser, Edge
Example for running the _charter_ test suite, on the _Swedish_ _production_ market unit, using _Windows 10_ and the _Edge_ browser.
```gulp test-browserstack --suite system/prio1/charter --language se --environment production --browser browserstack --browserstack_os Windows --browserstack_os_version 10 --browserstack_browser Edge --browserstack_browser_version 14
```

#### Against a desktop browser, Safari
Example for running the _charter_ test suite, on the _Swedish_ _production_ market unit, using _Mac OS X Sierra_ and the _Safari_ browser.
```gulp test-browserstack --suite system/prio1/charter --language se --environment production --browser browserstack --browserstack_os "OS X" --browserstack_os_version Sierra --browserstack_browser Safari --browserstack_browser_version 10.0
```

#### Against a mobile device
Example for running the _charter_ test suite, on the _Swedish_ _production_ market unit, using an _iPad Mini 4_.
```gulp test-browserstack --suite system/prio1/charter --language se --environment production --browser browserstack --browserstack_os iOS --browserstack_device "iPad Mini 4"
```

#### Against an internal site, like acctest
Example for running the _charter_ test suite, on the _Swedish_ _acctest_ market unit, using _Windows 10_ and the _Edge_ browser.
```gulp test-browserstack --suite system/prio1/charter --language se --environment acctest --browser browserstack --browserstack_os Windows --browserstack_os_version 10 --browserstack_browser Edge --browserstack_browser_version 14 --browserstack_local true
```

## Debugging Tests
http://webdriver.io/api/utility/debug.html

#### Debugging in VSCode
Before debugging, make sure there are no chromedrivers still running. Go into Task Manager and kill all eventual processes named `2.32-x64-chromedriver (32 bit)`. Then do the following:

* Add `debugger;` to the lines in the code you want to debug 
* Add `--debug` -flag to the startup line in the cli `gulp test-api --suite api --debug`
* Run the test and the test will stop on the line you put `debugger;` on 
* Under the debug-tab, make sure debugger is set to `Attach to Process`and press `play`-button

## Developing Tests

### Structure
#### Directories
* `./confs` symlinked. contains all configurations for running tests _locally_ or using _BrowserStack_.
* `./test-suites` contains all test suites.
* `./README.md`, `./docs` and `./docs/gen` contains all the documentation. `./docs/gen` will be empty until you run `gulp generate-docs`
* `./localization` symlinked. contains localization strings that gets reused among tests.
* `./pages` symlinked. contains the page objects that the tests then use.  
* `./playground` contains tests, experiments etc, while being developed and not ready for use.
* `./screenshots` contains screenshots taken after a test have been completed or crashed because of an error.
* `./tests` symlinked. contains all the tests.
* `./tools` symlinked. contains many useful methods you can reuse in your tests.

#### Files
* `.babelrc` contains the Babel language transpile rules used by Mocha in `./confs/wdio.conf.js` and `./confs/browserstack.conf.js` 
* `.eslintrc` contains all JavaScript linting rules this project uses.
* `.gitignore` contains all files GIT should ignore from commiting.
* `./auth.js` contains login information to _My Pages_ (_Mina Sidor_).
* `./gulpfile.js` contains all gulp tasks, like _test-browserstack_, _test-suite_, _test_, _test-api_, _generate-docs_ and _remove-compiled-typescript_.
* `./local.log` contains logging information from _BrowserStackLocal_ service.
* `package.json` contains all the project's packages.
* `README.md` this file.
* `selenium-standalone.txt` contains all log output from Selenium
* `tsconfig.json` contains all TypeScript compiler rules.
* `tslint.json` contains all TypeScript linting rules this project uses.
* `yarn.lock` is the lock file for yarn
* `./symlink.js` contains logic for symlinks within the project.

### Getting started
To get started with writing a test, please take a look at one of the following templates:
* `./playground/test_template.js`
* `./playground/test_template.ts`
* `./playground/template_for_api_test.js`

### Guidelines
1. Read up on the _Page Object_ pattern. _Page Object_ and _test_ logic **should not** be mixed in the same file.
   https://martinfowler.com/bliki/PageObject.html
2. Put all _Page Object_ logic in a suitable sub directory in `./pages`.
3. While developing your test, place it in `./playground`. When you've verified that your test works as you expect, you move into `./tests`.
4. Use the `Translate()` function in `./tools/index.js` to localize your test. Localization information that gets re-used across tests should be put into `./localization`.
5. Keep the code **simple**. Favor **readability** over _complexity_.
6. Be a good samaritan and make it _easy_ for the next developer by naming your methods _wisely_. Put some effort into choosing good names. The only time short names are allowed is when you've a medicial diagnosis of _arthritis_. The method's name should describe _exactly_ what it will do.
7. Please add _JSDoc_ comments to all your code. That will make it much easier for other developers to understand what your code does, what your method expects as input, and what they return.
8. Consider writing your tests using _TypeScript_. Careless mistakes will be lower thanks to the strict compiler.
9. Try to design your test steps as reusable blocks, and reuse them in multiple tests. 

### Recommended flow of writing at test
1. Create a directory in the _playground_ directory with an index.js (or index.ts if using _TypeScript_). You can use inspiration from already existing tests in the `./tests` directory.

2. When you feel ready to try out your test, modify `./confs/test-suites/playground.js` to include it. You can safely comment out or remove any other test residing there.
    
   **Important!** It doesn't matter if your test is written in _TypeScript_ or _JavaScript_. The test framework will transpile all _TypeScript_ to _JavaScript_. The file you add to `./confs/test-suite/playground.js` should _always_ end with `.js` 

3. Run your test!
   ```
   gulp test-suite --browser chrome --suite playground --language se --environment production
   ```
   The command above will run the test suite _playground_ against the _Swedish_ _Production_ market unit. Want to run the test against another market unit? Change the _--language_ parameter. Want to run the test against _acctest_? Change the _--environment_ parameter to _acctest_

4. When you've verified that your test works as expected, then move the test directory out of _playground_ and into _tests_.

5. Add the test to one or multiple test suites, found in `./confs/test-suites`. Remove the test from the _playground_ test suite.

## Known issues
* **Spies.dk only**: The _Gran Canaria charter test_ can't get past the _Extras_ page, because the _Total Price_ is different between page 1 (_Name Collection_) and 2 (_Extras_).

## Optional: Getting Started with WebStorm
1. Open _OWAutotestWDIO_ in WebStorm.

2. Go into _Preferences_ and expand _Languages & Frameworks_.

3. Click on _JavaScript_ and make sure _ECMAScript 6_ is chosen as _JavaScript language version_. Make sure _Only type-based completion_ is checked.

4. Expand _JavaScript_, expand _Code Quality Tools_ and click on _ESLint_. Make sure _Enable_ is checked and _Automatic search_ is chosen. 

5. Click on _Node.js and NPM_ and click on _Enable_.
 
6. Click on _TypeScript_. Make sure _Use TypeScript Service_ and _Enable TypeScript Compiler_ are checked. Make sure _Track changes_ is unchecked. Make sure _Use tsconfig.json_ is chosen.

7. Expand _TypeScript_ and click on _TSLint_. Make sure _Enable_ is checked and that the _tslint_ package in _OWAutotestWDIO/node_modules_ is chosen. Make sure _Search for tslint.json_ is chosen.

8. Click on _OK_ and you're set!

9. Notice _Gulp_ on the vertical tab to the left. Click on it. You'll see a list of available tasks. Tasks can be launched by double-clicking on them. To change task arguments, right click on a task and choose _Edit_. 

## Optional: Visual Studio Code
@JanLundholmGalante, please write this section.
