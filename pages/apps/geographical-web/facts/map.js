const selectors = {
  close: 'button.webui-map__close-button',
};

class Map {
  /**
   * Creates an instance of Map.
   *
   * @param {WebdriverIO.Client} pushElement
   * @param {WebdriverIO.Client} popupElement
   * @memberof Map
   */
  constructor(pushElement, popupElement) {
    this.pushElement = pushElement;
    this.popupElement = popupElement;
  }

  /**
   * Opens the popup with a click on the push.
   *
   * @memberof Map
   */
  open() {
    this.pushElement.click();
    this.popupElement.waitForExist(2000);
  }

  /**
   * Check if the popup to the push is open.
   *
   * @readonly
   * @returns {boolean}
   * @memberof Map
   */
  get isOpen() {
    return this.popupElement.isVisible();
  }

  /**
   * Closes the popup.
   *
   * @memberof Map
   */
  close() {
    const closeButton = this.popupElement.element(selectors.close);
    closeButton.click();
  }
}

export default Map;
