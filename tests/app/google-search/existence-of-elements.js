import { StartPage } from '../../../pages/start-page.js';
import GoogleSearch from '../../../pages/apps/google-search/google-search-pageobject.js';
import Header from '../../../pages/apps/header-footer/header.js';

//for (let i = 0; i < 10; i++) {

    describe('Testing visibility of components and search in a oneweb-page', () => {

        before(function () {
            StartPage.open();
            browser.sessionStorage("POST", {key: 'DT_TESTNAME', value: '*** webdriverio *** GoogleSearch Existence of elements'});
            browser.sessionStorage("POST", {key: 'DT_TESTRUNID', value: 'UID'});
            
            Header.searchField.searchBox.waitForPageToLoad();
        });

        describe("Checking visibility of the google-search components", function () {
            it("Should have a search-button", () => {
                browser.waitForVisible(Header.searchField.selectors.icon, 5000);
            });

            it("Should have a container", () => {
                browser.waitForVisible(Header.selectors.container, 5000);
            });

            it("Should have a list of suggested searchtexts", () => {
                Header.searchField.input.setValue("kreta");
                browser.pause(2000);
                browser.waitForVisible(Header.searchField.selectors.autosuggestion.list, 10000);
            });

            it("Should have suggestions for 'kreta', checking one... ", () => {
                browser.isExisting(Header.searchField.selectors.autosuggestion.listItem);
            });

            it("Should have a resultlist on resultpage", () => {
                Header.searchField.input.setValue("phuket");
                Header.searchField.search();

                expect(browser.isExisting(GoogleSearch.selectors.resultPage.numberOfResults)).to.be.true;
            });

            it("Should have pagelinks on resultpage", () => {
                expect(browser.isExisting(GoogleSearch.selectors.resultPage.resultList)).to.be.true;
            });

            it("Should have pagelinks on resultpage", () => {
                expect(browser.isExisting(GoogleSearch.selectors.resultPage.pageLinks)).to.be.true;
            });
        });
    });
//}