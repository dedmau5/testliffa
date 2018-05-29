import Page from '../../../pages/page';
import BookingStart from '../../../pages/apps/booking-start-horizontal';

describe('Bookingstart new', () => {
  describe('Start page is open', () => {
    it('Start page is open', () => {
      Page.goTo('http://bookingstart-horizontal.acctest.int/bs-app');
    });

    it('Waits until Booking Start is found', () => {
      BookingStart.waitUntilFound();
    });

    it('Can click on "Flight & Hotel"', () => {
      BookingStart.package.select();
    });

    it('Can load data into Booking Start section', () => {
      BookingStart.waitUntilLoaded();
    });

    it('Can click on destination', () => {
      const { destination } = BookingStart.package;
      destination.quickSelect('Mallorca');
    });

    it('Can click on duration', () => {
      const { duration } = BookingStart.package;
      duration.independent.select('Valfri reslängd');
    });

    it('Can click on departure', () => {
      const { pax } = BookingStart.package;
      pax.open();
      browser.pause(4000);
    });
  });
});
