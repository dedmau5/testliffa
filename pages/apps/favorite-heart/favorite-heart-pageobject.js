import FavoriteHotel from '../../../pages/apps/favorite-hotels/favorite-hotel-pageobject';

/*
* Pageobject for the favorite-heart component, not the favorite-hotel page
*/

class FavoriteHeart {
    constructor() {
        const charterflow = '#charterflow';
        const independentflow = '#independent-flow';
        const hotelweb = '#hotelpage';
        const hotelfinder = '#hotels';

        this.selectors = {

            charterflow: {
                heart: {
                    icon: `${charterflow} .webui-favorite__heart`,
                    text: `${charterflow} :nth-child(1) > .webui-hotel-hit .webui-favorite__status-text`,
                },
                popup: {
                    container: ``,
                    counter: ``,
                    url: ``
                },
            },

            independentflow: {
                heart: {
                    icon: `${independentflow} .tcne-favorite__heart`,
                    text: `${independentflow} :nth-child(1) > .hotel-info-panel .tcne-favorite__status-text`,
                },
                popup: {
                    container: ``,
                    counter: ``,
                    url: ``
                },
            },

            hotelweb: {
                heart: {
                    icon: `${hotelweb} .webui-favorite__heart`,
                    text: `${hotelweb} .webui-favorite__status-text`
                },
                popup: {
                    container: `${hotelweb} .webui-tooltip__popover`,
                    counter: `${hotelweb} .webui-tooltip__popover > div`,
                    url: `${hotelweb} .webui-link`
                },
            },

            hotelfinder: {
                heart: {
                    icon: `${hotelfinder} li:nth-child(1) .hotel-description-wrapper .heart-icon`,
                    text: `${hotelfinder} li:nth-child(1) .hotel-description-wrapper .favorite-text`,
                },
                popup: {
                    container: `${hotelfinder} .popover-content`,
                    counter: `${hotelfinder} .popover-text`,
                    url: `${hotelfinder} .popover-content a`
                },
            },
        };
    }

    _waitForHeartToLoadInCharterflow() {
        browser.waitForExist(this.selectors.charterflow.heart.icon, 30000);
    }

    _waitForHeartToLoadInIndependentFlow() {
        browser.waitForExist(this.selectors.independentflow.heart.icon, 30000);
    }

    _waitForHeartToLoadInHotelWeb() {
        browser.waitForExist(this.selectors.hotelweb.heart.icon, 30000);
    }

    _waitForHeartToLoadInHotelFinder() {
        browser.waitForExist(this.selectors.hotelfinder.heart.icon, 30000);
    }

    _clickOnHeartAndExpectTextToBeInHotelFinder(text) {
        browser.click(this.selectors.hotelfinder.heart.icon);

        browser.waitUntil(() => {
            return browser.getText(this.selectors.hotelfinder.heart.text) == text
        }, 15000, 'Hotelfinder-hotel did not get favorized');
    }

    _clickOnHeartAndExpectTextToBeInHotelWeb(text) {
        browser.click(this.selectors.hotelweb.heart.icon);

        browser.waitUntil(() => {
            return browser.getText(this.selectors.hotelweb.heart.text) == text
        }, 15000, 'Hotelweb-hotel did not get favorized');
    }

    _clickOnHeartAndExpectTextToBeInCharterFlow(text) {
        browser.click(this.selectors.charterflow.heart.icon);

        browser.waitUntil(() => {
            return browser.getText(this.selectors.charterflow.heart.text) == text
        }, 15000, 'Charterflow-hotel did not get favorized');
    }

    _clickOnHeartAndExpectTextToBeInIndendentFlow(text) {
        browser.click(this.selectors.independentflow.heart.icon);

        browser.waitUntil(() => {
            return browser.getText(this.selectors.independentflow.heart.text) == text
        }, 15000, 'Independentflow-hotel did not get favorized');
    }

    _waitForTextInIndendentFlowToBe(text) {
        browser.waitUntil(() => {
            return browser.getText(this.selectors.independentflow.heart.text) === text
        }, 15000, 'Charterflow-hotel did not get favorized');
    }

    _canViewPopupInHotelWeb() {
        browser.waitForExist(this.selectors.hotelweb.popup.container, 15000);
    }

    _canSeeCounterValueInHotelWeb() {
        return browser.getText(this.selectors.hotelweb.popup.counter);
    }

    _clickOnPopupUrlInHotelWeb() {
        browser.click(this.selectors.hotelweb.popup.url);
        FavoriteHotel.home.waitForPageToLoad();
    }

    _canViewPopupInHotelFinder() {
        return browser.getText(this.selectors.hotelfinder.popup.container);
    }

    _canSeeCounterValueInHotelFinder() {
        return browser.getText(this.selectors.hotelfinder.popup.counter);
    }

    _clickOnPopupUrlInHotelFinder() {
        browser.click(this.selectors.hotelfinder.popup.url);
        FavoriteHotel.waitForPageToLoad();
    }

    _waitForTextInCharterFlowToBe(text) {
        browser.waitUntil(() => {
            return browser.getText(this.selectors.charterflow.heart.text) === text
        }, 15000, 'Charterflow-hotel did not get favorized');
    }

    _waitForTextInHotelFinderToBe(text) {
        browser.waitUntil(() => {
            return browser.getText(this.selectors.hotelfinder.heart.text) === text
        }, 15000, 'Hotelfinder-hotel did not get favorized');
    }

    _waitForTextInHotelWebToBe(text) {
        browser.waitUntil(() => {
            return browser.getText(this.selectors.hotelweb.heart.text) === text
        }, 15000, 'Hotelweb-hotel did not get favorized');
    }

    get charterflow() {
        return {
            waitForHeartToLoad: () => this._waitForHeartToLoadInCharterflow(),
            clickOnHeartAndExpectTextToBe: (text) => this._clickOnHeartAndExpectTextToBeInCharterFlow(text),
            waitForTextToBe: (text) => this._waitForTextInCharterFlowToBe(text),
        };
    }

    get independentflow() {
        return {
            waitForHeartToLoad: () => this._waitForHeartToLoadInIndependentFlow(),
            clickOnHeartAndExpectTextToBe: (text) => this._clickOnHeartAndExpectTextToBeInIndendentFlow(text),
            waitForTextToBe: (text) => this._waitForTextInIndendentFlowToBe(text),
        };
    }

    get hotelweb() {
        return {
            waitForHeartToLoad: () => this._waitForHeartToLoadInHotelWeb(),
            clickOnHeartAndExpectTextToBe: (text) => this._clickOnHeartAndExpectTextToBeInHotelWeb(text),
            canViewPopup: () => this._canViewPopupInHotelWeb(),
            canSeeCounterValue: () => this._canSeeCounterValueInHotelWeb(),
            clickOnPopupUrl: () => this._clickOnPopupUrlInHotelWeb(),
            waitForTextToBe: (text) => this._waitForTextInHotelWebToBe(text),
        };
    }

    get hotelfinder() {
        return {
            waitForHeartToLoad: () => this._waitForHeartToLoadInHotelFinder(),
            clickOnHeartAndExpectTextToBe: (text) => this._clickOnHeartAndExpectTextToBeInHotelFinder(text),
            waitForTextToBe: (text) => this._waitForTextInHotelFinderToBe(text),
            canViewPopup: () => this._canViewPopupInHotelFinder(),
            canSeeCounterValue: () => this._canSeeCounterValueInHotelFinder(),
            clickOnPopupUrl: () => this._clickOnPopupUrlInHotelFinder(),
        };
    }
}

export default new FavoriteHeart();