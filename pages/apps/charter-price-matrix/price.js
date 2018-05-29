import * as helpers from '../../../tools/elements';

class Price {
    constructor(element) {
        this._element = element;

        this.selectors = {
            available: 'wdio-price--available',
            selected: 'wdio-price--selected',
            discount: 'wdio-price--discount',
        };
    }

    /**
     * Get the properties of this cell in matrix
     * @returns {{value: number, discount: boolean, available: boolean, selected: boolean}|*}
     */
    get totalPrice() {
        if (!this._price) {
            const classes = helpers.getElementAttribute(this._element, 'class');
            const available = classes.indexOf(this.selectors.available) >= 0;
            this._price = {
                value: available ? helpers.getInnerHTMLAsInteger(this._element, { treatAsPrice: true }) : 0,
                discount: classes.indexOf(this.selectors.discount) >= 0,
                available: available,
                selected: classes.indexOf(this.selectors.selected) >= 0,
            };
        }
        return this._price;
    }

    /**
     * Go to next page in charter booking flow
     */
    select() {
        if (!this.totalPrice.available) {
            throw new Error('Cant select cell that is not available');
        }
        browser.elementIdClick(this._element.ELEMENT);
    }
}

export default Price;
