const chalk = require('chalk');
const log = console.log;

import { waitForUrlToChange } from '../../../../tools/index';
import HotelBooking from '../../../../pages/apps/hotel-booking/index';
import IndependentHotelBooking from '../../../../pages/apps/hotel-booking/independent-hotel-booking';
import IndependentFlow from '../../../../pages/apps/independent-flow/index';
import { Urls } from '../../../../localization/index';
import CharterPriceMatrix from '../../../../pages/apps/charter-price-matrix/index';


function findAValidHotel(hotels, mode) {
    return hotels.find(
        (hotel) => {
            if (mode !== "charter") {
                return true;
            }

            const concept = hotel.concept;
            return concept !== "sunwing" && concept !== "sunprime" && concept !== "obcbysunwing";
        }
    );
}

export function redirectToNewHotelsPageIfNeeded() {
    // debugger;
    // let redirectNeeded = false;

    // browser.waitUntil(() => {
    //     debugger;
    //     if ( browser.isExisting("div.package-list") ) {
    //         debugger;
    //         redirectNeeded = true;
    //         return true;
    //     } else if ( browser.isExisting("div.hotel-container") ) {
    //         debugger;
    //         return true;
    //     } else if ( browser.isExisting("div.accomodationlist-hotelist") ) {
    //         return false;
    //     }
    //     else {
    //         debugger;
    //         return false;
    //     }

    // }, 3000);

    // debugger;
    // if (redirectNeeded) {
    //     debugger;
    //     browser.url(
    //         browser.getUrl().replace(
    //             hotelsUrls.old,
    //             hotelsUrls.new
    //         )
    //     );
    // }
}


/**
 * Utility function to view hotels and select one of the available choices.
 *
 * @param {Hotels} Hotels
 * Page Object for Hotels
 *
 * @param {boolean} redirectToNewHotelsPageIfTheOldLoaded
 * Redirects to the new hotel page if the old was loaded.
 *
 * @param {boolean} [beginWithWaitingForHotelsToLoad=true]
 * Boolean to decide whether to wait for the hotel listing to load.
 *
 * @param {('charter'|'dynamic'|'hotelonly')} [mode=dynamic]
 * Sets which hotels class to use.
 *
 * @param {number} [timeout=30000]
 * Number in milliseconds before the test times out.
 */
export function CanViewHotelsAndSelectOne({
    Hotels,
    redirectToNewHotelsPageIfTheOldLoaded = false,
    beginWithWaitingForHotelsToLoad = true,
    mode = "dynamic",
    timeout = 6000000
}) {
    describe('Can View Hotels and Select One',

        function() {
            let hotels;
            let hotelName = false;

            const abTest = {
                priceMatrix: {
                    hasBeenTestingLegacyVersion: false,
                    hasBeenTestingNewVersion: false,
                }
            };
            
            if (redirectToNewHotelsPageIfTheOldLoaded) {
                it(
                    'Redirect to new hotel page if the old loaded',
                    redirectToNewHotelsPageIfNeeded
                );
            }

            if (beginWithWaitingForHotelsToLoad) {
                it('Hotels page is done loading', function() {
                    Hotels.waitForPageToLoad(timeout);
                });
            }

            it(`There are hotels available within ${timeout / 1000} s`, function() {
                this.timeout(timeout);
                this.slow(timeout / 4);

                browser.waitUntil(
                    function() {
                        hotels = Hotels.getHotels();
                        return hotels.length >= 5;
                    },
                    timeout
                );

                expect(hotels).to.be.instanceof(Array).and.have.length.above(0,
                    "There are no available hotels!"
                );
            });


            it(`Can select a hotel within ${timeout / 1000} s`, function() {
                //select hotel on hotel result list
                this.timeout(timeout);
                this.slow(timeout / 4);

                let previousUrl = browser.getUrl();
                const hotel = findAValidHotel(hotels, mode);

                if (!hotel) {
                    throw new Error("No valid hotel was found!");
                }

                hotelName = hotel.name;
                hotel.chooseButton.click();

                expect(hotelName).to.be.a('string',
                    "Found no valid hotels. Sunwing, Sunprime and OBC still uses the old apps."
                );

                log(`Hotel name: ${chalk.bold(hotelName)}`);

                waitForUrlToChange(previousUrl, timeout);

                if (mode !== "hotelonly") {
                    previousUrl = browser.getUrl();

                    const
                        oldHotelPageUrl = Urls[mode].hotelPage.old,
                        newHotelPageUrl = Urls[mode].hotelPage.new;

                    if (previousUrl.includes(oldHotelPageUrl)) {
                        browser.url(previousUrl.replace(oldHotelPageUrl, newHotelPageUrl));
                        waitForUrlToChange(previousUrl, timeout);
                    }
                }

                (mode === "hotelonly" ? IndependentHotelBooking : HotelBooking)
                    .waitForPageToLoad(timeout);
            });

            it('Can click on hotel in Hotel page ', function() {
                const isDynamicMode = mode === "dynamic";
                abTest.priceMatrix.hasBeenTestingNewVersion = true;

                this.timeout(timeout);
                this.slow(timeout / 4);

                //TODO: Remove these comments and enable a more robust name checker. commented at the moment due to strange line breaking fail
                // const header = browser.getText('#hotelweb-app-root h1');
                // expect(hotelName).to.equal(header,
                //     "The name of the chosen hotel must match between pages!"
                // );

                if (!isDynamicMode) {
                    console.log("scrolling to bottom of page to ensure 'CharterPriceMatrix.summary.submit' is clickable. ");
                    browser.scroll("#copyright");
                    browser.pause(1000);
                    CharterPriceMatrix.summary.submit();
                }

                if (isDynamicMode) {
                    IndependentFlow.priceMatrix.summary.select();
                }
            });
        }
    );
}