import {
    locateElementAndClickOnIt,
    getElement,
    getInnerHTML
} from '../../../tools/elements';

import { BasicFunctionality } from './basic-functionality';

export class CommonDeparture extends BasicFunctionality {

    /**
     * Creates an instance of CommonDeparture.
     * 
     * @param {string} selector
     * 
     * @memberOf CommonDeparture
     */
    constructor(selector) {
        super();

        const airportItem = 'div.departure-select__item';
        this.selectors.home = `${selector} > div.bookingstart-section__departure-select`;
        this.selectors.airport = {
            item: `${airportItem}`,
            selected: `${airportItem}.departure-select__item--selected`
        };
    }

    /**
     * Opens the overlay for departure
     */
    open(selector) {
        super.open(this.selectors.home);
        browser.waitForExist(this.selectors.close, 30000);
    }

    /**
     * Selects the departure value.
     * @param airportTitle {string}
     *
     * @returns {boolean}
     */
    select(airportTitle) {
        if (!super.isOverlayAllreadyOpen()) {
            this.open();
        }

        for (let _airport of this.airports) {
            if (_airport.title === airportTitle) {
                _airport.click();
                return true;
            }
        }

        return false;
    }



    /**
     * @returns {[{
     *     title: string,
     *     click: Function
     * }]}
     */
    get airports() {
        const airportElements = browser.elements(this.selectors.airport.item);

        if (!airportElements || !airportElements.value) {
            return [];
        }

        return airportElements.value.map( airportElement => {
            return {
                title: browser.elementIdText(airportElement.ELEMENT).value.trim(),
                click: () => {
                    browser.elementIdClick(airportElement.ELEMENT);
                    //this._airports = null; // The DOM will change after the previous call.
                }
            };
        });
    }


}