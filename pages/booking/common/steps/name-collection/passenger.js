import {
    getInnerHTML,
    getElementValue,
    setElementValue
} from '../../../../../tools/elements';
import { Translate } from '../../../../../tools';


class Passenger {
    /**
     * @param selector {string} A selector that selects a specific passenger div.
     */
    constructor(selector) {
        this.selectors = {
            heading: `${selector} > h3`,
            firstname: `${selector} fieldset.passenger-input-fields > div.firstname > input`,
            lastname: `${selector} fieldset.passenger-input-fields > div.lasttname > input`,
            birthday: `${selector} fieldset.passenger-input-fields > div.birthdate > input`,
            gender: `${selector} fieldset.passenger-input-fields > div.gender select`
        };

        this.regexps = {
            validBirthdayInput: /^[0-9]{6}$/,
            age: Translate({
                dk: /([0-9]+) år/,
                fi: /([0-9]+) v/,
                no: /([0-9]+) år/,
                se: /([0-9]+) år/
            })
        };
    }

    /**
     * @returns {string}
     * Returns the value of the passenger's heading.
     */
    get heading() {
        return getInnerHTML(this.selectors.heading);
    }

    isAChild() {
        return this.regexps.age.test(this.heading);
    }

    /**
     * @returns {string}
     * Returns the value of the passenger's firstname field.
     */
    get firstname() {
        return getElementValue(this.selectors.firstname);
    }

    /**
     * Sets the passenger's firstname.
     *
     * @param value {string} A firstname.
     */
    set firstname(value) {
        setElementValue(this.selectors.firstname, value);
    }

    /**
     * @returns {string}
     * Returns the value of the passenger's lastname field.
     */
    get lastname() {
        return getElementValue(this.selectors.lastname);
    }

    /**
     * Sets the passenger's lastname.
     *
     * @param value {string} A lastname.
     */
    set lastname(value) {
        setElementValue(this.selectors.lastname, value);
    }

    /**
     * @returns {string}
     * Returns the value of the passenger's birthday field.
     */
    get birthday() {
        return getElementValue(this.selectors.birthday);
    }

    /**
     * Sets the birthday for the passenger.
     *
     * @param value {string} A valid birthday 'YYMMDD' given as a string.
     */
    set birthday(value) {
        if (!this.regexps.validBirthdayInput.test(value)) {
            throw new Error(`The given value '${value}' is not an acceptable birthday input!`);
        }

        setElementValue(this.selectors.birthday, value);
    }

    /**
     * Returns whether the passenger has a gender.
     *
     * @returns {boolean}
     */
    hasGender() {
        return browser.isExisting( this.selectors.gender );
    }

    /**
     * Returns the selected <option> value of the passenger's gender field.
     *
     * @returns {string} The selected gender <option> value.
     */
    get gender() {
        return getElementValue(this.selectors.gender);
    }

    /**
     * Sets the gender for the passenger.
     *
     * @param value {string} A valid gender <option> value.
     */
    set gender(value) {
        browser.selectByValue(this.selectors.gender, value);
    }
}

export { Passenger };