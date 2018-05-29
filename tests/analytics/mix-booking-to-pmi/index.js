import moment from 'moment';
import BookingCreator from '@tcne/web-booking-creator';

const getSearchEvent = function (event) {
  return browser.execute(() => window.dataLayer).value.find(d => d.event === event); // eslint-disable-line no-undef
};

const compareKeys = (objectToCheck, correctObject) => {
  if (typeof objectToCheck !== 'object' || typeof correctObject !== 'object') {
    return false;
  }

  for (let i = 0; i < Object.keys(correctObject).length; ++i) {
    const key = Object.keys(correctObject)[i];
    if (objectToCheck[key] === undefined || (typeof correctObject[key] === 'object' && typeof objectToCheck[key] !== 'object')) {
      console.log(`${key} is bad`);
      return false;
    }
    if (typeof correctObject[key] === 'object') {
      const lulu = compareKeys(objectToCheck[key], correctObject[key]);
      if (!lulu) {
        return false;
      }
    }
  }
  return true;
};

describe('confirm page dataLayer', () => {
  const state = {
    env: browser.options.tc.environment,
  };

  const selectRadioButton = selector => browser.click(`${selector} .webui-radiobutton__circle`);

  const setPassenger = (paxNo, firstName, surname, birthDate, gender) => {
    browser.setValue(`#firstName_${paxNo}`, firstName);
    browser.setValue(`#lastName_${paxNo}`, surname);
    browser.setValue(`#dateOfBirth_${paxNo}`, birthDate);
    if (gender) {
      selectRadioButton(`.pax${paxNo} .${gender}`);
    }
    state.pax = state.pax || {};
    state.pax[paxNo] = {
      firstName,
      surname,
      birthDate,
      gender,
    };
  };

  const setContactInfo = (email, phone, street, careOf, zipCode, city) => {
    browser.setValue('#email', email);
    browser.setValue('#mobilephone', phone);
    browser.setValue('#street', street);
    browser.setValue('#careOf', careOf);
    browser.setValue('#zipCode', zipCode);
    if (city) {
      browser.setValue('#city', city);
    }
    state.contact = {
      email,
      phone,
      street,
      careOf,
      zipCode,
      city: city || 'Farsta',
    };
  };

  const createBooking = bookingParameters =>
    BookingCreator.createBooking(bookingParameters, state.env).then((res) => {
      state.bookingId = res.bookingId;
    });

  before(() => {
    const bookingParameters = {
      Departure: 'ARN',
      Destination: 'PMI',
      DepartureDate: '2018-07-25',
      Duration: 8,
      NumberOfAdults: 2,
      NumberOfChildren: 1,
      AgeOfChildren: '4',
    };

    browser.addCommand('createBooking', async () => createBooking(bookingParameters));
    console.log('environment ', state.env);
    browser.createBooking();
    console.log('bookingId ', state.bookingId);
    browser.url(`http://checkout.${state.env}.int?bookingId=${state.bookingId}`);
    browser.pause(3000);
    setPassenger(0, 'Anna', 'Andersson', '750101', 'Female');
    setPassenger(1, 'Bengt', 'Birgersson', '721231', 'Male');
    setPassenger(
      2,
      'Barn',
      'Andersson',
      moment()
        .subtract(4, 'years')
        .format('YYMMDD')
    );
    if (browser.isExisting('#checkout-transfer') && browser.isVisible('#checkout-transfer .radiobutton-yes')) {
      selectRadioButton('#checkout-transfer .radiobutton-yes');
      browser.pause(3000);
    }
    selectRadioButton('#checkout-gdpr .radiobutton-yes');
    browser.pause(3000);
    setContactInfo('anna@test.se', '00461234567', 'Testgatan 12', 'Larsson', '12345');
    browser.keys('Tab');
    browser.pause(3000);
    browser.click('#confirm-button');
    browser.pause(10000);
    state.dataLayer = getSearchEvent('checkout');
    state.correctDataLayer = {
      affiliateId: 'state.booking.createdBy',
      event: 'checkout',
      ecommerce: {
        checkout: {
          actionField: {
            option: 'Confirm booking',
            step: 4,
          },
          products: [
            {
              brand: 'Other',
              category: 'Package',
              id: 'state.app.bookingId',
              name: 'name',
              price: 123123,
              quantity: 1,
              variant: 'MIX',
            },
          ],
        },
      },
      hotelWVId: 'wvId',
      pageTypeURL: 'pageTypeURL',
      title: 'document.title',
      travelAction: 'Confirm',
      travelAdults: 1,
      travelAges: '42,4',
      travelChildren: 1,
      travelDepartureCode: 'state.transport.departureCode',
      travelDepartureDay: 'new Date(state.team3TransportForBooking.departureDate.raw).getDate()',
      travelDepartureMonth: 'new Date(state.team3TransportForBooking.departureDate.raw).getMonth() + 1',
      travelDepartureYear: 'new Date(state.team3TransportForBooking.departureDate.raw).getFullYear()',
      travelDestinationCode: 'state.transport.destinationCode',
      travelDuration: 'state.transport.duration',
      travelHotelCode: 'state.accommodation[0].providerKeys.HotelCode',
      travelHotelProvider: 'state.accommodation[0].provider',
      travelPax: 'state.passengers.length',
      travelPrice: 'state.prices.totalPrice',
      travelProductBrand: 'Other',
      travelResortCode: 'state.accommodation[0].providerKeys.ResortCode',
      travelRoomType: 'JSON.parse(state.accommodation[0].providerKeys.RoomTypeCodes)[0]',
      travelpaymentType: 'travelpaymentType',
      traveltype: 'state.transport.travelType',
    };
  });

  it("'checkout' event has correct keys and no undefined values", function () {
    const keysAreEqual = compareKeys(state.dataLayer, state.correctDataLayer);
    expect(keysAreEqual).to.be.true;
  });
});
