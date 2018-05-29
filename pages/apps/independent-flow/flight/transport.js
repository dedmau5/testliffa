import Flight from './flight';
import Modal from './modal';

const selectors = {
  outbound: '.flightlist-flight:first-child',
  homebound: '.flightlist-flight:nth-child(2)',
  button: '.flight-list-price-panel__book-btn',
  price: '.flight-list-price-panel__current-price',
  baggageDetails: '.flight-list-price-panel__luggage-info-tag li',
  priceDetails: '.flight-list-price-panel__details-link-desktop',
};

/**
 *
 *
 * @param {string} flightTime
 * @returns {{hours: number, minutes: number}}
 * @memberof Transport
 */
const parseTime = (flightTime) => {
  const [hours, minutes] = flightTime.split(/[^0-9]+/).filter(Number);
  return {
    hours: parseInt(hours, 10) || 0,
    minutes: parseInt(minutes, 10) || 0,
  };
};

/**
 * @param {WebdriverIO.Client} element
 * @param {string} selector
 * @returns {Flight}
 */
const getFlight = (element, selector) => {
  const flightElement = element.element(selector);
  return new Flight(flightElement);
};

class Transport {
  /**
   * Create a Transport.
   *
   * @param {Object} element - Webdriverio element.
   */
  constructor(element) {
    this.element = element;
  }

  /**
   * Gets outbound flight.
   *
   * @returns {Flight} Flight Object.
   */
  get outbound() {
    return getFlight(this.element, selectors.outbound);
  }

  /**
   * Gets homebound flight.
   *
   * @returns {Flight} Flight Object.
   */
  get homebound() {
    return getFlight(this.element, selectors.homebound);
  }

  get price() {
    return this.element.getText(selectors.price);
  }

  get totalFlightTime() {
    const outboundTime = parseTime(this.outbound.flightTime);
    const homeboundTime = parseTime(this.homebound.flightTime);

    return ((outboundTime.hours + homeboundTime.hours) * 60) + outboundTime.minutes + homeboundTime.minutes;
  }

  /**
   * Gets the popup for priceDetails.
   *
   * @readonly
   * @memberof Transport
   */
  get priceDetails() {
    return {
      open: () => this.element.click(selectors.priceDetails),
      popup: Modal,
    };
  }

  /**
   * Gets the popup for baggage details.
   *
   * @readonly
   * @memberof Transport
   */
  get baggageDetails() {
    return {
      open: () => this.element.click(selectors.baggageDetails),
      popup: Modal,
    };
  }

  select() {
    this.element.click(selectors.button);
    return true;
  }
}

export default Transport;
