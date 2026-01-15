export const oncologyLocators = {

  oncologyModule: page =>
    page.getByRole('button', { name: 'Oncology' }),

  createBulkOrdersButton: page =>
    page.getByRole('button', { name: 'Create Bulk Orders' }),

  addToCartButton: page =>
    page.getByRole('button', { name: 'Add to Cart' }),

  cartIcon: page =>
    page.getByRole('img', { name: 'Cart' }),

  goToCheckoutButton: page =>
    page.getByRole('button', { name: 'Go to Checkout' }),

  headerCheckoutButton: page =>
    page.locator('button').filter({ hasText: 'Checkout' }).first(),

  // 🧾 Customer PO Number
  // =================================================
 customerPONumber: page =>
  page.locator('input[name="customerPO"]'),

  // =================================================
  // ⚡ Expedited Order Toggle
  // =================================================
  expeditedOrderCheckbox: page =>
    page.locator('input[name="isExpedited"]'),

  // =================================================
  // 🚚 Shipping Information
  // =================================================

  // Country dropdown (Select Option...)
  shippingCountryDropdown: page =>
    page.locator('span').filter({ hasText: 'Select Option...' }).first(),

  // Shipping Method dropdown (Select Option...)
  shippingMethodDropdown: page =>
    page.locator('div').filter({ hasText: 'Select Option...' }).first(),

  // FedEx Overnight checkbox
  fedexOvernightCheckbox: page =>
    page.locator('//input[@name="fedExOvernight"]'),

  // =================================================
  // 👤 Contact Information
  // =================================================

  contactName: page =>
    page.locator('//input[@name="contactName"]'),

  contactEmail: page =>
    page.getByRole('textbox', { name: 'Enter Email' }),

  contactPhone: page =>
    page.getByRole('textbox', { name: 'Enter Phone No.' }),

  // =================================================
  // 🏠 Customer Shipping Address
  // =================================================

  shippingCustomerName: page =>
    page.locator('//input[@name="shippingName"]'),

  shippingNumber: page =>
    page.locator('input[name="shippingNumber"]'),

  shippingAddress1: page =>
    page.locator('input[name="shippingAddress1"]'),

  shippingAddress2: page =>
    page.locator('input[name="shippingAddress2"]'),

  shippingCity: page =>
    page.locator('input[name="shippingCity"]'),

  // Country selection in address (if separate dropdown)
  shippingCountry: page =>
    page.locator('input[name="shippingCountry"]'),

  placeOrderButton: page =>
    page.getByRole('button', { name: 'Place Order' }),

  // Sites tab
  sitesTab: page =>
    page.getByRole('link', { name: 'Sites' }),

  // Add New Site button
  addNewSiteButton: page =>
    page.getByRole('button', { name: 'Add New Site' }),

  // Site group selection (Labcorp)
  siteGroupLabcorp: page =>
    page.getByText('Labcorp', { exact: true }),

  // Site Number
  siteNumber: page =>
    page.locator('[name="siteNumber"]'),

  // Site Name
  siteName: page =>
    page.getByRole('textbox', { name: 'Site Name' }),

  // Address 1
  address1: page =>
    page.getByRole('textbox', { name: 'Address 1' }),

  // Address 2
  address2: page =>
    page.getByRole('textbox', { name: 'Address 2' }),

  // City
  city: page =>
    page.getByRole('textbox', { name: 'City' }),

  // State
  state: page =>
    page.getByRole('textbox', { name: 'State' }),

  // Zip Code
  zipCode: page =>
    page.getByRole('textbox', { name: 'Zip Code' }),

  // Cancel button
  cancelButton: page =>
    page.getByRole('button', { name: 'Cancel' }),

  // Save button
  saveButton: page =>
    page.getByRole('button', { name: 'Save' })
};
