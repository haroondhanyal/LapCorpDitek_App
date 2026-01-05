import { DirectToPatientLocators } 
  from '../../locators/DirectPatient/directToPatient.locators.js';

export class SitesPage {

  constructor(page) {
    this.page = page;
  }

  async openSitesPage() {
    await this.page.goto('https://dev-labcorp.ditekapp.com/sites');
    await this.page.waitForURL(/\/sites/);

    await DirectToPatientLocators.sitesHeading(this.page).waitFor();

    console.log('🟢 Sites page opened successfully');
  }

async clickAddNewSite() {

  await DirectToPatientLocators.addNewSiteButton(this.page).click();

  // wait drawer / modal animation
  await this.page.waitForTimeout(500);

  // wait for Site Number field
//    await DirectToPatientLocators.siteNumberInput(this.page).waitFor();
//   await DirectToPatientLocators.siteNumberInput(this.page).waitFor({
//     state: 'visible',
//     timeout: 30000
//   });

  console.log('🟢 Add New Site form opened');
}

//   async clickAddNewSite() {
//     await DirectToPatientLocators.addNewSiteButton(this.page).click();

//     // wait form appears
//     await DirectToPatientLocators.siteNumberInput(this.page).waitFor();
//   }

  async enterSiteNumber(value) {

  const input = DirectToPatientLocators.siteNumberInput(this.page);

  await input.scrollIntoViewIfNeeded();

  // MUI ko focus dena zaroori
  await input.click({ force: true });

  // clear previous auto value "0"
  await input.fill('');

  // value must be string
  await input.type(String(value), { delay: 50 });

  console.log('🟢 Site Number entered:', value);
}

  async enterSiteName(value) {
    await DirectToPatientLocators.siteNameInput(this.page).fill(value);
  }

  async enterAddressLine1(value) {
    await DirectToPatientLocators.siteAddress1Input(this.page).fill(value);
  }

  async enterAddressLine2(value) {
    await DirectToPatientLocators.siteAddress2Input(this.page).fill(value);
  }

  async enterCity(value) {
    await DirectToPatientLocators.siteCityInput(this.page).fill(value);
  }

  async enterState(value) {
    await DirectToPatientLocators.siteStateInput(this.page).fill(value);
  }

async enterZipCode(value) {
  await this.page
    .locator('input[name="siteZipcode"]')
    .fill(String(value));

  console.log('🟢 Zip code entered:', value);
}


  async enableDifferentBillingAddress() {
    await DirectToPatientLocators
      .differentBillingAddressCheckbox(this.page)
      .check();
  }

  async enterBillingAddress1(value) {
    await DirectToPatientLocators.billingAddress1Input(this.page).fill(value);
  }

  async enterBillingAddress2(value) {
    await DirectToPatientLocators.billingAddress2Input(this.page).fill(value);
  }

  async enterBillingCity(value) {
    await DirectToPatientLocators.billingCityInput(this.page).fill(value);
  }

  async enterBillingState(value) {
    await DirectToPatientLocators.billingStateInput(this.page).fill(value);
  }

async enterBillingZipCode(value) {
  await this.page
    .locator('input[name="billingZipCode"]')
    .fill(String(value));

  console.log('🟢 Billing Zip entered:', value);
}

  async enterCountry(value) {
    await DirectToPatientLocators.countryInput(this.page).fill(value);
  }

  async clickSave() {
    await DirectToPatientLocators.saveButton(this.page).click();
  }

  async clickCancel() {
    await DirectToPatientLocators.cancelButton(this.page).click();
  }

async exportSites() {
  const btn = DirectToPatientLocators.exportButton(this.page);

  await btn.waitFor({ state: 'visible', timeout: 15000 });

  await btn.click();

  console.log('🟢 Export button clicked');
}

  async downloadAsCsv() {
    await DirectToPatientLocators.downloadAsTxtButton(this.page).click();

    console.log('🟢 Download as CSV button clicked');
  }

  // ⭐ COMPLETE FLOW
  async createSite(data) {

    await this.clickAddNewSite();

    await this.enterSiteNumber(data.siteNumber);
    await this.enterSiteName(data.siteName);
    await this.enterAddressLine1(data.siteAddress1);
    await this.enterAddressLine2(data.siteAddress2);
    await this.enterCity(data.siteCity);
    await this.enterState(data.siteState);
    await this.enterZipCode(data.siteZipCode);

    await this.enableDifferentBillingAddress();

    await this.enterBillingAddress1(data.billingAddress1);
    await this.enterBillingAddress2(data.billingAddress2);
    await this.enterBillingCity(data.billingCity);
    await this.enterBillingState(data.billingState);
    await this.enterBillingZipCode(data.billingZipCode);

    await this.enterCountry(data.country);
    // await this.clickCancel();
    // console.log('🏁 form cancelled successfully');

    await this.clickSave();

    console.log('🏁 New site created successfully');
    await this.exportSites();
    console.log('🏁 Going to export site');

    await this.downloadAsCsv();
    console.log('🏁 Sites downloaded as CSV successfully');

  }
}
