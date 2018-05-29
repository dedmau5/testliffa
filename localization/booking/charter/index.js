import { MyChoicesTranslations } from './my-choices';
import { ProgressTranslations } from './progress';
import { NameCollectionTranslations } from './name-collection';
import { BookExtrasTranslations } from './book-extras';
import { ConfirmBookingTranslations } from './confirm-booking';
import { ConfirmedBookingTranslations } from './confirmed-booking';


/**
 * @type {{
 *     myChoices: MyChoicesTranslations,
 *     progress: ProgressTranslations,
 *     steps: {
 *         nameCollection: NameCollectionTranslations,
 *         bookExtras: BookExtrasTranslations,
 *         confirmBooking: ConfirmBookingTranslations,
 *         confirmedBooking: ConfirmedBookingTranslations
 *     }
 * }}
 */
export const CharterTranslations = {
    myChoices: MyChoicesTranslations,
    progress: ProgressTranslations,
    steps: {
        nameCollection: NameCollectionTranslations,
        bookExtras: BookExtrasTranslations,
        confirmBooking: ConfirmBookingTranslations,
        confirmedBooking: ConfirmedBookingTranslations
    }
};