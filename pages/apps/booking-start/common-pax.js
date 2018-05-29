import { locateElementAndClickOnIt, getElements } from '../../../tools/elements';
import { BasicFunctionality } from './basic-functionality';


export class CommonPax extends BasicFunctionality {

    /**
     * Creates an instance of CommonPax.
     * 
     * @param {string} selector
     */
    constructor(selector) {
        super();
        const home = `${selector} > div.bookingstart-section__pax-select`;

        this.selectors.home = home;
        this.selectors.pax = {
            room: `${home} div.pax-select > .pax-select__room`,
            rooms: `${home} div.pax-select > div.pax-select__room-selector > select`,
            adult: `.pax-select__adult-selector > select`,
            children: `.pax-select__child-selector > select`,
            childAges: `.pax-select__child-age-selector`
        };

        this.selectors.confirm = '.pax-select__confirm-button';
    }

    /**
    * Opens the pax menu.
    *
    */
    open() {
        super.open(this.selectors.home);
        browser.waitForExist(this.selectors.confirm, 30000);
    }

    /**
     * Check if pax menu is open
     *
     */
    isPaxMenuAlreadyOpen() {
        return browser.isVisible(this.selectors.overlay);
    }

    /**
     * Set numbers of rooms
     * 
     * @param {number} numberOfRooms
     * 
     * @memberOf CommonPax
     */
    set rooms(numberOfRooms) {
        browser.selectByValue(this.selectors.pax.rooms, numberOfRooms.toString());
    }

    /**
     * Returns the number of rooms.
     *
     * @returns number
     *
     * @memberOf CommonPax
     */
    get rooms() {
        return getElements(this.selectors.pax.room).length;
    }

    get roomOffset() {
        if ( this._roomOffset ) {
            return this._roomOffset;
        }

        let roomOffset = 0;

        browser.waitUntil( () => {
            if ( browser.isExisting( `${this.selectors.pax.room}:nth-child(1)` ) ) {
                return true;
            } else if ( browser.isExisting( `${this.selectors.pax.room}:nth-child(2)` ) ) {
                roomOffset = 1;
                return true;
            }

            return false;
        }, 20000 );

        this._roomOffset = roomOffset;
        return roomOffset;
    }

    /**
     * Set numbers of adult passengers.
     *
     * @param numberOfAdults {string} Number of adults given as a string.
     * @param room=null {number} The room to set number of adults for.
     */
    setAdults(numberOfAdults, room = null) {
        const selector = room === null ? 
            `${this.selectors.pax.room} ${this.selectors.pax.adult}` :
            `${this.selectors.pax.room}:nth-child(${room + this.roomOffset}) ${this.selectors.pax.adult}`;

        browser.selectByValue(selector, numberOfAdults);
    }

    set adults(numberOfAdults) {
        this.setAdults(numberOfAdults);
    }

    /**
     * Set numbers of children
     *
     * @param numberOfChildren {string} Number of children given as a string.
     * @param room=null {number} The room to set number of children for.
     */
    setChildren(numberOfChildren, room = null) {
        const selector = room === null ?
            `${this.selectors.pax.room} ${this.selectors.pax.children}` :
            `${this.selectors.pax.room}:nth-child(${room + this.roomOffset}) ${this.selectors.pax.children}`;

        browser.selectByValue(selector, numberOfChildren);
    }

    set children(numberOfChildren) {
        this.setChildren(numberOfChildren);
    }

   /**
    * Object to setup room. Gives access to set number of adults and number of children. Also possible to set ages for children via this object.
    * 
    * @param {number} nthRoom Index (starting with 1) of the room that you want to set up.
    * @returns
    */
   room(nthRoom){
        return { 
            numberOfAdults: (numberOfAdults) => { this.setAdults(numberOfAdults, nthRoom); },
            numberOfChildren: (numberOfChildren) => { this.setChildren(numberOfChildren, nthRoom); },
            child: (nthChild) => this.child(nthChild, nthRoom)
        };
    }
    
    /**
     *Object to access a child and there after set the age.
     * 
     * @param nthChild {number} Index (starting with 1) of the child that you want to set age for.
     * @param nthRoom=null {number} The room to get the child age setter for.
     */
    child(nthChild, nthRoom = null) {
        const selector = nthRoom === null ?
            `${this.selectors.pax.room} ${this.selectors.pax.childAges}:nth-of-type(${nthChild}) > select` :
            `${this.selectors.pax.room}:nth-child(${nthRoom + this.roomOffset}) ${this.selectors.pax.childAges}:nth-of-type(${nthChild}) > select`;

        return {
            age: (value) => { browser.selectByValue(selector, value); }
        };
    }

    confirm() {
        locateElementAndClickOnIt(this.selectors.confirm);
    }
}