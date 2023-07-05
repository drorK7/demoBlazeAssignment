const { chromium } = require('playwright');
const { setupTest , searchAndClickNextPage } = require('../utils.js');
const CatalogPage = require('../pages/catalogPage.js');
const testConfig  = require('../config.js');
const {SignUpModal , LoginModal}  = require('../components/authComponent.js')
const ProductPage = require('../pages/productPage.js')
const {validateViewData , validateCartData, addToCart, loginAPI} = require('../api/apiRequest.js');

describe('This is a UI test flow containing several tests in 1 file.', () => {

  let catalogPage;
  let productPage;
  let signUpModal;
  let username = testConfig.username;
  let password = testConfig.password;
  let loginModal
  let page;

  beforeAll(async () => {
    const { page: testPage } = await setupTest();
    page = testPage
    catalogPage = new CatalogPage(page);
    signUpModal = new SignUpModal(page)
    loginModal = new LoginModal(page)
    productPage = new ProductPage(page)
    await page.goto(testConfig.baseUrl);
  }, 10000);

  it('Create new user', async () => {

    await catalogPage.getSignUpButton();
    await page.waitForSelector('#sign-username');
    await signUpModal.enterUsername(username)
    await signUpModal.enterPassword(password)
    await signUpModal.clickSignupButton()
  });

  it('Login to the system', async () => {
    await catalogPage.getLoginButton();
    await page.waitForSelector('#loginusername');
    await loginModal.enterUsername(username)
    await page.waitForSelector('#loginpassword');
    await loginModal.enterPassword(password)
    await loginModal.clickLoginButton()
  });
  it('Add Iterms to cart', async () => {
  await page.waitForTimeout(1000);
  await productPage.pickItem('Nexus 6')
  await page.waitForTimeout(1000);
  await productPage.clickAddToCartButton()
  await page.waitForTimeout(1000);
  catalogPage.homeHeaderButton()
  await page.waitForTimeout(1000);
  await productPage.clickNextPage()
  await page.waitForTimeout(1000);
  await productPage.pickItem('MacBook Pro')
  await page.waitForTimeout(1000);
  await productPage.clickAddToCartButton()
  await page.waitForTimeout(2000);

  });
  it('Move to cart and validate cart', async () => {
    catalogPage.cartHeaderButton()
    await page.waitForTimeout(4000);
    expect(await page.$('td:has-text("Nexus 6")')).toBeTruthy()
    expect(await page.$('td:has-text("MacBook Pro")')).toBeTruthy();
    expect(await page.$('.panel-title:has-text("1750")')).toBeTruthy();


  
    });
    it('Place an order', async () => {
      await page.click('button:text("Place Order")');
      await page.waitForTimeout(1000);
      expect(await page.$('#totalm:has-text("Total: 1750")')).toBeTruthy();
      await page.click('div#orderModal button:text("Close")');
      await page.waitForTimeout(3000);
      while (await page.$('.success')) {
        await page.click('a[href="#"]:has-text("Delete")');
        await page.waitForTimeout(5000)
      }
    })
      it('API Testing', async () => {
        await loginAPI(page,username,password)
        await addToCart(page)
        await validateCartData(page,1) //validate items amount in cart (1 item)
        await validateViewData(page) // validate the cart view and the item in the cart
      })
    })


