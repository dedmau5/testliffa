const selectors = {
  overlay: '.select-overlay',
  close: '.select-overlay__close-button',
  formField: '.form-field__value',
};

class SectionField {
  /**
   * Creates an instance of Base class for section-fields.
   *
   * @param {WebdriverIO.Client} element
   * @memberof SectionField
   */
  constructor(element) {
    this.element = element;
  }

  open() {
    this.element.click();
    this.element.waitForExist(selectors.overlay, 3000);
  }

  close() {
    this.element.click(selectors.close);
  }

  get isOpen() {
    return this.element.isExisting(selectors.overlay);
  }

  get value() {
    return this.element.getText(selectors.formField);
  }
}

export default SectionField;
