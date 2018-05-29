import {
    getElementWithinElement,
    getInnerHTML
} from '../../../tools/elements';


export class SubMenu {
    /**
     * @param webElementJsonObject {Object} Web Element JSON Object
     */
    constructor(webElementJsonObject) {
        this.homeElement = webElementJsonObject;
    }

    get name() {
        return getInnerHTML(
            getElementWithinElement(this.homeElement, "a > span").value
        );
    }

    click() {
        getElementWithinElement(this.homeElement, "a").click();
    }

    get _subMenuItems() {
        if (!this.__subMenuItems) {
            this.__subMenuItems = this._parseSubMenus(this.homeElement.ELEMENT, "div > ul > li");
        }

        return this.__subMenuItems;
    }

    get _subMenuItemsByName() {
        if (!this.__subMenuItemsByName) {
            this.__subMenuItemsByName = {};

            for (let subMenu of this._subMenuItems) {
                this._subMenuItemsByName[subMenu.name] = {
                    click: subMenu.click
                };

                if (subMenu.subMenu) {
                    this._subMenuItemsByName[subMenu.name][subMenu.subMenu.name] = {
                        click: subMenu.subMenu.click
                    };
                }
            }
        }

        return this.__subMenuItemsByName;
    }

    _parseSubMenus(parentId, selector) {
        return Array.map(
            browser.elementIdElements(parentId, selector).value,
            (subMenuItem) => {
                const aElement = browser.elementIdElement(subMenuItem.ELEMENT, "a");
                const strongElement = browser.elementIdElement(subMenuItem.ELEMENT, "strong");

                if (strongElement && strongElement.state === "success") {
                    const aWithinStrongElement = getElementWithinElement(strongElement.value, "a");

                    return {
                        name: getInnerHTML(aWithinStrongElement.value),
                        click: () => {
                            aWithinStrongElement.click();
                        },
                        subMenu: this._parseSubMenus(subMenuItem.ELEMENT, "ul > li")
                    };
                } else if (aElement && aElement.state === "success") {
                    return {
                        name: getInnerHTML(aElement.value),
                        click: () => { aElement.click(); }
                    };
                } else {
                    throw new Error("Unknown sub menu item!");
                }
            }
        );
    }

    /**
     * @typedef {{name: string,
     *     click: Function,
     *     [subMenu]: object
     * }} subMenuObject
     */

    /**
     * @param name
     * @returns {subMenuObject}
     */
    findByName(name) {
        if (this._subMenuItemsByName[name]) {
            return this._subMenuItemsByName[name];
        }

        return false;
    }

    findByIndex(index) {
        if (index >= 0 && index < this._subMenuItems.length) {
            return this._subMenuItems[index];
        }

        return false;
    }
}