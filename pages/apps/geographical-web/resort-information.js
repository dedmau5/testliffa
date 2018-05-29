const selectors = {
  container: '#resort-information-view',
  resortTitle: '.gw-information-heading__title',
  resortSubHeader: '.gw-information-heading__subtitle',
  description: {
    expandLink: '.gw-information-description .webui-link--expandable',
    hideLink: '.gw-information-description .webui-link--expanded',
  },
  uspList: '.gw-information-usp-list-box .gw-information-usp-list__item',
  ratings: {
    rating: '.gw-information__right .gw-ratings',
    guestRating: '.webui-guest-rating',
    categoryRatings: '.gw-ratings__category-ratings',
    popUpRatingContent: '.gw-ratings-popup-content',
    closePopUpRating: '.webui-modal-header__close',
  },
  tabs: {
    left: '.gw-tabs .gw-tab__left',
    right: '.gw-tabs .gw-tab__right',
    selected: '.gw-tab--selected',
  },
};

class ResortInformation {
  constructor() {
    this.container = browser.element(selectors.container);
  }

  /**
   *
   *
   * @readonly
   * @memberof ResortInformation
   */
  get title() {
    const title = this.container.element(selectors.resortTitle);
    const titleText = title.getText();
    const subHeader = this.container.element(selectors.resortSubHeader);
    const subHeaderText = subHeader.getText();
    return {
      getTitle: () => title,
      titleText,
      getSubHeader: () => subHeader,
      subHeaderText,
    };
  }

  /**
   *
   *
   * @readonly
   * @memberof ResortInformation
   */
  get description() {
    const expandLink = this.container.element(selectors.description.expandLink);
    const hideLink = this.container.element(selectors.description.hideLink);
    return {
      expand: () => expandLink.click(),
      hide: () => hideLink.click(),
      expandLink: () => expandLink,
      hideLink: () => hideLink,
    };
  }

  /**
   *
   *
   * @readonly
   * @memberof ResortInformation
   */
  get uspList() {
    const uspList = this.container.elements(selectors.uspList);
    return {
      uspListElement: uspList.value,
    };
  }

  /**
   *
   *
   * @readonly
   * @memberof ResortInformation
   */
  get rating() {
    const rating = this.container.element(selectors.ratings.rating);
    const popUpRating = this.container.element(selectors.ratings.popUpRatingContent);
    const guestRating = rating.element(selectors.ratings.guestRating);
    const categoryRating = rating.element(selectors.ratings.categoryRatings);
    const closePopUpRating = this.container.element(selectors.ratings.closePopUpRating);
    return {
      scroll: () => rating.scroll(),
      guestRating: () => guestRating,
      categoryRating: () => categoryRating,
      guestRatingClick: () => guestRating.click(),
      categoryRatingClick: () => categoryRating.click(),
      popUpRating: () => popUpRating,
      waitForPopUp: () => browser.waitUntil(() => popUpRating, 5000, 'expected pop-up to be opened after 5s'),
      closePopUpRating: () => closePopUpRating.click(),
    };
  }

  /**
   *
   *
   * @readonly
   * @memberof ResortInformation
   */
  get tabs() {
    const leftTab = this.container.element(selectors.tabs.left);
    const rightTab = this.container.element(selectors.tabs.right);
    const leftTabSelected = leftTab.element(selectors.tabs.selected);
    const rightTabSelected = rightTab.element(selectors.tabs.selected);
    return {
      leftTab: () => leftTab,
      rightTab: () => rightTab,
      leftTabText: leftTab.getText(),
      rightTabText: rightTab.getText(),
      leftTabClick: () => leftTab.click(),
      rightTabClick: () => rightTab.click(),
      leftTabSelected: () => leftTabSelected,
      rightTabSelected: () => rightTabSelected,
    };
  }
}

export default ResortInformation;
