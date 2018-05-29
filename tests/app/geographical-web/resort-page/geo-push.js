import Page from './../../../../pages/page';
import GeographicalWeb from './../../../../pages/apps/geographical-web/geographical-web-resort';
import { geoPush } from './../../../../pages/apps/geographical-web/urls';

import { Translate } from '../../../../tools';

describe('Geographical-web - Geopush', () => {
  before(() => {
    const environmentUrl = Translate(geoPush[browser.options.tc.environment]);
    Page.goTo(environmentUrl);
  });

  describe('Can see Geopush', () => {
    it('Waits until geopush container is loaded', () => {
      GeographicalWeb.geoPush.waitUntilLoaded();
    });
    it('Geopush in Arguineguin has 3 items', () => {
      GeographicalWeb.geoPush.numberOfItems.should.equal(3, 'Geopush does not have three items');
    });
    it('All items have content and link', () => {
      GeographicalWeb.geoPush.items.forEach((item) => {
        expect(item.title).to.not.equal('', 'There was no text for the push');
        expect(item.link).to.not.equal('', 'There was no link for the push');
      });
    });
  });
});
