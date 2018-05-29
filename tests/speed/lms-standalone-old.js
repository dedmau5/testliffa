import { StartPage } from '../../pages/start-page';

describe('Speedtest for old Last-Minute-Sales', () => {
  const selectors = {
    url: 'http://lms.acctest.int/sista-minuten-resor',
    filterWrapper: '.filter-wrapper',
    filterSpecified: '.travel-types:nth-child(1) .travel-type-name',
    firstTripChooseButton: '.lms-trip-list:nth-child(1)  > .lms-trip-outer:nth-child(1) .lms-select-button-wrapper > a',
  };

  before(() => {
    StartPage.open();
  });

  describe('Tests to load old LMS page', () => {
    it('Should open LMS', () => {
      browser.url(selectors.url); // url to old lms-standalone-page
    });

    it('Should wait for LMS to load', () => {
      browser.waitForExist(selectors.filterWrapper, 30000);
      browser.waitForExist(selectors.filterSpecified, 30000);
      browser.waitForExist(selectors.firstTripChooseButton, 30000);
    });

    it('Should wait another 10s to be sure page had time to load', () => {
      browser.pause(10000);
    });
  });
});
