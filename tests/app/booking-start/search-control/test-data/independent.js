import moment from 'moment';
import { Translate } from '../../../../../tools';

const departureDate = moment(new Date()).add(4, 'months');
const returnDate = departureDate.clone().add(Math.floor(Math.random()) + 3, 'days'); // 3-4 days

const settings = {
  departure: Translate({
    dk: 'København', fi: 'Helsinki', no: 'Oslo, Gardermoen', se: 'Stockholm-Arlanda', globe: 'Stockholm-Arlanda',
  }),
  destination: Translate({
    dk: 'Storbritannien', fi: 'Iso-Britannia', no: 'Storbritannia', se: 'Storbritannien', globe: 'Storbritannien',
  }),
  resort: Translate({
    dk: 'London', fi: 'Lontoo', no: 'London', se: 'London', globe: 'London',
  }),
  date: {
    departure: {
      year: departureDate.year(), month: departureDate.month() + 1, day: departureDate.date(), allowChoosingNearByDate: true, numberOfNearbyMonthsToAllow: 6,
    },
    return: {
      year: returnDate.year(), month: returnDate.month() + 1, day: returnDate.date(), allowChoosingNearByDate: true, numberOfNearbyMonthsToAllow: 6,
    },
  },
  travellers: {
    adults: 2,
  },
};

export default settings;
