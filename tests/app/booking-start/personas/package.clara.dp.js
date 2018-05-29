const util = require('gulp-util');
const moment = require('moment');

function translate(objectToTranslate) {
  const currentLanguage = util.env.language;
  return objectToTranslate[currentLanguage];
}

const departureDate = moment(new Date()).add(6, 'months');
const returnDate = departureDate.clone().add(5, 'days');

exports.PackageClaraDP = {
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
    area: translate({
      dk: 'Mallorca', fi: 'Gran Canaria', no: 'Gran Canaria', se: 'Gran Canaria', globe: 'Gran Canaria',
    }),
    resort: translate({
      dk: 'Alcudia', fi: 'Las Palmas', no: 'Las Palmas', se: 'Las Palmas', globe: 'Las Palmas',
    }),
  },
  duration: {
    visible: true,
    lenght: translate({
      dk: 'Valgfri rejselængde', fi: 'Vapaavalintainen', no: 'Valgfri reiselengde', se: 'Valfri reslängd', globe: 'Valfri reslängd',
    }),
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
