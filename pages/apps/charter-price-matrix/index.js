
/*
 * Pageobject for pricematrix in hotelweb
 */

import * as helpers from '../../../tools/elements';
import Room from './room';
import Summary from './summary';


class CharterPriceMatrix {
     constructor(selector="#price-matrix-app-root") {
        const home = selector;
        const roomMatrixHome = "#room-matrix-container";

        this.selectors = {
            home: home,
            selectedPrice: `${roomMatrixHome} .wdio-price--selected`,
            selectedPriceDiscount: `${roomMatrixHome} .wdio-price--discount`,
            rooms: `${roomMatrixHome} .wdio-room`,
            buttons: {
                next: `${home} ${roomMatrixHome} .wdio-later`,
                previous: `${home} ${roomMatrixHome} .wdio-earlier`,
            },
            summary: `${home} .wdio-summary`,
            travelHits: `${home} .room-type__price-container:not(.room-type__price-container--sold-out)`,
        };
    }

    /**
     * Get the selected price in the price matrix and bool indicating if the price has a discount
     * @returns {{value: number, discount: boolean}}
     */
    selectedPrice() {
        const price = helpers.getElement(this.selectors.selectedPrice);
        const classes = helpers.getElementAttribute(this.selectors.selectedPrice, 'class');
        return {
            value: helpers.getInnerHTMLAsInteger(price.value, { treatAsPrice: true }),
            discount: classes.indexOf(this.selectors.selectedPriceDiscount) >= 0,
        };
    }

    /**
     * Move to previous departure prices
     */
    previous() {
        helpers.locateElementAndClickOnIt(this.selectors.buttons.previous);
        this._prices = null;
    }

    /**
     * Move to later departure prices
     */
    next() {
        helpers.locateElementAndClickOnIt(this.selectors.buttons.next);
        this._prices = null;
    }

    /**
     * Get a list of all rooms for the hotel
     * @returns {[Room]}
     */
    get rooms() {
        if (!this._rooms) {
            const result = browser.elements(this.selectors.rooms);

            if (!result || !Array.isArray(result.value)) {
                this._rooms = [];
            } else {
                this._rooms = Array.map(result.value, (room) => new Room(room));
            }
        }
        return this._rooms;
    }

    /**
     * Get the summary part of price matrix
     * @returns {Summary}
     */
    get summary() {
        if (!this._summary) {
            this._summary = new Summary(this.selectors.summary);
        }
        return this._summary;
    }

    /**
     * Get number of hits that are selectable
     * @returns number
     */
    get travelHitsLength() {
        return helpers.getElements(this.selectors.travelHits).length
    }

    waitUntilLoaded() {
        browser.waitUntil(
            () => {
                const result = browser.elements(this.selectors.selectedPrice);
                return result && Array.isArray(result.value) && result.value.length > 0;
            },
            5000
        );
    }

    isVisible(){
        return browser.isVisible(this.selectors.home);
    }
}

const charterPriceMatrix = new CharterPriceMatrix();

/**
 * @type {CharterPriceMatrix}
 */
export default charterPriceMatrix;
