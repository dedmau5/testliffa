import {
    getRandomIntegerBetween
} from '../tools';

import {
    locateElementAndClickOnIt
} from '../tools/elements';

import { StartPage } from '../pages/start-page';
import { CharterPriceMatrix } from '../pages/apps/charter-price-matrix';

describe(
    'Hello world',

    () => {
        it('Start page is open', () => {
            StartPage.open();
        });

        it('Navigate to Chater Price Matrix', () => {
            locateElementAndClickOnIt("#price-matrix-app-root > div > div > ul > li:nth-child(4) > a");
        });

        it('Wait until Charter Price Matrix is loaded', () => {
            CharterPriceMatrix.waitUntilLoaded();
        });

        it('Can click on next 2 times', () => {
            browser.pause(1000);
            //CharterPriceMatrix.next();
            browser.pause(1000);
            //CharterPriceMatrix.next();
        });

        it('Can select a date', () => {
            const dates = CharterPriceMatrix.dates;
            console.log(dates);
            dates[getRandomIntegerBetween(0, dates.length)].click();
            browser.pause(5000);
        });

        /*it("Fill Booking start", () => {
            expect(BookingStartLegacy.dropdowns.fromWhere.select(Cities.Stockholm)).to.equal(true);
            BookingStartLegacy.dropdowns.toWhere.select(Countries.Spain);
            BookingStartLegacy.dropdowns.resort.select(Resorts.Spain.GranCanaria);
        });*/
    }
);