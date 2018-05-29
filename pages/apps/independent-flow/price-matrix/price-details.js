const container = '.price-matrix-summary__price-details';

const selectors = {
  container,
  expand: '.price-matrix-summary__expand-link',
  name: `${container} .price-details-travel-info__row:first-child .price-details-travel-info__value`,
  departure: `${container} .price-details-travel-info__row:nth-child(5) .price-details-travel-info__value`,
  totalPrice: `${container} .price-details-price-table__row--total .price-details-price-table__total`,
};

class PriceDetails {
  static get name() {
    return browser.getText(selectors.name);
  }

  static get totalPrice() {
    return browser.getText(selectors.totalPrice);
  }

  static get departure() {
    return browser.getText(selectors.departure);
  }

  static expand() {
    browser.click(selectors.expand).waitForExist(selectors.container, 4000);
  }

  static close() {
    browser.click(selectors.expand).waitForExist(selectors.container, 4000, true);
  }
}

export default PriceDetails;
