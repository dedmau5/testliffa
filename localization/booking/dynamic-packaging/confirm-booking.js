import { Translate } from '../../../tools';


const _storeHistory = {
    label: Translate({
        dk: "",
        fi: "",
        no: "",
        se: "Jag tillåter att Ving sparar min"
    }),

    a: Translate({
        dk: "",
        fi: "",
        no: "",
        se: "resehistorik"
    })
};


const _acceptTerms = {
    label: Translate({
        dk: "",
        fi: "",
        no: "",
        se: "Ja, jag accepterar Vings"
    }),

    a: Translate({
        dk: "",
        fi: "",
        no: "",
        se: "Resevillkor"
    })
};


/**
 * @type {{
 *     heading: string,
 *     summary: {
 *         heading: string,
 *         totalPrice: string,
 *         storeHistory: {
 *             label: string,
 *             a: string
 *         },
 *         acceptTerms: {
 *             label: string,
 *             a: string
 *         }
 *     },
 *     details: {
 *         departure: {},
 *         journeyHome: {},
 *         hotel: {},
 *         transfer: {},
 *         priceSpecification: {
 *             vat: string,
 *             total: string
 *         },
 *         payment: {
 *             sum: string
 *         },
 *         storeHistory: {
 *             label: string,
 *             a: string
 *         },
 *         acceptTerms: {
 *             label: string,
 *             a: string
 *         }
 *     },
 *     url: string
 * }}
 */
export const ConfirmBookingTranslations = {
    heading: Translate({
        dk: "",
        fi: "",
        no: "",
        se: "Bekräfta bokningen"
    }),

    summary: {
        heading: Translate({
            dk: "",
            fi: "",
            no: "",
            se: "Sammanfattning av bokningen"
        }),

        totalPrice: Translate({
            dk: "",
            fi: "",
            no: "",
            se: "Totalpris"
        }),

        storeHistory: _storeHistory,
        acceptTerms: _acceptTerms
    },

    details: {
        departure: {},
        journeyHome: {},
        hotel: {},
        transfer: {},

        priceSpecification: {
            vat: Translate({
                dk: "",
                fi: "",
                no: "",
                se: "EU-moms"
            }),

            total: Translate({
                dk: "",
                fi: "",
                no: "",
                se: "Totalpris"
            })
        },

        payment: {
            sum: Translate({
                dk: "",
                fi: "",
                no: "",
                se: "Summa"
            })
        },

        storeHistory: _storeHistory,
        acceptTerms: _acceptTerms
    },

    url: Translate({
        dk: "/independent-bekraeft-bestilling",
        fi: "/independentconfirmationdetails",
        no: "/independentconfirmationdetails",
        se: "/independentconfirmationdetails"
    })
};