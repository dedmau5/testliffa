const util = require('gulp-util');
const moment = require('moment');

function translate(objectToTranslate) {
  const currentLanguage = util.env.language;
  return objectToTranslate[currentLanguage];
}

const departureDate = moment(new Date()).add(6, 'months');
const returnDate = departureDate.clone().add(5, 'days');

exports.CityVeraDP = {
  firstName: 'Vera',
  lastName: 'Karlsson',
  description: 'Vera loves travelling with her family',

  departure: translate({
    dk: 'København', fi: 'Helsinki', no: 'Oslo, Gardermoen', se: 'Stockholm-Arlanda', globe: 'Stockholm Arlanda',
  }),
  destination: translate({
    dk: 'Las Palmas', fi: 'Las Palmas', no: 'Las Palmas', se: 'Las Palmas', globe: 'Las Palmas',
  }),
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
    numberOfChildren: 2,
    children: [{ firstName: 'Inez', lastName: 'Persson', age: 11 }, { firstName: 'Sander', lastName: 'Persson', age: 1 }],
  },
};
