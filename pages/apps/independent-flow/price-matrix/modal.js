const container = '.flight-details-container';

const selectors = {
  open: 'a.price-matrix-table__flight-info-link',
  close: '.webui-popup button.webui-modal-header__close',
  outbound: `${container} .flight-details--outbound`,
  homebound: `${container} .flight-details--homebound`,
  date: '.flight-details__title',
};

/**
 *
 * @param {WebdriverIO.Client} element
 * @returns {{date: (string)}}
 * @memberof Modal
 */
const getFlightInformation = element => ({
  date: element.getText(selectors.date),
});

class Modal {
  static open() {
    browser.click(selectors.open);
  }

  static close() {
    browser.click(selectors.close);
  }

  /**
   * Get the information from the modal.
   *
   * @readonly
   * @static
   * @memberof Modal
   */
  static get information() {
    const outbound = browser.element(selectors.outbound);
    const homebound = browser.element(selectors.homebound);
    return {
      outbound: getFlightInformation(outbound),
      homebound: getFlightInformation(homebound),
    };
  }
}

export default Modal;
