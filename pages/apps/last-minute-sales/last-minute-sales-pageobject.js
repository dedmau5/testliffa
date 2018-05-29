import { Translate } from '../../../tools';

/*
 * Pageobject for last-minute-sales(excluding upsell/charterflow)
 */

class LMSPage {
  constructor() {
    const home = '#lastminutesales';

    this.selectors = {
      pageTabs: 'div.rw-tabs',
      filterWrapper: '.filter-wrapper',
      lmsButton: '.lms-trip-wrapper a.lms-select-button',

      home,

      lmsSearch: {
        mainDiv: `${home} .tcne-lms-search`,
        header: `${home} .tcne-lms-search__search-header > h2`,
        tripLength: {
          dropdown: `${home} #tripLength`,
          selected: `${home} .webui-list-box__chosen`,
        },
        passengers: {
          dropdown: `${home} .tcne-lms-pax-badge__item`,
          selected: `${home} .tcne-lms-pax-badge__item`,
          header: `${home} .tcne-lms-pax-select-popup__title`,
          popup: {
            adultsDropdown: `${home} #tcne-lms-pax-numAdults`,
            adultsSelected: `${home} .tcne-lms-pax-select-wrapper > :nth-child(1) .webui-list-box__chosen`,
            adultDtuMessage: `${home} .tcne-lms-pax-select-popup__validation-info`,
            childrenDropdown: `${home} #tcne-lms-pax-numChildren`,
            childrenSelected: `${home} .tcne-lms-pax-select-wrapper > :nth-child(2) .webui-list-box__chosen`,

            firstChild: {
              dropdown: `${home} .webui-list-box:nth-child(3) .webui-list-box__select`,
              selected: `${home} .webui-list-box:nth-child(3) .webui-list-box__chosen`,
              selectAgeSelectorBuilderPartOne: `${home} .webui-list-box:nth-child(3) .webui-list-box__select option:nth-child(`,
              selectAgeSelectorBuilderPartTwo: ')',
            },
            secondChild: {
              dropdown: `${home} .webui-list-box:nth-child(4) .webui-list-box__select`,
              selected: `${home} .webui-list-box:nth-child(4) .webui-list-box__chosen`,
              selectAgeSelectorBuilderPartOne: `${home} .webui-list-box:nth-child(4) .webui-list-box__select option:nth-child(`,
              selectAgeSelectorBuilderPartTwo: ')',
            },
            thirdChild: {
              dropdown: `${home} .webui-list-box:nth-child(5) .webui-list-box__select`,
              selected: `${home} .webui-list-box:nth-child(5) .webui-list-box__chosen`,
              selectAgeSelectorBuilderPartOne: `${home} .webui-list-box:nth-child(5) .webui-list-box__select option:nth-child(`,
              selectAgeSelectorBuilderPartTwo: ')',
            },
            forthChild: {
              dropdown: `${home} .webui-list-box:nth-child(6) .webui-list-box__select`,
              selected: `${home} .webui-list-box:nth-child(6) .webui-list-box__chosen`,
              selectAgeSelectorBuilderPartOne: `${home} .webui-list-box:nth-child(6) .webui-list-box__select option:nth-child(`,
              selectAgeSelectorBuilderPartTwo: ')',
            },
            fifthChild: {
              dropdown: `${home} .webui-list-box:nth-child(7) .webui-list-box__select`,
              selected: `${home} .webui-list-box:nth-child(7) .webui-list-box__chosen`,
              selectAgeSelectorBuilderPartOne: `${home} .webui-list-box:nth-child(7) .webui-list-box__select option:nth-child(`,
              selectAgeSelectorBuilderPartTwo: ')',
            },
            childOne: `${home} .webui-list-box:nth-child(3) .webui-list-box__select`,
            childOneSelectorBuilderPartOne: `${home} .webui-list-box:nth-child(`,
            childOneSelectorBuilderPartTwo: ')',
            childOneSelectedAge: `${home} .tcne-lms-pax-select-wrapper > :nth-child(3) .webui-list-box__chosen`,
            childTwo: `${home} .webui-list-box:nth-child(4) .webui-list-box__select`,
            childThree: `${home} .webui-list-box:nth-child(5) .webui-list-box__select`,
            childFour: `${home} .webui-list-box:nth-child(6) .webui-list-box__select`,
            childFive: `${home} .webui-list-box:nth-child(7) .webui-list-box__select`,
          },

        },
        departure: {
          dropdown: `${home} .webui-multi-select__content`,
          selected: `${home} .webui-multi-select__selected`,
          optionByIndexPartOne: '.webui-multi-select__select > div:nth-child(',
          optionByIndexPartTwo: ') .webui-checkbox__square',
          close: `${home} .tcne-lms__filters-search-bar`, // click on any element outside dropdown
        },
        datepicker: {},
      },

      filtering: {
        mainDiv: `${home} .tcne-lms-filter-bar`,
        filteringHeader: `${home} `,
        specified: `${home} .tcne-lms-filter-group:nth-child(1) li:nth-child(1) .webui-checkbox__label`,
        specifiedChecked: `${home} .tcne-lms-filter-group:nth-child(1) li:nth-child(1) .webui-checkbox--checked .webui-checkbox__label`,
      },

      sortingPanel: {
        mainDiv: `${home} .tcne-lms-filters-sort__filter`,
      },

      hotelList: {
        hotels: `${home} .tcne-lms-hit__header-container`,
        firstHotel: {
          day: `${home} .webui-lms-hit:nth-child(1) .webui-lms-hit__header-date-header-day`,
          month: `${home} .webui-lms-hit:nth-child(1) .webui-lms-hit__header-date-header-text-month`,
          destination: `${home} .webui-lms-hit:nth-child(1) .webui-lms-hit__header-resort-name--with-comma`,
          country: `${home} .webui-lms-hit:nth-child(1) .webui-lms-hit__header-resort-country`,
          airportAndDuration: `${home} .tcne-lms-hit:nth-child(1) .tcne-lms-hit__header-resort-pax`,
          veryFewLeft: `${home} .webui-lms-hit:nth-child(1) .webui-lms-hit__header-few-seats-text`,
          travelType: `${home} .webui-lms-hit:nth-child(1) .webui-lms-hit__price-choice`,
          price: `${home} .webui-lms-hit:nth-child(1) .webui-price-formatter`,
        },
        twentiethHotel: {
          price: `${home} .tcne-lms-hit:nth-child(20) .tcne-lms-hit__content-choice-price`,
        },
        showMoreTrips: `${home} .tcne-lms__load-more .webui-button`,
      },
    };
  }

