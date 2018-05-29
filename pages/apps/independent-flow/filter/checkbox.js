const selectors = {
  container: '.checkbox-filter__option',
  content: '.webui-checkbox__content',
  disabled: 'checkbox-filter__option--disabled',
  checked: 'webui-checkbox--checked',
  square: '.webui-checkbox__square',
};

/**
 * @param {WebdriverIO.Client} element
 * @returns {name: string, value: string}
 */
const getContent = (element) => {
  const content = element.getText();

  return {
    name: content.replace(/[^=A-Za-z\s]/g, '').trim(),
    value: content.replace(/[^=0-9]/g, ''),
  };
};

class Checkbox {
  /**
   * Creates an instance of Checkbox.
   *
   * @param {WebdriverIO.Client} element
   * @memberof Checkbox
   */
  constructor(element) {
    this.element = element;
  }

  get name() {
    const contentElement = this.element.element(selectors.content);
    return getContent(contentElement).name;
  }

  get value() {
    const contentElement = this.element.element(selectors.content);
    return getContent(contentElement).value;
  }

  /**
   *
   * @readonly
   * @returns {bool}
   * @memberof Checkbox
   */
  get isDisabled() {
    const className = this.element.getAttribute('class');
    return className.includes(selectors.disabled);
  }

  /**
   *
   * @readonly
   * @returns {bool}
   * @memberof Checkbox
   */
  get isChecked() {
    const className = this.element.getAttribute('class');
    return className.includes(selectors.checked);
  }

  select() {
    this.element.click(selectors.square);
  }
}

export default Checkbox;
