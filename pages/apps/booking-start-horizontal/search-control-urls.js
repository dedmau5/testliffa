const urls = {
  production: {
    se: 'http://bookingstart-horizontal.prod.int/ving.se/boka-paketresa-hotell',
  },
};

const query = {
  independent: '?HotelId={HotelId}&ItemId={ItemId}&QueryHotelCD={QueryHotelCD}&QueryDepID={QueryDepID}&QueryCtryID={QueryCtryID}&QueryResID={QueryResID}&QueryDepDate={QueryDepDate}&QueryRetDate={QueryRetDate}&QueryDur={QueryDur}&QueryRoomAges={QueryRoomAges}&QueryUnits={QueryUnits}&QueryAges={QueryAges}',
  charter: '?QueryDepID={QueryDepID}&QueryCtryID={QueryCtryID}&QueryResID={QueryResID}&QueryDepDate={QueryDepDate}&QueryUnits={QueryUnits}&QueryAges={QueryAges}&QueryDur={QueryDur}&ItemId={ItemId}&HotelId={HotelId}',
};

export { urls, query };
