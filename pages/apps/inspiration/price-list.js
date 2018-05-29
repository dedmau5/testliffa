import {
    getElement,
    getElements,
    getTextAsInteger
} from "../../../tools/elements";

import { Meals } from "./meals";

const selectors = {
    departFrom: `div.pricematrix__depature-dropdown > div`,
    travelLength: `div.pricematrix__stay-length > div`,
    departureDate: {
        input: `div.pricematrix__charter-departure-date > input`,
        picker: "div.durationPicker",
        next: "a.calButton.next",
        prev: "a.calButton.prev",
        dates: "div.month > table > tbody > tr > td > a[href='#']"
    },
    adults: `div.adults > div`,
    children: `div.children > div`,
    searchButton: ["div.update > input", "input[id$='_CharterPackageSearchButton']"],
    hasWarning: "div.msg-Warning",
    hasMessage: "div.msg-Information",
    totalPrice: "div[id$='_divTotalPriceContainer']",
    bookButton: "input[id$='_BookButton']"
};


class DropDownSelect {
    constructor( selector ) {
        this.selectors = {
            select: `${selector} > select`,
            choices: `${selector} > ul.custom-select-popup > li`,
            selectedChoice: `${selector} > ul.custom-select-popup > li.selected`
        };
    }

    /**
     * @returns {{name: string, value: number}}
     */
    get value() {
        const departFromElement = getElement( selectors.departFrom.selectedChoice );

        return {
            name: departFromElement.getText(),
            value: departFromElement.getAttribute("value")
        };
    }

    /**
     * @param value {number}
     */
    set value( value ) {
        getElement( selectors.departFrom.select ).setValue( value );
    }

    /**
     * @returns {{name: string, value: number}[]}
     */
    get choices() {
        return getElements( selectors.departFrom.choices ).map(
            ( choice ) => {
                return {
                    name: browser.elementIdText( choice.ELEMENT ),
                    value: parseInt( browser.elementIdAttribute( choice.ELEMENT, "value" ).value, 10 )
                };
            }
        );
    }
}


export class PriceList {
    constructor( ) {
        this._departFrom = new DropDownSelect( selectors.departFrom );
        this._travelLength = new DropDownSelect( selectors.travelLength );
        this._adults = new DropDownSelect( selectors.adults );
        this._children = new DropDownSelect( selectors.children );
    }

    get departFrom() { return this._departFrom; }
    get travelLength() { return this._travelLength; }
    get adults() { return this._adults; }
    get children() { return this._children; }

    get departureDate() {
        return getElement(selectors.departureDate.input).getValue();
    }

    set departureDate( value ) {
        throw new Error( "Not implemented!" );
    }

    /**
     * @returns {{open: Function, next: Function, prev: Function, dates: {select: Function}[]}}
     */
    get datepicker() {
        return {
            open: () => {
                getElement( selectors.departureDate.input ).click();
                browser.waitForExist( selectors.departureDate.picker, 15000 );
            },
            next: () => {
                getElement( selectors.departureDate.next ).click();
                browser.pause(250);
            },
            prev: () => {
                getElement( selectors.departureDate.prev ).click();
                browser.pause(250);
            },
            dates: getElements( selectors.departureDate.dates ).map(
                ( date ) => {
                    return {
                        select: () => { browser.elementIdClick( date.ELEMENT ); }
                    };
                }
            )
        };
    }

    /**
     * @returns {{click: Function}}
     */
    get searchButton() {
        this._urlBeforeSearch = browser.getUrl();

        browser.waitUntil(
            () => {
                return browser.isExisting( selectors.searchButton[0] ) || browser.isExisting( selectors.searchButton[1] );
            },
            5000
        );

        if ( browser.isExisting( selectors.searchButton[0] ) ) {
            return {
                click: getElement( selectors.searchButton[0] ).click
            };
        }

        return {
            click: getElement( selectors.searchButton[1] ).click
        };
    }

    waitForSearchToComplete() {
        if ( ! this._urlBeforeSearch ) {
            browser.waitUntil(
                () => {
                    return browser.getUrl() !== this._urlBeforeSearch;
                }
            );
            this._urlBeforeSearch = null;
        }
    }

    /**
     * @returns {Meals}
     */
    get meals() {
        if ( ! this._meals ) {
            this._meals = new Meals();
        }

        return this._meals;
    }

    /**
     * @returns {number}
     */
    get totalPrice() {
        if ( ! browser.isExisting( selectors.totalPrice ) ) {
            browser.waitForExist( selectors.totalPrice, 15000 );
        }

        switch ( browser.options.tc.language ) {
            case "dk":
                return getTextAsInteger(
                    selectors.totalPrice,
                    { treatAsPrice: true, removeStringFromBeginning: "Total pris " }
                );
            case "no":
                return getTextAsInteger(
                    selectors.totalPrice,
                    { treatAsPrice: true, removeStringFromBeginning: "Totalpris " }
                );
            case "fi":
            case "se":
            case "globe":
                return getTextAsInteger(
                    selectors.totalPrice,
                    { treatAsPrice: true, removeCharactersBeforeFirstColon: true }
                );
            default:
                throw new Error( "Not implemented!" );
        }
    }

    hasWarning() {
        return browser.isExisting( selectors.hasWarning );
    }

    hasMessage() {
        return browser.isExisting( selectors.hasMessage );
    }

    /**
     * @returns {{click: Function}}
     */
    get bookButton() {
        return {
            click: getElement( selectors.bookButton ).click,
        };
    }
}