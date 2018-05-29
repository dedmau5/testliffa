const selectors = {
  description: '.price-matrix-table__room-description',
  price: '.price-matrix-table__total-price',
  selectedRoomPrice: '.price-matrix-table-container .price-matrix-table__row--selected .price-matrix-table__total-price',
};

class Room {
  /**
   * Creates an instance of Room.
   *
   * @param {WebdriverIO.Client} element
   * @memberof Room
   */
  constructor(element) {
    this.element = element;
  }

  /**
   * Gets de description.
   *
   * @readonly
   * @returns {string}
   * @memberof Room
   */
  get description() {
    return this.element.getText(selectors.description);
  }

  /**
   * Gets the price.
   *
   * @readonly
   * @returns {string}
   * @memberof Room
   */
  get price() {
    return this.element.getText(selectors.price);
  }

  select() {
    this.element.click();
  }

  get isSelected() {
    return this.element.isExisting(selectors.selectedRoomPrice);
  }
}

export default Room;
