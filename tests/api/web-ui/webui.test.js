import { expect } from 'chai';
import fetch from 'isomorphic-fetch';

// define settings
const settings = {
  hosts: {
    public: 'https://webui.ving.se',
    loadbalancer: 'http://webui.prod.int',
    server1: 'http://webui101.prod.int',
    server2: 'http://webui102.prod.int',
  },
  path: {
    cssInfo: '/latest/json',
  },
};

const state = {
  cssPath: null,
};

describe('WebUI - Meta data', () => {
  it(`Can recieve url to latest css version \n\t ${settings.hosts.loadbalancer}${settings.path.cssInfo}`, async () => {
    const url = `${settings.hosts.loadbalancer}${settings.path.cssInfo}`;

    const response = await fetch(url);
    const data = await response.json();
    state.cssPath = data.css;

    expect(response.status).to.equals(200);
    expect(data.css).to.not.be.empty;
  });
});

describe('WebUI - Css file', () => {
  before('Make sure we did get path to css-file in previous step.', function () {
    if (!state.cssPath) {
      this.skip();
    }
  });

  // iterate properties in hosts and test them
  // eslint-disable-next-line guard-for-in, no-restricted-syntax
  for (const host in settings.hosts) {
    const currentHost = settings.hosts[host]; // get value form the current property

    it(`Can recieve css - On ${host} \n\t ${currentHost} ...`, async () => {
      const currentUrl = `${currentHost}${state.cssPath}`;

      const response = await fetch(currentUrl);
      const data = await response.text();

      expect(response.status).to.equals(200, `Can't recieve css on ${currentHost}${state.cssPath}`);
      expect(data.length).to.be.at.least(1000, `Can't recieve css on ${currentHost}${state.cssPath}`);
    });
  }
});
