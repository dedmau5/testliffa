import Page from '../../../pages/page';
import Header from '../../../pages/apps/header-footer/header/header';
import settings from './settings';
import { header, startPage } from './../../../pages/apps/header-footer/urls';

describe('Header', () => {
  before(() => {
    const environmentUrl = header[browser.options.tc.environment];
    Page.goTo(environmentUrl);
    settings.randomMenuItem = Header.navigation.getRandomMenuItem();
  });

  describe('Navigation', () => {
    describe('Navigation', () => {
      it('Can use navigation', () => {
        const canNavigate = Header.navigation.navigateTo(settings.randomMenuItem.title);
        canNavigate.should.equal(true, `Could not find ${settings.randomMenuItem.title} to click on`);
      });

      it('Should have expected url after clicking on menuoption', () => {
        Page.url.should.equal(settings.randomMenuItem.url, `expected ${Page.url} to match ${settings.randomMenuItem.url} when clicking on ${settings.randomMenuItem.title}`);
        browser.back();
      });
    });

    describe('Logo', () => {
      it('Can click on the logo', () => {
        Header.logo.click();
      });

      it('Logo links to start page', () => {
        const startPageUrl = startPage[browser.options.tc.environment];
        Page.url.should.equal(startPageUrl, `expected ${Page.url} to match ${startPageUrl} when clicking on logo`);
      });
    });
  });
});
