const chalk = require('chalk');
const log = console.log;

import TestUser from '../../../../../auth';
import { Translate } from '../../../../../tools/index';


export function EnterAddressInformationForPrimaryTraveller(sharedData) {
    it("Can enter address information for the primary traveller",

        () => {
            let adressInformation = sharedData.nameCollection.nameCollection.adressInformationForPrimaryTraveller;

            adressInformation.address = Translate({
                dk: "Roskildevej 32",
                fi: "Kungsfågelgränd 1",
                no: "Torggata 16",
                se: "Rorgängargatan 23",
                globe: "Rorgängargatan 23"
            });

            adressInformation.postalCode = Translate({
                dk: "2000",
                fi: "20610",
                no: "0181",
                se: "12070",
                globe: "12070"
            });
            adressInformation.city = Translate({
                dk: "Frederiksberg",
                fi: "Åbo",
                no: "Oslo",
                se: "Stockholm",
                globe: "Stockholm"
            });

            adressInformation.mobilePhone = TestUser.phone;
            adressInformation.emailAddress = TestUser.email;
            adressInformation.confirmEmailAddress = TestUser.email;

            log(`\nAddress: ${chalk.bold(adressInformation.address)}`);
            log(`Postal code: ${chalk.bold(adressInformation.postalCode)}`);
            log(`City: ${chalk.bold(adressInformation.city)}`);
            log(`Mobile phone: ${chalk.bold(adressInformation.mobilePhone)}`);
            log(`E-mail address: ${chalk.bold(adressInformation.emailAddress)}`);
            log(`E-mail address (confirmed): ${chalk.bold(adressInformation.confirmEmailAddress)}\n`);
        }
    );
}