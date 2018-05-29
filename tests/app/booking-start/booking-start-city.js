import { StartPage } from '../../../pages/start-page';
import { BookingStart } from '../../../pages/apps/booking-start';
import { isEmptyObject } from '../../../tools/index';

const { personas } = browser.options.tc;
personas.forEach((persona) => {
  describe('Booking Start - City tests', () => {
    describe('Initialize city section', () => {
      it('Start page is open', () => {
        StartPage.open();
      });

      it('Waits until Booking Start is found', () => {
        BookingStart.waitUntilLoaded();
      });

      it('Can click on "City"', () => {
        BookingStart.city.click();
      });

      it('Can load data into Booking Start section', () => {
        BookingStart.waitUntilDataLoaded();
      });
    });

    describe('Choose Departure', () => {
      it(`Can open and choose ${persona.departure} as departure`, () => {
        BookingStart.city.departure.open();
        expect(BookingStart.city.departure.select(persona.departure)).to.equal(true, `Couldn't find ${persona.departure} and click on it!`);
      });
    });

    describe('Choose Destination', () => {
      it(`Can select ${persona.destination}`, () => {
        BookingStart.city.destination.open();

        expect(BookingStart.city.destination.select(persona.destination)).to.equal(true, 'Couldn\'t find destination and click on it!');
      });
    });

    describe('Can see the travel duration when applicable', () => {
      it(`Duration section is ${persona.duration.visible ? 'shown' : 'not shown'}`, () => {
        expect(BookingStart.package.duration.isExisting()).to.equal(persona.duration.visible, 'Couldn\'t find section "duration"!');
      });
    });


    describe('Choose duration', () => {
      // cant use arrow function since we need to use 'this.skip()'
      // eslint-disable-next-line func-names
      beforeEach('Check that duration section should be existing before each test', function () {
        if (!persona.duration.visible) {
          this.skip();
        }
      });

      it('Can see duration section', () => {
        expect(BookingStart.city.duration.isExisting()).to.equal(true, 'Couldn\'t find section "duration"!');
      });

      it('Can click on "Duration"', () => {
        BookingStart.city.duration.open();
      });

      // it('Can see header for charter travel', () => {
      //     expect(BookingStart.city.duration.header.charterIsExisting()).to.equal(true,
      //         `Couldn't find header for "charter travel"!`
      //     );
      // });

      it(`Can click on "${persona.duration.lenght}" in duration list`, () => {
        expect(BookingStart.city.duration.select(persona.duration.lenght)).to.equal(true, 'Couldn\'t click desired duration item!');
      });
    });

    describe('Choosing Date', () => {
      it('Can click on "Calender"', () => {
        BookingStart.city.datepicker.open();
      });

      it(`Can select departure date ${persona.date.departure.year}-${persona.date.departure.month}-${persona.date.departure.day}`, () => {
        const date = persona.date.departure;
        expect(BookingStart.package.datepicker.selectDate(date.year, date.month, date.day, date.allowChoosingNearByDate, date.numberOfNearbyMonthsToAllow)).to.equal(
          true,
          'Couldn\'t click desired departure date',
        );
      });

      // cant use arrow function since we need to use 'this.skip()'
      // eslint-disable-next-line func-names
      it(`Can select return date ${persona.date.return.year}-${persona.date.return.month}-${persona.date.return.day}`, function () {
        if (isEmptyObject(persona.date.return)) {
          this.skip();
        }

        const date = persona.date.return;
        expect(BookingStart.package.datepicker.selectDate(date.year, date.month, date.day, date.allowChoosingNearByDate, date.numberOfNearbyMonthsToAllow)).to.equal(
          true,
          'Couldn\'t click desired return date',
        );
      });
    });

    describe('Adding passanger to rooms', () => {
      it('Can click on "Pax"', () => {
        BookingStart.city.pax.open();
      });

      it(`Can add ${persona.travelCompany.numberOfAdults} adults to room 1`, () => {
        BookingStart.city.pax.adults = persona.travelCompany.numberOfAdults;
      });

      it(`Can add ${persona.travelCompany.children.length} child/children to room 1`, () => {
        BookingStart.city.pax.children = persona.travelCompany.children.length.toString();
      });

      // test that all children can be added
      persona.travelCompany.children.forEach((child, index) => {
        it(`Can set age ${persona.travelCompany.children[index].age} of child nummber ${index + 1}`, () => {
          const ageValue = persona.travelCompany.children[index].age.toString();
          BookingStart.city.pax.child(index + 1).age(ageValue);
        });
      });

      it('Can close "Pax"', () => {
        BookingStart.city.pax.confirm();
      });
    });

    describe('Can click on search', () => {
      it('Click on button', () => {
        BookingStart.search.click();
      });
    });
  });
});
