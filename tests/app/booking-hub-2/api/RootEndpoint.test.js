/**
 * Runs arbitrary tests on GET /api endpoint
 * Test is a PoC, hence some hardcoded values in the code and no setup around abstractions of variables.
 */
const
    chai = require('chai'),
    chaiHttp = require('chai-http'),
    expect = require('chai').expect,
    jsonValidate = require('chai-json-schema');

chai.use(chaiHttp);
chai.use(jsonValidate);

const baseURL = 'http://bookinghub-2.dev.int';

describe('Checking Root endpoint for', function () {
    let response;
    /** Runs the API call and stores the response in response, does not run tests if before hook fails */
    before(function(done) {
        chai.request(baseURL)
        .get('/api')
        .end(function (err, res) {
            expect(err).to.be.null;
            response = res;
            done();
        }).timeout(10000);
    });

    /** Validates the response code from the server. */
    it('Status code is 200 OK', function (done) {
        expect(response).to.have.status(200);
        done();
    });

    /** Validates that the JSON follows a certain structure */
    it('JSON Schema structure is correct', function (done) {
        chai.tv4.addSchema("http://json-schema.org", "/draft-04/schema#");
        var schema = {"properties":{"_links":{"additionalProperties":false,"properties":{"profile":{"additionalProperties":false,"properties":{"href":{"type":"string"}},"required":["href"],"type":"object"},"query":{"additionalProperties":false,"properties":{"href":{"type":"string"},"title":{"type":"string"}},"required":["title","href"],"type":"object"},"self":{"additionalProperties":false,"properties":{"href":{"type":"string"}},"required":["href"],"type":"object"}},"required":["self","query","profile"],"type":"object"}},"required":["_links"],"type":"object"};
        expect(response.body).to.be.jsonSchema(schema);
        done();
    });
});