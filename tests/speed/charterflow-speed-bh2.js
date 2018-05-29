import { StartPage } from '../../pages/start-page';
import CharterFlow from '../../pages/apps/charter-flow/charterflow-pageobject';

const urlFirst = 'https://www.ving.se/boka-resa-bh2?QueryDepID=2788&QueryCtryID=65&QueryAreaID=108&QueryResID=0&QueryDepDate=';
const urlLast = '&QueryDur=8&CategoryId=2&QueryRoomAges=%7C42%2C42%2C2&QueryUnits=0';
const timeout = 15000;
const startOffset = 40; // Days from current date as the first travel date
const iterations = 60;

let errorCount = 0;

function setDate(input) {
  const todaysDate = new Date();
  todaysDate.setUTCDate(todaysDate.getUTCDate() + input);
  let month = `${todaysDate.getUTCMonth() + 1}`;
  let day = `${todaysDate.getUTCDate()}`;
  if (todaysDate.getUTCMonth() < 9) {
    month = `0${todaysDate.getUTCMonth() + 1}`;
  }
  if (todaysDate.getUTCDate() < 10) {
    day = `0${todaysDate.getUTCDate()}`;
  }
  return `${todaysDate.getUTCFullYear()}${month}${day}`;
}

describe('Tests to load Charterflow with bh2', () => {
  it('Should perform BH2 searches', () => {
    for (let x = startOffset; x < startOffset + iterations; x += 1) {
      StartPage.open();
      browser.windowHandleFullscreen();
      browser.sessionStorage('POST', { key: 'DT_TESTNAME', value: 'TEAM1: Speed test Charterflow BH2' });
      browser.sessionStorage('POST', { key: 'DT_TESTRUNID', value: 'speed_charterflow_bh2' });
      browser.url(`${urlFirst}${setDate(x)}${urlLast}`);
      console.log(`Iteration ${(x - startOffset) + 1}. Date: ${setDate(x)}`);
      try {
        browser.waitForVisible(CharterFlow.selectors.hotelList.hotel.name, timeout);
        browser.waitForVisible('.webui-price-formatter', timeout);
        browser.waitForVisible(CharterFlow.selectors.hotelList.hotel.selectButton, timeout);
      } catch (error) {
        console.log(`Page not loaded as expected (no hotel list after ${timeout / 1000} seconds) for date: ${setDate(x)} ${error}`);
        errorCount += 1;
      }
      browser.pause(10000);
      browser.reload();
      browser.pause(2000);
    }
    console.log(`\n-----------${iterations} page loads carried out (${errorCount} of them where unsuccessful)-----------\n`);
  });
});
