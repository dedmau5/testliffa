/*
* Pageobject for the generic-extras app found on namecollection, mypages and soon also in the supplements-page
*/

class GenericExtras {
  constructor() {
    this.selectors = {
      home: '#GexApp',

      app: {
        header: '.extra-group-header span',
        priceInfo: '.extra-group-header-price-info',
        passengers: {
          passengerOne: {
            nameHeader: 'div:nth-child(1) > span:nth-child(1)',
            options: '.extra-details-box div:nth-child(1) select',
          },

          passengerTwo: {
            nameHeader: 'div:nth-child(2) > span:nth-child(1)',
            options: '.extra-details-box > div > div:nth-child(2) select',
          },

          passengerThree: {
            nameHeader: 'div:nth-child(3):not(.extra-group-price-summary) > span:nth-child(1)',
            options: '.extra-details-box div:nth-child(3) select',
          },

          passengerFour: {
            nameHeader: 'div:nth-child(4) > span:nth-child(1)',
            options: '.extra-details-box div:nth-child(4) select',
          },

          passengerFive: {
            nameHeader: 'div:nth-child(5) > span:nth-child(1)',
            options: '.extra-details-box div:nth-child(5) select',
          },

          passengerSix: {
            nameHeader: 'div:nth-child(6) > span:nth-child(1)',
            options: '.extra-details-box div:nth-child(6) select',
          },
        },
        sameExtrasForAll: '.same-extra-selection-checkbox',
        priceSummary: '.price span',
        infoHeader: '.extra-group-info-text h3',
        infoText: '.extra-group-info-text p',
        url: '.extra-group-info-text a',
      },
    };
  }

  getPassengerBaggagePrice(group, paxNo) {
    const selectedBaggage = browser.getText(
      group + '.extra-choice:nth-child(' + paxNo + ') .custom-select'
    );
    return selectedBaggage.split(' ').slice(-1)[0];
  }

  waitForPageToLoad() {
    browser.waitForExist(this.selectors.home, 30000);
  }

  get dropDowns() {
    return {
      waitForPageToLoad: () => this._waitForPageToLoad(),
    };
  }
}

export default new GenericExtras();
