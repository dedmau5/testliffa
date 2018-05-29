const selectors = {
  close: '.webui-modal-header__close',
};

class RatingsPopup {
  /**
   * Creates an instance of RatingsPopup.
   *
   * @param {WebdriverIO.Client} element
   * @memberof RatingsPopup
   */
  constructor(element) {
    this.element = element;
  }

  /**
   * Close the popup.
   *
   * @memberof RatingsPopup
   */
  close() {
    this.element.click(selectors.close);
  }

  /**
   * Wait until popup is loaded.
   *
   * @param {number} [timeout=2000]
   * @memberof RatingsPopup
   */
  waitUntilLoaded(timeout = 2000) {
    this.element.waitForExist(timeout);
  }

  /**
   * Checks if popup is open.
   *
   * @readonly
   * @returns {boolean}
   * @memberof RatingsPopup
   */
  get isOpen() {
    return this.element.isVisible();
  }
}

export default RatingsPopup;
