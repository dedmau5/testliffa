import { StartPage } from '../../../pages/start-page';
import { BookingStart } from '../../../pages/apps/booking-start';

const { personas } = browser.options.tc;
personas.forEach((persona) => {
  describe('Booking Start - Flight Only tests', () => {
    describe('Initialize Flight only section', () => {
      it('Start page is open', () => {
        StartPage.open();
      });

      it('Waits until Booking Start is found', () => {
        BookingStart.waitUntilLoaded();
      });

      it('Can click on "flight only"', () => {
        BookingStart.flightOnly.click();
      });

      it('Can load data into Booking Start section', () => {
        BookingStart.waitUntilDataLoaded();
      });
    });

    describe('Choose Departure', () => {
      it(`Can open and choose ${persona.departure} as departure`, () => {
        BookingStart.flightOnly.departure.open();
        expect(BookingStart.flightOnly.departure.select(persona.departure)).to.equal(true, `Couldn't find ${persona.departure} and click on it!`);
      });
    });

    describe('Choose Destination', () => {
      it('Can click on Departure field', () => {
        BookingStart.flightOnly.destination.open();
      });

      it(`Can select ${persona.destination.country} as destination country`, () => {
        BookingStart.flightOnly.destination.country.toggle(persona.destination.country);
      });

      it(`Can select airport ${persona.destination.airport}`, () => {
        expect(BookingStart.flightOnly.destination.airport.select(persona.destination.airport)).to.equal(true, `Couldn't find ${persona.destination.airport} and click on it!`);
      });
    });

    describe('Can see the travel duration when applicable', () => {
      it(`Duration section is ${persona.duration.visible ? 'shown' : 'not shown'}`, () => {
        expect(BookingStart.package.duration.isExisting()).to.equal(persona.duration.visible, 'Couldn\'t find section "duration"!');
      });
    });

    describe('Choose duration', () => {
      beforeEach('Check that duration section should be existing before each test', function () {
        if (!persona.duration.visible) {
          this.skip();
        }
      });

      it('Can see duration section', () => {
        expect(BookingStart.flightOnly.duration.isExisting()).to.equal(true, 'Couldn\'t find section "duration"!');
      });

      it('Can click on "Duration"', () => {
        BookingStart.flightOnly.duration.open();
      });

      it('Can see header for charter travel', function () {
        if (!persona.duration.header.charter) {
          this.skip();
        }

        expect(BookingStart.flightOnly.duration.header.charterIsExisting()).to.equal(true, 'Couldn\'t find header for "charter travel"!');
      });

      it(`Can click on "${persona.duration.lenght}" in duration list`, () => {
        expect(BookingStart.flightOnly.duration.select(persona.duration.lenght)).to.equal(true, 'Couldn\'t click desired duration item!');
      });
    });

    describe('Choosing Date', () => {
      it('Can click on "Calender"', () => {
        BookingStart.flightOnly.datepicker.open();
      });

      it(`Can select departure date ${persona.date.departure.year}-${persona.date.departure.month}-${persona.date.departure.day}`, () => {
        const date = persona.date.departure;
        expect(BookingStart.flightOnly.datepicker.selectDate(date.year, date.month, date.day, date.allowChoosingNearByDate, date.numberOfNearbyMonthsToAllow)).to.equal(
          true,
          'Couldn\'t click desired date',
        );
      });

      it(`Can select return date ${persona.date.return.year}-${persona.date.return.month}-${persona.date.return.day}`, () => {
        const date = persona.date.return;
        expect(BookingStart.package.datepicker.selectDate(date.year, date.month, date.day, date.allowChoosingNearByDate, date.numberOfNearbyMonthsToAllow)).to.equal(
          true,
          'Couldn\'t click desired date',
        );
      });
    });

    describe('Adding passenger to rooms', () => {
      it('Can click on "Pax"', () => {
        BookingStart.flightOnly.pax.open();
      });

      it(`Can add ${persona.travelCompany.numberOfAdults} adults`, () => {
        BookingStart.flightOnly.pax.adults = persona.travelCompany.numberOfAdults;
      });

      it(`Can add ${persona.travelCompany.numberOfChildren} child/children`, () => {
        BookingStart.flightOnly.pax.children = persona.travelCompany.numberOfChildren.toString();
      });

      persona.travelCompany.children.forEach((child, index) => {
        it(`Can set age ${persona.travelCompany.children[index].age} of child nummber ${index + 1}`, () => {
          const ageValue = persona.travelCompany.children[index].age.toString();
          BookingStart.flightOnly.pax.child(index + 1).age(ageValue);
        });
      });

      it('Can close "Pax"', () => {
        BookingStart.flightOnly.pax.confirm();
      });
    });

    describe('Can click on search', () => {
      it('Click on button', () => {
        BookingStart.search.click();
      });
    });
  });
});
