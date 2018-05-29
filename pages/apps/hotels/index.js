import { Urls } from '../../../localization/urls';
import { replaceUrlWith } from '../../../tools';
import { locateElementAndClickOnIt } from '../../../tools/elements';
import { getElements } from '../../../tools/elements';
import { HotelFactory } from './hotel';


const selectors = {
    //hotelList: "div.hotel-list div.hotel-list--items > div.hotel-hit",
    //hotelInfo: "div.hotel-info div.hotel-list > div.hotel-list-item",
    charter: {
        hotelList: ".wdio-hotel.tcne-hotelhit__container"
    },
    independent: {
        hotelList: "#independent-flow .hotel-info .hotel-list-item"
    },

    // hotelInfo: "",
    // newHotelInfo: "div.new-hotel-list div.hit",
    // buttons: {
    //     showMoreHotels: "a.next-hotels-button"
    // },
    //loadingSpinner: "div.bounce-spinner"
};


export class Hotels {
    /**
     * @param {"charter"|"dynamic"|"hotelonly"} mode
     */
    constructor(mode) {
        this.mode = mode;
        this.hotelFactory = new HotelFactory(mode);
    }

    _getHotelsSelector() {
        let selectorToUse = "";

        browser.waitUntil(() => {
            if (browser.isExisting(selectors.charter.hotelList)) {
                selectorToUse = selectors.charter.hotelList;
                return true;
            }

            if (browser.isExisting(selectors.independent.hotelList)) {
                selectorToUse = selectors.independent.hotelList;
                return true;
            }

            return false;
        }, 60000);

        return selectorToUse;
    }

    /**
     * @param timeout {number}
     * Number of milliseconds to wait, for the finding the getHotels div and at least one hotel item.
     */
    waitForPageToLoad(timeout = 20000) {
        if (this.mode !== "hotelonly") {
            replaceUrlWith(
                Urls[this.mode].departureAndHotelList.old,
                Urls[this.mode].departureAndHotelList.new
            );
        }

        browser.waitUntil(() => {
            return (
                this.mode === 'dynamic' ?
                    browser.isExisting(selectors.independent.hotelList) :
                    browser.isExisting(selectors.charter.hotelList) /* || browser.isExisting(selectors.hotelInfo) || browser.isExisting(selectors.newHotelInfo)*/
            );
        }, timeout);
    }

    /**
     * @returns {{
     *     click: (function()),
     *     isVisible: (function())
     * }}
     */
    get showMoreHotels() {
        if (this._getHotelsSelector === selectors.newHotelInfo) {
            throw new Error("Not implemented for pages using selectors.newHotelInfo!");
        }

        return {
            click: () => {
                locateElementAndClickOnIt(selectors.buttons.showMoreHotels);
                browser.waitUntil(
                    () => { return !browser.isExisting(selectors.loadingSpinner); },
                    30000
                );
            },

            isVisible: () => {
                return browser.isVisible(selectors.buttons.showMoreHotels);
            },
        };
    }

    /**
     * @param maximum {number}
     * A maximum number of getHotels to retrieve information about.
     */
    getHotels(maximum = 5) {
        let hotels = getElements(this._getHotelsSelector());

        if (hotels && Array.isArray(hotels) && hotels.length > 0) {
            return Array.map(
                hotels.slice(0, maximum),
                (hotel) => {
                    return this.hotelFactory.createHotel(hotel);
                }
            );
        }

        return [];
    }
}