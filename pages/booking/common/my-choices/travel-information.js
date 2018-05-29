class TravelInformation {
    constructor(selector) {
        const home = selector;

        this.selectors = {
            home: home,
            typeOfTravel: `${home} > dl.summary > dd:nth-child(2)`,
            from: `${home} > dl.summary > dd:nth-child(4)`,
            to: `${home} > dl.summary > dd:nth-child(6)`,

            departure: {
                date: `${home} > dl.summary > dd:nth-child(8)`,
                time: `${home} > dl.summary > dd:nth-child(10)`
            },

            journeyHome: {
                date: `${home} > dl > dd:nth-child(12)`,
                time: `${home} > dl > dd:nth-child(14)`
            },

            travelers: `${home} > dl.summary > dd:nth-child(16)`,
            hotel: `${home} > dl.summary > dd:nth-child(18)`,
            room: `${home} > dl.summary > dd:nth-child(20)`,

            checkIn: [
                `${home} > dl.summary > dd:nth-child(10)`,
                `${home} > dl.summary > dd:nth-child(22)`
            ],
            checkOut : [
                `${home} > dl.summary > dd:nth-child(12)`,
                `${home} > dl.summary > dd:nth-child(24)`
            ],
            price: `${home} > div.totalPriceAndPbcDiv > dl > dd`
        };

        this.regexps = {
            travelers: /([0-9]+)[a-zA-Z\s]+[,\s]*([0-9]+)*[a-zA-Z\s]*/g
        };
    }

    /**
     * @param timeout {number}
     * Must be larger than 0. The total amount of time, given in ms, for this function to wait for the travel
     * information bar to exist.
     */
    waitForExist(timeout=40000) {
        browser.element(this.selectors.home).waitForExist(timeout);
    }

    get typeOfTravel() {
        return browser.getAttribute(this.selectors.typeOfTravel, "innerHTML").trim();
    }

    get from() {
        return browser.getAttribute(this.selectors.from, "innerHTML").trim();
    }

    get to() {
        return browser.getAttribute(this.selectors.to, "innerHTML").trim();
    }

    get departure() {
        return browser.getAttribute(this.selectors.departure, "innerHTML").trim();
    }

    get journeyHome() {
        return browser.getAttribute(this.selectors.journeyHome, "innerHTML").trim();
    }

    get travelers() {
        let results =
            this.regexps.travelers.exec(
                browser.getAttribute(this.selectors.travelers, "innerHTML").trim()
            );

        return {
            adults: Array.isArray(results) ? results[1] : 0,
            children: Array.isArray(results) && results.length === 3 ? results[2] : 0
        };
    }

    get hotel() {
        return browser.getAttribute(this.selectors.hotel, "innerHTML").trim();
    }

    get room() {
        return browser.getAttribute(this.selectors.room, "innerHTML").trim();
    }

    /**
     * Returns the check in date.
     * @returns {Date}
     */
    get checkInDate() {
        for ( let selector of this.selectors.checkIn ) {
            if ( browser.isExisting( selector ) ) {
                return new Date(
                    browser.getAttribute( selector, "innerHTML" ).trim()
                );
            }
        }

        throw new Error( `"Couldn't find any of these selectors: ${this.selectors.checkIn}` );
    }

    /**
     * Returns the check out date.
     *
     * @returns {Date}
     */
    get checkOutDate() {
        for ( let selector of this.selectors.checkOut ) {
            if ( browser.isExisting( selector ) ) {
                return new Date(
                    browser.getAttribute( selector, "innerHTML" ).trim()
                );
            }
        }

        throw new Error( `"Couldn't find any of these selectors: ${this.selectors.checkIn}` );
    }

    /**
     * Returns the price shown under 'Travel Information'.
     *
     * @returns {Number} The price of the package without any additions (cancellation insurance etc).
     */
    get price() {
        return parseInt(
            browser.getAttribute(this.selectors.price, "innerHTML")
                .replace(".", "")
                .replace(":-", "")
                .replace(",-", "")
                .replace(/\s/g,''),
            10
        );
    }
}

export { TravelInformation };