import { oncologyLocators } 
  from '../../locators/Oncology/oncology.locators.js';

export class OncologyBulkOrderPage {

  constructor(page) {
    this.page = page;
  }

  // ============================
  // 🧭 OPEN ONCOLOGY MODULE
  // ============================
 async openOncologyModule() {

  const btn = oncologyLocators.oncologyModule(this.page);

  // 🤚 if button not present, skip
  if (!(await btn.isVisible())) {
    console.log('ℹ️ Oncology module button NOT visible — skipping click');
    return;
  }

  await btn.click();
  console.log('🟢 Oncology module opened');
}


  // ============================
  // 🛒 CREATE BULK ORDER
  // ============================
  async clickCreateBulkOrders() {
    await oncologyLocators.createBulkOrdersButton(this.page).click();
    console.log('🟢 Create Bulk Orders clicked');
  }

  async addToCart() {
    await oncologyLocators.addToCartButton(this.page).click();
    console.log('🟢 Add To Cart clicked');
  }

  async openCart() {
    await oncologyLocators.cartIcon(this.page).click();
    console.log('🟢 Cart opened');
  }

async goToCheckout() {
  await oncologyLocators.goToCheckoutButton(this.page).click();
  console.log('🟢 Go To Checkout clicked');
}


  // ============================
  // 🧾 CUSTOMER PO NUMBER
  // ============================
async enterCustomerPO(poNumber) {

  const po = oncologyLocators.customerPONumber(this.page);

  // wait that Order Details header appears (correct page)
  await this.page.getByText('Order Information').waitFor({
    timeout: 60000
  });

  // close any cart drawer overlay if present
  await this.page.keyboard.press('Escape').catch(() => {});

  // scroll field into view (important)
  await po.scrollIntoViewIfNeeded();

  // wait for textbox HTML to attach
  await po.waitFor({ state: 'attached', timeout: 60000 });

  // wait until visible
  await po.waitFor({ state: 'visible', timeout: 60000 });

  await po.click({ force: true });

  await po.fill(poNumber);

  console.log('🟢 Customer PO entered:', poNumber);
}

  // ============================
  // ⚡ EXPEDITED ORDER
  // ============================
  async enableExpeditedOrder() {
    await oncologyLocators.expeditedOrderCheckbox(this.page).check();
    console.log('🟢 Expedited Order enabled');
  }

  // ============================
  // 🚚 SHIPPING INFO
  // ============================
  async selectShippingCountry() {
    await oncologyLocators.shippingCountryDropdown(this.page).click();
    await this.page.getByText('United States').click();

    console.log('🟢 Shipping country selected');
  }

  async selectShippingMethod() {
    await oncologyLocators.shippingMethodDropdown(this.page).click();
    await this.page.getByText('FedEx').click();

    console.log('🟢 Shipping method selected');
  }

  async enableFedExOvernight() {
    await oncologyLocators.fedexOvernightCheckbox(this.page).check();
    console.log('🟢 FedEx Overnight selected');
  }

  // ============================
  // 👤 CONTACT INFO
  // ============================
 async fillContactInformation(data) {

  await oncologyLocators.contactName(this.page).fill(data.contactName);
  await oncologyLocators.contactEmail(this.page).fill(data.contactEmail);
  await oncologyLocators.contactPhone(this.page).fill(data.contactPhone);

  console.log('🟢 Contact information filled');
}
  // ============================
  // 🏠 SHIPPING ADDRESS
  // ============================
  async fillShippingAddress(data) {

  await oncologyLocators.shippingCustomerName(this.page)
    .fill(data.shippingName);

  await oncologyLocators.shippingNumber(this.page)
    .fill(data.shippingNumber);

  await oncologyLocators.shippingAddress1(this.page)
    .fill(data.shippingAddress1);

  await oncologyLocators.shippingAddress2(this.page)
    .fill(data.shippingAddress2);

  await oncologyLocators.shippingCity(this.page)
    .fill(data.shippingCity);

  console.log('🟢 Shipping address filled');
}



  // ============================
  // 🚀 PLACE ORDER
  // ============================
  async placeOrder() {
    await oncologyLocators.placeOrderButton(this.page).click();
    console.log('🟢 Oncology Order Placed');
  }

  // ============================
  // 🎯 COMPLETE FULL FLOW
  // ============================
  async completeOncologyBulkOrder(data) {

    await this.openOncologyModule();

    await this.clickCreateBulkOrders();
    await this.addToCart();
    await this.openCart();
    await this.goToCheckout();

    await this.enterCustomerPO(data.poNumber);
    await this.enableExpeditedOrder();

    await this.selectShippingCountry();
    await this.selectShippingMethod();
    await this.enableFedExOvernight();

    await this.fillContactInformation(data);
    await this.fillShippingAddress(data.shipping);

    await this.placeOrder();
  }
}
