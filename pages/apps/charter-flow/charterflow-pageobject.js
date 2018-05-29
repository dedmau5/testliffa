import * as helpers from '../../../tools/elements';
import { StartPage } from '../../../pages/start-page';
import { BookingStart } from '../../../pages/apps/booking-start/index';
// import { header } from 'change-case';

function getInt(input) {
  return parseInt(input.replace(/\D/g, ''), 10);
}
class CharterFlow {
  constructor() {
    const charterflow = '#charterflow';
    this.selectors = {
      flightContainer: {},
      filterSlide: {
        title: '.webui-modal-header',
        buttons: {
          showHits: '.webui-modal-footer > div > div > div:nth-child(2) > button',
        },
      },
      sortPanel: {
        buttons: {
          toggleView: `${charterflow} .tcne-cf-sort-panel-container__toggle-view:nth-child(3)`,
          filter: `${charterflow} .tcne-cf-sort-panel-container__toggle-view:nth-child(2)`,
          sortDropdown: `${charterflow} .webui-list-box__select`,
          sortOption: `${charterflow} .webui-list-box__select > option`,
        },
      },
      hotelList: {
        container: `${charterflow} .tcne-cf-hotel-list-container`,
        hotelObject: `${charterflow} div.tcne-cf-hotel`,
        hotel: {
          // firstName: 'div:nth-child(1) > div > .webui-hotel-hit__content .webui-hotel-hit__text-panel > h3 > a',
          name: '.webui-hotel-hit__text-panel .webui-hotel-hit__text-panel-hotel-link',
          price: '.webui-hotel-hit__footer-panel-price-current .webui-price-formatter:nth-child(2)',
          priceNoDiscount: '.webui-hotel-hit__footer-panel-price-original-line-through',
          selectButton: 'div.webui-hotel-hit__footer-panel a.webui-button',
          customerGrade: '.webui-guest-rating__grade',
          ratingContainer: '.webui-rating--heart',
          rating: '.webui-rating__image',
          favoriteIcon: '.webui-favorite__heart',
          favoriteText: '.webui-favorite__status-text',
          favoriteTooltip: '.webui-tooltip__popover',
          priceDetailsLink: '.webui-link-text',
          priceDetails: {
            title: '.webui-modal-header__children',
            hotelname: '.price-details-text > h3',
            textInfo: '.table-price-text > .table-row',
            priceInfo: '.table-prices > .table-row',
            priceTotal: 'h3.right',
            closeButton: '.webui-modal-header__close',
          },
        },
        buttons: {
          more: `${charterflow} .tcne-cf-next-hotels .webui-button`,
        },
      },
      hotelMap: {
        container: `${charterflow} .tcne-cf-hotel-map-container`,
        closeMap: `${charterflow} .button__close`,
      },
    };
  }
  /**
   * @description Steps required to reach charter flow in an e2e environment (useful in before() declaration)
   * @param {any} year - Year for travelsearch.
   * @param {any} month - Month for travelsearch.
   * @param {any} day - Day for travelsearch.
   * @memberof CharterFlow
   */
  initiateCharterFlowFromBookingStart(year, month, day) {
    StartPage.open();
    BookingStart.waitUntilLoaded();
    BookingStart.waitUntilDataLoaded();
    BookingStart.package.datepicker.open();
    BookingStart.package.datepicker.selectDate(year, month, day, true);
    BookingStart.search.click();
    // browser.url('https://www.ving.se/boka-resa?QueryDepID=2788&QueryCtryID=-1&QueryAreaID=0&QueryResID=-1&QueryDepDate=20180715&QueryDur=8&CategoryId=2&QueryRoomAges=|42,42&QueryUnits=1');
    this.waitUntilLoaded();
  }

  /**
   * @description
   * @memberof CharterFlow
   */
  waitUntilLoaded() {
    browser.waitForVisible(this.selectors.hotelList.hotel.name, 30000);
    browser.waitForVisible(this.selectors.hotelList.hotel.price, 30000);
    browser.waitForVisible(this.selectors.hotelList.hotel.selectButton, 30000);
  }

  /**
   * @description Toggle between map and hotel-list view.
   * @param {string} target - Desired target view (hotelMap or hotelList).
   * @memberof CharterFlow
   */
  toggleView(target) {
    browser.click(this.selectors.sortPanel.buttons.toggleView);
    expect(browser.waitForVisible(this.selectors[target].container, 5000), `${target} view was not shown when clicking the toggle button`).to.be.true;
  }

