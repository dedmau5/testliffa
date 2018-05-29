/*
* Pageobject for the namecollection-page, a new version of it to support sprinttesting
*/

class NameCollection {
  constructor() {
    const nameCollection = '.booking-steps';

    this.selectors = {
      home: `${nameCollection}`,

      myChoices: {
        timeTableLink: '.fetchdata.dec.open-layer',
        timeTableDiv: {
          airlineOutboundTrip: '#outboundtrip tr:nth-child(4) td:nth-child(2)',
          airlineHomeboundTrip: '#homeboundtrip tr:nth-child(4) td:nth-child(2)',
        },
        totalPrice: '.totalPriceAndPbcDiv dd',
      },

      steps: {
        // reserved for selectors in steps-container
      },

      passengerDetailsHeaderContainer: {
        header: '#M1_C2_Main_i10c30007828_PassengerDetailsHeaderContainer > h1',
        loginOpenCloseLinkDiv: '.loginOpenCloseLinkDiv',
        usernameForm: 'M1_C2_Main_i10c30007828_FoldableLoginControl_ctl06_ctl00_ctl01_txtUserName',
        passwordForm: '#M1_C2_Main_i10c30007828_FoldableLoginControl_ctl06_ctl00_ctl01_txtPassWord',
        loginButton: '#M1_C2_Main_i10c30007828_FoldableLoginControl_ctl06_ctl00_ctl01_LoginButton',
      },

      passengerDetails: {
        passenger: {
          first: {
            firstName: '.firstname [data-updates=passenger-01]',
            lastName: '.lasttname [data-updates=passenger-01]',
            dateOfBirth: '[data-ui-test-id=passengerBirthDate-01]',
            genderDropDown: '[data-ui-test-id=passengerGender--01]',
          },
          second: {
            firstName: '.firstname [data-updates=passenger-02]',
            lastName: '.lasttname [data-updates=passenger-02]',
            dateOfBirth: '[data-ui-test-id=passengerBirthDate-02]',
            genderDropDown: '[data-ui-test-id=passengerGender--02]',
          },
          third: {
            firstName: '.firstname [data-updates=passenger-03]',
            lastName: '.lasttname [data-updates=passenger-03]',
            dateOfBirth: '[data-ui-test-id=passengerBirthDate-03]',
            genderDropDown: '[data-ui-test-id=passengerGender--03]',
          },

          fourth: {
            firstName: '.firstname [data-updates=passenger-04]',
            lastName: '.lasttname [data-updates=passenger-04]',
            dateOfBirth: '[data-ui-test-id=passengerBirthDate-04]',
            genderDropDown: '[data-ui-test-id=passengerGender--04]',
          },

          fifth: {
            firstName: '.firstname [data-updates=passenger-05]',
            lastName: '.lasttname [data-updates=passenger-05]',
            dateOfBirth: '[data-ui-test-id=passengerBirthDate-05]',
            genderDropDown: '[data-ui-test-id=passengerGender--05]',
          },
        },
      },

      supplements: {
        mealOnFlight: {
          passengers: {
            firstPassenger: {
              options: 'select[id*="PassengerDropDown_0"]',
              newOptions: 'div:nth-child(1) > div.extra-select select',
            },
            secondPassenger: {
              options: 'select[id*="PassengerDropDown_1"]',
              newOptions: 'div:nth-child(2) > div.extra-select select',
            },
            thirdPassenger: {
              options: 'select[id*="PassengerDropDown_2"]',
              newOptions: 'div:nth-child(3) > div.extra-select select',
            },
            fourthPassenger: {
              options: 'select[id*="PassengerDropDown_3"]',
              newOptions: 'div:nth-child(4) > div.extra-select select',
            },
            fifthPassenger: {
              options: 'select[id*="PassengerDropDown_4"]',
              newOptions: 'div:nth-child(5) > div.extra-select select',
            },
          },
          sameExtrasForAll: '.same-extra-selection-checkbox',
        },

        airportTransport: {
          openDropDown: 'select',
        },
        
        cancellationInsurance: {
          openDropDown: '[id$=_MandatoryDropDown_2_InputField_2]',
          dropDownOptionYes: '[id$=_MandatoryDropDown_2_InputField_2] > option:nth-child(2)',
          dropDownOptionNo: '[id$=_MandatoryDropDown_2_InputField_2] > option:nth-child(3)',
        },

        tripInsurance: {
          openDropDown: '#M1_C2_Main_i10c30007828_ExtraGroupListView_ExtraGroupContainer_3_MandatoryDropDown_3_InputField_3',
          dropDownOptionYes: '#M1_C2_Main_i10c30007828_ExtraGroupListView_ExtraGroupContainer_3_MandatoryDropDown_3_InputField_3 > option:nth-child(2)',
          dropDownOptionNo: '#M1_C2_Main_i10c30007828_ExtraGroupListView_ExtraGroupContainer_3_MandatoryDropDown_3_InputField_3 > option:nth-child(3)',
        },

        legacyBagage: {},
      },

      travelInfo: {
        mainTraveller: 'input[id$=_txtReadOnlyPassengerName]',
        address: 'input[id$=_txtStreetAddress_InputField]',
        zipCode: 'input[id$=_txtZipCode_InputField]',
        place: 'input[id$=_txtCity_InputField]',
        cellPhone: 'input[id$=_txtPhoneMobile_InputField]',
        email: 'input[id$=_txtEmail_InputField]',
        confirmEmail: 'input[id$=_txtEmailConfirm_InputField]',
      },

      submitArea: {
        details: {
          flightText: '#M1_C2_Main_i10c30007828_priceSummary > div.g.g-2-1.price-component.base-price > div.e.e-1 > span',
          flightAmount: '#M1_C2_Main_i10c30007828_priceSummary > div.g.g-2-1.price-component.base-price > div.e.e-2',
          mealOnFlightText: '',
          mealOnFlightAmount: '',
          transportText: '',
          transportAmount: '',
          cancellationInsuranceText: '',
          cancellationInsuranceAmount: '',
          tripInsuranceText: '',
          tripInsuranceAmount: '',
          bagageText: '#gex-extras-details-inject > div > div.e.e-1',
          bagageAmount: '#gex-extras-details-inject > div > div.e.e-2',
        },
        totalPrice: '#M1_C2_Main_i10c30007828_spnTotalPrice',
        continueButton: 'input[id$=_BookButton]',
      },
    };
  }

