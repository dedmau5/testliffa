import { Settings } from "../../../../../pages/apps/generic-booking-start/settings";
const chalk = require('chalk');
const log = console.log;


/**
 * @param BookingStart {GenericBookingStart}
 * @param settings {Object}
 */
export function MakeRelevantSettingsAndPerformSearch(BookingStart, settings) {
    it('Perform relevant settings', function () {
        BookingStart.performSettings(
            new Settings.FlightAndHotel( {
                departFrom: settings.departFrom,
                destination: settings.destination,
                area: settings.area,
                resort: settings.resort,
                travelDuration: settings.travelDuration,
                date: {
                    From: settings.From,
                    AllowChoosingNearbyDates: true
                },
                travellers: {
                    Adults: 2
                }
            })
        );
    });


    it("Perform search", function () {

        log(chalk.underline.cyan("\nSearch Settings"));
        log(`Depart from is set to ${chalk.bold(settings.departFrom)}`);
        log(`Destination is set to ${chalk.bold(settings.destination)}`);
        log(`Area is set to ${chalk.bold(settings.area)}`);
        log(`Resort is set to ${chalk.bold(settings.resort)}`);
        log(`From date is set to ${chalk.bold(settings.From.toLocaleString())}`);
        log(`Travellers, adults, is set to ${chalk.bold("2")}\n`);

        BookingStart.search();
    });
}