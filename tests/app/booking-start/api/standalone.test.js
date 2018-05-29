import chai from 'chai';
import chaiHttp from 'chai-http';
import jsonValidate from 'chai-json-schema';

const { expect } = chai;

chai.use(chaiHttp);
chai.use(jsonValidate);

const baseURL = 'http://bookingstart-horizontal.prod.dmz';

describe('Standalone', () => {
  it('Recieves http status code 200, after making a GET request', (done) => {
    chai
      .request(baseURL)
      .get('/bs-app')
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });

  it('Recieves http status code 200, after making a GET request', (done) => {
    chai.request(baseURL).get('/bs-app')
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
});
