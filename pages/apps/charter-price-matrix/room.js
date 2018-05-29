import * as helpers from '../../../tools/elements';
import Price from './price';

class Room {
    constructor(element) {
        this._element = element;

        this.selectors = {
            name: '.wdio-room-name',
            part: '.wdio-part-name',
            date: '.wdio-price',
        };
    }

    /**
     * Get the name of the room
     * @returns {string}
     */
    get name() {
        if (!this._name) {
            const element = helpers.getElementWithinElement(this._element, this.selectors.name);
            this._name = helpers.getInnerHTML(element.value);
        }
        return this._name;
    }

    /**
     * The name of the hotel part for this room
     * @returns {string}
     */
    get part() {
        if (!this._part) {
            const element = helpers.getElementWithinElement(this._element, this.selectors.part);
            this._part = helpers.getInnerHTML(element.value);
        }
        return this._part;
    }

    /**
     * Get the list of prices for this room
     * @returns {[Price]}
     */
    get prices() {
        if (!this._prices) {
            const dates = helpers.getElementsWithinElement(this._element, this.selectors.date);
            if (!dates || !Array.isArray(dates.value)) {
                throw new Error('No prices found');
            }
            this._prices = Array.map(dates.value, (date) => new Price(date));
        }
        return this._prices;
    }
}

export default Room;
