import { StartPage } from '../../../pages/start-page';
import LMSPage from '../../../pages/apps/last-minute-sales/last-minute-sales-pageobject';

describe('Testing the Last-Minute-Sales app', () => {
  before(() => {
    StartPage.open();
    browser.url('http://lastminutesales.dev.int/main'); // temporary link until we have a working LMS in oneweb
    LMSPage.waitForPageToLoadOnNewLMS(); // will replace current LMSPage.waitForPageToLoad()
  });

  describe('Testing "Dina resval"', () => {
    describe.skip('Testing "Avresa från"', () => {
      it('Should add description', () => {
      });
    });
  });
});
