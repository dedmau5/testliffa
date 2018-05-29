import PageBase from './page-base';

class _searchPage extends PageBase {
  constructor() {
    super();
    const container = '#redux-gsa-results';

    this.selectors = {
      container: `${container}`,
      h1: `${container} h1`,
      result: {
        container: `${container} ul.googlesearch-resultlist li`,
        title: 'a',
        body: '.googlesearch-resultlist__item-snippet',
      }
    };
  }

  /**
   * Waits until container is loaded.
   *
   * @param { number } timeout
   *
   * @memberof SearchPage
   */
  waitUntilLoaded(timeout = 60000) {
    browser.waitForExist(this.selectors.container, timeout);
  }

  /**
   * Gets the h1 for the searchpage.
   *
   * @readonly
   * @memberof SearchPage
   */
  get h1() {
    const h1 = browser.element(this.selectors.h1);

    return {
      getTitle: () => browser.elementIdText(h1.value.ELEMENT).value.trim(),
    };
  }

  /**
   * Gets the result list for hte searchpage.
   *
   * @readonly
   * @memberof SearchPage
   */
  get result() {
    return {
      list: this._getResultList()
    };
  }

  _getResultList() {
    const _results = browser.elements(this.selectors.result.container);
    return Array.map(_results.value, _result => {
      const _title = browser.elementIdElement(_result.ELEMENT, this.selectors.result.title);
      const _body = browser.elementIdElement(_result.ELEMENT, this.selectors.result.body);
      return {
        title: browser.elementIdText(_title.value.ELEMENT).value.trim(),
        id: _result.ELEMENT,
        body: browser.elementIdText(_body.value.ELEMENT).value.trim(),
        click: () => browser.elementIdClick(_result.ELEMENT),
      };
    });
  }
}


export const SearchPage = new _searchPage();