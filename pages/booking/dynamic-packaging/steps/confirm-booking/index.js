import { selectors } from './selectors';
import {
    getInnerHTML,
    getInnerHTMLAsInteger,
    isSelected,
    locateElementAndClickOnIt
} from '../../../../../tools/elements';
import {
    ConfirmBookingTranslations
} from '../../../../../localization/booking/dynamic-packaging/confirm-booking';


class ConfirmBooking {
    /**
     * @param myChoices {MyChoices}
     * @param progress {Progress}
     */
    constructor(myChoices, progress) {
        this.myChoices = myChoices;
        this.progress = progress;
    }

    /**
     * @param timeout {number}
     * Must be larger than 0. The total amount of time, given in ms, for this function to wait for the page
     * to complete.
     */
    waitForPage(timeout=30000) {
        const startTime = (new Date()).getTime();
        const elapsedTime = () => {
            return (new Date()).getTime() - startTime;
        };

        browser.waitUntil(
            () => {
                return browser.getUrl().includes(ConfirmBookingTranslations.url);

            },
            timeout
        );

        browser.element(selectors.home).waitForExist(timeout - elapsedTime());
        this.myChoices.waitForExist(timeout - elapsedTime());
    }

    /**
     * @returns {{
     *     storeHistory: {
     *         summary: {label: string, check: function},
     *         details: {label: string, check: function}
     *     },
     *     acceptTerms: {
     *         summary: {label: string, check: function},
     *         details: {label: string, check: function}
     *     }
     * }}
     * Gives access to the checkboxes.
     */
    get checkboxes() {
        const generateLabelAndClickMethods = (summarySelector, detailsSelector) => {
            return {
                summary: {
                    get label() {
                        return `${getInnerHTML(summarySelector.label)} ${getInnerHTML(summarySelector.a)}`;
                    },
                    get isChecked() {
                        return isSelected(summarySelector.checkbox);
                    },
                    check: () => {
                        locateElementAndClickOnIt(summarySelector.checkbox);
                    }
                },
                details: {
                    get label() {
                        return `${getInnerHTML(detailsSelector.label)} ${getInnerHTML(detailsSelector.a)}`;
                    },
                    get isChecked() {
                        return isSelected(detailsSelector.checkbox);
                    },
                    check: () => {
                        locateElementAndClickOnIt(detailsSelector.checkbox);
                    }
                }
            };
        };

        const details = selectors.details;
        const summary = selectors.summary;

        return {
            storeHistory: generateLabelAndClickMethods(summary.storeHistory, details.storeHistory),
            acceptTerms: generateLabelAndClickMethods(summary.acceptTerms, details.acceptTerms)
        };
    }

    /**
     * @returns {{
     *     confirm: {
     *         summary: {click: function},
     *         details: {click: function}
     *     }
     *  }}
     *  Gives access to the buttons.
     */
    get buttons() {
        return {
            confirm: {
                summary: {
                    click: () => { locateElementAndClickOnIt(selectors.summary.confirmButton); }
                },
                details: {
                    click: () => { locateElementAndClickOnIt(selectors.details.confirmButton); }
                }
            }
        };
    }

    /**
     * @returns {number}
     * Returns the total price shown above the Book button.
     */
    get totalPrice() {
        return getInnerHTMLAsInteger(selectors.summary.totalPrice, { treatAsPrice: true });
    }
}

export { ConfirmBooking };