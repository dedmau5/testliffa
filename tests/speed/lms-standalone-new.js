import { StartPage } from '../../pages/start-page';
import LMSPage from '../../pages/apps/last-minute-sales/last-minute-sales-pageobject';

describe('Speedtest for new Last-Minute-Sales', () => {
  const selectors = {
    url: 'https://lastminutesales.acctest.int/main',
  };

  before(() => {
    StartPage.open();
  });

  describe('Tests to load new LMS page', () => {
    it('Should open LMS', () => {
      browser.url(selectors.url); // url to new lms-standalone-page
    });

    it('Should wait for LMS to load', () => {
      LMSPage.waitForPageToLoadOnNewLMS();
    });

    it('Should wait another 10s to be sure page had time to load', () => {
      browser.pause(10000);
    });
  });
});
