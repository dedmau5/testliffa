import CharterFlow from '../../../pages/apps/charter-flow/charterflow-pageobject';

describe('Charterflow: Testing sorting orders', function () {
  this.retries(0);

  before(() => {
    CharterFlow.initiateCharterFlowFromBookingStart(2018, 7, 15);
    CharterFlow.waitUntilLoaded();
  }, 2);

  it('Should open sort dropdown and choose Lowest price', () => {
    CharterFlow.sortList(2);
  });

  it('Should sort the hotel list after price, ascending', () => {
    CharterFlow.verifyListOrder('price', 'ascending');
  });

  it('Should open sort dropdown and choose Highest price', () => {
    CharterFlow.sortList(3);
  });

  it('Should sort the hotel list after price, descending', () => {
    CharterFlow.verifyListOrder('price', 'descending');
  });

  it('Should open sort dropdown and choose highest standard', () => {
    CharterFlow.sortList(4);
  });

  it('Should sort the hotel list after standard, descending', () => {
    CharterFlow.verifyStandardOrder();
  });

  it('Should open sort dropdown and choose customer grade', () => {
    CharterFlow.sortList(5);
  });

  it('Should sort the hotel list after customer grade, descending', () => {
    CharterFlow.verifyListOrder('customerGrade', 'descending');
  });
});
