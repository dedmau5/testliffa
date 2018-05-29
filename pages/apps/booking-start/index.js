import { locateElementAndClickOnIt } from '../../../tools/elements';

import { CommonDeparture } from './common-departure';
import CommonDestination from './common-destination';
import { CommonPax } from './common-pax';
import { CommonDuration } from './common-duration';
import { CommonDatepicker } from './common-datepicker';
import { CityDestination } from './city-destination';
import { FlightOnlyDestination } from './flight-only-destination';
import CruiseDestination from './cruise-destination';

class _BookingStart {
  constructor(selector = '#bookingstart-horizontal') {
    const productsHome = 'div.product-selector';

    this.selectors = {
      home: selector,

      products: {
        home: productsHome,
        package: {
          home: `${productsHome} div:nth-child(1)`,
          choiceSection: 'div.bookingstart-section--package',
        },
        city: {
          home: `${productsHome} div:nth-child(2)`,
          choiceSection: 'div.bookingstart-section--city',
        },
        cruise: {
          home: `${productsHome} div:nth-child(3)`,
          choiceSection: 'div.bookingstart-section--cruise',
        },
        flightOnly: {
          home: `${productsHome} div:nth-child(4)`,
          choiceSection: 'div.bookingstart-section--flight',
        },
        hotelOnly: {
          home: `${productsHome} div:nth-child(5)`,
          choiceSection: 'div.bookingstart-section--hotel-only',
        },
      },

      destination: {
        value: '.bookingstart-section__destination-select .form-field__value',
      },

      search: {
        button: '.bookingstart-section__search-button',
      },
    };
  }

  /**
   * Tells us whether the Booking Start app's container exists or not.
   *
   * @returns {boolean}
   */
  isExisting() {
    return browser.isExisting(this.selectors.home);
  }

  /**
   * Wait until BookingStart is found.
   *
   * @param timeout {number}
   * The time, given in millseconds, the method waits for the given selector before throwing an error.
   */
  waitUntilLoaded(timeout = 60000) {
    browser.waitForExist(this.selectors.home, timeout);
  }

  waitUntilDataLoaded(timeout = 60000) {
    browser.waitForExist(this.selectors.destination.value, timeout);
  }

  /**
   * Gets package booking start options.
   *
   * @returns {{click: (function()), departure: CommonDeparture, destination: CommonDestination, duration: CommonDuration, pax: CommonPax, datepicker: CommonDatepicker }}
   */
  get package() {
    if (!this._package) {
      this._package = {
        click: () => {
          locateElementAndClickOnIt(this.selectors.products.package.home);
        },
        departure: new CommonDeparture(this.selectors.products.package.choiceSection),
        destination: new CommonDestination(this.selectors.products.package.choiceSection),
        duration: new CommonDuration(this.selectors.products.package.choiceSection),
        pax: new CommonPax(this.selectors.products.package.choiceSection),
        datepicker: new CommonDatepicker(this.selectors.products.package.choiceSection),
      };
    }

    return this._package;
  }

  /**
   * Get city bookingstart options.
   *
   * @returns {{click: (function()), departure: CommonDeparture, destination: CommonDestination, duration: CommonDuration, pax: CommonPax, datepicker: CommonDatepicker }}
   */
  get city() {
    if (!this._city) {
      this._city = {
        click: () => locateElementAndClickOnIt(this.selectors.products.city.home),
        departure: new CommonDeparture(this.selectors.products.city.choiceSection),
        destination: new CityDestination(this.selectors.products.city.choiceSection),
        duration: new CommonDuration(this.selectors.products.city.choiceSection),
        pax: new CommonPax(this.selectors.products.city.choiceSection),
        datepicker: new CommonDatepicker(this.selectors.products.city.choiceSection),
      };
    }

    return this._city;
  }

  /**
   * @returns {{
   *     click: Function,
   *     departure: CommonDeparture
   * }}
   */
  get cruise() {
    this._cruise = {
      click: () => {
        locateElementAndClickOnIt(this.selectors.products.cruise.home);
      },
      departure: new CommonDeparture(this.selectors.products.cruise.choiceSection),
      destination: new CruiseDestination(this.selectors.products.cruise.choiceSection),
      pax: new CommonPax(this.selectors.products.cruise.choiceSection),
      datepicker: new CommonDatepicker(this.selectors.products.cruise.choiceSection),
    };

    return this._cruise;
  }

  /**
   * @returns {{ click: Function, departure: CommonDeparture, destination: FlightOnlyDestination, duration: CommonDuration, pax: CommonPax, datepicker: CommonDatepicker }}
   */
  get flightOnly() {
    if (!this._flightOnly) {
      this._flightOnly = {
        click: () => locateElementAndClickOnIt(this.selectors.products.flightOnly.home),
        departure: new CommonDeparture(this.selectors.products.flightOnly.choiceSection),
        destination: new FlightOnlyDestination(this.selectors.products.flightOnly.choiceSection),
        duration: new CommonDuration(this.selectors.products.flightOnly.choiceSection),
        pax: new CommonPax(this.selectors.products.flightOnly.choiceSection),
        datepicker: new CommonDatepicker(this.selectors.products.flightOnly.choiceSection),
      };
    }

    return this._flightOnly;
  }

  /**
   * @returns {{
   *     click: Function,
   *     destination: CommonDestination,
   *     pax: CommonPax,
   *     datepicker: CommonDatepicker
   * }}
   */
  get hotelOnly() {
    if (!this._hotelOnly) {
      this._hotelOnly = {
        click: () => {
          locateElementAndClickOnIt(this.selectors.products.hotelOnly.home);
        },
        destination: new CommonDestination(this.selectors.products.hotelOnly.choiceSection),
        pax: new CommonPax(this.selectors.products.hotelOnly.choiceSection),
        datepicker: new CommonDatepicker(this.selectors.products.hotelOnly.choiceSection),
      };
    }

    return this._hotelOnly;
  }

  /**
   * Gives access to search and its click and verify methods.
   *
   * @returns {{ click: (function()), verify: (function(string))}}
   */
  get search() {
    return {
      click: () => {
        const searchButtonID = browser.element(this.selectors.search.button).value.ELEMENT;
        browser.elementIdClick(searchButtonID);
      },

      verify: (oldUrl) => {
        browser.waitUntil(() => browser.url() !== oldUrl, 30000);
      },
    };
  }
}

/**
 * @type {_BookingStart}
 */
export const BookingStart = new _BookingStart();