  /**
   * @description Close the map by clicking the close button
   * @memberof CharterFlow
   */
  closeMap() {
    browser.waitForExist(this.selectors.hotelMap.closeMap, 4000);
    browser.click(this.selectors.hotelMap.closeMap);
    expect(browser.waitForVisible(this.selectors.hotelList.container, 5000), 'Hotel list view was not shown when closing the map').to.be.true;
  }

  /**
   * @description Changes the sorting of the hotel list.
   * @param {int} index - Matches the different choises in the sort dropdown (accepted values: 1, 2, 3, 4, 5).
   * @memberof CharterFlow
   */
  sortList(index) {
    browser.click(this.selectors.sortPanel.buttons.sortDropdown);
    browser.pause(500);
    browser.click(`${this.selectors.sortPanel.buttons.sortOption}:nth-child(${index})`);
  }

  /**
   * @description Evaluates the sorting order of hotel list.
   * @param {string} type - What parameter to sort the list by. String value needs to match object in constructor (this.selectors.hotelList.hotel).
   * @param {string} order - Expected sorting order. Ascending or descending.
   * @memberof CharterFlow
   */
  verifyListOrder(type, order) {
    const operator = {
      ascending: (a, b) => a <= b,
      descending: (a, b) => a >= b,
    };
    browser.waitForVisible(this.selectors.hotelList.hotel[type]);
    browser.pause(2000);
    const typeList = browser.getText(this.selectors.hotelList.hotel[type]);
    for (let x = 0; x < $$(this.selectors.hotelList.hotelObject).length - 1; x += 1) {
      expect(
        operator[order](getInt(typeList[x]), getInt(typeList[x + 1])),
        `list not sorted by ${type} in ${order} order.`
      ).to.be.true;
    }
  }

  /**
   * @description Verifies that hotel list is sorted by standard, descending
   * @memberof CharterFlow
   */
  verifyStandardOrder() {
    function getHearts(input) {
      return parseInt(input.getAttribute('class').split('-').pop(), 10);
    }
    browser.waitForVisible(this.selectors.hotelList.hotel.rating);
    browser.pause(1000);
    const standardContainer = helpers.getElements(this.selectors.hotelList.hotel.ratingContainer);
    const standard = helpers.getElements(this.selectors.hotelList.hotel.rating);
    for (let x = 0; x < $$(this.selectors.hotelList.hotelObject).length - 1; x += 1) {
      if (standardContainer[x + 1].getAttribute('class').includes('plus') && !standardContainer[x].getAttribute('class').includes('plus')) {
        expect(getHearts(standard[x]), 'List not sorted after rating, decending order').to.be.above(getHearts(standard[x + 1]));
      } else {
        expect(getHearts(standard[x]), 'List not sorted after rating, decending order').to.be.at.least(getHearts(standard[x + 1]));
      }
    }
  }

  /**
   * @description returns number of hotels in list
   * @memberof CharterFlow
   */
  get hotelListLength() {
    return helpers.getElements(this.selectors.hotelList.hotelObject).length;
  }

  getHotelElement(hotelNr, content) {
    return `${this.selectors.hotelList.hotelObject}:nth-child(${hotelNr}) ${this.selectors.hotelList.hotel[content]}`;
  }

  clickHotelElement(hotelNr, element) {
    browser.scroll(this.getHotelElement(hotelNr, element), 0, -300);
    browser.click(this.getHotelElement(hotelNr, element));
    return {
      name: browser.getText(this.getHotelElement(hotelNr, 'name')),
      price: getInt(browser.getText(this.getHotelElement(hotelNr, 'price'))),
    };
  }

  /**
   * @description Clicks the 'more'-button in hotel list view and verifies that list size is increased
   * @memberof CharterFlow
   */
  clickMoreButton() {
    const listLength = this.hotelListLength;
    browser.click(this.selectors.hotelList.buttons.more);
    browser.waitUntil(() => this.hotelListLength > listLength, 10000, 'Hotel list not longer after clicking "More hotels"-button', 500);
  }

  openFilterView() {
    browser.click(this.selectors.sortPanel.buttons.filter);
    this.waitUntilLoaded();
    expect(browser.waitForVisible(this.selectors.filterSlide.title, 5000), 'Filter slide-in menu not shown when pressing the filter button').to.be.true;
  }

  compareFilterHitsToHotelListLength() {
    function getButtonNumber() {
      return getInt(browser.getText('.webui-modal-footer > div > div > div:nth-child(2) > button'));
    }
    browser.waitUntil(
      () => getButtonNumber() === this.hotelListLength, 10000,
      `Number of hits (${getButtonNumber()}) not equal to number of hotels in list (${this.hotelListLength})`, 500
    );
  }

