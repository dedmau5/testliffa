//urls for different environments to be called in the run-command
module.exports = {
    baseUrls: {
        production: {
            dk: "https://www.spies.dk",
            fi: "https://www.tjareborg.fi",
            no: "https://www.ving.no",
            se: 'https://www.ving.se',
            globe: 'https://www.globetrotter.se'
        },

        prod: {
            dk: "https://www.spies.dk",
            fi: "https://www.tjareborg.fi",
            no: "https://www.ving.no",
            se: 'https://www.ving.se',
            globe: 'https://www.globetrotter.se'
        },

        acctest: {
            dk: "http://spiesdk.acctest.int",
            fi: "http://tjareborgfi.acctest.int",
            no: "http://vingno.acctest.int",
            se: "http://vingse.acctest.int",
            globe: 'http://globetrotterse.acctest.int'
        },

        acctest101: {
            dk: "http://spiesdk101.acctest.int",
            fi: "http://tjareborgfi101.acctest.int",
            no: "http://vingno101.acctest.int",
            se: "http://vingse101.acctest.int",
            globe: 'http://globetrotterse101.acctest.int'
        },
        
        acctest102: {
            dk: "http://spiesdk102.acctest.int",
            fi: "http://tjareborgfi102.acctest.int",
            no: "http://vingno102.acctest.int",
            se: "http://vingse102.acctest.int",
            globe: 'http://globetrotterse102.acctest.int'
        },
        
        webmaster: {
            dk: "http://spiesdkwebmaster.acctest.int",
            fi: "http://tjareborgfiwebmaster.acctest.int",
            no: "http://vingnowebmaster.acctest.int",
            se: "http://vingsewebmaster.acctest.int",
            globe: 'http://globetrottersewebmaster.acctest.int'
        },

        dev: {
            dk: "http://spiesdk.dev.int",
            fi: "http://tjareborgfi.dev.int",
            no: "http://vingno.dev.int",
            se: "http://vingse.dev.int",
            globe: 'http://globetrotterse.dev.int'
        },

        lmsstandalone_dev: {
            se: "http://lastminutesales.dev.int/main",
        },

        lmsstandalone_acctest: {
            se: "http://lastminutesales.acctest.int/main",
        },

        lmsstandalone_prodint: {
            se: "http://lastminutesales.prodint.int/main",
        },

        charterflowstandalone_dev: {
            se: "http://charterflow.dev.int",
        },

        charterflowstandalone_acctest: {
            se: "http://charterflow.acctest.int",
        },

        charterflowstandalone_prodint: {
            se: "http://charterflow.prodint.int",
        },

        pricematrixstandalone_dev: {
            se: "http://charterpricematrix.dev.int",
        },

        pricematrixstandalone_acctest: {
            se: "http://charterpricematrix.acctest.int",
        },

        pricematrixstandalone_prodint: {
            se: "http://charterpricematrix.prodint.int",
        },

        hotelwebstandalone_dev: {
            se: "http://hotelweb.dev.int",
        },

        hotelwebstandalone_acctest: {
            se: "http://hotelweb.acctest.int",
        },

        hotelwebstandalone_prodint: {
            se: "http://hotelweb.prodint.int",
        },



        inddev: {
            dk: "http://spiesdk-ind.dev.int",
            fi: "http://tjareborgfi-ind.dev.int",
            no: "http://vingno-ind.dev.int",
            se: "http://vingse-ind.dev.int",
            globe: 'http://globetrotterse-ind.dev.int'
        },

        test: {
            dk: "http://spiesdk.test.int",
            fi: "http://tjareborgfi.test.int",
            no: "http://vingno.test.int",
            se: "http://vingse.test.int",
            globe: 'http://globetrotterse.test.int'
        },

        dmz1: {
            dk: "http://spies101dk.prod.dmz",
            fi: "http://tjareborg101fi.prod.dmz",
            no: "http://ving101no.prod.dmz",
            se: "http://ving101se.prod.dmz",
            globe: 'http://globetrotter101se.prod.dmz'
        },

        dmz2: {
            dk: "http://spies102dk.prod.dmz",
            fi: "http://tjareborg102fi.prod.dmz",
            no: "http://ving102no.prod.dmz",
            se: "http://ving102se.prod.dmz",
            globe: 'http://globetrotter102se.prod.dmz'
        },
        
        dmz3: {
            dk: "http://spies103dk.prod.dmz",
            fi: "http://tjareborg103fi.prod.dmz",
            no: "http://ving103no.prod.dmz",
            se: "http://ving103se.prod.dmz",
            globe: 'http://globetrotter103se.prod.dmz'
        },
        
        dmz4: {
            dk: "http://spies104dk.prod.dmz",
            fi: "http://tjareborg104fi.prod.dmz",
            no: "http://ving104no.prod.dmz",
            se: "http://ving104se.prod.dmz",
            globe: 'http://globetrotter104se.prod.dmz'
        },
        
        dmz5: {
            dk: "http://spies105dk.prod.dmz",
            fi: "http://tjareborg105fi.prod.dmz",
            no: "http://ving105no.prod.dmz",
            se: "http://ving105se.prod.dmz",
            globe: 'http://globetrotter105se.prod.dmz'
        },
        
        dmz6: {
            dk: "http://spies106dk.prod.dmz",
            fi: "http://tjareborg106fi.prod.dmz",
            no: "http://ving106no.prod.dmz",
            se: "http://ving106se.prod.dmz",
            globe: 'http://globetrotter106se.prod.dmz'
        },

        prodint: {
            dk: "http://spiesdk.prod.int",
            fi: "http://tjareborgfi.prod.int",
            no: "http://vingno.prod.int",
            se: "http://vingse.prod.int",
            globe: 'http://globetrotterse.prod.int'
        },

        prodint101: {
            dk: "http://spiesdk101.prod.int",
            fi: "http://tjareborgfi101.prod.int",
            no: "http://vingno101.prod.int",
            se: "http://vingse101.prod.int",
            globe: 'http://globetrotterse101.prod.int'
        },
        
        prodint102: {
            dk: "http://spiesdk102.prod.int",
            fi: "http://tjareborgfi102.prod.int",
            no: "http://vingno102.prod.int",
            se: "http://vingse102.prod.int",
            globe: 'http://globetrotterse102.prod.int'
        },
    }
};