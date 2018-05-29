import {
    locateElementAndClickOnIt
} from '../../../../../tools/elements';

import { Seats } from './seats';


const selectors = {
    aircraft: {
        departure: "div.aircraft.out",
        return: "div.aircraft.home"
    },

    buttons: {
        seating: {
            confirm: "button.button-click-addseating",
            departure: "a.button-click-outbound",
            return: "a.button-click-inbound",
            exit: "a.button-click-exitseating",
        }
    },

    popups: {
        invalidSeating: {
            home: "div.us-overlay",
            closeButton: "div.us-modal > span.close"
        }
    },

    pleaseWaitSpinner: "div.processing"
};


export class Seating {
    /**
     * @param myChoices {MyChoices}
     * @param progress {Progress}
     */
    constructor(myChoices, progress) {
        this.myChoices = myChoices;
        this.progress = progress;
    }


    /**
     * @param selector {string}
     * @returns {(function())}
     */
    _generateWaitForExistsMethod( selector ) {
        const _selector = selector;
        return ( reverse ) => {
            browser.waitForExist( _selector, 20000, reverse );
        };
    }


    /**
     * @param selector {string}
     * @returns {(function())}
     */
    _generateClickMethod( selector ) {
        const _selector = selector;
        return () => locateElementAndClickOnIt( _selector );
    };


    /**
     * @returns {{
     *     departure: { waitForExists: (function()) },
     *     return: { waitForExists: (function()) }
     * }}
     */
    get aircraft() {
        if ( ! this._aircraft ) {
            this._aircraft = {
                departure: {
                    waitForExists: this._generateWaitForExistsMethod( selectors.aircraft.departure )
                },
                return: {
                    waitForExists: this._generateWaitForExistsMethod( selectors.aircraft.return )
                }
            };
        }

        return this._aircraft;
    }


    confirmSeats() {
        browser.click( selectors.buttons.seating.confirm );
        this.spinner.waitForExists();
        this.spinner.waitUntilItDisappears();
    }


    /**
     * @returns {{
     *     departure: {{
     *         isVisibleWithinViewport: (function()),
     *         scrollTo: (function()),
     *         select: (function()),
     *         left: number,
     *         top: number
     *     }[][]},
     *
     *     return: {{
     *         isVisibleWithinViewport: (function()),
     *         scrollTo: (function()),
     *         select: (function()),
     *         left: number,
     *         top: number
     *     }[][]}
     */
    get seats() {
        if ( ! this._seats ) {
            this._seats = {
                /**
                 * @param filter {""|"adults"|"disabled"|"withExtraLegspace"|"infants"}
                 * @param properties {"all"|"empty"|"occupied"|"selected"}
                 * @param limit=20 {number}
                 * @param skip=200 {number} Number of initial seats to skip.
                 * @returns {{
                 *     isVisibleWithinViewport: (function()),
                 *     scrollTo: (function()),
                 *     select: (function()),
                 *     left: number,
                 *     top: number
                 * }[][]}
                 */
                departure: ( { filter="", properties="all", limit=20, skip=100 } ) => {
                    console.log(`filter: ${filter}, properties: ${properties}, limit: ${limit}, skip: ${skip}`);
                    const seats = new Seats( selectors.aircraft.departure, skip );
                    seats.filter = filter;
                    seats.properties = properties;
                    return seats.getSeats( limit );
                },

                /**
                 * @param filter {""|"adults"|"disabled"|"withExtraLegspace"|"infants"}
                 * @param properties {"all"|"empty"|"occupied"|"selected"}
                 * @param limit=20 {number}
                 * @param skip=200 {number} Number of initial seats to skip.
                 * @returns {{
                 *     isVisibleWithinViewport: (function()),
                 *     scrollTo: (function()),
                 *     select: (function()),
                 *     left: number,
                 *     top: number
                 * }[][]}
                 */
                return: ( { filter="", properties="all", limit=20, skip=100 } ) => {
                    console.log(`filter: ${filter}, properties: ${properties}, limit: ${limit}, skip: ${skip}`);
                    const seats = new Seats( selectors.aircraft.return, skip );
                    seats.filter = filter;
                    seats.properties = properties;
                    return seats.getSeats( limit );
                }
            };
        }

        return this._seats;
    }

