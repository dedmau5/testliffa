import { TravelInformation } from './travel-information';


class MyChoices {
    /**
     * @param selectorForTravelInformation The selector for the Travel Information bar.
     */
    constructor(selectorForTravelInformation) {
        this.selectors = {
            home: "div.booking-box-main"
        };

        this.travelInformation = new TravelInformation(selectorForTravelInformation);
    }

    /**
     * @param timeout {number}
     * Must be larger than 0. The total amount of time, given in ms, for this function to wait for My choices to exist.
     */
    waitForExist(timeout=20000) {
        browser.element(this.selectors.home).waitForExist(timeout);
    }

    get progress() {
        return browser.elementIdAttribute(
            browser.element(
                this.selectors.home + " div.charter > div.box-head small"
            ).value.ELEMENT,
            "innerHTML"
        ).value.trim();
    }
}

export { MyChoices };