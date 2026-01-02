export const DirectToPatientLocators = {

  // ===============================
  // 🧾 Plan / Site Details
  // ===============================
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

  // ===============================
  // 👤 Contact Details
  // ===============================
  contactName: page =>
    page.getByRole('textbox', {
      name: /Contact's name to receive order/i
    }),

  contactPhone: page =>
    page.getByRole('textbox', {
      name: /Contact's Phone/i
    }),

  contactAddress: page =>
    page.getByLabel(/Contact's Address/i),

  // ===============================
  // 📝 Optional Instructions
  // ===============================
  specialInstructions: page =>
    page.getByRole('textbox', {
      name: /Special Instructions/i
    }),

  // ===============================
  // 📅 Mail Date
  // ===============================
  mailDate: page =>
    page.getByLabel('Mail Date', { exact: true }),

  // ===============================
  // 📄 Lab Ticket
  // ===============================
  labTicket: page =>
    page.getByRole('textbox', { name: 'Lab Ticket' }),

  // ===============================
  // 📎 CSV Upload
  // ===============================
  csvFileInput: page =>
    page.locator('input[type="file"][accept*=".csv"]'),

  // =================================================
  // 🧾 AFTER CSV – ADDITIONAL / PATIENT RELATED FIELDS
  // =================================================

  // ✏️ Enter Notes
  enterNotes: page =>
    page.getByRole('textbox', { name: 'Enter Notes' }),

  // 🧾 Custom Requisition (INPUT – XPath as requested)
  customRequisitionInput: page =>
    page.locator(
      'body > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > ' +
      'div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > ' +
      'div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ' +
      'div:nth-child(1) > span:nth-child(1) > input:nth-child(1)'
    ),

  // 👤 Patient Details INPUT (XPath)
  patientDetailsInput: page =>
    page.locator(
      'body > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > ' +
      'div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > ' +
      'div:nth-child(1) > div:nth-child(4) > div:nth-child(1) > ' +
      'div:nth-child(1) > span:nth-child(1) > input:nth-child(1)'
    ),

  // 👁️ View Patient Details button
  viewPatientDetailsButton: page =>
    page.getByRole('button', { name: 'View Patient Details' }),

  // ❌ Close Patient Details popup
  closePatientDetailsIcon: page =>
    page.getByTestId('CloseIcon'),

  // ===============================
  // 📎 Upload Template (PDF / DOC)
  // ===============================
  uploadTemplateLabel: page =>
    page.getByText('Upload Template'),

  pdfFileInput: page =>
    page.locator(
      'label:has-text("Upload Template") input[type="file"]'
    ),

  // ===============================
  // ✅ Place Order
  // ===============================
  placeOrderButton: page =>
    page.getByRole('button', { name: 'Place Order' }),

   // 🧾 Order Confirmation Modal
  orderConfirmationModal: page =>
    page.getByText('Order Confirmation', { exact: true }),

  submitAdditionalOrderButton: page =>
    page.getByRole('button', { name: 'Submit Additional Order' }),


  viewOrderButton: page =>
    page.getByRole('button', { name: 'View Order' }),

  // Now i want to view the order which i have submitted so i can verify the details

ordersLink: page =>
    page.getByRole('link', { name: 'Orders' }),
// ordersLink: page =>
//   page.locator("//span[normalize-space()='Orders']"),

// select th plan name from orders list to verify
planNames: page =>
  page.locator('[role="row"] >> [data-field="planName"] a, [role="row"] >> [data-field="planName"]'),

filtersClick: page =>
page.getByRole('button', { name: 'Show filters' }),

// order open button 
 orderViewAt: (page, index) =>
    page.locator('[data-field="view"] button').nth(index),
 // order CSV file download
csvFileDownloadButton: page =>
page.getByRole('button', { name: 'Download CSV' }),

// order XLS file download
xlsFileDownloadButton: page =>


page.getByRole('button', { name: 'Download XLS' }),

// show patient details button
showPatientDetailsButton: page =>
page.getByRole('button', { name: 'Show Patient Details' }),

 // ⭐ Combo box
  purposeDropdown: page =>
    page.locator('//div[@role="combobox"]'),

  // ⭐ Dropdown options
  purposeVerifyOrder: page =>
    page.locator('li:has-text("To Verify Order")'),

  purposeUpdateRecords: page =>
    page.getByText('To Update Records', { exact: true }),

  purposeAuthorizedUserRequest: page =>
    page.getByText('Authorized User Request', { exact: true }),

  purposeOther: page =>
    page.getByText('Other Purpose', { exact: true }),

  // hide patient details button
hidePatientDetailsButton: page =>

page.getByRole('button', { name: 'Hide Patient Details' }),

// view file button in order details
viewFileButton: page =>
page.getByRole('button', { name: 'View File' }),

// close file view icon
closeFileViewIcon: page =>

page.getByTestId('CloseIcon'),
////// sites locators below

// -------------------- SITES PAGE --------------------

 // Sites heading
  sitesHeading: page =>
    page.getByRole('heading', { name: 'Sites' }),

  // Add New Site button
  addNewSiteButton: page =>
    page.getByRole('button', { name: 'Add New Site' }),

  // ⭐ THIS is the correct one — label based
  siteNumberInput: page =>
     page.locator('input[name="siteNumber"]'),

  siteNameInput: page =>
    page.getByRole('textbox', { name: /Site Name/i }),

  siteAddress1Input: page =>
    page.locator('input[name="siteAddress"]'),

  siteAddress2Input: page =>
    page.locator('input[name="siteAddress2"]'),

  siteCityInput: page =>
    page.locator('[name="siteCity"]'),

  siteStateInput: page =>
    page.locator('[name="siteState"]'),

  siteZipCodeInput: page =>
    page.getByPlaceholder('Site Zipcode'),
    // page.locator('input[name="siteZipcode"]'),

  differentBillingAddressCheckbox: page =>
    page.getByLabel('Different Billing Address'),

  billingAddress1Input: page =>
    page.locator('[name="billingAddressLine1"]'),

  billingAddress2Input: page =>
    page.locator('[name="billingAddressLine2"]'),

  billingCityInput: page =>
    page.locator('[name="billingCity"]'),

  billingStateInput: page =>
    page.locator('[name="billingState"]'),

  billingZipCodeInput: page =>
    page.locator('input[name="billingZipCode"]'),

  countryInput: page =>
    page.locator('input[name="countryForAddress"]'),

  saveButton: page =>
    page.getByText('Save', { exact: true }),

  cancelButton: page =>
    page.getByText('Cancel', { exact: true }),

  // export the file of site 
exportButton: page =>
page.getByText('Export', { exact: true }),

// download as text 
downloadAsTxtButton: page =>
page.getByText('Download as CSV')



}
