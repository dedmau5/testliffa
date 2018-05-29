import { BookingStart } from '../../booking-start';
import { CommonDeparture } from '../../booking-start/common-departure';
import { CommonDuration } from '../../booking-start/common-duration';
import { CommonDatepicker } from '../../booking-start/common-datepicker';
import { CommonPax } from '../../booking-start/common-pax';


class _SearchControl {
    constructor(){
        const home = '#hotel-search-control .bookingstart-section';

        this.selectors = {
            home: home,
        };
    }

    get search(){
        return {
            click: () => BookingStart.search.click()
        };
    }

    get departure() {
        if (!this._departure) {
            this._departure = new CommonDeparture(this.selectors.home);
        }
        return this._departure;
    }

    get duration() {
        if (!this._duration) {
            this._duration = new CommonDuration(this.selectors.home);
        }
        return this._duration;
    }

    get datepicker() {
        if (!this._datepicker) {
            this._datepicker = new CommonDatepicker(this.selectors.home);
        }
        return this._datepicker;
    }

    get pax() {
        if (!this._pax) {
            this._pax = new CommonPax(this.selectors.home);
        }
        return this._pax;
    }
}

/**
 * @type {_SearchControl}
 */
export const SearchControl = new _SearchControl();