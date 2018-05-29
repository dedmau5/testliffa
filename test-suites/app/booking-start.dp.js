const { PackageClaraDP } = require('../../tests/app/booking-start/personas/package.clara.dp');
const { CityVeraDP } = require('../../tests/app/booking-start/personas/city.vera.dp');
const { CruiseClara } = require('../../tests/app/booking-start/personas/cruise.vera');
const { FlightOnlyClara } = require('../../tests/app/booking-start/personas/flight-only.clara');
const { HotelOnlyVera } = require('../../tests/app/booking-start/personas/hotel-only.vera');

exports.tests = {
  './tests/app/booking-start/booking-start-package.js': { personas: [PackageClaraDP] },
  // './tests/app/booking-start/booking-start-city.js': { personas: [CityVeraDP] },
  // './tests/app/booking-start/booking-start-cruise.js': { personas: [CruiseClara] },
  // './tests/app/booking-start/booking-start-flight-only.js': { personas: [FlightOnlyClara] },
  // './tests/app/booking-start/booking-start-hotel-only.js': { personas: [HotelOnlyVera] },
};

