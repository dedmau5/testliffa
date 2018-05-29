import Newsletter from './newsletter';

const container = '.footer-container';
const shortcuts = '.footer-section--shortcuts';
const markets = '.footer-section--market';

const selectors = {
  footer: {
    container: `${container}`,
    shortcuts: {
      container: `${container} ${shortcuts}`,
      items: `${container} ${shortcuts} li.footer-link-list__item`,
    },
    market: {
      items: `${container} ${markets} .footer-link-list li`,
    },
  },
};

function getLinkItems(selector) {
  const linkItems = browser.elements(selector);

  return Array.map(linkItems.value, (linkItem) => {
    const anchorLink = browser.elementIdElement(linkItem.ELEMENT, 'a');

    return {
      title: browser.elementIdText(linkItem.ELEMENT).value.trim(),
      id: linkItem.ELEMENT,
      href: browser.elementIdAttribute(anchorLink.value.ELEMENT, 'href')
        .value,
      click: () => browser.elementIdClick(anchorLink.value.ELEMENT),
    };
  });
}

function findValueAndClickOnIt(items, value) {
  for (let index = 0; index < items.length; index++) {
    if (items[index].title === value) {
      items[index].click();
      return true;
    }
  }

  return false;
}

/**
 * Facade for Footer page objects
 *
 * @class Footer
 */
export default class Footer {
  /**
   * Gets the links from the shortcuts section.
   *
   * @readonly
   * @memberof Footer
   */
  static get shortcuts() {
    return {
      links: getLinkItems(selectors.footer.shortcuts.items),
    };
  }

  /**
   * Gets the marketlinks from the Market section.
   *
   * @readonly
   * @memberof Footer
   */
  static get market() {
    const marketLinks = getLinkItems(selectors.footer.market.items);

    return {
      links: marketLinks,
      navigateTo: value => findValueAndClickOnIt(marketLinks, value),
    };
  }

  /**
   * Gets the newsletter items from the newslettersection.
   *
   * @readonly
   * @memberof Footer
   */
  static get newsletter() {
    return new Newsletter();
  }

  /**
   * Wait until Footer is loaded.
   *
   * @memberof Footer
   */
  static waitUntilLoaded() {
    browser.waitForExist(selectors.footer.container);
  }
}
