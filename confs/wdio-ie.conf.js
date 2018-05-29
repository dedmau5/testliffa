var merge = require('deepmerge');
var wdioConf = require('./wdio.conf.js');
var Registry = require('winreg');


//  Documentation can be found here:
//  https://github.com/SeleniumHQ/selenium/wiki/InternetExplorerDriver
//  https://github.com/SeleniumHQ/selenium/wiki/DesiredCapabilities


/*
  Checklist to get the IE driver working:

  1. Make sure the zoom level is set to exactly 100%.
  2. (handled automatically) Make sure 'Protected Mode' is set to the same setting for ALL zones. (Internet options > Security)
  3. (handled automatically) Make sure 'Enhanced Protected Mode' is turned off. (Internet options > Advanced > Security)
  4. (handled automatically) Run the 'fix_bfcache.reg' (as administrator) file to make sure BFCACHE is set right.
  5. (handled automatically) Make sure IE doesn't ask about it not being the default browser.
*/


// Uncomment this if you'd like to test against a 32-bit IE in a 64-bit Windows environment.
var seleniumArgs = {
    drivers: {
        ie: {
            arch: "ia32",
            baseURL: "https://selenium-release.storage.googleapis.com"
        }
    }
};

exports.config = merge(wdioConf.config, {
    capabilities: [{
        maxInstances: 1,
        browserName: 'internet explorer',
        requireWindowFocus: true,
        browserAttachTimeout: 30000,
        "ie.ensureCleanSession": true
    }],

    // Saves a screenshot to a given path if a command fails.
    screenshotPath: './screenshots/errors/ie',
    services: ['selenium-standalone'],

    // Uncomment this (and the variable called 'seleniumArgs' above),  if you'd like to test against a 32-bit IE in a
    // 64-bit Windows environment.
    seleniumArgs: seleniumArgs,
    seleniumInstallArgs: seleniumArgs  // This option seems to be undocumented.
});

// Fixes 3, 5 and 6 seen in the checklist above.
if (process.platform.startsWith("win")) {
    // Make sure all zones have Protected Mode enabled
    var protectedMode = {
        zone1: new Registry({
            hive: Registry.HKCU,
            key:  '\\Software\\Microsoft\\Windows\\CurrentVersion\\Internet Settings\\Zones\\1'
        }),

        zone2: new Registry({
            hive: Registry.HKCU,
            key:  '\\Software\\Microsoft\\Windows\\CurrentVersion\\Internet Settings\\Zones\\2'
        }),

        zone3: new Registry({
            hive: Registry.HKCU,
            key:  '\\Software\\Microsoft\\Windows\\CurrentVersion\\Internet Settings\\Zones\\3'
        }),

        zone4: new Registry({
            hive: Registry.HKCU,
            key:  '\\Software\\Microsoft\\Windows\\CurrentVersion\\Internet Settings\\Zones\\4'
        }),
    };

    protectedMode.zone1.set("2500", Registry.REG_DWORD, "0", (err) => {if (err) {console.log(err);}});
    protectedMode.zone2.set("2500", Registry.REG_DWORD, "0", (err) => {if (err) {console.log(err);}});
    protectedMode.zone3.set("2500", Registry.REG_DWORD, "0", (err) => {if (err) {console.log(err);}});
    protectedMode.zone4.set("2500", Registry.REG_DWORD, "0", (err) => {if (err) {console.log(err);}});


    // Fix the BFCache setting
    // var bfcache = {
    //     ie32: new Registry({
    //         hive: Registry.HKLM,
    //         key:  '\\SOFTWARE\\Microsoft\\Internet Explorer\\MAIN\\FeatureControl\\FEATURE_BFCACHE'

    //     }),
    //     ie64: new Registry({
    //         hive: Registry.HKLM,
    //         key:  '\\SOFTWARE\\Wow6432Node\\Microsoft\\Internet Explorer\\MAIN\\FeatureControl\\FEATURE_BFCACHE'
    //     })
    // };

    // const bfcacheSetCallback = (err) => {
    //     if (err && err.code === 1) {
    //         console.log("Access was denied! Couldn't set the DWORD key 'iexplore.exe' in FEATURE_BFCACHE to 0.");
    //         console.log("Keys:");
    //         console.log("\\SOFTWARE\\Microsoft\\Internet Explorer\\MAIN\\FeatureControl\\FEATURE_BFCACHE");
    //         console.log("\\SOFTWARE\\Wow6432Node\\Microsoft\\Internet Explorer\\MAIN\\FeatureControl\\FEATURE_BFCACHE");
    //         console.log("You can fix this by running 'fix_bfcache.reg' as Administator.");
    //         process.exit(1);
    //     } else if (err) {
    //         console.log(err.name);
    //         console.log(err.message.trim());
    //         console.log(err.code);
    //     }
    // };

    // // const bfcacheGetCallback = (err, item) => {
    // //     if (item.key === bfcache.ie32.key && item.value !== "0x0") {
    // //         bfcache.ie32.set("iexplore.exe", Registry.REG_DWORD, "0", bfcacheSetCallback);
    // //     }

    // //     if (item.key === bfcache.ie64.key && item.value !== "0x0") {
    // //         bfcache.ie32.set("iexplore.exe", Registry.REG_DWORD, "0", bfcacheSetCallback);
    // //     }
    // // };

    // const bfcacheGetCallback = (err, item) => {
    //     if (item && item.key === bfcache.ie32.key && item.value !== "0x0") {
    //         bfcache.ie32.set("iexplore.exe", Registry.REG_DWORD, "0", bfcacheSetCallback);
    //     }

    //     if (item && item.key === bfcache.ie64.key && item.value !== "0x0") {
    //         bfcache.ie64.set("iexplore.exe", Registry.REG_DWORD, "0", bfcacheSetCallback);
    //     }
    // };

    // for (var browserArchitecture in bfcache) {
    //     bfcache[browserArchitecture].create(() => {
    //         bfcache[browserArchitecture].set("iexplore.exe", Registry.REG_DWORD, "0", bfcacheSetCallback);
    //     });
    //     bfcache[browserArchitecture].get("iexplore.exe", bfcacheGetCallback);
    // }

    // Make sure IE doesn't ask about not being the default browser
    var checkAssociations = new Registry(({
        hive: Registry.HKCU,
        key: "\\Software\\Microsoft\\Internet Explorer\\Main"
    }));

    checkAssociations.set("Check_Associations", Registry.REG_SZ, "no", (err) => {if (err) {console.log(err);}});
}