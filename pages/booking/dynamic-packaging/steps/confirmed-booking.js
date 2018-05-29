import {
    ConfirmedBookingTranslations
} from '../../../../localization/booking/dynamic-packaging/confirmed-booking';


class ConfirmedBooking {
    /**
     * @param myChoices {MyChoices}
     * @param progress {Progress}
     */
    constructor(myChoices, progress) {
        this.myChoices = myChoices;
        this.progress = progress;

        this.selectors = {
            heading: "div.box-head > h1",
            bookingNumber: "div.booking-number > strong",
            grandTotal: "div.totalsumpanel > div > strong",
            bookingButton: "div.paypanel",

            paymentOptions: {
                heading: "#paypage-header-alt > div > h1"
            }
        };
    }

    /**
     * @param timeout {number}
     * Must be larger than 0. The total amount of time, given in ms, for this function to wait for the page
     * to complete.
     */
    waitForPage(timeout=30000) {
        const
            startTime = new Date().getTime(),
            paymentOptionsHeading = browser.element(this.selectors.paymentOptions.heading),
            confirmedBookingHeading = browser.element(this.selectors.heading),

            elapsedTime = () => {
                return new Date().getTime() - startTime;
            };

        browser.waitUntil(
            () => {
                if ( Array.isArray( ConfirmedBookingTranslations.url ) ) {
                    return (
                        ConfirmedBookingTranslations.url.some( url => browser.getUrl().includes(url) ) &&
                        (confirmedBookingHeading.isExisting() || paymentOptionsHeading.isExisting())
                    );
                }

                return (
                    browser.getUrl().includes(ConfirmedBookingTranslations.url) ||
                    confirmedBookingHeading.isExisting()
                );
            },
            timeout,
            `Perhaps you need to update ConfirmedBookingTranslations.url with ${browser.getUrl()}?`
        );

        if ( confirmedBookingHeading.isExisting() ) {
            browser.element( this.selectors.bookingButton ).waitForExist( timeout - elapsedTime() );
            browser.element( this.selectors.grandTotal ).waitForExist( timeout - elapsedTime() );
            return confirmedBookingHeading.getText();
        }

        if ( paymentOptionsHeading.isExisting() ) {
            paymentOptionsHeading.waitForText(timeout - elapsedTime());
            return paymentOptionsHeading.getText();
        }

        return false;
    }
}

export { ConfirmedBooking };