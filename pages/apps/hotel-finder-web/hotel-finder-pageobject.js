import { getElements } from '../../../tools/elements';
import { Translate } from '../../../tools';
import PageBase from '../../page-base.js';

const selectors = {
  facets: '#facets',
  HotelSelectButton: '.hotel-navigate',
  searchBox: '.period-pax-content-wrapper',
};

class _HotelFinderWebPage extends PageBase {
  constructor() {
    super();
    this.selectors = {
      home: '.textpush__header',
      hotelfinderHeart: {
        empty: `li:nth-child(1) .hotel-body .big-web .heart-icon-empty`,
        filled: 'li:nth-child(1) .hotel-body .big-web .heart-icon-filled',
        popupLink: `div.ow-popover.ng-scope.top > div > div > a`,
      },
    };
  }

  /**
   * @returns {{waitForExists: (function(number=))}}
   */
  get searchBox() {
    return {
      /**
       * @param {number} timeout=30000
       */
      waitForExists: (timeout = 30000) => {
        browser.waitForExist(selectors.searchBox, timeout);
      },
    };
  }

  navigateTo() {
    browser.url(
      browser.getUrl() +
        Translate({
          dk: 'find-dit-hotel',
          fi: 'lomahaku',
          no: 'finn-hotell',
          se: 'hitta-hotell',
        })
    );
  }

  waitUntilLoaded() {
    this.searchBox.waitForExists();
  }

  get hotelName() {
    return browser.getText(
      'li:nth-child(1) > div.hotel-body > div.hotel-description-wrapper > div.title-wrapper > h3 > a'
    );
  }

  get emptyHeart() {
    return browser.element(
      'li:nth-child(1) > div.hotel-body > div.hotel-description-wrapper > div.favorite-wrapper.big-web.ng-scope > div.save-hotel-list-content.heart-icon.heart-icon-empty'
    );
  }

  get firstEmptyHeart() {
    browser.waitForExist('.big-web .heart-icon-empty', 15000);
    return getElements('.big-web .heart-icon-empty')[0];
  }

  get filledHeart() {
    return browser.element(
      'li:nth-child(1) .hotel-body .big-web.ng-scope .heart-icon-filled'
    );
  }

  get counter() {
    let counterValue = browser.getText(
      'div.ow-popover.ng-scope.top > div > div > p'
    );
    counterValue = counterValue.replace(/[^\d.]/g, '');
    counterValue = Number(counterValue);
    return counterValue;
  }

  get popupLink() {
    return browser.element('div.ow-popover.ng-scope.top > div > div > a');
  }

  clickOnPopupLink() {
    browser.click('div.ow-popover.ng-scope.top > div > div > a');
  }

  get url() {
    return '/hitta-hotell';
  }

  browseTo() {
    browser.url(this.url);
    this.WaitUntilPageLoaded();
  }

  WaitUntilTextSave() {
    browser.waitUntil(
      () => {
        return (
          'Spara' ===
          browser.getText(
            'div.hotelList > li:nth-child(1) > div.hotel-body > div.hotel-description-wrapper > div.favorite-wrapper.big-web.ng-scope > div.favorite-text.ng-binding'
          )
        );
      },
      5000,
      'expected text to change within 5s'
    );
  }

  WaitUntilTextSaved() {
    browser.waitUntil(
      () => {
        return (
          'Sparad' ===
          browser.getText(
            'div.hotelList > li:nth-child(1) > div.hotel-body > div.hotel-description-wrapper > div.favorite-wrapper.big-web.ng-scope > div.favorite-text.ng-binding'
          )
        );
      },
      5000,
      'expected text to change within 5s'
    );
  }

  WaitUntilPageLoaded() {
    browser.waitForExist(this.selectors.home, 30000);
  }
}

/**
 * @type {_HotelFinderWebPage}
 */
export const HotelFinderWebPage = new _HotelFinderWebPage();
//export default new HotelFinderWebPage = _HotelFinderWebPage();
