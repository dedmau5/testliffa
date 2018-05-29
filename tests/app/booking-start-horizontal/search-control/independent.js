import Page from '../../../../pages/page';
import SearchControl from '../../../../pages/apps/booking-start-horizontal/search-control';
import { urls, query } from '../../../../pages/apps/booking-start-horizontal/search-control-urls';
import { Translate } from '../../../../tools';

import settings from './test-data/independent';
import { queryLondon } from './test-data/query';

describe('Search Control tests for Independant', () => {
  before(() => {
    const environmentUrl = Translate(urls[browser.options.tc.environment]);

    const independentQuery = query.independent
      .replace('{HotelId}', queryLondon.hotelId)
      .replace('{ItemId}', queryLondon.hotelId)
      .replace('{QueryHotelCD}', queryLondon.hotelCode)
      .replace('{QueryDepID}', queryLondon.departureId)
      .replace('{QueryCtryID}', queryLondon.countryId)
      .replace('{QueryAreaID}', queryLondon.areaId)
      .replace('{QueryResID}', queryLondon.resortId)
      .replace('{QueryDepDate}', queryLondon.departureDate)
      .replace('{QueryRetDate}', queryLondon.returnDate)
      .replace('{QueryDur}', queryLondon.duration)
      .replace('{QueryRoomAges}', queryLondon.roomAges)
      .replace('{QueryUnits}', queryLondon.units)
      .replace('{QueryAges}', queryLondon.ages);

    Page.goTo(environmentUrl + independentQuery);
  });

  describe('Initialize search-control', () => {
    it('Waits until search-control is found', () => {
      SearchControl.waitUntilFound();
    });

    it('Waits until search-control is loaded', () => {
      SearchControl.waitUntilLoaded();
    });
  });

  describe('Choose Departure', () => {
    it('Can open departure', () => {
      SearchControl.departure.open();
    });

    it(`Can choose departure ${settings.departure}`, () => {
      SearchControl.departure.select(settings.departure);

      expect(SearchControl.departure.value).to.equal(settings.departure, `${settings.departure} wasn't selected`);
    });
  });

  describe('Choose Date', () => {
    it('Can open departure', () => {
      SearchControl.datepicker.open();
    });

    it(`Can select departure date ${settings.date.departure.year}-${settings.date.departure.month}-${settings.date.departure.day}`, () => {
      const date = settings.date.departure;

      expect(SearchControl.datepicker.selectDate(date.year, date.month, date.day)).to.equal(
        true,
        'Couldn\'t click desired departure date',
      );
    });

    it(`Can select return date ${settings.date.return.year}-${settings.date.return.month}-${settings.date.return.day}`, () => {
      const date = settings.date.return;

      expect(SearchControl.datepicker.selectDate(date.year, date.month, date.day)).to.equal(
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
      SearchControl.pax.setAdults(settings.travelCompany.numberOfAdults);
    });

    it(`Can add ${settings.travelCompany.children.length} child/children to room 1`, () => {
      SearchControl.pax.setChildren(settings.travelCompany.numberOfChildren);
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
});
