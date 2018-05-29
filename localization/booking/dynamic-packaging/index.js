import { DPMyChoicesTranslations } from './my-choices';
import { ProgressTranslations } from './progress';
import { NameCollectionTranslations } from './name-collection';
import { ConfirmBookingTranslations } from './confirm-booking';
import { ConfirmedBookingTranslations } from './confirmed-booking';


/**
 * @type {{
 *     myChoices: MyChoicesTranslations,
 *     progress: ProgressTranslations,
 *     steps: {
 *         nameCollection: NameCollectionTranslations,
 *         confirmBooking: ConfirmBookingTranslations,
 *         confirmedBooking: ConfirmedBookingTranslations
 *     }
 * }}
 */
export const DynamicPackagingTranslations = {
    myChoices: DPMyChoicesTranslations,
    progress: ProgressTranslations,
    steps: {
        nameCollection: NameCollectionTranslations,
        confirmBooking: ConfirmBookingTranslations,
        confirmedBooking: ConfirmedBookingTranslations
    }
};