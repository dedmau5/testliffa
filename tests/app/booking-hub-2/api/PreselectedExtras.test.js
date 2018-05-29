/**
 * Runs arbitrary tests on GET /api/query/preselected-extras? endpoint
 * Test is a PoC, hence some hardcoded values in the code and no setup around abstractions of variables.
 */
const
chai = require('chai'),
chaiHttp = require('chai-http'),
expect = require('chai').expect,
jsonValidate = require('chai-json-schema');

chai.use(chaiHttp);
chai.use(jsonValidate);

const baseURL = 'http://bookinghub-2.dev.int'; // Should be handled as a variable and set from config. 

describe('Checking Preselected Extras endpoint for', function() {
    let response;
    /** Runs the API call and stores the response in response, does not run tests if before hook fails */
    before(function(done) {
        chai.request(baseURL)
        .get('/api/query/preselected-extras?MarketUnitKey=VS&TripType=OneWay&SessionData=')
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
        var schema = {"$schema":"http://json-schema.org/draft-04/schema#","additionalProperties":false,"definitions":{},"properties":{"_embedded":{"additionalProperties":false,"properties":{"preselected-extra":{"items":{"additionalProperties":false,"properties":{"_links":{"additionalProperties":false,"properties":{"profile":{"additionalProperties":false,"properties":{"href":{"type":"string"}},"required":["href"],"type":"object"},"self":{"additionalProperties":false,"properties":{"href":{"type":"string"}},"required":["href"],"type":"object"}},"required":["self","profile"],"type":"object"},"disabled":{"type":"boolean"},"displayGroup":{"type":["null","string"]},"name":{"type":"string"},"preSelectedExtraKey":{"type":"string"}},"required":["displayGroup","name","preSelectedExtraKey","_links","disabled"],"type":"object"},"type":"array"}},"required":["preselected-extra"],"type":"object"},"_links":{"additionalProperties":false,"properties":{"profile":{"additionalProperties":false,"properties":{"href":{"type":"string"}},"required":["href"],"type":"object"},"self":{"additionalProperties":false,"properties":{"href":{"type":"string"}},"required":["href"],"type":"object"}},"required":["self","profile"],"type":"object"}},"required":["_embedded","_links"],"type":"object"};
        expect(response.body).to.have.jsonSchema(schema);
        done();
    });
});