const
chai = require('chai'),
chaiHttp = require('chai-http'),
expect = require('chai').expect,
jsonValidate = require('chai-json-schema');
const date = require('confs/bookinghub.conf.js').date;

chai.use(chaiHttp);
chai.use(jsonValidate);

const baseURL = 'http://bookinghub-2.dev.int';
const parmas = "DepartureQuery=ARN&DestinationQuery=LPA&ResortQuery=&CountryQuery=,DepartureDateFrom=" + date + "&DepartureDateTo=&ReturnDepartureDateFrom=&ReturnDepartureDateTo=&DurationGroup=&OutFlightKey=&HomeFlightKey=&ResortKey=&HotelQuery=&HotelKey=&BrowseKey=&NumberOfFlightOffers=5&SearchAlternativeDepartures=true&SearchAlternativeDestinations=&SearchAlternativeDurations=&IgnoreTransportCapacity=&BrowseBackward=false&TripTypes=package&NumberOfAdults=2&NumberOfChildren=0&ChildAges=&MarketUnitKey=VS&PriceCalculationCodes=WA&PreSelectedExtraKeys=TravelInsurance&TripData=&SessionData=";

describe('Creating a trip', function () {
    let preselectedExtrasResponse, priceCodesResponse, tripResponse, resultResponse;

    it('Getting PreselectedExtras data', function (done) {
        chai.request(baseURL)
            .get('/api/query/preselected-extras?MarketUnitKey=VS&TripType=package&SessionData=')
            .end(function (err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                preselectedExtrasResponse = res;
                done();
            }).timeout(5000);
    });

    it('Getting Price codes', function (done) {
        chai.request(baseURL)
            .get('/api/query/price-calculation-codes')
            .end(function (err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                priceCodesResponse = res;
                done();
            }).timeout(5000);
    });

    it('Send trip request', function (done) {
        chai.request(baseURL)
        .get("/api/query/flight-offers?" + parmas)
        .end(function (err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            tripResponse = res;
            done();
        }).timeout(5000);
    });

    it('Get result', function (done) {
        chai.request(tripResponse.body["_links"]["results"]["href"])
        .get('')
        .end(function (err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            resultResponse = res;
            done();
        });
    }).timeout(5000);
});