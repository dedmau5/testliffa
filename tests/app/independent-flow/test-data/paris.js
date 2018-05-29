import createDate from './dateHandler';

const paris = {
  departureId: '2788',
  hotelId: '713',
  hotelCode: 'HPARBELF',
  destinationId: '309',
  areaId: '136',
  countryId: '29',
  departureDate: createDate(4),
  returnDate: createDate(4, 3),
  roomAges: '|40,40',
  ages: '40,40',
  duration: '-1',
  units: '0',
};

export default paris;
