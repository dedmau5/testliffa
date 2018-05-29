class Resort {
  /**
   * Creates an instance of Resort.
   *
   * @param {WebdriverIO.Client} element
   * @param {Array.<WebdriverIO.Client>} parentsElement
   * @memberof Resort
   */
  constructor(element, parentsElement) {
    this.element = element;
    this.parentsElement = parentsElement;
    this.selectable = true;

    this.name = this.element
      .getHTML()
      .replace(/\s*(<[^>]*>)/g, ' ')
      .trim();
  }

  /**
   * Returns the tree structure path to the resort.
   *
   * @readonly
   * @returns {Array.<WebdriverIO.Client>}
   * @memberof Resort
   */
  get path() {
    return this.parentsElement.concat([this.element]);
  }

  /**
   * Select the resort.
   *
   * @memberof Resort
   *
   */
  select() {
    this.element.click();
  }
}

export default Resort;
