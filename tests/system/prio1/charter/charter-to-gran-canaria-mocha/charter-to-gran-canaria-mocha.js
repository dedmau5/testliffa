import moment from 'moment';
import { Translate } from '../../../../../tools/index';
import { StartPage } from 'pages/start-page';
import { BookingStart } from 'pages/apps/booking-start/index';
import CharterFlow from 'pages/apps/charter-flow/index';
import charterPriceMatrix from 'pages/apps/charter-price-matrix/index';
import { HandleTheNameCollection } from '../../common/name-collection';
import { HandleExtras } from 'tests/system/prio1/charter/charter-to-gran-canaria/extras.js';
import {
  CanNavigateToMyPage,
  CanLocateAGivenBookingByBookingNumberAndGoToItsBookingAndPaymentPage,
  CanGoToTheBookingCancellationPageAndCancelTheBooking,
  CanConfirmTheCancellation,
} from '../../common/my-page';
import { CanConfirmTheBooking } from '../../common/booking/can-confirm-the-booking';
import { CanNavigateToLogin } from 'tests/system/sanity/login-logout/can-navigate-to-login';
import { CanEnterEmailAndPassword } from 'tests/system/sanity/login-logout/can-enter-email-and-password';
import { CanLogin } from 'tests/system/sanity/login-logout/login-logout.js';

/**
 *
 * This test is an end-2-end test going from search in booking start to result page, choosing hotel,
 * verifying hotel page, handelling name collection, booking and lastly cancelling booking on MyPage
 */
