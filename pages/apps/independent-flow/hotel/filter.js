import IndenpendentFlow from './../index';

const selectors = {
  filterpanelStructure: {
    filterPanelContent: '.indflow-desktop-filter-panel__content',
    filterPanelHeading: '.indflow-desktop-filter-panel__heading',
    filterGroup: '.indflow-filter-group',
    selectionBox: '.indflow-selection-box',
    selectionBoxItem1: '.indflow-selection-box li:nth-child(1)',
    selectionBoxItem2: '.indflow-selection-box li:nth-child(2)',
  },

  checkboxes: {
    firstCheckboxInListsText: '.indflow-checkbox-accordion_link-text',
    firstCheckboxInHotelstandard: ':nth-child(2) li li:nth-child(1) > div > label span.webui-checkbox__square',
    anyDisabledCheckboxInStadsdelar: 'div > div.webui-checkbox--disabled span',
  },

  doubleSlider: {
    slider: '.filter-slider.double .tcne-control__line-wrapper',
    gastbetygCurrentValue: '.filter-slider.double .filter-slider__current-value',
  },

  singleSlider: {
    pris: '#PRICE__0 .tcne-control__line-wrapper',
    prisCurrentValue: '#PRICE__0 .filter-slider__current-value',
  },

  sticky: {
    cleanFilter: '.indflow-selection-box__clear-filter .webui-button',
  },
};

class Filter {
  // viewing and waiting for elements

  static WaitForFilteringToLoad() {
    browser.waitForExist(selectors.filterpanelStructure.filterPanelContent, 15000);
    browser.waitForExist(selectors.filterpanelStructure.filterPanelHeading, 15000);
  }

  static ViewFilterPanelComponents() {
    browser.waitForExist(selectors.filterpanelStructure.filterPanelContent, 5000);
    browser.waitForExist(selectors.filterpanelStructure.filterPanelHeading, 5000);
    browser.waitForExist(selectors.filterpanelStructure.filterGroup, 5000);
    browser.waitForExist(selectors.filterpanelStructure.selectionBox, 5000);
    browser.waitForExist(selectors.filterpanelStructure.selectionBox, 5000);
    browser.waitForExist(selectors.filterpanelStructure.selectionBoxItem1, 5000);
    browser.waitForExist(selectors.filterpanelStructure.selectionBoxItem2, 5000);
  }

  static ViewCheckBoxes() {
    return browser.waitForVisible(selectors.checkboxes.firstCheckboxInListsText, 5000);
  }

  static ViewFilterStadsdelar() {
    browser.waitUntil(
      () =>
        // Får inte in selectorn i constructorn för dessa, den hittar inte 'selectors...'
        browser.getText('.hotel-info__filter div:nth-child(1) > h3') === 'Stadsdelar',
      5000,
      'expected text to be different after 5s',
    );
  }

  static ViewFilterHotellstandard() {
    browser.waitUntil(() => browser.getText('.hotel-info__filter div:nth-child(2) > h3') === 'Hotellstandard', 5000, 'expected text to be different after 5s');
  }

  static ViewFilterGastbetyg() {
    browser.waitUntil(() => browser.getText('.hotel-info__filter div:nth-child(3) > h3') === 'Gästbetyg', 5000, 'expected text to be different after 5s');
  }

  static ViewFilterMatOchDryck() {
    browser.waitUntil(() => browser.getText('.hotel-info__filter div:nth-child(4) > h3') === 'Mat och dryck', 5000, 'expected text to be different after 5s');
  }

  static ViewFilterInternet() {
    browser.waitUntil(() => browser.getText('.hotel-info__filter div:nth-child(5) > h3') === 'Internet', 5000, 'expected text to be different after 5s');
  }

  static ViewFilterPris() {
    browser.waitUntil(() => browser.getText('.hotel-info__filter div:nth-child(6) > h3') === 'Pris', 5000, 'expected text to be different after 5s');
  }

  static ViewFilterAvstandTillTunnelbana() {
    browser.waitUntil(() => browser.getText('.hotel-info__filter div:nth-child(7) > h3') === 'Avstånd till tunnelbana', 5000, 'expected text to be different after 5s');
  }

  static ViewFilterAvstandTillStrand() {
    browser.waitUntil(() => browser.getText('.hotel-info__filter div:nth-child(7) > h3') === 'Avstånd till strand', 5000, 'expected text to be different after 5s');
  }

  static ViewFilterAvstandTillLokaltCentrum() {
    browser.waitUntil(() => browser.getText('.hotel-info__filter div:nth-child(8) > h3') === 'Avstånd till lokalt centrum', 5000, 'expected text to be different after 5s');
  }

