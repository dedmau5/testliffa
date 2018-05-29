import { NameCollection } from './name-collection';
import { Extras } from './extras';
import { ConfirmBooking } from './confirm-booking';
import { ConfirmedBooking } from './confirmed-booking';


class Steps {
    /**
     * @param myChoices {MyChoices}
     * @param progress {Progress}
     */
    constructor(myChoices, progress) {
        this.myChoices = myChoices;
        this.progress = progress;
    }

    /**
     * @return {NameCollection}
     */
    get nameCollection() {
        if (!this._nameCollection) {
            this._nameCollection = new NameCollection(this.myChoices, this.progress);
        }

        return this._nameCollection;
    }

    /**
     * @return {Extras}
     */
    get extras() {
        if (!this._extras) {
            this._extras = new Extras(this.myChoices, this.progress);
        }

        return this._extras;
    }

    /**
     * @return {ConfirmBooking}
     */
    get confirmBooking() {
        if (!this._confirmBooking) {
            this._confirmBooking = new ConfirmBooking(this.myChoices, this.progress);
        }

        return this._confirmBooking;
    }

    /**
     * @return {ConfirmedBooking}
     */
    get confirmedBooking() {
        if (!this._confirmedBooking) {
            this._confirmedBooking = new ConfirmedBooking(this.myChoices, this.progress);
        }

        return this._confirmedBooking;
    }
}

export { Steps };