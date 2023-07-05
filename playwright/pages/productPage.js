class ProductPage {
    constructor(page) {
      this.page = page;
    }
  
    async clickAddToCartButton() {
        this.page.click('a[href="#"]:has-text("Add to cart")')
    }
    async pickItem(itemName){
        this.page.click(`.hrefch:has-text("${itemName}")`)
    }
    async clickNextPage(){
      this.page.click('button#next2')
    }
  }
    module.exports = ProductPage;

  
  