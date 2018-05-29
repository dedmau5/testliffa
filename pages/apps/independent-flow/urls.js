const hotel = {
  production: {
    dk: '',
    fi: '',
    no: '',
    se: 'http://independent-flow.prod.int/package-list',
    globe: '',
  },
};

const pricematrix = {
  production: {
    dk: '',
    fi: '',
    no: '',
    se: 'http://independent-flow.prod.int/ving.se/boka-paketresa-hotell',
    globe: '',
  },
};


const flight = {
  production: {
    dk: '',
    fi: '',
    no: '',
    se: 'http://independent-flow.prod.int/flight-list',
    globe: '',
  },
};

const query = {
  pricematrix: '?HotelId={HotelId}&ItemId={ItemId}&QueryHotelCD={QueryHotelCD}&QueryDepID={QueryDepID}&QueryCtryID={QueryCtryID}&QueryAreaID={QueryAreaID}&QueryResID={QueryResID}&QueryDepDate={QueryDepDate}&QueryRetDate={QueryRetDate}&QueryChkInDate={QueryChkInDate}&QueryChkOutDate={QueryChkOutDate}&QueryDur={QueryDur}&QueryRoomAges={QueryRoomAges}&QueryUnits={QueryUnits}&QueryAges={QueryAges}',
  flightList: '?QueryDepID={QueryDepID}&QueryRoomAges={QueryRoomAges}&QueryResID={QueryResID}&QueryDepDate={QueryDepDate}&QueryRetDate={QueryRetDate}&QueryDur={QueryDur}&IsStandalone=true',
  flightOnly: '?QueryDepID={QueryDepID}&QueryDestID={QueryDestID}&QueryCtryID={QueryCtryID}&QueryDepDate={QueryDepDate}&QueryRetDate={QueryRetDate}&QueryDur={QueryDur}&QueryAdults={QueryAdults}&QueryChildrenAges={QueryChildrenAges}&CategoryId=5',
};

export { flight, pricematrix, hotel, query };
