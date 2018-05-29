import SectionField from './section-field';
import Country from './world/country';
import DestinationSearch from './destination-search';

const selectors = {
  country: '.destination-select__country',
  expandable: 'destination-select__country--expandable',
  area: {
    container: '.destination-select__country-children',
    title: '.destination-select__resort',
  },
};

/**
 * Select selectable item.
 *
 * @param {Object} item
 * @param {string} value
 * @returns {Object}
 */
const selectChild = (item, value) => {
  if (typeof item.children === 'undefined') {
    switch (true) {
      case item.name === value:
      case item.name === 'Alla resmål':
        return item;
      default:
        return null;
    }
  }
  const filtredItem = item.children.find(child => child.name === value || child.name === 'Alla resmål');
  if (typeof filtredItem === 'undefined') return null;

  return selectChild(filtredItem, value);
};

/**
 * Recursive find item in world structure.
 *
 * @param {Array} items
 * @param {string} value
 * @returns {Object}
 */
const deepFind = (items, value) => {
  if (items == null) return null;

  for (let index = 0; index < items.length; index += 1) {
    if (items[index].name === value) {
      return selectChild(items[index], value);
    }

    const found = deepFind(items[index].children, value);
    if (found) return found;
  }

  return null;
};

class Destination extends SectionField {
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
   * Automatic select destination.
   *
   * @param {string} destinationName
   * @memberof Destination
   */
  quickSelect(destinationName) {
    const destination = deepFind(this.countries, destinationName);

    if (destination == null) return false;

    destination.path.forEach((element) => {
      element.click();
    });

    return true;
  }

  /**
   *
   *
   * @param {string} countryName
   * @returns {Country}
   * @memberof Destination
   */
  selectCountry(countryName) {
    const foundCountry = this.countries.find(country => country.name === countryName);

    if (foundCountry === undefined) {
      return null;
    }

    foundCountry.select();

    return foundCountry;
  }

  /**
   * Gets all the countries and all there area and resort (takes a long time).
   *
   * @readonly
   * @returns {Array.<Country>}
   * @memberof Destination
   */
  get countries() {
    if (!this.isOpen) this.open();

    const countryElements = this.element.elements(selectors.country).value;

    return Array.map(countryElements, element => new Country(element));
  }
}

export default Destination;
