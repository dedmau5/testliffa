import { StartPage } from '../../../pages/start-page';
import { BookingStart } from '../../../pages/apps/booking-start';

const { personas } = browser.options.tc;
personas.forEach((persona) => {
  describe('Booking Start - Hotel Only tests', () => {
    describe('Initialize Hotel only section', () => {
      it('Start page is open', () => {
        StartPage.open();
      });

      it('Waits until Booking Start is found', () => {
        BookingStart.waitUntilLoaded();
      });

      it('Can click on "Hotel only"', () => {
        BookingStart.hotelOnly.click();
      });

      it('Can load data into Booking Start section', () => {
        BookingStart.waitUntilDataLoaded();
      });
    });

    describe('Choose Destination', () => {
      it('Can click on Destination field', () => {
        BookingStart.hotelOnly.destination.open();
      });

      it(`Can select ${persona.destination.country} as destination country`, () => {
        BookingStart.hotelOnly.destination.country.toggle(persona.destination.country);
      });

      it(`Can select area ${persona.destination.area}`, () => {
        expect(BookingStart.hotelOnly.destination.area.toggle(persona.destination.area)).to.equal(true, 'Couldn\'t find area and click on it!');
      });

      it(`Can select resort ${persona.destination.resort}`, () => {
        expect(BookingStart.hotelOnly.destination.resort.select(persona.destination.resort)).to.equal(true, 'Couldn\'t find resort and click on it!');
      });
    });

    describe('Choosing Date', () => {
      it('Can click on "Calender"', () => {
        BookingStart.hotelOnly.datepicker.open();
      });

      it(`Can select check in date ${persona.date.checkIn.year}-${persona.date.checkIn.month}-${persona.date.checkIn.day}`, () => {
        const date = persona.date.checkIn;
        expect(BookingStart.package.datepicker.selectDate(date.year, date.month, date.day, date.allowChoosingNearByDate)).to.equal(true, 'Couldn\'t click desired date');
      });

      it(`Can select check out date ${persona.date.checkOut.year}-${persona.date.checkOut.month}-${persona.date.checkOut.day}`, () => {
        const date = persona.date.checkOut;
        expect(BookingStart.package.datepicker.selectDate(date.year, date.month, date.day, date.allowChoosingNearByDate)).to.equal(true, 'Couldn\'t click desired date');
      });
    });

    describe('Adding passanger to rooms', () => {
      it('Can click on "Pax"', () => {
        BookingStart.hotelOnly.pax.open();
      });

      it(`Can add ${persona.travelCompany.numberOfAdults} adults to room 1`, () => {
        BookingStart.hotelOnly.pax.adults = persona.travelCompany.numberOfAdults;
      });

      it(`Can add ${persona.travelCompany.numberOfChildren} child/children to room 1`, () => {
        BookingStart.hotelOnly.pax.children = persona.travelCompany.numberOfChildren.toString();
      });

      // test that all children can be added
      persona.travelCompany.children.forEach((child, index) => {
        it(`Can set age ${persona.travelCompany.children[index].age} of child nummber ${index + 1}`, () => {
          const ageValue = persona.travelCompany.children[index].age.toString();
          BookingStart.hotelOnly.pax.child(index + 1).age(ageValue);
        });
      });

      it('Can close "Pax"', () => {
        BookingStart.hotelOnly.pax.confirm();
      });
    });

    describe('Can click on search', () => {
      it('Click on button', () => {
        BookingStart.search.click();
      });
    });
  });
});
