import Transport from './transport';
import Filter from './filter';

const selectors = {
  container: '.flight-list-container',
  loader: '.flight-list-container--loader',
  list: '.flight-list-container .flight-list',
  flight: '.flight-list-item',
  sortPanel: '.flight-list-sort-panel',
  tab: {
    recommended: '.flight-list-sort-panel__option:nth-child(1)',
    cheapest: '.flight-list-sort-panel__option:nth-child(2)',
    fastest: '.flight-list-sort-panel__option:nth-child(3)',
  },
  hits: '.flight-list__header',
};

/**
 * @returns {Number[]}
 * @memberof FlightList
 */
const getNumbersFromListHeader = () => {
  const hits = browser.getText(selectors.hits);
  return hits.split(/[^=0-9]/g).filter(Number);
};

/**
 * @param {string} selector
 * @returns {{select: function()}}
 * @memberof FlightList
 */
const selectTab = selector => ({
  select: () => browser.click(selector),
});

class FlightList {
  static waitUntilLoaded(timeout = 1000) {
    browser.waitForExist(selectors.loader, timeout, true);
    browser.waitForExist(selectors.flight, timeout);
    browser.waitForExist(selectors.sortPanel, timeout);
  }

  static waitUntilFound() {
    browser.waitForExist(selectors.container, 20000);
  }

  /**
   * Returns an array of transports.
   *
   * @static
   * @returns {Transport[]} - New array of Transport.
   */
  static get transports() {
    const elements = browser.elements(selectors.flight).value;

    return Array.map(elements, element => new Transport(element));
  }

  /**
   *GEt total hits showing.
   *
   * @readonly
   * @static
   * @returns {number}
   * @memberof FlightList
   */
  static get hits() {
    const numbers = getNumbersFromListHeader();
    return numbers[0];
  }

  /**
   * Check if flightlist is filtred.
   *
   * @readonly
   * @static
   * @returns {boolean}
   * @memberof FlightList
   */
  static get isFiltred() {
    const numbers = getNumbersFromListHeader();
    return numbers.length > 1;
  }

  /**
   * Gets the tabs.
   *
   * @readonly
   * @memberof FlightList
   */
  static get tabs() {
    return {
      cheapest: selectTab(selectors.tab.cheapest),
      fastest: selectTab(selectors.tab.fastest),
      recommended: selectTab(selectors.tab.recommended),
    };
  }

  /**
   * Get filter object.
   *
   * @readonly
   * @static
   * @memberof FlightList
   */
  static get filter() {
    return Filter;
  }
}

export default FlightList;
