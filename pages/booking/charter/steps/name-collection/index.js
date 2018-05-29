import { CommonNameCollection } from '../../../common/steps/name-collection';
import { NameCollectionTranslations } from '../../../../../localization/booking/charter/name-collection';
import { SimpleChoice } from './simple-choice';
import { ComplexChoice } from './complex-choice';

import {
    getInnerHTML,
    getElementWithinElement,
    getElements,
} from '../../../../../tools/elements';


class NameCollection extends CommonNameCollection {
    /**
     * @param myChoices {MyChoices}
     * @param progress {Progress}
     */
    constructor(myChoices, progress) {
        super(myChoices, progress);

        this.selectors = {
            home: {
                charter: ".charter",
            },
            //the following selectors are here due to reference errors if they are in their own page object in /common... ugh...
            //home: "div.booking-steps li.active > span",
            loadingIcon: "div.search-spinner.hidden",
            passengersContainer: "div.passenger-list",
            passenger: "div.passenger",
            packagePrice: "#baseprice-spec-total div:nth-child(2)",
            totalPrice: "div.total-price span:nth-child(2)",
            bookButton: "div.submit-area input[type=image]",
            //end of reference selectors

            extraChoices: "div.extra-group-container",
            extraChoice: {
                heading: "div > span:nth-child(1)",
                choiceContainer: "div.extra-choice-container",
            },
            gexApp: "#GexApp",
            gexContainer: ".gex-container",
            gexGroupPanel: ".gex-group-panel",
            gexExtraChoiceContainer: ".gex-group-panel > div .extra-choice-container",
            gexDropDownPax: ".gex-group-panel > div .extra-choice-container .replaced",
            
        };
    }


    /**
     * @param timeout {number}
     * Must be larger than 0. The total amount of time, given in ms, for this function to wait for the page
     * to complete.
     */
    // waitForPage(timeout=30000) {
    //     const startTime = (new Date()).getTime();
    //     const elapsedTime = () => {
    //         return (new Date()).getTime() - startTime;
    //     };

    //     browser.waitUntil(
    //         () => {
    //             return browser.getUrl().includes(NameCollectionTranslations.url);
    //         },
    //         timeout
    //     );
    //     super.waitForPage(timeout - elapsedTime(), {waitForLoadingIcon: false});
    // }

    waitForPageToLoad() {
        browser.waitForExist(this.selectors.home.charter, 30000);
    }

    /**
     * @param choiceContainerElement
     */
    handleCombinationOfSimpleAndComplexExtraChoice( choiceContainerElement ) {
        const isComplexChoice = browser.elementIdElement(
            choiceContainerElement.value.ELEMENT,
            "div.extra-details-box"
        ).isExisting();

        if ( isComplexChoice ) {
            return {
                choice: new SimpleChoice(choiceContainerElement),
                subChoices: new ComplexChoice(
                    getElementWithinElement(
                        choiceContainerElement.value,
                        "div.extra-details-box"
                    )
                )
            };
        }

        else {
            return new SimpleChoice(choiceContainerElement);
        }
    }

