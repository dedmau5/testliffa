import Resort from './resort';

const selectors = {
  name: '.destination-select__area-name',
  children: '.destination-select__area-children',
};

class Area {
  /**
   * Creates an instance of Area.
   *
   * @param {WebdriverIO.Client} element
   * @param {Array.<WebdriverIO.Client>} parentsElement
   * @memberof Area
   */
  constructor(element, parentsElement) {
    this.element = element;
    this.parentsElement = parentsElement;

    this.name = element
      .element(selectors.name)
      .getHTML()
      .replace(/\s*(<[^>]*>)/g, ' ')
      .trim();
  }

  /**
   * Selects the area (toggle).
   *
   * @memberof Area
   */
  select() {
    this.element.click();
  }

  /**
   * Check if element is expandable (toggle).
   *
   * @readonly
   * @returns {boolean}
   * @memberof Area
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
   * @readonly
   * @returns {Array.<WebdriverIO.Client>}
   * @memberof Resort
   */
  get path() {
    return this.parentsElement.concat([this.element]);
  }

  selectResort(resortName) {
    const foundResort = this.children.find(resort => resort.name === resortName);

    if (foundResort === undefined) {
      return null;
    }

    foundResort.select();

    return foundResort;
  }

  /**
   * Gets the children associated with the area.
   *
   * @readonly
   * @returns {Array.<Resort>}
   * @memberof Area
   */
  get children() {
    if (this.isSelectable) return null;

    const children = this.element.elements(`${selectors.children} > div`).value;

    return Array.map(children, child => new Resort(child, this.path));
  }
}

export default Area;
