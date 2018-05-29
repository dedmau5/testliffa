const chalk = require('chalk');
const log = console.log;

import CharterBooking from '../../../../../pages/booking/charter';

const extras = CharterBooking.steps.extras;

/**
 * @param seats {Array}
 * @param numberOfSeats {number}
 * @returns {Array}
 */
function getRightMostSeats(seats, numberOfSeats) {
  return seats.slice(seats.length - numberOfSeats);
}

/**
 * @param seats {Array}
 * @param numberOfSeats {number}
 */
function selectSeats(seats, numberOfSeats) {
  let selectedSeats = 0;

  for (let row of seats.reverse()) {
    for (let seatGroup of row) {
      if (seatGroup.length >= numberOfSeats) {
        for (let seat of getRightMostSeats(seatGroup, numberOfSeats)) {
          seat.scrollTo();
          seat.select();
          log(
            `Selected seat, left: ${chalk.bold(seat.left)}, top: ${chalk.bold(
              seat.top
            )}`
          );
          selectedSeats++;
        }
        return selectedSeats == numberOfSeats;
      }
    }
  }

  return false;
}

/**
 * @param run {boolean}
 * @param sharedData {Object}
 */
export function WaitForSeatingButtonsToAppear(run, sharedData) {
  it('Wait for seating buttons to appear', function() {
    if (!run) {
      this.skip();
    }

    extras.seating.departure.waitForExists();
    extras.seating.return.waitForExists();

    sharedData.seating = {
      priceBeforeChoosingSeats: CharterBooking.steps.extras.priceOfSeating,
    };

    log(chalk.underline.cyan('\nSeating'));
  });
}

/**
 * @param seatingType {"departure"|"return"}
 * @param run {boolean}
 * @param adults=2 {number}
 * @param children=0 {number}
 */
export function CanChooseSeatingFor(
  seatingType,
  run,
  adults = 2,
  children = 0
) {
  it(`Can choose seating for ${seatingType}`, function() {
    if (!run) {
      this.skip();
    }

    browser.pause(5000);
    extras.seating[seatingType].button.click();
    extras.seating.exit.waitForExists();
    extras.seating.spinner.waitForExists();
    extras.seating.spinner.waitUntilItDisappears();
    extras.seating.aircraft[seatingType].waitForExists();

    log(`${chalk.bold(seatingType.toUpperCase())}`);

    if (adults > 0) {
      browser.pause(3000); // Wait 2 seconds to let the scroll effect settle.
      const seats = extras.seats[seatingType]({
        filter: 'adults',
        properties: 'empty',
        limit: 30,
      });

      expect(seats.length).to.be.at.least(1);
      expect(selectSeats(seats, adults)).to.be.equal(true);
    }

    if (children > 0) {
      throw new Error('Not implemented!');
    }

    if (adults > 0 || children > 0) {
      extras.seating.confirmSeats();
      extras.seating.spinner.waitForExists();
      extras.seating.spinner.waitUntilItDisappears();

      let fails = 0;
      while (browser.isExisting('.us-modal') && fails < 10) {
        fails++;
        browser.click('.us-modal .close');
        const reverseSeats = extras.seats[seatingType]({
          filter: 'adults',
          properties: 'empty',
          limit: 30,
        }).reverse();
        selectSeats(reverseSeats, adults);
        extras.seating.confirmSeats();
        extras.seating.spinner.waitForExists();
        extras.seating.spinner.waitUntilItDisappears();
      }
      expect(browser.isExisting('.us-modal')).to.be.equal(
        false,
        'Invalid seats selected!'
      );
    }

    extras.seating.aircraft[seatingType].waitForExists(false);
  });
}

/**
 * @param sharedData
 * @param options {Object}
 * @param options.seating {Object}
 * @param options.seating.enable {boolean}
 * @param options.seating.adults {number}
 * @param options.seating.children {number}
 */
export function HandleExtras(
  sharedData,
  options = { seating: { enable: false, adults: 2, children: 0 } }
) {
  describe('Extras', function() {
    const enable = options.seating.enable,
      adults = options.seating.adults,
      children = options.seating.children;

    WaitForSeatingButtonsToAppear(enable, sharedData);
    CanChooseSeatingFor('departure', enable, adults, children);
    CanChooseSeatingFor('return', enable, adults, children);

    it('Total price matches the previous page', function() {
      if (enable) {
        const totalPriceInNameCollectionPlusSeating =
          sharedData.totalPriceInNameCollectionView +
          CharterBooking.steps.extras.priceOfSeating;

        expect(CharterBooking.steps.extras.totalPrice).to.equal(
          totalPriceInNameCollectionPlusSeating,
          "The total price shown in the current view, excluding the costs of seating, doesn't match " +
            'the one shown in the previous view!'
        );

        sharedData.extrasTotalPrice = CharterBooking.steps.extras.totalPrice;
      } else {
        expect(CharterBooking.steps.extras.totalPrice).to.equal(
          sharedData.totalPriceInNameCollectionView,
          "The total price shown in the current view doesn't match the one shown in the previous view!"
        );
        sharedData.extrasTotalPrice = CharterBooking.steps.extras.totalPrice;
      }
      sharedData.price = sharedData.extrasTotalPrice;
    });

    it('Can continue to the confirmation page', function() {
      CharterBooking.steps.extras.buttons.continue.click();
    });
  });
}
