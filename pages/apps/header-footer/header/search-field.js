const searchField = '.header-search-field';
const autosuggestion = '.webui-autosuggest__suggestions-list';

const selectors = {
  home: searchField,
  input: `${searchField} .webui-autosuggest__input`,
  icon: `${searchField} .header-search-field__label`,
  autosuggestion: {
    container: `${autosuggestion}`,
    list: `${autosuggestion} li`,
    listOpen: `${autosuggestion} --open`,
    listItem: `${autosuggestion} .webui-autosuggest__suggestions-container li:nth-child(3)`,
  },
  label: '.header-search-field__label',
};

export default class SearchField {
  /**
   * Waits for the searchfield to exist.
   *
   * @memberof SearchField
   */
  static waitForPageToLoad() {
    browser.waitForExist(selectors.home, 30000);
    return browser.isExisting(selectors.home);
  }

  /**
   *
   *
   * @readonly
   * @memberof SearchField
   */
  get searchBox() {
    return {
      waitForPageToLoad: () => this.waitForPageToLoad(),
    };
  }

  /**
   * Gets input field.
   *
   * @readonly
   * @memberof SearchField
   */
  get input() {
    return {
      setValue: value => this.setValue(value),
      removeValue: () => this.deleteCharacters(),
    };
  }

  /**
   * Gets the autosuggestion list.
   *
   * @readonly
   * @memberof SearchField
   */
  get autosuggestion() {
    return {
      getList: () => this.getAutosuggestionList(),
      isVisible: () => browser.isVisible(selectors.autosuggestion.container),
      waitForExist: () => browser.waitForExist(selectors.autosuggestion.container),
      clickOutside: () => browser.click(selectors.label),
    };
  }

  /**
   * Preforms a search by simulating hitting the enter button.
   *
   * @memberof SearchField
   */
  search() {
    browser.keys('Enter');
  }

  /**
   * Escapes (keypress) the searchfield.
   *
   * @memberof SearchField
   */
  escape() {
    browser.keys('\uE00C');
  }

  /**
   * Hits backspace in the searchfield.
   *
   * @memberof SearchField
   */
  backspace() {
    browser.keys('Backspace');
  }

  deleteCharacters() {
    const value = browser.getValue(selectors.input);
    for (let index = 0; index < value.length; index++) {
      this.backspace();
    }
    browser.pause(1000); // Wait so autosuggestionlist is removed.
  }

  getAutosuggestionList() {
    browser.waitForExist(selectors.autosuggestion.container);

    const autosuggestions = browser.elements(selectors.autosuggestion.list);

    return Array.map(
      autosuggestions.value,
      autosuggestion => ({
        title: browser.elementIdText(autosuggestion.ELEMENT).value.trim(),
        id: autosuggestion.ELEMENT,
        click: () => browser.elementIdClick(autosuggestion.ELEMENT),
      }),
      this
    );
  }

  setValue(value) {
    browser.setValue(selectors.input, value);
  }
}
