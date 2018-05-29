import moment from 'moment';
import { StartPage } from '../../../pages/start-page';
import { BookingStart } from '../../../pages/apps/booking-start/index';
import CharterFlow from '../../../pages/apps/charter-flow/index';
import { Translate } from '../../../tools';
import CharterPriceMatrix from '../../../pages/apps/charter-price-matrix';
import HotelBooking from '../../../pages/apps/hotel-booking/index';

const getSearchEvent = function () {
  return browser.execute(() => window.dataLayer).value.find(d => d.event === 'Search'); // eslint-disable-line no-undef
};

describe('Testing charter booking to arguineguin from startpage', () => {
  const state = {
    dataLayerSearchEvent: {},
    selectedDepartureDate: {},
  };
  const departureDate = moment(new Date()).add(4, 'months');
  const settings = {
    departure: Translate({
      dk: '', fi: '', no: '', se: 'Stockholm-Arlanda', globe: '',
    }),
    country: Translate({
      dk: '', fi: '', no: '', se: 'Spanien', globe: '',
    }),
    area: Translate({
      dk: '', fi: '', no: '', se: 'Gran Canaria', globe: '',
    }),
    resort: Translate({
      dk: '', fi: '', no: '', se: 'Arguineguín', globe: '',
    }),
    duration: {
      visible: true,
      length: Translate({
        dk: '', fi: '', no: '', se: '1 vecka',
      }),
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

  before(() => {
    StartPage.open();
    BookingStart.waitUntilLoaded();
    BookingStart.waitUntilDataLoaded();

    BookingStart.package.departure.select(settings.departure);
    BookingStart.package.destination.open();
    BookingStart.package.destination.country.toggle(settings.country);
    BookingStart.package.destination.area.toggle(settings.area);
    BookingStart.package.destination.resort.select(settings.resort);
    BookingStart.package.datepicker.open();
    BookingStart.package.datepicker.selectDate(
      settings.date.departure.year,
      settings.date.departure.month,
      settings.date.departure.day,
      true,
    );

    state.selectedDepartureDate = BookingStart.package.datepicker.selectedDepartureDate;
    BookingStart.search.click();
  }, 2);

  describe('Analytics on charterflow-page', () => {
    before(() => {
      CharterFlow.waitForPageToLoad();
      CharterFlow.waitUntilLoaded();
      browser.pause(5000);
      state.dataLayerSearchEvent = getSearchEvent();
    });

    it('Should have correct departure and dates in dataLayer', () => {
      expect(state.dataLayerSearchEvent).to.deep.include({
        travelDepartureCode: 'ARN',
        travelDepartureYear: state.selectedDepartureDate.year,
        travelDepartureMonth: state.selectedDepartureDate.month,
        travelDepartureDay: state.selectedDepartureDate.day,
      });
    });

    it('Should have correct pax in dataLayer', () => {
      expect(state.dataLayerSearchEvent).to.deep.include({
        travelPax: '2',
        travelAdults: '2',
        travelAges: '42,42',
        travelChildren: '0',
      });
    });

    it('Should have correct destination in dataLayer', () => {
      expect(state.dataLayerSearchEvent).to.deep.include({
        travelCountryCode: 'ES',
        travelDestinationCode: 'LPA',
        travelResortCode: 'ARG',
      });
    });

    it('Should have correct misc data in dataLayer', () => {
      expect(state.dataLayerSearchEvent).to.deep.include({
        travelType: 'CharterPackage',
        travelSameRoom: 'true',
        travelDuration: '8',
        travelHits: CharterFlow.hotelListLength.toString(),
        travelAction: 'Search',
        event: 'Search',
      });
    });

    after(() => {
      CharterFlow.clickOnFirstHotel();
    });
  });

  describe('Testing hotelweb and pricematrix analytics', () => {
    before(() => {
      HotelBooking.waitForPageToLoad();
      browser.scroll('.bookingstart-section__search-button');
      browser.waitUntil(
        () => browser.isVisible(HotelBooking.selectors.charterPriceMatrix.selectedPrice) === true,
        30000, 'expected charterpricematrix to be displayed and showing a selected price within 30s',
      );
      browser.pause(5000);
      state.dataLayerSearchEvent = getSearchEvent();
    });

    it('Should have correct misc data in dataLayer', () => {
      expect(state.dataLayerSearchEvent.travelHotelCode.startsWith('LPA')).to.be.true;
      expect(state.dataLayerSearchEvent).to.deep.include({
        travelType: 'CharterPackage',
        travelSameRoom: 'true',
        travelDuration: '8',
        travelHits: CharterPriceMatrix.travelHitsLength.toString(),
        travelAction: 'Search',
        event: 'Search',
      });
    });

    it('Should have correct pax in dataLayer', () => {
      expect(state.dataLayerSearchEvent).to.deep.include({
        travelPax: '2',
        travelAdults: '2',
        travelAges: '42,42',
        travelChildren: '0',
      });
    });

    it('Should have correct departure and dates in dataLayer', () => {
      expect(state.dataLayerSearchEvent).to.deep.include({
        travelDepartureCode: 'ARN',
        travelDepartureYear: state.selectedDepartureDate.year,
        travelDepartureMonth: state.selectedDepartureDate.month,
        travelDepartureDay: state.selectedDepartureDate.day,
      });
    });

    it('Should have correct destination in dataLayer', () => {
      expect(state.dataLayerSearchEvent).to.deep.include({
        travelCountryCode: 'ES',
        travelDestinationCode: 'LPA',
        travelResortCode: 'ARG',
      });
    });
  });
});
