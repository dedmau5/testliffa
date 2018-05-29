import { Translate, isMobile } from '../../../../tools/index';
import { LoginPage } from '../../../../pages/login-page';
import Header from '../../../../pages/apps/header-footer/header/header';
import { StartPage } from '../../../../pages/start-page';

export function CanNavigateToLogin() {
  it('Can navigate to login', function () {
    StartPage.open();
    if (isMobile()) {
      LoginPage.menu.click();
    }
    browser.pause(2000);
    Header.navigation.navigateTo(Translate({
      dk: 'Min side',
      fi: 'Kirjaudu',
      no: 'Min side',
      se: 'Min sida',
      globe: 'Min sida',
    }));
    browser.pause(3000);
    LoginPage.title.should.contain(Translate({
      dk: 'Min Side - Spies Rejser!',
      fi: 'Kirjaudu sisään Tjäreborgin Omille sivuille',
      no: 'Logg inn på Min side | Ving',
      se: 'Min sida - Din personliga sida hos Ving',
      globe: '',
    }));
  });
}