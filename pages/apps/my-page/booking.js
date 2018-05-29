import {
    locateElementAndClickOnIt,
    getInnerHTMLAsInteger
} from '../../../tools/elements';


const selectors = {
    paymentSummary: "#payment-summary",
    totalPrice: "table.payments > tfoot > tr > td > strong",

    bookExtrasAndInsurances: "input[id$='_AddSupplments']",
    cancellationLink: "input[id$='_Cancel']",

    bookExtrasAndInsurancesPage: {
        home: "div[id$='_showSeating']",

        seatingOnboardLink: "input[id$='SeatingLink']"
    },

    cancellationPage: {
        home: "div.cancel-booking",
        cancel: {
            checkbox: "input[id$='_chkReservation']",
            button: "input[id$='_btnCancel']"
        },
        success: {
            home: "#my-booking",
            label: "#my-booking h1"
        }
    }
};


class _Booking {
    /**
     * @param {number} timeout=30000
     */
    waitUntilLoaded( timeout=30000 ) {
        browser.waitForExist( selectors.paymentSummary, timeout );
    }

    /**
     * @returns {number}
     */
    get totalPrice() {
        return getInnerHTMLAsInteger( selectors.totalPrice, { treatAsPrice: true } );
    }

    /**
     * @returns {{click: (function())}}
     */
    get bookExtrasAndInsurancesLink() {
        return {
            click: () => {
                locateElementAndClickOnIt( selectors.bookExtrasAndInsurances );
            },
        };
    }

    /**
     * @returns {{
     *     waitForPage: (function(number)),
     *     seatingOnboardLink: {
     *         click: (function())
     *     }
     * }}
     */
    get bookExtrasAndInsurances() {
        return {
            waitForPage: ( timeout=30000 ) => {
                browser.waitForExist( selectors.bookExtrasAndInsurancesPage.home, timeout );
            },

            seatingOnboardLink: {
                click: () => {
                    locateElementAndClickOnIt( selectors.bookExtrasAndInsurancesPage.seatingOnboardLink );
                },
            }
        };
    }

    /**
     * @returns {{click: (function())}}
     */
    get cancelLink() {
        return {
            click: () => {
                locateElementAndClickOnIt( selectors.cancellationLink );
            }
        };
    }

    waitForCancelBookingPage( timeout=30000 ) {
        browser.waitForExist( selectors.cancellationPage.home, timeout );
    }

    /**
     * @returns {{
     *     isChecked: (function()),
     *     click: (function())
     * }}
     */
    get cancelCheckbox() {
        return {
            /**
             * @returns {boolean}
             */
            isChecked: () => {
                return browser.isSelected( selectors.cancellationPage.cancel.checkbox );
            },

            click: () => {
                locateElementAndClickOnIt( selectors.cancellationPage.cancel.checkbox );
            }
        };
    }

    /**
     * @returns {{click: (function())}}
     */
    get cancelBookingButton() {
        return {
            click: () => {
                locateElementAndClickOnIt ( selectors.cancellationPage.cancel.button );
            }
        };
    }

    /**
     * @param timeout {number}
     */
    waitForCancellationConfirmation( timeout=30000 ) {
        browser.waitForExist( selectors.cancellationPage.success.home, timeout );
    }

    get cancellationConfirmationLabel() {
        return browser.getAttribute( selectors.cancellationPage.success.label, "innerHTML").trim();
    }
}

/**
 * @type {_Booking}
 */
export const Booking = new _Booking();