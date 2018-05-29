import { StartPage } from '../../../pages/start-page';
import { BookingStart } from '../../../pages/apps/booking-start/index';
import CharterFlow from '../../../pages/apps/charter-flow/index';
import HotelBooking from '../../../pages/apps/hotel-booking/index';
import NameCollection from '../../../pages/apps/namecollection/namecollection-pageobject';

describe('Testing charterflow e2e from startpage to namecollection', function () {
  this.retries(2);
  const state = {};

  before(() => {
    StartPage.open();
    BookingStart.waitUntilLoaded();
    BookingStart.waitUntilDataLoaded();
    BookingStart.package.datepicker.open();
    BookingStart.package.datepicker.selectDate(2018, 7, 15, true);
    BookingStart.search.click();
    state.initialUrl = browser.getUrl();
  }, 2);

  describe('Steps on charterflow-page', () => {
    it('Should land on charterflow', () => {
      CharterFlow.waitForPageToLoad();
      CharterFlow.waitUntilLoaded();
    });

    it('Should choose to proceed to hotelweb', () => {
      const fifthFlightOffer = '.tcne-cf-flightoffers :nth-child(5) .wdio-day';
      const errorMessage = '.webui-message__header';

      if (browser.isExisting(errorMessage)) {
        const text = browser.getText(errorMessage);
        if (text === 'Tyvärr finns det inga tillgängliga resor på valt datum.') {
          browser.click(fifthFlightOffer);
          browser.pause(3000);
          CharterFlow.waitForPageToLoad();
          CharterFlow.waitUntilLoaded();
        }
      }

      CharterFlow.clickOnFirstHotel();
    });
  });

  describe('Steps on hotelweb-page', () => {
    it('Should land on hotelweb', () => {
      HotelBooking.waitForPageToLoad();
    });

    it('Should scroll down to charter-pricematrix', () => {
      browser.scroll('.bookingstart-section__search-button');
    });

    it('Should wait for everyone to load before proceeeding', () => {
      browser.waitUntil(
        () => browser.isVisible(HotelBooking.selectors.charterPriceMatrix.selectedPrice) === true,
        30000, 'expected charterpricematrix to be displayed and showing a selected price within 30s',
      );
      browser.pause(5000);
    });

    it('Should choose to proceed to namecollection', () => {
      browser.scroll(HotelBooking.selectors.charterPriceMatrix.button, -0, -300);
      browser.click(HotelBooking.selectors.charterPriceMatrix.button);
    });
  });

  describe('Steps on namecollection', () => {
    it('Should land on namecollection', () => {
      NameCollection.waitForPageToLoad();
    });
  });
});
