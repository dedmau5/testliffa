import { Translate } from '../../../tools';


const swedishHeading = "Tack för din bokning!";
const swedishChoosePaymentMethod = "Välj betalningssätt";
const swedishUrl = ["/independentpbcpaymentoverview", "/tackindependent"];

/**
 * @type {{
 *     heading: string,
 *     choosePaymentMethodHeading: string,
 *     url: string
 * }}
 */
export const ConfirmedBookingTranslations = {
    heading: Translate({
        dk: "Tak for din bestilling!",
        fi: "Kiitos varauksestasi!",
        no: "Takk for din bestilling!",
        se: swedishHeading,
        globe: swedishHeading
    }),

    choosePaymentMethodHeading: Translate({
        dk: "Betal med kort",
        fi: "Maksa matka",
        no: "Betaling av reisen",
        se: swedishChoosePaymentMethod,
        globe: swedishChoosePaymentMethod
    }),

    url: Translate({
        dk: "/betalrejsen",
        fi: "/flex-maksa-matkasi",
        no: "/independentpbcpaymentoverview",
        se: swedishUrl,
        globe: swedishUrl,
    })
};