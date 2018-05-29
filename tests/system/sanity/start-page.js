// import { StartPage } from '../../../pages/start-page.js';
import { StartPage } from 'pages/start-page.js';
import { Translate } from 'tools/index';


describe(
    'Testing StartPage',

    () => {
        it('has title', () => {
            StartPage.open();
            browser.sessionStorage("POST", {key: 'DT_TESTNAME', value: '*** webdriverio *** Testing StartPage'});
            browser.sessionStorage("POST", {key: 'DT_TESTRUNID', value: 'UID'});
            //browser.sessionStorage.DT_STARTPAGE = "*** webdriverio *** Testing StartPage";
            //browser.sessionStorage.DT_TESTRUNID = "UID";
            //var storage = browser.sessionStorage();
            //console.log("sessionStorage: " + storage);
            //console.log("sessionStorage DT_TESTRUNID: " + browser.sessionStorage.DT_TESTRUNID);

            StartPage.title.should.contain(
                Translate({
                    dk: "Rejser med Spies - Ferier du ikke vil hjem fra | Spies Rejser",
                    fi: "Matkat, äkkilähdöt, lennot ja hotellit – Matkatoimisto Tjäreborg",
                    no: "Ving | Reiser med charter- og rutefly - Bestill ferien her",
                    se: 'Vi kan resor! Låt oss ta hand om din semester - Ving',
                    globe: 'Globetrotter - kryssningar och andra resor i hela världen'
                })
            );
            //browser.pause(50000);
        });
    //    browser.execute(dynaTrace.endVisit());
    }
);
