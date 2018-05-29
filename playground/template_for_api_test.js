const
    chai = require('chai'),
    chaiHttp = require('chai-http');

chai.use(chaiHttp);

const environments = {
    development: "dev",
    production: "prod",
    test: "test",
    acctest: "acctest"
};

const baseUrl = `http://favoritehotelsapi.${environments.development}.int`;


describe('Simple http requests', function () {

    it('Should get a response from the URL', function () {
        chai.request(baseUrl)
            .get('/')
            .end(function (err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
            });
    });

    // http://favoritehotelsapi.acctest.int/favoritehotels/get/v2/7311332/1?callback=jQuery1111005372513617574226_1488267012255&_=1488267012256
    it('Should get hotels from specific user', function () {

        chai.request(baseUrl)
            .get('/favoritehotels/get/v2/7311332/1')
            .query({callback: 'jQuery1111005372513617574226_1488267012255', _: '1488267012256'})
            .end(function (err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
            });
    });

});