import Checkbox from './checkbox';

const selectors = {
  header: 'h3.flight-list-filter-group__heading',
  checkbox: '.checkbox-filter__option',
};

class CheckboxCollection {
  /**
   * Creates an instance of Checkbox.
   *
   * @param {WebdriverIO.Client} element
   * @memberof CheckboxCollection
   */
  constructor(element) {
    this.element = element;
  }

  get header() {
    return this.element.getText(selectors.header);
  }

  /**
   * Gets the list of all checkboxes under the collection.
   *
   * @readonly
   * @returns {Checkbox[]}
   * @memberof CheckboxCollection
   */
  get list() {
    const elements = this.element.elements(selectors.checkbox).value;

    return Array.map(elements, element => new Checkbox(element));
  }
}

export default CheckboxCollection;
