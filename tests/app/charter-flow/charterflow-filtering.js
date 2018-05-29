import CharterFlow from '../../../pages/apps/charter-flow/charterflow-pageobject';

describe('Charterflow: Testing filtering options', function () {
  this.retries(0);

  before(() => {
    CharterFlow.initiateCharterFlowFromBookingStart(2018, 7, 15);
    CharterFlow.waitUntilLoaded();
  }, 2);

  it('Should press the filter button to open the filter view', () => {
    CharterFlow.openFilterView();
  });

  it('Should present the same number of hits on the "show"-button as there are hotels in the list', () => {
    CharterFlow.compareFilterHitsToHotelListLength();
  });
});
