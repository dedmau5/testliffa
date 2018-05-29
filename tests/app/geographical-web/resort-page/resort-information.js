import Page from './../../../../pages/page';
import GeographicalWeb from '../../../../pages/apps/geographical-web/geographical-web-resort';
import { resortInformation } from './../../../../pages/apps/geographical-web/urls';

import { Translate } from '../../../../tools';

describe('Geographical-web - Resort Information', () => {
  before(() => {
    const environmentUrl = Translate(resortInformation[browser.options.tc.environment]);
    Page.goTo(environmentUrl);
  });

  describe('Title', () => {
    it('should contain header with minimum one letter', () => {
      expect(GeographicalWeb.resortInformation.title.getTitle()).to.exist;
      expect(GeographicalWeb.resortInformation.title.titleText).to.have.length.above(1);
    });
    it('should contain second header with at least one letter', () => {
      expect(GeographicalWeb.resortInformation.title.getSubHeader()).to.exist;
      expect(GeographicalWeb.resortInformation.title.subHeaderText).to.have.length.above(1);
    });
  });

  describe('Description', () => {
    it('should expand text on open', () => {
      GeographicalWeb.resortInformation.description.expand();
      expect(GeographicalWeb.resortInformation.description.hideLink).to.exist;
    });

    it('should hide text on close', () => {
      GeographicalWeb.resortInformation.description.hide();
      expect(GeographicalWeb.resortInformation.description.expandLink).to.exist;
    });
  });

  describe('Usplist elements', () => {
    it('should contain an array with elements', () => {
      expect(GeographicalWeb.resortInformation.uspList.uspListElement).to.exist;
    });
  });

  describe('Rating element', () => {
    describe('Guest rating', () => {
      it('should exist', () => {
        expect(GeographicalWeb.resortInformation.rating.guestRating).to.exist;
      });

      it('should open pop up when clicked on', () => {
        GeographicalWeb.resortInformation.rating.scroll();
        GeographicalWeb.resortInformation.rating.guestRatingClick();
        GeographicalWeb.resortInformation.rating.waitForPopUp();
        expect(GeographicalWeb.resortInformation.rating.popUpRating).to.exist;
        GeographicalWeb.resortInformation.rating.closePopUpRating();
      });
    });

    describe('Category rating', () => {
      it('should exist', () => {
        expect(GeographicalWeb.resortInformation.rating.guestRating).to.exist;
      });

      it('should open pop up when clicked on', () => {
        GeographicalWeb.resortInformation.rating.scroll();
        GeographicalWeb.resortInformation.rating.categoryRatingClick();
        GeographicalWeb.resortInformation.rating.waitForPopUp();
        expect(GeographicalWeb.resortInformation.rating.popUpRating).to.exist;
        GeographicalWeb.resortInformation.rating.closePopUpRating();
      });
    });
  });

  describe('Tabs', () => {
    describe('Left side', () => {
      it('should exist and contain a text of at least 1 letter', () => {
        expect(GeographicalWeb.resortInformation.tabs.leftTab).to.exist;
        expect(GeographicalWeb.resortInformation.tabs.leftTabText).to.have.length.above(1);
      });

      it('should be selected when clicked on', () => {
        GeographicalWeb.resortInformation.tabs.leftTabClick();
        expect(GeographicalWeb.resortInformation.tabs.leftTabSelected).to.exist;
      });
    });
  });
});
