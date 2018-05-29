import {
    locateElementAndClickOnIt,
    getInnerHTMLAsInteger
} from '../../../../tools/elements';


export class ConfirmBooking {
    /**
     * @param myChoices {MyChoices}
     * @param progress {Progress}
     */    
    constructor(myChoices, progress) {
        this.myChoices = myChoices;
        this.progress = progress;

        this.selectors = {
            home: "div.booking-confirm-summary",
            checkboxes: {
                history: ".form-confirm.form-confirm-top.cf > div:nth-last-of-type(3) > input[type=checkbox]",
                terms: ".form-confirm.form-confirm-top.cf > div:nth-last-of-type(2) > input[type=checkbox]"
            },

            buttons: {
                confirm: "div.confirm-submit-area > input[type=image]"
            },

            totalPrice: "div.booking-confirm-total-price"
        };

        this._buttons = {
            confirm: {
                click: () => {
                    locateElementAndClickOnIt(this.selectors.buttons.confirm);
                }
            }
        };

        this._checkboxes = {
            history: {
                click: () => {
                    locateElementAndClickOnIt(this.selectors.checkboxes.history);
                },
                isChecked: () => {
                    return browser.isSelected(this.selectors.checkboxes.history);
                }
            },

            terms: {
                click: () => {
                    locateElementAndClickOnIt(this.selectors.checkboxes.terms);
                },
                isChecked: () => {
                    return browser.isSelected(this.selectors.checkboxes.terms);
                }
            }
        };
    }

    /**
     * @returns {{confirm: {click: (function())}}}
     */
    get buttons() {
        return this._buttons;
    }

    /**
     * @returns {{
     *     history: {
     *         click: (function()),
     *         isChecked: (function())
     *     },
     *     terms: {
     *         click: (function()),
     *         isChecked: (function())
     *     }
     * }}
     */
    get checkboxes() {
        return this._checkboxes;
    }

    /**
     * @returns {number}
     */
    get totalPrice() {
        return getInnerHTMLAsInteger(this.selectors.totalPrice,
            {
                treatAsPrice: true,
                removeCharactersBeforeFirstColon: true
            }
        );
    }

    waitForPage() {
        browser.waitForExist(this.selectors.home, 30000);
        browser.waitForExist(this.selectors.checkboxes.history, 30000);
        browser.waitForExist(this.selectors.checkboxes.terms, 30000);
    }
}
