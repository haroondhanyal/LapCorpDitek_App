import { expect } from '@playwright/test';
import { SingleSiteLocators } from '../../locators/SingleSite/single_Site.locators';
import { filePaths } from '../../utils/filePaths.js'

export class SingleSitePage {

  constructor(page) {
    this.page = page;
  }


  // ⭐ fill client details section
  async fillClientDetails(data) {

    await SingleSiteLocators.planName(this.page).fill(data.planName);
    await SingleSiteLocators.planAddress(this.page).fill(data.planAddress);
    await SingleSiteLocators.city(this.page).fill(data.city);
    await SingleSiteLocators.state(this.page).fill(data.state);
    await SingleSiteLocators.zipCode(this.page).fill(data.zipCode);

    console.log('🟢 Client details filled');
  }

  // ⭐ fill ATN / Contact section
  async fillContactDetails(data) {

    await SingleSiteLocators.contactName(this.page).fill(data.contactName);
    await SingleSiteLocators.contactPhone(this.page).fill(data.contactPhone);
    await SingleSiteLocators.contactAddress(this.page).fill(data.contactAddress);

    if (data.specialInstructions) {
      await SingleSiteLocators.specialInstructions(this.page).fill(data.specialInstructions);
    }

    console.log('🟢 Contact details filled');
  }

  // ⭐ upload CSV
 
   async uploadCsv(filePath) {

  await SingleSiteLocators
    .csvFileInput(this.page)
      .setInputFiles(filePaths.csvSample)

    console.log('🟢 CSV uploaded')
}


  // ⭐ enable Custom Requisition checkbox

async enableCustomRequisition() {
   const checkbox = SingleSiteLocators.customRequisitionCheckbox(this.page);

//   await checkbox.waitFor({ state: 'visible', timeout: 15000 });

  await checkbox.click({ force: true });

  console.log('🟢 Custom Requisition enabled');
}

async fillMailAndLabTicket(data, mailDate) {

  // default to today if not passed
  mailDate = mailDate || new Date().toLocaleDateString('en-US');

  // ⭐ Mail Date
  const mailDateInput = SingleSiteLocators.mailDate(this.page);
  await mailDateInput.waitFor({ state: 'visible' });
  await mailDateInput.evaluate((el, v) => {
    el.removeAttribute('readonly');
    el.value = v;
    el.dispatchEvent(new Event('change', { bubbles: true }));
  }, mailDate);

  // ⭐ Lab Ticket
  await SingleSiteLocators.labTicket(this.page).fill(data.labTicket);

  console.log('🟢 Mail date & lab ticket entered');
}


  // ⭐ place order

async placeOrder() {

  const button = SingleSiteLocators.placeOrderButton(this.page);

  // 1️⃣ scroll to button
  await button.scrollIntoViewIfNeeded();

  // 2️⃣ wait until visible
  await button.waitFor({ state: 'visible' });
  await this.page.waitForTimeout(500);

  // 3️⃣ click
  try {
    await button.click();
  } catch {
    await button.locator('..').click({ force: true });
  }

  // 4️⃣ check enabled state
  console.log(
    await this.page
      .getByRole('button', { name: /place order/i })
      .isEnabled()
  );
}

// view order 
    async viewOrder() { 
      await SingleSiteLocators.viewOrderButton(this.page).click();
      console.log('🟢 View Order clicked');
    }

  // ⭐ additional order
  async submitAdditionalOrder() {
    await SingleSiteLocators.submitAdditionalOrderButton(this.page).click();
    console.log('🟢 Additional order submitted');
  }

  // ⭐ FULL E2E FLOW (single call)
  async completeSingleSiteFlow(data) {

     // already navigated after group select
  await this.page.waitForLoadState('networkidle');

  // wait until plan name textbox appears
  await SingleSiteLocators.planName(this.page)
    .waitFor({ state: 'visible', timeout: 30000 });

    await this.fillClientDetails(data);

    await this.fillContactDetails(data);

    await this.uploadCsv(data.csvPath);

    // await this.enableCustomRequisition();
await this.fillMailAndLabTicket(data, data.mailDate);

    await this.placeOrder();

    await this.viewOrder();

    // await this.submitAdditionalOrder();

  console.log('🟢 Single Site E2E flow completed')  ;
  }
}
