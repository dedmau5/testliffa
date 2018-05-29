import chai from 'chai';
import chaiHttp from 'chai-http';
import jsonValidate from 'chai-json-schema';
import easysoap from 'easysoap';

const { expect } = chai;

chai.use(chaiHttp);
chai.use(jsonValidate);

const settings = {
  host: {
    loadbalancer: 'http://independentws-ver3.prod.int',
    server1: 'http://independentws-ver3.prod.int',
    server2: 'http://independentws-ver3.prod.int',
  },
  path: '/IndependentService.asmx',
  wsdl: '/IndependentService.asmx?WSDL',
};

describe('Independent service', () => {
  it('Can recieve list with available functions via SOAP - Via loadbalancer', async () => {
    // create the client
    const host = settings.host.loadbalancer;
    const { path, wsdl } = settings;
    const soapClient = easysoap.createClient({ host, path, wsdl });

    // get all available functions
    const functionArray = await soapClient.getAllFunctions();

    // get all available functions
    expect(functionArray).to.include('GetPackagesByAvailability');
    expect(functionArray).to.include('GetPackagesFromLatestSearch');
  });

  it('Can recieve list with available functions via SOAP - On server 1', async () => {
    // create the client
    const host = settings.host.server1;
    const { path, wsdl } = settings;
    const soapClient = easysoap.createClient({ host, path, wsdl });

    // get all available functions
    const functionArray = await soapClient.getAllFunctions();

    // get all available functions
    expect(functionArray).to.include('GetPackagesByAvailability');
    expect(functionArray).to.include('GetPackagesFromLatestSearch');
  });

  it('Can recieve list with available functions via SOAP - On server 2', async () => {
    // create the client
    const host = settings.host.server2;
    const { path, wsdl } = settings;
    const soapClient = easysoap.createClient({ host, path, wsdl });

    // get all available functions
    const functionArray = await soapClient.getAllFunctions();

    // get all available functions
    expect(functionArray).to.include('GetPackagesByAvailability');
    expect(functionArray).to.include('GetPackagesFromLatestSearch');
  });

  it('Can get method parameters for "GetPackagesByAvailability"', async () => {
    const host = settings.host.loadbalancer;
    const { path, wsdl } = settings;
    const soapClient = easysoap.createClient({ host, path, wsdl });

    // get the method params by given methodName
    const methodParams = await soapClient.getMethodParamsByName('GetPackagesByAvailability');

    // eslint-disable-next-line no-unused-expressions
    expect(methodParams.request).to.not.be.empty;
  });
});
