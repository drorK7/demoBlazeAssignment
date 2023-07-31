class CatalogPage {
  constructor(page) {
    this.page = page;
    this.signUpButton = '#signin2';
    this.loginButton = '#login2';
    this.homeHeaderButtonSelector = 'a[href]:has-text("Home")';
    this.cartHeaderButtonSelector = '#cartur';
    this.logoutHeaderButtonSelector = 'a[href]:has-text("Log out")';
    this.userNameElementSelector = '#nameofuser';
  }

  async clickSignUpButton() {
    await this.page.click(this.signUpButton);
  }

  async clickLoginButton() {
    await this.page.click(this.loginButton);
  }

  async clickHomeHeaderButton() {
    await this.page.click(this.homeHeaderButtonSelector);
  }

  async clickCartHeaderButton() {
    await this.page.click(this.cartHeaderButtonSelector);
  }

  async clickLogoutHeaderButton() {
    await this.page.click(this.logoutHeaderButtonSelector);
  }

  async getUserName() {
    const userNameElement = await this.page.$(this.userNameElementSelector);
    const userNameText = await this.page.textContent(userNameElement);
    return userNameText;
  }
}

module.exports = CatalogPage;
