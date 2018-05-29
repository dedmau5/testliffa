/**
 * HAL+JSON returns href's in the response, using these to navigate further down the rabbit hole.
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
let response;

describe('Running flows from root', function() {

    describe('Starting at Root', function() {

        before(function (done) {
            chai.request(baseURL)
            .get('/api')
            .end(function (err, res) {
                expect(err).to.be.null;
                response = res;
                done();
            }).timeout(10000);
        });

        it('Status code is 200 OK', function (done) {
            expect(response).to.have.status(200);
            done();
        });

        it('Content-type is HAL+JSON', function (done) {
            expect(response).to.have.header('Content-Type', 'application/hal+json');
            done();
        });

        it('JSON schema structure', function (done) {
            let jsonSchema = {"$schema":"http://json-schema.org/draft-04/schema#","additionalProperties":false,"definitions":{},"properties":{"_links":{"additionalProperties":false,"properties":{"profile":{"additionalProperties":false,"properties":{"href":{"type":"string"}},"required":["href"],"type":"object"},"query":{"additionalProperties":false,"properties":{"href":{"type":"string"},"title":{"type":"string"}},"required":["title","href"],"type":"object"},"self":{"additionalProperties":false,"properties":{"href":{"type":"string"}},"required":["href"],"type":"object"}},"required":["self","query","profile"],"type":"object"}},"required":["_links"],"type":"object"};
            expect(response.body).to.have.jsonSchema(jsonSchema);
            done();
        });
    });

    describe('Use linkes in response to navigate to Query', function() {
        
        before(function (done) {
            chai.request(response.body["_links"]["query"]["href"])
            .get('')
            .end(function (err, res) {
                response = undefined;
                expect(err).to.be.null;
                response = res;
                done();
            }).timeout(10000);
        });

        it('Status code is 200 OK', function (done) {    
            expect(response).to.have.status(200);
            done();
        });

        it('Content-type is HAL+JSON', function(done) {
            expect(response).to.have.header('Content-Type', 'application/hal+json');
            done();
        });

        it('JSON schema structure', function (done) {
            let jsonSchema = {"$schema":"http://json-schema.org/draft-04/schema#","additionalProperties":false,"definitions":{},"properties":{"_links":{"additionalProperties":false,"properties":{"flight-offers":{"additionalProperties":false,"properties":{"href":{"type":"string"},"templated":{"type":"boolean"},"title":{"type":"string"}},"required":["title","templated","href"],"type":"object"},"preselected-extras":{"additionalProperties":false,"properties":{"href":{"type":"string"},"templated":{"type":"boolean"},"title":{"type":"string"}},"required":["title","templated","href"],"type":"object"},"price-calculation-codes":{"additionalProperties":false,"properties":{"href":{"type":"string"},"title":{"type":"string"}},"required":["title","href"],"type":"object"},"profile":{"additionalProperties":false,"properties":{"href":{"type":"string"}},"required":["href"],"type":"object"},"self":{"additionalProperties":false,"properties":{"href":{"type":"string"}},"required":["href"],"type":"object"}},"required":["flight-offers","price-calculation-codes","preselected-extras","self","profile"],"type":"object"}},"required":["_links"],"type":"object"};
            expect(response.body).to.have.jsonSchema(jsonSchema);
            done();
        });
    });

    describe('Use linkes in response to navigate to Price calculations codes', function() {
        
        before(function (done) {
            chai.request(response.body["_links"]["price-calculation-codes"]["href"])
            .get('')
            .end(function (err, res) {
                response = undefined;
                expect(err).to.be.null;
                response = res;
                done();
            }).timeout(10000);
        });

        it('Status code is 200 OK', function (done) {
            expect(response).to.have.status(200);
            done();
        });

        it('Content-type is HAL+JSON', function (done) {
            expect(response).to.have.header('Content-Type', 'application/hal+json');
            done();
        });

        it('JSON schema structure', function (done) {
            let jsonSchema = {"$schema":"http://json-schema.org/draft-04/schema#","additionalProperties":false,"definitions":{},"properties":{"_embedded":{"additionalProperties":false,"properties":{"price-calculation-code":{"additionalItems":false,"items":{"additionalProperties":false,"properties":{"_links":{"additionalProperties":false,"properties":{"profile":{"additionalProperties":false,"properties":{"href":{"type":"string"}},"required":["href"],"type":"object"}},"required":["profile"],"type":"object"},"code":{"type":"string"},"enabled":{"type":"boolean"},"name":{"type":"string"},"selected":{"type":"boolean"},"type":{"type":"string"}},"required":["type","_links","enabled","selected","name","code"],"type":"object"},"type":"array"}},"required":["price-calculation-code"],"type":"object"},"_links":{"additionalProperties":false,"properties":{"profile":{"additionalProperties":false,"properties":{"href":{"type":"string"}},"required":["href"],"type":"object"}},"required":["profile"],"type":"object"}},"required":["_embedded","_links"],"type":"object"};
            expect(response.body).to.have.jsonSchema(jsonSchema);
            done();
        });
    });
});