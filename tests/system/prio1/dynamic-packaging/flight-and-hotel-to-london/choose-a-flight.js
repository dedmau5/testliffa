import { BookingStartLegacy } from '../../../../../pages/apps/booking-start-legacy/index';
import Flights from '../../../../../pages/apps/flights/index';
import { redirectToNewHotelsPageIfNeeded } from '../../common/can-view-hotels-and-select-one';


/**
 * @param redirectToNewHotelsPageIfTheOldLoaded {boolean}
 * Redirects to the new hotel page if the old was loaded.
 *
 * @param clickOnAllFlights {boolean}
 * Click on the "all flights" link.
 */
export function ChooseAFlight({
    redirectToNewHotelsPageIfTheOldLoaded = false,
    clickOnAllFlights = false
} = {}) {
    describe(
        'Choose a Flight',

        () => {
            let filteredFlights,
                numberOfFlights;
            const timeout = 50000;

            if ( redirectToNewHotelsPageIfTheOldLoaded ) {
                it(
                    'Redirect to new hotel page if the old loaded',
                    redirectToNewHotelsPageIfNeeded
                );
            }

            if ( clickOnAllFlights ) {
                it("Can find 'all flights' link and click on it",

                    () => {
                        BookingStartLegacy.clickOnAllFlightsLink();
                    }
                );
            }

            it('Wait for flight page',

                () => {
                    Flights.waitForPageToLoad();
                }
            );

            it(`There is at least one flight available within ${timeout / 1000} s`,

                () => {
                    browser.waitUntil(
                        () => {
                            numberOfFlights = Flights.numberOfFlights;
                            return numberOfFlights > 0;
                        },
                        timeout
                    );

                    expect(numberOfFlights).to.be.above(0);
                }
            );

            it('There is at least one British Airways flight available',

                () => {
                    let airlines;

                    browser.waitUntil(
                        () => {
                            airlines = Flights.airlines;
                            return airlines.length > 0;
                        },
                        30000
                    );

                    expect(
                        airlines.some((airline) => {
                            return airline.name.includes("British Airways");
                        })
                    ).to.equal(true,
                        "British Airlines was not available as a choice of airlines to filter on!"
                    );

                    if (!Flights.isAirlinesFilterMenuOpen()) {
                        Flights.openAirlinesFilterMenu();
                    }

                    let foundBritishAirways = false;
                    for (let airline of airlines) {
                        if (airline.name.includes("British Airways")) {
                            Flights.selectAirlines([{id: airline.id, select: true}]);
                            foundBritishAirways = true;
                            break;
                        }
                    }

                    expect(foundBritishAirways).to.equal(true,
                        "British Airways wasn't found as a choice of airline companies to filter by!"
                    );

                    let numberOfFilteredFlights = 0;

                    browser.waitUntil(
                        () => {
                            numberOfFilteredFlights = Flights.numberOfFilteredFlights;
                            numberOfFlights = Flights.numberOfFlights;
                            return numberOfFilteredFlights < numberOfFlights;
                        },
                        timeout
                    );

                    expect(numberOfFilteredFlights).to.be.above(0,
                        "There must be at least one British Airways flight available!"
                    );

                    expect(numberOfFilteredFlights).to.be.below(numberOfFlights,
                        "Number of filtered flights can't equal the number of available flights!"
                    );

                    filteredFlights = Flights.filteredFlights;

                    expect(filteredFlights).is.instanceof(Array).and.have.length.above(0,
                        "There must be at least one British Airways flight available!"
                    );

                    const departureAndReturnOfEveryFilteredFlightMatchBritishAirways =
                        filteredFlights.every((flight) => {
                            const
                                departure = flight.airlines.departure.trim(),
                                return_ = flight.airlines.return.trim();

                            return departure.includes("British Airways") && return_.includes("British Airways");
                        });

                    if ( ! departureAndReturnOfEveryFilteredFlightMatchBritishAirways ) {
                        console.warn(
                            "The filter code might be broken! Not every filtered flight's departure and" +
                            " return matched 'British Airways'!"
                        );
                    }

                    const atLeastOneFilteredFlightMatchBritishAirways = filteredFlights.some((flight) => {
                        const
                            departure = flight.airlines.departure.trim(),
                            return_ = flight.airlines.return.trim();

                        return departure.includes("British Airways") && return_.includes("British Airways");
                    });

                    if ( ! atLeastOneFilteredFlightMatchBritishAirways ) {
                        throw new Error(
                            "Failed to find at least one flight where departure and return equal 'British Airways'!"
                        );
                    }
                }
            );

            it(`Can choose a British Airways flight`,

                () => {
                    for (let filteredFlight of filteredFlights) {
                        if ( filteredFlight.button.isVisible() ) {
                            filteredFlight.button.click();
                            break;
                        }
                    }

                }
            );
        }
    );
}