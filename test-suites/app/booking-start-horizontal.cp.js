const { PackageVeraCP } = require('../../tests/app/booking-start-horizontal/personas/package.vera.cp');
const { CityClaraCP } = require('../../tests/app/booking-start-horizontal/personas/city.clara.cp');

exports.tests = {
  './tests/app/booking-start-horizontal/city.js': { personas: [CityClaraCP] },
  './tests/app/booking-start-horizontal/package.js': { personas: [PackageVeraCP] },
};
