import { Translate } from './tools';


class Auth {
    get email() {
        return "owautotest1@ving.se";
    }

    get password() {
        return "Sommar14";
    }

    get phone() {
        return Translate({
            dk: "+46700000000000",
            fi: "+46700000000000",
            no: "+46700000000000",
            se: "+46700000000000",
            globe: "+46700000000000"
        });
    }
}

export default new Auth();