import { HotelFinderWebPage } from '../../../../pages/apps/hotel-finder-web/hotel-finder-pageobject';

const selectors = {
    monthsDropDown: "div[data-choices='months']",
    selectFiveMonthsAhead: "div[data-choices='months'] div.popup label+label+label+label+label input",
    hotelCounter: "#hotel-count",
};

export function CanPerformSearchInHotelFinder() {
    describe( "Searching in Hotel Finder search box", function() {
        it("opening months drop down", function () {
            browser.click(selectors.monthsDropDown);
            browser.pause(1000);
        });

        it("Selecting 5 months ahead of todays date", function() {
            browser.click(selectors.selectFiveMonthsAhead);
            browser.pause(1000);
        });

        it("perform 'dry click' on HotelCounter to close months drop down ", function() {
            browser.click(selectors.hotelCounter);
            browser.pause(1000);
        });
    });
}

