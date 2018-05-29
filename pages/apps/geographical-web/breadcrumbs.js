const selectors = {
  home: '#breadcrumbs-view',
  breadcrumbsList: '.webui-breadcrumb-list',
  breadcrumbsListItem: '.webui-breadcrumb-list__item',
  lastItem: '.webui-breadcrumb-list__item-text--last',
};

class Breadcrumbs {
  constructor() {
    this.element = browser.element(selectors.home);
  }

  /**
   * Wait until breadcrumbs are loaded.
   *
   * @param {number} [timeout=10000]
   * @memberof Breadcrumbs
   */
  waitUntilLoaded(timeout = 10000) {
    this.element.waitForExist(timeout);
  }

  /**
   * Gets the number of list items in breadcrums.
   *
   * @returns {number}
   */
  get numberOfItems() {
    return this.element.elements(selectors.breadcrumbsListItem).value.length;
  }

  /**
   * Gets the name of the last list item in breadcrums.
   *
   * @returns {string}
   */
  get lastItemText() {
    return this.element.getText(selectors.lastItem);
  }
}

export default Breadcrumbs;
