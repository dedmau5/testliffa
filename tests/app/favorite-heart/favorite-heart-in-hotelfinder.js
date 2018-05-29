import {StartPage} from '../../../pages/start-page.js';
import {HotelFinderWebPage} from "../../../pages/apps/hotel-finder-web/hotel-finder-pageobject.js";
import FavoriteHeart from '../../../pages/apps/favorite-heart/favorite-heart-pageobject.js';
import FavoriteHotel from '../../../pages/apps/favorite-hotels/favorite-hotel-pageobject.js';

// for (let i = 0; i < 10; i++) {

    describe('Testing favorite heart on hotelfinder', () => {
        it('Should open hotelfinder-page', function () {
            StartPage.open();
            browser.sessionStorage("POST", {key: 'DT_TESTNAME', value: '*** webdriverio *** Favorite heart i Hotelfinder'});
            browser.sessionStorage("POST", {key: 'DT_TESTRUNID', value: 'UID'});
            HotelFinderWebPage.browseTo();
            HotelFinderWebPage.waitUntilLoaded();
            FavoriteHeart.hotelfinder.waitForHeartToLoad();
        });

        it('Should click on heart to favor a hotel', function () {
            FavoriteHeart.hotelfinder.clickOnHeartAndExpectTextToBe("Sparad");
        });

        it('Should be able to see a popup', function () {
            FavoriteHeart.hotelfinder.canViewPopup();
        });

        it('Should have correct countervalue in popup', function () {
            expect(FavoriteHeart.hotelfinder.canSeeCounterValue()).to.equal('Hotellet tillagt till dina favoriter (1 st)');
        });


        it('Should click on link in the popup', function () {
            FavoriteHeart.hotelfinder.clickOnPopupUrl();
            FavoriteHotel.waitForPageToLoad();
        });

        it('Should have correct countervalue in favorite hotel', function () {
            expect(FavoriteHotel.topPanel.counter.returnValue()).to.equal(1);
        });

        it('Should go back to hotelfinder', function () {
            HotelFinderWebPage.browseTo();
            FavoriteHeart.hotelfinder.waitForTextToBe("Sparad");
        });

        it('Should click on heart to unfavor a hotel', function () {
            FavoriteHeart.hotelfinder.clickOnHeartAndExpectTextToBe('Spara');
        });

        it('Should verify countervalue in favorite hotel', function () {
            FavoriteHotel.browseTo();

            expect(FavoriteHotel.topPanel.counter.returnValue()).to.equal(0);
        });
    });
// }