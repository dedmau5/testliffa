const selectors = {
  input: '.input__container.destination-search-field > input',
  result: {
    container: '.destination-search-result',
    items: '.destination-search-result__item',
  },
};

class DestinationSearch {
  constructor(element, input) {
    element.setValue(selectors.input, input);
    this.input = input;
    this.element = element;
  }

  /**
   * Gets all results when preformed a search.
   *
   * @readonly
   * @returns {Array.<{title: string, id: number}>}
   * @memberof DestinationSearch
   */
  get results() {
    this.element.waitForExist(selectors.result.container, 1000);
    const results = this.element.elements(selectors.result.items).value;

    if (!results) {
      return [];
    }

    return Array.map(results, result => ({
      title: result.getText(),
      id: result.ELEMENT,
    }));
  }

  /**
   * Selects a value in the dropdownlist from search.
   *
   * @returns {boolean} Returns true or false if we could to find item in list and click on it.
   */
  select() {
    if (!this.results.length > 0) return false;

    const found = this.results.find(item => item.title === this.input);

    if (found) {
      browser.elementIdClick(found.id);
      return true;
    }

    return false;
  }
}

export default DestinationSearch;
