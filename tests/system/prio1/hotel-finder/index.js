const moment = require('moment');

import { StartPage } from '../../../../pages/start-page';
import { CanNavigateToHotelFinderPage } from './can-navigate-to-hotel-finder-page';
import { CanFilterValuesInHotelFinder } from './can-filter-values-in-hotel-finder';
import { CanPerformSearchInHotelFinder } from './can-perform-search-in-hotel-finder';
import { CanSelectHotelInHotelFinderResultList } from './can-select-hotel-in-hotel-finder-result-list';
import { CanSelectHotelAndSupplementsOnHotelPage } from './can-select-hotel-and-supplements-on-hotel-page';
import {
  CanNavigateToMyPage,
  CanLocateAGivenBookingByBookingNumberAndGoToItsBookingAndPaymentPage,
  CanGoToTheBookingCancellationPageAndCancelTheBooking,
  CanConfirmTheCancellation,
} from '../common/my-page';

// import { CanNavigateToLogin } from '../sanity/login-logout/can-navigate-to-login';
// import { CanEnterEmailAndPassword } from '../sanity/login-logout/can-enter-email-and-password';
// import { CanLogin } from '../sanity/login-logout/login-logout.js';

// import { MakeLocalizationPreparations } from './localization';
// import { ConfirmBooking } from './confirm-booking';
// import { CanViewHotelsAndSelectOne } from '../common/can-view-hotels-and-select-one';
// import { HandleTheNameCollection } from '../common/name-collection';
describe('Hotel Finder', function() {
  let settings = {},
    sharedData = {};

  describe('Initialize Bookingstart', () => {
    StartPage.open();
  });

  CanNavigateToHotelFinderPage(sharedData);
  CanFilterValuesInHotelFinder(sharedData);
  CanPerformSearchInHotelFinder(sharedData);
  CanSelectHotelInHotelFinderResultList(sharedData);
  CanSelectHotelAndSupplementsOnHotelPage(sharedData);

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
  });

  // CanViewHotelsAndSelectOne({ Hotels: new Hotels("charter"), mode: "charter" });
  // HandleTheNameCollection( sharedData, { mode: "charter" } );
  // HandleExtras(sharedData);
  // ConfirmBooking(sharedData);
});
