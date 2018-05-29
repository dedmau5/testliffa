import { StartPage } from '../../../../pages/start-page';

import { CanNavigateToLogin } from './can-navigate-to-login';
import { CanEnterEmailAndPassword } from './can-enter-email-and-password';
import { CanLogin, CanLogout } from './login-logout';

describe(
  'Testing Login and Logout Functionality',

  function () {
    this.bail(true);
    StartPage.open();
    browser.sessionStorage('POST', { key: 'DT_TESTNAME', value: '*** webdriverio *** Testing Login / Logout' });
    browser.sessionStorage('POST', { key: 'DT_TESTRUNID', value: 'UID' });
    CanNavigateToLogin();
    CanEnterEmailAndPassword();
    CanLogin();
    CanLogout();
  }
);
