/**
 * @param selector - A CSS selector.
 * @returns Returns a WebdriverIO.Client object.
 */
export function getElement(selector) {
  browser.waitForExist(selector, 30000);
  return browser.element(selector);
}

/**
 * @param selectorOrElement - Selector or Webdriver.IO Element.
 * @param attribute - The name of the attribute.
 * @returns Returns an attribute of an element.
 */
export function getElementAttribute(selectorOrElement, attribute) {
  if (typeof selectorOrElement === 'string') {
    return getElement(selectorOrElement).getAttribute(attribute);
  }
  return browser.elementIdAttribute(selectorOrElement.ELEMENT, attribute).value;
}

/**
 * @param selector - A CSS selector or a WebdriverIO.Element.
 * @returns {any}
 */
export function getElementValue(selector) {
  return getElementAttribute(selector, 'value');
}
/**
 * @param selector - The element's CSS selector.
 * @param value - A value.
 */
export function setElementValue(selector, value) {
  const element = getElement(selector);
  if (browser.options.desiredCapabilities.browserName === 'internet explorer') {
    browser.selectorExecute(
      selector,
      (elements, textToSetAsValue) => {
        elements[0].value = textToSetAsValue;
      },
      value,
    );
  } else {
    element.setValue(value);
  }
}

/**
 * @param element - {WebdriverIO.Element} Webdriver.IO Element.
 * @param selector - {string} CSS Selector.
 * @param ignoreMissing - {boolean} Don't throw an exception in case the element doesn't exist and this is set to true.
 * @returns Client<RawResult<Element>> & RawResult<Element>.
 */
export function getElementWithinElement(element, selector, ignoreMissing = false) {
  if (!element || !element.ELEMENT) {
    throw new Error(`${element} is not a valid WebdriverIO.Element!`);
  }
  const result = browser.elementIdElement(element.ELEMENT, selector);
  if (!result.isExisting() && !ignoreMissing) {
    throw new Error(`Failed to find an element by: '${selector}'`);
  }
  return result;
}
/**
 * @param elementOrID - Webdriver.IO element or element ID.
 * @param selector - CSS Selector.
 * @returns Returns a list of WebdriverIO.Element.
 */
export function getElementsWithinElement(elementOrID, selector) {
  const value = typeof elementOrID === 'string' ? elementOrID : elementOrID.ELEMENT;
  const elements = browser.elementIdElements(value, selector); // TODO: Should work with ElementsResponse
  return elements && Array.isArray(elements.value) ? elements.value : [];
}
/**
 * @param selector - The elements' CSS selector.
 * @param defaultTo - Value to return if the selector resulted in no matches.
 * @returns A list of WebdriverIO.Element items.
 */
export function getElements(selector, defaultTo = []) {
  const elements = browser.elements(selector);
  return elements && Array.isArray(elements.value) ? elements.value : defaultTo;
}
/**
 * @param selector - The element's CSS selector.
 * @returns Returns true if the element is selected.
 */
export function isSelected(selector) {
  return getElement(selector).isSelected();
}
export function locateElementAndClickOnIt(selector) {
  const element = getElement(selector);
  element.click();
  return element;
}
/**
 * Returns the inner HTML of an element.
 *
 * @param selector - Selector or Element object.
 * @returns {string}
 */
export function getInnerHTML(selector) {
  const elementID = typeof selector !== 'string' ? selector.ELEMENT : getElement(selector).value.ELEMENT;
  const innerHTML = browser.elementIdAttribute(elementID, 'innerHTML').value;
  if (!innerHTML) {
    throw new Error(`Failed to get the innerHTML of the element! Selector: ${selector}`);
  }
  return innerHTML;
}
/**
 * Returns the inner HTML of an element, parsed as an integer.
 *
 * @param selector - Selector or WebdriverIO.Element.
 * @param options - {Object} Options.
 * @param options.treatAsPrice - {boolean} Treat the inner HTML as a price string, before parsing it as integer.
 * @param options.removeCharactersBeforeFirstColon - {boolean} Removes all characters before the first colon.
 * @returns {number}
 */
export function getInnerHTMLAsInteger(selector, options) {
  if (!options || (options && !options.treatAsPrice)) {
    options.treatAsPrice = false;
  }
  if (!options || (options && !options.removeCharactersBeforeFirstColon)) {
    options.removeCharactersBeforeFirstColon = false;
  }
  let innerHTML = getInnerHTML(selector);
  if (options && options.removeCharactersBeforeFirstColon) {
    [, innerHTML] = innerHTML.split(':'); // capture the second array value produced by the 'split'
  }
  if (options && options.treatAsPrice) {
    innerHTML = innerHTML
      .replace('.', '')
      .replace(':-', '')
      .replace(',-', '')
      .replace(/\s/g, '');
  }
  return parseInt(innerHTML, 10);
}
/**
 * Returns the inner HTML of an element, parsed as an integer.
 *
 * @param selector - Selector or WebdriverIO.Element.
 * @param options - {Object} Options.
 * @param options.treatAsPrice - {boolean} Treat the inner HTML as a price string, before parsing it as integer.
 * @param options.removeCharactersBeforeFirstColon - {boolean} Removes all characters before the first colon.
 * @param options.removeStringFromBeginning - {string|boolean} Removes the string, if found, from the beginning.
 * @returns {number}
 */
export function getTextAsInteger(selector, options) {
  if (!options || (options && !options.treatAsPrice)) {
    options.treatAsPrice = false;
  }
  if (!options || (options && !options.removeCharactersBeforeFirstColon)) {
    options.removeCharactersBeforeFirstColon = false;
  }
  if (!options || (options && !options.removeStringFromBeginning)) {
    options.removeStringFromBeginning = false;
  }
  let text = typeof selector === 'string' ? getElement(selector).getText() : browser.elementIdText(selector.ELEMENT).toString();
  if (options && options.removeCharactersBeforeFirstColon) {
    text = text.split(':', 2)[1];
  }
  if (options && options.removeStringFromBeginning && typeof options.removeStringFromBeginning === 'string') {
    if (text.startsWith(options.removeStringFromBeginning)) {
      text.replace(options.removeStringFromBeginning, '');
    }
  }
  if (options && options.treatAsPrice) {
    text = text
      .replace('.', '')
      .replace(':-', '')
      .replace(',-', '')
      .replace(/\s/g, '');
  }
  return parseInt(text, 10);
}
/**
 * @param selector - Selector or Web Element JSON Object.
 * @returns {[{value: string, text: string}]}
 */
export function getOptionsForGivenSelectElement(selector) {
  const elementID = typeof selector !== 'string' ? selector.ELEMENT : getElement(selector).value.ELEMENT;
  return getElementsWithinElement(elementID, 'option').map(option => ({
    get value() {
      return getElementValue(option);
    },
    get text() {
      return browser.elementIdText(option.ELEMENT).value;
    },
  }));
}
