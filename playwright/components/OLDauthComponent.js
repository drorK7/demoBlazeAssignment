class AuthForm {
    constructor(page) {
      this.page = page;
    }
  
    async signUpModal() {
      const emailInput = await this.page.$('#sign-username');
      const passwordInput = await this.page.$('#sign-password');
      const submitButton = await this.page.$('button:text("Sign up")');
  
      return {
        emailInput,
        passwordInput,
        submitButton
      };
    }
    async loginModal() {
      const emailInput = await this.page.$('#loginusername');
      const passwordInput = await this.page.$('#loginpassword');
      const loginButton = await this.page.$('button:text("Log in")');
  
      return {
        emailInput,
        passwordInput,
        loginButton
      };
    }
  
    // Other methods...
  }
  
  module.exports = AuthForm;
  