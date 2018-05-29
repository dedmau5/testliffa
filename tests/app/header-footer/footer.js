import Page from '../../../pages/page';
import Footer from '../../../pages/apps/header-footer/footer';
import { footer } from './../../../pages/apps/header-footer/urls';

describe('Footer', () => {
  before(() => {
    const environmentUrl = footer[browser.options.tc.environment];
    Page.goTo(environmentUrl);
  });
  describe('Market', () => {
    it('Can click on first item', () => {
      const item = Footer.market.links[0];
      item.click();

      Page.url.should.contain(item.href);
      browser.back();
    });

    it('Can click on second item', () => {
      const item = Footer.market.links[1];
      item.click();

      Page.url.should.contain(item.href);
      browser.back();
    });

    it('Can click on third item', () => {
      const item = Footer.shortcuts.links[2];
      item.click();

      Page.url.should.contain(item.href);
      browser.back();
    });
  });
  describe('Newsletter', () => {
    it('Can add value to newsletter input', () => {
      Footer.newsletter.input.setValue('test');
    });

    it('Error message is present', () => {
      Footer.newsletter.input.hasErrorMessage();
    });

    it('Can remove value from input', () => {
      Footer.newsletter.input.clear();
    });

    it('Can add value to newsletter input', () => {
      Footer.newsletter.input.setValue('test.tetsson@thomascook.se');
    });

    it('Can press send', () => {
      Footer.newsletter.input.send();
    });
  });

  describe('Shortcuts', () => {
    it('Can click on first item', () => {
      const item = Footer.shortcuts.links[0];
      item.click();

      Page.url.should.contain(item.href);
      browser.back();
    });

    it('Can click on second item', () => {
      const item = Footer.shortcuts.links[1];
      item.click();

      Page.url.should.contain(item.href);
      browser.back();
    });

    it('Can click on third item', () => {
      const item = Footer.shortcuts.links[2];
      item.click();

      Page.url.should.contain(item.href);
      browser.back();
    });
  });
});
