import { Translate } from '../../../tools';


class _TransportHelper {
    constructor() {
        this.selectors = {
            noTripFound: Translate({
                dk: "head > title",
                fi: "div.charter > h1",
                no: "head > title",
                se: "div.charter > h2"
            }),
        };
    }

    get messageHeader() {
        const element = browser.element(this.selectors.noTripFound);
        element.waitForExist(10000);
        return element.getText();
    }
}

/**
 * @type {_TransportHelper}
 */
export const TransportHelper = new _TransportHelper();
