import { expect } from 'chai';
import fetch from 'isomorphic-fetch';

// define soap params
const settings = {
  hosts: {
    loadbalancer: 'http://tripdefinitionmanagerws.prod.int',
    server1: 'http://tripdefinitionmanagerws01.prod.int',
    server2: 'http://tripdefinitionmanagerws02.prod.int',
    server3: 'http://tripdefinitionmanagerws03.prod.int',
    server4: 'http://tripdefinitionmanagerws04.prod.int',
  },
  path: '/TripDefinitionManagerWS.svc',
  // wsdl: '/TripDefinitionManagerWS.svc?wsdl',
};


describe('Trip definition manager', () => {
  // iterate properties in hosts and test them
  // eslint-disable-next-line guard-for-in, no-restricted-syntax
  for (const host in settings.hosts) {
    const currentHost = settings.hosts[host]; // get value form the current property
    const currentUrl = `${currentHost}${settings.path}`;

    it(`Can recieve list of available functions via SOAP - On ${host} \n\t ${currentUrl}`, async () => {
      const response = await fetch(currentUrl);
      expect(response.status).to.equals(200);
    });
  }
});
