import { Translate, isMobile } from '../../../../tools/index';
import { LoginPage } from '../../../../pages/login-page';
import { MyPage } from '../../../../pages/apps/my-page/index';

const timeout = 50000;

export function CanLogin() {
  it(`Can login within ${timeout / 1000} s`, function () {
    this.timeout(timeout);
    this.slow(timeout / 2);
    LoginPage.loginButton.click();
  });
}

export function CanLogout() {
  it(`Can logout within ${timeout / 1000} s`, function () {

    this.timeout(timeout);
    this.slow(timeout / 2);

    const currentUrl = browser.getUrl();
    MyPage.logOutButton.click();

    browser.waitUntil(() => {
      return browser.getUrl() !== currentUrl;
    }, timeout);

    if (isMobile()) {
      LoginPage.menu.click();
    }

    LoginPage.title.should.equal(Translate({
      dk: 'Min Side - Spies Rejser!',
      fi: 'Kirjaudu sisään Tjäreborgin Omille sivuille',
      no: 'Logg inn på Min side | Ving',
      se: 'Min sida - Din personliga sida hos Ving',
      globe: '',
    }));
  });
}
