import { StartPage } from '../../../../pages/start-page';
import { BookingStart } from '../../../../pages/apps/booking-start/index';
import IndependentFlow from '../../../../pages/apps/independent-flow/index';

// for (let i = 0; i < 10; i++) {

describe('Testing to move inbetween pages and not loose filter-settings', () => {
  before(() => {
    StartPage.open();
    browser.sessionStorage('POST', { key: 'DT_TESTNAME', value: '*** webdriverio *** Independentflow-Filtering Page-Transitions' });
    browser.sessionStorage('POST', { key: 'DT_TESTRUNID', value: 'UID' });
    BookingStart.waitUntilLoaded();
    BookingStart.city.click();
    BookingStart.waitUntilDataLoaded();
    BookingStart.city.destination.open();
    BookingStart.city.destination.select('Barcelona');
    BookingStart.search.click();
    IndependentFlow.hotelList.waitUntilLoaded();
    IndependentFlow.hotelList.filter.WaitForFilteringToLoad();
  });

  describe('Checking if filters is saved moving in between hotelweb', () => {
    it('Should be able to check a checkbox', () => {
      IndependentFlow.hotelList.filter.CheckACheckbox(1);
    });

    it('Should choose a hotel', () => {
      IndependentFlow.hotelList.hotels[0].select();
    });

    it('Should browserback to hotel-list in independent-flow', () => {
      IndependentFlow.hotelList.filter.BrowserbackToHotelList();
    });

    it('Should have filters when coming back to hotel list', () => {
      expect(IndependentFlow.hotelList.panel.isHotelListFiltred()).to.be.true;
    });
  });
});
// }
