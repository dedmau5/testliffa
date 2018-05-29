import moment from 'moment';

import { StartPage } from '../../../pages/start-page.js';
import { BookingStart } from '../../../pages/apps/booking-start/index.js';
import CharterFlights from '../../../pages/apps/charter-flights/index.js';
import Namecollection
  from '../../../pages/apps/namecollection/namecollection-pageobject.js';
import GenericExtras
  from '../../../pages/apps/generic-extras/generic-extras-pageobject.js';
import Supplements
  from '../../../pages/apps/supplements/supplements-pageobject.js';
import ConfirmBooking
  from '../../../pages/apps/confirm-booking/confirm-booking-pageobject.js';

describe('Preparing steps', function() {
  const departureDate = moment(new Date()).add(4, 'months');
  const BAGAGE_CLASS = '.a5c5563d-e686-419d-8065-80a8150263e0 ';

  before(function() {
    StartPage.open();
    BookingStart.waitUntilLoaded();
    BookingStart.waitUntilDataLoaded();
    BookingStart.flightOnly.click();
    BookingStart.flightOnly.departure.open();
    BookingStart.flightOnly.departure.select('Stockholm-Arlanda');
    BookingStart.flightOnly.destination.open();
    BookingStart.flightOnly.destination.country.toggle('Spanien');
    BookingStart.flightOnly.destination.area.toggle('Gran Canaria');
    BookingStart.flightOnly.duration.open();
    BookingStart.flightOnly.duration.select(2);
    BookingStart.flightOnly.datepicker.open();
    BookingStart.flightOnly.datepicker.selectDate(
      departureDate.year(),
      departureDate.month(),
      departureDate.date(),
      true,
      6
    );
    BookingStart.flightOnly.pax.open();
    BookingStart.flightOnly.pax.setAdults(2);
    BookingStart.flightOnly.pax.setChildren(3);
    BookingStart.flightOnly.pax.child(1).age(3);
    BookingStart.flightOnly.pax.child(2).age(1);
    BookingStart.flightOnly.pax.child(3).age(0);
    BookingStart.flightOnly.pax.confirm();
    BookingStart.search.click();
    CharterFlights.waitForPageToLoad();
    CharterFlights.bookAFlight.click();
    Namecollection.waitForPageToLoad();
  });

  describe('Generic Extras: Luggage - FlightOnly', function() {
    const state = {}; // used for variables spread over different files/tests

    describe('Checks that all elements exists', function() {
      it('Should wait for generic extras to load on namecollection-page', function() {
        GenericExtras.waitForPageToLoad();
      });

      it('Should have a header', function() {
        expect(browser.isExisting(GenericExtras.selectors.app.header)).to.be
          .true;
      });

      it('Should have priceInfo', function() {
        expect(browser.isExisting(GenericExtras.selectors.app.priceInfo)).to.be
          .true;
      });

      it('Should have text for firstPassenger', function() {
        expect(
          browser.isExisting(
            GenericExtras.selectors.app.passengers.passengerOne.nameHeader
          )
        ).to.be.true;
      });

      it('Should have a checkbox for the choice of "same extras for all pax"', function() {
        expect(browser.isExisting(GenericExtras.selectors.app.sameExtrasForAll))
          .to.be.true;
      });

      it('Should have a price summary ', function() {
        expect(browser.isExisting(GenericExtras.selectors.app.priceSummary)).to
          .be.true;
      });

      it('Should have info-header ', function() {
        expect(browser.isExisting(GenericExtras.selectors.app.infoHeader)).to.be
          .true;
      });

      it('Should have info-text', function() {
        expect(browser.isExisting(GenericExtras.selectors.app.infoText)).to.be
          .true;
      });

      it('Should have info-url ', function() {
        expect(browser.isExisting(GenericExtras.selectors.app.url)).to.be.true;
      });
    });

    describe('Checks functionality on the namecollection page', function() {
      it('Should update passengernames when namecollection-form is filled', function() {
        const passengerBeforeFormsAreFilled = browser.getText(
          GenericExtras.selectors.app.passengers.passengerOne.nameHeader
        );
        Namecollection.passengerInformation.setPassengerInformationByIndex(
          1,
          'Stefan',
          'Franzén',
          'adult',
          '840618',
          'Male'
        );
        expect(
          browser.getText(
            GenericExtras.selectors.app.passengers.passengerOne.nameHeader
          )
        ).not.equal(passengerBeforeFormsAreFilled);

        expect(
          browser.getText(
            GenericExtras.selectors.app.passengers.passengerOne.nameHeader
          )
        ).to.equal('Stefan Franzén');

        Namecollection.passengerInformation.setPassengerInformationByIndex(
          3,
          'Karin',
          'Franzén',
          'adult',
          '871117',
          'Female'
        );

        expect(
          browser.getText(
            GenericExtras.selectors.app.passengers.passengerTwo.nameHeader
          )
        ).to.equal('Karin Franzén');

        Namecollection.passengerInformation.setPassengerInformationByIndex(
          5,
          'Stella',
          'Franzén',
          'kid',
          '141104'
        );

        expect(
          browser.getText(
            GenericExtras.selectors.app.passengers.passengerThree.nameHeader
          )
        ).to.equal('Stella Franzén (3 år)');

        Namecollection.passengerInformation.setPassengerInformationByIndex(
          2,
          'Dylan',
          'Franzén',
          'kid',
          '161219'
        );

        expect(
          browser.getText(
            GenericExtras.selectors.app.passengers.passengerFour.nameHeader
          )
        ).to.equal('Dylan Franzén (1 år)');

        Namecollection.passengerInformation.setPassengerInformationByIndex(
          4,
          'London',
          'Franzén',
          'kid',
          '170815'
        );

        expect(
          browser.getText(
            GenericExtras.selectors.app.passengers.passengerFive.nameHeader
          )
        ).to.equal('London Franzén (1 år)');
      });

      it('Should remember price-per-adult in gex priceInfo', function() {
        state.initialPriceInfoInGenericExtras = browser.getText(
          GenericExtras.selectors.app.priceInfo
        );
      });

      it('Should remember price-summary in submitArea before next changes to it', function() {
        state.initialTotalPriceInGenericExtras = browser.getText(
          GenericExtras.selectors.app.priceSummary
        );
      });

      it('Should remember price-summary in myChoices before next changes to it', function() {
        state.initialTotalPriceInMychoices = browser.getText(
          Namecollection.selectors.myChoices.totalPrice
        );
      });

      it('Should remember price-summary in submitArea before next changes to it', function() {
        state.initialTotalPriceInSubmitArea = browser.getText(
          Namecollection.selectors.submitArea.totalPrice
        );
      });

      it('Should be able to choose bagage for adult one', function() {
        browser.selectByIndex(
          BAGAGE_CLASS +
            GenericExtras.selectors.app.passengers.passengerOne.options,
          2
        );
      });

      it('Should have a updated GenericExtras price-summary after adding passengers bagage-choices', function() {
        expect(state.initialTotalPriceInGenericExtras).to.not.be.equal(
          browser.getText(
            BAGAGE_CLASS + GenericExtras.selectors.app.priceSummary
          )
        );
      });

      it('Should have a updated MyChoices price-summary after adding passengers bagage-choices', function() {
        expect(state.initialTotalPriceInMychoices).to.not.be.equal(
          browser.getText(Namecollection.selectors.myChoices.totalPrice)
        );
      });

      it('Should have a updated SubmitArea price-summary after adding passengers bagage-choices', function() {
        expect(state.initialTotalPriceInSubmitArea).to.not.be.equal(
          browser.getText(Namecollection.selectors.submitArea.totalPrice)
        );
      });

      it('Should update bagage info for adult two with checkbox for "same extras.."', function() {
        browser.click(GenericExtras.selectors.app.sameExtrasForAll);
        const paxOneOptions =
          BAGAGE_CLASS +
          GenericExtras.selectors.app.passengers.passengerOne.options;
        const paxTwoOptions =
          BAGAGE_CLASS +
          GenericExtras.selectors.app.passengers.passengerTwo.options;
        expect($(paxOneOptions).getValue()).to.be.equal(
          $(paxTwoOptions).getValue()
        );
      });

      it('Should have a updated GenericExtras price-summary after adding passengers bagage-choices', function() {
        expect(state.initialTotalPriceInGenericExtras).to.not.be.equal(
          browser.getText(GenericExtras.selectors.app.priceSummary)
        );
      });

      it('Should have a updated MyChoices price-summary after adding passengers bagage-choices', function() {
        expect(state.initialTotalPriceInMychoices).to.not.be.equal(
          browser.getText(Namecollection.selectors.myChoices.totalPrice)
        );
      });

      it('Should have a updated SubmitArea price-summary after adding passengers bagage-choices', function() {
        expect(state.initialTotalPriceInSubmitArea).to.not.be.equal(
          browser.getText(Namecollection.selectors.submitArea.totalPrice)
        );
      });

      it('Should deactivate the checkbox for "same extras" by editing choice for adult two', function() {
        browser.click(GenericExtras.selectors.app.sameExtrasForAll);
      });

      it('Should reset choice of passenger two', function() {
        state.preSavedTotalPriceInGenericExtras = browser.getText(
          GenericExtras.selectors.app.priceSummary
        );
        state.preSavedTotalPriceInMychoices = browser.getText(
          Namecollection.selectors.myChoices.totalPrice
        );
        state.preSavedTotalPriceInSubmitArea = browser.getText(
          Namecollection.selectors.submitArea.totalPrice
        );

        browser.selectByIndex(
          BAGAGE_CLASS +
            GenericExtras.selectors.app.passengers.passengerTwo.options,
          1
        );
        browser.selectByIndex(
          BAGAGE_CLASS +
            GenericExtras.selectors.app.passengers.passengerThree.options,
          1
        );

        expect(state.preSavedTotalPriceInGenericExtras).to.not.equal(
          browser.getText(GenericExtras.selectors.app.priceSummary)
        );
      });

      it('Should have a updated SubmitArea price-summary after adding passengers bagage-choices', function() {
        browser.selectByIndex(
          BAGAGE_CLASS +
            GenericExtras.selectors.app.passengers.passengerTwo.options,
          1
        );

        state.preSavedTotalPriceInGenericExtras =
          GenericExtras.selectors.app.priceSummary;
        state.preSavedTotalPriceInMychoices =
          Namecollection.selectors.myChoices.totalPrice;
        state.preSavedTotalPriceInSubmitArea =
          Namecollection.selectors.submitArea.totalPrice;
      });

      it('Should be able to choose bagage for adult two', function() {
        state.preSavedTotalPriceInGenericExtras =
          GenericExtras.selectors.app.priceSummary;
        state.preSavedTotalPriceInMychoices =
          Namecollection.selectors.myChoices.totalPrice;
        state.preSavedTotalPriceInSubmitArea =
          Namecollection.selectors.submitArea.totalPrice;

        browser.selectByIndex(
          BAGAGE_CLASS +
            GenericExtras.selectors.app.passengers.passengerTwo.options,
          2
        );
      });

      it('Should have a updated GenericExtras price-summary after adding passengers bagage-choices', function() {
        expect(state.preSavedTotalPriceInGenericExtras).to.not.be.equal(
          browser.getText(GenericExtras.selectors.app.priceSummary)
        );
      });

      it('Should have a updated MyChoices price-summary after adding passengers bagage-choices', function() {
        expect(state.preSavedTotalPriceInMychoices).to.not.be.equal(
          browser.getText(Namecollection.selectors.myChoices.totalPrice)
        );
      });

      it('Should have a updated SubmitArea price-summary after adding passengers bagage-choices', function() {
        expect(state.preSavedTotalPriceInSubmitArea).to.not.be.equal(
          browser.getText(Namecollection.selectors.submitArea.totalPrice)
        );
      });

      it('Should be able to choose bagage for youth (3 years old)', function() {
        state.preSavedTotalPriceInGenericExtras =
          GenericExtras.selectors.app.priceSummary;
        state.preSavedTotalPriceInMychoices =
          Namecollection.selectors.myChoices.totalPrice;
        state.preSavedTotalPriceInSubmitArea =
          Namecollection.selectors.submitArea.totalPrice;

        browser.selectByIndex(
          BAGAGE_CLASS +
            GenericExtras.selectors.app.passengers.passengerThree.options,
          2
        );
      });

      it('Should be able to choose bagage for child', function() {
        browser.selectByIndex(
          BAGAGE_CLASS +
            GenericExtras.selectors.app.passengers.passengerFour.options,
          2
        );
      });

      it('Should be able to choose bagage for infant', function() {
        browser.selectByIndex(
          BAGAGE_CLASS +
            GenericExtras.selectors.app.passengers.passengerFive.options,
          1
        );
      });

      it('Should have a updated GenericExtras price-summary after adding passengers bagage-choices', function() {
        expect(state.preSavedTotalPriceInGenericExtras).to.not.be.equal(
          browser.getText(GenericExtras.selectors.app.priceSummary)
        );
      });

      it('Should have a updated MyChoices price-summary after adding passengers bagage-choices', function() {
        expect(state.preSavedTotalPriceInMychoices).to.not.be.equal(
          browser.getText(Namecollection.selectors.myChoices.totalPrice)
        );
      });

      it('Should have a updated SubmitArea price-summary after adding passengers bagage-choices', function() {
        expect(state.preSavedTotalPriceInSubmitArea).to.not.be.equal(
          browser.getText(Namecollection.selectors.submitArea.totalPrice)
        );
      });

      it('Should be able to click and follow the bagage info-url', function() {
        browser.click(GenericExtras.selectors.app.url);
        const tabIds = browser.getTabIds();
        browser.switchTab(tabIds[1]);

        // selector for the popup
        //browser.waitForExist('.nanorep-header', 15000);

        browser.waitUntil(() => {
          // nanorep
          if (browser.isExisting('.nanorep-header')) {
            return true;
          }

          // https://www.ving.se/faqarticle/hur-mycket-bagage-far-jag-ta-med-mig
          if (browser.isExisting('div > div > div.e.e-2 > h1')) {
            return true;
          }

          return false;
        }, 15000);

        browser.close();
      });
    });

    describe('Fills in remaining fields on the namecollection-page in order to proceeed', function() {
      describe('Fills into forms for mealsOnTheFlight', function() {
        it('Should choose option 1 for first passenger', function() {
          browser.selectByIndex(
            Namecollection.selectors.supplements.mealOnFlight.passengers
              .firstPassenger.options,
            1
          );
        });

        it('Should click the sameExtrasForAll checkbox', function() {
          browser.click(
            Namecollection.selectors.supplements.mealOnFlight.sameExtrasForAll
          );
        });

        it('Should choose option 1 for fourth passenger', function() {
          browser.selectByIndex(
            Namecollection.selectors.supplements.mealOnFlight.passengers
              .fourthPassenger.options,
            1
          );
        });

        it('Should choose option 1 for fifth passenger', function() {
          browser.selectByIndex(
            Namecollection.selectors.supplements.mealOnFlight.passengers
              .fifthPassenger.options,
            1
          );
        });
      });

      describe('Fills into forms for airportTransport', function() {
        it('Should choose NO to airportTransport supplement', function() {
          browser.click(
            Namecollection.selectors.supplements.airportTransport.openDropDown
          );
          browser.click(
            Namecollection.selectors.supplements.airportTransport
              .dropDownOptionNo
          );
        });
      });

      describe('Fills into forms for cancellationInsurance', function() {
        it('Should choose NO to cancellationInsurance supplement', function() {
          browser.click(
            Namecollection.selectors.supplements.cancellationInsurance
              .openDropDown
          );
          browser.click(
            Namecollection.selectors.supplements.cancellationInsurance
              .dropDownOptionNo
          );
        });
      });

      describe('Fills into forms for tripInsurance', function() {
        it('Should choose NO to tripInsurance supplement', function() {
          browser.click(
            Namecollection.selectors.supplements.tripInsurance.openDropDown
          );
          browser.click(
            Namecollection.selectors.supplements.tripInsurance.dropDownOptionNo
          );
        });
      });

      describe('Fills into forms for address-information of main passenger', function() {
        it('Should fill in address', function() {
          browser.setValue(
            Namecollection.selectors.travelInfo.address,
            'Rålambsvägen 17'
          );
          browser.setValue(
            Namecollection.selectors.travelInfo.zipCode,
            '12345'
          );
          browser.setValue(
            Namecollection.selectors.travelInfo.place,
            'Stockholm'
          );
          browser.setValue(
            Namecollection.selectors.travelInfo.cellPhone,
            '+46704445566'
          );
          browser.setValue(
            Namecollection.selectors.travelInfo.email,
            'stefan.jansson@thomascook.se'
          );
          browser.setValue(
            Namecollection.selectors.travelInfo.confirmEmail,
            'stefan.jansson@thomascook.se'
          );
        });
      });

      describe('Saves data to compare with on supplements-page and confirm-booking', function() {
        it('Should remember submitArea-totalPrice to compare with on supplement-page and confirmPage', function() {
          state.nameCollectionSubmitAreaTotalPrice = browser.getText(
            Namecollection.selectors.submitArea.totalPrice
          );
        });

        it('Should remember submitArea-bagagePrice to compare with on supplement-page and confirmPage', function() {
          state.nameCollectionSubmitAreaBagagePrice = browser.getText(
            Namecollection.selectors.submitArea.details.bagageAmount
          );
        });

        it('Should remember passenger-baggagePrice to compare with on supplement-page and confirmPage', function() {
          state.passengerBaggagePrice = [];
          for (var i = 1; i < 6; i++) {
            state.passengerBaggagePrice.push(
              GenericExtras.getPassengerBaggagePrice(BAGAGE_CLASS, i)
            );
          }
        });
      });

      describe('Proceed to supplements-page', function() {
        it('Should click on continue-button on namecollection-page', function() {
          browser.click(Namecollection.selectors.submitArea.continueButton);
          browser.waitForExist(
            Supplements.selectors.submitArea.totalPrice,
            30000
          );
        });
      });
    });

    describe('Checks functionality on the supplements-page', function() {
      it('Should have same totalPrice-value as the namecollection-page displayed', function() {
        expect(
          browser.getText(Supplements.selectors.submitArea.totalPrice)
        ).to.equal(state.nameCollectionSubmitAreaTotalPrice);
      });

      it('Should have same bagage-price as the namecollection-page displayed', function() {
        expect(
          browser.getText(
            Supplements.selectors.submitArea.details.legacyBagageAmount
          )
        ).to.equal(state.nameCollectionSubmitAreaBagagePrice);
      });

      it('Should proceed to confirm-booking', function() {
        browser.click(Supplements.selectors.submitArea.continueButton);
        ConfirmBooking.waitForPageToLoad();
      });
    });

    describe('Checks functionality on the confirmation-page', function() {
      it('Should have same totalPrice-value as the namecollection-page and supplements-page displayed', function() {
        expect(
          browser.getText(ConfirmBooking.selectors.submitArea.totalPrice)[0]
        ).to.equal('Totalpris: ' + state.nameCollectionSubmitAreaTotalPrice);
      });

      it('Should have correct Yes/No value if bagage was chosen or not on all passengers', function() {
        expect(
          browser.getText(
            ConfirmBooking.getSelectorForPassengerExtra(
              '19 kg + handbagage 6 kg ToR',
              1
            )
          )
        ).to.equal('Ja');
        expect(
          browser.getText(
            ConfirmBooking.getSelectorForPassengerExtra(
              '19 kg + handbagage 6 kg ToR',
              2
            )
          )
        ).to.equal('Ja');
        expect(
          browser.getText(
            ConfirmBooking.getSelectorForPassengerExtra(
              '19 kg + handbagage 6 kg ToR',
              3
            )
          )
        ).to.equal('Ja');

        expect(
          browser.getText(
            ConfirmBooking.getSelectorForPassengerExtra(
              'Endast handbagage 0 kg ToR',
              4
            )
          )
        ).to.equal('Ja');

        expect(
          browser.getText(
            ConfirmBooking.getSelectorForPassengerExtra(
              '10 kg + handbagage 0 kg ToR',
              5
            )
          )
        ).to.equal('Ja');
      });

      it('Should have correct price of bagage on all passengers', function() {
        expect(
          browser.getText(
            ConfirmBooking.getSelectorForPassengerPrice('Bagage på flyget', 1)
          )
        ).to.equal(state.passengerBaggagePrice[0]);
        expect(
          browser.getText(
            ConfirmBooking.getSelectorForPassengerPrice('Bagage på flyget', 2)
          )
        ).to.equal(state.passengerBaggagePrice[1]);
        expect(
          browser.getText(
            ConfirmBooking.getSelectorForPassengerPrice('Bagage på flyget', 3)
          )
        ).to.equal(state.passengerBaggagePrice[2]);
        expect(
          browser.getText(
            ConfirmBooking.getSelectorForPassengerPrice('Bagage på flyget', 4)
          )
        ).to.equal(state.passengerBaggagePrice[3]);
        expect(
          browser.getText(
            ConfirmBooking.getSelectorForPassengerPrice('Bagage på flyget', 5)
          )
        ).to.equal(state.passengerBaggagePrice[4]);
      });
    });

    describe.skip('Checks that bagage works on the My Page', function() {
      it('Should have bagage on the extras-list', function() {});

      it('', function() {});
    });
  });
});
