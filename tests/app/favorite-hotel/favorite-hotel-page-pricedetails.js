import {StartPage} from '../../../pages/start-page.js';
import {BookingStart} from '../../../pages/apps/booking-start/index.js';
import CharterFlow from '../../../pages/apps/charter-flow/index.js';
import FavoriteHotel from '../../../pages/apps/favorite-hotels/favorite-hotel-pageobject.js';
import FavoriteHeart from '../../../pages/apps/favorite-heart/favorite-heart-pageobject.js';

// for (let i = 0; i < 10; i++) {

    describe('Testing favorite hotel page', () => {
        let state = {};

        before(function () {
            StartPage.open();
            browser.sessionStorage("POST", {key: 'DT_TESTNAME', value: '*** webdriverio *** Favorite Hotel Page Pricedetails'});
            browser.sessionStorage("POST", {key: 'DT_TESTRUNID', value: 'UID'});
            BookingStart.waitUntilLoaded();
            BookingStart.package.click();
            BookingStart.waitUntilDataLoaded();
            BookingStart.search.click();
            CharterFlow.waitForPageToLoad();
            CharterFlow.waitUntilLoaded();
            FavoriteHeart.charterflow.clickOnHeartAndExpectTextToBe("Sparad");
            FavoriteHotel.browseTo();
            FavoriteHotel.waitForPageToLoad();
        });

        describe('Verifys price details', () => {
            it('Should remember hotelname for comparison in later test', () => {
                state.htlHeader = FavoriteHotel.hotels.getHotelNameByIndex(1);
            });

            it('Should click on pricedetails-link', () => {
                FavoriteHotel.hotels.priceDetails.clickOnLinkByIndex(1);
            });

            it('Should show pricedetails layer', () => {
                FavoriteHotel.hotels.priceDetails.waitForLayerToExist();
            });

            it('Should contain correct hotelname', () => {
                expect(FavoriteHotel.hotels.priceDetails.getHotelName()).to.equal(state.htlHeader);
            });

            it('Should contain a image', () => {
                FavoriteHotel.hotels.priceDetails.waitForImageToExist();
            });

            it('Should contain a trip details table', () => {
                FavoriteHotel.hotels.priceDetails.waitForTripDetailsTableToExist();
            });

            it('Should contain multiple trip detail rows', () => {
                FavoriteHotel.hotels.priceDetails.waitForTripDetailsRowsToExist();
            });

            it('Should contain a totalprice', () => {
                FavoriteHotel.hotels.priceDetails.waitForTotalpriceToExist();
            });

            it('Should close price spec', () => {
                FavoriteHotel.hotels.priceDetails.closePriceSpec();
            });
        });

    });

// }