import { LMSPage } from '../../../../pages/apps/last-minute-sales/last-minute-sales-pageobject';

const selectors = {
    namedHotel: ".travel-type-wrapper .travel-type-label",
    selectButton: ".last-minute-sales-select-button",
};

export function CanSelectLMSTrip() {
    describe( "Select LMS Trip", function () {
        it("click on first trip in last-minute-sales-trip-list-wrapper", function () {
            browser.click(selectors.selectButton);
            console.log('clicking select button ');
        });
    });
}