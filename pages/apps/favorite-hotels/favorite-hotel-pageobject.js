import {getElement, getElements} from 'tools/elements';

/*
* Pageobject for the favorite-hotel app. NOTE: Favorite-heart has it's own pageobject.
*/

class FavoriteHotel {
    constructor() {
        const favoriteHotel = '#app';

        this.selectors = {
            home: favoriteHotel + ' > div > .fh-header' ,

            topPanel: {
                header: `${favoriteHotel} .fh-header`,
                counterValue: `${favoriteHotel} h2 > span`,
                mapIcon: `${favoriteHotel} .tcneicon-map`,
                listIcon: `${favoriteHotel} .tcneicon-list`,
                sortingList: `${favoriteHotel} .sort-control`,
            },

            hotelList: {
                elements: `${favoriteHotel} .fh-hotel`,
                firstHotelNameInList: `${favoriteHotel} li:nth-child(1) .fh-hotel__header > a`,
                selectbutton: `.button.primary`,
                deleteFirst: `${favoriteHotel} .fh-hotel:nth-child(1) .fh-hotel__remove`,
                deleteButton: `${favoriteHotel} .fh-hotel__remove`,
                hotelConcept: {
                    image: `${favoriteHotel} .fh-hotel-image__inner`,
                    banner: `${favoriteHotel} .fh-hotel-image__product-banner`,
                    overlay: `${favoriteHotel} .fh-hotel-image-overlay`,
                    header: `${favoriteHotel} .fh-hotel-image__center span div div`,
                    items: `${favoriteHotel} .fh-hotel-image__center ul`,
                    closeButton: `${favoriteHotel} .fh-hotel-image-overlay__closer`,
                },
                priceDetails: {
                    link: `${favoriteHotel} .fh-price__details.link`,
                    title: `${favoriteHotel} .fh-price-info__title`,
                    hotelName: `${favoriteHotel} .fh-price-info__trip-details h3`,
                    image: `${favoriteHotel} .fh-overlay img`,
                    tripDetailsTable: `${favoriteHotel} .fh-price-info__trip-details-table`,
                    tripDetailsRow: `${favoriteHotel} .fh-price-info__trip-details-table`,
                    totalPrice: `${favoriteHotel} .fh-price-info__total-price-table-cell.fh-price-info__total-price-table-cell--amount`,
                    closeButton: `${favoriteHotel} .fh-overlay a span`,
                },
            },
        };
    }

    browseTo() {
        browser.url(this._url());
        this.waitForPageToLoad();
    }

    waitForPageToLoad() {
        browser.waitForExist(this.selectors.home, 30000);
    }

    _url() {
        return "/favorithotell";
    }

    _mapButton() {
        browser.waitForExist(this.selectors.topPanel.mapIcon, 15000);
    }

    _sortingList() {
        browser.waitForExist(this.selectors.topPanel.sortingList, 15000);
    }

    _getHotelConcept(index) {
        return this._hotelByIndex(index).element(this.selectors.hotelList.hotelConcept.banner);
    }

    _getPriceSpec(index) {
        return this._hotelByIndex(index).element(this.selectors.hotelList.priceDetails.link);
    }

    _returnValue() {
        let counterValue = browser.getText(this.selectors.topPanel.counterValue);
        counterValue = counterValue.replace(/[^\d.]/g, '');
        counterValue = Number(counterValue);
        return counterValue;
    }

    _returnHeaderText() {
        return browser.getText(this.selectors.topPanel.header);
    }

    _hotelList() {
        return getElements(this.selectors.hotelList.elements);
    }

    _hotelByIndex(index) {
        return getElement(".fh-hotel:nth-child(" + index + ")");
    }

    _getHotelNameByIndex(index) {
        return browser.getText('li:nth-child('+ index +') .fh-hotel__header-link');
    }

    _deleteButtonByIndex(index) {
        return this._getHotelNameByIndex(index).element(this.selectors.hotelList.deleteButton);
        //return browser.element(".fh-hotel__remove");
    }

    _selectButton(index) {
        return this._getHotelNameByIndex(index).element(this.selectors.hotelList.selectbutton);
    }

