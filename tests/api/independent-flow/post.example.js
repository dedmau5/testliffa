const chai = require('chai'),
  chaiHttp = require('chai-http'),
  expect = require('chai').expect,
  jsonValidate = require('chai-json-schema');

chai.use(chaiHttp);
chai.use(jsonValidate);

const baseURL = 'http://bookinghub-2.dev.int'; // Base URL

describe('Example of a POST', () => {
  it('This will send a post and get a result', (done) => {
    chai
      .request(baseURL)
      .post('/path/to/endpoint') // Where are we firing?
      .send({ token: authToken, date: '2017-09-18' }) // Send post data as JSON
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
});
