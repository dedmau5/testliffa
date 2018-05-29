import Breadcrumbs from './breadcrumbs';
import ResortList from './resort-list';

const selectors = {
  resortList: '.gw-resort-list',
};

class GeographicalWebArea {
  /**
   * Returns Breadcrumbs.
   *
   * @readonly
   * @returns {Breadcrumbs}
   * @static
   * @memberof GeographicalWebArea
   */
  static get breadcrumbs() {
    return new Breadcrumbs();
  }

  /**
   * Return Resort list.
   *
   * @readonly
   * @returns {ResortList}
   * @static
   * @memberof GeographicalWebArea
   */
  static get resortList() {
    const element = browser.element(selectors.resortList);
    return new ResortList(element);
  }
}

export default GeographicalWebArea;
