/* eslint-disable import/prefer-default-export*/
import { locateElementAndClickOnIt } from '../../../tools/elements';

import { BasicFunctionality } from './basic-functionality';
import moment from 'moment';

export class CommonDatepicker extends BasicFunctionality {
  /**
   * Creates an instance of CommonDatepicker.
   *
   * @param {string} selector
   *
   * @memberOf CommonDatepicker
   */
  constructor(selector) {
    super();
    const datepicker = 'div.bsh-date-picker';

    this.selectors.home = `${selector} > div.bookingstart-section__date-select`;

    this.selectors.month = {
      home: `${datepicker}__month-container`,
      name: `${datepicker}__name-of-month`,
    };

    this.selectors.arrows = {
      next: 'div.bsh-date-picker__next-month-button',
      prev: 'div.bsh-date-picker__prev-month-button',
    };

    this.selectors._selectedDepartureDate = `${this.selectors.home} .form-field__departure > span`;
  }

  /**
   * Opens the overlay for departure.
   *
   * @param {string} selector
   */
  open(selector = null) {
    super.open(selector || this.selectors.home);
    browser.waitForExist(this.selectors.close, 30000);
  }

  /**
   * Clicks on the next month arrow. Returns false if end of calender.
   *
   * @returns {boolean}
   */
  clickNextMonth() {
    if (!browser.isVisible(this.selectors.arrows.next)) {
      return false;
    }

    locateElementAndClickOnIt(this.selectors.arrows.next);
    return true;
  }

  /**
   * Clicks on the previous month arrow. Returns false if end of calender.
   *
   * @returns {boolean}
   */
  clickPreviousMonth() {
    if (!browser.isVisible(this.selectors.arrows.prev)) {
      return false;
    }

    locateElementAndClickOnIt(this.selectors.arrows.prev);
    return true;
  }

  /**
   * Selects a given date.
   *
   * @param year - - - - - {number}.
   * @param month {number}.
   * @param day {number}.
   * @param allowChoosingNearByDates {boolean}.
   * @param numberOfNearbyMonthsToAllow=3 {number}.
   *
   * @return {boolean}
   * Returns whether the selection was successful or not.
   */
  selectDate(year, month, day, allowChoosingNearByDates, numberOfNearbyMonthsToAllow = 3) {
    const _date = moment({ years: year, months: month, days: day });
    const _scrollDate = moment({ years: year, months: month - 1, days: day });

    this.scrollToMonth(_scrollDate);
    const wantedDateExists = this._select(day.toString(), allowChoosingNearByDates);

    if (wantedDateExists) {
      return true;
    }

    return allowChoosingNearByDates ? this._selectNearByDate(_date, numberOfNearbyMonthsToAllow) : false;
  }

  /**
   * Method trying to find a available date in the future.
   *
   * @param {moment} date - The date the traveler wanted to go.
   * @param {any} numberOfNearbyMonthsToAllow - The number of month that the traveler are willing to wait from the original date.
   * @returns {boolean} Returns true if a available date is found, otherwise false.
   * @private
   */
  _selectNearByDate(date, numberOfNearbyMonthsToAllow) {
    for (let i = 1; i < numberOfNearbyMonthsToAllow; i++) {
      this.scrollToMonth(date.add(i, 'month'));

      const day = date.date.toString();
      const availableDateExist = this._select(day, true);
      if (availableDateExist) {
        return true;
      }
    }

    return false;
  }

  /**
   * Selects a given day.
   *
   * @param day - {string}.
   * @param allowChoosingNearByDates - {boolean}.
   * @param numberOfNearbyMonthsToAllow - {number}.
   *
   * @returns {boolean} Returns true or false if we could to find item in list and click on it.
   * @private
   */
  _select(day, allowChoosingNearByDates) {
    for (const _date of this.availableDates) {
      if (_date.title === day) {
        browser.elementIdClick(_date.id);
        return true;
      }
    }

    if (allowChoosingNearByDates && this.availableDates.length > 0) {
      browser.elementIdClick(this.availableDates[0].id);
      return true;
    }

    return false;
  }

  /**
   * Scrolls to the selected month.
   *
   * @param selectedDate - {moment}.
   *
   * @return {boolean}
   * Returns whether the scrolling was successful or not.
   */
  scrollToMonth(selectedDate) {
    let _couldGoToNextMonth = false;
    const visibleMonths = this.visibleMonths;
    const lastElementOfVisisbleMonths = visibleMonths[visibleMonths.length - 1];

    for (const _month of visibleMonths) {
      if (moment(selectedDate).isSame(_month.date, 'month')) {
        this.selectedMonth = _month.id;
        return true;
      }
    }

    if (moment(selectedDate).isBefore(lastElementOfVisisbleMonths.date, 'month')) {
      _couldGoToNextMonth = this.clickPreviousMonth();
    }

    if (moment(selectedDate).isAfter(lastElementOfVisisbleMonths.date, 'month')) {
      _couldGoToNextMonth = this.clickNextMonth();
    }

    this.scrollToMonth(selectedDate);

    return _couldGoToNextMonth;
  }

  /**
   * Gets all available dates from a specific month.
   *
   * @returns {[{
   *     title: string,
   *     id: string,
   * }]}
   * @private
   */
  get availableDates() {
    const _availableDates = browser.elementIdElements(this.selectedMonth, 'div.bsh-date-picker__day--selectable');

    if (!_availableDates || !_availableDates.value) {
      return [];
    }

    return Array.map(_availableDates.value, _date => ({
      title: browser.elementIdText(_date.ELEMENT).value,
      id: _date.ELEMENT,
    }));
  }

  /**
   * Sets current selected element.
   *
   */
  set selectedMonth(value) {
    this._selectedMonth = value;
  }

  /**
   * Gets current selected element.
   *
   */
  get selectedMonth() {
    return this._selectedMonth;
  }

  /**
   * Gets current selected departure date.
   *
   * @returns {{year: string, month: string, day: string}}
   */
  get selectedDepartureDate() {
    const dateStringArray = browser.getText(this.selectors._selectedDepartureDate).split('-');

    return {
      year: dateStringArray[0],
      month: dateStringArray[1],
      day: dateStringArray[2],
    };
  }

  /**
   * Gets all visibleMonths in view
   *
   * @returns {[{
   *     date: moment,
   *     id: string,
   * }]}
   */

  get visibleMonths() {
    const _months = browser.elements('div.bsh-date-picker__month-container');

    if (!_months || !_months.value) {
      return [];
    }

    this._visibleMonths = [];

    // /loops all months and checks second thursday each month to se if item is in view
    for (const _month of _months.value) {
      const _monthDateElement = browser.elementIdElement(_month.value.ELEMENT, 'div.bsh-date-picker__name-of-month');
      const _monthDate = browser.elementIdAttribute(_monthDateElement.value.ELEMENT, 'data-wdio-date');
      const _secondThursdayOfMonth = browser.elementIdElement(
        _month.value.ELEMENT,
        'div.bsh-date-picker__month .bsh-date-picker__week:nth-of-type(2) .bsh-date-picker__day:nth-of-type(5)'
      );
      const _thursdayDate = browser.elementIdText(_secondThursdayOfMonth.value.ELEMENT).value;

      if (!_thursdayDate) {
        continue;
      }

      this._visibleMonths.push({
        date: moment(_monthDate.value),
        id: _month.value.ELEMENT,
      });
    }

    return this._visibleMonths;
  }
}
