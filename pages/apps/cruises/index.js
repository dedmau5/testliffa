import { getElements, getElementWithinElement, getInnerHTMLAsInteger } from "../../../tools/elements";
const home = "div.cruiseList";
const selectors = {
    home: home,
    spinner: {
        home: "#wait-spinner",
        hidden: `div[id='wait-spinner'].ng-hide`
    },
    cruiseListItem: `${home} > ul > li`,
    cruiseItem: {
        price: "div.totalPrice label",
        chooseButton: "div.price-wrapper div.btn-default",
        suitableForChildren: "div.product-logos span.family"
    }
};
function isSuitableForChildren(cruiseItem) {
    return getElementWithinElement(cruiseItem, selectors.cruiseItem.suitableForChildren).isExisting();
}
export class Cruises {
    waitForCruisesPage(timeout = 30000) {
        browser.waitForExist(selectors.home, timeout);
    }
    waitForCruises() {
        browser.waitForExist(selectors.spinner.hidden, 30000);
    }
    isCruiseListEmpty() {
        return getElements(selectors.cruiseListItem).length === 0;
    }
    /**
     * @returns {{
     *     price: number,
     *     button: {
     *         click: Function
     *     },
     *     suitableForChildren: boolean
     * }}
     */
    get cruises() {
        const cruises = getElements(selectors.cruiseListItem);
        if (!Array.isArray(cruises) || cruises.length === 0) {
            return [];
        }
        return Array.map(cruises, (cruiseItem) => {
            return {
                price: getInnerHTMLAsInteger(getElementWithinElement(cruiseItem, selectors.cruiseItem.price).value, { treatAsPrice: true }),
                button: {
                    click: getElementWithinElement(cruiseItem, selectors.cruiseItem.chooseButton).click
                },
                suitableForChildren: isSuitableForChildren(cruiseItem)
            };
        });
    }
}
