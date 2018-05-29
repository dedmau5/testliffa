import { Translate } from '../../../tools';


/**
 * @type {{
 *      step1: {
 *          label: string,
  *         step: string
  *     },
  *     step2: {
  *         label: string,
  *         step: string
  *     }
  * }}
 */
export const ProgressTranslations = {
    step1: {
        label: Translate({
            dk: "Angiv personoplysninger",
            fi: "Syötä henkilötiedot",
            no: "Oppgi personopplysninger",
            se: "Ange personuppgifter"
        }),

        step: Translate({
            dk: "1",
            fi: "1",
            no: "1",
            se: "1"
        })
    },

    step2: {
        label: Translate({
            dk: "Bekræft bestilling",
            fi: "Vahvista varaus",
            no: "Bekreft bestillingen",
            se: "Bekräfta bokningen"
        }),

        step: Translate({
            dk: "2",
            fi: "2",
            no: "2",
            se: "2"
        })
    }
};

