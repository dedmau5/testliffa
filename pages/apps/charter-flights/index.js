import {
    getElement,
    getElements,
    getElementWithinElement,
    getInnerHTMLAsInteger
} from '../../../tools/elements';


const selectors = {
    home: "#Transport",

    oneWeek: "tr > td:nth-of-type(7) > div.price-info",
    twoWeeks: "tr > td:nth-of-type(7) > div.price-info",

    bookAFlightButton: "input[id$='_btnBookFlight']",

    priceDetails: "#price-details",
    timetable: "#timetable",
    closeButton: "a.close",

    airline: {
        outbound: "#outboundtrip table > tbody > tr:nth-of-type(4) > td:nth-of-type(2)",
        homebound: "#homeboundtrip table > tbody > tr:nth-of-type(4) > td:nth-of-type(2)"
    }
};


class CharterFlights {
    constructor() {
        this.regexps = {
            getNumberOfFlightsAndIgnoreTheText: /[a-zA-Z\s]+([0-9]+)[a-zA-Z\s]+/g
        };

        const
            independentAirlineInfo = "div.independent-flight-table",
            independentFlightPrice = "div.independent-flight-price",
            stopsCheckboxes = browser.options.tc.language === "no" ?
                "#stops-container" : "#stops-container > div",
            airlinesToFilterBy = browser.options.tc.language === "no" ?
                "#carrier-container > div > div.carriers"
                :
                "div.carriers-filter-wrapper > div",
            airlinesToFilterByMenu = browser.options.tc.language === "no" ?
                `${airlinesToFilterBy} > div`
                :
                `${airlinesToFilterBy} > div.multiselect > div:nth-child(1)`;


        this.selectors = {
            loadingIcon: "#initLoading > div.spinner",

            flights: {
                numberOfFlights: "#numberOfFlights",
                numberOfFilteredFlights: "#numberOfFilteredFlights"
            },

            filteredFlights: {
                list: "#flight-result-menu + ul > li.independent-flight + :not(.ng-hide)",
                flight: {
                    price: `${independentFlightPrice} > div.price-details > div:nth-child(2) > strong.price`,
                    button: `${independentFlightPrice} > img.choose-button`
                },
                airlines: {
                    departure: `${independentAirlineInfo} > table > tbody > tr.outbound-flight td.airline > span`,
                    return: `${independentAirlineInfo} > table > tbody > tr.homebound-flight td.airline > span`
                }
            },

            checkbox: {
                directFlight: `${stopsCheckboxes} > div:nth-child(1) > label`,
                oneStop: `${stopsCheckboxes} > div:nth-child(2) > label`,
                twoStops: `${stopsCheckboxes} > div:nth-child(3) > label`
            },

            airlinesToFilterBy: {
                airline: browser.options.tc.language === "no" ?
                    `${airlinesToFilterBy} > div.selectDiv > label.carrierfilter`
                    :
                    `${airlinesToFilterBy}[data-change='setCarriersFilter'] > div.multiselect > div > label`,

                menu: {
                    home: airlinesToFilterByMenu,
                    isOpen: browser.options.tc.language === "no" ?
                        `${airlinesToFilterBy}[data-ow-listishidden=false]`
                        :
                        `${airlinesToFilterByMenu}.active`
                }
            }
        };
    }

    /**
     * @param timeout {number}
     * Number of milliseconds to wait before timing out.
     */
    waitForPageToLoad(timeout=15000) {
        browser.element(selectors.home).waitForExist(timeout);
    }

    /**
     * @param selector
     * @returns {[{
     *     radioButton: {
     *         click: Function
     *     },
     *
     *     price: {
     *         link: { click: Function },
     *         value: number
     *     }
     * }]}
     * @private
     */
    _getFlights( selector ) {
        return getElements( selector ).map( (flight) => {
            const
                radioButton = getElementWithinElement( flight, "input" ),
                priceLink = getElementWithinElement( flight, "a" ),
                price = getInnerHTMLAsInteger(
                    priceLink.value,
                    { treatAsPrice: true }
                );

            return {
                radioButton: { click: radioButton.click },
                price: {
                    link: { click: priceLink.click },
                    value: price
                }
            };
        });
    }

    /**
     * @returns {{
     *     oneWeek: {
     *         radioButton: {click: Function},
     *         price: {
     *             link: { click: Function },
     *             value: number
     *         }
     *     }[],
     *
     *     twoWeeks: {
     *         radioButton: { click: Function },
     *         price: {
     *              link: { click: Function },
     *              value: number
     *         }
     *     }[]
     * }}
     */
    get flights() {
        return {
            oneWeek: this._getFlights( selectors.oneWeek ),
            twoWeeks: this._getFlights( selectors.twoWeeks ),
        };
    }


    /**
     * @param flight {{
     *     radioButton: { click: Function },
     *     price: {
     *         link: { click: Function },
     *         value: number
     *     }
     * }}
     */
    getInformationAboutAFlight( flight ) {
        flight.price.link.click();

        browser.waitForExist( selectors.priceDetails, 5000 );
        browser.waitForExist( selectors.timetable, 5000 );

        const data = {
            airline: {
                outbound: browser.getText( selectors.airline.outbound ).trim(),
                homebound: browser.getText( selectors.airline.homebound ).trim()
            }
        };

        browser.click( selectors.closeButton );

        return data;
    }


    /**
     * @returns {{click: Function}}
     */
    get bookAFlight() {
        return {
            click: getElement( selectors.bookAFlightButton ).click
        };
    }
}

export default new CharterFlights();