  /**
     * @returns {{waitForExists: (function(number=))}}
     */
  get pageTabs() {
    return {
      /**
             * @param {number} timeout=30000
             */
      waitForExists: (timeout = 30000) => {
        browser.waitForExist(this.selectors.pageTabs, timeout);
      },
    };
  }

  waitForPageToLoad() {
    this.pageTabs.waitForExists();
  }

  waitForPageToLoadOnNewLMS() {
    browser.waitForExist(this.selectors.home, 30000);
    browser.waitForExist(this.selectors.lmsSearch.mainDiv, 30000);
    browser.waitForExist(this.selectors.filtering.mainDiv, 30000);
    browser.waitForExist(this.selectors.sortingPanel.mainDiv, 30000);
    browser.waitForExist(this.selectors.hotelList.hotels, 30000);
  }

  navigateTo() {
    browser.url(Translate({
      dk: '/afbudsrejser',
      fi: '/akkilahdot',
      no: '/restplasser',
      se: '/sista-minuten-resor',
    }));
  }

  _returnCurrentSelectedSortingValue() {
    return $(selector).getText();
  }

  _clickOnAirportByIndex(index) {
    $(this._buildSelectorByIndex(
      this.selectors.lmsSearch.departure.optionByIndexPartOne, index,
      this.selectors.lmsSearch.departure.optionByIndexPartTwo,
    )).click();
  }

  _closeDepartureDropdown() {
    $(this.selectors.lmsSearch.departure.close).click();
  }

  _selectTriplengthDropdownsOptionByIndex(option) {
    let value = 0;

    if (option === 1) { value = -1; }
    else if (option === 2) { value = 10; }
    else if (option === 3) { value = 18; }
    else if (option === 4) { value = 25; }
    else if (option === 5) { value = 6; }
    else if (option === 6) { value = 26; }

    browser.selectByValue(this.selectors.lmsSearch.tripLength.dropdown, value);
    browser.waitForExist(this.selectors.hotelList.hotels, 30000);
  }

  _selectAdultsDropdownsOptionByIndex(option) {
    let value = 0;

    if (option === 1) { value = 1; } else if (option === 2) { value = 2; } else if (option === 3) { value = 3; } else if (option === 4) { value = 4; } else if (option === 5) { value = 5; } else if (option === 6) { value = 6; }

    browser.selectByValue(this.selectors.lmsSearch.passengers.popup.adultsDropdown, value);

    browser.waitUntil(() => browser.getText(this.selectors.lmsSearch.passengers.popup.adultsSelected) == value, 5000, 'expected text to be different after 5s');
  }

