const moment = require('moment');

import { StartPage } from '../../../../pages/start-page';
import { CanNavigateToLMSPage } from './can-navigate-to-lms-page';
import { CanFilterLMSTrip } from './can-filter-lms-trip';
import { CanSelectLMSTrip} from './can-select-lms-trip';
import { CanSelectTripOnLMSHotelList} from './can-select-trip-on-lms-hotellist';

// import { CanNavigateToLogin } from '../sanity/login-logout/can-navigate-to-login';
// import { CanEnterEmailAndPassword } from '../sanity/login-logout/can-enter-email-and-password';
// import { CanLogin } from '../sanity/login-logout/login-logout.js';

// import { MakeLocalizationPreparations } from './localization';
// import { ConfirmBooking } from './confirm-booking';
// import { CanViewHotelsAndSelectOne } from '../common/can-view-hotels-and-select-one';
// import { HandleTheNameCollection } from '../common/name-collection';

import {
    CanNavigateToMyPage,
    CanLocateAGivenBookingByBookingNumberAndGoToItsBookingAndPaymentPage,
    CanGoToTheBookingCancellationPageAndCancelTheBooking,
    CanConfirmTheCancellation
} from '../common/my-page';

describe(
    'LMS', function () {
        let settings = {},
            sharedData = {};

        before( function () {
            StartPage.open();
        });
        
        after( function () {
            const bookingNumber = browser.options.tc.bookingNumber;

            if ( bookingNumber ) {
                describe("Cancel Booking", function () {
                    CanNavigateToLogin();
                    CanEnterEmailAndPassword();
                    CanLogin();
                    CanNavigateToMyPage();
                    CanLocateAGivenBookingByBookingNumberAndGoToItsBookingAndPaymentPage( bookingNumber );
                    CanGoToTheBookingCancellationPageAndCancelTheBooking();
                    CanConfirmTheCancellation();
                });
            }
        });

       
        CanNavigateToLMSPage( sharedData, { } );
        CanFilterLMSTrip(sharedData);
        CanSelectLMSTrip(sharedData);
        CanSelectTripOnLMSHotelList(sharedData);
        

        //CanViewHotelsAndSelectOne({ Hotels: new Hotels("charter"), mode: "charter" });
        //HandleTheNameCollection( sharedData, { mode: "charter" } );
        //HandleExtras(sharedData);
        //ConfirmBooking(sharedData);
        
        
    }
);