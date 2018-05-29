/*
 * Pageobject for hotel-page for independent
 */

class IndependentHotelBooking {
  constructor(home = '#hotelpage') {
    this.selectors = {
      home,

      hotel: {
        name: '.hotelpage-header__title-span',
        button: '#gtm-hotelpage-pricebutton',
      },
    };
  }

  /**
   * Number of milliseconds to wait to find the selector this.selectors.hotel.name.
   *
   * @param {number} [timeout=15000]
   * @memberof IndependentHotelBooking
   */
  waitForPageToLoad(timeout = 15000) {
    browser.element(this.selectors.hotel.name).waitForExist(timeout);
  }

  /**
   * Get name.
   *
   * @readonly
   * @memberof IndependentHotelBooking
   */
  get name() {
    return browser.getText(this.selectors.hotel.name);
  }

  /**
   * Button that takes the user to the pricematrix.
   *
   * @readonly
   * @returns {click: function}
   * @memberof IndependentHotelBooking
   */
  get placeBookingButton() {
    return {
      click: () => browser.element(this.selectors.hotel.button).click(),
    };
  }
}

export default new IndependentHotelBooking();
