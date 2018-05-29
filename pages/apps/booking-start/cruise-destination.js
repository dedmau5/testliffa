import CommonDestination  from './common-destination';
import { CommonDeparture } from './common-departure';

export default class CruiseDestination extends CommonDestination {
  constructor(selector) {
    super(selector);

    console.error(`selector: ${selector}`);

    this.commonDeparture = new CommonDeparture(selector);
    // this._commonDestination = new CommonDestination(selector);
  }

  select(name) {
    console.log(this.commonDeparture);
    debugger;
    return this.commonDeparture.select(name);
    // return super._commonDestination.select(name);
  }
}
