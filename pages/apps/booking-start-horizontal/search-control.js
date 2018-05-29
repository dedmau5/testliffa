import BookingStart from './index';
import Departure from './section-field/departure';
import Duration from './section-field/duration';
import Datepicker from './section-field/datepicker';
import Pax from './section-field/pax';

const selectors = {
  container: '.bookingstart-horizontal',
  loader: '.bookingstart-horizontal--not-initialized',
  product: '.product-selector__option:first-child',
  departure: '.bookingstart-section__departure-select',
  destination: '.bookingstart-section__destination-select',
  duration: '.bookingstart-section__duration-select',
  datepicker: '.bookingstart-section__date-select',
  pax: '.bookingstart-section__pax-select',
};

class SearchControl {
  static get search() {
    return {
      click: () => BookingStart.search(),
    };
  }
  /**
   *
   *
   * @readonly
   * @static
   * @returns {Departure}
   * @memberof SearchControl
   */
  static get departure() {
    const element = browser.element(selectors.departure);
    return new Departure(element);
  }

  static get duration() {
    const element = browser.element(selectors.duration);
    return new Duration(element);
  }

  static get datepicker() {
    const element = browser.element(selectors.datepicker);
    return new Datepicker(element);
  }

  static get pax() {
    const element = browser.element(selectors.pax);
    return new Pax(element);
  }

  static waitUntilFound(timeout = 10000) {
    return browser.waitForExist(selectors.container, timeout);
  }

  static waitUntilLoaded(timeout = 10000) {
    return browser.waitForExist(selectors.loader, timeout, true);
  }
}

export default SearchControl;
