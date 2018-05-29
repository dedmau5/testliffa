import { BasicFunctionality } from './basic-functionality';

export default class CommonDestination extends BasicFunctionality {
  /**
   * Creates an instance of CommonDestination.
   *
   * @param {string} selector
   *
   * @memberOf CommonDestination
   */
  constructor(selector) {
    super();

    const country = 'div.destination-select__country';
    const resort = 'div.destination-select__resort';
    const area = 'div.destination-select__area';
    const search = 'div.destination-search-container';
    const result = 'div.destination-search-result';

    this.selectors.home = `${selector} > div.bookingstart-section__destination-select`;
    this.selectors.destination = {
      country: {
        home: `${country}`,
        name: `${country}-name`,
        selected: `${country}.destination-select__country--expanded`,
        children: `${country}-children`,
      },

      resort: {
        home: `${resort}`,
        name: `${resort}-name`,
        children: `${resort}-children`,
      },

      area: {
        home: `${area}`,
        name: `${area}-name`,
        children: `${area}-children`,
      },
    };
    this.selectors.search = {
      home: `${search}`,
      input: `${search} > div.input__container.destination-search-field > input`,
      result: {
        home: `${result}`,
        items: `${result}__item`,
      },
    };
    this.constants = {
      type: {
        resort: 'resort',
        country: 'country',
        area: 'area',
      },
    };
  }

  /**
   * Opens the overlay for destination.
   */
  open(selector) {
    super.open(this.selectors.home);
    browser.waitForExist(this.selectors.close, 30000);
  }

  /**
   * Searches for given userinput.
   *
   * @returns {[{
   *     select: Function,
   * }]}
   */
  search(userInput) {
    browser.setValue(this.selectors.search.input, userInput);

    this._search = {
      select: item => this._select(this.results, item),
    };

    return this._search;
  }

  /**
   * Gets Country methods.
   *
   * @returns {{ toggle: Function, select: Function }}
   */
  get country() {
    this._country = {
      toggle: item => this._toggle(this.countries, item),
      select: item => this._select(this.countries, item),
    };

    return this._country;
  }

  /**
   * Gets area methods.
   *
   * @returns {[{
   *     toggle: Function,
   * }]}
   */
  get area() {
    // this._area = {
    //     toggle: (item) => this._toggle(this.areas, item),
    // };

    // return this._area;

    return {
      toggle: item => this._toggle(this.areas, item),
    };
  }

  /**
   * Gets resort methods.
   *
   * @returns {{select: function, }}
   */
  get resort() {
    this._resorts = {
      select: item => this._select(this.resorts, item),
    };

    return this._resorts;
  }

  /**
   * Sets current selected element.
   *
   */
  set selected(value) {
    this._selected = value;
  }

  /**
   * Gets current selected element.
   *
   */
  get selected() {
    return this._selected;
  }

  /**
   * Gets all countries.
   *
   * @returns {[{
   *     countries: array,
   * }]}
   */
  get countries() {
    const _countries = browser.elements(this.selectors.destination.country.home);

    if (!_countries || !_countries.value) {
      return false;
    }

    this._countries = Array.map(
      _countries.value,
      (_country) => {
        const _countryNameElement = browser.elementIdElement(_country.ELEMENT, this.selectors.destination.country.name);

        return {
          title: browser.elementIdText(_countryNameElement.value.ELEMENT).value.trim(),
          id: _country.ELEMENT,
          type: this.constants.type.country,
        };
      },
      this
    );

    return this._countries;
  }

  /**
   * Gets all areas under a selected country.
   *
   * @returns {[{
   *     areas: array,
   * }]}
   */
  get areas() {
    const _areas = browser.elements(`${this.selectors.destination.country.selected} ${this.selectors.destination.country.children} > div`);

    if (!_areas || !_areas.value) {
      return false;
    }

    return _areas.value.map((_area) => {
      let _title;
      const _className = browser.elementIdAttribute(_area.ELEMENT, 'class').value;

      if (_className.includes('destination-select__resort')) {
        _title = browser.elementIdAttribute(_area.ELEMENT, 'innerHTML').value;
      } else {
        const _areaNameElement = browser.elementIdElement(_area.ELEMENT, this.selectors.destination.area.name);
        _title = browser.elementIdText(_areaNameElement.value.ELEMENT).value;
      }

      return {
        title: _title.trim(),
        id: _area.ELEMENT,
        type: 'area',
      };
    }, this);
  }

  /**
   * Gets all resorts under a selected country/area.
   *
   * @returns {[{
   *     resorts: array,
   * }]}
   */
  get resorts() {
    const _childrenElement = this.selected.type === this.constants.type.area ? this.selectors.destination.area.children : this.selectors.destination.country.children;

    const _resorts = browser.elementIdElements(this.selected.id, `${_childrenElement} > ${this.selectors.destination.resort.home}`);

    if (!_resorts || !_resorts.value) {
      return false;
    }

    this._resorts = Array.map(
      _resorts.value,
      _resort => ({
        title: browser.elementIdText(_resort.ELEMENT).value.trim(),
        id: _resort.ELEMENT,
        type: this.constants.type.resort,
      }),
      this
    );

    return this._resorts;
  }

  /**
   * Gets all results when preformed a search.
   *
   * @returns {[{
   *     results: array,
   * }]}
   */
  get results() {
    browser.waitForExist(this.selectors.search.result.home, 20000);
    const _results = browser.elements(this.selectors.search.result.items);

    if (!_results || !_results.value) {
      return false;
    }

    this._results = Array.map(_results.value, _result => ({
      title: browser.elementIdText(_result.ELEMENT).value.trim(),
      id: _result.ELEMENT,
    }));

    return this._results;
  }

  /**
   * @returns {boolean} Returns true or false if abled to find item in list and click on it.
   * @private
   */
  _toggle(list, item) {
    for (const _item of list) {
      if (_item.title === item) {
        browser.elementIdClick(_item.id);

        this.selected = { id: _item.id, type: _item.type };
        return true;
      }
    }

    return false;
  }

  /**
   *
   * @returns {boolean} Returns true or false if we could to find item in list and click on it.
   * @private
   */
  _select(list, item) {
    for (const _item of list) {
      if (_item.title === item) {
        browser.elementIdClick(_item.id);
        return true;
      }
    }

    return false;
  }
}
