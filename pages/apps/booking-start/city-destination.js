import CommonDestination from './common-destination.js';

// Using decoration pattern to extend functionality to a component
// alaso possible to delete functionality

// let component = new CommonDestination('div.bookingstart-section--package');
// component.greetings = 'hello';
// export let CityDestination = component;
    


export class CityDestination extends CommonDestination {

    constructor(selector){
        super(selector);
    }

    get city() {
        return {
            toggle: (item) => super._toggle(super.city, item),
        };
    }

    /**
     * Gets all areas under a selected country
     *  
     * @returns {[{
     *     areas: array,
     * }]}
     */
    get cities() {
        const cityElements = browser.elements('.bookingstart-section--city div.departure-select div.departure-select__item');
        if (!cityElements || !cityElements.value) {
            return false;
        }

        this._cities = cityElements.value.map(cityElement => {
            return {
                title: browser.elementIdText(cityElement.ELEMENT).value.trim(),
                id: cityElement.ELEMENT
            };
        });
        
        return this._cities;
    }

    /**
     * @param value {[{
     *     areas: array,
     * }]}
     */
    set cities(value) {
        this._cities = value;
    }

    select(item){
        for (let _city of this.cities) {
            if (_city.title === item) {
                browser.elementIdClick(_city.id);
                return true;
            }
        }

        return false;
    }
}


