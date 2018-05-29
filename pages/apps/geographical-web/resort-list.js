import ResortListItem from './resort-list-item';

const selectors = {
  item: '.gw-resort-list-item',
};

class ResortList {
  /**
   * Creates an instance of ResortList.
   *
   * @param {WebdriverIO.Client} element
   * @memberof ResortList
   */
  constructor(element) {
    this.element = element;
  }

  /**
   * Wait until breadcrumbs are loaded.
   *
   * @param {number} [timeout=10000]
   * @memberof ResortList
   */
  waitUntilLoaded(timeout = 10000) {
    this.element.waitForExist(timeout);
  }

  /**
   * Gets all items in the resort list.
   *
   * @readonly
   * @returns {Array.<ResortListItem>}
   * @memberof ResortList
   */
  get items() {
    const elements = this.element.elements(selectors.item).value;

    return Array.map(elements, element => new ResortListItem(element));
  }
}

export default ResortList;
