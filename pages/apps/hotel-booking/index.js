/*
* Pageobject for hotelweb for charter
*/

class HotelBooking {
  constructor(home = '#hotelpage') {
    this.selectors = {
      home: home,
      oldHome: '.hotel-info-view',

      url: {
        old: '/charteraccomodationinfo',
        new: '/boka-resa-hotell',
      },

      hotel: {
        name: `${home} div.hotelpage-header > div.hotelpage-header__container > h1 > span.hotelpage-header__title-span`,

        // legacyButton: "div.form > div.submit-area > input']", //booking button in the 'old' price matrix

        // // button: '[id^="price-matrix"] a.button.primary' //the wildcard syntax is for matching the button for both CP and DP

        // charter:{

        //     priceMatrix: '#price-matrix-app-root',

        //     button: '[id^="price-matrix"] a.button.primary'

        // },

        // Independent:{

        //     priceMatrix: '#price-matrix',

        //     button: '[id^="price-matrix"] a.button.primary'

        // }
      },
      charterPriceMatrix: {
        button: `#price-matrix-app-root .price-summary__button-label--desktop`,
        selectedPrice: `#price-matrix-app-root .wdio-price--selected`,
      },
    };
  }

  /**
     * @param timeout {number} Number of milliseconds to wait to find the selector this.selectors.hotel.name
     */
  waitForPageToLoad(timeout = 30000) {
    const fifthFlightOffer = '.tcne-cf-flightoffers :nth-child(5) .wdio-day';
    const errorMessage = '.webui-message__header';

    if (browser.isExisting(errorMessage)) {
      const text = browser.getText(errorMessage);
      if (text === 'Tyvärr finns det inga tillgängliga resor på valt datum.') {
        browser.click(fifthFlightOffer);
        browser.pause(3000);
        CharterFlow.waitForPageToLoad();
        CharterFlow.waitUntilLoaded();
      }
    } else {
      browser.element(this.selectors.hotel.name).waitForExist(timeout);
    }
  }

  waitForPriceMatrixToLoad(timeout = 30000) {
    browser.scroll(this.selectors.charterPriceMatrix.button);
    browser.waitForExist(
      this.selectors.charterPriceMatrix.selectedPrice,
      timeout
    );
    browser.pause(2000);
  }

  gotoNameCollection() {
    browser.click(this.selectors.charterPriceMatrix.button);
  }

  get name() {
    if (!this._name) {
      this._name = browser
        .getAttribute(this.selectors.hotel.name, 'innerHTML')
        .trim()
        .replace(' &amp;', '&');
    }

    return this._name;
  }

  get placeBookingButton() {
    return {
      click: () => {
        return browser.click(this.selectors.hotel.button);
      },
    };
  }

  redirectToNewHotelPage() {
    if (browser.isExisting('div.hotel-tabs')) {
      browser.url(
        browser.getUrl().replace(this.selectors.url.old, this.selectors.url.new)
      );
    } else {
      console.log("Didn't find selector, must already be on hotelweb");
    }
  }
}

export default new HotelBooking();
