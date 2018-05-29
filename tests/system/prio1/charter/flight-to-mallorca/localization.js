const moment = require('moment');
import { Translate } from '../../../../../tools';

const language = browser.options.tc.language;

/**
 * @param settings {Object}
 */
export function MakeLocalizationPreparations(settings) {
  it(`Make localization preparations for: ${language}`, () => {
    moment.locale(language);

    settings.departFrom = Translate({
      dk: 'København',
      fi: 'Helsinki',
      no: 'Oslo, Gardermoen',
      se: 'Stockholm-Arlanda',
      globe: 'Stockholm-Arlanda',
    });

    settings.destination = Translate({
      dk: 'Spanien',
      fi: 'Espanja',
      no: 'Spania',
      se: 'Spanien',
      globe: 'Spanien',
    });

    settings.resort = Translate({
      dk: 'Mallorca',
      fi: 'Palma de Mallorca',
      no: 'Palma de Mallorca',
      se: 'Mallorca',
      globe: 'Mallorca',
    });

    settings.travelDuration = Translate({
      dk: '1 uge',
      fi: '1 viikko',
      no: '1 uke',
      se: '1 vecka',
      globe: '1 vecka',
    });
  });
}
