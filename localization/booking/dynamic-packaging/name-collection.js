import { CommonNameCollectionTranslations } from '../common/name-collection';
import { Translate } from '../../../tools';


/**
 * @type {{
 *     gender: {
 *         female: string,
 *         male: string
 *     }
 *
 *     url: string
 * }}
 */
export const NameCollectionTranslations = Object.assign(
    {},
    CommonNameCollectionTranslations,
    {
        url: Translate({
            dk: "/independentpassengerdetails",
            fi: "/paketti-reittilennot",
            no: "/independentpassengerdetails",
            se: "/packageindependenttransportlist"
        }),
    }
);