import { StartPage } from '../../../../pages/start-page';
import { BookingStartLegacy } from '../../../../pages/apps/booking-start-legacy/index';
import { getRandomIntegerBetween } from '../../../../tools/index';

describe(
    'Testing Packages: Random Choice',

    (done) => {
        it('Start page is open', () => {
            StartPage.open();
        });

        describe(
            'Booking App',

            () => {
                it('Is visible', () => {
                    expect(browser.waitForExist(BookingStartLegacy.fromWhere.home, 5000)).to.equal(
                        true,
                        "Couldn't find the dropdown for selecting the origin of the travel!"
                    );

                    expect(browser.waitForExist(BookingStartLegacy.toWhere.home, 5000)).to.equal(
                        true,
                        "Couldn't find the dropdown to select the destination of the travel!"
                    );

                    expect(browser.waitForExist(BookingStartLegacy.resort.home, 5000, true)).to.equal(
                        true,
                        "Found the dropdown for selecting resort! Shouldn't be visible!"
                    );
                });
            }
        );

        describe(
            'Booking App: Depart from',

            () => {
                let airportsToDepartFrom = null,
                    randomAirportToDepartFromIndex,
                    randomAirportToDepartFrom;

                it('Can view airportsToDepartFrom', () => {
                    airportsToDepartFrom = BookingStartLegacy.dropdowns.fromWhere.getDropdownItems();

                    expect(airportsToDepartFrom).is.instanceOf(Array).and.have.length.above(1,
                        "Fewer than two departure airportsToDepartFrom were found!"
                    );

                    randomAirportToDepartFromIndex = getRandomIntegerBetween(1, airportsToDepartFrom.length-1);
                    randomAirportToDepartFrom = airportsToDepartFrom[randomAirportToDepartFromIndex];
                });

                it('Can select a random city', () => {
                    expect(BookingStartLegacy.dropdowns.fromWhere.select(randomAirportToDepartFrom)).to.equal(true,
                        `Couldn't select '${randomAirportToDepartFrom.value}' as a city to depart from!`
                    );
                });
            }
        );

        describe(
            'Booking App: Go to',

            () => {
                let cities = null,
                    randomCityToGoToIndex,
                    randomCityToGoTo;


                it('Can view cities to go to', () => {
                    cities = BookingStartLegacy.dropdowns.toWhere.getDropdownItems();
                    expect(cities).to.have.a.length.above(0,
                        "Not even one city to go to was found!"
                    );
                    randomCityToGoToIndex = getRandomIntegerBetween(0, cities.length);
                    randomCityToGoTo = cities[randomCityToGoToIndex];
                });

                it('Can select a random city to go to', () => {
                    expect(BookingStartLegacy.dropdowns.toWhere.select(randomCityToGoTo)).to.equal(true
                        `Couldn't select '${randomCityToGoTo.value}' as destination!`
                    );
                });
            }
        );

        describe(
            'Booking App: Resorts',

            () => {
                let resorts = null,
                    randomResortIndex,
                    randomResort;

                it('Is visible', () => {
                        browser.waitForExist(BookingStartLegacy.resort.home, 5000)
                    }
                );

                it('Can view resorts', () => {
                    resorts = BookingStartLegacy.dropdowns.resort.getDropdownItems();
                    expect(resorts).to.have.a.length.above(0,
                        "Not even one travel destination was found!"
                    );
                    randomResortIndex = getRandomIntegerBetween(0, resorts.length);
                    randomResort = resorts[randomResortIndex];
                });

                it('Can select a random travel destination', () => {
                    expect(BookingStartLegacy.dropdowns.resort.select(randomResort)).to.equal(true,
                        `Couldn't select '${randomResort.value}' as destination!`
                    );
                });
            }
        );

        browser.call(done);
    }
);
