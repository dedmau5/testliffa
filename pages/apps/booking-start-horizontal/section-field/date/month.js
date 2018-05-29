import moment from 'moment';
import Day from './day';

const selectors = {
  name: '.bsh-date-picker__name-of-month',
  day: {
    selectable: '.bsh-date-picker__day--selectable',
  //  disabled: '.bsh-date-picker__day--disabled',
  },
};

const attributes = {
  date: 'data-wdio-date',
};

class Month {
  constructor(element) {
    this.element = element;
  }

  /**
   * Returns the months date (first day of month).
   *
   * @readonly
   * @returns {moment}
   * @memberof Month
   */
  get date() {
    const date = this.element.element(selectors.name).getAttribute(attributes.date);
    return moment(date);
  }

  get year() {
    return this.date.year();
  }

  get number() {
    return this.date.month() + 1;
  }

  get isVisible() {
    return this.element.element(selectors.name).getText() !== '';
  }

  get days() {
    const days = this.element.elements(selectors.day.selectable).value;

    return Array.map(days, day => new Day(day, this.number, this.year));
  }
}

export default Month;
