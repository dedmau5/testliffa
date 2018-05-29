
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

describe('HTTP dependency checks for favoritehotels dependencys of endpoints', function () {

    it('Should get a response 200 from bookinghub', function (done) {
        chai.request(apiUrl.bookinghub)
            .get('/')
            .end(function (err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                done();
            });
    });

    it('Should get a response 200 from cssjs', function (done) {
        chai.request(apiUrl.cssjs)
            .get('/')
            .end(function (err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                done();
            });
    });

    it('Should get a response 200 from contentdata', function (done) {
        chai.request(apiUrl.contentdata)
            .get('/')
            .end(function (err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                done();
            });
    });

    it('Should get a response 200 from streamingbolaget', function (done) {
        chai.request(apiUrl.streamingbolaget)
            .get('')
            .end(function (err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                done();
            });
    });
});