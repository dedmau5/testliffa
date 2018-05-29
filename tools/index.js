import { loadTimeout } from './timers';


/**
 * @param objectToTranslate {{dk: string, fi: string, no: string, se: string, globe: string}}
 * The language object to translate.
 *
 * @returns {string}
 * Returns the language string that corresponds to the setting 'browser.options.tc.language' (found in wdio.conf or
 * similar configuration file)
 */
export function Translate(objectToTranslate) {
    return objectToTranslate[browser.options.tc.language];
}


/**
 * Classifies anything with a viewport width smaller than 996 as mobile.
 * @returns {boolean}
 */
export function isMobile() {
    return browser.getViewportSize().width < 996;
}

/**
 * Compares the given language code with the one currently in use.
 * @param language
 * Two letter code, based on countries domain names, i.e. dk, fi, no, se. Exception: globe (Globetrotter).
 *
 * @returns {boolean}
 */
export function isLanguageSetTo(language) {
    return browser.options.tc.language === language;
}


export const dateFormats = ["YYYY-MM-DD", "d.m.YYYY", "DD-MM-YYYY", "DD.MM.YYYY"];


/**
 * Waits until the url change or the timeout is reached.
 *
 * @param previousUrl {string} The url of the previous page.
 * @param timeout {number} The time, given in milliseconds, before aborting.
 */
export function waitForUrlToChange(previousUrl, timeout) {
    browser.waitUntil(
        () => {
            return browser.getUrl() !== previousUrl;
        },
        timeout
    );
}


/**
 * Waits until the url equals the given url.
 *
 * @param url {string} The url to wait for.
 * @param timeout {number} The time, given in milliseconds, before aborting.
 */
export function waitForUrlToEqual(url, timeout) {
    browser.waitUntil(
        () => {
            return browser.getUrl() === url;
        },
        timeout
    );
}


/**
 * Replaces a known legacy url (oldUrl) with a new url (newUrl).
 *
 * @param oldUrl {string} The url to wait for.
 * @param newUrl {string} The url to wait for.
 * @param timeout {number} The time, given in milliseconds, before aborting.
 */
export function replaceUrlWith(oldUrl, newUrl, timeout=20000) {
    timeout = new Date().getTime() + timeout;

    while (timeout < new Date().getTime()) {
        const currentUrl = browser.getUrl();

        if (currentUrl.includes(oldUrl)) {
            browser.url(currentUrl.replace(oldUrl, newUrl));
        } else if (currentUrl.includes(newUrl)) {
            return true;
        }

        browser.pause(200);
    }

    return false;
}


/**
 * Returns a random integer between the given range.
 *
 * @param low {number} The lowest allowed value.
 * @param high {number} Highest number in range (not including).
 * @returns {number}
 */
export function getRandomIntegerBetween(low, high) {
    return Math.floor(Math.random() * (high-low)) + low;
}

export function isEmptyObject(obj){
    return Object.keys(obj).length === 0 && obj.constructor === Object;
}

// To keep compatibility with previous code
export { loadTimeout };