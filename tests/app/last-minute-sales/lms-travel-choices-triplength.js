import { StartPage } from '../../../pages/start-page';
import LMSPage from '../../../pages/apps/last-minute-sales/last-minute-sales-pageobject';

describe('Testing the Last-Minute-Sales app', () => {
  before(() => {
    StartPage.open();
    browser.url('/sista-minuten-resor'); // temporary link until we have a working LMS in oneweb
    LMSPage.waitForPageToLoadOnNewLMS(); // will replace current LMSPage.waitForPageToLoad()
  }, 1);

  describe('Testing "Dina resval"', () => {
    describe('Testing "Reslängd"', () => {
      it('Should have travellength default set to All', () => {
        expect(LMSPage.lmsSearch.tripLength.selected.getText()).to.equal('Alla');
      });

      it('Should be able to open the dropdown', () => {
        LMSPage.lmsSearch.tripLength.clickOnDropdown();
      });

      it('Should choose one week', () => {
        LMSPage.lmsSearch.tripLength.selectDropdownOptionByIndex(2);

        expect(LMSPage.lmsSearch.tripLength.selected.getText()).to.equal('1 vecka');
        LMSPage.hotelList.firstHotel.expectDurationToBeNoneOrWithin(6, 10);
      });

      it('Should choose two weeks', () => {
        LMSPage.lmsSearch.tripLength.clickOnDropdown();
        LMSPage.lmsSearch.tripLength.selectDropdownOptionByIndex(3);

        expect(LMSPage.lmsSearch.tripLength.selected.getText()).to.equal('2 veckor');
        LMSPage.hotelList.firstHotel.expectDurationToBeNoneOrWithin(11, 17);
      });

      it('Should choose three weeks', () => {
        LMSPage.lmsSearch.tripLength.clickOnDropdown();
        LMSPage.lmsSearch.tripLength.selectDropdownOptionByIndex(4);

        expect(LMSPage.lmsSearch.tripLength.selected.getText()).to.equal('3 veckor');
        LMSPage.hotelList.firstHotel.expectDurationToBeNoneOrWithin(18, 24);
      });

      it('Should choose weekend/miniweek', () => {
        LMSPage.lmsSearch.tripLength.clickOnDropdown();
        LMSPage.lmsSearch.tripLength.selectDropdownOptionByIndex(5);

        expect(LMSPage.lmsSearch.tripLength.selected.getText()).to.equal('Weekend/Minivecka');
        // We should change back to 2-5 when possible!
        // This step is temporary set to 2-6, because of a known accident of 6-day-trips being flagged as Weekend.
        // Waiting for those trips to be sold out.
        LMSPage.hotelList.firstHotel.expectDurationToBeNoneOrWithin(2, 6);
      });

      it('Should choose long holiday', () => {
        LMSPage.lmsSearch.tripLength.clickOnDropdown();
        LMSPage.lmsSearch.tripLength.selectDropdownOptionByIndex(6);

        expect(LMSPage.lmsSearch.tripLength.selected.getText()).to.equal('Långsemester');
        LMSPage.hotelList.firstHotel.expectDurationToBeNoneOrWithin(25, 500);
      });

      it('Should choose all', () => {
        LMSPage.lmsSearch.tripLength.clickOnDropdown();
        LMSPage.lmsSearch.tripLength.selectDropdownOptionByIndex(1);

        expect(LMSPage.lmsSearch.tripLength.selected.getText()).to.equal('Alla');
      });
    });
  });
});
