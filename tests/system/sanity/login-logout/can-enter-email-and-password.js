import Auth from '../../../../auth';
import { LoginPage } from '../../../../pages/login-page';

export function CanEnterEmailAndPassword() {
  it('Can enter e-mail and password', function () {
    LoginPage.usernameInput = Auth.email;
    LoginPage.passwordInput = Auth.password;
  });
}
