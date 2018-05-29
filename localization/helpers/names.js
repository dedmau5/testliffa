import { Translate } from '../../tools';


const swedishFemaleNames = [
    "Berit",
    "Solvig",
    "Emma",
    "Hanna",
    "Tilda",
    "Sandra",
    "Amanda",
    "Karin"
];


const swedishMaleNames = [
    "Kenny",
    "Stefan",
    "Sigfrid",
    "Vilhelm",
    "Elov",
    "Roger",
    "Vilmar",
    "Bosse"
];


const swedishLastNames = [
    "Olsson",
    "Lindberg",
    "Einarsson",
    "Sörensson",
    "Björk",
    "Danielsson",
    "Grahn",
    "Alfredsson"
];


export const firstnames = {
    // Always return a new list
    get female() {
        return Translate({
            dk: [
                "Agnes",
                "Emilia",
                "Emma",
                "Else",
                "Ingeborg",
                "Gyda",
                "Johanna",
                "Ida"
            ],

            fi: [
                "Anni",
                "Annukka",
                "Eliina",
                "Jaana",
                "Kiira",
                "Katri",
                "Marketta",
                "Maritta"
            ],

            no: [
                "Hjørdis",
                "Hildur",
                "Inga",
                "Isabella",
                "Josefine",
                "Judit",
                "Kaia",
                "Kaja"
            ],

            se: swedishFemaleNames,
            globe: swedishFemaleNames
        });
    },

    // Always return a new list
    get male() {
        return Translate({
            dk: [
                "Adam",
                "Adolf",
                "Enok",
                "Isak",
                "Inge",
                "Hugo",
                "Jacob",
                "Karl"
            ],

            fi: [
                "Henri",
                "Eerik",
                "Elias",
                "Joakim",
                "Joonas",
                "Jooseppi",
                "Klaus",
                "Luukas"
            ],

            no: [
                "Aage",
                "Adrian",
                "Bernt",
                "Birger",
                "Edvard",
                "Erlend",
                "Jørg",
                "Josef"
            ],

            se: swedishMaleNames,
            globe: swedishMaleNames
        });
    }
};


export const lastnames = Translate({
    dk: [
        "Borup",
        "Boyer",
        "Digman",
        "Hegner",
        "Juul",
        "Kai",
        "Sogard",
        "Svendsen"
    ],

    fi: [
        "Aho",
        "Elo",
        "Couri",
        "Halla",
        "Kauppi",
        "Kivi",
        "Kyllo",
        "Ranta",
        "Valli"
    ],

    no: [
        "Bohle",
        "Borseth",
        "Hegge",
        "Houg",
        "Narum",
        "Olsen",
        "Tandberg",
        "Vik"
    ],

    se: swedishLastNames,
    globe: swedishLastNames
});