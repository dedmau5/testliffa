import {StartPage} from '../../../pages/start-page.js';
import FavoriteHotel from '../../../pages/apps/favorite-hotels/favorite-hotel-pageobject.js';
import HotelWeb from '../../../pages/apps/hotel-booking/index.js';
import FavoriteHeart from '../../../pages/apps/favorite-heart/favorite-heart-pageobject.js';

// for (let i = 0; i < 10; i++) {

    describe('Testing favorite hotel page', () => {
        const url = {
            favoritehotel: '/favorithotell',
            hotelweb: '/spanien/roquetas-de-mar/evenia-zoraida-resort',
        };
        let state = {};

        before(function () {
            StartPage.open();
            browser.sessionStorage("POST", {key: 'DT_TESTNAME', value: '*** webdriverio *** Favorite Hotel Page'});
            browser.sessionStorage("POST", {key: 'DT_TESTRUNID', value: 'UID'});
        });

        describe('Tests that static functionality works', () => {

            it('Should open favorite hotel', () => {
                browser.url(url.favoritehotel);
                FavoriteHotel.waitForPageToLoad();
            });

            it('Should display correct header in the list', () => {
                expect(FavoriteHotel.topPanel.returnText())
                    .to.equal('Mina favorithotell ' + '(' + FavoriteHotel.topPanel.counter.returnValue() + ')');
            });

            it('Should contain correct number of hotels', () => {
                expect(FavoriteHotel.hotels.hotelList().length).to.be.equal(FavoriteHotel.topPanel.counter.returnValue());
            });

            it('Should contain correct number of hotels', () => {
                expect(FavoriteHotel.hotels.hotelList().length).to.be.equal(FavoriteHotel.topPanel.counter.returnValue());
            });

            it('Should contain map button', () => {
                FavoriteHotel.topPanel.mapButton();
            });

            it('Should contain sort list', () => {
                FavoriteHotel.topPanel.sortingList();
            });

            it('Should see that all hotels-info exists', () => {
                for (let i = 1; i < FavoriteHotel.hotels.hotelList().length + 1; i++) {
                    expect(FavoriteHotel.hotels.hotelByIndex(i).isExisting()).to.be.true;
                    expect(FavoriteHotel.hotels.getHotelNameByIndex(i).isExisting()).to.be.true;
                    expect(FavoriteHotel.hotels.deleteButtonByIndex(i).isExisting()).to.be.true;
                    expect(FavoriteHotel.hotels.selectButton(i).isExisting()).to.be.true;
                }
            });

            it('Should save countervalue to comparison in later test', () => {
                state.initialCounterValue = FavoriteHotel.topPanel.counter.returnValue();
            });
        });

        describe('Favor a hotel and return to favorite hotel page', () => {
            it('Should add a new favorite hotel', () => {
                browser.url(url.hotelweb);
                HotelWeb.waitForPageToLoad();
            });

            it('Should favor the hotel', () => {
                FavoriteHeart.hotelweb.clickOnHeartAndExpectTextToBe("Sparad");
            });

            it('Should browse to favorite hotel', () => {
                FavoriteHotel.browseTo();
                // FavoriteHotel.waitForPageToLoad();
            });
        });

        describe('Favor a hotel and return to favorite hotel page', () => {
            it('Should add a new favorite hotel', () => {
                expect(FavoriteHotel.topPanel.counter.returnValue()).to.not.equal(state.initialCounterValue);
            });
        });

        describe('Tests the hotelconcept functionality', () => {
            it('Should select hotel concept', () => {
                FavoriteHotel.hotels.clickOnHotelConcept(1);
            });

            it('Should show concept layer', () => {
                FavoriteHotel.hotels.hotelConceptz.getHotelConceptLayer();
            });

            it('Should show concept header', () => {
                FavoriteHotel.hotels.hotelConceptz.getHotelConceptHeader();
            });

            it('Should show concept items', () => {
                FavoriteHotel.hotels.hotelConceptz.getHotelConceptItems();
            });

            it('Should close contept layer', () => {
                FavoriteHotel.hotels.hotelConceptz.closeHotelConceptLayer();
            });
        });

        describe('Tests to unfavor a hotel', () => {
            it('Should delete first favorite hotel', () => {
                FavoriteHotel.hotels.deleteFirst();

                FavoriteHotel.topPanel.counter.returnValue(0);
            });
        });
    });
// }