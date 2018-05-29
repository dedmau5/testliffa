import moment from 'moment';

import { StartPage } from '../../../pages/start-page.js';
import { BookingStart } from '../../../pages/apps/booking-start/index.js';
import CharterFlow from '../../../pages/apps/charter-flow/index.js';
import Namecollection
  from '../../../pages/apps/namecollection/namecollection-pageobject.js';
import GenericExtras
  from '../../../pages/apps/generic-extras/generic-extras-pageobject.js';
import Supplements
  from '../../../pages/apps/supplements/supplements-pageobject.js';
import ConfirmBooking
  from '../../../pages/apps/confirm-booking/confirm-booking-pageobject.js';
import HotelBooking from 'pages/apps/hotel-booking/index.js';

describe('Preparing steps', function() {
  const departureDate = moment(new Date()).add(4, 'months');
  const NEW_BAGAGE = '.a5c5563d-e686-419d-8065-80a8150263e0 ';
  const OLD_BAGAGE = '.bag ';
  const NEW_PARKING = '.\\34 5fdf81b-56a2-4dbd-876b-c2da5ff41172 ';
  const OLD_PARKING = '.prk ';
  const NEW_MEALS = '.f88ac10b-9b4e-4a9f-bc7b-4d537f5120f1 ';
  const OLD_MEALS = '.mlf ';
  const NEW_TRANSFER = '.\\35 e087473-6527-440d-a9eb-e66471012d98 ';
  const OLD_TRANSFER = '.trf ';
  const NEW_CANCELLATION_INSURANCE =
    '.\\30 e32686e-16e2-49c2-9790-d3b6d5194229 ';
  const OLD_CANCELLATION_INSURANCE = '.can ';
  const NEW_TRAVEL_INSURANCE = '.\\37 d524ce7-db87-4393-8e09-0353a1658a95 ';
  const OLD_TRAVEL_INSURANCE = '.ing ';

  before(function() {
    StartPage.open();
    BookingStart.waitUntilLoaded();
    BookingStart.waitUntilDataLoaded();
    BookingStart.package.click();
    BookingStart.package.departure.open();
    BookingStart.package.departure.select('Stockholm-Arlanda');
    BookingStart.package.destination.open();
    BookingStart.package.destination.country.toggle('Spanien');
    BookingStart.package.destination.area.toggle('Gran Canaria');
    BookingStart.package.destination.resort.select('Alla resmål');
    BookingStart.package.duration.open();
    BookingStart.package.duration.select(2);
    BookingStart.package.datepicker.open();
    BookingStart.package.datepicker.selectDate(
      departureDate.year(),
      departureDate.month(),
      departureDate.date(),
      true,
      6
    );
    BookingStart.package.pax.open();
    BookingStart.package.pax.setAdults(2);
    BookingStart.package.pax.setChildren(3);
    BookingStart.package.pax.child(1).age(3);
    BookingStart.package.pax.child(2).age(1);
    BookingStart.package.pax.child(3).age(0);
    BookingStart.package.pax.confirm();
    BookingStart.search.click();
    CharterFlow.waitForPageToLoad();
    CharterFlow.waitUntilLoaded();
    CharterFlow.clickOnFirstHotel();
    HotelBooking.waitForPageToLoad();
    HotelBooking.waitForPriceMatrixToLoad();
    HotelBooking.gotoNameCollection();
    Namecollection.waitForPageToLoad();
  });

  describe('Generic Extras: Luggage - Charter', function() {
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
        const passengerBeforeFormsAreFilledBagage = browser.getText(
          NEW_BAGAGE +
            GenericExtras.selectors.app.passengers.passengerOne.nameHeader
        );
        const passengerBeforeFormsAreFilledMeals = browser.getText(
          NEW_MEALS +
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
            NEW_BAGAGE +
              GenericExtras.selectors.app.passengers.passengerOne.nameHeader
          )
        ).not.equal(passengerBeforeFormsAreFilledBagage);

        expect(
          browser.getText(
            NEW_MEALS +
              GenericExtras.selectors.app.passengers.passengerOne.nameHeader
          )
        ).not.equal(passengerBeforeFormsAreFilledMeals);

        expect(
          browser.getText(
            NEW_BAGAGE +
              GenericExtras.selectors.app.passengers.passengerOne.nameHeader
          )
        ).to.equal('Stefan Franzén');

        expect(
          browser.getText(
            NEW_MEALS +
              GenericExtras.selectors.app.passengers.passengerOne.nameHeader
          )
        ).to.equal('Stefan Franzén');

        Namecollection.passengerInformation.setPassengerInformationByIndex(
          2,
          'Karin',
          'Franzén',
          'adult',
          '871117',
          'Female'
        );

        expect(
          browser.getText(
            NEW_BAGAGE +
              GenericExtras.selectors.app.passengers.passengerTwo.nameHeader
          )
        ).to.equal('Karin Franzén');

        expect(
          browser.getText(
            NEW_MEALS +
              GenericExtras.selectors.app.passengers.passengerTwo.nameHeader
          )
        ).to.equal('Karin Franzén');

        Namecollection.passengerInformation.setPassengerInformationByIndex(
          3,
          'Stella',
          'Franzén',
          'kid',
          '141104'
        );

        expect(
          browser.getText(
            NEW_BAGAGE +
              GenericExtras.selectors.app.passengers.passengerThree.nameHeader
          )
        ).to.equal('Stella Franzén (3 år)');

        expect(
          browser.getText(
            NEW_MEALS +
              GenericExtras.selectors.app.passengers.passengerThree.nameHeader
          )
        ).to.equal('Stella Franzén (3 år)');

        Namecollection.passengerInformation.setPassengerInformationByIndex(
          4,
          'Dylan',
          'Franzén',
          'kid',
          '161219'
        );

        expect(
          browser.getText(
            NEW_BAGAGE +
              GenericExtras.selectors.app.passengers.passengerFour.nameHeader
          )
        ).to.equal('Dylan Franzén (1 år)');

        expect(
          browser.getText(
            NEW_MEALS +
              GenericExtras.selectors.app.passengers.passengerFour.nameHeader
          )
        ).to.equal('Dylan Franzén (1 år)');

        Namecollection.passengerInformation.setPassengerInformationByIndex(
          5,
          'London',
          'Franzén',
          'kid',
          '170815'
        );

        expect(
          browser.getText(
            NEW_BAGAGE +
              GenericExtras.selectors.app.passengers.passengerFive.nameHeader
          )
        ).to.equal('London Franzén (1 år)');

        expect(
          browser.getText(
            NEW_MEALS +
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
          NEW_BAGAGE +
            GenericExtras.selectors.app.passengers.passengerOne.options,
          2
        );
      });

      it('Should have a updated GenericExtras price-summary after adding passengers bagage-choices', function() {
        expect(state.initialTotalPriceInGenericExtras).to.not.be.equal(
          browser.getText(NEW_BAGAGE + GenericExtras.selectors.app.priceSummary)
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
        browser.click(
          NEW_BAGAGE + GenericExtras.selectors.app.sameExtrasForAll
        );
        const paxOneOptions =
          NEW_BAGAGE +
          GenericExtras.selectors.app.passengers.passengerOne.options;
        const paxTwoOptions =
          NEW_BAGAGE +
          GenericExtras.selectors.app.passengers.passengerTwo.options;
        expect($(paxOneOptions).getValue()).to.be.equal(
          $(paxTwoOptions).getValue()
        );
      });

      it('Should have a updated GenericExtras price-summary after adding passengers bagage-choices', function() {
        expect(state.initialTotalPriceInGenericExtras).to.not.be.equal(
          browser.getText(NEW_BAGAGE + GenericExtras.selectors.app.priceSummary)
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
        browser.click(
          NEW_BAGAGE + GenericExtras.selectors.app.sameExtrasForAll
        );
      });

      it('Should reset choice of passenger two', function() {
        state.preSavedTotalPriceInGenericExtras = browser.getText(
          NEW_BAGAGE + GenericExtras.selectors.app.priceSummary
        );
        state.preSavedTotalPriceInMychoices = browser.getText(
          Namecollection.selectors.myChoices.totalPrice
        );
        state.preSavedTotalPriceInSubmitArea = browser.getText(
          Namecollection.selectors.submitArea.totalPrice
        );

        browser.selectByIndex(
          NEW_BAGAGE +
            GenericExtras.selectors.app.passengers.passengerTwo.options,
          1
        );
        browser.selectByIndex(
          NEW_BAGAGE +
            GenericExtras.selectors.app.passengers.passengerThree.options,
          1
        );

        expect(state.preSavedTotalPriceInGenericExtras).to.not.equal(
          browser.getText(NEW_BAGAGE + GenericExtras.selectors.app.priceSummary)
        );
      });

      it('Should have a updated SubmitArea price-summary after adding passengers bagage-choices', function() {
        browser.selectByIndex(
          NEW_BAGAGE +
            GenericExtras.selectors.app.passengers.passengerTwo.options,
          1
        );

        state.preSavedTotalPriceInGenericExtras =
          NEW_BAGAGE + GenericExtras.selectors.app.priceSummary;
        state.preSavedTotalPriceInMychoices =
          Namecollection.selectors.myChoices.totalPrice;
        state.preSavedTotalPriceInSubmitArea =
          Namecollection.selectors.submitArea.totalPrice;
      });

      it('Should be able to choose bagage for adult two', function() {
        state.preSavedTotalPriceInGenericExtras =
          NEW_BAGAGE + GenericExtras.selectors.app.priceSummary;
        state.preSavedTotalPriceInMychoices =
          Namecollection.selectors.myChoices.totalPrice;
        state.preSavedTotalPriceInSubmitArea =
          Namecollection.selectors.submitArea.totalPrice;

        browser.selectByIndex(
          NEW_BAGAGE +
            GenericExtras.selectors.app.passengers.passengerTwo.options,
          2
        );
      });

      it('Should have a updated GenericExtras price-summary after adding passengers bagage-choices', function() {
        expect(state.preSavedTotalPriceInGenericExtras).to.not.be.equal(
          browser.getText(NEW_BAGAGE + GenericExtras.selectors.app.priceSummary)
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
          NEW_BAGAGE + GenericExtras.selectors.app.priceSummary;
        state.preSavedTotalPriceInMychoices =
          Namecollection.selectors.myChoices.totalPrice;
        state.preSavedTotalPriceInSubmitArea =
          Namecollection.selectors.submitArea.totalPrice;

        browser.selectByIndex(
          NEW_BAGAGE +
            GenericExtras.selectors.app.passengers.passengerThree.options,
          2
        );
      });

      it('Should be able to choose bagage for child', function() {
        browser.selectByIndex(
          NEW_BAGAGE +
            GenericExtras.selectors.app.passengers.passengerFour.options,
          2
        );
      });

      it('Should be able to choose bagage for infant', function() {
        browser.selectByIndex(
          NEW_BAGAGE +
            GenericExtras.selectors.app.passengers.passengerFive.options,
          1
        );
      });

      it('Should have a updated GenericExtras price-summary after adding passengers bagage-choices', function() {
        expect(state.preSavedTotalPriceInGenericExtras).to.not.be.equal(
          browser.getText(NEW_BAGAGE + GenericExtras.selectors.app.priceSummary)
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
        const oldSelector =
          OLD_MEALS +
          Namecollection.selectors.supplements.mealOnFlight.passengers
            .firstPassenger.options;
        const newSelector =
          NEW_MEALS +
          Namecollection.selectors.supplements.mealOnFlight.passengers
            .firstPassenger.newOptions;

        it('Should choose option 1 for first passenger', function() {
          if (browser.isExisting(OLD_MEALS)) {
            browser.selectByIndex(oldSelector, 1);
          }
          if (browser.isExisting(NEW_MEALS)) {
            browser.selectByIndex(newSelector, 1);
          }
        });

        it('Should click the sameExtrasForAll checkbox', function() {
          if (browser.isExisting(OLD_MEALS)) {
            browser.click(
              OLD_MEALS +
                Namecollection.selectors.supplements.mealOnFlight
                  .sameExtrasForAll
            );
          }
          if (browser.isExisting(NEW_MEALS)) {
            browser.click(
              NEW_MEALS +
                Namecollection.selectors.supplements.mealOnFlight
                  .sameExtrasForAll
            );
          }
        });

        it('Should choose option 1 for fourth passenger', function() {
          if (browser.isExisting(OLD_MEALS)) {
            browser.selectByIndex(
              OLD_MEALS +
                Namecollection.selectors.supplements.mealOnFlight.passengers
                  .fourthPassenger.options,
              1
            );
          }
          if (browser.isExisting(NEW_MEALS)) {
            browser.selectByIndex(
              NEW_MEALS +
                Namecollection.selectors.supplements.mealOnFlight.passengers
                  .fourthPassenger.newOptions,
              1
            );
          }
        });

        it('Should choose option 1 for fifth passenger', function() {
          if (browser.isExisting(OLD_MEALS)) {
            browser.selectByIndex(
              OLD_MEALS +
                Namecollection.selectors.supplements.mealOnFlight.passengers
                  .fifthPassenger.options,
              1
            );
          }
          if (browser.isExisting(NEW_MEALS)) {
            browser.selectByIndex(
              NEW_MEALS +
                Namecollection.selectors.supplements.mealOnFlight.passengers
                  .fifthPassenger.newOptions,
              1
            );
          }
        });
      });

      describe('Fills into forms for airportTransport', function() {
        it('Should choose NO to airportTransport supplement', function() {
          if (browser.isExisting(OLD_TRANSFER)) {
            browser.selectByIndex(
              OLD_TRANSFER +
                Namecollection.selectors.supplements.airportTransport
                  .openDropDown,
              2
            );
          }
          if (browser.isExisting(NEW_TRANSFER)) {
            browser.selectByIndex(
              NEW_TRANSFER +
                Namecollection.selectors.supplements.airportTransport
                  .openDropDown,
              2
            );
          }
        });
      });

      describe('Fills into forms for cancellationInsurance', function() {
        it('Should choose NO to cancellationInsurance supplement', function() {
          if (browser.isExisting(OLD_CANCELLATION_INSURANCE)) {
            browser.selectByIndex(
              OLD_CANCELLATION_INSURANCE +
                Namecollection.selectors.supplements.cancellationInsurance
                  .openDropDown,
              2
            );
          }
          if (browser.isExisting(NEW_CANCELLATION_INSURANCE)) {
            browser.selectByIndex(
              NEW_CANCELLATION_INSURANCE +
                Namecollection.selectors.supplements.cancellationInsurance
                  .openDropDown,
              2
            );
          }
        });
      });

      describe('Fills into forms for tripInsurance', function() {
        it('Should choose NO to tripInsurance supplement', function() {
          if (browser.isExisting(OLD_TRAVEL_INSURANCE)) {
            browser.selectByIndex(
              OLD_TRAVEL_INSURANCE +
                Namecollection.selectors.supplements.tripInsurance.openDropDown,
              2
            );
          }
          if (browser.isExisting(NEW_TRAVEL_INSURANCE)) {
            browser.NEW_TRAVEL_INSURANCE(
              NEW_CANCELLATION_INSURANCE +
                Namecollection.selectors.supplements.tripInsurance.openDropDown,
              2
            );
          }
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
          var texts = browser.getText(
            Namecollection.selectors.submitArea.details.bagageText
          );

          if (texts.constructor === Array) {
            var index = texts.findIndex(text => text === 'Bagage');
            state.nameCollectionSubmitAreaBagagePrice = browser.getText(
              Namecollection.selectors.submitArea.details.bagageAmount
            )[index];
          } else {
            state.nameCollectionSubmitAreaBagagePrice = browser.getText(
              Namecollection.selectors.submitArea.details.bagageAmount
            );
          }
        });

        it('Should remember passenger-bagagePrice to compare with on supplement-page and confirmPage', function() {
          state.passengerBaggagePrice = [];
          for (var i = 1; i < 6; i++) {
            state.passengerBaggagePrice.push(
              GenericExtras.getPassengerBaggagePrice(NEW_BAGAGE, i)
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
      it('Should be able to open parking panel', function() {
        browser.click(NEW_PARKING + Supplements.selectors.togglePanel);
        browser.waitForExist(NEW_PARKING + Supplements.selectors.checkbox);
      });

      it('Should remember extras price to compare with on confirmPage', function() {
        state.parkingExtrasPrice = browser.getText(
          NEW_PARKING + Supplements.selectors.extrasPrice
        );
      });

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

      it('Should be able to choose parking', function() {
        browser.click(NEW_PARKING + Supplements.selectors.checkbox);
      });

      it('Parking selected price should updated', function() {
        expect(
          browser.getText(NEW_PARKING + Supplements.selectors.selectedPrice)
        ).to.equal(state.parkingExtrasPrice);
      });

      it('Parking group price should updated', function() {
        expect(
          browser.getText(NEW_PARKING + Supplements.selectors.totalPrice)
        ).to.equal(state.parkingExtrasPrice);
      });

      it('Parking extra should be listed in left menu', function() {
        expect(
          browser.getText(Supplements.selectors.leftMenu.gexLabel)
        ).to.equal(
          browser.getText(NEW_PARKING + Supplements.selectors.extraHeader)
        );
      });

      it('Parking extra price should be updated in left menu', function() {
        expect(
          browser.getText(Supplements.selectors.leftMenu.gexPrice)
        ).to.equal(state.parkingExtrasPrice);
      });

      it('Parking total price should be updated in left menu', function() {
        expect(
          browser.getText(Supplements.selectors.leftMenu.totalPrice)
        ).to.equal(state.parkingExtrasPrice);
      });

      it('Parking extra should be visible in price spec', function() {
        expect(
          browser.getText(Supplements.selectors.submitArea.details.parkingText)
        ).to.equal(
          browser.getText(NEW_PARKING + Supplements.selectors.extraHeader)
        );
      });

      it('Parking price should be visible in price spec', function() {
        expect(
          browser.getText(
            Supplements.selectors.submitArea.details.parkingAmount
          )
        ).to.equal(state.parkingExtrasPrice);
      });

      it('Total price should be updated with parking price in page total', function() {
        expect(
          parseInt(
            browser
              .getText(Supplements.selectors.submitArea.totalPrice)
              .replace('.', '')
          )
        ).to.equal(
          parseInt(state.nameCollectionSubmitAreaTotalPrice.replace('.', '')) +
            parseInt(state.parkingExtrasPrice.replace('.', ''))
        );
      });

      it('Should be possible to remove parking in left menu', function() {
        browser.click(Supplements.selectors.leftMenu.gexRemoveLink);
      });

      it('Parking checkbox should be unchecked', function() {
        expect(
          browser.isExisting(NEW_PARKING + Supplements.selectors.checked)
        ).to.equal(false);
      });

      it('Parking should be removed from left menu', function() {
        expect(
          browser.isExisting(Supplements.selectors.leftMenu.gexSummary)
        ).to.equal(false);
      });

      it('Should be possible to readd parking', function() {
        browser.click(NEW_PARKING + Supplements.selectors.checkbox);
      });

      it('Should remember submitArea-totalPrice to compare with on confirmPage', function() {
        state.nameCollectionSubmitAreaTotalPrice = browser.getText(
          Supplements.selectors.submitArea.totalPrice
        );
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
              '29 kg + handbagage 6 kg t/r',
              1
            )
          )
        ).to.equal('Ja');
        expect(
          browser.getText(
            ConfirmBooking.getSelectorForPassengerExtra(
              '29 kg + handbagage 6 kg t/r',
              2
            )
          )
        ).to.equal('Ja');
        expect(
          browser.getText(
            ConfirmBooking.getSelectorForPassengerExtra(
              '29 kg + handbagage 6 kg t/r',
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

      it('Should have correct Yes/No value if parking was chosen or not on all passengers', function() {
        expect(
          browser.getText(
            ConfirmBooking.getSelectorForPassengerExtra(
              'Flygets långtidsparkering',
              1
            )
          )
        ).to.equal('Ja');
        expect(
          browser.getText(
            ConfirmBooking.getSelectorForPassengerExtra(
              'Flygets långtidsparkering',
              2
            )
          )
        ).to.equal('Nej');
        expect(
          browser.getText(
            ConfirmBooking.getSelectorForPassengerExtra(
              'Flygets långtidsparkering',
              3
            )
          )
        ).to.equal('Nej');

        expect(
          browser.getText(
            ConfirmBooking.getSelectorForPassengerExtra(
              'Flygets långtidsparkering',
              4
            )
          )
        ).to.equal('Nej');

        expect(
          browser.getText(
            ConfirmBooking.getSelectorForPassengerExtra(
              'Flygets långtidsparkering',
              5
            )
          )
        ).to.equal('Nej');
      });

      it('Should have correct price of parking on all passengers', function() {
        expect(
          browser.getText(
            ConfirmBooking.getSelectorForPassengerPrice('Parkering', 1)
          )
        ).to.equal(state.parkingExtrasPrice);
        expect(
          browser.getText(
            ConfirmBooking.getSelectorForPassengerPrice('Parkering', 2)
          )
        ).to.equal('0:-');
        expect(
          browser.getText(
            ConfirmBooking.getSelectorForPassengerPrice('Parkering', 3)
          )
        ).to.equal('0:-');
        expect(
          browser.getText(
            ConfirmBooking.getSelectorForPassengerPrice('Parkering', 4)
          )
        ).to.equal('0:-');
        expect(
          browser.getText(
            ConfirmBooking.getSelectorForPassengerPrice('Parkering', 5)
          )
        ).to.equal('0:-');
      });
    });

    describe.skip('Checks that bagage works on the My Page', function() {
      it('Should have bagage on the extras-list', function() {});

      it('', function() {});
    });
  });
});
