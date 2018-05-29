import Namecollection from '../namecollection/namecollection-pageobject.js';

/*
* Pageobject for the supplements-page
*/

class Supplements {
  constructor() {
    const supplements = '#M1_C2_Main_i9c30014850';

    this.selectors = {
      home: `${supplements}`,

      supplements: {
        seating: {},

        rental: {},

        greenfee: {},

        parking: {},

        specialBagage: {},

        wheelchair: {},
      },

      togglePanel: '.booking-step-extra-item-header-text',
      extraHeader: '.gex .header-text',
      checkbox: 'input[type=checkbox]',
      checked: '.input[type=checkbox]:checked',
      selectedPrice: 'td.price-sum',
      extrasPrice: 'div.booking-step-extra-item-input td:nth-child(2)',
      totalPrice: '.booking-step-extra-item-price-summary-price-span',

      leftMenu: {
        gexSummary: '.extra-summary',
        gexLabel: '#gex-extras-summary-inject .e.e-1 label',
        gexPrice: '#gex-extras-summary-inject .price',
        gexRemoveLink: '.extra-summary .e-2 a',
        totalPrice: '.e.extra-price-summary',
      },

      submitArea: {
        details: {
          flightText: '#M1_C2_Main_i14c30014696_Group1 > div.e.e-1 > span',
          flightAmount: '#M1_C2_Main_i14c30014696_Group1 > div.e.e-2',
          mealOnFlightText: '#M1_C2_Main_i14c30014696_PriceSummaryBookedSuppsListView_bookedSuppsGroup_1 > div.e.e-1',
          mealOnFlightAmount: '#M1_C2_Main_i14c30014696_PriceSummaryBookedSuppsListView_bookedSuppsGroup_1 > div.e.e-2',
          transportText: '',
          transportAmount: '',
          cancellationInsuranceText: '',
          cancellationInsuranceAmount: '',
          tripInsuranceText: '',
          tripInsuranceAmount: '',
          legacyBagageText: '#M1_C2_Main_i14c30014696_PriceSummaryBookedSuppsListView_bookedSuppsGroup_0 > div.e.e-1',
          legacyBagageAmount: '#M1_C2_Main_i14c30014696_PriceSummaryBookedSuppsListView_bookedSuppsGroup_0 > div.e.e-2',
          bagageText: '#gex-extras-details-inject > div > div.e.e-1',
          bagageAmount: '#gex-extras-details-inject > div > div.e.e-2',
          parkingText: '#gex-extras-details-inject .e-1',
          parkingAmount: '#gex-extras-details-inject .e-2',
        },
        totalPrice: '#M1_C2_Main_i14c30014696_spnTotalPrice',
        browserBackButton: '#M1_C2_Main_i14c30014696_btnNavigateBackBottom',
        continueButton: '#M1_C2_Main_i14c30014696_btnNavigateNextBottom',
      },
    };
  }

  waitForPageToLoad() {
    browser.waitForExist(this.selectors.home, 30000);
  }

  get myChoices() {
    return {
      clickOnTimeTableLink: () => Namecollection._clickOnTimeTableLink(),
      viewAirlineForOutboundTrip: () =>
        Namecollection._viewAirlineForOutboundTrip(),
      viewAirlineForHomeboundTrip: () =>
        Namecollection._viewAirlineForHomeboundTrip(),
      viewPrice: () => Namecollection._viewPrice(),
    };
  }

  get steps() {
    return {
      // reserved for actions in steps-container
    };
  }

  get supplements() {
    return {};
  }

  get submitArea() {
    return {};
  }
}

export default new Supplements();
