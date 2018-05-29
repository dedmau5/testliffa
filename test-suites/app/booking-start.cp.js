const { PackageVeraCP } = require('../../tests/app/booking-start/personas/package.vera.cp');
const { CityClaraCP } = require('../../tests/app/booking-start/personas/city.clara.cp');
const { FlightOnlyClara } = require('../../tests/app/booking-start/personas/flight-only.clara');
const { HotelOnlyVera } = require('../../tests/app/booking-start/personas/hotel-only.vera');

exports.tests = {
  './tests/app/booking-start/booking-start-hotel-only.js': { personas: [HotelOnlyVera] },
  './tests/app/booking-start/booking-start-flight-only.js': { personas: [FlightOnlyClara] },
  './tests/app/booking-start/booking-start-city.js': { personas: [CityClaraCP] },
  './tests/app/booking-start/booking-start-package.js': { personas: [PackageVeraCP] },
};
