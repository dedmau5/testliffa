
//import Api from '../../pages/api/urls';
//import { apiUrl } from '../../pages/api/urls';

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

const apiUrl = {
    newFavorite: `http://favorite.${this.chosenEnvironment}.int`,
    oldFavorite: `http://favoritehotelsapi.${this.chosenEnvironment}.int`,
    bookinghub: `http://bookinghub.${this.chosenEnvironment}.int`,
    cssjs: `http://cssjs.${this.chosenEnvironment}.int`,
    contentdata: `http://contentdata.${this.chosenEnvironment}.int`,
    streamingbolaget: `https://thomascook.streamingbolaget.se/resources/841348-Sunprime_Alanya.mp4`
};

describe('HTTP checks for favoritehotel api', function () {

    it('Should get a response from new favoritehotels api', function (done) {
        chai.request(apiUrl.newFavorite)
            .get('/alive')
            .end(function (err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                done();
            });
    });

    it('Should get a response from old favoritehotels api', function (done) {
        chai.request(apiUrl.oldFavorite)
            .get('/')
            .end(function (err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                done();
            });
    });

    // http://favoritehotelsapi.acctest.int/favoritehotels/get/v2/7311332/1?callback=jQuery1111005372513617574226_1488267012255&_=1488267012256
    it('Should get hotels from old favoritehotels api for a specific user', function (done) {

        chai.request(apiUrl.oldFavorite)
            .get('/favoritehotels/get/v2/7311332/1')
            .query({callback: 'jQuery1111005372513617574226_1488267012255', _: '1488267012256'})
            .end(function (err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                done();
            });
    });
});