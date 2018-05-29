import CharterFlow from '../../../pages/apps/charter-flow/charterflow-pageobject';

describe('Charterflow: Testing expansion of hotel list view and the toggling between map- and hotel list view', function () {
  this.retries(0);

  before(() => {
    CharterFlow.initiateCharterFlowFromBookingStart(2018, 7, 15);
    CharterFlow.waitUntilLoaded();
  }, 2);

  it('Should switch to the map view', () => {
    CharterFlow.toggleView('hotelMap');
  });

  it('Should switch to list view by clicking toggle list button', () => {
    CharterFlow.toggleView('hotelList');
  });

  it('Should switch to the map view', () => {
    CharterFlow.toggleView('hotelMap');
  });

  it('Should switch to list view by closing the map', () => {
    CharterFlow.closeMap();
  });
});
