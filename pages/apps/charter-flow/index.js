import * as helpers from '../../../tools/elements';
import SelectedDeparture from './selectedDeparture';
import Hotel from './hotel';

/**
  * Pageobject for charterflow excluding hotellist. Hotellist-pageobject is found in hotel.js 
  * 
  * @class CharterFlow
  */
class CharterFlow {
  constructor(selector = '#charterflow') {
    const home = selector;

    this.selectors = {
      home: home,
      selectedDeparture: `${home} .wdio-selected-departure`,
      buttons: {
        previous: `${home} .wdio-previous-departures`,
        next: `${home} .wdio-next-departures`,
      },
      hotel: `${home} div.tcne-cf-hotel`,
      firstSelectButton: '.tcne-cf-hotel:nth-child(1) .webui-hotel-hit__footer-panel-button',
    };
  }

  /**
     * Move to previous departure prices
     */
  previous() {
    helpers.locateElementAndClickOnIt(this.selectors.buttons.previous);
    this._selectedDeparture = null;
  }

  /**
     * Move to later departure prices
     */
  next() {
    helpers.locateElementAndClickOnIt(this.selectors.buttons.next);
    this._selectedDeparture = null;
  }

  /**
     * Indexing all hotels for the select() in hotel.js
     * @returns {[Hotel]}
     */
  get hotels() {
    if (!this._hotels) {
      const result = helpers.getElements(this.selectors.hotel);
      this._hotels = Array.map(result, hotel => {
        return new Hotel(hotel);
      });
    }
    return this._hotels;
  }

  /**
     * Get the summary part of price matrix
     * @returns {SelectedDeparture}
     */
  get selectedDeparture() {
    if (!this._selectedDeparture) {
      this._selectedDeparture = new SelectedDeparture(
        this.selectors.selectedDeparture
      );
    }
    return this._selectedDeparture;
  }

  get hotelListLength() {
    return helpers.getElements(this.selectors.hotel).length;
  }

  clickOnFirstHotel() {
    browser.waitForExist(this.selectors.firstSelectButton, 45000);
    browser.click(this.selectors.firstSelectButton);
  }

  waitUntilLoaded() {
    browser.waitForExist(this.selectors.hotel, 45000);
  }

  waitForPageToLoad() {
    browser.waitForExist(this.selectors.home, 45000);
  }
  // Remove if case when A/B test for departure list is over.
  verifyAirline(airline) {
    let flightCompany;
    if (browser.isVisible('.tcne-cf-flight-details__flex-flight-company')) {
      console.log('reached the new departure list');
      flightCompany = '.tcne-cf-flight-details__flex-flight-company';
    } else {
      console.log('Reached the old departure list');
      flightCompany = '.departure-flight';
    }
    let flightArray = browser.getText(flightCompany);
    let i = 2;
    while (flightArray[0] !== airline || flightArray[1] !== airline) {
      browser.click(`.tcne-cf-flightoffers a:nth-child(${i})`);
      this.waitUntilLoaded();
      flightArray = browser.getText(flightCompany);
      i += 1;
    }
    browser.pause(5000);
  }
}


//const charterflow = new CharterFlow();
/**
 * @type {CharterFlow}
 */
export default new CharterFlow();