  setFavourite(hotelNr, bool) {
    this.clickHotelElement(hotelNr, 'favoriteIcon');
    const favoriteText = bool ? 'Sparad' : 'Spara';
    browser.waitUntil(() => browser.getText(this.getHotelElement(hotelNr, 'favoriteText')) === favoriteText, 5000, `Incorrect text, not updated to ${favoriteText}`, 500);
    expect(browser.isVisible(this.getHotelElement(hotelNr, 'favoriteTooltip')), `Expected the visibility of the tooltip box to be ${bool}`).to.equal(bool);
    expect(
      helpers.getElement(this.getHotelElement(hotelNr, 'favoriteIcon')).getAttribute('class').includes('webui-favorite__heart--isFavorite'),
      'Favorite icon has incorrect state'
    ).to.equal(bool);
  }

  openPriceDetails(hotelNr) {
    const hotel = this.clickHotelElement(hotelNr, 'priceDetailsLink');
    browser.waitForVisible(this.selectors.hotelList.hotel.priceDetails.priceTotal, 5000);
    expect(browser.waitForVisible(this.selectors.hotelList.hotel.priceDetails.title, 5000), 'Price-details popup not shown').to.be.true;
    return hotel;
  }

  closePriceDetails() {
    browser.click(this.selectors.hotelList.hotel.priceDetails.closeButton);
    browser.waitUntil(() => !browser.isVisible(this.selectors.hotelList.hotel.priceDetails.title), 5000, 'Price details not closed', 500);
  }

  verifyPriceDetails(hotel) {
    let total = 0;
    expect(getInt(browser.getText(this.selectors.hotelList.hotel.priceDetails.priceTotal)), 'price in popup does not match price in list').to.equal(hotel.price);
    const priceList = browser.getText(`${this.selectors.hotelList.hotel.priceDetails.priceInfo} > .amount-price-total`);
    const priceType = browser.getText(`${this.selectors.hotelList.hotel.priceDetails.priceInfo} > .title`);
    for (let x = 0; x < $$(this.selectors.hotelList.hotel.priceDetails.priceInfo).length; x += 1) {
      if (!priceType[x].includes('(redan avdragen)')) {
        if (priceList[x].charAt(0) === '-') {
          total -= getInt(priceList[x]);
        } else {
          total += getInt(priceList[x]);
        }
      }
    }
    expect(total, 'sum of costs not the same as total price in popup').to.equal(hotel.price);
  }

  verifyPriceDetailsInfo(hotel, travelers, departureAirport) {
    const referenceInfoTitles = ['resenärer:', 'rumstyp:', 'måltider:', 'avreseflygplats:', 'avresa:', 'reslängd:'];
    expect(browser.getText(this.selectors.hotelList.hotel.priceDetails.hotelname), 'Hotel name in popup is not the same as hotel name in list').to.equal(hotel.name);
    const hotelInfoTitles = browser.getText(`${this.selectors.hotelList.hotel.priceDetails.textInfo} > div:nth-child(1)`);
    const hotelInfo = browser.getText(`${this.selectors.hotelList.hotel.priceDetails.textInfo} > div:nth-child(2)`);
    for (let x = 0; x < $$(this.selectors.hotelList.hotel.priceDetails.textInfo).length; x += 1) {
      expect(hotelInfoTitles[x].toLowerCase(), 'Info not matching reference info').to.equal(referenceInfoTitles[x]);
      expect(hotelInfo[x].length, `No ${hotelInfoTitles[x]} information`).to.be.above(0);
    }
    expect(hotelInfo[0], 'Incorrect travelers').to.equal(travelers);
    expect(hotelInfo[3], 'Incorrect departure airport').to.equal(departureAirport);
  }

  scrollToBottom() {
    browser.waitForVisible(this.selectors.hotelList.buttons.more);
    browser.scroll(this.selectors.hotelList.buttons.more, -0, -300);
    browser.pause(1000);
  }
  verifyPriceDetailsForAllHotels() {
    let hotel;
    for (let x = 1; x <= $$(this.selectors.hotelList.hotelObject).length; x += 1) {
      hotel = this.openPriceDetails(x);
      this.verifyPriceDetails(hotel);
      this.verifyPriceDetailsInfo(hotel, '2 vuxna', 'Stockholm-Arlanda');
      this.closePriceDetails();
    }
  }
}

/**
 * @type {CharterFlow}
 */
export default new CharterFlow();
