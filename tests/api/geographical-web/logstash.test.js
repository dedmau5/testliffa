import { expect } from 'chai';
import fetch from 'isomorphic-fetch';

// define settings
const settings = {
  hosts: {
    loadbalancer: 'http://logstash.prod.int:28779/',
    server1: 'http://logstash1.prod.int:28779/',
    server2: 'http://logstash2.prod.int:28779/',
  },
};


describe('Logstash - Attribute collection', () => {
  // iterate properties in hosts and test them
  // eslint-disable-next-line guard-for-in, no-restricted-syntax
  for (const host in settings.hosts) {
    const currentHost = settings.hosts[host]; // get value form the current property

    // eslint-disable-next-line no-loop-func
    it(`Can recieve 'ok' response - On ${host} \n\t ${currentHost}`, async () => {
      const response = await fetch(currentHost);
      const text = await response.text();

      expect(response.status).to.equals(200);
      expect(text).to.equals('ok');
    });
  }
});
