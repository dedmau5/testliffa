import Fact from './fact';
import Map from './map';

const selectors = {
  container: '#facts-view',
  climateAndWeatherPush: '#climateAndWeatherPush',
  climateAndWeatherPopup: '.fact-popup-climateAndWeather',
  flightAndTransferPush: '#flightAndTransferPush',
  flightAndWeatherPopup: '.fact-popup-flightAndTransfer',
  destinationPush: '#destinationPush',
  destinationPopup: '.fact-popup-destination',
  mapPush: '#mapPush',
  mapPopup: '.gw-facts-map',
};

class Facts {
  constructor() {
    this.element = browser.element(selectors.container);
  }

  /**
   * Creates a new fact with climate and weather.
   *
   * @readonly
   * @returns {Fact}
   * @memberof Facts
   */
  get climateAndWeatherPush() {
    const pushElement = this.element.element(selectors.climateAndWeatherPush);
    const popupElement = this.element.element(selectors.climateAndWeatherPopup);
    return new Fact(pushElement, popupElement);
  }

  /**
   * Creates a new fact with flight and transfer.
   *
   * @readonly
   * @returns {Fact}
   * @memberof Facts
   */
  get flightAndTransferPush() {
    const pushElement = this.element.element(selectors.flightAndTransferPush);
    const popupElement = this.element.element(selectors.flightAndWeatherPopup);
    return new Fact(pushElement, popupElement);
  }

  /**
   * Creates a new fact with destination.
   *
   * @readonly
   * @returns {Fact}
   * @memberof Facts
   */
  get destinationPush() {
    const pushElement = this.element.element(selectors.destinationPush);
    const popupElement = this.element.element(selectors.destinationPopup);
    return new Fact(pushElement, popupElement);
  }

  /**
   * Creates a new fact with map.
   *
   * @readonly
   * @returns {Map}
   * @memberof Facts
   */
  get mapPush() {
    const pushElement = this.element.element(selectors.mapPush);
    const popupElement = this.element.element(selectors.mapPopup);
    return new Map(pushElement, popupElement);
  }

  /**
   * Wait for the facts view to be loaded.
   *
   * @param {number} [timeout=60000]
   * @memberof Facts
   */
  waitUntilLoaded(timeout = 60000) {
    this.element.waitForExist(timeout);
  }
}

export default Facts;
