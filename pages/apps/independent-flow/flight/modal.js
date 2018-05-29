const selectors = {
  container: '.webui-popup',
  tab: {
    flight: '.webui-tab-nav .webui-tab-nav__button:nth-child(1)',
    price: '.webui-tab-nav .webui-tab-nav__button:nth-child(2)',
    baggage: '.webui-tab-nav .webui-tab-nav__button:nth-child(3)',
  },
  price: {
    container: '.flight-list-item__details .price-details',
    hotel: '.price-details-travel-info__row:nth-child(1) .price-details-travel-info__value',
    totalPrice: '.price-details-price-table__row--total .price-details-price-table__total',
  },
  baggage: {
    container: '.flight-list-item__details .flight-list-baggage-details',
  },
  flight: {
    container: '.flight-list-item__details .flight-details-container',
    outbound: '.flight-details--outbound',
    homebound: '.flight-details--homebound',
    date: '.flight-details__title',
    flightTime: '.flight-details__subtitle',
    departureRow: '.flight-leg .flight-leg__row:first-child',
    arrivalRow: '.flight-leg .flight-leg__row:last-child',
  },
  close: '.webui-modal-header__close',
};

/**
 * @returns {{hotel : (string), price: (string)}}
 */
const priceInformation = () => ({
  hotel: browser.getText(selectors.price.hotel),
  price: browser.getText(selectors.price.totalPrice),
});

/**
 * @param {WebdriverIO.Client} element
 * @returns {boolean}
 * @memberof Modal
 */
const hasFlightData = (element) => {
  const hasDate = element.getText(selectors.flight.date) !== '';
  const hasFlightTime = element.getText(selectors.flight.flightTime) !== '';
  const hasDeparture = element.getText(selectors.flight.departureRow) !== '';
  const hasArrival = element.getText(selectors.flight.arrivalRow) !== '';

  return hasDate && hasFlightTime && hasDeparture && hasArrival;
};

class Modal {
  static close() {
    browser.click(selectors.close);
  }

  /**
   * @readonly
   * @static
   * @memberof Modal
   */
  static get priceTab() {
    return {
      select: () => browser.click(selectors.tab.price),
      isLoaded: () => browser.waitForExist(selectors.price.container, 6000),
      getInformation: () => priceInformation(),
    };
  }

  static get baggageTab() {
    return {
      select: () => browser.click(selectors.tab.baggage),
      isLoaded: () => browser.waitForExist(selectors.baggage.container),
    };
  }

  static get flightTab() {
    const outboundElement = browser.element(selectors.flight.outbound);
    const homeboundElement = browser.element(selectors.flight.homebound);
    return {
      select: () => browser.click(selectors.tab.flight),
      isLoaded: () => browser.waitForExist(selectors.flight.container),
      hasData: () => hasFlightData(outboundElement) && hasFlightData(homeboundElement),
    };
  }
}

export default Modal;
