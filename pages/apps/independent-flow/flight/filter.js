import Radiobutton from '../filter/radiobutton';
import CheckboxCollection from '../filter/checkbox-collection';

const selectors = {
  stopOver: {
    group: '.flight-list-filter-group:first-child',
    direct: '.radio-button-filter__option:nth-child(1)',
    oneStop: '.radio-button-filter__option:nth-child(2)',
    all: '.radio-button-filter__option:nth-child(3)',
  },
  carriers: '.flight-list-filter-group:nth-child(6)',
  clear: '.indflow-selection-box__clear-filter button',
};

class Filter {
  /**
   * Gets stopover filter.
   *
   * @readonly
   * @returns {{directFlight: Radiobutton, oneStop: Radiobutton, all: Radiobutton}} Return a radiobutton object.
   * @memberof Filter
   */
  static get stopOver() {
    const { stopOver } = selectors;

    return {
      directFlight: new Radiobutton(`${stopOver.group} ${stopOver.direct}`),
      oneStop: new Radiobutton(`${stopOver.group} ${stopOver.oneStop}`),
      all: new Radiobutton(`${stopOver.group} ${stopOver.all}`),
    };
  }

  /**
   * Gets the checkboxes for the carriers.
   *
   * @readonly
   * @returns {CheckboxCollection}
   * @memberof Filter
   */
  static get carriers() {
    const element = browser.element(selectors.carriers);
    return new CheckboxCollection(element);
  }

  static reset() {
    browser.click(selectors.clear);
  }
}

export default Filter;
