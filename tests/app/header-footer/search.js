import Page from '../../../pages/page';
import { SearchPage } from '../../../pages/search-page';
import Header from '../../../pages/apps/header-footer/header/header';
import settings from './settings';
import { header } from './../../../pages/apps/header-footer/urls';

describe('Header', () => {
  before(() => {
    const environmentUrl = header[browser.options.tc.environment];
    Page.goTo(environmentUrl);
  });

  describe('Search', () => {
    it('Can Preform Search for Gran Canaria', () => {
      Header.searchField.input.setValue(settings.searchOptions.area);
      Header.searchField.search();
    });

    it('Redirect goes to searchpage', () => {
      expect(SearchPage.title, `expected ${SearchPage.title} to exist`).to.exist;

      browser.back();
    });
  });
  describe('Autosuggestion', () => {
    let autoSuggestionElement;

    it('Can write Crete in input', () => {
      Header.searchField.input.setValue(settings.searchOptions.resort);
    });

    it("Can close suggestion-list when hitting 'Escape'-button", () => {
      Header.searchField.autosuggestion.waitForExist();
      Header.searchField.escape();

      Header.searchField.autosuggestion.isVisible().should.equal(false, 'Autosuggestionlist should close when hitting escape-button');
    });

    it('Should close suggestion-list when erasing searchtext', () => {
      Header.searchField.input.removeValue();

      Header.searchField.autosuggestion.isVisible().should.equal(false, 'Autosuggestionlist should close removing value from input');
    });

    it('Should close suggestion-list when clicking on the page outside input', () => {
      Header.searchField.input.setValue(settings.searchOptions.resort);
      Header.searchField.autosuggestion.waitForExist();
      Header.searchField.autosuggestion.clickOutside();

      Header.searchField.autosuggestion.isVisible().should.equal(false, 'Autosuggestionlist should close when clicking outside');
    });

    it('Should have autosuggestions when equal to 3 letters entered in searchtext', () => {
      Header.searchField.input.setValue(settings.searchOptions.resort.substring(0, 3));

      Header.searchField.autosuggestion.waitForExist();

      Header.searchField.autosuggestion.isVisible().should.equal(true, 'Autosuggestionlist should be showing when input has equal to 3 letters');

      Header.searchField.input.removeValue();
    });

    it('Should not have any autosuggestions when less then 3 letters entered in searchtext', () => {
      Header.searchField.input.setValue(settings.searchOptions.resort.substring(0, 2));

      Header.searchField.autosuggestion.isVisible().should.equal(false, 'Autosuggestionlist not be showing if input has less then 3 letters');

      Header.searchField.input.removeValue();
    });

    it('Should not have any autosuggestions when there is no hits on that word', () => {
      Header.searchField.input.setValue('no suggestion below');

      Header.searchField.autosuggestion.isVisible().should.equal(false, 'Autosuggestionlist not be showing if input has no hits');

      Header.searchField.input.removeValue();
    });

    it('Autosuggestion list is no more than 6', () => {
      Header.searchField.input.setValue(settings.searchOptions.resort);

      Header.searchField.autosuggestion.getList().length.should.be.at.most(6, 'List was more than 6 items');
    });

    it('Can choose the third element in autosuggestion list', () => {
      autoSuggestionElement = Header.searchField.autosuggestion.getList();

      autoSuggestionElement[2].click();
    });
  });
});
