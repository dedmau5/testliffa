import RatingsPopup from './ratings-popup';

const selectors = {
  name: '.gw-resort-list-item__name',
  ratingsLabel: '.webui-concept-tags__tag--category-rating',
  button: '.webui-button.webui-button--primary',
  guestRating: {
    container: '.gw-resort-list-item__guest-rating',
    rating: '.webui-guest-rating__grade',
  },
  hotels: {
    container: '.gw-resort-list-item__hotels',
    quantity: '.gw-resort-list-item__number-of-hotels',
    link: '.webui-link.webui-link--arrow',
  },
  ratingsPopup: {
    container: '.webui-popup',
  },
  image: '.gw-resort-list-item__image-container',
};

class ResortListItem {
  /**
   * Creates an instance of ResortListItem.
   *
   * @param {WebdriverIO.Client} element
   * @memberof ResortListItem
   */
  constructor(element) {
    this.element = element;
  }

  /**
   * Get name of resort.
   *
   * @readonly
   * @returns {string}
   * @memberof ResortListItem
   */
  get name() {
    return this.element.getText(selectors.name);
  }

  /**
   * Get the image.
   *
   * @readonly
   * @returns {url: string}
   * @memberof ResortListItem
   */
  get image() {
    const element = this.element.element(selectors.image);
    return {
      url: element.element('img').getAttribute('src'),
    };
  }

  /**
   * Gets the ratings labels.
   *
   * @readonly
   * @returns {Array.<{title: string, select: function}>}
   * @memberof ResortListItem
   */
  get ratingsLabels() {
    const elements = this.element.elements(selectors.ratingsLabel).value;

    return Array.map(elements, element => ({
      title: element.getText(),
      select: () => element.click(),
    }));
  }

  /**
   * Gets the guest rating.
   *
   * @readonly
   * @returns {select: function}
   * @memberof ResortListItem
   */
  get guestRating() {
    const element = this.element.element(selectors.guestRating.container);

    return {
      select: () => element.click(),
    };
  }

  /**
   * Gets the number of hotels and the link to the hotel finder.
   *
   * @readonly
   * @returns {quantity: number, goTo: function, link: string}
   * @memberof ResortListItem
   */
  get hotels() {
    const element = this.element.element(selectors.hotels.container);
    const linkElement = element.element(selectors.hotels.link);

    return {
      quantity: element.getText(selectors.hotels.quantity),
      goTo: () => linkElement.click(),
      link: linkElement.getAttribute('href'),
    };
  }

  /**
   * Gets the popup.
   *
   * @readonly
   * @returns {RatingsPopup}
   * @memberof ResortListItem
   */
  get popup() {
    const element = this.element.element(selectors.ratingsPopup.container);
    return new RatingsPopup(element);
  }

  /**
   * Gets the readmore button.
   *
   * @readonly
   * @returns {url: string, select: function}
   * @memberof ResortListItem
   */
  get readMore() {
    const readMoreElement = this.element.element(selectors.button);
    return {
      url: readMoreElement.getAttribute('href'),
      select: () => readMoreElement.click(),
    };
  }
}

export default ResortListItem;
