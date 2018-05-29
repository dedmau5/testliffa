import SectionField from './section-field';

const selectors = {
  pax: {
    room: '.pax-select > .pax-select__room',
    rooms: '.pax-select > .pax-select__room-selector > select',
    adult: '.pax-select__adult-selector > select',
    children: '.pax-select__child-selector > select',
    childAges: '.pax-select__child-age-selector',
  },
  confirm: '.pax-select__confirm-button',
};

/**
 * Gets the offset for where the rooms start. On CP room start at 0. At independent room start at 1.
 *
 * @returns {number}
 */
const getRoomOffset = () => {
  let roomOffset = 0;

  browser.waitUntil(() => {
    if (browser.isExisting(`${selectors.pax.room}:nth-child(1)`)) {
      return true;
    } else if (browser.isExisting(`${selectors.pax.room}:nth-child(2)`)) {
      roomOffset = 1;
      return true;
    }

    return false;
  }, 20000);
  return roomOffset;
};

class Pax extends SectionField {
  /**
   *
   *
   * @param {number} numberOfRooms
   * @memberof Pax
   */
  setRooms(numberOfRooms) {
    this.element.selectByValue(selectors.pax.rooms, numberOfRooms.toString());
  }

  /**
   *
   *
   * @readonly
   * @returns {string}
   * @memberof Pax
   */
  get rooms() {
    return this.element.element(selectors.pax.room).getValue();
  }

  /**
   *  Set numbers of adult passengers.
   *
   * @param {string} numberOfAdults
   * @param {number} [room=null]
   * @memberof Pax
   */
  setAdults(numberOfAdults, room = null) {
    const selector = room === null ? `${selectors.pax.room} ${selectors.pax.adult}` : `${selectors.pax.room}:nth-child(${room + getRoomOffset()}) ${selectors.pax.adult}`;

    this.element.selectByValue(selector, numberOfAdults);
  }

  /**
   * Set numbers of children.
   *
   * @param {string} numberOfChildren
   * @param {number} [room=null]
   * @memberof Pax
   */
  setChildren(numberOfChildren, room = null) {
    const selector = room === null ? `${selectors.pax.room} ${selectors.pax.children}` : `${selectors.pax.room}:nth-child(${room + getRoomOffset()}) ${selectors.pax.children}`;

    this.element.selectByValue(selector, numberOfChildren);
  }

  /**
   * Object to setup room. Gives access to set number of adults and number of children. Also possible to set ages for children via this object.
   *
   * @param {number} nthRoom - Index (starting with 1) of the room that you want to set up.
   * @returns {{numberOfAdults: function, numberOfChildren: function, child: object}}
   * @memberof Pax
   */
  room(nthRoom) {
    return {
      numberOfAdults: (numberOfAdults) => {
        this.setAdults(numberOfAdults, nthRoom);
      },
      numberOfChildren: (numberOfChildren) => {
        this.setChildren(numberOfChildren, nthRoom);
      },
      child: nthChild => this.child(nthChild, nthRoom),
    };
  }

  /**
   * Object to access a child and there after set the age.
   *
   * @param {number} nthChild - Index (starting with 1) of the child that you want to set age for.
   * @param {number} [nthRoom=null] - The room to get the child age setter for.
   * @returns {{age: function()}}
   * @memberof Pax
   */
  child(nthChild, nthRoom = null) {
    const selector =
      nthRoom === null
        ? `${selectors.pax.room} ${selectors.pax.childAges}:nth-of-type(${nthChild}) > select`
        : `${selectors.pax.room}:nth-child(${nthRoom + getRoomOffset()}) ${selectors.pax.childAges}:nth-of-type(${nthChild}) > select`;

    return {
      age: (value) => {
        this.element.selectByValue(selector, value);
      },
    };
  }

  /**
   * Clicks on confirm.
   *
   * @memberof Pax
   */
  confirm() {
    this.element.click(selectors.confirm);
  }
}

export default Pax;
