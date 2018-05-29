export class ConfirmedBooking {
    constructor() {
        this.selectors = {
            home: ["div.my-booking", "div.booking-number"],
            heading: "h1",
            bookingNumber: "div.booking-number > strong"
        };
    }

    /**
     * @param timeout Time before the waiting times out. Defaults to 30 s.
     * @returns {string}
     */
    waitForPage(timeout=30000) {
        browser.waitUntil( () => {
            return this.selectors.home.some( (item) => {
                return browser.isExisting(item);
            } );
        }, timeout);

        const heading = browser.getAttribute(this.selectors.heading, "innerHTML");

        if ( ! heading ) {
            console.warn(`Didn't find any text for selector: ${this.selectors.heading}`);
            return "";
        }

        return heading.trim();
    }

    /**
     * @return {string}
     */
    get bookingNumber() {
        return browser.getAttribute(this.selectors.bookingNumber, "innerHTML").trim();
    }
}