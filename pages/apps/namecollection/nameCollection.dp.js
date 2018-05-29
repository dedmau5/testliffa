import nameCollectionCP from './namecollection-pageobject';

/**
 * Pageobject for the namecollection-page, a new version of it to support sprinttesting
 * @class NameCollection
 */
class NameCollection {
  constructor() {
    const home = '.booking-steps';

    this.selectors = {
      home,

      cancellationInsurance: {
        openDropDown: '.select-insurance-and-price .custom-select',
        dropDownOptionYes: '.select-insurance-and-price .custom-select-popup li:nth-child(2)',
        dropDownOptionNo: '.select-insurance-and-price .custom-select-popup li:nth-child(3)',
      },

      addressInfo: {
        mainTraveller: 'input[id$=_txtReadOnlyPassengerName]',
        address: 'input[id$=_txtStreetAddress_InputField]',
        zipCode: 'input[id$=_txtZipCode_InputField]',
        city: 'input[id$=_txtCity_InputField]',
        cellPhone: 'input[id$=_txtPhoneMobile_InputField]',
        email: 'input[id$=_txtEmail_InputField]',
        confirmEmail: 'input[id$=_txtEmailConfirm_InputField]',
      },

      travelInfo: {
        price: 'dd[id$=_ddPrice]',
      },

      summary: {
        price: '.totalPriceAndPbcDiv dd',
        continueButton: 'input[id$=_BookButton]',
      },
    };
  }

  waitForPageToLoad() {
    nameCollectionCP.waitForPageToLoad();
  }

  waitForCancellationInsuranceToLoad() {
    browser.waitForExist(this.selectors.cancellationInsurance.openDropDown, 30000);
  }

  get cancellationInsurance() {
    const click = () => {
      browser.click(this.selectors.cancellationInsurance.openDropDown);
    };
    const selectNo = () => {
      browser.click(this.selectors.cancellationInsurance.dropDownOptionNo);
    };

    return {
      click,
      selectNo,
    };
  }

  get passengerInformation() {
    return nameCollectionCP.passengerInformation;
  }

  passenger(nthPassenger) {
    const getFirstName = () => browser.getValue(`.firstname [data-updates=passenger-0${nthPassenger}]`);
    const getLastName = () => browser.getValue(`.lasttname [data-updates=passenger-0${nthPassenger}]`);
    const getDateOfBirth = () => browser.getValue(`[data-ui-test-id=passengerBirthDate-0${nthPassenger}]`);
    const getGender = () => browser.getValue(`[data-ui-test-id=passengerGender--0${nthPassenger}]`);

    return {
      getFirstName,
      getLastName,
      getDateOfBirth,
      getGender,
    };
  }

  get addressInfo() {
    const fillForm = (city, zipCode, streetAddress, cellPhone, email, confirmEmail) => {
      browser.setValue(this.selectors.addressInfo.city, city);
      browser.setValue(this.selectors.addressInfo.zipCode, zipCode);
      browser.setValue(this.selectors.addressInfo.address, streetAddress);
      browser.setValue(this.selectors.addressInfo.cellPhone, cellPhone);
      browser.setValue(this.selectors.addressInfo.email, email);
      browser.setValue(this.selectors.addressInfo.confirmEmail, confirmEmail);
    };

    return {
      fillForm,
    };
  }

  get travelInfo() {
    const price = browser.getText(this.selectors.travelInfo.price);

    return {
      price,
    };
  }

  submitForm() {
    browser.click(this.selectors.continueButton);
  }

  get summary() {
    const price = browser.getText(this.selectors.summary.price);
    const submitForm = () => browser.click(this.selectors.summary.continueButton);

    return {
      price,
      submitForm,
    };
  }
}

export default new NameCollection();
