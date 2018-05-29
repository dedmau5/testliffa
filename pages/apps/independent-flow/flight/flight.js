import Modal from './modal';

const selectors = {
  date: '.flightlist-flight__departure-date-container .flightlist-flight__departure-date',
  carrier: '.flightlist-flight__col2 .flightlist-flight__carrier',
  times: '.flightlist-flight__col2 .flightlist-flight__times',
  duration: '.flightlist-flight__col3 .flightlist-flight__duration',
  locations: '.flightlist-flight__col3 .flightlist-flight__locations',
  flightDetails: '.flightlist-flight__col4 button',
};

/**
 * @param {WebdriverIO.Client} element
 * @returns {string[]}
 */
const getTimes = element => element.getText(selectors.times).split(' - ');

/**
 * @param {WebdriverIO.Client} element
 * @returns {string[]}
 */
const getLocations = element =>
  element
    .element(selectors.locations)
    .getHTML()
    .replace(/\s*(<[^>]*>)/g, ' ')
    .trim()
    .split('   ');

class Flight {
  /**
   * Create a Flight.
   *
   * @param {Object} element - Webdriverio element.
   */
  constructor(element) {
    this.element = element;
  }

  get carrier() {
    return this.element.getText(selectors.carrier);
  }

  get flightTime() {
    return this.element.getText(selectors.duration);
  }

  get date() {
    return this.element.getText(selectors.date);
  }

  /**
   * Get departure information.
   *
   * @readonly
   * @returns {{time: string, location: string}}
   * @memberof Flight
   */
  get departure() {
    const [departureTime] = getTimes(this.element);
    const [departureLocation] = getLocations(this.element);

    return {
      time: departureTime,
      location: departureLocation,
    };
  }

  /**
   * Get arrival information.
   *
   * @readonly
   * @returns {{time: string, location: string}}
   * @memberof Flight
   */
  get arrival() {
    const [, arrivalTime] = getTimes(this.element);
    const [, arrivalLocation] = getLocations(this.element);

    return {
      time: arrivalTime,
      location: arrivalLocation,
    };
  }

  /**
   * Gets the popup for Flight details.
   *
   * @returns {Modal} Popup object.
   */
  get flightDetails() {
    return {
      open: () => this.element.click(selectors.flightDetails),
      popup: Modal,
    };
  }
}

export default Flight;
