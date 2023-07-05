class SignUpModal {
  constructor(page) {
    this.page = page;
  }
  

  async enterUsername(username) {
    await this.page.fill('#sign-username', username);
  }
  async enterPassword(username) {
    await this.page.fill('#sign-password', username);
  }
  async clickSignupButton() {
    await this.page.click('button:text("Sign up")');
  }
}

class LoginModal {
    constructor(page) {
      this.page = page;
    }
    
    async enterUsername(username) {
      await this.page.fill('#loginusername', username);
    }
    
    async enterPassword(password) {
      await this.page.fill('#loginpassword', password);
    }
    
    async clickLoginButton() {
        await this.page.click('#logInModal button:has-text("Log in")');

    }
  }
  module.exports = {
    SignUpModal,
    LoginModal
  }