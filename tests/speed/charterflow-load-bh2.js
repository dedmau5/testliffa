import fs from 'fs';
import { StartPage } from '../../pages/start-page';
import CharterFlow from '../../pages/apps/charter-flow/charterflow-pageobject';

let lineSplit;
let urlfreq = 1;
let parsedUrl;
let urlCount = 0;
let mapCount = 0;
let noHotelHit = 0;
let soldOut = 0;
let skipped = 0;

let urlFaults = 0;
let errorBlank = 0;
let errorTechnical = 0;
let errorUnknown = 0;

const timeout = 10000;
const contents = fs.readFileSync('./report.csv');
const lines = contents.toString().split('\n'); // Ta bort -1 om fil inte innehåller newline i botten

describe('Load test for charterflow with Bookinghub 2', () => {
  before(() => {
    console.log(`Will serially load ${lines.length - 1} different URL:s`);
    StartPage.open();
    browser.sessionStorage('POST', { key: 'DT_TESTNAME', value: 'TEAM1: Charterflow bh2 load test' });
    browser.sessionStorage('POST', { key: 'DT_TESTRUNID', value: 'CharterFlow-bh2-load' });
  });

  describe(`Carry out every search carried out by customers in production (${lines.length - 1} URL:s)`, () => {
    it('Surfing to each URL and wait for page to load', () => {
      for (let x = 4; x < lines.length - 1; x += 1) {
        lineSplit = lines[x].split(';');
        if (lineSplit.length > 2) {
          urlfreq = parseInt(lineSplit[2].replace(/\D/g, ''), 10);
        }
        parsedUrl = `https://www.ving.se${lineSplit[0]}-bh2?${lineSplit[1]}`;
        if (parsedUrl.includes('selectedTransport=')) {
          skipped += urlfreq;
        } else {
          for (let y = 0; y < urlfreq; y += 1) {
            browser.url(parsedUrl);
            urlCount += 1;
            try {
              browser.waitForVisible(CharterFlow.selectors.hotelList.hotel.name, timeout);
              browser.waitForVisible('.webui-price-formatter', timeout);
              browser.waitForVisible(CharterFlow.selectors.hotelList.hotel.selectButton, timeout);
            } catch (error) {
              if (browser.isVisible('.tcne-cf-hotel-map-container')) {
                mapCount += 1;
              } else if (browser.isVisible('.webui-message__body')) {
                if (browser.getText('.webui-message__body') === 'Vänligen rensa dina filter') {
                  noHotelHit += 1;
                } else if (browser.getText('.webui-message__body') === 'Vänligen sök ny resa.') {
                  soldOut += 1;
                } else if (browser.getText('.webui-message__body') === 'Ett tekniskt fel har uppstått.') {
                  errorTechnical += 1;
                  urlFaults += 1;
                  console.log(`----------\nTECHNICAL ERROR when loading URL ${x - 3} (iteration ${y + 1} out of ${urlfreq}):\n${parsedUrl}\n${error}`);
                } else {
                  errorUnknown += 1;
                  urlFaults += 1;
                  console.log(`----------\nUNKNOWN INFO STATE (marked as failed, investigate) when loading URL ${x - 3} (iteration ${y + 1} out of ${urlfreq}):\n${parsedUrl}\n${error}`);
                }
              } else {
                errorBlank += 1;
                urlFaults += 1;
                console.log(`----------\nBLANK PAGE or TIME OUT (or other issue) when loading URL ${x - 3} (iteration ${y + 1} out of ${urlfreq}):\n${parsedUrl}\n${error}`);
              }
            }
          }
        }
      }
      console.log(`\n------Total number of page loads: ${urlCount - skipped}------\n- ${soldOut} with only sold out hotels\n- ${noHotelHit} with filters matching no hotel\n- ${mapCount} with map view open
      \n------Unsuccessful page loads: ${urlFaults}------\n- ${errorTechnical} technical errors\n- ${errorBlank} Blank hotel list or timeout (timeout is set to ${timeout / 1000} seconds)\n- ${errorUnknown} Unknown info (marked as faulty by test but needs to be investigated)
      \n\nSkipped page loads: ${skipped} (URLs including selectedTransport query)
      `);
    });
  });
});
