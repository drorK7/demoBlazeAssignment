class CartPage {
    constructor(page) {
      this.page = page;
      this.placeOrderButton = 'button:text("Place Order")';
      this.placeOrderModal = new PlaceOrderModal(page); // Create an instance of PlaceOrderModal
    }
  
    async validateElement(selector) {
      try {
        const element = await this.page.waitForSelector(selector);
        expect(element).toBeTruthy(); // Assert that the element is found on the page
      } catch (error) {
        throw new Error(`Element with selector ${selector} not found.`);
      }
    }
  
    async cartTableValidate(productName) {
      const productNameSelector = `td:has-text("${productName}")`;
      await this.validateElement(productNameSelector);
    }
  
    async totalPriceValidate(price) {
      const totalPriceSelector = `.panel-title:has-text("${price}")`;
      await this.validateElement(totalPriceSelector);
    }
  
    async clickPlaceOrderButton() {
      await this.page.click(this.placeOrderButton); // Fix the click method to use the correct selector
    }
  
    async clickCloseButton() {
      await this.placeOrderModal.clickCloseButton(); // Call the clickCloseButton method from PlaceOrderModal
    }
  }
  
  class PlaceOrderModal {
    constructor(page) {
      this.page = page;
      this.closeButton = 'div#orderModal button:text("Close")';
    }
  
    async validateElement(selector) {
      try {
        const element = await this.page.waitForSelector(selector);
        expect(element).toBeTruthy(); // Assert that the element is found on the page
      } catch (error) {
        throw new Error(`Element with selector ${selector} not found.`);
      }
    }
  
    async totalPriceModalValidate(price) {
      const totalPriceSelector = `#totalm:has-text("${price}")`;
      await this.validateElement(totalPriceSelector);
    }
  
    async clickCloseButton() {
      await this.page.waitForSelector(this.closeButton);
      await this.page.click(this.closeButton);
    }
  }
  
  module.exports = { CartPage, PlaceOrderModal };
  