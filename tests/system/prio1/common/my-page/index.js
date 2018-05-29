const chalk = require('chalk');
const log = console.log;

import { Translate } from '../../../../../tools/index';

import { MyPage } from '../../../../../pages/apps/my-page/index';
import { Booking } from '../../../../../pages/apps/my-page/booking';

import CharterBooking from '../../../../../pages/booking/charter/index';
import {
  WaitForSeatingButtonsToAppear,
  CanChooseSeatingFor,
} from '../../../../../tests/system/prio1/charter/charter-to-gran-canaria/extras';

const extras = CharterBooking.steps.extras;

export function CanNavigateToMyPage() {
  it('Can navigate to my page', function() {
    this.timeout(30000);
    this.slow(15000);

    MyPage.navigateTo();
    MyPage.waitUntilLoaded();
  });
}

/**
 * @param bookingNumber {string}
 * @param options {Object}
 * @param options.savePrice {boolean}
 * @param options.verifySeatingPrice {boolean}
 * @param options.sharedData {Object}
 */
export function CanLocateAGivenBookingByBookingNumberAndGoToItsBookingAndPaymentPage(
  bookingNumber,
  options = { savePrice: false, verifySeatingPrice: false, sharedData: null }
) {
  let booking;

  it('Can locate given booking by booking number', function() {
    booking = MyPage.booking(bookingNumber);
  });

  it("Can go to the given booking's booking and payment page", function() {
    booking.bookingAndPaymentButton.click();
    Booking.waitUntilLoaded();
  });

  it('Saving the price of the booking', function() {
    if (!(options && options.savePrice && options.sharedData)) {
      this.skip();
    }

    options.sharedData.priceOfBooking = Booking.totalPrice;
  });

  it('Seating increased the price of the booking', function() {
    if (!(options && options.verifySeatingPrice && options.sharedData)) {
      this.skip();
    }
    console.log('Booking.totalPrice', Booking.totalPrice);
    console.log('sharedData.priceOfBooking', options.sharedData.priceOfBooking);
    expect(Booking.totalPrice).to.not.equal(options.sharedData.priceOfBooking);
  });

  it('The price change caused by seating is correct', function() {
    if (!(options && options.verifySeatingPrice && options.sharedData)) {
      this.skip();
    }
    const sharedData = options.sharedData;
    console.log('sharedData', sharedData);

    expect(Booking.totalPrice).to.equal(
      sharedData.priceOfBooking + sharedData.seating.priceOfSeating
    );
  });
}

export function CanGoToBookExtrasAndInsurancesPage() {
  it('Can click on the Book Extras and Insurances link', function() {
    Booking.bookExtrasAndInsurancesLink.click();
    Booking.bookExtrasAndInsurances.waitForPage();
  });
}

/**
 * @param sharedData {Object}
 * @param options {Object}
 * @param options.seating {Object]
 * @param options.seating.enable {boolean}
 */
export function CanGoToSeating(
  sharedData,
  options = { seating: { enable: false } }
) {
  it('Can click Seating Onboard link', function() {
    Booking.bookExtrasAndInsurances.seatingOnboardLink.click();
  });

  WaitForSeatingButtonsToAppear(options.seating.enable, sharedData);
}

/**
 * @param sharedData {Object}
 * @param options {Object}
 * @param options.seating {Object}
 * @param options.seating.enable {boolean}
 * @param options.seating.adults {number}
 * @param options.seating.children {number}
 */
export function CanChooseSeating(
  sharedData,
  options = { seating: { enable: false, adults: 2, children: 0 } }
) {
  const enable = options.seating.enable,
    adults = options.seating.adults,
    children = options.seating.children;

  it('Can save the price of seating *before* choosing seats', function() {
    sharedData.seating = {
      priceBeforeChoosingSeats: CharterBooking.steps.extras.priceOfSeating,
    };
  });

  CanChooseSeatingFor('departure', enable, adults, children);
  CanChooseSeatingFor('return', enable, adults, children);
}

/**
 * @param sharedData {Object}
 */
export function CanSeeUpdatedPriceOfSeating(sharedData) {
  it('Can see updated price of seating', function() {
    const priceOfSeating = CharterBooking.steps.extras.priceOfSeating;
    console.log(`priceOfSeating: ${priceOfSeating}`);

    expect(priceOfSeating).to.not.equal(
      sharedData.seating.priceBeforeChoosingSeats
    );
    sharedData.seating.priceOfSeating = priceOfSeating;
  });
}

export function CanGoToTheBookingCancellationPageAndCancelTheBooking() {
  it('Can click on the cancellation link', function() {
    Booking.cancelLink.click();
    Booking.waitForCancelBookingPage();
  });

  it('Can check the cancellation checkbox', function() {
    browser.pause(2000);
    expect(Booking.cancelCheckbox.isChecked()).to.equal(false);
    Booking.cancelCheckbox.click();
    expect(Booking.cancelCheckbox.isChecked()).to.equal(true);
  });

  it('Can click on the cancellation button', function() {
    Booking.cancelBookingButton.click();
  });

  it('Can confirm the pop-up', function() {
    browser.alertAccept();
  });
}

export function CanConfirmTheCancellation() {
  it('Can confirm the cancellation', function() {
    Booking.waitForCancellationConfirmation();

    const label = Booking.cancellationConfirmationLabel;

    expect(label).to.equal(
      Translate({
        dk: '',
        fi: 'Varauksesi on peruttu',
        no: '',
        se: 'Din resa är nu avbokad',
        globe: 'Din resa är nu avbokad',
      })
    );
  });
}
