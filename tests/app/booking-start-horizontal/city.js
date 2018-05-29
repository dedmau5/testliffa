import Page from '../../../pages/page';
import BookingStart from '../../../pages/apps/booking-start-horizontal';
import urls from '../../../pages/apps/booking-start-horizontal/urls';
import { isEmptyObject, Translate } from '../../../tools';

const { personas } = browser.options.tc;
personas.forEach((persona) => {
  describe('Booking Start - City tests', () => {
    describe('Initialize city section', () => {
      it('Go to Bookingstart standalone', () => {
        const environmentUrl = Translate(urls[browser.options.tc.environment]);
        Page.goTo(environmentUrl);
      });

      it('Waits until Booking Start is found', () => {
        BookingStart.waitUntilFound();
      });

      it('Waits until Booking Start is loaded', () => {
        BookingStart.waitUntilLoaded();
      });

      it('Can click on "City"', () => {
        BookingStart.city.select();
      });

      it('Can load data into Booking Start section', () => {
        BookingStart.waitUntilLoaded();
      });
    });

    describe('Choose Departure', () => {
      it('Can click on Departure field', () => {
        BookingStart.city.departure.open();
        expect(BookingStart.city.departure.isOpen).to.equal(true, 'Departure overlay is not open');
      });

      it(`Can choose ${persona.departure} as departure`, () => {
        BookingStart.city.departure.select(persona.departure);
        expect(BookingStart.city.departure.value).to.equal(persona.departure, `The field-value did not contain ${persona.departure}`);
      });
    });

    describe('Choose Destination', () => {
      it(`Can select ${persona.destination}`, () => {
        BookingStart.city.destination.open();

        expect(BookingStart.city.destination.select(persona.destination)).to.equal(true, 'Couldn\'t find destination and click on it!');
      });

      it(`Can see ${persona.destination} in the form-field`, () => {
        expect(BookingStart.city.destination.value).to.equal(persona.destination, 'Wrong value is displayed in the form-field');
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

      it(`Can click on "${persona.duration.length.optional}" in duration list`, () => {
        const duration = persona.travelType.independent ? BookingStart.city.duration.independent : BookingStart.city.duration.charter;

        expect(duration.select(persona.duration.length.optional)).to.equal(true, "Couldn't click desired duration item!");
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
        expect(BookingStart.city.pax.isOpen).to.equal(true, 'Pax overlay is not open');
      });

      it(`Can add ${persona.travelCompany.numberOfAdults} adults to room 1`, () => {
        BookingStart.city.pax.setAdults(persona.travelCompany.numberOfAdults);
      });

      it(`Can add ${persona.travelCompany.numberOfChildren} child/children to room 1`, () => {
        BookingStart.city.pax.setChildren(persona.travelCompany.numberOfChildren);
      });

      persona.travelCompany.children.forEach((child, index) => {
        it(`Can set age ${persona.travelCompany.children[index].age} of child nummber ${index + 1}`, () => {
          const ageValue = persona.travelCompany.children[index].age.toString();
          BookingStart.city.pax
            .room(1)
            .child(index + 1)
            .age(ageValue);
        });
      });

      it('Can close "Pax"', () => {
        BookingStart.city.pax.confirm();
        expect(BookingStart.city.pax.isOpen).to.equal(false, 'Pax overlay is open');
      });

      it(`Can see ${persona.travelCompany.numberOfAdults} adults and ${persona.travelCompany.numberOfChildren} children in the form-field`, () => {
        const expectedFormValue =
          persona.travelCompany.numberOfChildren === 0
            ? `${persona.travelCompany.numberOfAdults} vuxna`
            : `${persona.travelCompany.numberOfAdults} vuxna, ${persona.travelCompany.numberOfChildren} barn`;

        expect(BookingStart.city.pax.value).to.equal(expectedFormValue, 'Wrong value is displayed in the form-field');
      });
    });

    describe('Can click on search', () => {
      it('Click on button', () => {
        BookingStart.search();
      });
    });
  });
});
