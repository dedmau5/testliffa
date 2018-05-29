import Charter from 'pages/booking/charter/index.js';

const timeout = 60000;
export function CanConfirmTheBooking(sharedData, Booking, Translations) {
  const testSummary = Math.random() < 0.5;
  let price;

  describe('Can confirm the booking', function() {
    it(`The "confirm booking" page loads within ${timeout /
      1000} s`, function() {
      Charter.steps.confirmBooking.waitForPage();
    });

    it('Total Price equals the Price seen under My Choice', function() {
      price = Charter.myChoices.travelInformation.price;
      expect(Charter.steps.confirmBooking.totalPrice).to.equal(
        price,
        'Price mismatch!'
      );
    });

    it('Price equals the Price seen on the previous page', function() {
      expect(price).to.equal(
        sharedData.price,
        'Prices between step 1 and step 2 mismatch!!!'
      );
    });

    it(`Can accept Ving's travel terms in the ${
      testSummary ? 'summary' : 'details'
    } view`, function() {
      Charter.steps.confirmBooking.checkboxes.terms.click();
    });

    it(`Can confirm the booking within ${timeout / 1000} s using the ${
      testSummary ? 'summary' : 'details'
    } confirm button`, function() {
      this.timeout(timeout);
      this.slow(timeout / 3);

      const button = Charter.steps.confirmBooking.buttons.confirm;
      button.click();

      // TODO: This is a dirty fix allowing the test to accept both the new and old thanks page during A/B test.
      // When the A/B test is over, this try/catch needs to be removed and the page object for the thanks page updated.
      let bookingNumber;
      try {
        bookingNumber = Charter.steps.confirmedBooking.bookingNumber;
        console.log('Reached the old thanks page.')
      } catch (error) {
        console.log('Reached the new thanks page.')
        bookingNumber = browser.getText('.thanks_panel__header_bookingnumber_number');
      }
      console.warn(`\nBooking number: ${bookingNumber}`);
      browser.options.tc.bookingNumber = bookingNumber;
    });
  });
}
