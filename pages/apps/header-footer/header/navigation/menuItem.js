import ChildMenuItem from './childMenuItem';

const selectors = {
  link: '.header-main-navigation__link',
  selected: 'header-main-navigation__item--selected',
  subMenuItem: '.header-sub-navigation__item',
  hoverMenuItem: '.header-hover-navigation__item',
};

class MenuItem {
  /**
   * Creates an instance of MenuItem.
   *
   * @param {WebdriverIO.Client} element
   * @memberof MenuItem
   */
  constructor(element) {
    this.element = element;
  }
  /**
   * Select menu item.
   *
   * @memberof MenuItem
   */
  select() {
    this.element.click();
  }
  /**
   * Get the title for the menu item.
   *
   * @readonly
   * @memberof MenuItem
   */
  get title() {
    return this.element.getText(selectors.link);
  }
  /**
   * Checks if the menu item is selected.
   *
   * @readonly
   * @memberof MenuItem
   */
  get isSelected() {
    return this.element.getAttribute('class').includes(selectors.selected);
  }
  /**
   * Gets the submenu for the menu item.
   *
   * @readonly
   * @memberof MenuItem
   */
  get children() {
    let children;

    if (this.isSelected) {
      children = browser.elements(selectors.subMenuItem).value;
    } else {
      children = this.element.elements(selectors.hoverMenuItem).value;
    }

    return Array.map(children, child => new ChildMenuItem(child, this.element));
  }
}

export default MenuItem;
