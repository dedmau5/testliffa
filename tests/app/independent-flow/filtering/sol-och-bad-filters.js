import { StartPage } from '../../../../pages/start-page';
import { BookingStart } from '../../../../pages/apps/booking-start/index';
import IndependentFlow from '../../../../pages/apps/independent-flow/index';

// for (let i = 0; i < 10; i++) {

describe('Testing that city-filters exists', () => {
  before(() => {
    StartPage.open();
    browser.sessionStorage('POST', { key: 'DT_TESTNAME', value: '*** webdriverio *** Independentflow-Filtering Sol-o-Bad' });
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

  describe('Checking that all filters exists for Sol & Bad', () => {
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

    it('Should have Avstånd till Strand', () => {
      IndependentFlow.hotelList.filter.ViewFilterAvstandTillStrand();
    });

    it('Should have Avstånd till Lokalt Centrum', () => {
      IndependentFlow.hotelList.filter.ViewFilterAvstandTillLokaltCentrum();
    });

    it('Should have Boende', () => {
      IndependentFlow.hotelList.filter.ViewFilterBoende();
    });

    it('Should have Pool', () => {
      IndependentFlow.hotelList.filter.ViewFilterPoolForSolOchBad();
    });
  });
});
// }
