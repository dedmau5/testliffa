import Page from '../../../pages/page';
import BookingStart from '../../../pages/apps/booking-start-horizontal';
import urls from '../../../pages/apps/booking-start-horizontal/urls';
import { Translate } from '../../../tools';

const { personas } = browser.options.tc;
personas.forEach((persona) => {
  describe('Booking Start - Cruise tests', () => {
    describe('Initialize "Cruise" section', () => {
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
        BookingStart.cruise.select();
      });

      it('Can load data into Booking Start section', () => {
        BookingStart.waitUntilLoaded();
      });
    });

    describe('Choose Departure', () => {
      it('Can click on Departure field', () => {
        BookingStart.cruise.departure.open();
        expect(BookingStart.cruise.departure.isOpen).to.equal(true, 'Departure overlay is not open');
      });

      it(`Can choose ${persona.departure} as departure`, () => {
        BookingStart.cruise.departure.select(persona.departure);
        expect(BookingStart.cruise.departure.value).to.equal(persona.departure, `The field-value did not contain ${persona.departure}`);
      });
    });

    describe('Choose Destination', () => {
      it(`Can select ${persona.destination}`, () => {
        BookingStart.cruise.destination.open();
        expect(BookingStart.cruise.destination.select(persona.destination)).to.equal(true, `Couldn't find destination ${persona.destination} and click on it!`);
      });

      it(`Can see ${persona.destination} in the form-field`, () => {
        expect(BookingStart.cruise.destination.value).to.equal(persona.destination, 'Wrong value is displayed in the form-field');
      });
    });

    describe('Choosing Date', () => {
      it('Can click on "Calender"', () => {
        BookingStart.cruise.datepicker.open();
      });

      it(`Can select departure date ${persona.departureDate.year}-${persona.departureDate.month}-${persona.departureDate.day}`, () => {
        const date = persona.departureDate;
        expect(BookingStart.package.datepicker.selectDate(date.year, date.month, date.day, date.allowChoosingNearByDate, date.numberOfNearbyMonthsToAllow)).to.equal(
          true,
          "Couldn't click desired date",
        );
      });
    });

    describe('Adding passanger to rooms', () => {
      it('Can click on "Pax"', () => {
        BookingStart.cruise.pax.open();
        expect(BookingStart.cruise.pax.isOpen).to.equal(true, 'Pax overlay is not open');
      });

      it(`Can add ${persona.travelCompany.numberOfAdults} adults to room 1`, () => {
        BookingStart.cruise.pax.setAdults(persona.travelCompany.numberOfAdults);
      });

      it(`Can add ${persona.travelCompany.numberOfChildren} child/children to room 1`, () => {
        BookingStart.cruise.pax.setChildren(persona.travelCompany.numberOfChildren);
      });

      persona.travelCompany.children.forEach((child, index) => {
        it(`Can set age ${persona.travelCompany.children[index].age} of child nummber ${index + 1}`, () => {
          const ageValue = persona.travelCompany.children[index].age.toString();
          BookingStart.cruise.pax
            .room(1)
            .child(index + 1)
            .age(ageValue);
        });
      });

      it('Can close "Pax"', () => {
        BookingStart.city.pax.confirm();
        expect(BookingStart.cruise.pax.isOpen).to.equal(false, 'Pax overlay is open');
      });

      it(`Can see ${persona.travelCompany.numberOfAdults} adults and ${persona.travelCompany.numberOfChildren} children in the form-field`, () => {
        const expectedFormValue =
          persona.travelCompany.numberOfChildren === 0
            ? `${persona.travelCompany.numberOfAdults} vuxna`
            : `${persona.travelCompany.numberOfAdults} vuxna, ${persona.travelCompany.numberOfChildren} barn`;

        expect(BookingStart.cruise.pax.value).to.equal(expectedFormValue, 'Wrong value is displayed in the form-field');
      });
    });

    describe('Can click on search', () => {
      it('Click on button', () => {
        BookingStart.search();
      });
    });
  });
});
