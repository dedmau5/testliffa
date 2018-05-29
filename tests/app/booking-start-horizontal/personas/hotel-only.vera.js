const util = require('gulp-util');
const moment = require('moment');

function translate(objectToTranslate) {
  const currentLanguage = util.env.language;
  return objectToTranslate[currentLanguage];
}

const checkInDate = moment().add(1, 'months');
const checkOutDate = checkInDate.clone().add(3, 'days');

exports.HotelOnlyVera = {
  firstName: 'Vera',
  lastName: 'Karlsson',
  description: 'Vera loves travelling with her family',

  departure: {
    /* not applicable */
  },
  destination: {
    country: translate({
      dk: 'Spanien', fi: 'Espanja', no: 'Spania', se: 'Spanien', globe: 'Spanien',
    }),
    area: translate({
      dk: 'Mallorca', fi: 'Gran Canaria', no: 'Mallorca', se: 'Gran Canaria', globe: 'Gran Canaria',
    }),
    resort: translate({
      dk: 'Alcudia', fi: 'Las Palmas', no: 'Alcudia', se: 'Las Palmas', globe: 'Las Palmas',
    }),
  },
  duration: {
    /* not applicable */
  },
  date: {
    checkIn: {
      year: checkInDate.year(), month: checkInDate.month() + 1, day: checkInDate.date(), allowChoosingNearByDate: true, numberOfNearbyMonthsToAllow: 4,
    },
    checkOut: {
      year: checkOutDate.year(), month: checkOutDate.month() + 1, day: checkOutDate.date(), allowChoosingNearByDate: true, numberOfNearbyMonthsToAllow: 4,
    },
  },
  travelCompany: {
    numberOfRooms: 1,
    numberOfAdults: 2,
    numberOfChildren: 2,
    children: [{ firstName: 'Inez', lastName: 'Persson', age: 1 }, { firstName: 'Sander', lastName: 'Persson', age: 11 }],
  },
};
