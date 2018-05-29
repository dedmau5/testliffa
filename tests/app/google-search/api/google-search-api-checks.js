
//import Api from '../../pages/api/urls';
//import { apiUri } from '../../pages/api/urls';

const
    chai = require('chai'),
    chaiHttp = require('chai-http'),
    expect = require('chai').expect;

chai.use(chaiHttp);

this.environment = {
    development: "dev",
    test: "test",
    acctest: "acctest",
    production: "prod",
};

this.chosenEnvironment = `${this.environment.development}`;

const apiUri = {
    googleSearch: `http://googlesearch.${this.chosenEnvironment}.int`,
};


describe('Checks for googlesearch api', function () {

    it("Should get suggestions for 'kre'", function (done) {
        // http://googlesearch.dev.int/api/suggest/kre/vs
        chai.request(apiUri.googleSearch)
            .get('/api/suggest/kre/vsa')
            .end(function (err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                done();
            });
    });

    it("Should be able search for 'kre'", function (done) {
        // http://googlesearch.dev.int/api/search?q=kre&mucd=vs
        chai.request(apiUri.googleSearch)
            .get('/api/search?q=kre&mucd=vs')
            .end(function (err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                done();
            });
    });

});

// when this is implemented, these steps should move into another testsuite
describe.skip('Checks for the google-search dependencys of endpoints', function () {
    it('Should get a response 200 from x', function (done) {});
    it('Should get a response 200 from y', function (done) {});
    it('Should get a response 200 from z', function (done) {});

});