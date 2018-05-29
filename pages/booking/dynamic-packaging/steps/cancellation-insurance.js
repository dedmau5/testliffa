import {
    getElementValue,
    getElementAttribute,
    getInnerHTML,
    locateElementAndClickOnIt
} from '../../../../tools/elements';


class CancellationInsurance {
    constructor() {
        const
            home = "#insuranceContainer",
            options = `${home} div.extra-choice-and-price.select-insurance-and-price > div.details-box`;

        this.selectors = {
            home: home,
            selectContainer: `${this.home} select`,
            choices: {
                listParent: `${options} ul`,
                listItem: `${options} ul > li`,
                alternativeListItem: `${home} option`,
                clickableSpan: `${options} span`

            },
        };
    }

    /**
     * @return {[{
     *     text: string,
     *     value: string
     * }]}
     * Returns an array of insurance choice option object(s). The option is stored under the 'value' key
     * and its description is stored under the 'text' key.
     */
    get choices() {
        return Array.map(
            browser.elements(this.selectors.choices.alternativeListItem).value,

            (option) => {
                return {
                    text: getInnerHTML(option),
                    value: getElementValue(option)
                };
            }
        );
    }

    /**
     * @returns {string}
     * Returns the selected cancellation insurance <option> value.
     */
    get value() {
        return getElementValue(this.selectors.selectContainer);
    }

    /**
     * Selects a cancellation insurance option.
     *
     * @param optionValue {string} A <option> value.
     */
    set value(optionValue) {
        const listParentSelector = this.selectors.choices.listParent;

        if (getElementAttribute(listParentSelector, "class").includes("hidden")) {
            locateElementAndClickOnIt(this.selectors.choices.clickableSpan);

            browser.waitUntil(
                () => {
                    return getElementAttribute(listParentSelector, "class").includes("hidden") === false;
                },
                5000
            );
        }

        for (let option of browser.elements(this.selectors.choices.listItem).value) {
            if (getElementValue(option) === optionValue) {
                browser.elementIdClick(option.ELEMENT);
                break;
            }
        }
    }
}

export { CancellationInsurance };