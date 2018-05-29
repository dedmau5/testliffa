import { CommonNameCollectionTranslations } from '../common/name-collection';
import { TravelInsuranceOptionsTranslations } from '../common/travel-insurance-options';
import { Translate } from '../../../tools';


/**
 * @type {{
 *     onboardMeal: { heading: string },
 *     airportTransfer: {heading: string},
 *     cancellationInsurance: {heading: string},
 *     travelInsurance: {heading: string},
 *     travelInsuranceChoices: {heading: string},
 *     mayThomasCookSendImportantInformation: {heading: string},
 *     mayThomasCookSendCatalogsAndEmails: {heading: string},
 *
 *     url: string
 * }}
 */
export const NameCollectionTranslations = Object.assign(
    {},
    CommonNameCollectionTranslations,
    {
        onboardMeal: {
            heading: Translate({
                dk: "Vil du spise godt ombord på flyet?",
                fi: "Valitse lentoateriat",
                no: "Måltider på flyet",
                se: "Vill du ha måltid på flyget?",
                globe: "Vill du ha måltid på flyget?",
            }),
        },

        airportTransfer: {
            heading: Translate({
                dk: "Ønsker du transfer fra lufthavnen?",
                fi: "Valitse kohdekuljetus",
                no: "Transport på reisemålet",
                se: "Vill du ha transport till och från flygplatsen?",
                globe: "Vill du ha transport till och från flygplatsen?",
            }),
        },

        cancellationInsurance: {
            heading: Translate({
                dk: "Afbestilling- og ændringsforsikring",
                fi: "",
                no: "Avbestillingsforsikring",
                se: "Vill du ha av- och ombokningsförsäkring?",
                globe: "Vill du ha av- och ombokningsförsäkring?",
            }),
        },

        travelInsurance: {
            heading: Translate({
                dk: "Rejseforsikring - vil du dækkes ordentligt?",
                fi: "Valitse matkavakuutus",
                no: "Reiseforsikring",
                se: "Vill du ha reseförsäkring?",
                globe: "Vill du ha reseförsäkring?",
            }),
        },

        travelInsuranceChoices: Object.assign({}, TravelInsuranceOptionsTranslations),

        mayThomasCookSendImportantInformation: {
            heading: Translate({
                dk: "Må vi sende dig vigtig information om din rejse?",
                fi: "",
                no: "",
                se: null,
                globe: null,
            })
        },

        mayThomasCookSendCatalogsAndEmails: {
            heading: Translate({
                dk: "Må Spies' eget flyselskab sende dig et katalog og mails?",
                fi: "",
                no: "",
                se: null,
                globe: null,
            })
        },

        checkInLuggage: {
            heading: Translate({
                dk: "Bagage",
                fi: "Matkatavarat",
                no: "Vil du sjekke inn bagasje?",
                se: "Bagage",
                globe: "Vill du checka in bagage?",
            })
        },

        url: Translate({
            dk: "/bestilling-personoplysninger",
            fi: "/matkustajien-tiedot",
            no: "/bookingsteppassengerinfo",
            se: "/namninsamling",
            globe: "/namninsamling",
        })
    }
);