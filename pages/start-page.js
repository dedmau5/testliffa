import PageBase from './page-base.js';
import FavoriteHotel from "../pages/apps/favorite-hotels/favorite-hotel-pageobject";

/**
 * Pageobject for StartPage, extending Page
 * 
 * @class _StartPage
 * @extends {PageBase}
 */
class _StartPage extends PageBase {
  constructor() {
    super();

    this.selectors = {
      container: ".maincontent",
      topmenu: {
        favoriteHotelLink: ".favorite-hotels",
        favoriteHotelCounter: "li.link-button > a > span > span"
      }
    };
  }

  open(path = "") {
    super.open(path);

    browser.waitUntil(() => {
      const url = browser.getUrl();

      if (typeof url === "object") {
        return url.state !== "pending";
      } else if (typeof url === "string") {
        return !url.includes("127.0.0.1");
      }

      return false;
    }, 30000);
  }

  get title() {
    return browser.getTitle();
  }

  /**
   * Waits until container is loaded
   * 
   * @param {number} [timeout=60000] 
   * @memberof _StartPage
   */
  waitUntilLoaded(timeout = 60000) {
    browser.waitForExist(this.selectors.container, timeout);
  }

  get loginLink() {
    if (browser.getViewportSize().width < 996) {
      return browser.element(
        "div.offPageMenu ul > li.login-link.link-button > a"
      );
    }

    return browser.element("li.link-button.login-link a");
  }

  get loginLinkValue() {
    return this.loginLink.getText();
  }

  get favoriteHotelCounterValue() {
    let counterValue = browser.getText(
      this.selectors.topmenu.favoriteHotelCounter
    );
    counterValue = counterValue.replace(/[^\d.]/g, "");
    counterValue = Number(counterValue);
    return counterValue;
  }

  get favoriteHotelsLink() {
    return browser.element(".favorite-hotels");
  }

  clickOnFavoriteHotelLink() {
    browser.click(this.selectors.topmenu.favoriteHotelLink);
    FavoriteHotel.waitUntilPageLoaded();
  }
}

/**
 * @type {_StartPage}
 */
export const StartPage = new _StartPage();
