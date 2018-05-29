const selectors = {
  close: 'button.webui-modal-header__close',
  content: '.fact-popup-content-container',
  tab: {
    container: '.webui-tab-nav.fact-popup-header-nav',
    left: '.webui-tab-nav__button:first-child',
    right: '.webui-tab-nav__button:nth-child(2)',
  },
};

class Fact {
  /**
   * Creates an instance of Fact.
   *
   * @param {WebdriverIO.Client} pushElement
   * @param {WebdriverIO.Client} popupElement
   * @memberof Fact
   */
  constructor(pushElement, popupElement) {
    this.pushElement = pushElement;
    this.popupElement = popupElement;
  }

  /**
   * Opens the popup with a click on the push.
   *
   * @memberof Fact
   */
  open() {
    this.pushElement.click();
  }

  /**
   * Check if the popup to the push is open.
   *
   * @readonly
   * @returns {boolean}
   * @memberof Fact
   */
  get isOpen() {
    return this.popupElement.isVisible();
  }

  /**
   * Closes the popup.
   *
   * @memberof Fact
   */
  close() {
    this.popupElement.click(selectors.close);
  }

  /**
   * Check if the push have navigation tabs.
   *
   * @readonly
   * @memberof Fact
   */
  get hasTabNavigation() {
    return this.popupElement.isExisting(selectors.tab.container);
  }

  /**
   * Checks if there is content.
   *
   * @readonly
   * @memberof Fact
   */
  get hasContent() {
    return this.popupElement.getText(selectors.content) !== '';
  }

  /**
   * Gets the tabs.
   *
   * @readonly
   * @memberof Fact
   */
  get tabNavigation() {
    return {
      left: {
        select: () => this.popupElement.click(selectors.tab.left),
      },
      right: {
        select: () => this.popupElement.click(selectors.tab.right),
      },
    };
  }
}

export default Fact;
