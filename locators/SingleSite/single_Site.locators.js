// ⭐ Single Site – All Locators in one place

export const SingleSiteLocators = {

  // ----------------------------
  // ⭐ CLIENT DETAILS
  // ----------------------------

  planName: page =>
    page.getByRole('textbox', { name: 'Plan Name*' }),

  planAddress: page =>
    page.getByRole('textbox', { name: 'Plan Address*' }),

  city: page =>
    page.getByRole('textbox', { name: 'City*' }),

  state: page =>
    page.getByRole('textbox', { name: 'State*' }),

  zipCode: page =>
    page.getByRole('textbox', { name: 'Zip Code*' }),

  // ----------------------------
  // ⭐ ATN / CONTACT DETAILS
  // ----------------------------

  contactName: page =>
    page.getByRole('textbox', { name: /Contact's name to receive order/i }),

  contactPhone: page =>
    page.getByRole('textbox', { name: /Contact's Phone/i }),

  contactAddress: page =>
    page.getByRole('textbox', { name: /Contact's Address/i }),

  specialInstructions: page =>
    page.getByRole('textbox', { name: 'Special Instructions (Optional)' }),

  // ----------------------------
  // ⭐ UPLOAD CSV
  // ----------------------------

  csvFileInput: page =>
    page.locator('input[type="file"][accept*=".csv"]'),

  // ----------------------------
  // ⭐ CUSTOM REQUISITION CHECKBOX
  // ----------------------------

  customRequisitionCheckbox: page =>
    page.locator('input.PrivateSwitchBase-input.css-j8yymo'),
//   page.getByRole('checkbox'),

  // ----------------------------
  // ⭐ MAILING DETAILS
  // ----------------------------

  mailDate: page =>
    page.getByRole('textbox', { name: 'Mail Date' }),

  labTicket: page =>
    page.getByRole('textbox', { name: 'Lab Ticket' }),

  // ----------------------------
  // ⭐ ACTION BUTTONS
  // ----------------------------

  placeOrderButton: page =>
    page.getByRole('button', { name: 'Place Order' }),

  submitAdditionalOrderButton: page =>
    page.getByRole('button', { name: 'Submit Additional Order' }),

  // ----------------------------
  // ⭐ VIEW ORDER (If exists)
  // ----------------------------

  viewOrderByLabTicket: page =>
    page.getByRole('textbox', { name: 'Lab Ticket' }),

  viewOrderButton: page =>
    page.getByRole('button', { name: 'View Order' }),

  // ⭐ Tabs
  sitesTab: page =>
    page.getByRole('link', { name: 'Sites' }),

  // ⭐ Buttons
  addNewSiteButton: page =>
    page.getByRole('button', { name: 'Add New Site' }),

  cancelButton: page =>
    page.getByRole('link', { name: 'Cancel' }),

  saveButton: page =>
    page.getByRole('button', { name: 'Save' }),

  // ⭐ Site Details
  siteSelectionDropdown: page =>
    page.getByRole('heading', { name: 'Sites' }),

  
  siteNumberInput: page =>
    page.locator('input[name="siteNumber"]'),

  siteNameInput: page =>
    page.locator('input[name="siteName"]'),

  siteAddress1Input: page =>
    page.locator('input[name="siteAddress"]'),

  siteAddress2Input: page =>
    page.locator('input[name="siteAddress2"]'),

  siteCityInput: page =>
    page.locator('input[name="siteCity"]'),

  siteStateInput: page =>
    page.locator('input[name="siteState"]'),

  siteZipCodeInput: page =>
    page.locator('input[name="siteZipcode"]'),

  // ⭐ Billing checkbox
  differentBillingCheckbox: page =>
    page.getByLabel('Different Billing Address'),

  // ⭐ Billing Address Fields

  billingAddress1Input: page =>
    page.locator('[name="billingAddressLine1"]'),

  billingAddress2Input: page =>
    page.locator('[name="billingAddressLine2"]'),

  billingCityInput: page =>
    page.locator('input[name="billingCity"]'),

  billingStateInput: page =>
    page.locator('input[name="billingState"]'),

  billingZipCodeInput: page =>
    page.locator('input[name="billingZipCode"]'),

  billingCountryDropdown: page =>
    page.locator('[name="countryForAddress"]'),

};
