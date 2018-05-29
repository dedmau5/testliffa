import moment from 'moment';
import SectionField from './section-field';
import Month from './date/month';

const selectors = {
  overlay: '.select-overlay',
  month: '.bsh-date-picker__month-container',
  arrow: {
    next: '.bsh-date-picker__next-month-button.tcneicon-arrow-right',
    previous: '.bsh-date-picker__prev-month-button.tcneicon-arrow-left',
  },
};

const findClosestDate = (days, date) => {
  if (days.length < 1) return null;

  return days.reduce((previous, current) => (Math.abs(date.diff(current.date)) < Math.abs(date.diff(previous.date)) ? current : previous));
};

const addDaysFromNeigbouringMonths = (months, startIndex, index) => {
  const days = [];
  const previousMonth = months[startIndex - index];
  const nextMonth = months[startIndex + index];

  if (previousMonth !== undefined) {
    days.push(...previousMonth.days);
  }
  if (nextMonth !== undefined) {
    days.push(...nextMonth.days);
  }

  return days;
};

const getNearestDate = (months, date) => {
  let index = 0;
  let closestDate = null;
  const startIndex = months.findIndex(month => month.number === date.month() + 1);

  while (closestDate === null) {
    const days = addDaysFromNeigbouringMonths(months, startIndex, index);
    closestDate = findClosestDate(days, date);
    index += 1;
  }

  return closestDate;
};

const getScrollDirection = (months, wantedMonth) => {
  let direction;
  months.forEach((month) => {
    direction = (month < wantedMonth) - (month > wantedMonth);
  });

  return direction;
};

const createDate = (y, m, d) => moment({ year: y, month: m - 1, day: d });

class Datepicker extends SectionField {
  constructor(element) {
    super(element);
    this.overlay = browser.element(selectors.overlay);
  }

  open() {
    this.element.click();
    this.overlay.waitForExist(3000);
  }

  /**
   * Checks if overplay is open.
   *
   * @readonly
   * @returns {boolean}
   * @memberof Datepicker
   */
  get isOpen() {
    return this.overlay.isExisting();
  }

  /**
   * Selectes given date. If date is not found. Select nearest(optional).
   *
   * @param {number} y
   * @param {number} m
   * @param {number} d
   * @param {boolean} [shouldFindClosestDate=true]
   * @returns {boolean} Returns if date was selected.
   * @memberof Datepicker
   */
  selectDate(y, m, d, shouldFindClosestDate = true) {
    this.scrollToMonth(y, m);

    const selectedMonth = this.months.find(month => month.number === m && month.year === y);
    let selectedDay = selectedMonth.days.find(day => day.number === d);

    if (selectedDay !== undefined) {
      selectedDay.select();
      return true;
    }

    if (shouldFindClosestDate === false) {
      return false;
    }

    const date = createDate(y, m, d);
    selectedDay = getNearestDate(this.months, date);
    selectedDay.select();
    return true;
  }

  /**
   *  Scrolls to given month.
   *
   * @param {number} year
   * @param {number} month
   * @returns {boolean} Returns true if scrolled and false if month is already in view.
   * @memberof Datepicker
   */
  scrollToMonth(year, month) {
    if (this.isMonthInView(month, year)) {
      return false;
    }

    const date = createDate(year, month, 1);
    const direction = getScrollDirection(this.monthsInView, date);
    const refMonth = direction > 0 ? moment.max(this.monthsInView) : moment.min(this.monthsInView);
    const monthDiff = date.diff(refMonth, 'months', true);
    const absMonthDiff = Math.abs(monthDiff);

    for (let index = 0; index < absMonthDiff; index += 1) {
      if (direction > 0) {
        this.nextMonth();
      } else {
        this.previousMonth();
      }
    }

    return true;
  }

  /**
   * Get all months in the calender (visible and hidden).
   *
   * @readonly
   * @returns {Array.<Month>}
   * @memberof Datepicker
   */
  get months() {
    const monthElements = this.overlay.elements(selectors.month).value;
    return monthElements.map(month => new Month(month));
  }

  /**
   * Click on nextMonth arrow.
   *
   * @memberof Datepicker
   */
  nextMonth() {
    this.overlay.click(selectors.arrow.next);
  }

  /**
   * Click on previousMonth arrow.
   *
   * @memberof Datepicker
   */
  previousMonth() {
    this.overlay.click(selectors.arrow.previous);
  }

  /**
   * Returns all months that are in view.
   *
   * @readonly
   * @returns {Array.<moment>}
   * @memberof Datepicker
   */
  get monthsInView() {
    return this.months.filter(month => month.isVisible).map(month => month.date);
  }

  /**
   * Retuns if month is in dom view.
   *
   * @param {number} month
   * @param {number} year
   * @returns {boolean}
   * @memberof Datepicker
   */
  isMonthInView(month, year) {
    return this.monthsInView.find(inView => inView.month() === month - 1 && inView.year() === year) !== undefined;
  }
}

export default Datepicker;
