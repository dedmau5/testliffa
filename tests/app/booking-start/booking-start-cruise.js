import { StartPage } from '../../../pages/start-page';
import { BookingStart } from '../../../pages/apps/booking-start';

const { personas } = browser.options.tc;
personas.forEach((persona) => {
  describe('Booking Start - Cruise tests', () => {
    describe('Initialize "Cruise" section', () => {
      it('Start page is open', () => {
        StartPage.open();
      });

      it('Waits until Booking Start is found', () => {
        BookingStart.waitUntilLoaded();
      });

      it('Can click on "Cruise"', () => {
        BookingStart.cruise.click();
      });

      it('Can load data into Booking Start section', () => {
        BookingStart.waitUntilDataLoaded();
      });
    });

    describe('Choose Departure', () => {
      it(`Can open and choose ${persona.departure} as departure`, () => {
        BookingStart.cruise.departure.open();
        expect(BookingStart.cruise.departure.select(persona.departure)).to.equal(true, `Couldn't find ${persona.departure} and click on it!`);
      });
    });

    describe('Choose Destination', () => {
      it(`Can select ${persona.destination}`, () => {
        BookingStart.cruise.destination.open();
        expect(BookingStart.cruise.destination.select(persona.destination)).to.equal(true, `Couldn't find destination ${persona.destination} and click on it!`);
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
      });

      it(`Can add ${persona.travelCompany.numberOfAdults} adults`, () => {
        BookingStart.cruise.pax.adults = persona.travelCompany.numberOfAdults;
      });

      it(`Can add ${persona.travelCompany.children.length} child/children`, () => {
        BookingStart.cruise.pax.children = persona.travelCompany.children.length.toString();
      });

      // test that all children can be added
      persona.travelCompany.children.forEach((child, index) => {
        it(`Can set age ${persona.travelCompany.children[index].age} of child nummber ${index + 1}`, () => {
          const ageValue = persona.travelCompany.children[index].age.toString();
          BookingStart.cruise.pax.child(index + 1).age(ageValue);
        });
      });

      it('Can close "Pax"', () => {
        BookingStart.cruise.pax.confirm();
      });
    });

    describe('Can click on search', () => {
      it('Click on button', () => {
        BookingStart.search.click();
      });
    });
  });
});
