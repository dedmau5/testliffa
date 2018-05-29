const moment = require('moment');
import { Translate } from '../../../../../tools/index';


const language = browser.options.tc.language;


/**
 * @param settings {Object}
 */
export function MakeLocalizationPreparations( settings ) {
    it(`Make localization preparations for: ${language}`, () => {
        moment.locale(language);

        settings.departFrom = Translate({
            dk: "København",
            fi: "Helsinki",
            no: "Oslo, Gardermoen",
            se: "Stockholm-Arlanda",
            globe: "Stockholm-Arlanda"
        });

        settings.destination = Translate({
            dk: "Storbritannien",
            fi: "Iso-Britannia",
            no: "Storbritannia",
            se: "Storbritannien",
            globe: "Storbritannien",
        });

        settings.resort = Translate({
            dk: "London",
            fi: "Lontoo",
            no: "London",
            se: "London",
            globe: "London"
        });
    });
}