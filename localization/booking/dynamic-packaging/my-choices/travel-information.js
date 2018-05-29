import { Translate } from '../../../../tools';
import { CommonTravelInformationTranslations } from '../../common/my-choices/travel-information';


/**
 * @property {string} journeyHome
 * @property {string} checkIn
 * @property {string} checkOut
 * @property {string} price
 * @mixes CommonTravelInformationTranslations
 */
export const DPTravelInformationTranslations = Object.assign(
    {
        journeyHome: Translate({
            dk: "",
            fi: "",
            no: "",
            se: "Hemresa"
        }),

        checkIn: Translate({
            dk: "",
            fi: "",
            no: "",
            se: "Incheckning"
        }),

        checkOut: Translate({
            dk: "",
            fi: "",
            no: "",
            se: "Utcheckning"
        }),

        price: Translate({
            dk: "",
            fi: "",
            no: "",
            se: "Pris"
        })
    },
    CommonTravelInformationTranslations
);