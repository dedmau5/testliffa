const moment = require('moment');
import { Translate } from '../../../../tools/index';


const language = browser.options.tc.language;


export function MakeLocalizationPreparations(settings) {
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
            dk: "Spanien",
            fi: "Espanja",
            no: "Spania",
            se: "Spanien",
            globe: "Spanien"
        });

        settings.area = Translate({
            dk: "Gran Canaria",
            fi: "Gran Canaria",
            no: "Gran Canaria",
            se: "Gran Canaria",
            globe: "Gran Canaria"
        });

        settings.resort = Translate({
            dk: "Alle rejsemål",
            no: "Alle reisemål",
            fi: "Kaikki kohteet",
            se: "Alla resmål",
            globe: "Alla resmål"
        });

        settings.travelDuration = Translate({
            dk: "1 uge",
            fi: "1 viikko",
            no: "1 uke",
            se: "1 vecka",
            globe: "1 vecka"
        });

        settings.lms = Translate({
            dk: "/afbudsrejser",
            fi: "/akkilahdot",
            no: "/restplasser",
            se: "/sista-minuten-resor"
        });


    });
}