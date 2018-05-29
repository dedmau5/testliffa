import * as helpers from '../../../tools/elements';

class SelectedDeparture {
    constructor(selector) {
        this.selectors = {
            base: selector,
            departureOut: '.wdio-departure-out .wdio-departure-date',
        };
    }

    get baseElement() {
        if (!this._element) {
            this._element = helpers.getElement(this.selectors.base).value;
        }
        return this._element;
    }

    /**
     * Get the value displayed in summary for total price
     * @returns {{value: number, discount: boolean}}
     */
    get departureOut() {
        if (!this._departureOut) {
            const departureOut = helpers.getElementWithinElement(this.baseElement, this.selectors.departureOut);
            this._departureOut = helpers.getInnerHTML(departureOut.value);
        }
        return this._departureOut;
    }
}

export default SelectedDeparture;
