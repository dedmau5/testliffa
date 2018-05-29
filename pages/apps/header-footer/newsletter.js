/**
 * Class newsletter for pageobject section newsletter in footer.
 *
 * @export
 * @class Newsletter
 */
export default class Newsletter {
  constructor() {
    const newsLetterContainer = '.footer-container .footer-section--newsletter';

    this.selectors = {
      email: {
        input: `${newsLetterContainer} .footer-newsletter__input input.input`,
        button: `${newsLetterContainer} button.footer-newsletter__submit`,
        errorLabel: `${newsLetterContainer} .formbox__error`,
      },
      links: {
        socialMedia: `${newsLetterContainer} .footer-social-media-container a.footer-social-media__link`,
        apps: `${newsLetterContainer} ul.footer-link-list--app-link li`,
      },
    };
  }

  /**
   * Gets the input field.
   *
   * @returns {[{ setValue: Function, clear: Function, send: Function, hasErrorMessage: Function }]}
   * @readonly
   * @memberof Newsletter
   */
  get input() {
    return {
      setValue: value => browser.setValue(this.selectors.email.input, value),
      clear: () => browser.setValue(this.selectors.email.input, ''),
      send: () => browser.click(this.selectors.email.button),
      hasErrorMessage: () =>
        browser.isVisible(this.selectors.email.errorLabel),
    };
  }

  /**
   * Gets the links (social media and apps).
   *
   * @returns {[{socialMedia: array, apps: array }]}
   * @readonly
   * @memberof Newsletter
   */
  get links() {
    return {
      socialMedia: this._getsocialMediaLinks(),
      apps: this._getAppLinks(),
    };
  }

  _getsocialMediaLinks() {
    const socialMediaItems = browser.elements(this.selectors.links.socialMedia);

    return Array.map(socialMediaItems.value, socialMediaItem => ({
      title: this._cleanString(browser.elementIdAttribute(socialMediaItem.ELEMENT, 'class').value),
      id: socialMediaItem.ELEMENT,
      click: () => browser.elementIdClick(socialMediaItem.ELEMENT),
    }));
  }

  _cleanString(value) {
    const doubleDash = '--';
    var index = value.indexOf(doubleDash);
    return value.slice(index).replace(doubleDash, '');
  }

  _getAppLinks() {
    const appItems = browser.elements(this.selectors.links.apps);

    return Array.map(appItems.value, appItem => ({
      title: browser.elementIdText(appItem.ELEMENT).value.trim(),
      id: appItem.ELEMENT,
      click: () => browser.elementIdClick(appItem.ELEMENT),
    }));
  }
}
