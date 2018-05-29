const moment = require('moment');

import { StartPage } from '../../../../../pages/start-page';
import { GenericBookingStart } from '../../../../../pages/apps/generic-booking-start';
import { Settings } from '../../../../../pages/apps/generic-booking-start/settings';

import { ChooseACharterFlight } from './choose-a-charter-flight';
import { HandleTheNameCollection } from '../../common/name-collection';
import { HandleExtras } from '../charter-to-gran-canaria/extras';
import { ConfirmBooking } from '../charter-to-gran-canaria/confirm-booking';

import { MakeLocalizationPreparations } from './localization';
import { MakeRelevantSettingsAndPerformSearch } from './settings';

import { CanNavigateToLogin } from '../../../sanity/login-logout/can-navigate-to-login';
import { CanEnterEmailAndPassword } from '../../../sanity/login-logout/can-enter-email-and-password';
import { CanLogin } from '../../../sanity/login-logout/login-logout.js';
import {
  CanNavigateToMyPage,
  CanLocateAGivenBookingByBookingNumberAndGoToItsBookingAndPaymentPage,
  CanGoToTheBookingCancellationPageAndCancelTheBooking,
  CanConfirmTheCancellation,
} from '../../common/my-page';

describe('Charter: Flight to Mallorca', function() {
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

    MakeRelevantSettingsAndPerformSearch(
      BookingStart,
      settings,
      Settings.Flight
    );
  });

  ChooseACharterFlight();
  HandleTheNameCollection(sharedData, { mode: 'charter' });
  HandleExtras(sharedData);
  ConfirmBooking(sharedData);
});
