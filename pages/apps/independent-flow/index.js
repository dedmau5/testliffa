import PriceMatrix from './price-matrix/price-matrix';
import HotelList from './hotel/list';
import FlightList from './flight/list';

class IndependentFlow {
  /**
   * Gets the hotellist page object.
   *
   * @static
   * @memberof IndependentFlow
   */
  static get hotelList() {
    return HotelList;
  }

  /**
   * Gets the pricematrix page object.
   *
   * @static
   * @memberof IndependentFlow
   */
  static get priceMatrix() {
    return PriceMatrix;
  }

  /**
   * Gets the flightlist for package page object.
   *
   * @static
   * @memberof IndependentFlow
   */
  static get flightList() {
    return FlightList;
  }

  /**
   * Gets the flightlist for flight only page object.
   *
   * @static
   * @memberof IndependentFlow
   */
  static get flightOnly() {
    return FlightList;
  }
}

export default IndependentFlow;
