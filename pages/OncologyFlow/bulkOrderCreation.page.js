import { oncologyLocators } from '../../locators/Oncology/oncology.locators';

export class BulkOrderCreationPage {

  constructor(page) {
    this.page = page;
  }

  async openOncologyModule() {
    await oncologyLocators.oncologyModule(this.page).click();
  }

  async clickCreateBulkOrders() {
    await oncologyLocators.createBulkOrdersButton(this.page).click();
  }

  async addToCart() {
    await oncologyLocators.addToCartButton(this.page).click();
  }

  async openCart() {
    await oncologyLocators.cartIcon(this.page).click();
  }

  async goToCheckout() {
    await oncologyLocators.goToCheckoutButton(this.page).click();
  }

  async headerCheckout() {
    await oncologyLocators.headerCheckoutButton(this.page).click();
  }

  async placeOrder() {
    await oncologyLocators.placeOrderButton(this.page).click();
  }

  // 👇 full flow shortcut
  async completeBulkOrderFlow() {
    await this.openOncologyModule();
    await this.clickCreateBulkOrders();
    await this.addToCart();
    await this.openCart();
    await this.goToCheckout();
    await this.placeOrder();
  }
}
