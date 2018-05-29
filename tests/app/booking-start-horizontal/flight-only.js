import Page from '../../../pages/page';
import BookingStart from '../../../pages/apps/booking-start-horizontal';
import urls from '../../../pages/apps/booking-start-horizontal/urls';
import { Translate } from '../../../tools';

const { personas } = browser.options.tc;
personas.forEach((persona) => {
  describe('Booking Start - Flight Only tests', () => {
    describe('Initialize Flight only section', () => {
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

      it('Can click on "Flight & Hotel"', () => {
        BookingStart.flightOnly.select();
      });

      it('Can load data into Booking Start section', () => {
        BookingStart.waitUntilLoaded();
      });
    });

    describe('Choose Departure', () => {
      it('Can open departure', () => {
        BookingStart.flightOnly.departure.open();
        expect(BookingStart.package.departure.isOpen).to.equal(true, 'Departure overlay is not open');
      });

      it(`Can choose ${persona.departure} as departure`, () => {
        BookingStart.flightOnly.departure.select(persona.departure);
        expect(BookingStart.flightOnly.departure.value).to.equal(persona.departure, `The field-value did not contain ${persona.departure}`);
      });
    });

    describe('Choose Destination', () => {
      const state = {
        country: {},
        resort: {},
      };

      it('Can click on Destiantion field', () => {
        BookingStart.package.destination.open();
        expect(BookingStart.flightOnly.destination.isOpen).to.equal(true, 'Destination overlay is not open');
      });

      it(`Can select ${persona.destination.country}`, () => {
        state.country = BookingStart.flightOnly.destination.selectCountry(persona.destination.country);
        expect(state.country.isExpanded).to.equal(true, "Couldn't find country and click on it!");
      });

      it(`Can select ${persona.destination.airport}`, () => {
        const resort = state.country.selectResort(persona.destination.airport);
        expect(BookingStart.flightOnly.destination.value).to.equal(`${resort.name}, ${state.country.name}`, "Couldn't find resort and click on it!");
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
        expect(BookingStart.flightOnly.duration.isOpen).to.equal(true, 'Destination overlay is not open');
      });

      it('Can see charter travel durations', function () {
        if (!persona.duration.hasCharterDurations) {
          this.skip();
        }

        expect(BookingStart.flightOnly.duration.hasCharterDurations).to.equal(true, 'Couldn\'t find header for "charter travel"!');
      });

      it(`Can click on "${persona.duration.length}" in duration list`, () => {
        expect(BookingStart.flightOnly.duration.independent.select(persona.duration.length)).to.equal(true, 'Couldn\'t click desired duration item!');
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
        expect(BookingStart.flightOnly.pax.isOpen).to.equal(true, 'Pax overlay is not open');
      });

      it(`Can add ${persona.travelCompany.numberOfAdults} adults to room 1`, () => {
        BookingStart.flightOnly.pax.setAdults(persona.travelCompany.numberOfAdults);
      });

      it(`Can add ${persona.travelCompany.numberOfChildren} child/children to room 1`, () => {
        BookingStart.flightOnly.pax.setChildren(persona.travelCompany.numberOfChildren);
      });

      persona.travelCompany.children.forEach((child, index) => {
        it(`Can set age ${persona.travelCompany.children[index].age} of child nummber ${index + 1}`, () => {
          const ageValue = persona.travelCompany.children[index].age.toString();
          BookingStart.flightOnly.pax
            .room(1)
            .child(index + 1)
            .age(ageValue);
        });
      });

      it('Can close "Pax"', () => {
        BookingStart.flightOnly.pax.confirm();
        expect(BookingStart.flightOnly.pax.isOpen).to.equal(false, 'Pax overlay is open');
      });

      it(`Can see ${persona.travelCompany.numberOfAdults} adults and ${persona.travelCompany.numberOfChildren} children in the form-field`, () => {
        const expectedFormValue =
          persona.travelCompany.numberOfChildren === 0
            ? `${persona.travelCompany.numberOfAdults} vuxna`
            : `${persona.travelCompany.numberOfAdults} vuxna, ${persona.travelCompany.numberOfChildren} barn`;

        expect(BookingStart.flightOnly.pax.value).to.equal(expectedFormValue, 'Wrong value is displayed in the form-field');
      });
    });

    describe('Can click on search', () => {
      it('Click on button', () => {
        BookingStart.search();
      });
    });
  });
});
