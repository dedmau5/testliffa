import SearchField from './search-field';
import Navigation from './navigation/navigation';

const container = '.header-container';

const selectors = {
  container: `${container}`,
  logo: `${container} .header-logotype`,
  navigation: `${container} .header-main-navigation`,
};
export default class Header {
  /**
   * Gets the logo.
   *
   * @readonly
   * @memberof Header
   */
  static get logo() {
    return {
      click: () => browser.click(selectors.logo),
    };
  }

  /**
   * Gets the navigation.
   *
   * @readonly
   * @memberof Header
   */
  static get navigation() {
    const element = browser.element(selectors.navigation);
    return new Navigation(element);
  }

  /**
   * Gets the search field.
   *
   * @readonly
   * @memberof Header
   */
  static get searchField() {
    return new SearchField();
  }

  /**
   * Waits until container is loaded.
   *
   * @param {number} timeout
   * @memberof Header
   */
  static waitUntilLoaded(timeout = 60000) {
    browser.waitForExist(selectors.container, timeout);
  }
}
