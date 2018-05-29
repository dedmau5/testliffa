import IndependentFlow from '../../../../pages/apps/independent-flow/index';
import Page from '../../../../pages/page';

import { hotel } from '../../../../pages/apps/independent-flow/urls';
import { Translate } from '../../../../tools';

describe('Independent-flow - package-list', () => {
  before(() => {
    const environmentUrl = Translate(hotel[browser.options.tc.environment]);

    Page.goTo(environmentUrl);
  });

  describe('Can see hotel list', () => {
    it('Waits until Independent-flow package-list container is found', () => {
      IndependentFlow.hotelList.waitUntilFound();
    });

    it('Waits until hotels has loaded', () => {
      IndependentFlow.hotelList.waitUntilLoaded();
      const { hotels } = IndependentFlow.hotelList;
      expect(hotels.length).to.be.at.least(1, 'Can not find any hotels');
    });
  });

  describe('Check flight details popup ', () => {
    it('Open flight information popup', () => {
      IndependentFlow.hotelList.flightInformation.popup.open();
    });

    it('Check outbound label text', () => {
      const labelText = IndependentFlow.hotelList.flightInformation.popup.getOutboundLabelText();

      expect(labelText).to.not.be.empty;
    });

    it('Check homebound label text', () => {
      const labelText = IndependentFlow.hotelList.flightInformation.popup.getHomeboundLabelText();

      expect(labelText).to.not.be.empty;
    });

    it('Close flight information popup', () => {
      IndependentFlow.hotelList.flightInformation.popup.close();
    });
  });

  describe('Checking map', () => {
    it('Clicking on map link', () => {
      IndependentFlow.hotelList.panel.toggle.toMap();
    });

    it('Return to hotel-list ', () => {
      IndependentFlow.hotelList.panel.toggle.toList();
    });
  });

  describe('Checking price', () => {
    let firstHotel = null;

    it('Check if first hotel-item price matches price details', () => {
      [firstHotel] = IndependentFlow.hotelList.hotels;
      const hotelPrice = firstHotel.price;
      firstHotel.priceDetails.open();
      firstHotel.priceDetails.popup.waitUntilExist();
      const priceDetailsPrice = firstHotel.priceDetails.popup.information.totalPrice;

      expect(priceDetailsPrice).to.equal(hotelPrice, 'Price does not match');
    });

    it('Close price details popup', () => {
      firstHotel.priceDetails.popup.close();
    });
  });

  describe('Choose hotel', () => {
    it('Click on first hotel', () => {
      IndependentFlow.hotelList.hotels[0].select();
    });
  });
});
