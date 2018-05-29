import { LMSPage } from '../../../../pages/apps/last-minute-sales/last-minute-sales-pageobject';

const selectors = {
    namedHotel: ".travel-type-wrapper .travel-type-label",
    selectButton: ".last-minute-sales-select-button",
};

export function CanFilterLMSTrip() {
    describe( "Filter on Named Hotel In Filter Panel", function() {
        it("click on Named Hotel filter", function () {
            browser.click(selectors.namedHotel);
            console.log('clicking namedHotel ');
            browser.pause(1000);
            console.log('pausing for list to take filtered values. ');
        });
    });
}

