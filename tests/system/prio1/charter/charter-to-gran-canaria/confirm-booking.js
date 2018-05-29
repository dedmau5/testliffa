import CharterBooking from '../../../../../pages/booking/charter';
import { CharterTranslations } from '../../../../../localization/booking/charter';

const timeout = 120000;

export function ConfirmBooking(sharedData) {
  describe('Can Confirm the Booking', function() {
    it(`The "confirm booking" page loads within ${timeout /
      1000} s`, function() {
      this.timeout(timeout);
      this.slow(timeout / 2);
      CharterBooking.steps.confirmBooking.waitForPage();
    });

    it('Total Price equals the Price seen under My Choice', function() {
      expect(CharterBooking.steps.confirmBooking.totalPrice).to.equal(
        CharterBooking.myChoices.travelInformation.price,
        'Price mismatch!'
      );
    });

    it('Price equals the Price seen on the previous page', function() {
      console.log('extrasTotal2', sharedData.extrasTotalPrice);
      expect(CharterBooking.steps.confirmBooking.totalPrice).to.equal(
        sharedData.extrasTotalPrice,
        "The Total Price shown in the Extras view doesn't match the one shown in the Confirm view!"
      );
    });

    it(`Can accept Ving's travel terms`, function() {
      expect(
        CharterBooking.steps.confirmBooking.checkboxes.terms.isChecked()
      ).to.equal(
        false,
        "The travel terms checkbox shouldn't have been checked!"
      );

      CharterBooking.steps.confirmBooking.checkboxes.terms.click();

      expect(
        CharterBooking.steps.confirmBooking.checkboxes.terms.isChecked()
      ).to.equal(true, 'The travel terms checkbox should have been checked!');
    });

    it(`Can confirm the booking within ${timeout /
      1000} s using the confirm button`, function() {
      this.timeout(timeout);
      this.slow(timeout / 2);
      CharterBooking.steps.confirmBooking.buttons.confirm.click();

      const headingLabel = CharterBooking.steps.confirmedBooking.waitForPage();

      expect(headingLabel).to.be.oneOf([
        CharterTranslations.steps.confirmedBooking.heading,
        CharterTranslations.steps.confirmedBooking.choosePaymentMethodHeading,
        CharterTranslations.steps.confirmedBooking.thanks,
      ]);

      if (headingLabel === CharterTranslations.steps.confirmedBooking.heading) {
        const bookingNumber =
          CharterBooking.steps.confirmedBooking.bookingNumber;
        console.warn(`\nBooking number: ${bookingNumber}`);
        browser.options.tc.bookingNumber = bookingNumber;
      }
    });
  });
}
