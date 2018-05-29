import {
    locateElementAndClickOnIt,
    getElementWithinElement
} from '../../../tools/elements';


class DpFlights {
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
            },

            chooseButtonForFirstFlight: ":nth-child(1) > .independent-flight-price.ng-isolate-scope .choose-button",

        };
    }

    /**
     * @param timeout {number}
     * Number of milliseconds to wait, for the finding airlines spinner to disappear.
     */
    waitForPageToLoad(timeout=50000) {
        browser.element(this.selectors.loadingIcon).waitForExist(timeout, true);
        browser.element(this.selectors.flights.numberOfFlights).waitForExist(timeout);
    }

    get filteredFlights() {
        return Array.map(
            browser.elements(this.selectors.filteredFlights.list).value,
            (flight) => {
                return {
                    price: parseInt(
                        browser.elementIdElement(
                            flight.ELEMENT, this.selectors.filteredFlights.flight.price
                        ).getAttribute("innerHTML").replace(".", "").replace(":-", ""),
                        10
                    ),

                    airlines: {
                        departure:
                            browser.elementIdElement(
                                flight.ELEMENT,
                                this.selectors.filteredFlights.airlines.departure
                            ).getAttribute("innerHTML"),
                        return:
                            browser.elementIdElement(
                                flight.ELEMENT, this.selectors.filteredFlights.airlines.return
                            ).getAttribute("innerHTML")
                    },

                    button: browser.elementIdElement(
                        flight.ELEMENT,
                        this.selectors.filteredFlights.flight.button
                    )
                };
            }
        );
    }

    get numberOfFilteredFlights() {
        const
            element = browser.element(this.selectors.flights.numberOfFilteredFlights),
            elementID = element && element.value ? element.value.ELEMENT : false,
            textElement = browser.elementIdText(elementID),
            numberOfFilteredFlights = textElement ? textElement.value : false;

        if (!numberOfFilteredFlights) {
            return 0;
        }

        return parseInt(
            numberOfFilteredFlights.trim(),
            10
        );
    }

    get numberOfFlights() {
        const
            element = browser.element(this.selectors.flights.numberOfFlights),
            elementID = element ? element.value.ELEMENT : false,
            textElement = elementID ? browser.elementIdText(elementID) : false,
            numberOfFlights = textElement ? textElement.value : false;

        if (!numberOfFlights) {
            return 0;
        }

        const match = this.regexps.getNumberOfFlightsAndIgnoreTheText.exec(numberOfFlights.trim());
        if (!match) {
            return 0;
        }

        return parseInt(match[1], 10);
    }

    /**
     * @param selected {boolean}
     * A value of 'true' hides all flights except direct flights.
     */
    set directFlight(selected) {
        this._directFlight = browser.element(this.selectors.checkbox.directFlight);
        this._directFlightID = this._directFlight.value.ELEMENT;

        if (selected !== this._directFlight) {
            browser.elementIdClick(this._directFlightID);
        }
    }

    /**
     * @return {boolean}
     * Returns a boolean value of whether the direct flight filter is active or not.
     */
    get directFlight() {
        if (!this._directFlight) {
            this._directFlight = browser.element(this.selectors.checkbox.directFlight);
            this._directFlightID = this._directFlight.value.ELEMENT;
        }

        return browser.elementIdAttribute(
            this._directFlightID,
            "class"
        ).includes("selected");
    }

    get airlinesFilterMenu() {
        return {
            click: () => {
                locateElementAndClickOnIt(this.selectors.airlinesToFilterBy.menu.home);
            }
        };
    }

    isAirlinesFilterMenuOpen() {
        return browser.isExisting(this.selectors.airlinesToFilterBy.menu.isOpen);
    }

    /**
     * Opens the airlines filter menu.
     *
     * @param timeout {number}
     * If the given value is larger than 0, the waitForExist function will be used to wait for the element. It will
     * trigger an exception if the element is not found before timeout ms.
     */
    openAirlinesFilterMenu(timeout=5000) {
        this.airlinesFilterMenu.click();

        if (timeout && timeout > 0) {
            browser.element(this.selectors.airlinesToFilterBy.menu.isOpen).waitForExist(timeout);
        }
    }

    /**
     * Selects one or many airlines to filter by.
     *
     * @param airlines {[{id: string, select: boolean}]}
     * An array of airline filter object(s). 'id' contains the ID of the WebElement JSON object for <label>, and
     * 'select' contains a boolean that determines if the airline should be selected.
     */
    selectAirlines(airlines) {
        const timeoutForSelection = 5000;

        if (! Array.isArray(airlines) ) {
            throw new Error("airlines must be an Array!");
        }

        if (!this.isAirlinesFilterMenuOpen()) {
            this.openAirlinesFilterMenu();
        }

        for (let airline of airlines) {
            let isSelected = browser.elementIdAttribute(airline.id, "class").value.includes("selected");

            if (airline.select !== isSelected) {
                const inputElement = browser.elementIdElement(airline.id, "input");

                if (inputElement && inputElement.value && inputElement.value.ELEMENT) {
                    inputElement.click();
                    inputElement.waitForSelected(timeoutForSelection);
                }
            }
        }
    }

    /**
     * @return {[{id: string, select: boolean}]}
     * Returns an array of airline filter object(s). 'id' contains the ID of the WebElement JSON object for <label>, and
     * 'select' contains a boolean that determines if the airline should be selected.
     */
    get airlines() {
        return Array.map(
            browser.elements(this.selectors.airlinesToFilterBy.airline).value,
            (label) => {
                if (browser.options.tc.language === "no") {
                    const input = getElementWithinElement(label, "input");

                    return {
                        id: label.ELEMENT,
                        name: input.getValue().split("_")[1],
                        selected: input.isSelected()
                    };
                }

                let classes = browser.elementIdAttribute(label.ELEMENT, "class").value;
                let span = browser.elementIdElement(label.ELEMENT, "span").value;
                let spanInnerHTML = browser.elementIdAttribute(span.ELEMENT, "innerHTML").value;

                return {
                    id: label.ELEMENT,
                    name: spanInnerHTML.split("<!--")[0],
                    selected: classes && classes.includes("selected")
                };
            }
        );
    }
}

export default new DpFlights();