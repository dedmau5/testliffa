import {
    locateElementAndClickOnIt,
} from '../../../tools/elements';

export class BasicFunctionality {

    /**
     * Creates an instance of BasicFunctionality.
     * 
     * 
     * @memberOf BasicFunctionality
     */
    constructor() {
        this.selectors = {
            overlay: 'div.select-overlay',
            close: 'div.select-overlay__close-button',
            outside: 'div.product-selector'
        };
    }


    /**
     * Opens the overlay
     * 
     * @param {string} selector
     * 
     * @memberOf BasicFunctionality
     */
    open(selector) {
        locateElementAndClickOnIt(selector);
    }

    /**
     * Checks if the overlay is open
     */
    isOverlayAllreadyOpen() {
        return browser.isVisible(this.selectors.overlay);
    }

    /**
     * Closes the overlay
     */
    close() {
        locateElementAndClickOnIt(this.selectors.close);
    }

    /**
     * Clicks outside of the layover so it will close
     */
    clickOutsideOfLayover() {
        throw { name: "NotImplementedError", message: "function not implemented yet" };
    }
}