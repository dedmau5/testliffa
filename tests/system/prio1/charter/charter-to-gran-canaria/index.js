const moment = require('moment');

import { StartPage } from '../../../../../pages/start-page';
import { GenericBookingStart } from '../../../../../pages/apps/generic-booking-start';
import { Hotels } from '../../../../../pages/apps/hotels';
import { CanNavigateToLogin } from '../../../sanity/login-logout/can-navigate-to-login';
import { CanEnterEmailAndPassword } from '../../../sanity/login-logout/can-enter-email-and-password';
import { CanLogin } from '../../../sanity/login-logout/login-logout.js';
import { MakeLocalizationPreparations } from './localization';
import { MakeRelevantSettingsAndPerformSearch } from './settings';
import { HandleExtras } from './extras';
import { ConfirmBooking } from './confirm-booking';
import { CanViewHotelsAndSelectOne } from '../../common/can-view-hotels-and-select-one';
import { HandleTheNameCollection } from '../../common/name-collection';
import {
  CanNavigateToMyPage,
  CanLocateAGivenBookingByBookingNumberAndGoToItsBookingAndPaymentPage,
  CanGoToTheBookingCancellationPageAndCancelTheBooking,
  CanConfirmTheCancellation,
} from '../../common/my-page';

describe('Charter: Travel to Gran Canaria', function() {
  let BookingStart = new GenericBookingStart(),
    settings = {},
    sharedData = {};

  before(function() {
    StartPage.open();
  });

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

  it('Wait until Booking Start has Finished Loading', function() {
    BookingStart.waitUntilLoaded();
  });

  describe('Settings', function() {
    MakeLocalizationPreparations(settings);

    settings.From = moment().add(4, 'months');
    settings.From.add(
      Math.floor(Math.random() * settings.From.daysInMonth()),
      'days'
    );

    MakeRelevantSettingsAndPerformSearch(BookingStart, settings);
  });

  CanViewHotelsAndSelectOne({ Hotels: new Hotels('charter'), mode: 'charter' });
  HandleTheNameCollection(sharedData, { mode: 'charter' });
  HandleExtras(sharedData);
  ConfirmBooking(sharedData);
});
