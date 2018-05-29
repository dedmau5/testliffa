const selectors = {
  container: '#geo-push-view',
  item: '.gw-geopush__item',
  link: '.gw-geopush__link',
};

class GeoPush {
  constructor() {
    this.element = browser.element(selectors.container);
  }

  /**
   * Gets the number of elements.
   *
   * @readonly
   * @returns {number}
   * @memberof GeoPush
   */
  get numberOfItems() {
    return this.element.elements(selectors.item).value.length;
  }

  /**
   * Gets the elements.
   *
   * @readonly
   * @returns {Array.<{title: string, link: string}>}
   * @memberof GeoPush
   */
  get items() {
    const items = this.element.elements(selectors.item).value;

    return Array.map(items, (item) => {
      const link = item.element(selectors.link);
      return {
        title: item.getText(),
        link: link.getAttribute('href'),
      };
    });
  }

  /**
   * Wait until loaded.
   *
   * @param {number} [timeout=6000]
   * @memberof GeoPush
   */
  waitUntilLoaded(timeout = 6000) {
    this.element.waitForExist(timeout);
  }
}

export default GeoPush;
