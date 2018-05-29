import moment from 'moment';
const chalk = require('chalk');
const log = console.log;

import { getRandomIntegerBetween, Translate } from '../../../../tools/index';

import { suite, test, skip } from 'mocha-typescript';
import { expect } from 'chai';

import { StartPage } from '../../../../pages/start-page.js';
import Inspiration from '../../../../pages/apps/inspiration';
import ResortPage from '../../../../pages/apps/inspiration/resort-page';
import HotelPage from '../../../../pages/apps/inspiration/hotel-page';
import { BookingStart } from 'pages/apps/booking-start/index';
import charterPriceMatrix from 'pages/apps/charter-price-matrix/index';

// import { HandleTheNameCollection } from '../../prio1/common/name-collection/index';
// import { HandleExtras } from '../../prio1/charter/charter-to-gran-canaria-mocha/extras';
// import { ConfirmBooking } from '../../prio1/charter/charter-to-gran-canaria-mocha/confirm-booking';

describe('Charter, Inspiration: Arguineguín (Gran Canaria)', function() {
  let localized = {},
    hotels,
    totalPrice,
    sharedData = {};

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

  before(function() {
    StartPage.open();
    browser.pause(3000); // To allow the asynchronous DOM to finish rendering.

    localized.urlForSpain = Translate({
      dk: `${browser.getUrl()}spanien`,
      fi: `${browser.getUrl()}espanja`,
      no: `${browser.getUrl()}spania`,
      se: `${browser.getUrl()}spanien`,
      globe: `${browser.getUrl()}spanien`,
    });

    localized.granCanariaName = Translate({
      dk: 'Gran Canaria',
      fi: 'Gran Canaria',
      no: 'Gran Canaria',
      se: 'Gran Canaria',
      globe: 'Gran Canaria',
    });
  });

  after(function() {
    /*const bookingNumber = browser.options.tc.bookingNumber;

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
            }*/
  });

  it('Can navigate to the page for Spain', function() {
    browser.url(localized.urlForSpain);
  });

  it('Can locate and go to the page of Arguineguín', function() {
    const destinationArguineguin = Inspiration.getMinorDestinationsFor(
      localized.granCanariaName,
      Inspiration.majorDestinations
    ).find(destination => destination.name === 'Arguineguín');

    expect(destinationArguineguin).is.not.null;
    expect(destinationArguineguin.numberOfHotels).is.greaterThan(0);

    destinationArguineguin.readMoreButton.click();

    ResortPage.waitForPageToLoad();

    expect(ResortPage.name).to.contain('Arguineguín');
  });

  it('Hotels are available', function() {
    hotels = ResortPage.hotels;
    expect(hotels).to.not.be.undefined;
    expect(hotels).length.to.be.greaterThan(0);
  });

  it('Can choose a random hotel', function() {
    let index = getRandomIntegerBetween(0, hotels.length);
    hotels[index].chooseButton.click();
    let name = hotels[index].name;
    log(`Chosed the hotel: ${chalk.bold(name)}`);
    HotelPage.waitForPageToLoad();
    expect(HotelPage.name).to.contain(name);
  });

  it('Can click on "Calendar"', () => {
    browser.click('.bookingstart-section__date-select');
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
    charterPriceMatrix.summary.submit();
  });

  it('Can find the total price', function() {
    totalPrice = HotelPage.priceList.totalPrice;
    expect(totalPrice).to.not.be.undefined;
    expect(totalPrice).to.not.equal(0);
  });

  it('Can choose a meal package', function() {
    const meals = HotelPage.priceList.meals.meals;
    expect(meals).to.be.an.instanceof(Array);

    if (meals.length === 0) {
      this.skip();
    }

    const meal = meals[getRandomIntegerBetween(0, meals.length)];
    HotelPage.priceList.meals.selectMeal(meal);
  });

  it('Choosing a meal package changes the total price', function() {
    const meals = HotelPage.priceList.meals.meals;
    expect(meals).to.be.an.instanceof(Array);

    if (meals.length === 0) {
      this.skip();
    }

    expect(HotelPage.priceList.totalPrice).to.not.equal(totalPrice);
  });

  it('Can click on book and continue to the Name Collection', function() {
    HotelPage.priceList.bookButton.click();
  });

  /*HandleTheNameCollection( sharedData, { mode: "charter" } );
        HandleExtras( sharedData );
        ConfirmBooking( sharedData );*/
});
