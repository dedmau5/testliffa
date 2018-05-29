import {StartPage} from '../../../pages/start-page.js';
import {BookingStart} from '../../../pages/apps/booking-start/index.js';
import CharterFlow from '../../../pages/apps/charter-flow/index.js';
import FavoriteHeart from '../../../pages/apps/favorite-heart/favorite-heart-pageobject.js';
import FavoriteHotel from '../../../pages/apps/favorite-hotels/favorite-hotel-pageobject.js';

// for (let i = 0; i < 10; i++) {

    describe('Testing favorite heart on charterflow', () => {
        const state = {};

        before(function () {
            StartPage.open();
            browser.sessionStorage("POST", {key: 'DT_TESTNAME', value: '*** webdriverio *** Favorite heart i Charterflow'});
            browser.sessionStorage("POST", {key: 'DT_TESTRUNID', value: 'UID'});
            BookingStart.waitUntilLoaded();
            BookingStart.waitUntilDataLoaded();
            BookingStart.search.click();
            FavoriteHeart.charterflow.waitForHeartToLoad();
            state.initialUrl = browser.getUrl();
        });

        it('Should click on heart to favor a hotel', function () {
            FavoriteHeart.charterflow.clickOnHeartAndExpectTextToBe("Sparad");
        });

        // bug in webui, popup does not work
        it.skip('Should be able to see a popup', function () {
            FavoriteHeart.charterflow.canViewPopup();
        });

        // bug in webui, popup does not work
        it.skip('Should have correct countervalue in popup', function () {
            expect(FavoriteHeart.charterflow.canSeeCounterValue()).to.equal('Hotellet tillagt till dina favoriter (1 st)');
        });

        it('Should click on link in the popup', function () {
            // bug in webui, popup does not work
            //FavoriteHeart.charterflow.clickOnPopupUrl();

            // below is a workaround on the above
            FavoriteHotel.browseTo();
        });

        it('Should have correct countervalue in favorite hotel', function () {
            expect(FavoriteHotel.topPanel.counter.returnValue()).to.equal(1);
        });

        it('Should go back to charterflow', function () {
            browser.url(state.initialUrl);
            CharterFlow.waitUntilLoaded();

            FavoriteHeart.charterflow.waitForTextToBe("Sparad");
        });

        it('Should click on heart to unfavor a hotel', function () {
            FavoriteHeart.charterflow.clickOnHeartAndExpectTextToBe('Spara');
        });

        it('Should verify countervalue in favorite hotel', function () {
            FavoriteHotel.browseTo();

            expect(FavoriteHotel.topPanel.counter.returnValue()).to.equal(0);
        });

    });
// }