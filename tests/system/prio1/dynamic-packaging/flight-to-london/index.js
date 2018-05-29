import moment from 'moment';

import { StartPage } from '../../../../../pages/start-page';
import Booking from '../../../../../pages/booking/dynamic-packaging/index';
import BookingStart from '../../../../../pages/apps/booking-start-horizontal/index';
import IndependentFlow from '../../../../../pages/apps/independent-flow';

import NameCollection from '../../../../../pages/apps/namecollection/nameCollection.dp';

import { Translate } from '../../../../../tools/index';


/**
 * Should belong to the following suits:
 * - Sanity
 * - Dynamic
 */

describe('Dynamic Packaging: Flight to London', function () {
  // shared state between tests
  const sharedState = {
    price: null,
  };

  const departureDate = moment(new Date()).add(4, 'months');
  const returnDate = departureDate.clone().add(3, 'days'); // 3 days

  const settings = {
    departure: Translate({
      dk: 'København',
      fi: 'Helsinki',
      no: 'Oslo, Gardermoen',
      se: 'Stockholm-Arlanda',
      globe: 'Stockholm-Arlanda',
    }),
    destination: Translate({
      dk: 'Storbritannien',
      fi: 'Iso-Britannia',
      no: 'Storbritannia',
      se: 'Storbritannien',
      globe: 'Storbritannien',
    }),
    resort: Translate({
      dk: 'London',
      fi: 'Lontoo',
      no: 'London',
      se: 'London',
      globe: 'London',
    }),
    date: {
      departure: {
        year: departureDate.year(),
        month: departureDate.month() + 1,
        day: departureDate.date(),
        allowChoosingNearByDate: true,
        numberOfNearbyMonthsToAllow: 6,
      },
      return: {
        year: returnDate.year(),
        month: returnDate.month() + 1,
        day: returnDate.date(),
        allowChoosingNearByDate: true,
        numberOfNearbyMonthsToAllow: 6,
      },
    },
    travellers: {
      adults: 2,
    },
  };

  describe('Initialize Bookingstart', () => {
    it('Can open start page', function () {
      StartPage.open();
    });

    it('Wait until Booking Start has Finished Loading', function () {
      BookingStart.waitUntilFound();
      BookingStart.waitUntilLoaded();
    });
  });

  describe('Perform search', () => {
    const state = {
      country: {},
      resort: {},
    };

    it(`Can choose ${settings.departure} as departure`, () => {
      BookingStart.flightOnly.select();
      BookingStart.flightOnly.departure.open();

      BookingStart.flightOnly.departure.select(settings.departure);
      expect(BookingStart.flightOnly.departure.value).to.equal(settings.departure, `The field-value did not contain ${settings.departure}`);
    });

    it(`Can select ${settings.destination}`, () => {
      state.country = BookingStart.flightOnly.destination.selectCountry(settings.destination);
      expect(state.country.isExpanded).to.equal(true, "Couldn't find country and click on it!");
    });

    it(`Can select ${settings.resort}`, () => {
      const resort = state.country.selectResort(settings.resort);
      expect(BookingStart.flightOnly.destination.value).to.equal(`${resort.name}, ${state.country.name}`, "Couldn't find resort and click on it!");
    });

    it('Can click on "Calender"', () => {
      BookingStart.flightOnly.datepicker.open();
    });

    it(`Can select departure date ${settings.date.departure.year}-${settings.date.departure.month}-${settings.date.departure.day}`, () => {
      const date = settings.date.departure;

      expect(BookingStart.flightOnly.datepicker.selectDate(date.year, date.month, date.day)).to.equal(true, "Couldn't click desired departure date");
    });

    it(`Can select return date ${settings.date.return.year}-${settings.date.return.month}-${settings.date.return.day}`, function () {
      const date = settings.date.return;

      expect(BookingStart.flightOnly.datepicker.selectDate(date.year, date.month, date.day)).to.equal(true, "Couldn't click desired return date");
    });

    it('Click on search button', () => {
      BookingStart.search();
    });
  });

  describe('Choose Flight', () => {
    it('Wait for list to load', () => {
      IndependentFlow.flightOnly.waitUntilFound();
      IndependentFlow.flightOnly.waitUntilLoaded(20000);
    });

    it('Select flight', () => {
      const [firstTransport] = IndependentFlow.flightOnly.transports;
      sharedState.price = firstTransport.price; // set price to state
      firstTransport.select();
    });
  });

  describe('Enter personal details and make choices in Name collection"', () => {
    it('Wait until Name Collection has finished loading', () => {
      NameCollection.waitForPageToLoad();
    });

    it('Can enter passenger information (names, gender and so on)', () => {
      NameCollection.passengerInformation.setPassengerInformationByIndex(1, 'Stefan', 'Franzén', 'adult', '840618', 'Male');
      NameCollection.passengerInformation.setPassengerInformationByIndex(2, 'Karin', 'Franzén', 'adult', '871117', 'Female');

      expect(NameCollection.passenger(1).getFirstName()).to.equal('Stefan');
      expect(NameCollection.passenger(1).getLastName()).to.equal('Franzén');
      expect(NameCollection.passenger(2).getFirstName()).to.equal('Karin');
      expect(NameCollection.passenger(2).getLastName()).to.equal('Franzén');
    });

    it('Can find dropdown for cancellation insurance', () => {
      NameCollection.waitForCancellationInsuranceToLoad();
    });

    it('Can open and select the "NO" option for cancellation insurance', () => {
      NameCollection.cancellationInsurance.click();
      NameCollection.cancellationInsurance.selectNo();
    });

    it('Can enter address information for the main traveler', () => {
      NameCollection.addressInfo.fillForm('Stockholm', '12345', 'Rålambsvägen 17', '+46704445566', 'someone@thomascook.se', 'someone@thomascook.se');
    });

    it('Price in Travel information equals the price in Flight list', () => {
      const { price } = NameCollection.travelInfo;

      expect(price).to.equal(sharedState.price, 'The price in Travel information do not equals the price in Flight list');
    });

    it('Total Price equals the price in Flight list', () => {
      const { price } = NameCollection.summary;

      expect(price).to.equal(sharedState.price, 'The Total price do not equals the price in Flight list');
    });

    it('Can confirm the booking', () => {
      NameCollection.summary.submitForm();
    });
  });

  // This part is partially refactored :)
  describe('Can confirm the booking', function () {
    const timeout = 60000;
    let currentPrice;

    it(`The "confirm booking" page loads within ${timeout / 1000} s`, function () {
      Booking.steps.confirmBooking.waitForPage();
    });

    it('Total Price equals the Price seen under My Choice', function () {
      currentPrice = Booking.myChoices.travelInformation.price;
      expect(Booking.steps.confirmBooking.totalPrice).to.equal(currentPrice, 'Price mismatch!');
    });
  });
});
