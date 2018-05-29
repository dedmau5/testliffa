import ProductSelector from './product-selector';

import Destination from '../section-field/destination';
import Datepicker from '../section-field/datepicker';
import Pax from '../section-field/pax';

const selectors = {
  departure: '.bookingstart-section__departure-select',
  destination: '.bookingstart-section__destination-select',
  duration: '.bookingstart-section__duration-select',
  datepicker: '.bookingstart-section__date-select',
  pax: '.bookingstart-section__pax-select',
};

class HotelOnly extends ProductSelector {
  get destination() {
    const destinationElement = this.section.element(selectors.destination);
    return new Destination(destinationElement);
  }

  get datepicker() {
    const datepickerElement = this.section.element(selectors.datepicker);
    return new Datepicker(datepickerElement);
  }

  get pax() {
    const paxElement = this.section.element(selectors.pax);
    return new Pax(paxElement);
  }
}

export default HotelOnly;
