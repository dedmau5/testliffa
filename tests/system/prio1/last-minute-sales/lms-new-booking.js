// const moment = require('moment');

import { StartPage } from '../../../../pages/start-page';
import LMSPage from '../../../../pages/apps/last-minute-sales/last-minute-sales-pageobject';
import CharterFlow from '../../../../pages/apps/charter-flow/index';
import Hotel from '../../../../pages/apps/charter-flow/hotel';


// import { CanNavigateToLogin } from '../sanity/login-logout/can-navigate-to-login';
// import { CanEnterEmailAndPassword } from '../sanity/login-logout/can-enter-email-and-password';
// import { CanLogin } from '../sanity/login-logout/login-logout.js';
// import { MakeLocalizationPreparations } from './localization';
// import { ConfirmBooking } from './confirm-booking';
// import { CanViewHotelsAndSelectOne } from '../common/can-view-hotels-and-select-one';
// import { HandleTheNameCollection } from '../common/name-collection';

describe('Systemtest for Last-Minute-Sales', () => {
  const Hotelweb = new Hotel();
  const selectors = {
    url: '/sista-minuten-resor',
    twentiethHotelInList: '#lastminutesales .tcne-lms-hit:nth-child(20) .tcne-lms-hit__content-choice-price',
    chooseFirstHotelOnUpsellPage: '.tcne-cf-hotel-list-container--selected .webui-hotel-hit__footer-panel > a',
    travelType: '.webui-lms-hit:nth-child(20) .webui-lms-hit__price-choice',
  };

  before(() => {
    StartPage.open();
    browser.sessionStorage('POST', { key: 'DT_TESTNAME', value: '*** webdriverio *** LMS - mocha' });
    browser.sessionStorage('POST', { key: 'DT_TESTRUNID', value: 'UID' });

    browser.url(selectors.url); // temporary link until we have LMS linked in header
    // browser.click('#header-app-root > div > div.header-app-top > div > div.header-main-navigation-container > ul > li:nth-child(3) > a');
    LMSPage.waitForPageToLoadOnNewLMS(); // will replace current LMSPage.waitForPageToLoad()
  });

  // after(function () {
  //     const bookingNumber = browser.options.tc.bookingNumber;
  //
  //     if (bookingNumber) {
  //         describe("Cancel Booking", function () {
  //             CanNavigateToLogin();
  //             CanEnterEmailAndPassword();
  //             CanLogin();
  //             CanNavigateToMyPage();
  //             CanLocateAGivenBookingByBookingNumberAndGoToItsBookingAndPaymentPage(bookingNumber);
  //             CanGoToTheBookingCancellationPageAndCancelTheBooking();
  //             CanConfirmTheCancellation();
  //         });
  //     }
  // });

  describe('Tests on LMS page', () => {
    it('Should filter for specified trip', () => {
      browser.click(LMSPage.selectors.filtering.specified);
      browser.waitForExist(LMSPage.selectors.filtering.specifiedChecked, 60000);
      browser.pause(2000);
    });

    it('Should click "show more trips"', () => {
      browser.waitForExist(LMSPage.selectors.hotelList.showMoreTrips, 60000);
      browser.click(LMSPage.selectors.hotelList.showMoreTrips);
    });

    it('Should wait for 20th hotel in list to load', () => {
      browser.waitForExist(selectors.twentiethHotelInList, 60000);
    });

    it('Should click on first trip on 20th lms-hit in the list', () => {
      browser.click(LMSPage.selectors.hotelList.twentiethHotel.price);
    });

    it('Should land on upsell-page', () => {
      CharterFlow.waitForPageToLoad();
      CharterFlow.waitUntilLoaded();
      Hotelweb.waitForPageToLoad();
      browser.pause(2000);
    });
  });
  describe.skip('Tests on UPSELL page', () => {
    it.skip('Should click to choose the first hotel in list', () => {
      browser.click(selectors.chooseFirstHotelOnUpsellPage);
      browser.waitForExist('', 30000);
    });
  });

  describe.skip('Tests on Hotelweb-page', () => {
    it('Should click to choose the first hotel in list', () => {
    });
  });

  describe.skip('Tests on Namecollection-page', () => {
    it('Should handle the name collection', () => {
      // HandleTheNameCollection( sharedData, { mode: "charter" } );
    });
  });

  describe.skip('Tests on Extras-page', () => {
    it('Should handle the extras page', () => {
      // HandleExtras(sharedData);
    });
  });

  describe.skip('Tests on Confirm-page', () => {
    it('Should confirm the booking', () => {
      // ConfirmBooking(sharedData);
    });
  });
});
