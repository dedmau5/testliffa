// import {
//     locateElementAndClickOnIt,
//     setElementValue,
//     getElement,
//     checkIfSelectorReturnedAnElement
// } from '../../../tools/elements';

import { BasicFunctionality } from './basic-functionality';

/**
 * The duration component of the Bookingstart app
 * 
 * @export
 * @class CommonDuration
 * @extends {BasicFunctionality}
 */
export class CommonDuration extends BasicFunctionality {
    /**
     * Creates an instance of CommonDuration.
     * 
     * @param {string} selector
     */
    constructor(selector) {
        super();

        this.selectors.home = `div.bookingstart-section__duration-select`;
        this.selectors.headers = 'div.duration-select__category-header';
        this.selectors.list = {
            home: 'duration-select',
            items: 'div.duration-select div.duration-select__item'
        };
        this.selectors.overlay = 'div.bookingstart-section__duration-select div.select-overlay';
        this.selectors.classic = '';
        this.selectors.dynamic = '';
    };


    /**
     * Get all the duration options. Options for charter as well as for independent.
     * 
     * @readonly
     */
    get options() {
        return browser.elements(this.selectors.list.items).value;
    }



    /**
     * Opens the departure menu.
     */
    open(selector) {
        super.open(this.selectors.home);
        browser.waitForExist(this.selectors.close, 30000);
    }

    /**
     * Check if duration section exists
     * 
     * @returns {boolean}
     */
    isExisting() {
        let exists = false;
        exists = browser.waitUntil(() => {
            return browser.isExisting(this.selectors.home) === true;
        }, 3000);
        
        return exists;
    }

    /**
     * Check if duration section should exist.
     * 
     * @returns {boolean}
     */
    shouldBeExisting() {
        const noDurationField =  browser.element('.bookingstart-section.bookingstart-section--no-duration-field');  
        return noDurationField.value === null;
    }

    /**
     * Header object
     * 
     * @readonly
     */
    get header() {
        const self = this;

        const _dynamicIsExisting = () => {
            const headerTypes = browser.getAttribute(self.selectors.headers, 'data-wdio-header-type');
            const doExist = headerTypes.some(element => element === 'independent');
            return doExist;
        };

        const _charterIsExisting = () => {
            const headerTypes = browser.getAttribute(self.selectors.headers, 'data-wdio-header-type');
            
            let exists;
            Array.isArray(headerTypes) ? 
                exists = headerTypes.some(element => element === 'charter') :
                exists = headerTypes === 'charter';
            
            return exists;
        };

        return {
            charterIsExisting: _charterIsExisting,
            dynamicIsExisting: _dynamicIsExisting
        };
    }

    /**
     * Method for selecting wanted duration option
     * 
     * @param {any} value
     * @returns {boolean}
     */
    select(value) {
        debugger;
        const wdioElement = this.options.find(element => {
            const text = browser.elementIdText(element.ELEMENT).value;
            return text.includes(value);
        });

        if (wdioElement === undefined) {
            debugger;
            return false;
        }

        wdioElement.click();
        debugger;
        return true;
    }

    /**
     * 
     * @returns {boolean}
     */
    selectRandom() {
        const
            randomNumber = Math.floor(Math.random() * this.options.length),
            wdioElement = this.options.find(element, index => index === randomNumber);

        wdioElement.click();
        return true;
    }


    /**
     * Check if duration menu is open
     * 
     * @returns {boolean}
     */
    isDurationMenuAlreadyOpen() {
        return browser.isVisible(this.selectors.overlay);
    }
}