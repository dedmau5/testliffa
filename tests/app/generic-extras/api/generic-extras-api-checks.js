
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

const uri = {
    gex: `http://gex.${this.chosenEnvironment}.int`,
    bookinghub: `http://bookinghub.${this.chosenEnvironment}.int`,
};

describe('HTTP sanity checks for ancillary app', function () {
    it('Should send GET to search for bagage', function (done) {
        chai.request(uri.gex)
            .get('/api/v1/supplement')
            .end(function (err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                done();
            });
    });

    it.skip('Should send POST to do reservation of bagage', function (done) {
    });
});