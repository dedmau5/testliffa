import { expect } from 'chai';
import fetch from 'isomorphic-fetch';

// define settings
const settings = {
  hosts: {
    public: 'https://geographical-web.ving.se',
    loadbalancer: 'http://geographical-web.prod.dmz',
    server1: 'http://geographical-web101.prod.dmz',
    server2: 'http://geographical-web102.prod.dmz',
    server3: 'http://geographical-web103.prod.dmz',
    server4: 'http://geographical-web104.prod.dmz',
    server5: 'http://geographical-web105.prod.dmz',
    server6: 'http://geographical-web106.prod.dmz',
  },
};


describe('Geographical web - Standalone', () => {
  // iterate properties in hosts and test them
  // eslint-disable-next-line guard-for-in, no-restricted-syntax
  for (const host in settings.hosts) {
    const currentHost = settings.hosts[host]; // get value form the current property

    // eslint-disable-next-line no-loop-func
    it(`Can recieve status code 200 - On ${host} \n\t ${currentHost}`, async () => {
      const response = await fetch(currentHost);
      expect(response.status).to.equals(200);
    });
  }
});