  static ViewFilterBoende() {
    browser.waitUntil(() => browser.getText('.hotel-info__filter div:nth-child(9) > h3') === 'Boende', 5000, 'expected text to be different after 5s');
  }

  static ViewFilterPoolForCity() {
    browser.waitUntil(() => browser.getText('.hotel-info__filter div:nth-child(8) > h3') === 'Pool', 5000, 'expected text to be different after 5s');
  }

  static ViewFilterPoolForSolOchBad() {
    browser.waitUntil(() => browser.getText('.hotel-info__filter div:nth-child(10) > h3') === 'Pool', 5000, 'expected text to be different after 5s');
  }

  static ViewOutfilteredStadsdelar() {
    return browser.click(selectors.checkboxes.firstCheckboxInHotelstandard).waitForExist(selectors.checkboxes.anyDisabledCheckboxInStadsdelar, 5000);
  }

  static ViewMapAndInfo(index) {
    browser.waitForExist(`li:nth-child(${index}) > div .filter-district-info-img`, 5000);
    browser.waitForExist(`li:nth-child(${index}) > div .filter-district-info-text`, 5000);
  }

  static ViewDoubleSlider() {
    browser.isVisible(selectors.doubleSlider.slider);
  }

  static ViewDoubleSlidersGastbetyg() {
    return browser.getText(selectors.doubleSlider.gastbetygCurrentValue);
  }

  static ViewSingleSliderForPris() {
    browser.isVisible(selectors.singleSlider.pris);
  }

  static ViewCurrentValueForSingleSliderPris() {
    return browser.getText(selectors.singleSlider.prisCurrentValue);
  }

  // 'Remember' functions and 'state.' is used for saving data for comparison in another it()
  static RememberCheckboxCounterValueByIndex(index, state) {
    let value = browser.getText(`li:nth-child(${index}) > div .indflow-checkbox-accordion_link-text`);
    value = value.replace(/[^\d.]/g, '');
    value = Number(value);
    state.checkboxValueByIndex = value;
    return state.checkboxValueByIndex;
  }

  // actions

  static CheckACheckbox(index) {
    // Får inte in selectorn i constructorn, se felmeddelande nedan
    // ERROR: index is not defined
    browser.waitForExist(`:nth-child(${index}) > div > div > div > label span.webui-checkbox__square`, 5000);
    return browser
      .click(`:nth-child(${index}) > div > div > div > label span.webui-checkbox__square`)
      .waitForExist(`li:nth-child(${index}) div.webui-checkbox.webui-checkbox--checked span`, 5000);
  }

  static UncheckACheckbox(index) {
    browser.waitForExist(`li:nth-child(${index}) div.webui-checkbox.webui-checkbox--checked span`, 5000);
    return browser
      .click(`li:nth-child(${index}) div.webui-checkbox.webui-checkbox--checked span`)
      .waitForExist(`:nth-child(${index}) > div > div > div > label span.webui-checkbox__square`, 5000);
  }

  static CheckACheckboxForHotelstandard(index) {
    browser.waitForExist(`:nth-child(${index}) > ul > li > ul > li:nth-child(1) > div > label > span.webui-checkbox__square`, 5000);
    return browser
      .click(`li:nth-child(${index}) div.webui-checkbox.webui-checkbox--checked span`)
      .waitForExist(`:nth-child(${index}) > div > div > div > label span.webui-checkbox__square`, 5000);
  }

  static ExpandMapAndInfo(index) {
    browser.waitForExist(`li:nth-child(${index}) > div .indflow-checkbox-accordion_link-text`, 5000);
    return browser.click(`li:nth-child(${index}) > div .indflow-checkbox-accordion_link-text`);
  }

  static CollapseMapAndInfo(index) {
    browser.waitForExist(`li:nth-child(${index}) > div .indflow-checkbox-accordion_link-text`, 5000);
    return browser.click(`li:nth-child(${index}) > div .indflow-checkbox-accordion_link-text`).waitForExist(`li:nth-child(${index}) > div .tcneicon-arrow-down`, 5000);
  }

  static ClickResetFilters() {
    browser.waitForExist(selectors.sticky.cleanFilter, 5000);
    browser.click(selectors.sticky.cleanFilter);
  }

  static ClickOnDoubleSlider() {
    browser.click(selectors.doubleSlider.slider);
    browser.pause(1000);
  }

  static ClickOnSingleSlider() {
    browser.click(selectors.singleSlider.pris);
    browser.pause(1000);
  }

  static BrowserbackToHotelList() {
    browser.back();
    IndenpendentFlow.hotelList.waitUntilLoaded();
  }
}

export default Filter;
