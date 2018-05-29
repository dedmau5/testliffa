const selectors = {
  link: 'a',
};

class ChildMenuItem {
  /**
   * Creates an instance of ChildMenuItem.
   *
   * @param {WebdriverIO.Client} element
   * @param {WebdriverIO.Client} mainMenuElement
   * @memberof ChildMenuItem
   */
  constructor(element, mainMenuElement) {
    this.element = element;
    this.mainMenuElement = mainMenuElement;
  }
  /**
   * Selects the submenu item.
   *
   * @memberof ChildMenuItem
   */
  select() {
    if (!this.isVisible) {
      browser.moveTo(this.mainMenuElement.ELEMENT);
    }

    this.element.click();
  }
  /**
   * Gets the text for the submenu item.
   *
   * @readonly
   * @memberof ChildMenuItem
   */
  get title() {
    return this.element
      .element(selectors.link)
      .getHTML()
      .replace(/\s*(<[^>]*>)/g, ' ')
      .trim();
  }
  /**
   * Gets the url for the submenu item.
   *
   * @readonly
   * @memberof ChildMenuItem
   */
  get url() {
    return this.element.getAttribute('<a />', 'href', res => res);
  }
  /**
   * Checks if the submenu item is visible.
   *
   * @readonly
   * @memberof ChildMenuItem
   */
  get isVisible() {
    return this.element.isVisible(selectors.link);
  }
}

export default ChildMenuItem;
