import { MyChoices } from './my-choices';
import { Progress } from './../common/progress';
import { Steps } from './steps';


class DynamicPackaging {
    /**
     * @returns {MyChoices}
     */
    get myChoices() {
        if (!this._myChoices) {
            this._myChoices = new MyChoices();
        }

        return this._myChoices;
    }

    /**
     * Returns the progress seen on summary of the booking page.
     *
     * @returns {Progress}
     */
    get progress() {
        if (!this._progress) {
            this._progress = new Progress();
        }

        return this._progress;
    }

    /**
     * Returns a Steps object. It gives access to each step involved in completing the booking.
     *
     * @returns {Steps}
     */
    get steps() {
        if (!this._steps) {
            this._steps = new Steps(this.myChoices, this.progress);
        }

        return this._steps;
    }
}

export default new DynamicPackaging();