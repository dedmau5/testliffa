import Page from './../../../../pages/page';
import GeographicalWebArea from './../../../../pages/apps/geographical-web/geographical-web-area';
import { resortList } from './../../../../pages/apps/geographical-web/urls';

import { Translate } from '../../../../tools';

describe('Geographical-web-area - Resort list on area pages', () => {
  before(() => {
    const environmentUrl = Translate(resortList[browser.options.tc.environment]);
    Page.goTo(environmentUrl);
  });

  describe('Can see Resort list', () => {
    it('Waits until resort list container is loaded', () => {
      GeographicalWebArea.resortList.waitUntilLoaded();
    });

    it('Check there is a list of items', () => {
      expect(GeographicalWebArea.resortList.items.length).to.be.above(0, 'There are missing items in the list');
    });
  });

  describe('Resort List Item', () => {
    let resortListItem;
    describe('Title', () => {
      it('There is a title', () => {
        [, , , resortListItem] = GeographicalWebArea.resortList.items;
        expect(resortListItem.name).to.not.be.empty;
      });
    });

    describe('Image', () => {
      it('There is a image', () => {
        expect(resortListItem.image.url).to.exist;
      });
    });

    describe('Category Ratings', () => {
      it('There are category ratings', () => {
        if (resortListItem.ratingsLabels.length === 0) {
          this.skip();
        }

        expect(resortListItem.ratingsLabels.length).to.be.below(4, 'There should not be more than 3 category rating labels');
      });

      it('Can click on category ratings and open popup', () => {
        if (resortListItem.ratingsLabels.length === 0) {
          this.skip();
        }
        const [firstCategory] = resortListItem.ratingsLabels;
        firstCategory.select();
        resortListItem.popup.waitUntilLoaded();

        expect(resortListItem.popup.element).to.exist;
      });

      it('Can close popup', () => {
        if (resortListItem.ratingsLabels.length === 0) {
          this.skip();
        }
        resortListItem.popup.close();

        expect(resortListItem.popup.isOpen).to.be.false;
      });
    });

    describe('Rating', () => {
      it('There is a rating container', () => {
        expect(resortListItem.guestRating).to.exist;
      });

      it('Can click on rating and open popup', () => {
        resortListItem.guestRating.select();
        resortListItem.popup.waitUntilLoaded();

        expect(resortListItem.popup.element).to.exist;
      });

      it('Can close popup', () => {
        resortListItem.popup.close();

        expect(resortListItem.popup.isOpen).to.be.false;
      });
    });

    describe('Hotels', () => {
      let hotelsLink;
      it('There is a hotels container', () => {
        expect(resortListItem.hotels).to.exist;
      });

      it('There is a link to hotels', () => {
        hotelsLink = resortListItem.hotels.link;
        expect(hotelsLink).to.not.be.empty;
      });

      // it('There is a hotels container', () => { //Does not work when A/BTest is active
      //   resortListItem.hotels.goTo();
      //   expect(hotelsLink).to.be.equal(Page.url);
      // });

      // it('Go back', () => {
      //   browser.back();
      // });
    });

    describe('Can click on read more', () => {
      let readMoreUrl;
      it('There is a read more button', () => {
        expect(resortListItem.readMore).to.exist;
      });

      it('There is a link to hotels', () => {
        readMoreUrl = resortListItem.readMore.url;
        expect(readMoreUrl).to.not.be.empty;
      });

      // it('There is a hotels container', () => { //Does not work when A/BTest is active
      //   resortListItem.readMore.select();
      //   expect(readMoreUrl).to.be.equal(Page.url);
      // });

      // it('Go back', () => {
      //   browser.back();
      // });
    });
  });
});
