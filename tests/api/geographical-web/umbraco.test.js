import { expect } from 'chai';
import fetch from 'isomorphic-fetch';

// define settings
const settings = {
  hosts: {
    loadbalancer: 'http://vingse-umb.prod.dmz',
    server1: 'http://vingse101-umb.prod.dmz',
    server2: 'http://vingse102-umb.prod.dmz',
    server3: 'http://vingse103-umb.prod.dmz',
    server4: 'http://vingse104-umb.prod.dmz',
    server5: 'http://vingse105-umb.prod.dmz',
    server6: 'http://vingse106-umb.prod.dmz',
  },
  path: '/umbraco/UFO/AttributeCollection/Get?alias=geoappfacts&caller=geographical-webVN',
};


describe('Umbraco - Attribute collection', () => {
  // iterate properties in hosts and test them
  // eslint-disable-next-line guard-for-in, no-restricted-syntax
  for (const host in settings.hosts) {
    const currentHost = settings.hosts[host]; // get value form the current property
    const currentUrl = `${currentHost}${settings.path}`;

    it(`Can recieve data for "facts" - On ${host} \n\t ${currentUrl}`, async () => {
      const response = await fetch(currentUrl);
      expect(response.status).to.equals(200);
    });
  }
});
