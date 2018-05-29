import IndependentFlow from '../../../../pages/apps/independent-flow/index';
import Page from '../../../../pages/page';
import { pricematrix, query } from '../../../../pages/apps/independent-flow/urls';
import paris from '../test-data/paris';
import { Translate } from '../../../../tools';

describe('Independent-Flow - PriceMatrix Test', () => {
  before(() => {
    const environmentUrl = Translate(pricematrix[browser.options.tc.environment]);

    const parisQuery = query.pricematrix
      .replace('{HotelId}', paris.hotelId)
      .replace('{ItemId}', paris.hotelId)
      .replace('{QueryHotelCD}', paris.hotelCode)
      .replace('{QueryDepID}', paris.departureId)
      .replace('{QueryCtryID}', paris.countryId)
      .replace('{QueryAreaID}', paris.areaId)
      .replace('{QueryResID}', paris.destinationId)
      .replace('{QueryDepDate}', paris.departureDate)
      .replace('{QueryRetDate}', paris.returnDate)
      .replace('{QueryChkInDate}', paris.departureDate)
      .replace('{QueryChkOutDate}', paris.returnDate)
      .replace('{QueryDur}', paris.duration)
      .replace('{QueryRoomAges}', paris.roomAges)
      .replace('{QueryUnits}', paris.units)
      .replace('{QueryAges}', paris.ages);

    Page.goTo(environmentUrl + parisQuery);
  });

  describe('Make sure that PriceMatrix is rendered', () => {
    it('Waits until Independent-flow price-matrix container is found', () => {
      IndependentFlow.priceMatrix.waitUntilLoaded();
    });

    it('Waits until roomlist has loaded', () => {
      const numberOfHotels = IndependentFlow.priceMatrix.rooms.length;

      expect(numberOfHotels).to.be.at.least(1, 'Can not find any rooms');
    });
  });

  describe('Perform PriceMatrix info checks', () => {
    it('Check that there is a selected room', () => {
      const selectedRooms = IndependentFlow.priceMatrix.rooms.filter(room => room.isSelected);

      expect(selectedRooms.length).to.equal(1, 'No rooms are selected by default');
    });

    it('Check that selected room price and total price is equal', () => {
      const selectedRoom = IndependentFlow.priceMatrix.rooms.find(room => room.isSelected);
      const { totalPrice } = IndependentFlow.priceMatrix.summary;

      expect(selectedRoom.price).to.equal(totalPrice, 'Selected price is not equal to total price');
    });
  });

  describe('Perform checks on flight information', () => {
    it('Open flight information popup', () => {
      IndependentFlow.priceMatrix.flightDetails.open();
    });

    it('Check outbound label text', () => {
      const headerText = IndependentFlow.priceMatrix.flightDetails.information.outbound.date;

      expect(headerText).to.not.be.empty;
    });

    it('Check homebound label text', () => {
      const headerText = IndependentFlow.priceMatrix.flightDetails.information.homebound.date;

      expect(headerText).to.not.be.empty;
    });

    it('Close flight information popup', () => {
      IndependentFlow.priceMatrix.flightDetails.close();
    });
  });

  describe('Perform checks on price details', () => {
    it('Expand price details', () => {
      IndependentFlow.priceMatrix.priceDetails.expand();
    });

    it('Check that total price in price details is equal to total price in summary', () => {
      const priceDetailsTotalPrice = IndependentFlow.priceMatrix.priceDetails.totalPrice;
      const summaryTotalPrice = IndependentFlow.priceMatrix.summary.totalPrice;

      expect(priceDetailsTotalPrice).to.equal(summaryTotalPrice, 'Total price in price details is not equal to total price in summary');
    });

    it('Collapse price details', () => {
      IndependentFlow.priceMatrix.priceDetails.close();
    });
  });

  describe('Check room change', () => {
    // cant use arrow function since we need to use 'this.skip()'
    // eslint-disable-next-line func-names
    it('Choose another room if available', function () {
      const numberOfRooms = IndependentFlow.priceMatrix.rooms.length;

      if (numberOfRooms <= 1) {
        this.skip();
      }

      const roomBeforeSelection = IndependentFlow.priceMatrix.rooms.find(room => room.isSelected).description;

      IndependentFlow.priceMatrix.rooms[1].select();

      const roomAfterSelection = IndependentFlow.priceMatrix.rooms.find(room => room.isSelected).description;

      expect(roomBeforeSelection).to.not.equal(roomAfterSelection, 'Room description is the same after changing rooms');
    });
  });

  describe('Continue and book', () => {
    it('Click on book button', () => {
      IndependentFlow.priceMatrix.summary.select();
    });
  });
});
