import SectionField from './section-field';

const selectors = {
  airport: '.departure-select__item',
};

class Departure extends SectionField {
  /**
   * Selects a airport.
   *
   * @param {string} airportName
   * @returns {boolean}
   * @memberof Departure
   */
  select(airportName) {
    this.airports.find(airport => airport.name === airportName).select();
  }

  get airports() {
    if (!this.isOpen) this.open();

    const airportElements = this.element.elements(selectors.airport).value;

    return Array.map(airportElements, airport => ({
      name: airport.getText(),
      select: () => airport.click(),
    }));
  }
}

export default Departure;