  _selectChildrenDropdownsOptionByIndex(option) {
    let value = 0;

    if (option === 1) { value = 1; } else if (option === 2) { value = 2; } else if (option === 3) { value = 3; } else if (option === 4) { value = 4; } else if (option === 5) { value = 5; } else if (option === 6) { value = 6; }

    browser.selectByValue(this.selectors.lmsSearch.passengers.popup.childrenDropdown, value);

    browser.waitUntil(() => browser.getText(this.selectors.lmsSearch.passengers.popup.childrenSelected) == value, 5000, 'expected text to be different after 5s');
  }

  _clickOnTriplengthDropdown() {
    browser.click(this.selectors.lmsSearch.tripLength.dropdown);
    browser.pause(1000);
  }

  _clickOnPassengersDropdown() {
    browser.click(this.selectors.lmsSearch.passengers.dropdown);
    browser.pause(1000);
  }

  _waitForDtuMessagetoExist() {
    browser.waitForExist(this.selectors.lmsSearch.passengers.popup.adultDtuMessage, 5000);
  }

  _returnDuration() {
    let string = browser.getText(this.selectors.hotelList.firstHotel.airportAndDuration);
    string = string.replace(/[^\d.]/g, '');
    string = Number(string);
    return string;
  }

  _setAgeForChildOne(age, childsDropdown) {
    const selectorIndex = age + 2; // selector needs a bump of 2, this logic might change if selector changes
    const ageSelector =
            this.selectors.lmsSearch.passengers.popup.firstChild.selectAgeSelectorBuilderPartOne + selectorIndex
            + this.selectors.lmsSearch.passengers.popup.firstChild.selectAgeSelectorBuilderPartTwo;

    browser.click(childsDropdown);
    browser.click(ageSelector);

    browser.waitUntil(() => browser.getText(this.selectors.lmsSearch.passengers.popup.firstChild.selected) === `${age} år`, 5000, 'Expected childs age to have another value');
  }

  _setAgeForChildTwo(age, childsDropdown) {
    const selectorIndex = age + 2; // selector needs a bump of 2, this logic might change if selector changes
    const ageSelector =
            this.selectors.lmsSearch.passengers.popup.secondChild.selectAgeSelectorBuilderPartOne + selectorIndex
            + this.selectors.lmsSearch.passengers.popup.secondChild.selectAgeSelectorBuilderPartTwo;

    browser.click(childsDropdown);
    browser.click(ageSelector);

    browser.waitUntil(() => browser.getText(this.selectors.lmsSearch.passengers.popup.secondChild.selected) === `${age} år`, 5000, 'Expected childs age to have another value');
  }

  _setAgeForChildThree(age, childsDropdown) {
    const selectorIndex = age + 2; // selector needs a bump of 2, this logic might change if selector changes
    const ageSelector =
            this.selectors.lmsSearch.passengers.popup.thirdChild.selectAgeSelectorBuilderPartOne + selectorIndex
            + this.selectors.lmsSearch.passengers.popup.thirdChild.selectAgeSelectorBuilderPartTwo;

    browser.click(childsDropdown);
    browser.click(ageSelector);

    browser.waitUntil(() => browser.getText(this.selectors.lmsSearch.passengers.popup.thirdChild.selected) === `${age} år`, 5000, 'Expected childs age to have another value');
  }

  _setAgeForChildFour(age, childsDropdown) {
    const selectorIndex = age + 2; // selector needs a bump of 2, this logic might change if selector changes
    const ageSelector =
            this.selectors.lmsSearch.passengers.popup.forthChild.selectAgeSelectorBuilderPartOne + selectorIndex
            + this.selectors.lmsSearch.passengers.popup.forthChild.selectAgeSelectorBuilderPartTwo;

    browser.click(childsDropdown);
    browser.click(ageSelector);

    browser.waitUntil(() => browser.getText(this.selectors.lmsSearch.passengers.popup.forthChild.selected) === `${age} år`, 5000, 'Expected childs age to have another value');
  }

  _setAgeForChildFive(age, childsDropdown) {
    const selectorIndex = age + 2; // selector needs a bump of 2, this logic might change if selector changes
    const ageSelector =
            this.selectors.lmsSearch.passengers.popup.fifthChild.selectAgeSelectorBuilderPartOne + selectorIndex
            + this.selectors.lmsSearch.passengers.popup.fifthChild.selectAgeSelectorBuilderPartTwo;

    browser.click(childsDropdown);
    browser.click(ageSelector);

    browser.waitUntil(() => browser.getText(this.selectors.lmsSearch.passengers.popup.fifthChild.selected) === `${age} år`, 5000, 'Expected childs age to have another value');
  }

  _expectDurationToBeNoneOrWithin(from, to) {
    switch (browser.isExisting(this.selectors.hotelList.firstHotel.airportAndDuration)) {
      case (true):
        expect(this.hotelList.firstHotel.duration()).to.be.within(from, to);
        break;
      case (false):
        true;
        break;
    }
  }

