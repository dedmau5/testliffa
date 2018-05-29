import ProductSelector from './product-selector';

import Departure from '../section-field/departure';
import SingleLayerDestination from '../section-field/single-layer-destination';
import Datepicker from '../section-field/datepicker';
import Pax from '../section-field/pax';

const selectors = {
  departure: '.bookingstart-section__departure-select',
  destination: '.bookingstart-section__destination-select',
  datepicker: '.bookingstart-section__date-select',
  pax: '.bookingstart-section__pax-select',
};

class Cruise extends ProductSelector {
  get departure() {
    const departureElement = this.section.element(selectors.departure);
    return new Departure(departureElement);
  }

  get destination() {
    const destinationElement = this.section.element(selectors.destination);
    return new SingleLayerDestination(destinationElement);
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

export default Cruise;
