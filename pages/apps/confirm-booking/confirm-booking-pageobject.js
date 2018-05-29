import Namecollection from '../namecollection/namecollection-pageobject.js';

/*
* Pageobject for the confirmation-page, the last page in a booking-flow
*/

class ConfirmBooking {
  constructor() {
    const confirmBooking = '#M1_C2_Main_i9c30007071_BookingConfirmForm';

    this.selectors = {
      home: `${confirmBooking}`,

      confirmSummary: {
        totalPrice: ':nth-child(4) .booking-confirm-total-price',
        iAcceptTerms: '#M1_C2_Main_i9c30007071_f1_InputField',
        confirmButton: '#M1_C2_Main_i9c30007071_btnConfirm',
      },

      bookingSummary: {
        passenger: {
          passengerOne: {
            name: '#booking-summary th:nth-child(2)',
            chosenBagage: '#booking-summary tbody tr:nth-child(3) td:nth-child(2)',
            bagagePrice: '#booking-summary tbody > tr:nth-child(10) > td:nth-child(2) div',
            charterBagagePrice: '#booking-summary tbody > tr:nth-child(14) > td:nth-child(2) div',
            chosenParking: '#booking-summary tbody tr:nth-child(1) td:nth-child(2)',
            charterParkingPrice: '#booking-summary tbody > tr:nth-child(18) > td:nth-child(2) div',
          },
          passengerTwo: {
            name: '#booking-summary th:nth-child(3)',
            chosenBagage: '#booking-summary tbody tr:nth-child(3) td:nth-child(3)',
            bagagePrice: '#booking-summary tbody > tr:nth-child(10) > td:nth-child(3) div',
            charterBagagePrice: '#booking-summary tbody > tr:nth-child(14) > td:nth-child(3) div',
            chosenParking: '#booking-summary tbody tr:nth-child(1) td:nth-child(3)',
            charterParkingPrice: '#booking-summary tbody > tr:nth-child(18) > td:nth-child(3) div',
          },
          passengerThree: {
            name: '#booking-summary th:nth-child(4)',
            chosenBagage: '#booking-summary tbody tr:nth-child(3) td:nth-child(4)',
            bagagePrice: '#booking-summary tbody > tr:nth-child(10) > td:nth-child(4) div',
            charterBagagePrice: '#booking-summary tbody > tr:nth-child(14) > td:nth-child(4) div',
            chosenParking: '#booking-summary tbody tr:nth-child(1) td:nth-child(4)',
            charterParkingPrice: '#booking-summary tbody > tr:nth-child(18) > td:nth-child(4) div',
          },
          passengerFour: {
            name: '#booking-summary th:nth-child(5)',
            chosenBagage: '#booking-summary tbody tr:nth-child(4) td:nth-child(5)',
            bagagePrice: '#booking-summary tbody > tr:nth-child(10) > td:nth-child(5) div',
            charterBagagePrice: '#booking-summary tbody > tr:nth-child(14) > td:nth-child(5) div',
            chosenParking: '#booking-summary tbody tr:nth-child(1) td:nth-child(5)',
            charterParkingPrice: '#booking-summary tbody > tr:nth-child(18) > td:nth-child(5) div',
          },
          passengerFive: {
            name: '#booking-summary th:nth-child(6)',
            chosenBagage: '#booking-summary tbody tr:nth-child(2) td:nth-child(6)',
            bagagePrice: '#booking-summary tbody > tr:nth-child(10) > td:nth-child(6) div',
            charterBagagePrice: '#booking-summary tbody > tr:nth-child(14) > td:nth-child(6) div',
            chosenParking: '#booking-summary tbody tr:nth-child(1) td:nth-child(6)',
            charterParkingPrice: '#booking-summary tbody > tr:nth-child(18) > td:nth-child(6) div',
          },
        },
      },

      submitArea: {
        iAcceptTerms: '#M1_C2_Main_i9c30007071_f2_InputField',
        totalPrice: '.booking-confirm-total-price',
        confirmButton: '#M1_C2_Main_i9c30007071_btnConfirm2',
      },
    };
  }

  waitForPageToLoad() {
    browser.waitForExist(this.selectors.home, 30000);
  }

  getRowNoForHeader(header) {
    const rows = $$('#booking-summary tbody tr');
    for (let i = 0; i < rows.length; i++) {
      if (rows[i].$$('th')[0].getText() === header) {
        return i + 1;
      }
    }
  }

  getSelectorForPassengerExtra(header, paxNo) {
    const rowNo = this.getRowNoForHeader(header);
    return `#booking-summary tbody > tr:nth-child(${rowNo}) > td:nth-child(${paxNo + 1})`;
  }

  getSelectorForPassengerPrice(header, paxNo) {
    return this.getSelectorForPassengerExtra(header, paxNo) + ' div';
  }

  get myChoices() {
    return {};
  }

  get steps() {
    return {};
  }

  get confirmSummary() {
    return {};
  }

  get bookingSummary() {
    return {};
  }

  get submitArea() {
    return {};
  }
}

export default new ConfirmBooking();
