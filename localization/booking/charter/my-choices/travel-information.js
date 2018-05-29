import { Translate } from '../../../../tools';
import { CommonTravelInformationTranslations } from '../../common/my-choices/travel-information';


/**
 * @property {string} duration
 * @property {string} destination
 * @property {string} meals
 * @property {string} totalPrice
 * @mixes CommonTravelInformationTranslations
 */
export const CharterTravelInformationTranslations = Object.assign(
    {
        duration: Translate({
            dk: "",
            fi: "",
            no: "",
            se: "Reslängd"
        }),

        destination: Translate({
            dk: "",
            fi: "",
            no: "",
            se: "Resmål"
        }),

        meals: Translate({
            dk: "",
            fi: "",
            no: "",
            se: "Måltider"
        }),

        totalPrice: Translate({
            dk: "",
            fi: "",
            no: "",
            se: "Totalpris"
        })
    },
    CommonTravelInformationTranslations
);