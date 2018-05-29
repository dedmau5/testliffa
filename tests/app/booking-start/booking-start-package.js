import { StartPage } from '../../../pages/start-page';
import { BookingStart } from '../../../pages/apps/booking-start';
import { Countries } from '../../../localization';
import { isEmptyObject } from '../../../tools/index';

const { personas } = browser.options.tc;
personas.forEach((persona) => {
  describe('Booking Start - Package tests', () => {
    describe('Initialize "Flight & Hotel" section', () => {
      // this.slow(10);

      it('Start page is open', () => {
        StartPage.open();
      });

      it('Waits until Booking Start is found', () => {
        BookingStart.waitUntilLoaded();
      });

      it('Can click on "Flight & Hotel"', () => {
        BookingStart.package.click();
      });

      it('Can load data into Booking Start section', () => {
        BookingStart.waitUntilDataLoaded();
      });
    });

    describe('Choose Departure', () => {
      it('Can click on Departure field', () => {
        BookingStart.package.departure.open();
      });

      it('Can close Departure overlay', () => {
        BookingStart.package.departure.close();
      });

      it(`Can reopen and choose ${persona.departure} as departure`, () => {
        BookingStart.package.departure.open();
        expect(BookingStart.package.departure.select(persona.departure)).to.equal(true, `Couldn't find ${persona.departure} and click on it!`);
      });
    });

    describe('Choose Destination', () => {
      it('Can click on Destiantion field', () => {
        BookingStart.package.destination.open();
      });

      it('Can close Destiantion overlay', () => {
        BookingStart.package.destination.close();
      });

      it('Can click on Destiantion field', () => {
        BookingStart.package.destination.open();
      });

      it(`Can select ${persona.destination.country}`, () => {
        expect(BookingStart.package.destination.country.toggle(persona.destination.country)).to.equal(true, 'Couldn\'t find country and click on it!');
      });

      it(`Can select ${persona.destination.area}`, () => {
        expect(BookingStart.package.destination.area.toggle(persona.destination.area)).to.equal(true, 'Couldn\'t find area and click on it!');
      });

      it(`Can select ${persona.destination.resort}`, () => {
        expect(BookingStart.package.destination.resort.select(persona.destination.resort)).to.equal(true, 'Couldn\'t find resort and click on it!');
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
        expect(BookingStart.package.duration.isExisting()).to.equal(true, 'Couldn\'t find section "duration"!');
      });

      it('Can click on "Duration"', () => {
        BookingStart.package.duration.open();
      });

      // it('Can see header for dynamic travel', () => {
      //     expect(BookingStart.package.duration.header.dynamicIsExisting()).to.equal(true,
      //         `Couldn't find header for "dynamic travel"!`
      //     );
      // });

      it(`Can click on "${persona.duration.lenght}" in duration list`, () => {
        expect(BookingStart.package.duration.select(persona.duration.lenght)).to.equal(true, 'Couldn\'t click desired duration item!');
      });
    });

    describe('Choosing Date', () => {
      it('Can click on "Calender"', () => {
        BookingStart.package.datepicker.open();
      });

      it(`Can select departure date ${persona.date.departure.year}-${persona.date.departure.month}-${persona.date.departure.day}`, () => {
        const date = persona.date.departure;
        expect(BookingStart.package.datepicker.selectDate(date.year, date.month, date.day, date.allowChoosingNearByDate, date.numberOfNearbyMonthsToAllow)).to.equal(
          true,
          'Couldn\'t click desired departure date',
        );
      });

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
        BookingStart.package.pax.open();
      });

      it(`Can add ${persona.travelCompany.numberOfAdults} adults to room 1`, () => {
        BookingStart.package.pax.adults = persona.travelCompany.numberOfAdults;
      });

      it(`Can add ${persona.travelCompany.numberOfChildren} child/children to room 1`, () => {
        BookingStart.package.pax.children = persona.travelCompany.numberOfChildren;
      });

      persona.travelCompany.children.forEach((child, index) => {
        it(`Can set age ${persona.travelCompany.children[index].age} of child nummber ${index + 1}`, () => {
          const ageValue = persona.travelCompany.children[index].age.toString();
          BookingStart.package.pax
            .room(1)
            .child(index + 1)
            .age(ageValue);
        });
      });

      it('Can close "Pax"', () => {
        BookingStart.package.pax.confirm();
      });
    });

    describe('Can click on search', () => {
      it('Click on button', () => {
        BookingStart.search.click();
      });
    });
  });
});
