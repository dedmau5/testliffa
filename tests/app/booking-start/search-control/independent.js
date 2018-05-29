import moment from 'moment';

import { StartPage } from '../../../../pages/start-page';
import { BookingStart } from '../../../../pages/apps/booking-start/index';
import { SearchControl } from '../../../../pages/apps/booking-start/search-control/index';
import IndependentFlow from '../../../../pages/apps/independent-flow/index';

import { Translate } from '../../../../tools';

describe('Search Control tests for Independant', () => {
  const departureDate = moment(new Date()).add(2, 'months');
  const returnDate = departureDate.clone().add(Math.floor(Math.random()) + 3, 'days'); // 3-4 days

  const settings = {
    departure: Translate({
      dk: 'København', fi: 'Helsinki', no: 'Oslo, Gardermoen', se: 'Stockholm-Arlanda', globe: 'Stockholm-Arlanda',
    }),
    date: {
      departure: {
        year: departureDate.year(), month: departureDate.month() + 1, day: departureDate.date(), allowChoosingNearByDate: true, numberOfNearbyMonthsToAllow: 6,
      },
      return: {
        year: returnDate.year(), month: returnDate.month() + 1, day: returnDate.date(), allowChoosingNearByDate: true, numberOfNearbyMonthsToAllow: 6,
      },
    },
    travelCompany: {
      numberOfAdults: 2,
      numberOfChildren: 2,
      children: [{ age: 11 }, { age: 1 }],
    },
  };

  before(() => {
    StartPage.open();
    BookingStart.waitUntilLoaded();
    BookingStart.city.click();
    BookingStart.waitUntilDataLoaded();
    BookingStart.search.click();
    IndependentFlow.hotelList.waitUntilFound();
    IndependentFlow.hotelList.waitUntilLoaded();
    IndependentFlow.hotelList.hotels[0].select();
  });

  describe('Choose Departure', () => {
    it('Can open departure', () => {
      SearchControl.departure.open();
    });

    it(`Can choose departure ${settings.departure}`, () => {
      expect(SearchControl.departure.select(settings.departure)).to.equal(true, `Couldn't find ${settings.departure} and click on it!`);
    });
  });

  describe('Choose Date', () => {
    it('Can open departure', () => {
      SearchControl.datepicker.open();
    });

    it(`Can select departure date ${settings.date.departure.year}-${settings.date.departure.month}-${settings.date.departure.day}`, () => {
      const date = settings.date.departure;

      expect(SearchControl.datepicker.selectDate(date.year, date.month, date.day, date.allowChoosingNearByDate, date.numberOfNearbyMonthsToAllow)).to.equal(
        true,
        'Couldn\'t click desired departure date',
      );
    });

    it(`Can select return date ${settings.date.return.year}-${settings.date.return.month}-${settings.date.return.day}`, () => {
      const date = settings.date.return;

      expect(SearchControl.datepicker.selectDate(date.year, date.month, date.day, date.allowChoosingNearByDate, date.numberOfNearbyMonthsToAllow)).to.equal(
        true,
        'Couldn\'t click desired return date',
      );
    });
  });

  describe('Adding passanger to rooms', () => {
    it('Can click on "Pax"', () => {
      SearchControl.pax.open();
    });

    it(`Can add ${settings.travelCompany.numberOfAdults} adults to room 1`, () => {
      SearchControl.pax.adults = settings.travelCompany.numberOfAdults;
    });

    it(`Can add ${settings.travelCompany.children.length} child/children to room 1`, () => {
      SearchControl.pax.children = settings.travelCompany.numberOfChildren;
    });

    // test that all children can be added
    settings.travelCompany.children.forEach((child, index) => {
      it(`Can set age ${settings.travelCompany.children[index].age} of child nummber ${index + 1}`, () => {
        const ageValue = settings.travelCompany.children[index].age.toString();
        SearchControl.pax.child(index + 1).age(ageValue);
      });
    });

    it('Can close "Pax"', () => {
      SearchControl.pax.confirm();
      // debugger;
    });
  });

  describe('Can click on search', () => {
    it('Click on button', () => {
      SearchControl.search.click();
    });
  });

  describe('Validate Price matrix', () => {
    it('Can view Price matrix', () => {
      IndependentFlow.priceMatrix.waitUntilLoaded();
    });
  });
});
