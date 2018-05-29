import { StartPage } from '../../../pages/start-page';
import LMSPage from '../../../pages/apps/last-minute-sales/last-minute-sales-pageobject';

describe('Testing the Last-Minute-Sales app', () => {
  before(() => {
    StartPage.open();
    // browser.url("http://lastminutesales.dev.int/main"); // temporary link until we have a working LMS in oneweb
    browser.click('body > div > a:nth-child(2)');
    LMSPage.waitForPageToLoadOnNewLMS(); // will replace current LMSPage.waitForPageToLoad()
  });

  describe('Testing Travel-choices', () => {
    describe('Testing Passengers', () => {
      it('Should have 2 vuxna as default-value', () => {
        expect(LMSPage.lmsSearch.passengers.selected.getText()).to.equal('2 vuxna');
      });

      it('Should open dropdown', () => {
        LMSPage.lmsSearch.passengers.clickOnDropdown();
      });

      it('Should change adults to one', () => {
        LMSPage.lmsSearch.passengers.adults.selectDropdownOptionByIndex(1);
        expect(LMSPage.lmsSearch.passengers.adults.selected.getText()).to.equal('1');
      });

      it('Should have a DTU-message displaying since only one adult on trip', () => {
        LMSPage.lmsSearch.passengers.adults.waitForDtuMessagetoExist();
        browser.pause(1000);
      });

      it('Should change adults to two', () => {
        LMSPage.lmsSearch.passengers.adults.selectDropdownOptionByIndex(2);
        expect(LMSPage.lmsSearch.passengers.adults.selected.getText()).to.equal('2');
      });

      it('Should add one child', () => {
        LMSPage.lmsSearch.passengers.childrenDropdown.selectDropdownOptionByIndex(1);
        expect(LMSPage.lmsSearch.passengers.childrenDropdown.selected.getText()).to.equal('1');
        LMSPage.lmsSearch.passengers.firstChild.waitForDropdownToLoad();
      });

      it('Should set age 0 years on child(infant) one', () => {
        LMSPage.lmsSearch.passengers.firstChild.setAgeTo(0);
      });

      it('Should add a second child and set age to 1 years', () => {
        LMSPage.lmsSearch.passengers.childrenDropdown.selectDropdownOptionByIndex(2);
        expect(LMSPage.lmsSearch.passengers.childrenDropdown.selected.getText()).to.equal('2');
        LMSPage.lmsSearch.passengers.secondChild.waitForDropdownToLoad();

        LMSPage.lmsSearch.passengers.secondChild.setAgeTo(1);
      });

      it('Should add a third child and set age to 1 years - and get an error message', () => {
        LMSPage.lmsSearch.passengers.childrenDropdown.selectDropdownOptionByIndex(3);
        LMSPage.lmsSearch.passengers.thirdChild.waitForDropdownToLoad();

        LMSPage.lmsSearch.passengers.thirdChild.setAgeTo(1);
        browser.pause(3000);
        // checka att vi får ett felmeddelande
      });

      it.skip('Should remove child three and click update to close the popup', () => {
      });
    });
  });
});
