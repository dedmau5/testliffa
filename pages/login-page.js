import PageBase from './page-base.js';


class _LoginPage extends PageBase {
    get title() {
        if (!this._title) {
            this._title = browser.getTitle();
        }

        return this._title;
    }

    get usernameInput() {
        if (!this._usernameInput) {
            this._usernameInput = browser.element("#loginContainer input[id*=UserName]");
        }

        return this._usernameInput;
    }

    set usernameInput(username) {
        if (!this._usernameInput) {
            this._usernameInput = browser.element("#loginContainer input[id*=UserName]");
        }

        this._usernameInput.setValue(username);
    }

    get passwordInput() {
        if (!this._passwordInput) {
            this._passwordInput = browser.element("#loginContainer input[id*=PassWord]");
        }

        return this._passwordInput;
    }

    set passwordInput(password) {
        if (!this._passwordInput) {
            this._passwordInput = browser.element("#loginContainer input[id*=PassWord]");
        }

        this._passwordInput.setValue(password);
    }

    get menu() {
        return {
            click: () => {
                const buttonIconMenuSelector = "div > button.icon.menu";

                browser.waitForExist(buttonIconMenuSelector, 30000);
                browser.element(buttonIconMenuSelector).click();
                browser.waitForExist("div.out-of-body.is-expanded > div.blanket", 10000);
            }
        };
    }

    get loginButton() {
        if (!this._loginButton) {
            this._loginButton = browser.element("#loginContainer input[id*=LoginButton]");
        }

        return this._loginButton;
    }
}

/**
 * @type {_LoginPage}
 */
export const LoginPage = new _LoginPage();
