import moment from 'moment';
import { Translate } from '../../../../tools/index';

const departureDate = moment(new Date()).add(1, 'months');
const returnDate = departureDate.clone().add(3, 'days');

const testData = {
  destination: Translate({
    dk: 'London',
    fi: 'Lontoo',
    no: 'London',
    se: 'London',
    globe: 'London',
  }),
  date: {
    departure: {
      year: departureDate.year(),
      month: departureDate.month() + 1,
      day: departureDate.date(),
      allowChoosingNearByDate: true,
      numberOfNearbyMonthsToAllow: 4,
    },
    return: {
      year: returnDate.year(),
      month: returnDate.month() + 1,
      day: returnDate.date(),
      allowChoosingNearByDate: true,
      numberOfNearbyMonthsToAllow: 4,
    },
  },
};

export default testData;
