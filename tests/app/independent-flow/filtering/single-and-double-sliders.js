import { StartPage } from '../../../../pages/start-page';
import { BookingStart } from '../../../../pages/apps/booking-start/index';
import IndependentFlow from '../../../../pages/apps/independent-flow/index';

describe('Testing the slider-functionality', () => {
  before(() => {
    StartPage.open();
    browser.sessionStorage('POST', { key: 'DT_TESTNAME', value: '*** webdriverio *** Independentflow-Filtering Sliders' });
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

  describe('Checking the double slider', () => {
    it('Should have a double slider', () => {
      IndependentFlow.hotelList.filter.ViewDoubleSlider();
    });

    it('Should move the left slider-button to the right', () => {
      const initValue = IndependentFlow.hotelList.filter.ViewDoubleSlidersGastbetyg();
      IndependentFlow.hotelList.filter.ClickOnDoubleSlider();

      expect(IndependentFlow.hotelList.filter.ViewDoubleSlidersGastbetyg()).to.not.be.equal(initValue);
    });
  });

  describe('Checking the single slider', () => {
    it('Should have a single slider..', () => {
      IndependentFlow.hotelList.filter.ClickResetFilters();
      IndependentFlow.hotelList.filter.ViewSingleSliderForPris();
    });

    it('Should move pris-slider to the left', () => {
      const initValue = IndependentFlow.hotelList.filter.ViewCurrentValueForSingleSliderPris();
      IndependentFlow.hotelList.filter.ClickOnSingleSlider();

      expect(IndependentFlow.hotelList.filter.ViewCurrentValueForSingleSliderPris()).to.not.be.equal(initValue);
    });
  });
});
// }
