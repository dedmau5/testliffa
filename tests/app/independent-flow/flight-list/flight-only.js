import IndependentFlow from '../../../../pages/apps/independent-flow/index';
import Page from '../../../../pages/page';
import { flight, query } from '../../../../pages/apps/independent-flow/urls';
import barcelona from '../test-data/barcelona';
import { Translate } from '../../../../tools';

describe('Independent-flow - flightOnly', () => {
  before(() => {
    const environmentUrl = Translate(flight[browser.options.tc.environment]);

    const barcelonaQuery = query.flightOnly
      .replace('{QueryDepID}', barcelona.departureId)
      .replace('{QueryCtryID}', barcelona.countryId)
      .replace('{QueryDestID}', barcelona.destinationId)
      .replace('{QueryDepDate}', barcelona.departureDate)
      .replace('{QueryRetDate}', barcelona.returnDate)
      .replace('{QueryDur}', barcelona.duration)
      .replace('{QueryAdults}', barcelona.adults)
      .replace('{QueryChildrenAges}', barcelona.childrenAges)
      .replace('{QueryUnits}', barcelona.units);

    Page.goTo(environmentUrl + barcelonaQuery);
  });

  describe('Can see flight list', () => {
    it('Waits until flight only container is found', () => {
      IndependentFlow.flightOnly.waitUntilFound();
    });

    it('Waits until flight only container is loaded', () => {
      IndependentFlow.flightOnly.waitUntilLoaded(20000);
    });
  });

  describe('Can use sort', () => {
    it('Click on fastest sort tab', () => {
      IndependentFlow.flightOnly.tabs.fastest.select();
    });

    it('Check that the first flight is the fastest', () => {
      const { transports } = IndependentFlow.flightOnly;
      const fastestTransport = transports.reduce((prev, curr) => (prev.totalFlightTime <= curr.totalFlightTime ? prev : curr));
      expect(transports.indexOf(fastestTransport)).to.equal(0, 'Could not sort on fastest transport');
    });
  });

  describe('Can use filter', () => {
    let numberOfFiltredFlights = 0;

    it('Filter on one stop', () => {
      IndependentFlow.flightOnly.filter.stopOver.oneStop.select();
    });

    it('Filter on first airline that has one stop', () => {
      const { list: allCarriers } = IndependentFlow.flightOnly.filter.carriers;
      const firstCheckboxThatIsClickable = allCarriers.find(checkbox => !checkbox.isDisabled);
      firstCheckboxThatIsClickable.select();
      numberOfFiltredFlights = firstCheckboxThatIsClickable.value;
    });

    it('Check if list is filtred', () => {
      expect(IndependentFlow.flightOnly.isFiltred).to.equal(true, 'List was not filtred');
    });

    it('Check if expected number of filtered flight is right', () => {
      expect(numberOfFiltredFlights).to.equal(IndependentFlow.flightOnly.hits, 'Number of filter flights does not match expected filter');
    });

    it('Try to reset filter', () => {
      IndependentFlow.flightOnly.filter.reset();
      expect(IndependentFlow.flightOnly.isFiltred).to.equal(false, 'List is still filtred');
    });
  });

  describe('Price details', () => {
    let priceOnDetails = '';
    let priceOnCard = '';
    let selectedTransport = null;

    it('Can open price details', () => {
      [selectedTransport] = IndependentFlow.flightOnly.transports;
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
      [selectedTransport] = IndependentFlow.flightOnly.transports;
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
      [selectedTransport] = IndependentFlow.flightOnly.transports;
      selectedTransport.baggageDetails.open();
      selectedTransport.baggageDetails.popup.baggageTab.isLoaded();
    });

    it('Can close baggage details', () => {
      selectedTransport.baggageDetails.popup.close();
    });
  });

  describe('Can book flight', () => {
    it('Can select flight', () => {
      const [selectedTransport] = IndependentFlow.flightOnly.transports;
      selectedTransport.select();
    });
  });
});
