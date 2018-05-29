import Modal from './modal';

const selectors = {
  name: '.hotel-info-header__hotel',
  price: '.hotel-price__total-price',
  select: '.hotel-info-footer__button-col a.webui-button',
  priceDetails: '.hotel-info-footer__detail-link',
};

class Hotel {
  /**
   * Creates an instance of Hotel.
   *
   * @param {WebdriverIO.Client} element
   * @memberof Hotel
   */
  constructor(element) {
    this.element = element;
  }

  get name() {
    return this.element.getText(selectors.name);
  }

  get price() {
    return this.element.getText(selectors.price);
  }

  select() {
    return this.element.click(selectors.select);
  }

  /**
   * Gets the price details.
   *
   * @readonly
   * @memberof Hotel
   */
  get priceDetails() {
    const priceDetailsElement = this.element.element(selectors.priceDetails);

    return {
      open: () => priceDetailsElement.click(),
      popup: Modal,
    };
  }
}

export default Hotel;
