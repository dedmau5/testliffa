const { PackageClaraDP } = require('../../tests/app/booking-start-horizontal/personas/package.clara.dp');
const { CityVeraDP } = require('../../tests/app/booking-start-horizontal/personas/city.vera.dp');
const { CruiseClara } = require('../../tests/app/booking-start-horizontal/personas/cruise.vera');
const { FlightOnlyClara } = require('../../tests/app/booking-start-horizontal/personas/flight-only.clara');
const { HotelOnlyVera } = require('../../tests/app/booking-start-horizontal/personas/hotel-only.vera');

exports.tests = {
  './tests/app/booking-start-horizontal/package.js': { personas: [PackageClaraDP] },
  './tests/app/booking-start-horizontal/city.js': { personas: [CityVeraDP] },
  './tests/app/booking-start-horizontal/cruise.js': { personas: [CruiseClara] },
  './tests/app/booking-start-horizontal/flight-only.js': { personas: [FlightOnlyClara] },
  './tests/app/booking-start-horizontal/hotel-only.js': { personas: [HotelOnlyVera] },
};
