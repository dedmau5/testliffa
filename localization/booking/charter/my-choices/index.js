import { Translate } from '../../../../tools';
import {  CharterTravelInformationTranslations } from './travel-information';


export const MyChoicesTranslations = {
    heading: Translate({
        dk: "Mine valg - trin for trin",
        fi: "Valinnat - askel askeleelta",
        no: ["Trinn 1 av 3", "Trinn 2 av 3", "Trinn 3 av 3"], // Should not be here.
        se: "Mina val - steg för steg"
    }),

    progress: {
        step1: Translate({
            dk: "Trin 1 af 3 - Personoplysninger",
            fi: "Vaihe 1 / 2 - Henkilötiedot", // Should be: Vaihe 1 / 3 - Henkilötiedot
            no: "Oppgi personopplysninger",
            se: "Steg 1 av 2 - Personuppgifter" // Should be: Steg 1 av 3 - Personuppgifter
        }),

        step2: Translate({
            dk: "Trin 2 af 3 - Bestil tilvalg",
            fi: "Vaihe 2/3 - Varaa lisäpalveluja",
            no: "Bestill tillegg",
            se: "Steg 2 av 3 - Boka tillval (hyrbil, utfärder etc.)"
        }),

        step3: Translate({
            dk: "Trin 3 af 3 - Bekræft bestillingen",
            fi: "Vaihe 3 / 3 - Vahvista varaus",
            no: "Bekreft bestillingen",
            se: "Steg 3 av 3 - Bekräfta bokningen"
        }),
    },

    travelInformation: CharterTravelInformationTranslations
};