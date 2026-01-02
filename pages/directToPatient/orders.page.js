import { DirectToPatientLocators } 
  from '../../locators/DirectPatient/directToPatient.locators.js'

export class OrdersVerificationPage {
  constructor(page) {
    this.page = page
  }

 async goToOrders() {

  await this.page.waitForLoadState('networkidle');

  // 1️⃣ Direct Orders URL open karo
  await this.page.goto('https://dev-labcorp.ditekapp.com/orders');

  // 2️⃣ URL verify
  await this.page.waitForURL(/\/orders/, { timeout: 15000 });

  // 3️⃣ Orders page heading/table wait
  await this.page.getByRole('heading', { name: 'All Orders' }).waitFor({
  timeout: 15000
});
  console.log('🟢 Orders page opened directly by URL');
}

  // ⭐⭐ NEW → filters click function ⭐⭐
  async filtersClick() {

  const filterBtn = this.page.getByRole('button', { name: /filter/i });

  await filterBtn.waitFor({ state: 'visible', timeout: 15000 });
  await filterBtn.click();

  console.log('🟢 Filters button clicked');
}

async openOrderByIndex(index = 0) {

  // 0️⃣ wait for any loader overlays
  await this.page.locator('[class*="loader"], [class*="overlay"]').first().waitFor({
    state: 'hidden',
    timeout: 60000
  });

  // 1️⃣ locate row (skip header row)
  const row = this.page.locator('[role="row"]').nth(index + 1);

  await row.waitFor({ state: 'visible', timeout: 30000 });

  // 2️⃣ hover → reveal hidden action buttons (MUI tables need this)
  await row.hover();

  // 3️⃣ locate VIEW button inside same row
  const viewButton = row.locator('button:has(svg)'); // safer than nth()

  // ensure visible
  await viewButton.scrollIntoViewIfNeeded();
  await viewButton.waitFor({ state: 'visible', timeout: 30000 });

  // 4️⃣ WAIT for loader overlay to disappear again before clicking
  await this.page.locator('[class*="loader"], [class*="overlay"]').first().waitFor({
    state: 'hidden',
    timeout: 60000
  });

  // 5️⃣ CLICK
  await viewButton.click();

  console.log(`🟢 Opened order at index ${index}`);
}

async csvFileDownload() {
  const downloadPromise = this.page.waitForEvent('download');
  await DirectToPatientLocators.csvFileDownloadButton(this.page).click();
  await downloadPromise;   // bas wait kar lo
}
async xlsFileDownload() {
  const downloadPromise = this.page.waitForEvent('download');
  await DirectToPatientLocators.xlsFileDownloadButton(this.page).click();
  await downloadPromise;   // bas wait kar lo
}

async showPatientDetails() {
  await DirectToPatientLocators
    .showPatientDetailsButton(this.page)
    .click();

  console.log('🟢 View Patient Details button clicked');
};
async handleProtectedAccessPopup(optionIndex = 0) {

  // wait for popup
  await this.page.getByText('Protected Information Access').waitFor();

  // open dropdown
  await this.page.locator('//div[@role="combobox"]').click();

  // option list (index based)
  const options = [
    'To Verify Order',           // 0
    'To Update Records',         // 1
    'Authorized User Request',   // 2
    'Other Purpose'              // 3
  ];

  // select based on your choice
  await this.page.getByText(options[optionIndex], { exact: true }).click();

  console.log('✅ Selected option:', options[optionIndex]);

  // click View Patient Details
  const viewBtn = this.page.getByRole('button', { name: 'View Patient Details' });
  await viewBtn.waitFor();
  await viewBtn.click();

  console.log('🟢 Patient details opened successfully');
}

async hidePatientDetails() {
  await DirectToPatientLocators
    .hidePatientDetailsButton(this.page)
    .click();

  console.log('🟢 Hide Patient Details button clicked')};



  async openCloseFileView() {
    // click View File button
    await DirectToPatientLocators
      .viewFileButton(this.page)
      .click();

    console.log('🟢 View File button clicked');

    // click Close icon
    await DirectToPatientLocators
      .closeFileViewIcon(this.page)
      .click();

    console.log('🟢 Close File view icon clicked') };
  }