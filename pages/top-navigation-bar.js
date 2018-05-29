import { locateElementAndClickOnIt } from '../tools/elements';

import PageBase from './page-base.js';


const selectors = {
    logoutLink: "li.link-button.login-link a[id*=LogOut]"
};


class _TopNavigationBar extends PageBase {
    /**
     * @returns {{
     *     waitForExists: (function(number=)),
     *     click: (function())
     * }}
     */
    get logoutLink() {
        return {
            /**
             * @param {number} timeout=30000
             */
            waitForExists: (timeout=30000) => {
                browser.waitForExist(selectors.logoutLink, timeout);
            },

            click: () => {
                locateElementAndClickOnIt(selectors.logoutLink);
            }
        };
    }
}

/**
 * @type {_TopNavigationBar}
 */
export const TopNavigationBar = new _TopNavigationBar();