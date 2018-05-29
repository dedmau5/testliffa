/**
 * Runs arbitrary tests on GET /api/query endpoint
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

describe('Checking query endpoint for', function() {
    let response;
    /** Runs the API call and stores the response in response, does not run tests if before hook fails */
    before(function (done) {
        chai.request(baseURL)
        .get('/api/query')
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
        var schema = {"properties":{"_links":{"additionalProperties":false,"properties":{"flight-offers":{"additionalProperties":false,"properties":{"href":{"type":"string"},"templated":{"type":"boolean"},"title":{"type":"string"}},"required":["title","templated","href"],"type":"object"},"preselected-extras":{"additionalProperties":false,"properties":{"href":{"type":"string"},"templated":{"type":"boolean"},"title":{"type":"string"}},"required":["title","templated","href"],"type":"object"},"price-calculation-codes":{"additionalProperties":false,"properties":{"href":{"type":"string"},"title":{"type":"string"}},"required":["title","href"],"type":"object"},"profile":{"additionalProperties":false,"properties":{"href":{"type":"string"}},"required":["href"],"type":"object"},"self":{"additionalProperties":false,"properties":{"href":{"type":"string"}},"required":["href"],"type":"object"}},"required":["flight-offers","price-calculation-codes","preselected-extras","self","profile"],"type":"object"}},"required":["_links"],"type":"object"};
        expect(response.body).to.have.jsonSchema(schema);
        done();
    });
});