import chai from 'chai';
import chaiHttp from 'chai-http';
import jsonValidate from 'chai-json-schema';
import easysoap from 'easysoap';

const { expect } = chai;

chai.use(chaiHttp);
chai.use(jsonValidate);

const settings = {
  host: {
    loadbalancer: 'http://contentws.prod.int/',
    server1: 'http://contentws101.prod.int/',
    server2: 'http://contentws102.prod.int/',
  },
  path: '/ErrorWriter.asmx',
  wsdl: '/ErrorWriter.asmx?WSDL',
};

describe('Content Ws - Error writer', () => {
  it('Can recieve list of available functions via SOAP - Via loadbalancer', async () => {
    // create the client
    const host = settings.host.loadbalancer;
    const { path, wsdl } = settings;
    const soapClient = easysoap.createClient({ host, path, wsdl });

    // get all available functions
    const functionArray = await soapClient.getAllFunctions();

    expect(functionArray).length.to.be.at.least(1);
  });

  it('Can recieve list of available functions via SOAP - On server 1', async () => {
    // create the client
    const host = settings.host.server1;
    const { path, wsdl } = settings;
    const soapClient = easysoap.createClient({ host, path, wsdl });

    // get all available functions
    const functionArray = await soapClient.getAllFunctions();

    expect(functionArray).length.to.be.at.least(1);
  });

  it('Can recieve list of available functions via SOAP - On server 2', async () => {
    // create the client
    const host = settings.host.server2;
    const { path, wsdl } = settings;
    const soapClient = easysoap.createClient({ host, path, wsdl });

    // get all available functions
    const functionArray = await soapClient.getAllFunctions();

    expect(functionArray).length.to.be.at.least(1);
  });
});
