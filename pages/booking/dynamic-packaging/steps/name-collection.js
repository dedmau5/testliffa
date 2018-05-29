import { CommonNameCollection } from '../../common/steps/name-collection';
import { CancellationInsurance } from './cancellation-insurance';


class NameCollection extends CommonNameCollection {
    /**
     * @param myChoices {MyChoices}
     * @param progress {Progress}
     */
    constructor(myChoices, progress) {
        super(myChoices, progress);
    }

    /**
     * @param timeout {number}
     * Must be larger than 0. The total amount of time, given in ms, for this function to wait for the page
     * to complete.
     */
    waitForPage(timeout=30000) {
        super.waitForPage();
    }

    /**
     * @returns {CancellationInsurance}
     */
    get cancellationInsurance() {
        if (!this._cancellationInsurance) {
            this._cancellationInsurance = new CancellationInsurance();
        }

        return this._cancellationInsurance;
    }
}

export { NameCollection };