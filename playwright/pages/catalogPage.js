class CatalogPage {
    constructor(page) {
      this.page = page;
    }
  
    async getSignUpButton() {
        this.page.click('#signin2')
    }
    async getLoginButton(){
        this.page.click('#login2')
    }
    async homeHeaderButton(){
      this.page.click('a[href]:has-text("Home")')
    }
    async cartHeaderButton(){
      this.page.click('#cartur')
  }
  async logoutHeaderButton(){
    this.page.click('a[href]:has-text("Log out")')
  }
    async getUserName(){
        const userNameElement = await page.$('#nameofuser');
        const userNameText = await page.textContent(userNameElement);
        return userNameText;
      }
    }
  
  module.exports = CatalogPage;
  
  