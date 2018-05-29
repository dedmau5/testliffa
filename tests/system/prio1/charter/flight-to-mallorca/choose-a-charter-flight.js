import CharterFlights from '../../../../../pages/apps/charter-flights';

const timeout = 30000;
let flights, flight;

export function ChooseACharterFlight() {
  describe('Choose a Charter Flight', function() {
    it('Wait for flight page', function() {
      CharterFlights.waitForPageToLoad();
    });

    it(`There is at least one flight available within ${timeout /
      1000} s`, function() {
      this.timeout(timeout);
      this.slow(timeout / 3);

      browser.waitUntil(function() {
        flights = CharterFlights.flights;
        return flights.oneWeek.length > 0;
      }, timeout);
    });

    it(`Can choose a random 1 week flight`, function() {
      flight =
        flights.oneWeek[Math.floor(Math.random() * flights.oneWeek.length)];

      expect(flight).to.not.be.undefined;

      flight.radioButton.click();
    });

    it(`Can choose the flight`, function() {
      CharterFlights.bookAFlight.click();
    });
  });
}
