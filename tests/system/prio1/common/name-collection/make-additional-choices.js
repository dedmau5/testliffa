const chalk = require('chalk');
const log = console.log;

import { YES, NO } from '../../../../../localization/common/yesno';
import { getRandomIntegerBetween } from '../../../../../tools/index';
import { SimpleChoice } from '../../../../../pages/booking/charter/steps/name-collection/simple-choice';

const language = browser.options.tc.language;

export function MakeAdditionalChoices(sharedData, options) {
  switch (options.mode) {
    case 'charter':
      MakeAdditionalChoicesForCharter(sharedData);
      break;

    case 'dynamic-packaging':
      MakeAdditionalChoicesForDynamicPackaging(sharedData);
      break;

    default:
      throw new Error('Unknown mode!');
  }
}

/**
 * Runs some expects against the given choices array.
 *
 * @param choices {Array}
 * @param length {number}
 */
function verifyChoices(choices, length = 2) {
  expect(choices).to.be.instanceof(Array);
  expect(choices).to.have.length.of.at.least(length);
}

function pickARandomChoice(choices) {
  return choices[getRandomIntegerBetween(1, choices.length - 1)];
}

function handleSimpleChoice(nameCollectionMember) {
  const choices = nameCollectionMember.choices;
  verifyChoices(choices);

  for (let choice of choices) {
    if (choice.text === YES) {
      nameCollectionMember.value = choice.value;
      return choice.value;
    }
  }

  throw new Error(`Couldn't find an option with the text '${YES}'`);
}

function handleChoiceAndSubChoices(nameCollectionMember) {
  const airportTransfer = nameCollectionMember,
    choices = airportTransfer.choice.choices;

  verifyChoices(choices);
  let reportChoices = [];

  for (let choice of choices) {
    if (choice.text === YES) {
      airportTransfer.choice.value = choice.value;
      reportChoices.push(choice.value);
      break;
    }
  }

  for (let subChoice of airportTransfer.subChoices.dropdowns) {
    verifyChoices(subChoice.choices);
    subChoice.value = pickARandomChoice(subChoice.choices).value;
    reportChoices.push(subChoice.value);
  }

  return reportChoices;
}

