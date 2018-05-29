const util = require('gulp-util');
const moment = require('moment');

function translate(objectToTranslate) {
  const currentLanguage = util.env.language;
  return objectToTranslate[currentLanguage];
}

const departureDate = moment().add(1, 'months');

exports.CruiseClara = {
  firstName: 'Vera',
  lastName: 'Karlsson',
  description: 'Vera loves travelling with her family',

  departure: translate({
    dk: 'København',
    fi: 'Helsinki',
    no: 'Oslo, Gardermoen',
    se: 'Köpenhamn',
    globe: 'Köpenhamn',
  }),
  destination: translate({
    dk: 'Middelhavet',
    fi: 'Välimeri',
    no: 'Middelhavet',
    se: 'Medelhavet',
    globe: 'Medelhavet',
  }),
  departureDate: {
    year: departureDate.year(),
    month: departureDate.month() + 1,
    day: departureDate.date(),
    allowChoosingNearByDate: true,
    numberOfNearbyMonthsToAllow: 12,
  },
  travelCompany: {
    numberOfRooms: 1,
    numberOfAdults: 2,
    numberOfChildren: 2,
    children: [{ firstName: 'Inez', lastName: 'Persson', age: 2 }, { firstName: 'Sander', lastName: 'Persson', age: 5 }],
  },
};
