import { Sanity } from './sanity';
import { EnterInformationAboutTravellers } from './enter-information-about-travellers';
import { MakeAdditionalChoices } from './make-additional-choices';
import { EnterAddressInformationForPrimaryTraveller } from './enter-address-information-for-primary-traveller';


/**
 * @param sharedData
 * @param options {Object}
 * @param options.mode {'charter'|'dynamic-packaging'}
 */
export function HandleTheNameCollection(sharedData, options) {
    let nameCollection;

    describe(
        'Name Collection',

        () => {
            const pageIsLoadingTimeout = 50000;
            browser.waitForExist(".passenger");
            Sanity(sharedData, options, pageIsLoadingTimeout);
            EnterInformationAboutTravellers(sharedData);
            MakeAdditionalChoices(sharedData, options);
            EnterAddressInformationForPrimaryTraveller(sharedData);

            it("Price shown under 'Travel Information' equals the 'Total Price'",

                () => {
                    nameCollection = sharedData.nameCollection.nameCollection;

                    const price = sharedData.nameCollection.myChoices.travelInformation.price;
                    sharedData.price = price;
                    sharedData.totalPriceInNameCollectionView = nameCollection.totalPrice;
                    expect(price).to.equal(sharedData.totalPriceInNameCollectionView);
                }
            );

            it("Can click on Book and proceed to the next page",

                () => {
                    nameCollection.bookButton.click();
                }
            );
        }
    );
}