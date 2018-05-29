import { StartPage } from '../../../pages/start-page';
import LMSPage from '../../../pages/apps/last-minute-sales/last-minute-sales-pageobject';

describe('Testing the Last-Minute-Sales app', () => {
  before(() => {
    StartPage.open();
    browser.url('http://lastminutesales.dev.int/main'); // temporary link until we have a working LMS in oneweb
    LMSPage.waitForPageToLoadOnNewLMS(); // will replace current LMSPage.waitForPageToLoad()
  });

  describe('Testing "Dina resval"', () => {
    describe.skip('Testing "Avreseort"', () => {
      it('Should have departure default set to Stockholm-Arlanda', () => {
        expect(LMSPage.lmsSearch.departure.selected.getText()).to.equal('Stockholm-Arlanda');
      });

      it('Should open departure dropdown', () => {
        LMSPage.lmsSearch.departure.dropdown.click();
      });

      it('Should add another airport to depart from', () => {
        LMSPage.lmsSearch.departure.clickOnAirportByIndex(2);
      });

      it('Should close departure dropdown and perform new search', () => {
        LMSPage.lmsSearch.departure.close();

        console.log(`LENGTH: ${LMSPage.hotelList.hotels.length}`);

        let a = 0;
        while (a < LMSPage.hotelList.hotels.length) {
          console.log(`${a} ######################################################`);
          console.log(LMSPage.hotelList.hotels[a]);
          a++;
          // console.log(LMSPage.hotelList.hotels[a].getText());

          // VERIFY: that we have hits with the two departure-airports
        }

        // få till en bättre selektor ovan på avreseorten
        // skapa ett resultat
        // diffa mot resultatet att det innehåller 2 items

        // expect(LMSPage.hotelList.hotels.length).to.be.lessThan(state.numberOfHotelsInList);
      });
    });

    describe.skip('Testing "Avresa från"', () => {
      it('Should add description', () => {
      });
    });
  });
});
