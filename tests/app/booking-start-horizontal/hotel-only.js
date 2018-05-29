import Page from '../../../pages/page';
import BookingStart from '../../../pages/apps/booking-start-horizontal';
import urls from '../../../pages/apps/booking-start-horizontal/urls';
import { Translate } from '../../../tools';

const { personas } = browser.options.tc;
personas.forEach((persona) => {
  describe('Booking Start - Hotel Only tests', () => {
    describe('Initialize Hotel only section', () => {
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
        BookingStart.hotelOnly.select();
      });

      it('Can load data into Booking Start section', () => {
        BookingStart.waitUntilLoaded();
      });
    });

    describe('Choose Destination', () => {
      const state = {
        country: {},
        area: {},
        resort: {},
      };

      it('Can click on Destiantion field', () => {
        BookingStart.hotelOnly.destination.open();
        expect(BookingStart.hotelOnly.destination.isOpen).to.equal(true, 'Destination overlay is not open');
      });

      it(`Can select ${persona.destination.country}`, () => {
        state.country = BookingStart.hotelOnly.destination.selectCountry(persona.destination.country);
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


    describe('Choosing Date', () => {
      it('Can click on "Calender"', () => {
        BookingStart.hotelOnly.datepicker.open();
        expect(BookingStart.package.datepicker.isOpen).to.equal(true, 'Datepicker overlay is not open');
      });

      it(`Can select departure date ${persona.date.checkIn.year}-${persona.date.checkIn.month}-${persona.date.checkIn.day}`, () => {
        const date = persona.date.checkIn;
        expect(BookingStart.hotelOnly.datepicker.selectDate(date.year, date.month, date.day)).to.equal(true, "Couldn't click desired departure date");
      });

      it(`Can select return date ${persona.date.checkOut.year}-${persona.date.checkOut.month}-${persona.date.checkOut.day}`, function () {
        const date = persona.date.checkOut;
        expect(BookingStart.hotelOnly.datepicker.selectDate(date.year, date.month, date.day)).to.equal(true, "Couldn't click desired return date");
      });
    });

    describe('Adding passanger to rooms', () => {
      it('Can click on "Pax"', () => {
        BookingStart.hotelOnly.pax.open();
        expect(BookingStart.hotelOnly.pax.isOpen).to.equal(true, 'Pax overlay is not open');
      });

      it(`Can add ${persona.travelCompany.numberOfAdults} adults to room 1`, () => {
        BookingStart.hotelOnly.pax.setAdults(persona.travelCompany.numberOfAdults);
      });

      it(`Can add ${persona.travelCompany.numberOfChildren} child/children to room 1`, () => {
        BookingStart.hotelOnly.pax.setChildren(persona.travelCompany.numberOfChildren);
      });

      persona.travelCompany.children.forEach((child, index) => {
        it(`Can set age ${persona.travelCompany.children[index].age} of child nummber ${index + 1}`, () => {
          const ageValue = persona.travelCompany.children[index].age.toString();
          BookingStart.hotelOnly.pax
            .room(1)
            .child(index + 1)
            .age(ageValue);
        });
      });

      it('Can close "Pax"', () => {
        BookingStart.hotelOnly.pax.confirm();
        expect(BookingStart.hotelOnly.pax.isOpen).to.equal(false, 'Pax overlay is open');
      });

      it(`Can see ${persona.travelCompany.numberOfAdults} adults and ${persona.travelCompany.numberOfChildren} children in the form-field`, () => {
        const expectedFormValue =
          persona.travelCompany.numberOfChildren === 0
            ? `${persona.travelCompany.numberOfAdults} vuxna`
            : `${persona.travelCompany.numberOfAdults} vuxna, ${persona.travelCompany.numberOfChildren} barn`;

        expect(BookingStart.hotelOnly.pax.value).to.equal(expectedFormValue, 'Wrong value is displayed in the form-field');
      });
    });

    describe('Can click on search', () => {
      it('Click on button', () => {
        BookingStart.search();
      });
    });
  });
});
