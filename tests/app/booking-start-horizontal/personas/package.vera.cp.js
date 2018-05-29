const util = require('gulp-util');
const moment = require('moment');

function translate(objectToTranslate) {
  const currentLanguage = util.env.language;
  return objectToTranslate[currentLanguage];
}

const departureDate = moment().add(6, 'months');

exports.PackageVeraCP = {
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
  destination: {
    country: translate({
      dk: 'Thailand',
      fi: 'Espanja',
      no: 'Spania',
      se: 'Spanien',
    }),
    area: translate({
      dk: 'Phuket',
      fi: 'Gran Canaria',
      no: 'Gran Canaria',
      se: 'Gran Canaria',
    }),
    resort: translate({
      dk: 'Alle rejsemål',
      fi: 'Las Palmas',
      no: 'Las Palmas',
      se: 'Las Palmas',
    }),
  },
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
    numberOfChildren: 2,
    children: [{ firstName: 'Inez', lastName: 'Persson', age: 11 }, { firstName: 'Sander', lastName: 'Persson', age: 1 }],
  },
};
