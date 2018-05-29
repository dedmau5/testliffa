import {StartPage} from '../../../pages/start-page.js';
import HotelBooking from '../../../pages/apps/hotel-booking/index.js';
import FavoriteHeart from '../../../pages/apps/favorite-heart/favorite-heart-pageobject.js';
import FavoriteHotel from '../../../pages/apps/favorite-hotels/favorite-hotel-pageobject.js';

// for (let i = 0; i < 10; i++) {

    describe('Testing favorite heart on hotelweb', () => {
        const state = {};

        // https://www.ving.se/kanarieoarna/puerto-de-la-cruz/hotel-botanico
        it('Should open hotelweb-page', function () {
            StartPage.open('kanarieoarna/puerto-de-la-cruz/hotel-botanico');
            browser.sessionStorage("POST", {key: 'DT_TESTNAME', value: '*** webdriverio *** Favorite heart i Hotelweb'});
            browser.sessionStorage("POST", {key: 'DT_TESTRUNID', value: 'UID'});
            FavoriteHeart.hotelweb.waitForHeartToLoad();
            state.initialUrl = browser.getUrl();
        });

        it('Should click on heart to favor a hotel', function () {
            FavoriteHeart.hotelweb.clickOnHeartAndExpectTextToBe("Sparad");
        });

        // bug in webui, popup does not work
        it.skip('Should be able to see a popup', function () {
            FavoriteHeart.hotelweb.canViewPopup();
        });

        // bug in webui, popup does not work
        it.skip('Should have correct countervalue in popup', function () {
            expect(FavoriteHeart.hotelweb.canSeeCounterValue()).to.equal('Hotellet tillagt till dina favoriter (1 st)');
        });


        it('Should click on link in the popup', function () {
            // bug in webui, popup does not work
            //FavoriteHeart.hotelweb.clickOnPopupUrl();

            // below is a workaround on the above
            FavoriteHotel.browseTo();
        });

        it('Should have correct countervalue in favorite hotel', function () {
            expect(FavoriteHotel.topPanel.counter.returnValue()).to.equal(1);
        });

        it('Should go back to hotelpage', function () {
            browser.url(state.initialUrl);
            HotelBooking.waitForPageToLoad();

            FavoriteHeart.hotelweb.waitForTextToBe("Sparad");
        });

        it('Should click on heart to unfavor a hotel', function () {
            FavoriteHeart.hotelweb.clickOnHeartAndExpectTextToBe('Spara');
        });

        it('Should verify countervalue in favorite hotel', function () {
            FavoriteHotel.browseTo();

            expect(FavoriteHotel.topPanel.counter.returnValue()).to.equal(0);
        });
    });
// }