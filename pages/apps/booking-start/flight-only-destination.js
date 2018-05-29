import CommonDestination from './common-destination.js';

export class FlightOnlyDestination extends CommonDestination {

    constructor(selector){
        super(selector);
    }

    get airport(){
        return { 
             select:  (item) => super.resort.select(item)
        };
    }
}
