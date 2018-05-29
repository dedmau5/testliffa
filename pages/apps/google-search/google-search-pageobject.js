
/*
* Pageobject for GoogleSearch-app found on the pageheader, included the resultpage of a googlesearch-search
*/

class GoogleSearch {
    constructor() {
        const googleSearch = '.header-search-field';
        const resultPage = '#redux-gsa-results';

        this.selectors = {

            searchBox: {
                home: `${googleSearch}`,

                icon: `${googleSearch} .header-search-field__label`,
                container: `${googleSearch} .webui-autosuggest__suggestions-list`,
                suggestionList: `${googleSearch} .webui-autosuggest__suggestions-list--open`,
                text: `${googleSearch} .tcne-autosuggest__container input`,

                dropDown: {
                    item1: `${googleSearch} .tcne-autosuggest__suggestions-container li:nth-child(1)`,
                    item2: `${googleSearch} .tcne-autosuggest__suggestions-container li:nth-child(2)`,
                    item3: `${googleSearch} .tcne-autosuggest__suggestions-container li:nth-child(3)`,
                    item4: `${googleSearch} .tcne-autosuggest__suggestions-container li:nth-child(4)`,
                    item5: `${googleSearch} .tcne-autosuggest__suggestions-container li:nth-child(5)`,
                },
            },

            resultPage: {
                home: `${resultPage}`,
                hitsHeader: `${resultPage} div > h1`,
                numberOfResults: `${resultPage} div > div > p`,
                resultList: `${resultPage} .googlesearch-resultlist__item`,
                pageLinks: `${resultPage} .googlesearch-pagelinks__page-word`,
            }

        };
    }

    _waitForPageToLoad() {
        browser.waitForExist(this.selectors.searchBox.home, 30000);
        return browser.isExisting(this.selectors.searchBox.home);
    }

    _waitForResultPageToLoad() {
        browser.waitForExist(this.selectors.resultPage.home, 30000);
    }

    get _header() {
        return $(this.selectors.resultPage.hitsHeader);
    }

    _inputSearchtext(text) {
        browser.setValue(this.selectors.searchBox.text, text);
        browser.pause(1000);
    }

    _inputKeys(input) {
        browser.keys(input);
    }

    _performSearch() {
        browser.click(this.selectors.searchBox.icon);
        browser.waitForExist(this.selectors.resultPage.home, 30000);
    }

    _clickOnContainerAndEnterKeys(keys) {
        browser.click(this.selectors.searchBox.text);
        browser.keys(keys);
    }

    get searchBox() {
        return {
            waitForPageToLoad: () => this._waitForPageToLoad(),
            inputSearchtext: (text) => this._inputSearchtext(text),
            inputKeys: (input) => this._inputKeys(input),
            performSearch: () => this._performSearch(),
            clickOnContainerAndEnterKeys: (keys) => this._clickOnContainerAndEnterKeys(keys),
        };
    }

    get resultPage() {
        return {
            waitForResultPageToLoad: () => this._waitForResultPageToLoad(),
            header: this._header,
        };
    }

}

export default new GoogleSearch();
