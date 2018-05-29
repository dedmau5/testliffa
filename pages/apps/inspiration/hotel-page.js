import {
    getElement
} from "../../../tools/elements";

import { PriceList } from './price-list';

const priceList = "div.form";

const selectors = {
    hotelName: ["div.hotel-info-view h1", "h1.hotelpage-header__title"],
    rating: "#hotelSidebar > div.customer-satisfaction-figures > a",
};


class HotelPage {
    waitForPageToLoad( timeout=30000 ) {
        browser.waitUntil(
            () => {
                return browser.isExisting( selectors.hotelName[0] ) || browser.isExisting( selectors.hotelName[1] );
            },
            timeout
        );
    }

    /**
     * @returns {string}
     */
    get name() {
        if ( browser.isExisting( selectors.hotelName[0] ) ) {
            return getElement( selectors.hotelName[0] ).getText();
        }

        return getElement( selectors.hotelName[1] ).getText();
    }

    /**
     * @returns {number}
     */
    get rating() {
        return parseFloat(
            getElement( selectors.rating )
                .getText()
                .replace(",", ".")
        );
    }

    /**
     * @returns {PriceList}
     */
    get priceList() {
        if ( ! this._priceList ) {
            this._priceList = new PriceList();
        }

        return this._priceList;
    }
}

export default new HotelPage();