import Page from '../../../../pages/page';
import SearchControl from '../../../../pages/apps/booking-start-horizontal/search-control';
import { urls, query } from '../../../../pages/apps/booking-start-horizontal/search-control-urls';
import { Translate } from '../../../../tools';

import settings from './test-data/charter';
import { queryGranCanaria } from './test-data/query';

describe('Search Control tests for Charter', () => {
  before(() => {
    const environmentUrl = Translate(urls[browser.options.tc.environment]);

    const charterQuery = query.charter
      .replace('{HotelId}', queryGranCanaria.hotelId)
      .replace('{ItemId}', queryGranCanaria.hotelId)
      .replace('{QueryDepID}', queryGranCanaria.departureId)
      .replace('{QueryCtryID}', queryGranCanaria.countryId)
      .replace('{QueryResID}', queryGranCanaria.resortId)
      .replace('{QueryDepDate}', queryGranCanaria.departureDate)
      .replace('{QueryRetDate}', queryGranCanaria.returnDate)
      .replace('{QueryDur}', queryGranCanaria.duration)
      .replace('{QueryUnits}', queryGranCanaria.units)
      .replace('{QueryAges}', queryGranCanaria.ages);

    Page.goTo(environmentUrl + charterQuery);
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

  describe('Choose Duration', () => {
    it('Can open duration', () => {
      SearchControl.duration.open();
    });

    it(`Can choose duration ${settings.duration.length.oneWeek}`, () => {
      SearchControl.duration.charter.select(settings.duration.length.oneWeek);

      expect(SearchControl.duration.value).to.equal(settings.duration.length.oneWeek, `${settings.duration.length.oneWeek} wasn't selected`);
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
        "Couldn't click desired departure date"
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
  });

  describe('Can click on search', () => {
    it('Click on button', () => {
      SearchControl.search.click();
    });
  });
});
