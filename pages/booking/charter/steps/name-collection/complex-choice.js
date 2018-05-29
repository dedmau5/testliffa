import {
    getElementWithinElement,
    getElementsWithinElement,
    getElementAttribute
} from '../../../../../tools/elements';

import { SimpleChoice } from './simple-choice';


export class ComplexChoice {
    constructor( element ) {
        this._element = element;

        this.selectors = {
            dropdowns: {
                home: "div.extra-details-box > div.extra-dropdowns",
                select: "div.extra-select > div > select"
            },

            checkboxes: {
                sameChoiceForEveryone: "div.same-extra-selection-checkbox > input[type=checkbox]"
            }
        };
    }

    /**
     * @private
     */
    get _baseElement() {
        if ( !this.__baseElement ) {
            this.__baseElement = getElementWithinElement(
                this._element.value,
                this.selectors.dropdowns.home
            );
        }

        return this.__baseElement;
    }

    /**
     * @returns {[SimpleChoice]}
     */
    get dropdowns() {
        if ( !this._dropdowns ) {
            const dropdownElements = getElementsWithinElement(
                this._baseElement.value,
                this.selectors.dropdowns.select
            );

            this._dropdowns = Array.map(
                dropdownElements,
                ( dropdown ) => {
                    const id = browser.elementIdAttribute(dropdown.ELEMENT, "id").value;
                    return new SimpleChoice( dropdown, `#${id}` );
                }
            );
        }

        return this._dropdowns;
    }

    /**
     * @returns {boolean}
     */
    get sameChoiceForEveryone() {
        return getElementWithinElement(
            this._baseElement.value,
            this.selectors.checkboxes.sameChoiceForEveryone
        ).getAttribute("checked");
    }

    /**
     * @param value {boolean}
     */
    set sameChoiceForEveryone( value ) {
        if ( this.sameChoiceForEveryone !== value ) {
            getElementWithinElement(
                this._baseElement.value,
                this.selectors.checkboxes.sameChoiceForEveryone
            ).click();
        }
    }
}