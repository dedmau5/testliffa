import { Translate, waitForUrlToChange } from '../../../../tools/index';
import { HotelFinderWebPage } from '../../../../pages/apps/hotel-finder-web/hotel-finder-pageobject';
import { Urls } from '../../../../localization/index';

export function CanNavigateToHotelFinderPage() {
  it('Can navigate to Hotel Finder Page', function() {
    this.timeout(30000);
    this.slow(15000);
    HotelFinderWebPage.navigateTo();
    HotelFinderWebPage.waitUntilLoaded();
  });
}

const hotelFinderUrls = {
  new: Translate({
    dk: '/find-dit-hotel',
    fi: '/lomahaku',
    no: '/finn-hotell',
    se: '/hitta-hotell',
  }),
};
