import {StartPage} from '../../../pages/start-page.js';
import {BookingStart} from '../../../pages/apps/booking-start/index.js';
import IndependentFlow from '../../../pages/apps/independent-flow/index.js';
import FavoriteHeart from '../../../pages/apps/favorite-heart/favorite-heart-pageobject.js';
import FavoriteHotel from '../../../pages/apps/favorite-hotels/favorite-hotel-pageobject.js';

// for (let i = 0; i < 10; i++) {

    describe('Testing favorite heart on independent-flow', () => {
        const state = {};

        it('Should open independent-flow', function () {
            StartPage.open();
            browser.sessionStorage("POST", {key: 'DT_TESTNAME', value: '*** webdriverio *** Favorite heart i Independentflow'});
            browser.sessionStorage("POST", {key: 'DT_TESTRUNID', value: 'UID'});
            BookingStart.waitUntilLoaded();
            BookingStart.city.click();
            BookingStart.waitUntilDataLoaded();
            BookingStart.search.click();
            FavoriteHeart.independentflow.waitForHeartToLoad();
            state.initialUrl = browser.getUrl();
        });

        it('Should click on heart to favor a hotel', function () {
            FavoriteHeart.independentflow.clickOnHeartAndExpectTextToBe("Sparad");
        });

        // bug in webui, popup does not work
        it.skip('Should be able to see a popup', function () {
            FavoriteHeart.independentflow.canViewPopup();
        });

        // bug in webui, popup does not work
        it.skip('Should have correct countervalue in popup', function () {
            expect(FavoriteHeart.independentflow.canSeeCounterValue()).to.equal('Hotellet tillagt till dina favoriter (1 st)');
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

        it('Should go back to independentflow', function () {
            browser.url(state.initialUrl);
            IndependentFlow.hotelList.waitUntilLoaded();

            FavoriteHeart.independentflow.waitForTextToBe("Sparad");
        });

        it('Should click on heart to unfavor a hotel', function () {
            FavoriteHeart.independentflow.clickOnHeartAndExpectTextToBe('Spara');
        });

        it('Should verify countervalue in favorite hotel', function () {
            FavoriteHotel.browseTo();

            expect(FavoriteHotel.topPanel.counter.returnValue()).to.equal(0);
        });

    });
// }