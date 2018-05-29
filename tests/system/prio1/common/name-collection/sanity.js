import { Translate } from '../../../../../tools/index';
import Charter from '../../../../../pages/booking/charter/index';
import { CharterTranslations as CharterTranslations } from '../../../../../localization/booking/charter/index';
import DynamicPackaging from '../../../../../pages/booking/dynamic-packaging/index';
import { DynamicPackagingTranslations as DPTranslations } from '../../../../../localization/booking/dynamic-packaging/index';
import { waitForUrlToChange } from '../../../../../tools/index';


const localizedOnlyFlight = Translate({
    dk: "Kun flybillet",
    fi: "Reittilennot",
    no: "Kun fly",
    se: "Endast flyg",
    globe: "Endast flyg"
});


export function Sanity(sharedData, options, pageIsLoadingTimeout) {
    it(`Can find all elements needed for this test`, function () {

        let data = {},
            translations,
            bookingObject;

        switch (options.mode) {
            case "charter":
                bookingObject = Charter;
                translations = CharterTranslations;
                break;

            case "dynamic-packaging":
                bookingObject = DynamicPackaging;
                translations = DPTranslations;

                break;

            default:
                throw new Error("Unknown mode!");
        }

        data.nameCollection = bookingObject.steps.nameCollection;
        data.nameCollectionUrlToExpect = translations.steps.nameCollection.url;
        data.myChoices = bookingObject.myChoices;
        data.progress = bookingObject.progress;

        data.expectedProgress = {
            label: translations.progress.step1.label,
            step: translations.progress.step1.step
        };

        sharedData.nameCollection = data;
    });

    it(`The "enter information about the traveller(s)" page loads within ${pageIsLoadingTimeout / 1000} s`, function () {

        waitForUrlToChange(sharedData.previousUrl, pageIsLoadingTimeout);
        sharedData.nameCollection.nameCollection.waitForPage();
    });

    // it('Progress is on the right step', function () {

    //     let progress = sharedData.nameCollection.progress,
    //         expectedProgress = sharedData.nameCollection.expectedProgress;

    //     expect(progress.label).to.equal(expectedProgress.label);
    //     expect(progress.step).to.equal(expectedProgress.step);
    // });

    switch (options.mode) {
        case "charter":
            it("Can retrieve the check in date from My Choices", function () {
                browser.pause(10000);
                const myChoices = sharedData.nameCollection.myChoices;

                if ( myChoices.travelInformation.typeOfTravel === localizedOnlyFlight ) {
                    this.skip();
                }

                expect(myChoices.travelInformation.checkInDate).to.be.an.instanceof(Date);

                sharedData.dates = {
                    checkIn: myChoices.travelInformation.checkInDate,
                };
            });
            break;

        case "dynamic-packaging":
            it("Can retrieve the check in and out dates from My Choices", function () {

                const
                    myChoices = sharedData.nameCollection.myChoices,
                    travelInformation = myChoices.travelInformation;

                if ( myChoices.travelInformation.typeOfTravel === localizedOnlyFlight ) {
                    this.skip();
                }

                expect(travelInformation.checkInDate).to.be.an.instanceof(Date);
                expect(travelInformation.checkOutDate).to.be.an.instanceof(Date);

                sharedData.dates = {
                    checkIn: travelInformation.checkInDate,
                    checkOut: travelInformation.checkOutDate
                };
            });
            break;

        default:
            throw new Error("Unknown mode!");
    }
}