    _clickOnHotelConcept(index) {
        this._getHotelConcept(index).click();
    }

    _clickOnLinkByIndex(index) {
        this._getPriceSpec(index).waitForExist(30000);
        return this._getPriceSpec(index).click();
    }

    _waitForLayerToExist() {
        browser.waitForExist(this.selectors.hotelList.priceDetails.title, 15000);
    }

    _getHotelName() {
        return browser.getText(this.selectors.hotelList.priceDetails.hotelName);
    }

    _waitForImageToExist() {
        browser.waitForExist(this.selectors.hotelList.priceDetails.image, 15000);
    }

    _waitForTripDetailsTableToExist() {
        browser.waitForExist(this.selectors.hotelList.priceDetails.tripDetailsTable, 15000);
    }

    _waitForTripDetailsRowsToExist() {
        for (let i = 1; i < getElements(this.selectors.hotelList.priceDetails.tripDetailsRow).length + 1; i++) {
            let selector = ':nth-child('+ i +') ' + this.selectors.hotelList.priceDetails.tripDetailsRow;
            browser.waitForExist(selector, 15000);

            expect(selector).to.be.a('string');
            expect(selector).to.not.be.a('null');
            expect(selector).to.not.be.an('undefined');
        }
    }

    _waitForTotalpriceToExist() {
        return browser.waitForExist(this.selectors.hotelList.priceDetails.totalPrice, 15000);
    }

    _closePriceSpec() {
        browser.click(this.selectors.hotelList.priceDetails.closeButton);
    }

    _getHotelConceptLayer() {
        browser.waitForExist(this.selectors.hotelList.hotelConcept.overlay, 10000);
        browser.pause(500);
    }

    _getHotelConceptHeader() {
        browser.waitForExist(this.selectors.hotelList.hotelConcept.header, 10000);
        browser.pause(500);
    }

    _getHotelConceptItems() {
        browser.waitForExist(this.selectors.hotelList.hotelConcept.items, 10000);
        browser.pause(500);
    }
    _closeHotelConceptLayer() {
        browser.click(this.selectors.hotelList.hotelConcept.closeButton).pause(1000);
    }

    _deleteFirst() {
        browser.click(this.selectors.hotelList.deleteFirst);

        browser.waitUntil( () => {
            return this.topPanel.counter.returnValue() === 0
        }, 5000, "Expected counter to be 1");
    }

    get topPanel() {
        return {
            returnText: () => this._returnHeaderText(),
            counter: {
                returnValue: () => this._returnValue(),
            },
            mapButton: () => this._mapButton(),
            sortingList: () => this._sortingList(),

        };
    }

    get hotels() {
        return {
            hotelList: () => this._hotelList(),
            hotelByIndex: (index) => this._hotelByIndex(index),
            getHotelNameByIndex: (index) => this._getHotelNameByIndex(index),
            selectButton: (index) => this._selectButton(index),
            deleteFirst: () => this._deleteFirst(),
            deleteButtonByIndex: (index) => this._deleteButtonByIndex(index),
            clickOnHotelConcept: (index) => this._clickOnHotelConcept(index),
            priceDetails: {
                clickOnLinkByIndex: (index) => this._clickOnLinkByIndex(index),
                waitForLayerToExist: () => this._waitForLayerToExist(),
                getHotelName: () => this._getHotelName(),
                waitForImageToExist: () => this._waitForImageToExist(),
                waitForTotalpriceToExist: () => this._waitForTotalpriceToExist(),
                waitForTripDetailsTableToExist: () => this._waitForTripDetailsTableToExist(),
                waitForTripDetailsRowsToExist: () => this._waitForTripDetailsRowsToExist(),
                closePriceSpec: () => this._closePriceSpec(),

            },
            hotelConceptz: {
                getHotelConceptLayer: () => this._getHotelConceptLayer(),
                getHotelConceptHeader: () => this._getHotelConceptHeader(),
                getHotelConceptItems: () => this._getHotelConceptItems(),
                closeHotelConceptLayer: () => this._closeHotelConceptLayer(),
            },
        };
    }

}

export default new FavoriteHotel();