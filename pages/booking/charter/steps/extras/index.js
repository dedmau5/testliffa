import {
    locateElementAndClickOnIt,
    getInnerHTMLAsInteger
} from '../../../../../tools/elements';

import { Seating } from './seating';


const selectors = {
    buttons: {
        continue: "div.price-spec > div.submit-area > input[type=image]"
    },

    totalPrice: "div.total-price > div > div > span:nth-child(2)",

    priceOfSeating: "div.seating > div.info-panel > div.price-info > div.price-amount"
};


export class Extras extends Seating {
    /**
     * @param myChoices {MyChoices}
     * @param progress {Progress}
     */
    constructor(myChoices, progress) {
        super(myChoices, progress);

        this.myChoices = myChoices;
        this.progress = progress;

        this._buttons = {
            continue: {
                click: () => {
                    locateElementAndClickOnIt( selectors.buttons.continue );
                }
            }
        };
    }

    /**
     * @returns {number}
     * Returns the total price (at ving.se: Totalpris) shown above the continue button.
     */
    get totalPrice() {
        return getInnerHTMLAsInteger(
            selectors.totalPrice,
            { treatAsPrice: true }
        );
    }

    /**
     * @returns {number}
     * Returns the total price of seating.
     */
    get priceOfSeating() {
        return getInnerHTMLAsInteger(
            selectors.priceOfSeating,
            { treatAsPrice: true }
        );
    }

    /**
     * @returns {{
     *     continue: {
     *         click: (function())
     *     }
     * }}
     */
    get buttons() {
        return this._buttons;
    }
}