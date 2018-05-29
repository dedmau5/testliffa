import { HotelFinderWebPage } from '../../../../pages/apps/hotel-finder-web/hotel-finder-pageobject';

const selectors = {
    hotelResultList: "div.hotel-list-wrapper",
    selectButton: ".price-wrapper a img",
};

export function CanSelectHotelInHotelFinderResultList() {
    describe( "Select hotel", function () {
        it("click on first hotel in hotelfinder result list", function () {
            browser.click(selectors.selectButton);
            console.log('clicking select button ');
        });
    });
}