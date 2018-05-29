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


export default createDate;
