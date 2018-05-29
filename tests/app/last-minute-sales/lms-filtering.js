import { StartPage } from '../../../pages/start-page';
import LMSPage from '../../../pages/apps/last-minute-sales/last-minute-sales-pageobject';

describe('Testing the Last-Minute-Sales app', () => {
  before(() => {
    StartPage.open();
    browser.url('http://lastminutesales.dev.int/main'); // temporary link until we have a working LMS in oneweb
    LMSPage.waitForPageToLoadOnNewLMS(); // will replace current LMSPage.waitForPageToLoad()
  });

  describe('Testing "Dina resval"', () => {
    describe.skip('Testing filters', () => {
      it('Should have filter for traveltype', () => {
        browser.waitForExist('.webui-checkbox__content', 15000);
      });

      it('Should have a Slider-filter', () => {
        browser.waitForExist('.webui-filter-slider__control-line-wrapper', 15000);
      });

      it('Should have filter for Destination', () => {
        browser.waitForExist('.webui-checkbox', 15000);
      });
    });
  });
});
