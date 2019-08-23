class LoginModal {
    constructor(element) {
        this.element = element;
    }

    get modalTitle() { return this.element.$('form > h3'); }
    get emailInput() { return this.element.$('form > fieldset > label > input'); }
    get passwordInput() { return this.element.$('form > fieldset > div > label > input'); }
    get submitBtn() { return this.element.$('form > fieldset > div > div > button'); }

    login() {
        this.emailInput.setValue('compass9012@gmail.com');
        this.passwordInput.setValue('Takehome1234567890');
        this.submitBtn.click();
    }
}

export default LoginModal;