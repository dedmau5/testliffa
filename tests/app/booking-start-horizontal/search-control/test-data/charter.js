import moment from 'moment';
import { Translate } from '../../../../../tools';

const bookingstartDepartureDate = moment(new Date()).add(2, 'months');

const settings = {
  duration: {
    visible: true,
    length: {
      oneWeek: Translate({
        dk: '1 uge',
        fi: '1 viikkoa',
        no: '1 uke',
        se: '1 vecka',
      }),
    },
  },
  date: {
    departure: {
      year: bookingstartDepartureDate.year(),
      month: bookingstartDepartureDate.month() + 1,
      day: bookingstartDepartureDate.date(),
    },
  },
  departure: Translate({
    dk: 'København',
    fi: 'Helsinki',
    no: 'Oslo, Gardermoen',
    se: 'Stockholm-Arlanda',
    globe: 'Stockholm-Arlanda',
  }),
  travelCompany: {
    numberOfAdults: 2,
    numberOfChildren: 2,
    children: [{ age: 11 }, { age: 1 }],
  },
};

export default settings;
