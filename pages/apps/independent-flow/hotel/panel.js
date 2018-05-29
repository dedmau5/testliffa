const selectors = {
  map: {
    link: '.right-panel .hotel-sort-panel__view-icon .tcneicon-map',
    home: '.map-view',
  },
  list: {
    link: '.hotel-sort-panel .right-panel .hotel-sort-panel__view-icon.gtm-list-view',
    home: '.if-hotels',
  },
  hits: {
    filtred: '.hotel-sort-panel__filter-hits',
    unfiltred: '.hotel-sort-panel__hits',
  },
};

class Panel {
  /**
   * Returns number of hits.
   *
   * @readonly
   * @static
   * @returns {number}
   * @memberof Panel
   */
  static get hits() {
    const selector = this.isHotelListFiltred() ? selectors.hits.filtred : selectors.hits.unfiltred;
    const hitsText = browser.getText(selector).split(' ');
    return parseInt(hitsText[0], 10);
  }

  static isHotelListFiltred() {
    return browser.isExisting(selectors.hits.filtred);
  }

  static get toggle() {
    return {
      toMap: () => browser.click(selectors.map.link).waitForExist(selectors.map.home),
      toList: () => browser.click(selectors.list.link).waitForExist(selectors.list.home),
    };
  }
}

export default Panel;
