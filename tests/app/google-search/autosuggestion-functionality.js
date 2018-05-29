import { StartPage } from '../../../pages/start-page.js';
import GoogleSearch from '../../../pages/apps/google-search/google-search-pageobject.js';

//for (let i = 0; i < 10; i++) {
    describe('Testing autosuggestion-funtionality', () => {

        before(function () {
            StartPage.open();
            browser.sessionStorage("POST", {key: 'DT_TESTNAME', value: '*** webdriverio *** GoogleSearch Autosuggestions'});
            browser.sessionStorage("POST", {key: 'DT_TESTRUNID', value: 'UID'});
            GoogleSearch.searchBox.waitForPageToLoad();
        });

        describe("Checking functionality of the google-search app", function () {
            it("Should close suggestion-list when hitting 'Escape'-button", () => {
                GoogleSearch.searchBox.inputSearchtext("teneriffa");
                GoogleSearch.searchBox.inputKeys("Escape");

                expect(browser.isExisting(GoogleSearch.selectors.searchBox.suggestionList)).to.be.false;
            });

            it("Should close suggestion-list when erasing searchtext", () => {
                GoogleSearch.searchBox.inputKeys("Backspace");
                GoogleSearch.searchBox.inputKeys("Backspace");
                GoogleSearch.searchBox.inputKeys("Backspace");
                GoogleSearch.searchBox.inputKeys("Backspace");
                GoogleSearch.searchBox.inputKeys("Backspace");
                GoogleSearch.searchBox.inputKeys("Backspace");
                GoogleSearch.searchBox.inputKeys("Backspace");
                GoogleSearch.searchBox.inputKeys("Backspace");
                browser.pause(1000);
                GoogleSearch.searchBox.inputKeys("Backspace");
                browser.pause(1000);

                expect(browser.isExisting(GoogleSearch.selectors.searchBox.suggestionList)).to.be.false;
            });

            it("Should close suggestion-list when clicking on the page outside the google-search app", () => {
                GoogleSearch.searchBox.inputSearchtext("mallorca");
                browser.click("#endorsement-text"); // "PART OF THE THOMAS COOK GROUP"-text in header

                expect(browser.isExisting(GoogleSearch.selectors.searchBox.suggestionList)).to.be.false;
            });

            it("Should have autosuggestions when equal to 3 words entered in searchtext", () => {
                GoogleSearch.searchBox.inputSearchtext("kre");

                expect(browser.isExisting(GoogleSearch.selectors.searchBox.suggestionList)).to.be.true;
                GoogleSearch.searchBox.inputKeys("Escape");
            });

            it("Should not have any autosuggestions when less then 3 words entered in searchtext", () => {
                GoogleSearch.searchBox.inputSearchtext("kr");

                expect(browser.isExisting(GoogleSearch.selectors.searchBox.suggestionList)).to.be.false;
            });

            it("Should not have any autosuggestions when there is no hits on that word", () => {
                GoogleSearch.searchBox.inputSearchtext("no suggestion below");

                expect(browser.isExisting(GoogleSearch.selectors.searchBox.suggestionList)).to.be.false;
            });
        });
    });
//}