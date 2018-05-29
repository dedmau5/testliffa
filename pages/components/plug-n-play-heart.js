import {StartPage} from '../../pages/start-page';

/*
* Pageobject for the favorite-heart.
* NOTE! This pageobject is deprecated, test will be refactored to use the pageobject in ./pages/apps/favorite-heart/
*/

class PlugNPlayHeart {
    constructor() {
        const heartSelector = 'div:nth-child(1) > div.hotel-hit-text > div.hotel-hit-info > div.hotel-info__header > div > div > a > div.tcne-favorite__heart';

        this.selectors = {
            heart: {
                home: heartSelector,
                selected: `${heartSelector}.tcne-favorite__heart--isFavorite`
            },

            fav: {
                favoriteUrl: '.tcne-link--favorite-tooltip',
            },

            hotelwebHeart: {
                emptyHeart: '.tcne-favorite__heart--hotelweb',
                filledHeart: '.tcne-favorite__heart--isFavorite',
                text: '.tcne-favorite__status-text',
            },

            charterflowHeart: {
                heart: '.webui-favorite__heart',
                text: '.webui-favorite__status-text',
            },

            hotelFinderHeart: {},
            independentFlowHeart: {},

            popupLink: {
                home: `div.ow-popover.ng-scope.top > div > div > a`
            },
        };
    }

    get emptyHeart() {
        const heart = browser.element(this.selectors.heart.home);
        const heartSelected = browser.element(this.selectors.heart.selected);

        if (heart && !heartSelected.isExisting()) {
            return heart;
        } else {
            console.warn("Selector did not exist");
        }
    }

    get selectedHeart() {
        const heartSelected = browser.element(this.selectors.heart.selected);

        if (heartSelected.isExisting()) {
            return heartSelected;
        } else {
            console.warn("Selector did not exist");
        }
    }

    get popupLink() {
        return browser.element(this.selectors.popupLink.home);
    }

    get charterflowCounter() {
        browser.pause(3000);
        let counterValue = browser.getText("div.tcne-tooltip__popover div");
        counterValue = counterValue.replace(/[^\d.]/g, '');
        counterValue = Number(counterValue);
        return counterValue;
    }

    get hotelwebCounter() {
        browser.pause(3000);
        let counterValue = browser.getText("div.tcne-tooltip__popover");
        counterValue = counterValue.replace(/[^\d.]/g, '');
        counterValue = Number(counterValue);
        return counterValue;
    }

    CharterflowHeartIsEmpty() {
        browser.waitForExist(this.selectors.charterflowHeart.text, 15000);
        browser.waitUntil(function() { return browser.getText('.webui-favorite__status-text') === 'Spara'},
            10000, 'Charterflow heart was NOT empty');
    }

    CharterflowHeartIsFilled() {
        browser.waitForExist(this.selectors.charterflowHeart.text, 15000);
        browser.waitUntil(function() { return browser.getText('.webui-favorite__status-text') === 'Sparad'},
            10000, 'Charterflow heart was NOT empty');
    }

    HotelwebHeartIsEmpty() {
        return browser.waitForExist(this.selectors.hotelwebHeart.emptyHeart, 10000);
    }

    HotelwebHeartIsFilled() {
        return browser.waitForExist(this.selectors.hotelwebHeart.filledHeart, 10000);
    }

    ClickOnCharterflowEmptyHeart() {
        browser.waitForExist(this.selectors.charterflowHeart.heart, 10000);
        browser.waitForExist(this.selectors.charterflowHeart.text, 10000);
        browser.waitUntil(() => {
            return 'Spara' === browser.getText(':nth-child(1) > .webui-hotel-hit .webui-favorite__status-text');
            }, 10000, 'Hotel was already favored');

        browser.click(this.selectors.charterflowHeart.heart);

        browser.waitUntil(() => {
            return 'Sparad' === browser.getText(':nth-child(1) > .webui-hotel-hit .webui-favorite__status-text');
        }, 10000, "Hotel didn't get favored");
    }

