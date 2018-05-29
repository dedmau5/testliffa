import { Settings } from "../../../../../pages/apps/generic-booking-start/settings";
const chalk = require('chalk');
const log = console.log;


/**
 * @param BookingStart {GenericBookingStart}
 * @param settings {Object}
 * @param type {Settings.City|Settings.FlightAndHotel|Settings.Flight|Settings.Hotel}
 */
export function MakeRelevantSettingsAndPerformSearch(BookingStart, settings, type) {
    it('Perform relevant settings', function () {

        if ( type.constructor === Settings.City.constructor ) {
            settings.destination = settings.resort;
            delete settings.resort;

            BookingStart.performSettings(
                new Settings.City( {
                    departFrom: settings.departFrom,
                    destination: settings.destination,
                    date: {
                        From: settings.From,
                        To: settings.To,
                        AllowChoosingNearbyDates: true
                    },
                    travellers: {
                        Adults: 2
                    }
                })
            );
        }

        else if ( type.constructor === Settings.FlightAndHotel.constructor ||
                  type.constructor === Settings.Flight.constructor
        ) {
            BookingStart.performSettings(
                new type( {
                    departFrom: settings.departFrom,
                    destination: settings.destination,
                    resort: settings.resort,
                    date: {
                        From: settings.From,
                        To: settings.To,
                        AllowChoosingNearbyDates: true
                    },
                    travellers: {
                        Adults: 2
                    }
                })
            );
        }

        else if ( type.constructor === Settings.Hotel.constructor ) {
            BookingStart.performSettings(
                new Settings.Hotel( {
                    destination: settings.destination,
                    resort: settings.resort,
                    date: {
                        From: settings.From,
                        To: settings.To,
                        AllowChoosingNearbyDates: true
                    },
                    travellers: {
                        Adults: 2
                    }
                })
            );
        }

        else {
            throw new Error( "The provided settings object is not supported!" );
        }
    });

    it("Perform search", function () {
        log("");
        log(chalk.underline.cyan("Search Settings"));
        log(`Destination is set to ${settings.destination}`);
        log(`Resort is set to ${settings.resort}`);
        log(`From date is set to ${settings.From.toLocaleString()}`);
        log(`To date is set to ${settings.To.toLocaleString()}`);
        log(`Travellers, adults, is set to 2`);
        log("");

        BookingStart.search();
    });
}