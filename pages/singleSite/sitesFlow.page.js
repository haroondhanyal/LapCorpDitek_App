import { expect } from '@playwright/test';
import { SingleSiteLocators } from '../../locators/SingleSite/single_Site.locators';
import { filePaths } from '../../utils/filePaths.js';

export class AddNewSitePage {

  constructor(page) {
    this.page = page;
  }

  // ⭐ PAGE OPEN
  async openSitesPage() {
    await this.page.goto('https://dev-labcorp.ditekapp.com/sites');
    await this.page.waitForURL(/\/sites/);

    await SingleSiteLocators.siteSelectionDropdown(this.page).waitFor();

    console.log('🟢 Sites page opened successfully');
  }

  // ⭐ CLICK ADD NEW SITE
  async clickAddNewSite() {

    await SingleSiteLocators.addNewSiteButton(this.page).click();

    // wait drawer/modal animation
    await this.page.waitForTimeout(500);

    // wait for Site Name field to ensure form is open
    await SingleSiteLocators.siteNameInput(this.page).waitFor({
      state: 'visible',
      timeout: 15000
    });

    console.log('🟢 Add New Site form opened');
  }

  // ⭐ SITE NUMBER
 async enterSiteNumber(value) {

  const input = SingleSiteLocators.siteNumberInput(this.page);

  await input.click({ force: true });
  await input.fill(String(value));

  
  console.log('🟢 Site Number entered:', value);
}


  // ⭐ SITE NAME
  async enterSiteName(value) {
    await SingleSiteLocators.siteNameInput(this.page).fill(value);
    console.log('🟢 Site Name entered:', value);
  }

  // ⭐ ADDRESS 1
  async enterSiteAddress1(value) {
    await SingleSiteLocators.siteAddress1Input(this.page).fill(value);
    console.log('🟢 Site Address 1 entered:', value);
  }

  // ⭐ ADDRESS 2
  async enterSiteAddress2(value) {
    await SingleSiteLocators.siteAddress2Input(this.page).fill(value);
    console.log('🟢 Site Address 2 entered:', value);
  }

  // ⭐ CITY
  async enterCity(value) {
    await SingleSiteLocators.siteCityInput(this.page).fill(value);
    console.log('🟢 City entered:', value);
  }

  // ⭐ STATE
  async enterState(value) {
    await SingleSiteLocators.siteStateInput(this.page).fill(value);
    console.log('🟢 State entered:', value);
  }

  // ⭐ ZIPCODE
  async enterZipCode(value) {
    await SingleSiteLocators.siteZipCodeInput(this.page).fill(String(value));
    console.log('🟢 Zip Code entered:', value);
  }

  // ⭐ ENABLE DIFFERENT BILLING CHECKBOX
  async enableDifferentBilling() {
    await SingleSiteLocators.differentBillingCheckbox(this.page).check();
    console.log('🟢 Different billing enabled');
  }

  // ⭐ BILLING ADDRESS 1
  async enterBillingAddress1(value) {
    await SingleSiteLocators.billingAddress1Input(this.page).fill(value);
    console.log('🟢 Billing Address 1 entered:', value);
  }

  // ⭐ BILLING ADDRESS 2
  async enterBillingAddress2(value) {
    await SingleSiteLocators.billingAddress2Input(this.page).fill(value);
    console.log('🟢 Billing Address 2 entered:', value);
  }

  // ⭐ BILLING CITY
  async enterBillingCity(value) {
    await SingleSiteLocators.billingCityInput(this.page).fill(value);
    console.log('🟢 Billing City entered:', value);
  }

  // ⭐ BILLING STATE
  async enterBillingState(value) {
    await SingleSiteLocators.billingStateInput(this.page).fill(value);
    console.log('🟢 Billing State entered:', value);
  }

  // ⭐ BILLING ZIP
  async enterBillingZipCode(value) {
    await SingleSiteLocators.billingZipCodeInput(this.page).fill(String(value));
    console.log('🟢 Billing Zip entered:', value);
  }

  // ⭐ BILLING COUNTRY
  async enterBillingCountry(value) {
    await SingleSiteLocators.billingCountryDropdown(this.page).fill(value);
    console.log('🟢 Billing Country entered:', value);
  }

  // ⭐ SAVE
  async clickSave() {
    await SingleSiteLocators.saveButton(this.page).click();
    console.log('🟢 Save clicked');
  }

  // ⭐ CANCEL
  async clickCancel() {
    await SingleSiteLocators.cancelButton(this.page).click();
    console.log('🟢 Cancel clicked');
  }

  // ⭐ GROUPED — SITE DETAILS
  async fillSiteDetails(data) {
    await this.enterSiteNumber(data.siteNumber);
    await this.enterSiteName(data.siteName);
    await this.enterSiteAddress1(data.siteAddress1);
    await this.enterSiteAddress2(data.siteAddress2);
    await this.enterCity(data.city);
    await this.enterState(data.state);
    await this.enterZipCode(data.zipcode);

    console.log('🟢 All site details filled');
  }

  // ⭐ GROUPED — BILLING DETAILS
  async fillBillingDetails(data) {
    await this.enterBillingAddress1(data.billingAddress1);
    await this.enterBillingAddress2(data.billingAddress2);
    await this.enterBillingCity(data.billingCity);
    await this.enterBillingState(data.billingState);
    await this.enterBillingZipCode(data.billingZipcode);
    await this.enterBillingCountry(data.country);

    console.log('🟢 All billing details filled');
  }

  // ⭐ FULL FLOW
  async completeAddNewSiteFlow(data) {

    await this.openSitesPage();

    await this.clickAddNewSite();

    // uncomment only if site number editable
    // await this.enterSiteNumber(data.siteNumber);

    await this.fillSiteDetails(data);

    await this.enableDifferentBilling();

    await this.fillBillingDetails(data);

    await this.clickSave();

    console.log('🏁 Add New Site flow completed successfully');
  }
}
