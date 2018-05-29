import moment from 'moment';

class Day {
  constructor(element, month, year) {
    this.element = element;
    this.month = month;
    this.year = year;
  }

  get number() {
    const dateString = this.element.getHTML().replace(/\s*(<[^>]*>)/g, ' ').trim();
    return parseInt(dateString, 10);
  }

  get date() {
    return moment({ year: this.year, month: this.month - 1, day: this.number });
  }

  select() {
    this.element.click();
  }
}

export default Day;
