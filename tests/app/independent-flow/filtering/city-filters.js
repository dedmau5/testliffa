import { StartPage } from '../../../../pages/start-page';
import { BookingStart } from '../../../../pages/apps/booking-start/index';
import IndependentFlow from '../../../../pages/apps/independent-flow/index';

// for (let i = 0; i < 10; i++) {

describe('Testing that city-filters exists', () => {
  const state = {}; // used for variables spread over different files/tests

  before(() => {
    StartPage.open();
    browser.sessionStorage('POST', { key: 'DT_TESTNAME', value: '*** webdriverio *** Independentflow-Filtering City-filters' });
    browser.sessionStorage('POST', { key: 'DT_TESTRUNID', value: 'UID' });
    BookingStart.waitUntilLoaded();
    BookingStart.city.click();
    BookingStart.waitUntilDataLoaded();
    BookingStart.city.destination.open();
    BookingStart.city.destination.select('London');
    BookingStart.search.click();
    IndependentFlow.hotelList.waitUntilLoaded();
    IndependentFlow.hotelList.filter.WaitForFilteringToLoad();
  });

  describe('Checking that all filters exists for City', () => {
    it('Should have Stadsdelar', () => {
      IndependentFlow.hotelList.filter.ViewFilterStadsdelar();
    });

    it('Should have Hotellstandard', () => {
      IndependentFlow.hotelList.filter.ViewFilterHotellstandard();
    });

    it('Should have Gästbetyg', () => {
      IndependentFlow.hotelList.filter.ViewFilterGastbetyg();
    });

    it('Should have Mat o Dryck', () => {
      IndependentFlow.hotelList.filter.ViewFilterMatOchDryck();
    });

    it('Should have Internet', () => {
      IndependentFlow.hotelList.filter.ViewFilterInternet();
    });

    it('Should have Pris', () => {
      IndependentFlow.hotelList.filter.ViewFilterPris();
    });

    it('Should have Avstånd till tunnelbana', () => {
      IndependentFlow.hotelList.filter.ViewFilterAvstandTillTunnelbana();
    });

    it('Should have Pool', () => {
      IndependentFlow.hotelList.filter.ViewFilterPoolForCity();
    });
  });

  describe('Checking the checkbox', () => {
    it('Should have checkboxes', () => {
      IndependentFlow.hotelList.filter.ViewCheckBoxes();
    });

    it('Should remember checkbox counter-value for comparison in another check', () => {
      IndependentFlow.hotelList.filter.RememberCheckboxCounterValueByIndex(1, state);
    });

    it('Should be able to check a checkbox', () => {
      IndependentFlow.hotelList.filter.CheckACheckbox(1);
    });

    it('Should have same value in checkbox-counter and in hotellist hits-counter', () => {
      expect(state.checkboxValueByIndex).to.be.equal(IndependentFlow.hotelList.panel.hits);
    });

    it('Should be able to uncheck a checkbox', () => {
      IndependentFlow.hotelList.filter.UncheckACheckbox(1);
    });

    it('Should display outfiltered checkbox correctly', () => {
      IndependentFlow.hotelList.filter.ViewOutfilteredStadsdelar();
    });

    it('Should expand the map & infotext', () => {
      IndependentFlow.hotelList.filter.ExpandMapAndInfo(1);
      IndependentFlow.hotelList.filter.ViewMapAndInfo(1);
    });

    it('Should collapse the map & infotext', () => {
      IndependentFlow.hotelList.filter.CollapseMapAndInfo(1);
    });
  });
});
// }
