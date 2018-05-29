import moment from 'moment';
import BookingCreator from '@tcne/web-booking-creator';

describe('Checkout', () => {
  const state = {
    env: browser.options.tc.environment,
  };

  const getPassengerHeader = paxNo => browser.getText(`#pax-header-${paxNo}`);

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
      DepartureDate: '2018-07-24',
      Duration: 8,
      NumberOfAdults: 2,
      NumberOfChildren: 1,
      AgeOfChildren: '4',
    };

    browser.addCommand('createBooking', async () => createBooking(bookingParameters));
    console.log('environment ', state.env);
  });

  it('should create a booking', () => {
    browser.createBooking();
    console.log('bookingId ', state.bookingId);
    expect(state.bookingId).to.not.equal(undefined);
    expect(state.bookingId.length).to.equal(36);
  });

  it('should load name collection page', () => {
    browser.url(`http://checkout.${state.env}.int?bookingId=${state.bookingId}`);
    browser.pause(3000);
    expect(browser.isExisting('#namecollection-page')).to.equal(true);
  });

  it('should have the correct namecollection page title', () => {
    expect(browser.getTitle()).to.equal('Bokning av resa – Ange personuppgifter');
  });

  it('should have two adults and a 4 year old child', () => {
    expect(getPassengerHeader(0)).to.equal('Vuxen - Huvudresenär (Yngre än 18 år?)');
    expect(getPassengerHeader(1)).to.equal('Vuxen');
    expect(getPassengerHeader(2)).to.equal('Barn (4 år)');
  });

  it('should be possible to enter passenger data', () => {
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
    browser.pause(2000);
    expect(browser.getValue('#fullName')).to.equal('Anna Andersson');
  });

  it('should possible to add transfer if trip has transfer', () => {
    if (browser.isExisting('#checkout-transfer')) {
      selectRadioButton('#checkout-transfer .radiobutton-yes');
      browser.pause(3000);

      expect(browser.getText('#checkout-transfer .webui-addon__confirmation-content p')).to.equal('Transfer tillagt');
    }
  });

  it('should possible to add marketing', () => {
    selectRadioButton('#checkout-gdpr .radiobutton-yes');
    browser.pause(3000);

    expect(browser.getText('#checkout-gdpr .webui-addon__confirmation-content p')).to.equal('Ja tack!');
  });

  it('should be possible to enter contact info', () => {
    setContactInfo('anna@test.se', '00461234567', 'Testgatan 12', 'Larsson', '12345');
    browser.keys('Tab');
    browser.pause(3000);
    expect(browser.getValue('#city')).to.equal('Farsta');
  });

  it('should possible to proceed to the confirm page', () => {
    browser.click('#confirm-button');

    browser.pause(10000);
    expect(browser.isExisting('#confirm-page')).to.equal(true);
  });

  it('should possible to confirm the booking', () => {
    browser.click('.webui-checkbox__square');

    expect(browser.isSelected('.webui-checkbox__input')).to.equal(true);
  });

  it('should possible to proceed to the thanks page', () => {
    browser.click('#confirm-button');

    browser.pause(3000);
    expect(browser.isExisting('#thanks-page')).to.equal(true);
    browser.click('.webui-button--primary');
  });
});
