// This file is for jenkins test purposes. Will fail on the last step
import CharterFlow from '../../../pages/apps/charter-flow/charterflow-pageobject';

describe('Charterflow: Test that will fail on purpose!', function () {
  this.retries(0);
  let hotelInfo;

  before(() => {
    CharterFlow.initiateCharterFlowFromBookingStart(2018, 7, 15);
    CharterFlow.waitUntilLoaded();
  }, 2);

  describe('Favorite functionality', () => {
    it('Should be able to set a hotel as a favorite', () => {
      CharterFlow.setFavourite(1, true);
    });

    it('Should be able to unset a hotel as a favorite', () => {
      CharterFlow.setFavourite(1, false);
    });
  });
  describe('Price-details popup', () => {
    it('Should be able to open the price-details popup for a hotel', () => {
      hotelInfo = CharterFlow.openPriceDetails(1);
    });

    it('Should present correct pricing (total is a sum of the costs and the same price as listed in hotel list', () => {
      CharterFlow.verifyPriceDetails(hotelInfo);
    });

    it('Should present correct trip information', () => {
      CharterFlow.verifyPriceDetailsInfo(hotelInfo, '2 vuxna', 'Stockholm-Arlanda');
    });

    it('Should be able to close popup', () => {
      CharterFlow.closePriceDetails();
    });
  });
  describe('Testing expanding the hotel list view', () => {
    it('Should scroll down to bottom of the page', () => {
      CharterFlow.scrollToBottom();
    });

    it('Should press the "More Hotels"-button and get a longer hotel list', () => {
      // This step will fail.
      CharterFlow.closeMap();
    });
  });
});
