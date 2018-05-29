import { StartPage } from '../../pages/start-page';
import LMSPage from '../../pages/apps/last-minute-sales/last-minute-sales-pageobject';

describe('Speedtest for new Last-Minute-Sales', () => {
  const selectors = {
    url: '/sista-minuten-resor2',
  };

  before(() => {
    StartPage.open(); // öppnar http://vingse.acctest.int/
    browser.sessionStorage('POST', { key: 'DT_TESTNAME', value: '*** webdriverio *** LMS Speed' }); // loggar mot dynatrace
    browser.sessionStorage('POST', { key: 'DT_TESTRUNID', value: 'LMS-1' });
  });

  after(() => {
    browser.execute('dynaTrace.endVisit();'); // kör script för dynatrace
    browser.pause(10000);
  });

  describe('Tests to load new LMS page', () => {
    it('Should open LMS', () => {
      browser.url(selectors.url); // url to new lms-page
    });

    it('Should wait for LMS to load', () => {
      LMSPage.waitForPageToLoadOnNewLMS();
      browser.pause(20000);
    });
  });
});
