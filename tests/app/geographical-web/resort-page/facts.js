import Page from './../../../../pages/page';
import GeographicalWeb from './../../../../pages/apps/geographical-web/geographical-web-resort';
import { facts } from './../../../../pages/apps/geographical-web/urls';

import { Translate } from '../../../../tools';

describe('Geographical-web - Facts', () => {
  before(() => {
    const environmentUrl = Translate(facts[browser.options.tc.environment]);
    Page.goTo(environmentUrl);
  });

  describe('Can see Facts', () => {
    it('Waits until facts container is loaded', () => {
      GeographicalWeb.facts.waitUntilLoaded();
    });
  });

  describe('Climate and weather push', () => {
    it('Open push', () => {
      GeographicalWeb.facts.climateAndWeatherPush.open();
      expect(GeographicalWeb.facts.climateAndWeatherPush.isOpen).to.equal(true, 'Climate and weather push was not opened');
    });

    it('Can see weahter chart', () => {
      expect(GeographicalWeb.facts.climateAndWeatherPush.hasContent).to.equal(true, 'There was missing content in the climate and weather push');
    });

    it('Has toggle option', () => {
      expect(GeographicalWeb.facts.climateAndWeatherPush.hasTabNavigation).to.equal(true, 'There where missing tabs for the climate and weather push');
    });

    it('Can see weather content', () => {
      GeographicalWeb.facts.climateAndWeatherPush.tabNavigation.right.select();
      expect(GeographicalWeb.facts.climateAndWeatherPush.hasContent).to.equal(true, 'There was missing content in the climate and weather push');
    });

    it('Close push', () => {
      GeographicalWeb.facts.climateAndWeatherPush.close();
      expect(GeographicalWeb.facts.climateAndWeatherPush.isOpen).to.equal(false, 'Climate and weather push was not closed');
    });
  });

  describe('Flight and transfer push', () => {
    it('Open push', () => {
      GeographicalWeb.facts.flightAndTransferPush.open();
      expect(GeographicalWeb.facts.flightAndTransferPush.isOpen).to.equal(true, 'Flight and transfer push was not opened');
    });

    it('Can see flight information', () => {
      expect(GeographicalWeb.facts.flightAndTransferPush.hasContent).to.equal(true, 'There was missing content in the flight and transfer push');
    });

    it('Has toggle option', () => {
      expect(GeographicalWeb.facts.flightAndTransferPush.hasTabNavigation).to.equal(true, 'There where missing tabs for the flight and transfer push');
    });

    it('Can see transfer content', () => {
      GeographicalWeb.facts.flightAndTransferPush.tabNavigation.right.select();
      expect(GeographicalWeb.facts.flightAndTransferPush.hasContent).to.equal(true, 'There was missing content in the flight and transfer push');
    });

    it('Close push', () => {
      GeographicalWeb.facts.flightAndTransferPush.close();
      expect(GeographicalWeb.facts.flightAndTransferPush.isOpen).to.equal(false, 'Flight and transfer push was not closed');
    });
  });

  describe('Destination push', () => {
    it('Open push', () => {
      GeographicalWeb.facts.destinationPush.open();
      expect(GeographicalWeb.facts.destinationPush.isOpen).to.equal(true, 'Destination push was not opened');
    });

    it('Can see flight information', () => {
      expect(GeographicalWeb.facts.destinationPush.hasContent).to.equal(true, 'There was missing content in the destination push');
    });

    it('Does not have toggle option', () => {
      expect(GeographicalWeb.facts.destinationPush.hasTabNavigation).to.equal(false, 'There where tabs for the destination push when there should be');
    });

    it('Close push', () => {
      GeographicalWeb.facts.destinationPush.close();
      expect(GeographicalWeb.facts.destinationPush.isOpen).to.equal(false, 'Destination push was not closed');
    });
  });


  describe('Map push has content', () => {
    it('Open push', () => {
      GeographicalWeb.facts.mapPush.open();
      expect(GeographicalWeb.facts.mapPush.isOpen).to.equal(true, 'Map push was not opened');
    });

    it('Close push', () => {
      GeographicalWeb.facts.mapPush.close();
      expect(GeographicalWeb.facts.mapPush.isOpen).to.equal(false, 'Map push was not closed');
    });
  });
});
