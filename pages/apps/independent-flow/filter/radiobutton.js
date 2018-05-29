const selectors = {
  disabled: 'radio-button-filter__option--disabled',
};

class Radiobutton {
  /**
   * Creates an instance of Radiobutton.
   *
   * @param {string} selector - Webdriverio Element.
   * @memberof Radiobutton
   */
  constructor(selector) {
    this.element = browser.element(selector);
  }

  /**
   * Select button.
   *
   * @memberof Radiobutton
   */
  select() {
    this.element.click();
  }

  /**
   * Check if Radiobutton is disabled.
   *
   * @returns {boolean}
   * @memberof Radiobutton
   */
  isDisabled() {
    const className = this.element.getAttribute('class');
    return className.includes(selectors.disabled);
  }
}

export default Radiobutton;
