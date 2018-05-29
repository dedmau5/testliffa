const util = require('gulp-util');
const moment = require('moment');

function translate(objectToTranslate) {
  const currentLanguage = util.env.language;
  return objectToTranslate[currentLanguage];
}

const departureDate = moment(new Date()).add(6, 'months');

exports.CityClaraCP = {
  firstName: 'Vera',
  lastName: 'Karlsson',
  description: 'Vera loves travelling with her family',
  travelType: {
    independent: false,
    charter: true,
  },
  departure: translate({
    dk: 'København',
    fi: 'Helsinki',
    no: 'Oslo, Gardermoen',
    se: 'Stockholm-Arlanda',
  }),
  destination: translate({
    dk: 'Las Palmas',
    fi: 'Las Palmas',
    no: 'Las Palmas',
    se: 'Las Palmas',
  }),
  duration: {
    visible: true,
    length: {
      optional: translate({
        dk: '1 uge',
        fi: '2 viikkoa',
        no: '1 uke',
        se: '1 vecka',
      }),
    },
  },
  date: {
    departure: {
      year: departureDate.year(),
      month: departureDate.month() + 1,
      day: departureDate.date(),
      allowChoosingNearByDate: true,
      numberOfNearbyMonthsToAllow: 4,
    },
    return: {},
  },
  travelCompany: {
    numberOfRooms: 1,
    numberOfAdults: 2,
    numberOfChildren: 0,
    children: [],
  },
};