describe('Charter Package: Gran Canaria ', () => {
  // shared data between tests
  let sharedData = {
    hotelName: null,
  };

  const departureDate = moment(new Date()).add(4, 'months');
  const settings = {
    departure: Translate({
      dk: '',
      fi: '',
      no: '',
      se: 'Stockholm-Arlanda',
      globe: '',
    }),
    destination: Translate({
      dk: '',
      fi: '',
      no: '',
      se: 'Spanien',
      globe: '',
    }),
    area: Translate({ dk: '', fi: '', no: '', se: 'Gran Canaria', globe: '' }),
    resort: Translate({ dk: '', fi: '', no: '', se: 'Alla resmål', globe: '' }),
    duration: {
      visible: true,
      length: Translate({ dk: '', fi: '', no: '', se: '1 vecka' }),
    },
    date: {
      departure: {
        year: departureDate.year(),
        month: departureDate.month() + 1,
        day: departureDate.date(),
        allowChoosingNearByDate: true,
        numberOfNearbyMonthsToAllow: 4,
      },
      return: {},
    },
    travellers: {
      adults: 2,
    },
  };

  describe('Initialize Bookingstart', () => {
    it('Can open start page', function() {
      StartPage.open();
      browser.sessionStorage('POST', {
        key: 'DT_TESTNAME',
        value: '*** webdriverio *** Charter Package - mocha',
      });
      browser.sessionStorage('POST', { key: 'DT_TESTRUNID', value: 'UID' });
    });

    it('Wait until Booking Start has Finished Loading', function() {
      BookingStart.waitUntilLoaded();
      BookingStart.waitUntilDataLoaded();
    });
  });

  /**
   * booking start
   */
  describe('Perform search', () => {
    it(`Can select ${settings.departure} as departure`, () => {
      expect(
        BookingStart.package.departure.select(settings.departure)
      ).to.equal(true, `Couldn't find ${settings.departure} and click on it!`);
    });

    it(`Can select ${settings.destination} as country`, () => {
      BookingStart.package.destination.open();
      expect(
        BookingStart.package.destination.country.toggle(settings.destination)
      ).to.equal(true, `Couldn't find country and click on it!`);
    });

    it(`Can select ${settings.area}`, () => {
      expect(
        BookingStart.package.destination.area.toggle(settings.area)
      ).to.equal(true, `Couldn't find resort and click on it!`);
    });

    it(`Can select all resorts in ${settings.area}`, () => {
      expect(
        BookingStart.package.destination.resort.select(settings.resort)
      ).to.equal(
        true,
        `Couldn't find all resorts under mallorca and click on it!`
      );
    });

    it('Can click on Duration', () => {
      BookingStart.package.duration.open();
    });

    it(`Can select on ${settings.duration.length} in duration list`, () => {
      expect(
        BookingStart.package.duration.select(settings.duration.length)
      ).to.equal(true, `Couldn't click desired duration item!`);
    });

    it('Can click on "Calendar"', () => {
      BookingStart.package.datepicker.open();
    });

    it(`Can select departure date ${settings.date.departure.year}-${
      settings.date.departure.month
    }-${settings.date.departure.day}`, () => {
      const date = settings.date.departure;
      expect(
        BookingStart.package.datepicker.selectDate(
          date.year,
          date.month,
          date.day,
          date.allowChoosingNearByDate,
          date.numberOfNearbyMonthsToAllow
        )
      ).to.equal(true, `Couldn't click desired departure date`);
    });

    it('Click on search button', () => {
      BookingStart.search.click();
    });
  });

  /**
   * search result list in charterflow
   */
  describe('Select hotel in Charter flow hotel list', () => {
    it('Wait until Charter-flow is found', () => {
      CharterFlow.waitForPageToLoad(10000);

      // Removed the Tomas Cook Airlines-check for now...
      // A/B tests in production interferes with flight list operations.
      // OBS! This segment fails for the old flight list as well.
      // Fix this before putting this test on rotation

      // browser.click('.tcne-link--arrow>span');
      // let flightArray = browser.getText(
      //   '.flight-leg__label > div:nth-child(1)'
      // );
      // browser.click('.webui-modal-header__close');
      // let i = 2;
      // while (
      //   flightArray[0] !== 'Thomas Cook Airlines' ||
      //   flightArray[1] !== 'Thomas Cook Airlines'
      // ) {
      //   browser.click('.tcne-cf-flightoffers a:nth-child(' + i + ')');
      //   CharterFlow.waitUntilLoaded();
      //   browser.click('.tcne-link--arrow>span');
      //   flightArray = browser.getText('.flight-leg__label > div:nth-child(1)');
      //   browser.click('.webui-modal-header__close');
      //   i++;
      // }
      // browser.pause(7000);
    });

    it('Wait for hotels to load', () => {
      CharterFlow.waitUntilLoaded();
    });

    browser.pause(7000);
    it('Can select first hotel in the Hotel-array', () => {
      CharterFlow.hotels[5].select();
    });
  });

  /**
   * hotel page in hotelweb
   */
  describe('View hotel and book it', () => {
    it('Can scroll to price matrix', () => {
      browser.pause(5000);
      browser.scroll('.tcne-separator.tcne-separator--extra-margin');
      browser.pause(5000); //this pause to ensure that price matrix is loaded
    });

    it('Can scroll to submit button', () => {
      browser.scroll('#hotel-search-control');
    });

    it('Can perform a pricematrix-search', () => {
      browser.click('.bookingstart-section__search-button');
      browser.waitForExist('.price-summary__button-label--desktop', 10000);
      browser.pause(5000);
    });

    it('Can book hotel', () => {
      browser.scroll('.price-summary__button-label--desktop', -0, -300);
      charterPriceMatrix.summary.submit();
    });
  });

  //This part is not refactored :)
  HandleTheNameCollection(sharedData, { mode: 'charter' });
  HandleExtras(sharedData);
  CanConfirmTheBooking(sharedData);

  after(function() {
    const bookingNumber = browser.options.tc.bookingNumber;
    if (bookingNumber) {
      describe('Cancel Booking', function() {
        CanNavigateToLogin();
        CanEnterEmailAndPassword();
        CanLogin();
        CanNavigateToMyPage();
        CanLocateAGivenBookingByBookingNumberAndGoToItsBookingAndPaymentPage(
          bookingNumber
        );
        CanGoToTheBookingCancellationPageAndCancelTheBooking();
        CanConfirmTheCancellation();
      });
    }
    //browser.execute("dynaTrace.endVisit();"); //executes a dynatrace function to stop the session storage tagging
    browser.pause(10000); //pausing for 10s for dynatrace's sake
  });
});
