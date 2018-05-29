import moment from 'moment';

/**
 * Create month with offset.
 *
 * @param {number} monthOffset
 * @param {number} dayOffset
 * @returns {string}
 */
const createDate = (monthOffset = 0, dayOffset = 0) => {
  const date = moment(new Date());
  if (monthOffset > 0) {
    date.add(monthOffset, 'months');
  }

  if (dayOffset > 0) {
    date.add(dayOffset, 'days');
  }
  return date.format('YYYYMMDD');
};

const queryLondon = {
  hotelId: '15016',
  hotelCode: 'HLONAMBA',
  departureId: '11937',
  countryId: '73',
  resortId: '316',
  departureDate: createDate(2),
  returnDate: createDate(2, 5),
  duration: '-1',
  roomAges: '|40,40,5',
  units: '0',
  ages: '40,40,5',
};


const queryGranCanaria = {
  hotelId: '4112',
  departureId: '11937',
  countryId: '65',
  resortId: '206',
  departureDate: createDate(2),
  returnDate: createDate(2, 5),
  duration: '8',
  units: '0',
  ages: '40,40,5',
};

export { queryLondon, queryGranCanaria };
