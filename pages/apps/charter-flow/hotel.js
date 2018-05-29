import * as helpers from '../../../tools/elements';

/**
 * Pageobject for the hotellist in charterflow
 * 
 * @class Hotel
 */
class Hotel {
    constructor(element) {
        this._element = element;

        this.selectors = {
            firstName: 'div:nth-child(1) > div > .webui-hotel-hit__content .webui-hotel-hit__text-panel > h3 > a',
            name: '.webui-hotel-hit__text-panel .webui-hotel-hit__text-panel__hotel__link',
            price: '.webui-hotel-hit__footer-panel__price__current .webui-price-formatter',
            selectButton: 'div.webui-hotel-hit__footer-panel a.webui-button',
        };
    }

    waitForPageToLoad() {
        browser.waitForExist(this.selectors.selectButton, 45000);
    }

    /**
     * Get the price of the hoteloffer
     * @returns {string}
     * @readonly
     * @memberof Hotel
     */
    get price() {
        if (!this._price) {
            const element = helpers.getElementWithinElement(this._element, this.selectors.price);
            this._price = helpers.getInnerHTMLAsInteger(element.value, { treatAsPrice: true });
        }
        return this._price;
    }

    /**
     * Select a hotel from the array created on index.js
     * 
     * @memberof Hotel
     */
    select() {
      const element = helpers.getElementWithinElement(this._element, this.selectors.selectButton);
      browser.elementIdClick(element.value.ELEMENT);
    }

    /**
     * something strange...@stefan.jansson 
     * 
     * @memberof Hotel
     */
    click() {
        browser.click(this.selectors.selectButton);
    }
}

export default Hotel;