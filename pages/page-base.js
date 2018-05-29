import { Translate, isLanguageSetTo } from '../tools';
import { baseUrls } from '../confs/urls';

class PageBase {
  constructor() {
    this.baseSelectors = {
      bookingstart: 'div.bookingstart-section',
      cookieInfoContainer: '#fdih_cookiebadge_wrapper',
      selectorForDeclineSurveyButton: '#_hj-f5b2a1eb-9b07_survey_invite_container > div > div._hj-f5b2a1eb-9b07_survey_close_link > a',
      selectorForDeclineSurveyRecommendVing: '#_hj-f5b2a1eb-9b07_poll > a > span',
    };
  }

  get title() {
    return browser.getTitle();
  }

  get url() {
    return browser.getUrl();
  }

  open(path) {
    browser.options.baseUrl = Translate(baseUrls[browser.options.tc.environment]);

    browser.url(`/${path || ''}`);

    this.removeCookieBanner();

    // These functions disables popup-surveys which marketing(Åsa Arnarp & Henrik Ekström) turns on from time to time.
    // Functions should be outcommented when survey is not active, since it slows down ALL tests with 8 seconds.
    // this.removeHotjarPopupSurvey();
    // this.removePopupSurveyToRecommendVing();
  }

  /**
   * Finds and clicks on cookiebanner (only active on dk).
   *
   * @returns
   * @memberof Page
   */
  removeCookieBanner() {
    if (!isLanguageSetTo('dk')) return;
    // Handles the warning pop-up about cookies

    browser.waitUntil(() => browser.isExisting(this.baseSelectors.bookingstart), 20000);

    if (browser.isExisting(this.baseSelectors.cookieInfoContainer)) {
      browser.selectorExecute(this.baseSelectors.cookieInfoContainer, (elements) => {
        elements[0].parentElement.removeChild(elements[0]);
      });
    }
  }

  /**
   * Finds and clicks to close popupSurvey that is temporary until christmas 2017, but could return again in the future (so don't remove function, just outcomment when it's not used any longer)
   *
   * @returns click to close-function
   * @memberof Page
   */
  removeHotjarPopupSurvey() {
    console.log('Checking if popupSurvey exists within 8 seconds.');
    try {
      browser.waitUntil(() => browser.isExisting(this.baseSelectors.selectorForDeclineSurveyButton), 8000);
    } catch (err) {
      console.log('popupSurvey was not found. Continuing with test.');
      return;
    }

    if (browser.isExisting(this.baseSelectors.selectorForDeclineSurveyButton)) {
      browser.click(this.baseSelectors.selectorForDeclineSurveyButton);
      console.log('popupSurvey was found and declined. Continuing with test.');
      browser.pause(100);
    }
  }

  /**
   * Finds and close popupSurvey to recommend ving (don't remove function, just outcomment the use of it when survey is not active)
   *
   * @returns click to close-function
   * @memberof Page
   */
  removePopupSurveyToRecommendVing() {
    console.log('-------------------------------------------------------------------');
    console.log('Checking if TEMPORARY popupsurvey opens up for 8s');
    try {
      browser.waitUntil(() => browser.isExisting(this.baseSelectors.selectorForDeclineSurveyRecommendVing), 8000, '...');
      if (browser.isExisting(this.baseSelectors.selectorForDeclineSurveyRecommendVing)) {
        console.log('found the popup, trying to click');
        browser.pause(1000); //
        browser.click(this.baseSelectors.selectorForDeclineSurveyRecommendVing);
        console.log('popupSurvey was found and declined. Continuing with test.');
        browser.pause(100);
      } else {
        console.log('- popupSurvey was not found. Continuing with test.');
      }
      console.log('');
      console.log('This functionality should be inactivated when popupsurvey is not active');
      console.log('-------------------------------------------------------------------');
      console.log('');
    } catch (err) {
      console.log('popupSurvey was not found. Continuing with test.');
      return;
    }
  }
}

export default PageBase;
