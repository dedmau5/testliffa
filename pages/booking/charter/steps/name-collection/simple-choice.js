import {
    getElement,
    getElementWithinElement,
    getOptionsForGivenSelectElement
} from '../../../../../tools/elements';


export class SimpleChoice {
    /**
     * Accepts either a
     *    WebElement JSON object and a selector
     *    or
     *    a WebdriverIO.ELEMENT object and 'id' selector
     *
     * @param element {{value: WebdriverIO.Element} | WebdriverIO.Element}
     * @param selector {string}
     */
    constructor( element, selector="div.extra-choice-and-price select.extra-mandatory-choice-dropdown" ) {
        this._dropdownElement =
            element && element.ELEMENT ? getElement(selector) :
            getElementWithinElement(element.value, selector);

        this._choices = getOptionsForGivenSelectElement( this._dropdownElement.value );
    }

    /**
     * @returns {[{value: string, text: string}]}
     * Returns an array of a dictionary objects with the keys 'value' and 'text' holding string values.
     */
    get choices() {
         return this._choices;
    }

    /**
     * @param value {string}
     * Sets the <select> element's value. 'value' must be a valid <option> value.
     */
    set value( value ) {
        this._dropdownElement.selectByValue( value );
        getElementWithinElement(this._dropdownElement.value, `option[value='${value}']`).waitForSelected();
    }

    /**
     * Retrieves the selected <option> value in the <select>
     *
     * @returns {string}
     */
    get value() {
        return this._dropdownElement.getValue();
    }

    /**
     * Retrieves the selected <option> text in the <select>
     *
     * @returns {string}
     */
    get text() {
        return getElementWithinElement(
            this._dropdownElement.value,
            `option[value='${this.value}']`
        ).getText();
    }
}