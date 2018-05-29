const confirmBookingHome = "div.booking-confirm--independent";

const _storeHistory = {
    summary: `${confirmBookingHome} div.checkbox`,
    details: `${confirmBookingHome} > div:nth-last-child(1) div.checkbox`
};

const _acceptTerms = {
    summary: `${confirmBookingHome} div.highlight`,
    details: `${confirmBookingHome} > div:nth-last-child(1) div.highlight`
};

const confirmButton = {
    summary: `${confirmBookingHome} div.confirm-submit-area > input[type=image]`,
    details: `${confirmBookingHome} > div:nth-last-child(1) div.confirm-submit-area > input[type=image]`
};

export const selectors = {
    home: confirmBookingHome,
    heading: `${confirmBookingHome} h1`,

    summary: {
        heading: `${confirmBookingHome} h2`,
        airports: `${confirmBookingHome} ul.summary > li`,
        hotel: `${confirmBookingHome} ul.summary > li:nth-child(2)`,
        dates: `${confirmBookingHome} ul.summary > li:nth-child(3)`,
        passengers: `${confirmBookingHome} ul.summary > li:nth-child(4)`,
        totalPrice: `${confirmBookingHome} p.total-price > strong`,

        storeHistory: {
            checkbox: `${_storeHistory.summary} > span.checkbox-left > input[type=checkbox]`,
            label: `${_storeHistory.summary} > span.checkbox-right > label`,
            a: `${_storeHistory.summary} > span.checkbox-right > a`
        },

        acceptTerms: {
            checkbox: `${_acceptTerms.summary} > span.checkbox-left > input[type=checkbox]`,
            label: `${_acceptTerms.summary} > span.checkbox-right > label`,
            a: `${_acceptTerms.summary} > span.checkbox-right > a`
        },

        confirmButton: confirmButton.summary
    },

    details: {
        departure: {},
        journeyHome: {},
        hotel: {},
        transfer: {},

        priceSpecification: {
            adults: {
                perPerson: "",
                total: ""
            },

            vat: {
                label: "table.price-spec > tbody > tr:nth-child(3) > th",
                amount: "table.price-spec > tbody > tr:nth-child(3) > td:nth-child(8)"
            },

            total: {
                label: "table.price-spec > tfoot td.total-price-header",
                amount: "table.price-spec > tfoot td:nth-child(2) > strong"
            }
        },

        payment: {
            sum: "table.payment-info-table > tbody span.payment-info-price-column"
        },

        storeHistory: {
            checkbox: `${_storeHistory.details} > span.checkbox-left > input[type=checkbox]`,
            label: `${_storeHistory.details} > span.checkbox-right > label`,
            a: `${_storeHistory.details} > span.checkbox-right > a`
        },

        acceptTerms: {
            checkbox: `${_acceptTerms.details} > span.checkbox-left > input[type=checkbox]`,
            label: `${_acceptTerms.details} > span.checkbox-right > label`,
            a: `${_acceptTerms.details} > span.checkbox-right > a`
        },

        confirmButton: confirmButton.details
    }
};