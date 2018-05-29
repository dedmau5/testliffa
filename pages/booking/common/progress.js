/**
 * Gives access to the progress (label and step number) seen on the booking pages.
 */
class Progress {
    constructor() {
        const home = "div.booking-steps > div.charter";

        this.selectors = {
            home: home,
            label: `${home} ol > li.active > span`,
            step: {
                active: `${home} ol > li.active > strong`,
                neutral: `${home} ol > li > strong`
            }
        };
    }

    /**
     * @returns {number}
     */
    get numberOfActiveProgressSteps() {
        return browser.elements(this.selectors.step.active).value.length;
    }

    /**
     * @returns {number}
     */
    get numberOfProgressSteps() {
        return browser.elements(this.selectors.step.neutral).value.length;
    }

    /**
     * @returns {string}
     */
    get label() {
        browser.waitForExist(this.selectors.label, 10000);

        return browser.elementIdAttribute(
            browser.element(this.selectors.label).value.ELEMENT,
            "innerHTML"
        ).value.trim();
    }

    /**
     * @returns {string}
     */
    get step() {
        browser.waitForExist(this.selectors.step.active, 10000);

        return browser.elementIdAttribute(
            browser.element(this.selectors.step.active).value.ELEMENT,
            "innerHTML"
        ).value.trim();
    }
}

export { Progress };