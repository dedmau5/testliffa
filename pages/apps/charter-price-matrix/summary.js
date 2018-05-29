import * as helpers from '../../../tools/elements';

class Summary {
    constructor(selector) {
        this.selectors = {
            base: selector,
            totalPrice: '.wdio-total-price',
            totalPriceDiscount: '.wdio-total-price--discount',
            submit: `${selector} .primary`,
            depositAmount: '.wdio-deposit',
            finalAmount: '.wdio-final',
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
    get totalPrice() {
        if (!this._price) {
            const price = helpers.getElementWithinElement(this.baseElement, this.selectors.totalPrice);
            const classes = helpers.getElementAttribute(price.value, 'class');
            this._price = {
                value: helpers.getInnerHTMLAsInteger(price.value, { treatAsPrice: true }),
                discount: classes.indexOf(this.selectors.totalPriceDiscount) >= 0,
            };
        }
        return this._price;
    }

    /**
     * Get the value to pay as deposit or 0 if not found
     * @returns {number}
     */
    get depositAmount() {
        if (!this._depositAmount) {
            try {
                const deposit = helpers.getElementWithinElement(this.baseElement, this.selectors.depositAmount);
                this._depositAmount  = helpers.getInnerHTMLAsInteger(deposit.value, { treatAsPrice: true });
            } catch (err) {
                this._depositAmount = 0;
            }
        }
        return this._depositAmount;
    }

    /**
     * Get the value to pay as final payment or 0 if not found
     * @returns {number}
     */
    get finalAmount() {
        if (!this._finalAmount) {
            try {
                const final = helpers.getElementWithinElement(this.baseElement, this.selectors.finalAmount);
                this._finalAmount  = helpers.getInnerHTMLAsInteger(final.value, { treatAsPrice: true });
            } catch (err) {
                this._finalAmount = 0;
            }
        }
        return this._finalAmount;
    }

    /**
     * Go to next page in charter booking flow
     */
    submit() {
        helpers.locateElementAndClickOnIt(this.selectors.submit);
    }
}

export default Summary;
