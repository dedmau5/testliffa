import { Translate, waitForUrlToChange } from '../../../../tools/index';
import { LMSPage } from '../../../../pages/apps/last-minute-sales/last-minute-sales-pageobject';
import { Urls } from '../../../../localization/index';

 export function CanNavigateToLMSPage() {
    it("Can navigate to LMS Page", function () {
        this.timeout(30000);
        this.slow(15000);

        LMSPage.navigateTo();
        LMSPage.waitUntilLoaded();
    });
}

const lmsUrls = {
        new: Translate({
        dk: "/afbudsrejser",
        fi: "/akkilahdot",
        no: "/restplasser",
        se: "/sista-minuten-resor",
    })
};
