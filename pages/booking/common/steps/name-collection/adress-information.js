import { getElementValue, setElementValue } from '../../../../../tools/elements';


class AdressInformation {
    constructor() {
        this.selectors = {
            home: "div.contact-inner-details-box",
            primaryTraveler: " div.read-only-passenger-name > input",
            address: " div.streetAddress > input",
            careOf: " div.contactCareOf > input",
            postalCode: " div.contactZipcode > input",
            city: " div.contactCity > input",
            country: " div.select_country_dropdown > div.custom-select-container > select",
            mobilePhone: " div.contactPhoneNumber > input",
            alternativePhone: " div.phoneNumber > input",
            emailAddress: " div.contactEmail > input",
            confirmEmailAddress: " div.contactEmail.rightbox > input"
        };
    }

    get primaryTraveler() {
        return getElementValue(this.selectors.primaryTraveler);
    }

    set primaryTraveler(value) {
        setElementValue(this.selectors.primaryTraveler, value);
    }

    get address() {
        return getElementValue(this.selectors.address);
    }

    set address(value) {
        setElementValue(this.selectors.address, value);
    }

    get careOf() {
        return getElementValue(this.selectors.careOf);
    }

    set careOf(value) {
        setElementValue(this.selectors.careOf, value);
    }

    get postalCode() {
        return getElementValue(this.selectors.postalCode);
    }

    set postalCode(value) {
        setElementValue(this.selectors.postalCode, value);
    }

    get city() {
        return getElementValue(this.selectors.city);
    }

    set city(value) {
        setElementValue(this.selectors.city, value);
    }

    get country() {
        return getElementValue(this.selectors.country);
    }

    set country(value) {
        setElementValue(this.selectors.country, value);
    }

    get mobilePhone() {
        return getElementValue(this.selectors.mobilePhone);
    }

    set mobilePhone(value) {
        setElementValue(this.selectors.mobilePhone, value);
    }

    get alternativePhone() {
        return getElementValue(this.selectors.alternativePhone);
    }

    set alternativePhone(value) {
        setElementValue(this.selectors.alternativePhone, value);
    }

    get emailAddress() {
        return getElementValue(this.selectors.emailAddress);
    }

    set emailAddress(value) {
        setElementValue(this.selectors.emailAddress, value);
    }

    get confirmEmailAddress() {
        return getElementValue(this.selectors.confirmEmailAddress);
    }

    set confirmEmailAddress(value) {
        setElementValue(this.selectors.confirmEmailAddress, value);
    }
}

export { AdressInformation };