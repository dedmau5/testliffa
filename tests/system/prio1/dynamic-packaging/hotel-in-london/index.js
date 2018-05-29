const moment = require("moment");

import { Translate } from '../../../../../tools/index';
import { StartPage } from '../../../../../pages/start-page';
import { BookingStart } from '../../../../../pages/apps/booking-start/index';
import { Hotels } from '../../../../../pages/apps/hotels/index';
import { CanViewHotelsAndSelectOne } from '../../common/can-view-hotels-and-select-one';
import { HandleTheNameCollection } from '../../common/name-collection';
import Booking from '../../../../../pages/booking/dynamic-packaging/index';
import { DynamicPackagingTranslations as Translations } from '../../../../../localization/booking/dynamic-packaging/index';

/**
 * Should belong to the following suits:
 * - Sanity
 * - Dynamic
 */
describe(
    'Dynamic Packaging: Hotel in London', function () {
        // let BookingStart = new GenericBookingStart();
        // settings = {};
        // sharedData = {};

        
        // shared data between tests
        let sharedData = {
            hotelName: null,
        };

        const departureDate = moment(new Date()).add(4, 'months');
        const returnDate = departureDate.clone().add(3); //3 days

        const settings = {
            destination: Translate({ dk: "Storbritannien", fi: "Iso-Britannia", no: "Storbritannia", se: "Storbritannien", globe: "Storbritannien" }),
            resort: Translate({ dk: "London", fi: "Lontoo", no: "London", se: "London", globe: "London" }),
            date: {
                departure: { year: departureDate.year(), month: departureDate.month() + 1, day: departureDate.date(), allowChoosingNearByDate: true, numberOfNearbyMonthsToAllow: 6 },
                return: { year: returnDate.year(), month: returnDate.month() + 1, day: returnDate.date(), allowChoosingNearByDate: true, numberOfNearbyMonthsToAllow: 6 }
            },
            travellers: {
                adults: 3
            }

        };
    
        
        describe('Initialize Bookingstart', () => {

            it('Can open start page', function () {
                StartPage.open();
            });

            it('Wait until Booking Start has Finished Loading', function () {
                BookingStart.waitUntilLoaded();
            });

            it('Open hotel only', function () {
                BookingStart.hotelOnly.click();
            });
        });

        
        describe('Perform search', () => {

            it(`Can open 'Hotel only'`, () => {
                BookingStart.hotelOnly.destination.open();
            });

            it(`Can choose ${settings.destination} as country`, () => {
                expect(BookingStart.hotelOnly.destination.country.toggle(settings.destination)).to.equal(true,
                    `Couldn't find country and click on it!`
                );
            });

            it(`Can select ${settings.resort}`, () => {
                expect(BookingStart.hotelOnly.destination.resort.select(settings.resort)).to.equal(true,
                    `Couldn't find resort and click on it!`
                );
            });

            it('Can click on "Calender"', () => {
                BookingStart.hotelOnly.datepicker.open();
            });

            it(`Can select departure date ${settings.date.departure.year}-${settings.date.departure.month}-${settings.date.departure.day}`, () => {
                const date = settings.date.departure;

                expect(BookingStart.hotelOnly.datepicker.selectDate(date.year, date.month, date.day,
                    date.allowChoosingNearByDate, date.numberOfNearbyMonthsToAllow)).to.equal(true,
                    `Couldn't click desired departure date`
                    );
            });

            it(`Can select return date ${settings.date.return.year}-${settings.date.return.month}-${settings.date.return.day}`, function () {
                const date = settings.date.return;

                expect(BookingStart.hotelOnly.datepicker.selectDate(date.year, date.month, date.day,
                    date.allowChoosingNearByDate, date.numberOfNearbyMonthsToAllow)).to.equal(true,
                    `Couldn't click desired return date`
                    );
            });

            it('Can click on "Pax"', () => {
                BookingStart.hotelOnly.pax.open();
            });

            it(`Can add ${settings.travellers.adults} adults to room 1`, () => {
                BookingStart.hotelOnly.pax.adults = settings.travellers.adults;
            });

            it('Can close "Pax"', () => {
                BookingStart.hotelOnly.pax.confirm();
            });


            it('Click on search button', () => {
                BookingStart.search.click();
            });

        });          

        CanViewHotelsAndSelectOne({ Hotels: new Hotels("hotelonly"), mode: "hotelonly" });
        HandleTheNameCollection(sharedData, { mode: "dynamic-packaging" });


        //This part is partially refactored :)
        describe('Can confirm the booking', function () {
            const timeout = 60000;
            let price;

            it(`The "confirm booking" page loads within ${timeout/1000} s`, function () {
                Booking.steps.confirmBooking.waitForPage();
            });

            it("Total Price equals the Price seen under My Choice", function () {
                price = Booking.myChoices.travelInformation.price;
                expect( Booking.steps.confirmBooking.totalPrice ).to.equal( price, "Price mismatch!" );
            });

            it("Price equals the Price seen on the previous page", function () {
                expect(price).to.equal( sharedData.price, "Prices between step 1 and step 2 mismatch!" );
            });

            it(`Can accept Ving's travel terms in summary view`, function () {
                const terms = Booking.steps.confirmBooking.checkboxes.acceptTerms.summary;

                expect(terms.isChecked).to.equal(false, "The travel terms checkbox shouldn't have been checked!");
                terms.check();
                expect(terms.isChecked).to.equal(true, "The travel terms checkbox should have been checked!");
            });

            it(`Can confirm the booking within ${timeout/1000} s using the summary confirm button`, function () {
                this.timeout(timeout);
                this.slow(timeout/3);

                Booking.steps.confirmBooking.buttons.confirm.summary.click();
                const headingLabel = Booking.steps.confirmedBooking.waitForPage();

                expect(headingLabel).to.be.oneOf( [
                    Translations.steps.confirmedBooking.heading,
                    Translations.steps.confirmedBooking.choosePaymentMethodHeading
                ] );
            });
        });
    }
);
