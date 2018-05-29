import ResortInformation from './resort-information';
import Facts from './facts/facts';
import Breadcrumbs from './breadcrumbs';
import GeoPush from './geo-push';

class GeographicalWebResort {
  /**
   * Returns Resortinformation.
   *
   * @readonly
   * @static
   * @memberof GeographicalWeb
   */
  static get resortInformation() {
    return new ResortInformation();
  }

  /**
   * Returns Facts.
   *
   * @readonly
   * @returns {Facts}
   * @static
   * @memberof GeographicalWeb
   */
  static get facts() {
    return new Facts();
  }

  /**
   * Returns Breadcrumbs.
   *
   * @readonly
   * @returns {Breadcrumbs}
   * @static
   * @memberof GeographicalWeb
   */
  static get breadcrumbs() {
    return new Breadcrumbs();
  }

  /**
   * Returns GeoPush.
   *
   * @readonly
   * @returns {GeoPush}
   * @static
   * @memberof GeographicalWeb
   */
  static get geoPush() {
    return new GeoPush();
  }
}

export default GeographicalWebResort;
