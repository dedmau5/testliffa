import MenuItem from './menuItem';
import getRandomNumber from './../../utils';

const selectors = {
  item: '.header-main-navigation__item',
};


  /**
   * Find value in nested array.
   *
   * @param {any} items
   * @param {any} value
   * @returns {Object}
   * @memberof navigation
   */
const findValue = (items, value) => {
  if (!items) return null;

  let found = {};
  for (let index = 0; index < items.length; index++) {
    if (items[index].title === value) {
      return items[index];
    }

    found = findValue(items[index].children, value);
    if (found) {
      return found;
    }
  }

  return found;
};


class Navigation {
  /**
   * Creates an instance of Navigation.
   *
   * @param {WebdriverIO.Client} element
   * @memberof Navigation
   */
  constructor(element) {
    this.element = element;
  }

  /**
   * Find menu item (nested) and click on it.
   *
   * @param {string} linkName
   * @memberof navigation
   */
  navigateTo(linkName) {
    const { menu } = this;
    const element = findValue(menu, linkName);
    if (element) {
      element.select();
      return true;
    }

    return false;
  }

  /**
   * Find random menu item (nested) and return it.
   *
   * @memberof navigation
   */
  getRandomMenuItem() {
    const { menu } = this;
    const menuItemNumber = getRandomNumber(menu.length);
    const subMenuItemNumber = getRandomNumber(menu[menuItemNumber].children.length);
    const menuItem = menu[menuItemNumber].children[subMenuItemNumber];
    return {
      title: menuItem.title,
      url: menuItem.url,
    };
  }

  /**
   * Get Navigation menu with all sub menu items.
   *
   * @readonly
   * @memberof navigation
   */
  get menu() {
    const menuItems = this.element.elements(selectors.item).value;

    return Array.map(menuItems, item => new MenuItem(item));
  }
}


export default Navigation;
