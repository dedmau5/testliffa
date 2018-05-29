const container = '.webui-popup .hotel-price-spec';

const selectors = {
  container,
  close: 'button.webui-modal-header__close',
  totalPrice: `${container} .hotel-price-spec__total-price`,
};

class Modal {
  static waitUntilExist(timeout = 1000) {
    browser.waitForExist(container, timeout);
  }

  static close() {
    browser.click(selectors.close).waitForExist(selectors.container, 6000, true);
  }

  static get information() {
    return {
      totalPrice: browser.getText(selectors.totalPrice),
    };
  }
}

export default Modal;
