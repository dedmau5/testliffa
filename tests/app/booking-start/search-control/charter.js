import moment from 'moment';

import { StartPage } from '../../../../pages/start-page';
import { BookingStart } from '../../../../pages/apps/booking-start/index';
import { SearchControl } from '../../../../pages/apps/booking-start/search-control/index';
import CharterFlow from '../../../../pages/apps/charter-flow';
import CharterPriceMatrix from '../../../../pages/apps/charter-price-matrix';

import { Translate } from '../../../../tools';

describe('Search Control tests for Charter', () => {
  const bookingstartDepartureDate = moment(new Date()).add(2, 'months');
  const departureDate = moment(new Date()).add(2, 'months');

  const settings = {
    bookingstart: {
      destination: {
        country: Translate({
          dk: 'Kroatien', fi: 'Kroatia', no: 'Kroatia', se: 'Kroatien',
        }),
        area: Translate({
          dk: 'Alle rejsemål', fi: 'Kaikki kohteet', no: 'Alle reisemål', se: 'Alla resmål',
        }),
      },
      date: {
        departure: {
          year: bookingstartDepartureDate.year(),
          month: bookingstartDepartureDate.month() + 1,
          day: bookingstartDepartureDate.date(),
          allowChoosingNearByDate: true,
          numberOfNearbyMonthsToAllow: 12,
        },
      },
    },
    departure: Translate({
      dk: 'København', fi: 'Helsinki', no: 'Oslo, Gardermoen', se: 'Stockholm-Arlanda', globe: 'Stockholm-Arlanda',
    }),
    date: {
      departure: {
        year: departureDate.year(), month: departureDate.month() + 1, day: departureDate.date(), allowChoosingNearByDate: true, numberOfNearbyMonthsToAllow: 6,
      },
    },
    travelCompany: {
      numberOfAdults: 2,
      numberOfChildren: 2,
      children: [{ age: 11 }, { age: 1 }],
    },
  };

  before(() => {
    const date = settings.date.departure;

    StartPage.open();
    BookingStart.waitUntilLoaded();
    BookingStart.waitUntilDataLoaded();
    BookingStart.package.destination.open();
    BookingStart.package.destination.country.toggle(settings.bookingstart.destination.country);
    BookingStart.package.destination.area.toggle(settings.bookingstart.destination.area);
    BookingStart.package.datepicker.open();
    BookingStart.package.datepicker.selectDate(date.year, date.month, date.day, date.allowChoosingNearByDate, date.numberOfNearbyMonthsToAllow);
    BookingStart.search.click();

    CharterFlow.waitUntilLoaded();
    CharterFlow.hotels[1].select();
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
    });
  });

  describe('Can click on search', () => {
    it('Click on button', () => {
      SearchControl.search.click();
    });
  });

  describe('Validate Price matrix', () => {
    it('Can view Price matrix', () => {
      CharterPriceMatrix.waitUntilLoaded();
    });
  });
});
