/*
* Pageobject for the topmenu on the site
*/

import {
    getElement,
} from '../../../tools/elements';

import { SubMenu } from './submenu';


class TopMenu {
    /**
     * @param selector {string} CSS Selector.
     */
    constructor(selector="ul.cf") {
        this.selectors = {
            home: selector,
            subMenus: "li.nav-main-menu-item"
        };
    }

    /**
     * @returns {[SubMenu]}
     * @private
     */
    get _subMenus() {
        if (!this.__subMenus) {
            const menuContainer = getElement(this.selectors.home);

            this.__subMenus = Array.map(
                browser.elementIdElements(
                    menuContainer.value.ELEMENT,
                    "li.nav-main-menu-item"
                ).value,
                (subMenu) => {
                    return new SubMenu(subMenu);
                }
            );
        }

        return this.__subMenus;
    }

    /**
     * @returns {Object}
     * @private
     */
    get _subMenusByName() {
        if (!this.__subMenusByName) {
            this.__subMenusByName = {};

            for (let subMenu of this._subMenus) {
                this.__subMenusByName[subMenu.name] = subMenu;
            }
        }

        return this.__subMenusByName;
    }

    /**
     * @param name {string} The localized menu item name.
     * @returns {SubMenu}
     */
    findByName(name) {
        return this._subMenusByName[name];
    }

    /**
     *
     * @param index {number} Index of menu item, starting from the right side.
     * @returns {SubMenu}
     */
    findByIndex(index) {
        if (index >= 0 && index < this._subMenus.length) {
            return this._subMenus[index];
        }

        return false;
    }
}

export default new TopMenu();