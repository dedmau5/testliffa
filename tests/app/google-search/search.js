import { StartPage } from '../../../pages/start-page.js';
import GoogleSearch from '../../../pages/apps/google-search/google-search-pageobject.js';
import searchField from '../../../pages/apps/header-footer/search-field.js';
import Header from '../../../pages/apps/header-footer/header.js';

//for (let i = 0; i < 10; i++) {

    const state = {};

    before(function () {
        StartPage.open();
        browser.sessionStorage("POST", {key: 'DT_TESTNAME', value: '*** webdriverio *** GoogleSearch Search-tests'});
        browser.sessionStorage("POST", {key: 'DT_TESTRUNID', value: 'UID'});
        state.url = browser.getUrl();
    });

  //  beforeEach(function () {
    //    browser.url(state.url);
    //    Header.searchField.searchBox.waitForPageToLoad();
   // });

    describe('Testing search with google search on startpage, with and without a hit', () => {
        it("Should perform a search and get results in autosuggest when searching for a valid destination", () => {
            Header.searchField.input.setValue("phuket");
            expect(Header.searchField.autosuggestion.getList().length.should.be.at.least(4, "List has 4 items"));
            Header.searchField.search();

            

        });

        it("Should on resultpage look for searchresult 'phuket'", () => {    
            GoogleSearch.resultPage.waitForResultPageToLoad();
            expect(GoogleSearch.resultPage.header.getText()).to.equal('Sökresultat "phuket"');
            
        });

        it("Should perform a search and get a text saying that there is no hits", () => {
            Header.searchField.input.setValue("no hits on this search");
            Header.searchField.search();
            GoogleSearch.resultPage.waitForResultPageToLoad();
            expect(GoogleSearch.resultPage.header.getText()).to.contain('Vi kan tyvärr');
        });
    });
//});