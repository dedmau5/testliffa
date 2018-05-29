import IndependentFlow from '../../../../pages/apps/independent-flow/index';
import Page from '../../../../pages/page';
import { flight, query } from '../../../../pages/apps/independent-flow/urls';
import london from '../test-data/london';
import { Translate } from '../../../../tools';

describe('Independent-flow - package - flight list', () => {
  before(() => {
    const environmentUrl = Translate(flight[browser.options.tc.environment]);

    const londonQuery = query.flightList
      .replace('{QueryDepID}', london.departureId)
      .replace('{QueryCtryID}', london.countryId)
      .replace('{QueryResID}', london.resortId)
      .replace('{QueryDepDate}', london.departureDate)
      .replace('{QueryRetDate}', london.returnDate)
      .replace('{QueryDur}', london.duration)
      .replace('{QueryRoomAges}', london.roomAges)
      .replace('{QueryUnits}', london.units);

    Page.goTo(environmentUrl + londonQuery);
  });

  describe('Can see flight list', () => {
    it('Waits until flight list container is found', () => {
      IndependentFlow.flightList.waitUntilFound();
    });

    it('Waits until flight list container is loaded', () => {
      IndependentFlow.flightList.waitUntilLoaded(20000);
    });
  });

  describe('Can use sort', () => {
    it('Click on fastest sort tab', () => {
      IndependentFlow.flightList.tabs.fastest.select();
    });

    it('Check that the first flight is the fastest', () => {
      const { transports } = IndependentFlow.flightList;
      const fastestTransport = transports.reduce((prev, curr) => (prev.totalFlightTime <= curr.totalFlightTime ? prev : curr));
      expect(transports.indexOf(fastestTransport)).to.equal(0, 'Could not short on fastest transport');
    });
  });

  describe('Can use filter', () => {
    let numberOfFiltredFlights = 0;

    it('Filter on one stop', () => {
      IndependentFlow.flightList.filter.stopOver.oneStop.select();
    });

    it('Filter on first airline that has one stop', () => {
      const { list: allCarriers } = IndependentFlow.flightList.filter.carriers;
      const firstCheckboxThatIsClickable = allCarriers.find(checkbox => !checkbox.isDisabled);
      firstCheckboxThatIsClickable.select();
      numberOfFiltredFlights = firstCheckboxThatIsClickable.value;
    });

    it('Check if list is filtred', () => {
      expect(IndependentFlow.flightList.isFiltred).to.equal(true, 'List was not filtred');
    });

    it('Check if expected number of filtered flight is right', () => {
      expect(numberOfFiltredFlights).to.equal(IndependentFlow.flightList.hits, 'Number of filter flights does not match expected filter');
    });

    it('Try to reset filter', () => {
      IndependentFlow.flightList.filter.reset();
      expect(IndependentFlow.flightList.isFiltred).to.equal(false, 'List is still filtred');
    });
  });

  describe('Price details', () => {
    let priceOnDetails = '';
    let priceOnCard = '';
    let selectedTransport = null;

    it('Can open price details', () => {
      [selectedTransport] = IndependentFlow.flightList.transports;
      priceOnCard = selectedTransport.price;
      selectedTransport.priceDetails.open();
      selectedTransport.priceDetails.popup.priceTab.isLoaded();
    });

    it('Total price is the same in pricedetails as on the card', () => {
      const priceInformation = selectedTransport.priceDetails.popup.priceTab.getInformation();
      priceOnDetails = priceInformation.price;
      expect(priceOnCard).equal(priceOnDetails, 'The price is not the same');
    });

    it('Can close price details', () => {
      selectedTransport.priceDetails.popup.close();
    });
  });

  describe('Flight details', () => {
    let selectedTransport = null;
    it('Can open flight details from homebound', () => {
      [selectedTransport] = IndependentFlow.flightList.transports;
      selectedTransport.homebound.flightDetails.open();
      selectedTransport.homebound.flightDetails.popup.flightTab.isLoaded();
    });

    it('Can close flight details from homebound', () => {
      selectedTransport.homebound.flightDetails.popup.close();
    });

    it('Can open flight details from outbound', () => {
      selectedTransport.outbound.flightDetails.open();
      selectedTransport.outbound.flightDetails.popup.flightTab.isLoaded();
    });

    it('Flight details has data', () => {
      const hasData = selectedTransport.outbound.flightDetails.popup.flightTab.hasData();
      expect(hasData).equal(true, 'There is data missing from flight details');
    });

    it('Can close flight details from outbound', () => {
      selectedTransport.outbound.flightDetails.popup.close();
    });
  });

  describe('Baggage details', () => {
    let selectedTransport = null;
    it('Can open baggage details', () => {
      [selectedTransport] = IndependentFlow.flightList.transports;
      selectedTransport.baggageDetails.open();
      selectedTransport.baggageDetails.popup.baggageTab.isLoaded();
    });

    it('Can close baggage details', () => {
      selectedTransport.baggageDetails.popup.close();
    });
  });
});
