import { HotelFinderWebPage } from '../../../../pages/apps/hotel-finder-web/hotel-finder-pageobject';

const selectors = {
  hotelInfo: '#hotelpage',
  bookButton: "input[id*='BookButton']",
};

export function CanSelectHotelAndSupplementsOnHotelPage() {
  describe('Select hotel and supplements on hotel page', function() {
    it('click on first hotel in hotelfinder result list', function() {
      browser.waitForExist(selectors.hotelInfo, 30000);
      console.log('on HotelListPage ');
      // browser.click(selectors.selectButton);
      // console.log('clicking select button ');
    });
  });
}
