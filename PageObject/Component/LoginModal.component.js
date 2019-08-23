import { context } from './../../data/context';

class LoginModal {
    constructor(element) {
        this.element = element;
    }

    get modalTitle() { return this.element.$('form > h3'); }
    get emailInput() { return this.element.$('form > fieldset > label > input'); }
    get passwordInput() { return this.element.$('form > fieldset > div > label > input'); }
    get submitBtn() { return this.element.$('form > fieldset > div > div > button'); }

    login() {
        this.emailInput.setValue(context.accountInfo.user.email);
        this.passwordInput.setValue(context.accountInfo.user.password);
        this.submitBtn.click();
    }
}

export default LoginModal;