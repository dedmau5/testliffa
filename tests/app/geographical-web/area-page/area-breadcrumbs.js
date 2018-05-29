import Page from './../../../../pages/page';
import GeographicalWebArea from './../../../../pages/apps/geographical-web/geographical-web-area';
import { areaBreadcrumbs } from './../../../../pages/apps/geographical-web/urls';

import { Translate } from '../../../../tools';

describe('Geographical-web - Breadcrumbs on area pages', () => {
  before(() => {
    const environmentUrl = Translate(areaBreadcrumbs[browser.options.tc.environment]);
    Page.goTo(environmentUrl);
  });

  describe('Can see Breadcrumbs', () => {
    it('Waits until breadcrumbs container is loaded', () => {
      GeographicalWebArea.breadcrumbs.waitUntilLoaded();
    });
    it('Breadcrumbs has 4 items', () => {
      GeographicalWebArea.breadcrumbs.numberOfItems.should.equal(3, 'Breadcrumbs does not have four items');
    });
    it('Last item should be equal to the resort name', () => {
      GeographicalWebArea.breadcrumbs.lastItemText.should.equal('Gran Canaria', 'Last item is not equal to Gran Canaria');
    });
  });
});
