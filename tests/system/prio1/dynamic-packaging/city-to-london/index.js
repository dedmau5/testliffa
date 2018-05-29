import moment from 'moment';
import { Translate } from '../../../../../tools/index';

import { StartPage } from '../../../../../pages/start-page';
import BookingStart from '../../../../../pages/apps/booking-start-horizontal/index';
import IndependentFlow from '../../../../../pages/apps/independent-flow/index';
import IndependentHotelBooking from '../../../../../pages/apps/hotel-booking/independent-hotel-booking';
import NameCollection from '../../../../../pages/apps/namecollection/nameCollection.dp';

describe('Dynamic Packaging: City to London', () => {
  // shared data between tests
  const sharedState = {
    hotelName: null,
    price: null,
  };

  const departureDate = moment(new Date()).add(4, 'months');
  const returnDate = departureDate.clone().add(Math.floor(Math.random()) + 3, 'days'); // 3-4 days

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
    it('Can open start page', () => {
      StartPage.open();
    });

    it('Wait until Booking Start has Finished Loading', () => {
      BookingStart.waitUntilLoaded();
    });
  });

  describe('Perform search', () => {
    it('Can select the product "City"-travel', () => {
      BookingStart.city.select();
      BookingStart.waitUntilLoaded();
    });

    it(`Can choose ${settings.departure} as departure`, () => {
      BookingStart.city.departure.open();

      BookingStart.city.departure.select(settings.departure);
      expect(BookingStart.city.departure.value).to.equal(settings.departure, `The field-value did not contain ${settings.departure}`);
    });

    it(`Can select ${settings.resort}`, () => {
      BookingStart.city.destination.open();

      expect(BookingStart.city.destination.select(settings.resort)).to.equal(true, "Couldn't find resort and click on it!");
    });

    it('Can click on "Calender"', () => {
      BookingStart.city.datepicker.open();
    });

    it(`Can select departure date ${settings.date.departure.year}-${settings.date.departure.month}-${settings.date.departure.day}`, () => {
      const date = settings.date.departure;

      expect(BookingStart.city.datepicker.selectDate(date.year, date.month, date.day)).to.equal(
        true,
        "Couldn't click desired departure date"
      );
    });

    it(`Can select return date ${settings.date.return.year}-${settings.date.return.month}-${settings.date.return.day}`, () => {
      const date = settings.date.return;

      expect(BookingStart.city.datepicker.selectDate(date.year, date.month, date.day)).to.equal(
        true,
        "Couldn't click desired return date"
      );
    });

    it('Click on search button', () => {
      BookingStart.search();
    });
  });

  describe('Select hotel in list', () => {
    it('Waits until Independent-flow hotel list is found', () => {
      IndependentFlow.hotelList.waitUntilFound();
      IndependentFlow.hotelList.waitUntilLoaded();
    });

    it('Waits until hotels has loaded', () => {
      const numberOfHotels = IndependentFlow.hotelList.hotels.length;

      expect(numberOfHotels).to.be.at.least(1, 'Can not find any hotels');
    });

    it('Can select the first hotel', () => {
      const firstHotel = IndependentFlow.hotelList.hotels[0];
      sharedState.hotelName = firstHotel.name;
      firstHotel.select();
    });
  });

  describe('View hotel and book it', () => {
    it('Waits until Hotel page is loaded', () => {
      IndependentHotelBooking.waitForPageToLoad();
    });

    it('Hotel name is the same as in Hotel list', () => {
      const hotelName = IndependentHotelBooking.name; // uses old page object
      expect(hotelName).to.equal(sharedState.hotelName, 'Hotel name is not the same on "hotel list" and "hotel page"');
    });

    it('Jump to the Pricematrix from button', () => {
      IndependentHotelBooking.placeBookingButton.click();
    });

    it('Waits until Price matrix is loaded', () => {
      IndependentFlow.priceMatrix.waitUntilLoaded();
    });

    it('Can book hotel', () => {
      IndependentFlow.priceMatrix.summary.select();
    });
  });

  describe('View flights', () => {
    it('Can load flight list', () => {
      IndependentFlow.flightList.waitUntilFound();
      IndependentFlow.flightList.waitUntilLoaded(20000);
    });

    it('Can view price for first flight', () => {
      const [firstTransport] = IndependentFlow.flightList.transports;
      sharedState.price = firstTransport.price; // set price to state

      expect(firstTransport.price).length.to.be.at.least(4);
    });

    it('Can select first flight', () => {
      const [firstTransport] = IndependentFlow.flightList.transports;

      expect(firstTransport.select()).to.be.equal(true, 'Could not select first flight');
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
});
