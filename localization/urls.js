import { Translate } from '../tools';


export const Urls = {
    charter: {
        departureAndHotelList: {
            old: Translate({
                dk: "/bestil-pakkerejse",
                fi: "/varaapaketti",
                glob: "/bokapaket",
                no: "/charterpackagelist",
                se: "/bokapaket"
            }),

            new: Translate({
                dk: "/bestil-charterrejse",
                fi: "/varaa-matka",
                glob: "",
                no: "/bestill-reise",
                se: "/boka-resa"
            })
        },

        hotelPage: {
            old: Translate({
                dk: "/vaelg-hotellet",
                fi: "/charteraccomodationinfo",
                glob: "/charteraccomodationinfo",
                no: "/charteraccomodationinfo",
                se: "/charteraccomodationinfo"
            }),

            new: Translate({
                dk: "/bestil-charterrejse-hotelvalg",
                fi: "/valitse-hotelli",
                glob: "/boka-resa-hotell",
                no: "/bestill-reise-hotell",
                se: "/boka-resa-hotell"
            })
        }
    },

    dynamic: {
        departureAndHotelList: {
            old: Translate({
                dk: "/packageindependentacclist",
                fi: "/valmispaketti-asuminen-lista",
                glob: "/packageindependentacclist",
                no: "/independentpackageaccomodationlist",
                se: "/packageindependentacclist"
            }),

            new: Translate({
                dk: "/rejse-med-fly-og-hotel",
                fi: "/varaa-lennot-ja-hotelli",
                glob: "/boka-paketresa",
                no: "/bestill-fly-og-hotell",
                se: "/boka-paketresa"
            })
        },

        hotelPage: {
            old: Translate({
                dk: "/vaelg-hotel",
                fi: "/valmispaketti-asuminen",
                glob: "/independentpackageaccomodationinfo",
                no: "/independentpackageaccomodationinfo",
                se: "/independentpackageaccomodationinfo"
            }),

            new: Translate({
                dk: "/bestil-pakkerejse-hotelvalg",
                fi: "/varaa-hotelli",
                glob: "/boka-paketresa-hotell",
                no: "/bestill-pakkereise-hotell",
                se: "/boka-paketresa-hotell"
            })
        }
    }
};

