class ProductPage {
  constructor(page) {
    this.page = page;
    this.addToCartButton = 'a[href="#"]:has-text("Add to cart")';
    this.nextPageSelector = 'button#next2'
  }

  getProductName(productName) {
    this.productNameSelector = `.hrefch:has-text("${productName}")`;
    return this.productNameSelector;
  }

  async clickAddToCartButton() {
    await this.page.click(this.addToCartButton);
  }

  async pickItem(itemName) {
    await this.page.click(this.getProductName(itemName));
  }

  async clickNextPage() {
    await this.page.click(this.nextPageSelector, {force:true});
  }
}

module.exports = ProductPage;
