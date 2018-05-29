import PriceDetails from './price-details';
import Room from './room';
import Modal from './modal';

const home = '#price-matrix';

const selectors = {
  home,
  room: '.price-matrix-table-container .price-matrix-table__row',
  summary: {
    home: `${home} .price-matrix-summary`,
    totalPrice: `${home} .price-matrix-summary .price-matrix-summary__price strong`,
    bookButton: `${home} .price-matrix-summary__right .webui-button`,
  },
  selectedRoomPrice: '.price-matrix-table-container .price-matrix-table__row--selected .price-matrix-table__total-price',
};

class PriceMatrix {
  /**
   * Get the price details.
   *
   * @readonly
   * @static
   * @memberof PriceMatrix
   */
  static get priceDetails() {
    return PriceDetails;
  }

  /**
   * Get rooms for the hotel.
   *
   * @readonly
   * @returns {Room[]}
   * @memberof PriceMatrix
   */
  static get rooms() {
    const elements = browser.elements(selectors.room).value;

    return Array.map(elements, element => new Room(element));
  }

  /**
   * Get popup for flight details.
   *
   * @readonly
   * @static
   * @memberof PriceMatrix
   */
  static get flightDetails() {
    return Modal;
  }

  /**
   * Get the summary panel.
   *
   * @readonly
   * @returns {{totalPrice: string, select: function()}}
   * @memberof PriceMatrix
   */
  static get summary() {
    return {
      totalPrice: browser.getText(selectors.summary.totalPrice),
      select: () => browser.click(selectors.summary.bookButton),
    };
  }

  static waitUntilLoaded(timeout = 60000) {
    browser.waitForExist(selectors.selectedRoomPrice, timeout);
  }
}

export default PriceMatrix;
