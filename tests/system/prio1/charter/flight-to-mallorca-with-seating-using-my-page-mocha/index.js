import moment from 'moment';
import { Translate } from '../../../../../tools/index';
import { StartPage } from 'pages/start-page';
import { BookingStart } from 'pages/apps/booking-start/index';
import CharterFlights from 'pages/apps/charter-flights';
import { HandleTheNameCollection } from '../../common/name-collection';
import { HandleExtras } from 'tests/system/prio1/charter/charter-to-gran-canaria/extras.js';
import {
  CanNavigateToMyPage,
  CanLocateAGivenBookingByBookingNumberAndGoToItsBookingAndPaymentPage,
  CanGoToTheBookingCancellationPageAndCancelTheBooking,
  CanConfirmTheCancellation,
  CanGoToBookExtrasAndInsurancesPage,
  CanGoToSeating,
  CanChooseSeating,
  CanSeeUpdatedPriceOfSeating,
} from '../../common/my-page';
import { CanConfirmTheBooking } from '../../common/booking/can-confirm-the-booking';
import { CanNavigateToLogin } from 'tests/system/sanity/login-logout/can-navigate-to-login';
import { CanEnterEmailAndPassword } from 'tests/system/sanity/login-logout/can-enter-email-and-password';
import { CanLogin } from 'tests/system/sanity/login-logout/login-logout.js';

/**
 *
 * This test is an end-2-end test going from search in booking start to flight result page, choosing flight,
 * handelling name collection, booking and lastly logging in to MyPage and adding Seating, then cancelling booking on MyPage
 */
describe('Charter Flight: Mallorca ', () => {
  // shared data between tests
  let sharedData = {
    hotelName: null,
  };

  const departureDate = moment(new Date()).add(6, 'months');
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
    area: Translate({ dk: '', fi: '', no: '', se: 'Mallorca', globe: '' }),
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
        value:
          '*** webdriverio *** Charter Flight with Seating via MyPage - mocha',
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
    it(`Can select Flight Tab in Booking Start`, () => {
      BookingStart.flightOnly.click();
      browser.pause(2000);
    });

    it(`Can select ${settings.departure} as departure`, () => {
      expect(
        BookingStart._flightOnly.departure.select(settings.departure)
      ).to.equal(true, `Couldn't find ${settings.departure} and click on it!`);
    });

    it(`Can select ${settings.destination} as country`, () => {
      BookingStart._flightOnly.destination.open();
      expect(
        BookingStart._flightOnly.destination.country.toggle(
          settings.destination
        )
      ).to.equal(true, `Couldn't find country and click on it!`);
    });

    it(`Can select ${settings.area}`, () => {
      expect(
        BookingStart._flightOnly.destination.area.toggle(settings.area)
      ).to.equal(true, `Couldn't find resort and click on it!`);
    });

    it('Can click on Duration', () => {
      BookingStart._flightOnly.duration.open();
    });

    it(`Can select on ${settings.duration.length} in duration list`, () => {
      expect(
        BookingStart._flightOnly.duration.select(settings.duration.length)
      ).to.equal(true, `Couldn't click desired duration item!`);
    });

    it('Can click on "Calendar"', () => {
      BookingStart._flightOnly.datepicker.open();
    });

    it(`Can select departure date ${settings.date.departure.year}-${
      settings.date.departure.month
    }-${settings.date.departure.day}`, () => {
      const date = settings.date.departure;
      expect(
        BookingStart._flightOnly.datepicker.selectDate(
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
   * Flight search result list
   */
  describe('Select flight in Flight list', () => {
    it('Wait until Flight list is found', () => {
      CharterFlights.waitForPageToLoad(20000);
    });

    it('Can click on book a flight-button', () => {
      CharterFlights.bookAFlight.click();
    });
  });

  //This part is not refactored :)
  HandleTheNameCollection(sharedData, { mode: 'charter' });
  HandleExtras(sharedData);
  CanConfirmTheBooking(sharedData);

  after(function() {
    const bookingNumber = browser.options.tc.bookingNumber;

    if (bookingNumber) {
      const seatingOptions = {
        seating: { enable: true, adults: 2, children: 0 },
      };

      describe('Seating', function() {
        CanNavigateToLogin();
        CanEnterEmailAndPassword();
        CanLogin();
        CanNavigateToMyPage();
        CanLocateAGivenBookingByBookingNumberAndGoToItsBookingAndPaymentPage(
          bookingNumber,
          { savePrice: true, sharedData: sharedData }
        );
        CanGoToBookExtrasAndInsurancesPage();
        CanGoToSeating(sharedData, seatingOptions);
        CanChooseSeating(sharedData, seatingOptions);
        CanSeeUpdatedPriceOfSeating(sharedData);
      });

      describe('Cancel Booking', function() {
        CanNavigateToMyPage();
        CanLocateAGivenBookingByBookingNumberAndGoToItsBookingAndPaymentPage(
          bookingNumber,
          { verifySeatingPrice: true, sharedData: sharedData }
        );
        CanGoToTheBookingCancellationPageAndCancelTheBooking();
        CanConfirmTheCancellation();
      });
    }
    //browser.execute("dynaTrace.endVisit();"); //executes a dynatrace function to stop the session storage tagging
    browser.pause(10000); //pausing for 10s for dynatrace's sake
  });
});
