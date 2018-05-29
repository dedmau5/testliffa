import Package from './product-selector/package';
import City from './product-selector/city';
import Cruise from './product-selector/cruise';
import FlightOnly from './product-selector/flight-only';
import HotelOnly from './product-selector/hotel-only';

const selectors = {
  container: '.bookingstart-horizontal',
  loader: '.form-field--loader',
  search: '.bookingstart-section__button-container button',
  product: {
    package: '.product-selector__option:first-child',
    city: '.product-selector__option:nth-child(2)',
    cruise: '.product-selector__option:nth-child(3)',
    flightOnly: '.product-selector__option:nth-child(4)',
    hotelOnly: '.product-selector__option:nth-child(5)',
  },
};

class BookingStart {
  static get package() {
    return new Package(selectors.product.package);
  }

  static get city() {
    return new City(selectors.product.city);
  }

  static get cruise() {
    return new Cruise(selectors.product.cruise);
  }

  static get hotelOnly() {
    return new HotelOnly(selectors.product.hotelOnly);
  }

  static get flightOnly() {
    return new FlightOnly(selectors.product.flightOnly);
  }

  static waitUntilFound(timeout = 10000) {
    return browser.waitForExist(selectors.container, timeout);
  }

  static waitUntilLoaded(timeout = 10000) {
    return browser.waitForExist(selectors.loader, timeout, true);
  }

  static search() {
    browser.click(selectors.search);
  }
}

export default BookingStart;
