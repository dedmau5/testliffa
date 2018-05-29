import { StartPage } from '../../../../pages/start-page';
import { BookingStart } from '../../../../pages/apps/booking-start/index';
import IndependentFlow from '../../../../pages/apps/independent-flow/index';

// for (let i = 0; i < 10; i++) {

describe('Testing the checkbox functionality', () => {
  const state = {}; // used for variables spread over different files/tests

  before(() => {
    StartPage.open();
    browser.sessionStorage('POST', { key: 'DT_TESTNAME', value: '*** webdriverio *** Independentflow-Filtering Checkboxes' });
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

  describe('Checking the checkbox.', () => {
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
