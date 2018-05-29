import { LMSPage } from '../../../../pages/apps/last-minute-sales/last-minute-sales-pageobject';
import index from './index.js';

const selectors = {
    //tripButton: "[id*='trip-button']",
    selectButton: ".wdio-hotel-select"
};

export function CanSelectTripOnLMSHotelList() {
    describe( "Select trip on last-minute-sales hotel list", function () {
        it("click on selected hotel", function () {
            browser.waitForExist(selectors.selectButton, 30000);
            console.log("on HotelListPage ");
            
            //browser.click(selectors.selectButton);
            //console.log('clicking select button ');
        });
    });
}