  waitForPageToLoad() {
    browser.waitForExist(this.selectors.home, 30000);
  }

  _setPassengerInformationByIndex(
    passengerIndex,
    firstName,
    lastName,
    ageType,
    dateOfBirth,
    gender
  ) {
    const ordinals = ['first', 'second', 'third', 'fourth', 'fifth'];
    const passenger = this.selectors.passengerDetails.passenger[
      ordinals[passengerIndex - 1]
    ];

    $(passenger.firstName).setValue(firstName);
    $(passenger.lastName).setValue(lastName);
    $(passenger.dateOfBirth).setValue(dateOfBirth);

    if (ageType === 'adult') {
      browser.selectByValue(passenger.genderDropDown, gender);
    }
  }

  _clickOnTimeTableLink() {}

  get myChoices() {
    return {
      clickOnTimeTableLink: () => this._clickOnTimeTableLink(),
      viewAirlineForOutboundTrip: () => this._viewAirlineForOutboundTrip(),
      viewAirlineForHomeboundTrip: () => this._viewAirlineForHomeboundTrip(),
      viewPrice: () => this._viewPrice(),
    };
  }

  get steps() {
    return {
      // reserved for actions in steps-container
    };
  }

  get passengerInformation() {
    return {
      setPassengerInformationByIndex: (
        index,
        firstName,
        lastName,
        ageType,
        dateOfBirth,
        gender
      ) =>
        this._setPassengerInformationByIndex(
          index,
          firstName,
          lastName,
          ageType,
          dateOfBirth,
          gender
        ),
    };
  }

  get supplements() {
    return {};
  }

  get travelInfo() {
    return {};
  }

  get submitArea() {
    return {};
  }
}

export default new NameCollection();

