import { StartPage } from '../../pages/start-page';
import CharterFlow from '../../pages/apps/charter-flow/index';

describe('Speedtest for charterflow with bookinghub2 api', () => {
  // Las Palmas 7 juli, 1 charterhotel and 1 sunhotel. Sunhotel = RK Luz Playa Suites
  const selectors = {
    url: 'https://vingse.acctest.int/boka-resa?QueryDepID=2788&QueryCtryID=65&QueryAreaID=0&QueryResID=279&QueryDepDate=20180707&QueryDur=8&CategoryId=2&QueryRoomAges=%7C42%2C42&QueryUnits=1&showFlightDetails=false', // eslint-disable-line max-len
  };

  before(() => {
    StartPage.open();
    browser.sessionStorage('POST', { key: 'DT_TESTNAME', value: 'TEAM1: Charterflow with sunhotels from bookinghub2' });
    browser.sessionStorage('POST', { key: 'DT_TESTRUNID', value: 'CharterFlow-1' });
  });

  after(function () {
    // browser.execute('dynaTrace.endVisit();');
    browser.pause(10000);
  });

  describe('Tests to load Charterflow with bh2', () => {
    it('Should open Charterflow', () => {
      browser.url(selectors.url);
    });

    it('Should wait for Charterflow to load', () => {
      CharterFlow.waitForPageToLoad();
      CharterFlow.waitUntilLoaded();
      browser.pause(10000);
    });
  });
});
