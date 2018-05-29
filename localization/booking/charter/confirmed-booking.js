import { Translate } from '../../../tools';


const swedishHeading = "Tack för din bokning!";
const swedishChoosePaymentMethod = "Välj betalningssätt";
const swedishUrl = "/paymentoverviewcharterpbc";


/**
 * @type {{
 *     heading: string,
 *     choosePaymentMethodHeading: string,
 *     thanks: string,
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

    thanks: Translate({
        dk: "",
        fi: "",
        no: "Takk for at du valgte Ving!",
        se: "",
        globe: ""
    }),

    url: Translate({
        dk: ["/betalrejsen", "/betalrejsen_nu"],
        fi: ["/flex-maksa-matkasi", "/maksa-matkasi"],
        no: "/paymentoverviewcharterpbc",
        se: swedishUrl,
        globe: swedishUrl,
    })
};