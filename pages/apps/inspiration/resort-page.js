import {
    getElementWithinElement,
    getElement,
    getElements,
    getInnerHTMLAsInteger,
    getInnerHTML
} from "../../../tools/elements";


const selectors = {
    resortName: "div.resort-info-container h1",

    hotels: "div.new-hotel-list > div.hit",

    hotel: {
        name: "div.hotel-info > h3 > a",
        area: {
            minor: "div.hotel-info > p.area > a:nth-child(1)",
            major: "div.hotel-info > p.area > a:nth-child(2)"
        },
        rating: "div.hotel-info > div.ratings > div.rating > strong",
        price: "div.price-info > div.hotel-price > p.price:nth-child(1) > a",
        chooseButton: "div.price-info > div.trip-button > a"
    }
};


class Hotel {
    constructor( hotel ) {
        this._name = getElementWithinElement( hotel, selectors.hotel.name ).getText();
        this._area = {
            minor: getElementWithinElement( hotel, selectors.hotel.area.minor ).getText(),
            major: getElementWithinElement( hotel, selectors.hotel.area.major ).getText()
        };

        this._rating = parseFloat(
            getInnerHTML( getElementWithinElement( hotel, selectors.hotel.rating ).value )
                .replace(",", ".")
        );

        const priceElement = getElementWithinElement( hotel, selectors.hotel.price, true );

        this._price = priceElement.isExisting() ?
            getInnerHTMLAsInteger( priceElement.value, { treatAsPrice: true } )
            :
            0;

        this._chooseButton = { click: getElementWithinElement( hotel, selectors.hotel.chooseButton ).click };
    }

    /**
     * @returns {string}
     */
    get name() { return this._name; }

    /**
     * @returns {{minor: string, major: string}}
     */
    get area() { return this._area; }

    /**
     * @returns {number}
     */
    get rating() { return this._rating; }

    /**
     * @returns {number}
     */
    get price() { return this._price; }

    /**
     * @returns {{click: Function}}
     */
    get chooseButton() { return this._chooseButton; }
}


class ResortPage {
    waitForPageToLoad( timeout=30000 ) {
        browser.waitForExist( selectors.resortName, timeout );
    }

    /**
     * @returns {string}
     */
    get name() {
        return getElement( selectors.resortName ).getText();
    }

    /**
     * @returns {Hotel[]}
     */
    get hotels() {
        return getElements( selectors.hotels ).map(
            hotel => new Hotel( hotel )
        );
    }
}

export default new ResortPage();