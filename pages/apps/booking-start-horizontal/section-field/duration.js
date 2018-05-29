import SectionField from './section-field';

const selectors = {
  noDuration: '.bookingstart-section.bookingstart-section--no-duration-field',
  header: {
    independent: '[data-wdio-header-type="independent"]',
    charter: '[data-wdio-header-type="charter"]',
  },
  duration: '.duration-select__item',
};

const select = (items, value) => {
  const found = items.find(item => item.getText() === value);

  if (found) {
    found.click();
    return true;
  }

  return false;
};

class Duration extends SectionField {
  constructor(element) {
    super(element);
    this.noDurationField = browser.element(selectors.noDuration);
  }

  /**
   * Check if duration section exists.
   *
   * @returns {boolean}
   */
  isExisting() {
    this.element.waitForExist(selectors.home, 3000);

    return this.element.isExisting(selectors.home);
  }

  /**
   * Check if duration section should exist.
   *
   * @returns {boolean}
   */
  shouldBeExisting() {
    return this.noDurationField.value === null;
  }

  get independent() {
    if (!this.isOpen) this.open();

    const independentDurationsElements = this.element.elements(`${selectors.header.independent} ~ ${selectors.duration}`).value;

    return {
      select: duration => select(independentDurationsElements, duration),
    };
  }

  get charter() {
    if (!this.isOpen) this.open();

    const charterDurationsElements = this.element.elements(`${selectors.header.charter} ~ ${selectors.duration}`).value;

    return {
      select: duration => select(charterDurationsElements, duration),
    };
  }

  get hasCharterDurations() {
    this.element.waitForExist(selectors.header.charter, 3000);

    return this.element.isExisting(selectors.header.charter);
  }

  get hasIndependentDurations() {
    this.element.waitForExist(selectors.header.independent, 3000);

    return this.element.isExisting(selectors.header.independent);
  }
}

export default Duration;
