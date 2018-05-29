const util = require('gulp-util');
const moment = require('moment');

function translate(objectToTranslate) {
  const currentLanguage = util.env.language;
  return objectToTranslate[currentLanguage];
}

const departureDate = moment().add(3, 'months');
const returnDate = departureDate.clone().add(10, 'days');

exports.FlightOnlyClara = {
  firstName: 'Clara',
  lastName: 'Persson',
  description: 'Clara is a person who loves making DP travels. Often she goes on holidays with her husband and none of her children',

  departure: translate({
    dk: 'København', fi: 'Helsinki', no: 'Oslo, Gardermoen', se: 'Stockholm-Arlanda', globe: 'Stockholm Arlanda',
  }),
  destination: {
    country: translate({
      dk: 'Spanien', fi: 'Espanja', no: 'Spania', se: 'Spanien', globe: 'Spanien',
    }),
    airport: translate({
      dk: 'Mallorca', fi: 'Gran Canaria', no: 'Gran Canaria', se: 'Gran Canaria', globe: 'Barcelona',
    }),
  },
  duration: {
    visible: true,
    lenght: translate({
      dk: 'Valgfri rejselængde', fi: 'Vapaavalintainen', no: 'Valgfri reiselengde', se: 'Valfri reslängd', globe: 'Valfri reslängd',
    }),
    header: {
      charter: translate({
        dk: true, fi: true, no: true, se: true, globe: false,
      }),
      // indendent: true
    },
  },
  date: {
    departure: {
      year: departureDate.year(), month: departureDate.month() + 1, day: departureDate.date(), allowChoosingNearByDate: true, numberOfNearbyMonthsToAllow: 4,
    },
    return: {
      year: returnDate.year(), month: returnDate.month() + 1, day: returnDate.date(), allowChoosingNearByDate: true, numberOfNearbyMonthsToAllow: 4,
    },
  },
  travelCompany: {
    numberOfRooms: 1,
    numberOfAdults: 2,
    numberOfChildren: 0,
    children: [],
  },
};