    /**
     * @returns {{
     *     onboardMeal: ComplexChoice,
     *     airportTransfer: SimpleChoice,
     *     cancellationInsurance: SimpleChoice|ComplexChoice,
     *     travelInsurance: {
     *         choice: SimpleChoice,
     *         subChoices: ComplexChoice
     *     },
     *     mayThomasCookSendImportantInformation: SimpleChoice,
     *     mayThomasCookSendCatalogsAndEmails: SimpleChoice,
     *     checkInLuggage: ComplexChoice
     * }}
     * @private
     */
    _getAllExtraChoices() {
        const results = getElements(this.selectors.extraChoices);
        let choices = {};

        for (let choice of results) {
            const
                headingElement = getElementWithinElement( choice, this.selectors.extraChoice.heading ),
                choiceContainerElement = getElementWithinElement( choice, this.selectors.extraChoice.choiceContainer ),
                heading = getInnerHTML( headingElement.value ).trim();

            switch (heading) {
                case NameCollectionTranslations.onboardMeal.heading:
                    choices.onboardMeal = new ComplexChoice(choiceContainerElement);
                    break;

                case NameCollectionTranslations.airportTransfer.heading:
                    choices.airportTransfer =
                        this.handleCombinationOfSimpleAndComplexExtraChoice(choiceContainerElement);
                    break;

                case NameCollectionTranslations.cancellationInsurance.heading:
                    choices.cancellationInsurance =
                        this.handleCombinationOfSimpleAndComplexExtraChoice(choiceContainerElement);
                    break;

                case NameCollectionTranslations.travelInsurance.heading:
                    choices.travelInsurance =
                        this.handleCombinationOfSimpleAndComplexExtraChoice(choiceContainerElement);
                    break;

                case NameCollectionTranslations.mayThomasCookSendImportantInformation.heading:
                    choices.mayThomasCookSendImportantInformation = new SimpleChoice(choiceContainerElement);
                    break;

                case NameCollectionTranslations.mayThomasCookSendCatalogsAndEmails.heading:
                    choices.mayThomasCookSendCatalogsAndEmails = new SimpleChoice(choiceContainerElement);
                    break;

                case NameCollectionTranslations.checkInLuggage.heading:
                    choices.checkInLuggage = new ComplexChoice(choiceContainerElement);
                    break;

                default:
                    throw new Error(`Unknown choice: ${heading}`);
            }
        }

        return choices;
    }

    /**
     * @returns {ComplexChoice}
     * Gives access to choose optional onboard meal for every traveller.
     */
    get onboardMeal() {
        if (!this._extraChoices) {
            this._extraChoices = this._getAllExtraChoices();
        }

        return this._extraChoices.onboardMeal;
    }

    /**
     * @returns {SimpleChoice}
     * Gives access to choose optional airport shuttle.
     */
    get airportTransfer() {
        if (!this._extraChoices) {
            this._extraChoices = this._getAllExtraChoices();
        }

        return this._extraChoices.airportTransfer;
    }

    /**
     * @returns {SimpleChoice}
     * Gives access to choose optional cancellation insurance.
     */
    get cancellationInsurance() {
        if (!this._extraChoices) {
            this._extraChoices = this._getAllExtraChoices();
        }

        return this._extraChoices.cancellationInsurance;
    }

    /**
     * @returns {{
     *     choice: SimpleChoice,
     *     subChoices: ComplexChoice
     * }}
     * Gives access to choose optional travel insurance for every traveller.
     */
    get travelInsurance() {
        if (!this._extraChoices) {
            this._extraChoices = this._getAllExtraChoices();
        }

        return this._extraChoices.travelInsurance;
    }

    /**
     * @returns {SimpleChoice}
     * Gives access to choose optional cancellation insurance.
     */
    get mayThomasCookSendImportantInformation() {
        if (!this._extraChoices) {
            this._extraChoices = this._getAllExtraChoices();
        }

        return this._extraChoices.mayThomasCookSendImportantInformation;
    }

    /**
     * @returns {SimpleChoice}
     * Gives access to choose optional cancellation insurance.
     */
    get mayThomasCookSendCatalogsAndEmails() {
        if (!this._extraChoices) {
            this._extraChoices = this._getAllExtraChoices();
        }

        return this._extraChoices.mayThomasCookSendCatalogsAndEmails;
    }

    /**
     * @returns {ComplexChoice}
     * Gives access to choose to check in luggage.
     */
    get checkInLuggage() {
        if (!this._extraChoices) {
            this._extraChoices = this._getAllExtraChoices();
        }

        return this._extraChoices.checkInLuggage;
    }

    // /**
    //  * @returns {ComplexChoice}
    //  * Gives access to check in luggage in GexApp.
    //  */
    // get gexApp() {
    //     if (!this._extraChoices) {
    //         this._extraChoices = this._getAllExtraChoices();
    //     }

    //     return this._extraChoices.checkInLuggage;
    // }
}

export { NameCollection };