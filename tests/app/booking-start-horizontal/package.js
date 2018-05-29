import Page from '../../../pages/page';
import BookingStart from '../../../pages/apps/booking-start-horizontal';
import urls from '../../../pages/apps/booking-start-horizontal/urls';
import { isEmptyObject, Translate } from '../../../tools';

const { personas } = browser.options.tc;
personas.forEach((persona) => {
  describe('Booking Start - Package tests', () => {
    describe('Initialize "Flight & Hotel" section', () => {
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
        BookingStart.package.select();
      });

      it('Can load data into Booking Start section', () => {
        BookingStart.waitUntilLoaded();
      });
    });

    describe('Choose Departure', () => {
      it('Can click on Departure field', () => {
        BookingStart.package.departure.open();
        expect(BookingStart.package.departure.isOpen).to.equal(true, 'Departure overlay is not open');
      });

      it('Can close Departure overlay', () => {
        BookingStart.package.departure.close();
        expect(BookingStart.package.departure.isOpen).to.equal(false, 'Departure overlay is open');
      });

      it(`Can reopen and choose ${persona.departure} as departure`, () => {
        BookingStart.package.departure.open();
        BookingStart.package.departure.select(persona.departure);
        expect(BookingStart.package.departure.value).to.equal(persona.departure, `The field-value did not contain ${persona.departure}`);
      });
    });

    describe('Choose Destination', () => {
      const state = {
        country: {},
        area: {},
        resort: {},
      };

      it('Can click on Destiantion field', () => {
        BookingStart.package.destination.open();
        expect(BookingStart.package.destination.isOpen).to.equal(true, 'Destination overlay is not open');
      });

      it('Can close Destiantion overlay', () => {
        BookingStart.package.destination.close();
        expect(BookingStart.package.destination.isOpen).to.equal(false, 'Destination overlay is open');
      });

      it('Can click on Destiantion field', () => {
        BookingStart.package.destination.open();
        expect(BookingStart.package.destination.isOpen).to.equal(true, 'Destination overlay is not open');
      });

      it(`Can select ${persona.destination.country}`, () => {
        state.country = BookingStart.package.destination.selectCountry(persona.destination.country);
        expect(state.country.isExpanded).to.equal(true, "Couldn't find country and click on it!");
      });

      it(`Can select ${persona.destination.area}`, () => {
        state.area = state.country.selectArea(persona.destination.area);
        expect(state.area.isExpanded).to.equal(true, "Couldn't find area and click on it!");
      });

      it(`Can select ${persona.destination.resort}`, () => {
        const resort = state.area.selectResort(persona.destination.resort);
        expect(BookingStart.package.destination.value).to.equal(`${resort.name}, ${state.country.name}`, "Couldn't find resort and click on it!");
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
        expect(BookingStart.package.duration.isOpen).to.equal(true, 'duration overlay is not open');
      });

      it(`Can click on "${persona.duration.length.optional}" in duration list`, () => {
        const duration = persona.travelType.independent ? BookingStart.package.duration.independent : BookingStart.package.duration.charter;

        expect(duration.select(persona.duration.length.optional)).to.equal(true, "Couldn't click desired duration item!");
      });

      it(`Can see ${persona.duration.length.optional} in the form-field`, () => {
        expect(BookingStart.package.duration.value).to.equal(persona.duration.length.optional, 'Wrong value is displayed in the form-field');
      });
    });

    describe('Choosing Date', () => {
      it('Can click on "Calender"', () => {
        BookingStart.package.datepicker.open();
        expect(BookingStart.package.datepicker.isOpen).to.equal(true, 'Datepicker overlay is not open');
      });

      it(`Can select departure date ${persona.date.departure.year}-${persona.date.departure.month}-${persona.date.departure.day}`, () => {
        const date = persona.date.departure;
        expect(BookingStart.package.datepicker.selectDate(date.year, date.month, date.day)).to.equal(true, "Couldn't click desired departure date");
      });

      it(`Can select return date ${persona.date.return.year}-${persona.date.return.month}-${persona.date.return.day}`, function () {
        if (isEmptyObject(persona.date.return)) {
          this.skip();
        }

        const date = persona.date.return;
        expect(BookingStart.package.datepicker.selectDate(date.year, date.month, date.day)).to.equal(true, "Couldn't click desired return date");
      });
    });

    describe('Adding passanger to rooms', () => {
      it('Can click on "Pax"', () => {
        BookingStart.package.pax.open();
        expect(BookingStart.package.pax.isOpen).to.equal(true, 'Pax overlay is not open');
      });

      it(`Can add ${persona.travelCompany.numberOfAdults} adults to room 1`, () => {
        BookingStart.package.pax.setAdults(persona.travelCompany.numberOfAdults);
      });

      it(`Can add ${persona.travelCompany.numberOfChildren} child/children to room 1`, () => {
        BookingStart.package.pax.setChildren(persona.travelCompany.numberOfChildren);
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
        expect(BookingStart.package.pax.isOpen).to.equal(false, 'Pax overlay is open');
      });

      it(`Can see ${persona.travelCompany.numberOfAdults} adults and ${persona.travelCompany.numberOfChildren} children in the form-field`, () => {
        const expectedFormValue =
          persona.travelCompany.numberOfChildren === 0
            ? `${persona.travelCompany.numberOfAdults} vuxna`
            : `${persona.travelCompany.numberOfAdults} vuxna, ${persona.travelCompany.numberOfChildren} barn`;

        expect(BookingStart.package.pax.value).to.equal(expectedFormValue, 'Wrong value is displayed in the form-field');
      });
    });

    describe('Can click on search', () => {
      it('Click on button', () => {
        BookingStart.search();
      });
    });
  });
});