function MakeAdditionalChoicesForCharter(sharedData) {
  let nameCollection;

  // it( "Can choose onboard meal", function () {

  //     nameCollection = sharedData.nameCollection.nameCollection;

  //     if ( ! nameCollection.onboardMeal ) {
  //         this.skip();
  //     }

  //     for ( let dropdown of nameCollection.onboardMeal.dropdowns ) {
  //         verifyChoices(dropdown.choices, 3);
  //         dropdown.value = dropdown.choices[getRandomIntegerBetween( 1, dropdown.choices.length - 1 )].value;
  //         log(`Onboard meal: ${chalk.bold(dropdown.value)}`);
  //     }
  // });

  it('Can choose onboard meal in GexApp on Charter', function() {
    /* gexApp: "#GexApp",
        gexContainer: ".gex-container",
        gexGroupPanel: ".gex-group-panel",
        gexExtraChoiceContainer: ".gex-group-panel > div .extra-choice-container",
        gexDropDownPax: ".gex-group-panel > div .extra-choice-container .replaced",
        */
    console.log('inside gex... ');

    if (
      !browser.isExisting(
        '.extra-group.group-f88ac10b-9b4e-4a9f-bc7b-4d537f5120f1'
      )
    ) {
      this.skip();
    }

    browser.click(
      '.extra-group.group-f88ac10b-9b4e-4a9f-bc7b-4d537f5120f1 .replaced'
    );
    browser.pause(500);
    browser.click(
      '.extra-group.group-f88ac10b-9b4e-4a9f-bc7b-4d537f5120f1 .replaced>option:nth-child(2)'
    );
    browser.pause(500);
    browser.click(
      '.extra-group.group-f88ac10b-9b4e-4a9f-bc7b-4d537f5120f1 input[id*="same_extra"]'
    );
  });

  it('Can choose to include transfer ASDASD', function() {
    nameCollection = sharedData.nameCollection.nameCollection;
    console.log('nameCollection ', nameCollection);
    const airportTransfer = nameCollection.airportTransfer;

    if (!airportTransfer) {
      this.skip();
    }

    if (airportTransfer instanceof SimpleChoice) {
      const choice = handleSimpleChoice(airportTransfer);
      log(`Airport transfer: ${chalk.bold(choice)}`);
      return;
    } else if (airportTransfer.choice && airportTransfer.subChoices) {
      const choices = handleChoiceAndSubChoices(airportTransfer);
      log(`Airport transfer: ${chalk.bold(choices)}`);
      return;
    }

    throw new Error('Unknown error for airport transfer!');
  });

  it('Can choose to include cancellation insurance', function() {
    const cancellationInsurance = nameCollection.cancellationInsurance;

    if (!cancellationInsurance) {
      this.skip();
    }

    if (cancellationInsurance instanceof SimpleChoice) {
      const choice = handleSimpleChoice(cancellationInsurance);
      log(`Cancellation insurance: ${chalk.bold(choice)}`);
      return;
    } else if (
      cancellationInsurance.choice &&
      cancellationInsurance.subChoices
    ) {
      const choices = handleChoiceAndSubChoices(cancellationInsurance);
      log(`Cancellation insurance: ${chalk.bold(choices)}`);
      return;
    }

    throw new Error('Unknown error for cancellation insurance!');
  });

  it('Can choose to include travel insurance', function() {
    const travelInsurance = nameCollection.travelInsurance;

    if (!travelInsurance) {
      this.skip();
    }

    if (travelInsurance instanceof SimpleChoice) {
      const choice = handleSimpleChoice(travelInsurance);
      log(`Travel insurance: ${chalk.bold(choice)}`);
      return;
    } else if (travelInsurance.choice && travelInsurance.subChoices) {
      const choices = handleChoiceAndSubChoices(travelInsurance);
      log(`Travel insurance: ${chalk.bold(choices)}`);
      return;
    }

    throw new Error('Unknown error for travel insurance!');
  });

  it('Can choose to allow Thomas Cook to send catalogs and e-mails', function() {
    if (!nameCollection.mayThomasCookSendImportantInformation) {
      this.skip();
    }

    const choice = handleSimpleChoice(
      nameCollection.mayThomasCookSendImportantInformation
    );
    log(
      `Allow Thomas Cook to send catalogs and e-mails: ${chalk.bold(choice)}`
    );
  });

  it('Can choose to allow Thomas Cook to send important information', function() {
    if (!nameCollection.mayThomasCookSendCatalogsAndEmails) {
      this.skip();
    }

    const choice = handleSimpleChoice(
      nameCollection.mayThomasCookSendCatalogsAndEmails
    );
    log(
      `Allow Thomas Cook to send important information: ${chalk.bold(choice)}`
    );
  });

  // it( "Can choose to check in luggage (or not) - randomized answer", function () {
  //     debugger;
  //     if ( ! nameCollection.checkInLuggage ) {
  //         this.skip();
  //     }
  //     debugger;
  //     for ( let dropdown of nameCollection.checkInLuggage.dropdowns ) {
  //         verifyChoices(dropdown.choices, 3);
  //         dropdown.value = dropdown.choices[ getRandomIntegerBetween( 1, dropdown.choices.length - 1 )].value;
  //         log(`Choose to check in luggage: ${chalk.bold(dropdown.value)}`);
  //     }
  // });

  it('Can choose luggage in GexApp on Charter', function() {
    /* gexApp: "#GexApp",
        gexContainer: ".gex-container",
        gexGroupPanel: ".gex-group-panel",
        gexExtraChoiceContainer: ".gex-group-panel > div .extra-choice-container",
        gexDropDownPax: ".gex-group-panel > div .extra-choice-container .replaced",
        */
    console.log('inside gex... ');

    if (
      !browser.isExisting(
        '.extra-group.group-a5c5563d-e686-419d-8065-80a8150263e0'
      )
    ) {
      this.skip();
    }

    browser.click(
      '.extra-group.group-a5c5563d-e686-419d-8065-80a8150263e0 .replaced'
    );
    browser.pause(500);
    browser.click(
      '.extra-group.group-a5c5563d-e686-419d-8065-80a8150263e0 .replaced>option:nth-child(2)'
    );
    browser.pause(500);
    browser.click(
      '.extra-group.group-a5c5563d-e686-419d-8065-80a8150263e0 input[id*="same_extra"]'
    );

    /*for ( let dropdown of nameCollection.checkInLuggage.dropdowns ) {
            verifyChoices(dropdown.choices, 3);
            dropdown.value = dropdown.choices[ getRandomIntegerBetween( 1, dropdown.choices.length - 1 )].value;
            log(`Choose to check in luggage: ${chalk.bold(dropdown.value)}`);
        }*/
  });
}

// TODO: Remove this and use the MakeAdditionalChoicesForCharter() for everything. Should work.
function MakeAdditionalChoicesForDynamicPackaging(sharedData) {
  let nameCollection;

  it('Can choose to not include cancellation insurance', function() {
    nameCollection = sharedData.nameCollection.nameCollection;

    if (!nameCollection.cancellationInsurance) {
      this.skip();
    }

    const choices = nameCollection.cancellationInsurance.choices;

    verifyChoices(choices);

    for (let choice of choices) {
      if (choice.text === NO) {
        nameCollection.cancellationInsurance.value = choice.value;
        log(`Cancellation insurance: ${chalk.bold(choice.value)}`);
        return;
      }
    }

    throw new Error(`Couldn't find an option with the text '${NO}'`);
  });
}
