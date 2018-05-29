import { Translate } from '../../../tools';
import {
    getElements,
    getElementWithinElement
} from '../../../tools/elements';
import PageBase from '../../page-base.js';


const selectors = {
    bookings: "div.booking-info",
    booking: {
        number: "div.booking-data div.booking-number > span",
        bookingAndPaymentButton: "div.align-right > input"
    },
    pageTabs: "div.my-page div.rw-tabs",
    logOutLink: ".logOutLink a"
};


class _MyPage extends PageBase {
    /**
     * @returns {{waitForExists: (function(number=))}}
     */
    get pageTabs() {
        return {
            /**
             * @param {number} timeout=30000
             */
            waitForExists: (timeout=30000) => {
                browser.waitForExist(selectors.pageTabs, timeout);
            }
        };
    }

    navigateTo() {
        browser.url('/' + Translate({
            dk: "minside",
            fi: "omat-sivut",
            no: "min-side",
            se: "minsida",
            globe: "minsida"
        }));
    }

    waitUntilLoaded() {
        this.pageTabs.waitForExists();
    }

    /**
     * @returns {{
     *     waitForExists: (function(number=)),
     *     click: (function())
     * }}
     */
    get logOutLink() {
        return {
            /**
             * @param {number} timeout=30000
             */
            waitForExists: (timeout=30000) => {
                browser.waitForExist(selectors.logOutLink, timeout);
            },

            click: () => {
                locateElementAndClickOnIt(selectors.logOutLink);
            }
        };
    }

    get logOutButton() {
        if (!this._logOutButton) {
            this._logOutButton = browser.element(selectors.logOutLink);
        }
        return this._logOutButton;
    }


    /**
     * @param bookingNumber {string}
     * @returns {{
     *     number: {string},
     *     bookingAndPaymentButton: {
     *     }
     * }}
     */
    booking(bookingNumber) {
        for (let booking of getElements(selectors.bookings)) {
            const bookingNumber = getElementWithinElement(booking, selectors.booking.number);

            if ( bookingNumber == bookingNumber ) {
                const bookingAndPaymentButton =
                    getElementWithinElement(booking, selectors.booking.bookingAndPaymentButton);

                return {
                    number: bookingNumber,
                    bookingAndPaymentButton: {
                        click: bookingAndPaymentButton.click
                    }
                };
            }
        }

        throw new Error(`Couldn't find a booking with the given booking number: ${bookingNumber}!`);
    }

    get bookings() {
        return getElements(selectors.bookings).map( (booking) => {
            return {
                number: getElementWithinElement(booking, selectors.booking.number),
                bookingAndPaymentButton: {
                    click: getElementWithinElement(booking, selectors.booking.bookingAndPaymentButton).click
                }
            };
        } );
    }
}


/**
 * @type {_MyPage}
 */
export const MyPage = new _MyPage();