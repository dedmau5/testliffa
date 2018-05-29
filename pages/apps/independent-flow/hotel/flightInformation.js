const flightContainer = '.indflow-flight__flight-container';
const flightDetailsPopup = 'div.webui-popup div.flight-details-container';

const selectors = {
  home: '.indflow-flights-info',
  flight: {
    home: '.indflow-flights-info__flights',
    outbound: '.indflow-flight:first-child',
    homebound: '.indflow-flight:nth-child(2)',
    date: '.indflow-flight__departure-date-container > .indflow-flight__departure-date',
    carrier: `${flightContainer} > .indflow-flight__col2 > .indflow-flight__carrier`,
    times: `${flightContainer} > .indflow-flight__col2 >.indflow-flight__times`,
    duration: `${flightContainer} > .indflow-flight__col3 > .indflow-flight__duration`,
    locations: `${flightContainer} > .indflow-flight__col3 >.indflow-flight__locations`,
  },
  popupLink: 'div.indflow-flight__col4 button.webui-link',
  popup: {
    closeButton: 'button.webui-modal-header__close',
    container: `${flightDetailsPopup}`,
    outboundTitleText: `${flightDetailsPopup} div.flight-details--outbound div.flight-details__title`,
    homeboundTitleText: `${flightDetailsPopup} div.flight-details--homebound div.flight-details__title`,
  },
  moreFlights: '.indflow-flights-info__button-panel button',
};

const getFlight = (selector) => {
  const times = browser.getText(`${selector} > ${selectors.flight.times}`).split(' - ');
  const locations = browser
    .getHTML(`${selector} > ${selectors.flight.locations}`)
    .replace(/\s*(<[^>]*>)/g, ' ')
    .trim()
    .split('   ');

  return {
    carrier: browser.getText(`${selector} > ${selectors.flight.carrier}`),
    date: browser.getText(`${selector} > ${selectors.flight.date}`),
    departure: {
      time: times[0],
      location: locations[0].trim(),
    },
    arrival: {
      time: times[1],
      location: locations[1].trim(),
    },
    flightTime: browser.getText(`${selector} > ${selectors.flight.duration}`),
  };
};

class FlightInformation {
  static waitUntilLoaded() {
    browser.waitForExist(`${selectors.flight.home} > ${selectors.flight.outbound}`, 6000);
  }

  static get popup() {
    return {
      open: () => browser.click(selectors.popupLink).waitForExist(selectors.popup.container),
      getOutboundLabelText: () => browser.getText(selectors.popup.outboundTitleText),
      getHomeboundLabelText: () => browser.getText(selectors.popup.homeboundTitleText),
      close: () => browser.click(selectors.popup.closeButton).waitForExist(selectors.popup.container, 3000, true),
    };
  }

  static get flight() {
    return {
      getHomebound: () => getFlight(selectors.flight.homebound),
      getOutbound: () => getFlight(selectors.flight.outbound),
    };
  }

  static get moreFlightsLink() {
    return {
      click: () => browser.click(selectors.moreFlights),
    };
  }
}

export default FlightInformation;
