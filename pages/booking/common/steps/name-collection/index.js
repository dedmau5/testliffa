import { Passenger } from './passenger';
import { AdressInformation } from './adress-information';
import { getInnerHTMLAsInteger, locateElementAndClickOnIt } from '../../../../../tools/elements';

class CommonNameCollection {
    /**
     * @param myChoices {MyChoices}
     * @param progress {Progress}
     */
    constructor(myChoices, progress) {
        this.myChoices = myChoices;
        this.progress = progress;

        this.selectors = {
            home: "div.booking-steps li.active > span",
            loadingIcon: "div.search-spinner.hidden",
            passengersContainer: "div.passenger-list",
            passenger: "div.passenger",
            packagePrice: "#baseprice-spec-total div:nth-child(2)",
            totalPrice: "div.total-price span:nth-child(2)",
            bookButton: "div.submit-area input[type=image]"
        };
    }

    /**
     * @param timeout {number} Must be larger than 0. The total amount of time, given in ms, for this function to wait for the page
     * to complete.
     * @param options {{waitForLoadingIcon: boolean}} Should the method wait for the loading icon?
     */
    waitForPage(timeout=40000, options={ waitForLoadingIcon: false}) {
        let startTime = (new Date()).getTime();
        let elapsedTime = () => {
            return (new Date()).getTime() - startTime;
        };

        // if (options.waitForLoadingIcon) {
        //     browser.element(this.selectors.loadingIcon).waitForExist(timeout);
        // }
        //browser.element(this.selectors.home).waitForExist(timeout - elapsedTime());

        this.myChoices.travelInformation.waitForExist(timeout);
        this.waitForPassengers(timeout - elapsedTime());
    }

    waitForPassengers() {
        browser.waitUntil(
            () => {
                let passengers = browser.elements(this.selectors.passengersContainer);
                return passengers && Array.isArray(passengers.value);
            }
        );
    }

    /**
     * @returns {[Passenger]}
     * Returns an array of Passenger objects, or an empty array.
     */
    get passengers() {
        let passengerCount = 1;

        return Array.map(
            browser.elements(this.selectors.passenger).value,

            (passenger) => {
                return new Passenger(
                    `${this.selectors.passengersContainer} > div:nth-child(${passengerCount++}) ${this.selectors.passenger}`
                );
            }
        );
    }

    /**
     * @returns {AdressInformation}
     * Address information for the primary traveller.
     */
    get adressInformationForPrimaryTraveller() {
        if (!this._adressInformation) {
            this._adressInformation = new AdressInformation();
        }

        return this._adressInformation;
    }

    /**
     * @returns {number}
     * Returns the price shown as package price (at ving.se: Paketresa)
     */
    get packagePrice() {
        return getInnerHTMLAsInteger(this.selectors.packagePrice, { treatAsPrice: true });
    }

    /**
     * @returns {number}
     * Returns the total price (at ving.se: Totalpris) shown above the Book button.
     */
    get totalPrice() {
        return getInnerHTMLAsInteger(this.selectors.totalPrice, { treatAsPrice: true });
    }

    /**
     * @returns {{click: (function())}}
     * Gives access to the book button.
     */
    get bookButton() {
        return {
            click: () => {
                locateElementAndClickOnIt(this.selectors.bookButton);
            }
        };
    }
}

//export const CommonNameCollection = new _CommonNameCollection();
//export default new CommonNameCollection();
export { CommonNameCollection };