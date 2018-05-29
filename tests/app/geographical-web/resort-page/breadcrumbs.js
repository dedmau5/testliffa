import Page from './../../../../pages/page';
import GeographicalWeb from './../../../../pages/apps/geographical-web/geographical-web-resort';
import { breadcrumbs } from './../../../../pages/apps/geographical-web/urls';

import { Translate } from '../../../../tools';

describe('Geographical-web - Breadcrumbs on resortpages', () => {
  before(() => {
    const environmentUrl = Translate(breadcrumbs[browser.options.tc.environment]);
    Page.goTo(environmentUrl);
  });

  describe('Can see Breadcrumbs', () => {
    it('Waits until breadcrumbs container is loaded', () => {
      GeographicalWeb.breadcrumbs.waitUntilLoaded();
    });
    it('Breadcrumbs has 4 items', () => {
      GeographicalWeb.breadcrumbs.numberOfItems.should.equal(4, 'Breadcrumbs does not have four items');
    });
    it('Last item should be equal to the resort name', () => {
      GeographicalWeb.breadcrumbs.lastItemText.should.equal('Alanya', 'Last item is not equal to Alanya');
    });
  });
});
