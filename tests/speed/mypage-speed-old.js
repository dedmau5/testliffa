import { StartPage } from '../../pages/start-page';

const timeout = 15000;
const iterations = 190;
const user = { name: 'testmailmawr@gmail.com', pw: 'Test1234' };
const loginSelectors = {
  userNameInput: '#M1_C2_Main_i6c30005662_LoggedinStatusControl_ctl00_ctl01_txtUserName',
  passWordInput: '#M1_C2_Main_i6c30005662_LoggedinStatusControl_ctl00_ctl01_txtPassWord',
};

let errorCount = 0;

describe('Tests to load old my page', () => {
  it('Opening my page', () => {
    StartPage.open();
    browser.url('/login');
    browser.waitForVisible(loginSelectors.userNameInput, timeout);
    browser.setValue(loginSelectors.userNameInput, user.name);
    browser.setValue(loginSelectors.passWordInput, user.pw);
    browser.keys('Enter');
    browser.waitForVisible('#M1_C2_Main_i7c30000010', timeout);
    const loginCookie = browser.getCookie('.ASPXAUTH');
    browser.reload();
    for (let x = 0; x < iterations; x += 1) {
      try {
        StartPage.open();
        browser.setCookie(loginCookie);
        browser.sessionStorage('POST', { key: 'DT_TESTNAME', value: 'TEAM1: Speed test for old My page with one cp' });
        browser.sessionStorage('POST', { key: 'DT_TESTRUNID', value: 'speed_mypage_old_one_trip' });
        browser.url('https://www.ving.se/minsida');
        browser.waitForVisible('#M1_C2_Main_i7c30000010', timeout);
        // Lägg till en till assert för att verifiera att lista laddats.
      } catch (error) {
        console.log(`Something went wrong on iteration ${x}\nTimeout: ${timeout / 1000} seconds\nError: ${error}`);
        errorCount += 1;
      }

      browser.pause(10000);
      browser.reload();
    }
    console.log(`\n-----------${iterations} page loads carried out (${errorCount} of them where unsuccessful)-----------\n`);
  });
});
