import { selectors } from './selectors';

import { Urls } from '../../../localization/urls';
import {
    getInnerHTMLAsInteger,
    getElementWithinElement,
    getElementAttribute
} from '../../../tools/elements';


export class HotelFactory {
    constructor( mode ) {
        if ( mode !== "charter" && mode !== "dynamic" && mode !== "hotelonly" ) {
            throw new Error( `Unknown mode: ${mode}!` );
        }

        this.hotelPageUrl = {
            old: mode === "hotelonly" ? "" : Urls[mode].hotelPage.old,
            new: mode === "hotelonly" ? "" : Urls[mode].hotelPage.new
        };
    }

    createHotel( hotelWebElementJSONObject ) {
        let hotel = new Hotel( hotelWebElementJSONObject );

        hotel.selectors = selectors;
        hotel.hotelPageUrl = this.hotelPageUrl;

        return hotel;
    }
}


class Hotel {
    constructor( hotelWebElementJSONObject ) {
        this.webElementJSONObject = hotelWebElementJSONObject;
    }

    _selectorDetection() {
        if ( ! this._selectors ) {
            if ( browser.isExisting(selectors.hotelHit.infoPanel ) ) {
                this._selectors = selectors.hotelHit;
            }

            else if ( browser.isExisting(selectors.hotelInfo.infoPanel ) ) {
                this._selectors = selectors.hotelInfo;
            }

            else if ( browser.isExisting(selectors.newHotelInfo.infoPanel ) ) {
                this._selectors = selectors.newHotelInfo;
            }
        }
    }

    /**
     * @returns {string}
     */
    get name() {
        this._selectorDetection();

        if ( !this._name ) {
            this._name = getElementWithinElement(
                this.webElementJSONObject,
                this._selectors.name
            ).getText();
        }

        return this._name;
    }

    /**
     * @returns {number}
     */
    get price() {
        this._selectorDetection();

        if ( !this._price ) {
            this._price = getInnerHTMLAsInteger(
                getElementWithinElement(
                    this.webElementJSONObject,
                    this._selectors.price
                ).value,
                { treatAsPrice: true }
            );
        }

        return this._price;
    }

    /**
     * @returns {string}
     */
    get concept() {
        this._selectorDetection();

        if ( !this._concept ) {
            const element = getElementWithinElement(
                this.webElementJSONObject,
                this._selectors.concept
            );

            this._concept = getElementAttribute( element.value, "class" )
                .replace( "tcne-concept__badge ", "" )
                .replace( "tcne-concept__badge--", "" ).toLowerCase();
        }

        return this._concept;
    }

    /**
     * @returns {{
     *     click: Function
     * }}
     */
    get chooseButton() {
        this._selectorDetection();

        return {
            click: () => {
                this.name;
                this.price;

                const chooseButtonID = getElementWithinElement(
                    this.webElementJSONObject,
                    this._selectors.chooseButton
                ).value.ELEMENT;

                this._patchChooseButtonURL( chooseButtonID );
                browser.elementIdClick( chooseButtonID );
            }
        };
    }

    /**
     * Patches the choose button's href address to make sure the test always proceeds to the the new app.
     *
     * @param chooseButtonID {string} WebElement JSON object ID.
     * @private
     */
    _patchChooseButtonURL( chooseButtonID ) {
        const url = browser.elementIdAttribute( chooseButtonID, "href" ).value;

        browser.execute(
            function ( chooseButtonSelector, url, oldURL, newURL ) {
                document.querySelector( chooseButtonSelector ).href = url.replace(
                    oldURL,
                    newURL
                );
            },
            this._selectors.chooseButton,
            url,
            this.hotelPageUrl.old,
            this.hotelPageUrl.new
        );
    }
}