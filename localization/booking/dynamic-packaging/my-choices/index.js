import { Translate } from '../../../../tools';
import { DPTravelInformationTranslations } from './travel-information';


/**
 * @type {{
 *     heading: string,
 *     progress: {
 *         step1: string,
 *         step2: string
 *     },
 *     travelInformation: DPTravelInformationTranslations
 * }}
 */
export const DPMyChoicesTranslations = {
    heading: Translate({
        dk: "Mine valg - trin for trin",
        fi: "Valinnat - askel askeleelta",
        no: ["Trinn 1 av 2", "Trinn 2 av 2"],
        se: "Mina val - steg för steg"
    }),

    progress: {
        step1: Translate({
            dk: "Trin 1 af 2 - Personoplysninger",
            fi: "Vaihe 1 / 2 - Henkilötiedot",
            no: "Oppgi personopplysninger",
            se: "Steg 1 av 2 - Personuppgifter"
        }),

        step2: Translate({
            dk: "Trin 2 af 2 - Bekræft bestilling",
            fi: "Vaihe 2 / 2 - Vahvista varaus",
            no: "Bekreft bestillingen",
            se: "Steg 2 av 2 - Bekräfta bokningen"
        })
    },

    travelInformation: DPTravelInformationTranslations
};