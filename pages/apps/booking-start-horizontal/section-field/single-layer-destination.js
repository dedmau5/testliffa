import SectionField from './section-field';
import DestinationSearch from './destination-search';

const selectors = {
  destination: '.departure-select__item',
};

class SingleLayerDestination extends SectionField {
  /**
   * Search for a given input.
   *
   * @param {string} searchInput
   * @returns {DestinationSearch}
   * @memberof Destination
   */
  search(searchInput) {
    if (!this.isOpen) this.open();

    return new DestinationSearch(this.element, searchInput);
  }

  /**
   * Select destination.
   *
   * @param {string} destinationName
   * @returns {boolean}
   * @memberof CityDestination
   */
  select(destinationName) {
    const foundDestination = this.destinations.find(destination => destination.name === destinationName);

    if (foundDestination === undefined) {
      return false;
    }

    foundDestination.select();

    return true;
  }

  get destinations() {
    const destinationElements = this.element.elements(selectors.destination).value;

    return Array.map(destinationElements, element =>
      ({
        name: element.getText(selectors.name),
        select: () => element.click(),
      }));
  }
}

export default SingleLayerDestination;
