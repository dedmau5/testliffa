import { StartPage } from '../../pages/start-page';
import CharterFlow from '../../pages/apps/charter-flow/index';

describe('Speedtest for charterflow with bookinghub2 api', () => {
  const selectors = {
    url: 'https://www.ving.se/boka-resa-bh2?QueryDepID=2788&QueryCtryID=65&QueryAreaID=108&QueryResID=0&QueryDepDate=20180606&QueryDur=15&CategoryId=2&QueryRoomAges=%7C42%2C42&QueryUnits=1&selectedTransport=vits%7CCgJWUxIDQVJOGgNMUEEgDyoECMyUAjICMzE6AUU%3D', // eslint-disable-line max-len
  };

  before(() => {
    StartPage.open();
    browser.sessionStorage('POST', { key: 'DT_TESTNAME', value: 'TEAM1: Charterflow with bookinghub2' });
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