    /**
     * @returns {{
     *     button: { click: (function()) },
     *     waitForExists: (function())
     * }}
     */
    get departure() {
        if ( ! this._departure ) {
            this._departure = {
                button: {
                    click: this._generateClickMethod(selectors.buttons.seating.departure )
                },
                waitForExists: this._generateWaitForExistsMethod( selectors.buttons.seating.departure ),
            };
        }

        return this._departure;
    }

    /**
     * @returns {{
     *     button: { click: (function()) },
     *     waitForExists: (function())
     * }}
     */
    get return() {
        if ( ! this._return ) {
            this._return = {
                button: {
                    click: this._generateClickMethod( selectors.buttons.seating.return ),
                },
                waitForExists: this._generateWaitForExistsMethod( selectors.buttons.seating.return ),
            };
        }

        return this._return;
    }

    /**
     * @returns {{
     *     button: { click: (function()) },
     *     waitForExists: (function())
     * }}
     */
    get exit() {
        if ( ! this._exit ) {
            this._exit = {
                button: {
                    click: this._generateClickMethod( selectors.buttons.seating.exit )
                },
                waitForExists: this._generateWaitForExistsMethod( selectors.buttons.seating.exit ),
            };
        }

        return this._exit;
    }

    /**
     * @returns {{
     *     button: { close: { click: (function()) }},
     *     isExisting: (function()),
     *     waitForExists: (function())
     * }}
     */
    get invalidSeatingChoicePopup() {
        if ( ! this._invalidSeatingChoicePopup ) {
            this._invalidSeatingChoicePopup = {
                button: {
                    close: { click: this._generateClickMethod( selectors.popups.invalidSeating.closeButton ) },
                },

                isExisting: () => { return browser.isExisting( selectors.popups.invalidSeating.home ); },
                waitForExists: () => { browser.waitForExist( selectors.popups.invalidSeating.home, 20000 ); }
            };
        }

        return this._invalidSeatingChoicePopup;
    }

    /**
     * @returns {{
     *     isExisting: (function()),
     *     waitForExists: (function()),
     *     waitUntilItDisappears: (function())
     * }}
     */
    get spinner() {
        if ( ! this._spinner ) {
            this._spinner = {
                isExisting: () => { return browser.isExisting( selectors.pleaseWaitSpinner ); },
                waitForExists: () => { browser.waitForExist( selectors.pleaseWaitSpinner, 20000 ); },

                waitUntilItDisappears: () => {
                    browser.waitUntil(
                        () => {
                            const display =
                                browser.getCssProperty( selectors.pleaseWaitSpinner, "display" );

                            return ! Array.isArray(display) && display.value && display.value.trim() === "none";
                        },
                        20000
                    );
                }
            };
        }

        return this._spinner;
    }

    /**
     * @returns {{
     *     aircraft: {
     *         departure: { waitForExists: (function()) },
     *         return: { waitForExists: (function()) }
     *     },
     *
     *     confirmSeats: (function()),
     *
     *     departure: {
     *         button: { click: (function()) },
     *         waitForExists: (function())
     *     },
     *
     *     return: {
     *         button: { click: (function()) },
     *         waitForExists: (function())
     *     },
     *
     *     exit: {
     *         button: { click: (function()) },
     *         waitForExists: (function())
     *     },
     *
     *     invalidSeatingChoicePopup: {
     *         button: { close: { click: (function()) }},
     *         isExisting: (function()),
     *         waitForExists: (function())
     *     },
     *
     *     spinner: {
     *         isExisting: (function()),
     *         waitForExists: (function()),
     *         waitUntilItDisappears: (function())
     *     }
     * }}
     */
    get seating() {
        if ( ! this._seating ) {
            this._seating = {
                aircraft: this.aircraft,
                confirmSeats: this.confirmSeats,
                departure: this.departure,
                return: this.return,
                exit: this.exit,
                invalidSeatingChoicePopup: this.invalidSeatingChoicePopup,
                spinner: this.spinner,
            };
        }

        return this._seating;
    }
}