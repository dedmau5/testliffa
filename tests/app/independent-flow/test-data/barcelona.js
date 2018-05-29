import createDate from './dateHandler';

const barcelona = {
  departureId: '2788',
  childrenAges: '11,5',
  adults: '2',
  destinationId: '2600',
  countryId: '65',
  departureDate: createDate(4),
  returnDate: createDate(4, 3),
  duration: '',
};

export default barcelona;
