const chalk = require('chalk');
const log = console.log;

import {
    getRandomIntegerBetween,
    Translate
} from '../../../../../tools/index';
import { firstnames, lastnames } from '../../../../../localization/helpers/names';


function getFirstname(isMale) {
    const names = isMale ? firstnames.male : firstnames.female;

    return names.splice(
        Math.floor(Math.random() * names.length),
        1
    );
}


function getLastname() {
    return lastnames[Math.floor(Math.random() * lastnames.length)];
}


/**
 * @param passenger {Passenger}
 */
function setRandomNameForPassenger(passenger, isMale) {
    passenger.firstname = getFirstname(isMale);
    passenger.lastname = getLastname();
}


/**
 * @param passenger {Passenger}
 * @param randomize {boolean}
 * @param age {number|null}
 * @returns {number} Returns the age of the passenger.
 */
function setBirthdayForPassenger(passenger, randomize = false, age = null) {
    let yearBetween1940and1990 = getRandomIntegerBetween( 40, 90 ),
        monthBetween1and12 = getRandomIntegerBetween( 1, 12 ),
        dayBetween1and28 = getRandomIntegerBetween( 1, 28 ).toString();

    monthBetween1and12 = monthBetween1and12 < 10 ? "0" + monthBetween1and12 : monthBetween1and12;
    dayBetween1and28 = dayBetween1and28 < 10 ? "0" + dayBetween1and28 : dayBetween1and28;

    if ( passenger.isAChild() ) {
        if ( age === null ) {
            const result = passenger.regexps.age.exec(passenger.heading);

            if ( ! result ) {
                throw new Error("Can't parse the child's age!");
            }

            age = parseInt( result[1], 10 );
        }

        let date = new Date(),
            month = date.getMonth(),
            day = date.getDay();

        month = month < 10 ? "0" + month : month;
        day = day < 10 ? "0" + day : day;

        passenger.birthday = Translate({
            dk: `${day}${month}${( date.getFullYear() - age).toString().substr( 2, 2 ) }`,
            fi: `${day}${month}${( date.getFullYear() - age).toString().substr( 2, 2 ) }`,
            no: `${day}${month}${( date.getFullYear() - age).toString().substr( 2, 2 ) }`,
            se: `${( date.getFullYear() - age ).toString().substr( 2, 2 )}${month}${day}`,
            globe: `${( date.getFullYear() - age ).toString().substr( 2, 2 )}${month}${day}`
        });
    } else {
        passenger.birthday = Translate({
            dk: `${dayBetween1and28}${monthBetween1and12}${yearBetween1940and1990}`,
            fi: `${dayBetween1and28}${monthBetween1and12}${yearBetween1940and1990}`,
            no: `${dayBetween1and28}${monthBetween1and12}${yearBetween1940and1990}`,
            se: `${yearBetween1940and1990}${monthBetween1and12}${dayBetween1and28}`,
            globe: `${yearBetween1940and1990}${monthBetween1and12}${dayBetween1and28}`
        });
    }

    return age;
}


export function EnterInformationAboutTravellers(sharedData) {
    it('Can enter information about the traveller(s)', () => {
        log(chalk.underline.cyan("\nName Collection"));

        let nameCollection = sharedData.nameCollection.nameCollection,
            passengers = nameCollection.passengers;

        expect(passengers).to.be.instanceof(Array);
        expect(passengers).to.have.length.of.at.least(1);

        sharedData.numberOfTravelers = passengers.length;
        let ageOfChildren = sharedData.agesOfChildren;

        for (let index = 0; index < passengers.length; index++) {
            let passenger = passengers[index],
                isMale = Math.random() < 0.5,
                age;

            setRandomNameForPassenger(passenger, isMale);
            log(`Name: ${chalk.bold(passenger.firstname)} ${chalk.bold(passenger.lastname)}`);

            if ( passenger.isAChild() && Array.isArray( ageOfChildren ) && ageOfChildren.length > 0 ) {
                age = ageOfChildren.pop();
                setBirthdayForPassenger( passenger, false, age );
                log( `Age: ${chalk.bold( age )}` );

            } else {
                age = setBirthdayForPassenger( passenger, true );
                log( `Age: ${chalk.bold( age )}` );
            }

            if ( passenger.hasGender() ) {
                passenger.gender = isMale ? "Male" : "Female";
                log(`Gender: ${chalk.bold(passenger.gender)}`);
            }
        }
    });
}