import { HotelFinderWebPage } from '../../../../pages/apps/hotel-finder-web/hotel-finder-pageobject';

const selectors = {
    facets: "#facets",
    filterAllInclusive: "#Checkbox1", 
    selectButton: "",
};

export function CanFilterValuesInHotelFinder() {
    describe( "Filter values in Hotel Finder facets", function() {
        it("click on specified filters", function () {
            browser.click(selectors.filterAllInclusive);
            console.log('clicking All Inclusive ');
            browser.pause(1000);
            console.log('pausing for list to take filtered values. ');
        });
    });
}

