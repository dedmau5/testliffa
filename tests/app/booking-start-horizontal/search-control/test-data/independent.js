import moment from 'moment';
import { Translate } from '../../../../../tools';

const departureDate = moment(new Date()).add(3, 'months');
const returnDate = departureDate.clone().add(Math.floor(Math.random()) + 3, 'days'); // 3-4 days

const settings = {
  departure: Translate({
    dk: 'København',
    fi: 'Helsinki',
    no: 'Oslo, Gardermoen',
    se: 'Stockholm-Arlanda',
    globe: 'Stockholm-Arlanda',
  }),
  date: {
    departure: {
      year: departureDate.year(),
      month: departureDate.month() + 1,
      day: departureDate.date(),
    },
    return: {
      year: returnDate.year(),
      month: returnDate.month() + 1,
      day: returnDate.date(),
    },
  },
  travelCompany: {
    numberOfAdults: 2,
    numberOfChildren: 2,
    children: [{ age: 11 }, { age: 1 }],
  },
};


export default settings;
