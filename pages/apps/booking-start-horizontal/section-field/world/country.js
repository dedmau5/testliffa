import Resort from './resort';
import Area from './area';

const selectors = {
  name: '.destination-select__country-name',
  children: '.destination-select__country-children',
  resort: 'destination-select__resort',
};

class Country {
  /**
   * Creates an instance of Country.
   *
   * @param {WebdriverIO.Client} element
   * @memberof Country
   */
  constructor(element) {
    this.element = element;
    this.name = element.getText(selectors.name);
  }

  /**
   * Click country (select or toggle).
   *
   * @memberof Country
   */
  select() {
    this.element.click(selectors.name);
  }

  /**
   * Returns the tree path to this item.
   *
   * @readonly
   * @memberof Country
   */
  get path() {
    return [this.element];
  }

  /**
   * Check if element is expandable (toggle). If this returns false this element can be selected.
   *
   * @readonly
   * @returns {boolean}
   * @memberof Country
   */
  get isExpandable() {
    return this.element.getAttribute('class').includes('--expandable');
  }

  get isExpanded() {
    return this.element.isVisible(selectors.children);
  }

  /**
   *
   *
   * @param {string} areaName
   * @returns {Area}
   * @memberof Country
   */
  selectArea(areaName) {
    const foundArea = this.areas.find(area => area.name === areaName);

    if (foundArea === undefined) {
      return null;
    }

    foundArea.select();

    return foundArea;
  }
  /**
   *
   *
   * @param {string} resortName
   * @returns {Resort}
   * @memberof Country
   */
  selectResort(resortName) {
    const foundResort = this.resorts.find(resort => resort.name === resortName);

    if (foundResort === undefined) {
      return null;
    }

    foundResort.select();

    return foundResort;
  }

  get areas() {
    return this.children.filter(child => child instanceof Area);
  }

  get resorts() {
    return this.children.filter(child => child instanceof Resort);
  }

  /**
   * Returns the children of this country (areas and resorts).
   *
   * @readonly
   * @returns {Array}
   * @memberof Country
   */
  get children() {
    if (this.isSelectable) return null;

    const children = this.element.elements(`${selectors.children} > div`).value;

    return Array.map(children, (child) => {
      const className = child.getAttribute('class');
      if (className.includes(selectors.resort)) {
        return new Resort(child, this.path);
      }

      return new Area(child, this.path);
    });
  }
}

export default Country;