  // TravelChoices
  get _yourTravelChoiceHeader() { return $(this.selectors.lmsSearch.header); }
  get _tripLengthDropdown() { return $(this.selectors.lmsSearch.tripLength.dropdown); }
  get _tripLengthSelected() { return $(this.selectors.lmsSearch.tripLength.selected); }
  get _passengersDropdown() { return $(this.selectors.lmsSearch.passengers.dropdown); }
  get _passengersSelected() { return $(this.selectors.lmsSearch.passengers.selected); }
  get _passengersAdultsSelected() { return $(this.selectors.lmsSearch.passengers.popup.adultsSelected); }
  get _passengersChildrenSelected() { return $(this.selectors.lmsSearch.passengers.popup.childrenSelected); }
  get _passengersChildOneSelectedAge() { return $(this.selectors.lmsSearch.passengers.popup.childOneSelectedAge); }
  get _depatureDropdown() { return $(this.selectors.lmsSearch.departure.dropdown); }
  get _departureSelected() { return $(this.selectors.lmsSearch.departure.selected); }
  get _datepickerDropdown() { return $(this.selectors.lmsSearch.datepicker.dropdown); }
  get _datepickerSelected() { return $(this.selectors.lmsSearch.datepicker.selected); }

  // Hotellist
  get _getListOfAllHotels() { return $$(this.selectors.hotelList.hotels); }


  // Pageobject-API from testfiles
  get lmsSearch() {
    return {
      header: this._yourTravelChoiceHeader,

      departure: {
        selected: this._departureSelected,
        dropdown: this._depatureDropdown,
        clickOnAirportByIndex: index => this._clickOnAirportByIndex(index),
        close: () => this._closeDepartureDropdown(),
      },
      tripLength: {
        selected: this._tripLengthSelected,
        dropdown: this._tripLengthDropdown,
        clickOnDropdown: () => this._clickOnTriplengthDropdown(),
        selectDropdownOptionByIndex: option => this._selectTriplengthDropdownsOptionByIndex(option),

      },
      passengers: {
        selected: this._passengersSelected,
        dropdown: this._passengersDropdown,
        clickOnDropdown: () => this._clickOnPassengersDropdown(),
        adults: {
          selected: this._passengersAdultsSelected,
          selectDropdownOptionByIndex: option => this._selectAdultsDropdownsOptionByIndex(option),
          waitForDtuMessagetoExist: () => this._waitForDtuMessagetoExist(),
        },
        childrenDropdown: {
          selected: this._passengersChildrenSelected,
          selectDropdownOptionByIndex: option => this._selectChildrenDropdownsOptionByIndex(option),
        },
        firstChild: {
          waitForDropdownToLoad: () =>
            this._waitForSelectorToExist(this.selectors.lmsSearch.passengers.popup.firstChild.dropdown),
          setAgeTo: age => this._setAgeForChildOne(age, this.selectors.lmsSearch.passengers.popup.firstChild.dropdown),
        },
        secondChild: {
          waitForDropdownToLoad: () =>
            this._waitForSelectorToExist(this.selectors.lmsSearch.passengers.popup.secondChild.dropdown),
          setAgeTo: age => this._setAgeForChildTwo(age, this.selectors.lmsSearch.passengers.popup.secondChild.dropdown),
        },
        thirdChild: {
          waitForDropdownToLoad: () =>
            this._waitForSelectorToExist(this.selectors.lmsSearch.passengers.popup.thirdChild.dropdown),
          setAgeTo: age => this._setAgeForChildThree(age, this.selectors.lmsSearch.passengers.popup.thirdChild.dropdown),
        },
        forthChild: {
          waitForDropdownToLoad: () =>
            this._waitForSelectorToExist(this.selectors.lmsSearch.passengers.popup.forthChild.dropdown),
          setAgeTo: age => this._setAgeForChildFour(age, this.selectors.lmsSearch.passengers.popup.forthChild.dropdown),
        },
        fifthChild: {
          waitForDropdownToLoad: () =>
            this._waitForSelectorToExist(this.selectors.lmsSearch.passengers.popup.fifthChild.dropdown),
          setAgeTo: age => this._setAgeForChildFive(age, this.selectors.lmsSearch.passengers.popup.fifthChild.dropdown),
        },
      },
    };
  }

  get filtering() {
    return {
    };
  }

  get sortingPanel() {
    return {
      currentSelected: this._returnCurrentSelectedSortingValue,
    };
  }

  get hotelList() {
    return {
      hotels: this._getListOfAllHotels,
      firstHotel: {
        duration: () => this._returnDuration(),
        expectDurationToBeNoneOrWithin: (from, to) => this._expectDurationToBeNoneOrWithin(from, to),
      },
    };
  }
}

/**
 * @type {LMSPage}
 */
export default new LMSPage();
