import {
    getElement,
    getElements,
    getTextAsInteger
} from "../../../tools/elements";


const selectors = {
    meals: "div.extra-column2 > input[type=checkbox]"
};


export class Meal {
    /**
     * @param meal {WebdriverIO.Element}
     */
    constructor( meal ) {
        this._price = getTextAsInteger( meal, { treatAsPrice: true } );
        this._dataOwextraid = browser.elementIdAttribute( meal.ELEMENT, "data-owextraid" ).value;
    }

    get price() { return this._price; }
    get dataOwextraid() { return this._dataOwextraid; }
}


export class Meals {
    /**
     * @returns {Meal[]}
     */
    get meals() {
        return getElements( selectors.meals ).map(
            ( meal ) => {
                console.log( meal );
                return new Meal( meal );
            }
        );
    }

    /**
     * @param meal {Meal}
     */
    selectMeal( meal ) {
        getElement( `input[data-owextraid='${meal.dataOwextraid}']` ).click();
        browser.pause( 500 );
    }
}