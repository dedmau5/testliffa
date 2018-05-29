import { Translate } from '../tools';
import { baseUrls } from '../confs/urls';

class Page {
  static goTo(url) {
    browser.url(url);
  }

  static get title() {
    return browser.getTitle();
  }

  static get url() {
    return browser.getUrl();
  }

  static open(path) {
    browser.options.baseUrl = Translate(baseUrls[browser.options.tc.environment]);

    browser.url(`/${path || ''}`);
  }
}

export default Page;
