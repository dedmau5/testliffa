import Filter from './filter';
import FlightInformation from './flightInformation';
import Hotel from './hotel';
import Panel from './panel';

const selectors = {
  container: '.independent-flow-container',
  hotelListItem: '.independent-flow-container ul.if-hotels div.hotel-list-item',
};

/**
 * 
 * @static
 * @class HotelList
 */
class HotelList {
  static waitUntilFound() {
    browser.waitForExist(selectors.container, 10000);
  }

  static waitUntilLoaded() {
    browser.waitForExist(selectors.hotelListItem, 20000);
  }

  /**
   * Get the flightinformation.
   *
   * @readonly
   * @static
   * @memberof HotelList
   */
  static get flightInformation() {
    return FlightInformation;
  }

  /**
   * Get the panel for the hotellist.
   *
   * @readonly
   * @static
   * @memberof HotelList
   */
  static get panel() {
    return Panel;
  }

  /**
   * Gets all the hotels on the page.
   *
   * @readonly
   * @static
   * @returns {Hotel[]} Array of hotel.
   * @memberof HotelList
   */
  static get hotels() {
    const hotelElements = browser.elements(selectors.hotelListItem).value;

    return Array.map(hotelElements, hotel => new Hotel(hotel));
  }

  /**
   * Get filter for the hotellist.
   *
   * @readonly
   * @static
   * @memberof HotelList
   */
  static get filter() {
    return Filter;
  }
}

export default HotelList;