    ClickOnCharterflowFilledHeart() {
        browser.waitForExist(this.selectors.charterflowHeart.heart);
        browser.waitForExist(this.selectors.charterflowHeart.text);
        browser.waitUntil(function() {
            return 'Sparad' === browser.getText(':nth-child(1) > .webui-hotel-hit .webui-favorite__status-text');
            }, 10000, "Hotel wasn't already favored");

        browser.click(this.selectors.charterflowHeart.heart);

        browser.waitUntil(function() {
            return 'Spara' === browser.getText(':nth-child(1) > .webui-hotel-hit .webui-favorite__status-text');
            }, 10000, "Hotel was still favored");
    }

    ClickOnHotelwebEmptyHeart() {
        expect(browser.isExisting(this.selectors.hotelwebHeart.emptyHeart)).to.be.true;
        return browser.element(this.selectors.hotelwebHeart.emptyHeart).click();
    }

    ClickOnHotelwebFilledHeart() {
        expect(browser.isExisting(this.selectors.hotelwebHeart.filledHeart)).to.be.true;
        return browser.element(this.selectors.hotelwebHeart.filledHeart).click();
    }

    ClickOnFavoriteUrlInPopup() {
        expect(browser.isExisting(this.selectors.fav.favoriteUrl)).to.be.true;
        return browser.element(this.selectors.fav.favoriteUrl).click();
    }

    WaitUntilHeaderCounterCountsUp(state) {
        browser.waitUntil(function () {
            return StartPage.favoriteHotelCounterValue === (state.HeaderCounterBaseCount + 1);
        }, 10000, `Expected ${StartPage.favoriteHotelCounterValue} to equal ${state.HeaderCounterBaseCount + 1}`, 500);
    }

    WaitUntilHeaderCounterCountsDown(state) {
        browser.waitUntil(function () {
            return StartPage.favoriteHotelCounterValue === state.HeaderCounterBaseCount;
        }, 10000, `Expected ${StartPage.favoriteHotelCounterValue} to equal ${state.HeaderCounterBaseCount}`, 500);
    }

    WaitUntilTextSave() {
        if ("Boka paketresa med flyg och hotell" == browser.getTitle()) {
            browser.waitUntil(() => {
                return 'Spara' === browser.getText(this.selectors.charterflowHeart.text);
            }, 10000, 'Expected text to change within 10s');
        } else if ("Boka dina resa hos Ving" == browser.getTitle()) {
            browser.waitUntil(() => {
                return 'Spara' === browser.getText(this.selectors.hotelwebHeart.text);
            }, 10000, 'Expected text to change within 10s');
        } else if (browser.isExisting('M1_C2_Upper_i8c30009691')) {

            // TODO IMPLEMENT THIS FOR HOTELFINDER
            return console.log("TODO IMPLEMENT THIS FOR HOTELFINDER");

        } else {
            return console.log("Did not find selectors for Hotelweb, Charterflow or HotelFinderResort");
        }

    }

    WaitUntilTextSaved() {
        if ("Boka paketresa med flyg och hotell" == browser.getTitle()) {
            browser.waitUntil(() => {
                return 'Sparad' === browser.getText(this.selectors.hotelwebHeart.text);
            }, 10000, 'Expected text to change within 10s');
        } else if ("Boka dina resa hos Ving" == browser.getTitle()) {
            browser.waitUntil(() => {
                return 'Sparad' === browser.getText(this.selectors.charterflowHeart.text);
            }, 10000, 'Expected text to change within 10s');
        } else if (browser.isExisting('M1_C2_Upper_i8c30009691')) {

            // TODO IMPLEMENT THIS FOR HOTELFINDER
            return console.log("TODO IMPLEMENT THIS FOR HOTELFINDER");

        } else {
            return console.log("Did not find selectors for Hotelweb, Charterflow or HotelFinderResort");
        }
    }

}

export default new PlugNPlayHeart();
