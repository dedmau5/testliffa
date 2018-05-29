import fs from 'fs';
import { StartPage } from '../../pages/start-page';
import CharterFlow from '../../pages/apps/charter-flow/charterflow-pageobject';

let lineSplit;
let urlfreq;
let parsedUrl;
let urlCount = 0;
let urlFaults = 0;

const timeout = 10000;
const contents = fs.readFileSync('./report_short.csv');
const lines = contents.toString().split('\n'); // Ta bort -1 om fil inte innehåller newline i botten

describe('Load test for charterflow with xxxxx', () => {
  before(() => {
    console.log(`Will serially load ${lines.length - 1} URL:s`);
    StartPage.open();
    browser.sessionStorage('POST', { key: 'DT_TESTNAME', value: 'TEAM1: Charterflow bh2 load test' });
    browser.sessionStorage('POST', { key: 'DT_TESTRUNID', value: 'CharterFlow-bh2-load' });
  });

  describe(`Carry out every search carried out by customers in production (${lines.length - 1} URL:s)`, () => {
    it('Surfing to each URL and wait for page to load', () => {
      // for (let x = 4; x < 30; x += 1) {
      for (let x = 4; x < lines.length - 1; x += 1) {
        lineSplit = lines[x].split(';');
        urlfreq = parseInt(lineSplit[2].replace(/\D/g, ''), 10);
        parsedUrl = `https://www.ving.se${lineSplit[0]}-bh2?${lineSplit[1]}`;
        // console.log(`------------------number of hits for URL ${x - 3}: ${urlfreq}------------------`);
        for (let y = 0; y < urlfreq; y += 1) {
          browser.url(parsedUrl);
          urlCount += 1;
          try {
            // OBS!! Är dessa asserts giltiga? Bör man ALLTID få hotellobjekt när man söker?
            // Annan aspekt... bör vi ens vänta på dem? Har vi fått fel och ingen hotelldata laddas så vill vi väl bara gå vidare i lasttestet direkt?
            browser.waitForVisible(CharterFlow.selectors.hotelList.hotel.name, timeout);
            browser.waitForVisible('.webui-price-formatter', timeout);
            browser.waitForVisible(CharterFlow.selectors.hotelList.hotel.selectButton, timeout);
            // console.log(`URL ${x - 3} is loaded (iteration ${y + 1})`);
          } catch (error) {
            urlFaults += 1;
            console.log(`----------\ndid not manage to load URL ${x - 3} (iteration ${y + 1} out of ${urlfreq}):\n${parsedUrl}\n${error}`);
          }
        }
      }
      console.log(`Total number of page loads: ${urlCount} (${urlFaults} of them were unsucessful)`);
    });
  });
});
