import {
    locateElementAndClickOnIt,
    getElementWithinElement,
    getElementsWithinElement,
    getElements
} from "../../../tools/elements";


const selectors = {
    topListResortGroups: "#resultlistTop > div.resort-group",
    additionalResortGroups: "#additional-area-resort-list > div > div.resort-group",


    majorDestination: {
        name: "div.h > h3",
        resorts: "div.resorts",
    },

    resorts: "div.resort-group > div.resorts > div.hit",

    resort: {
        name: "div.h > h3",
        numberOfHotels: "div.number-of-hotels-link",
        readMoreButton: "div.resort-prio-readMoreBtn > a"
    }
};


class MajorDestination {
    constructor( resort ) {
        this._name = getElementWithinElement( resort, selectors.majorDestination.name ).getText();
        this._resorts = getElementWithinElement( resort, selectors.majorDestination.resorts );
    }

    get name() { return this._name; }
    get resorts() { return this._resorts; }
}


class MinorDestination {
    constructor( resort ) {
        this._name = getElementWithinElement( resort, selectors.resort.name ).getText();
        this._numberOfHotels = parseInt(
            getElementWithinElement( resort, selectors.resort.numberOfHotels ).getText()
                .replace("(", ""),
            10
        );

        const readMoreButton = getElementWithinElement( resort, selectors.resort.readMoreButton );
        this._readMoreButton = {
            click: readMoreButton ? readMoreButton.click : null
        };
    }

    get name() { return this._name; }
    get numberOfHotels() { return this._numberOfHotels; }
    get readMoreButton() { return this._readMoreButton; }
}


class Inspiration {
    /**
     * @returns {MajorDestination[]}
     */
    get majorDestinations() {
        return getElements( `${selectors.additionalResortGroups},${selectors.topListResortGroup}` ).map(
            resort => new MajorDestination( resort )
        )
    }

    /**
     * @param majorDestination string
     * @param destinations Array<MajorDestination>
     * @returns {MinorDestination[]}
     */
    getMinorDestinationsFor( majorDestination, destinations ) {
        if ( ! Array.isArray( destinations ) || destinations.length === 0 ) return null;

        let destination = destinations.find(
            destination => destination.name === majorDestination
        );

        if ( ! destination ) return null;

        return getElementsWithinElement( destination.resorts.value, selectors.resorts ).map(
            resort => new MinorDestination( resort )
        )
    }
}

export default new Inspiration();