import { oncologyLocators } from '../../locators/Oncology/oncology.locators.js';

export class SitesOncologyPage {
  constructor(page) {
    this.page = page;
  }

  // ============================
  // 🧭 OPEN SITES TAB
  // ============================
  async openSitesTab() {
    await oncologyLocators.sitesTab(this.page).click();
    console.log('🟢 Sites tab opened');
  }

  // ============================
  // ➕ CLICK ADD NEW SITE
  // ============================
  async clickAddNewSite() {
    await oncologyLocators.addNewSiteButton(this.page).click();
    console.log('🟢 Add New Site clicked');
  }

  // ============================
  // 🏷 SELECT SITE GROUP
  // ============================
 async selectSiteGroup() {
  await oncologyLocators.siteGroupLabcorp(this.page).click();

  // wait for backend + UI rendering
  await this.page.waitForLoadState('networkidle');

  console.log('🟢 Site group selected: Labcorp');
}

  // ============================
  // 📝 FILL SITE DETAILS
  // ============================
 async fillSiteDetails(data) {
  const siteNameInput = oncologyLocators.siteName(this.page);

  // await expect(siteNameInput).toBeVisible({ timeout: 20000 });

  await oncologyLocators.siteNumber(this.page).fill(data.siteNumber);
  await siteNameInput.fill(data.siteName);
  await oncologyLocators.address1(this.page).fill(data.address1);
  await oncologyLocators.address2(this.page).fill(data.address2);
  await oncologyLocators.city(this.page).fill(data.city);
  await oncologyLocators.state(this.page).fill(data.state);
  await oncologyLocators.zipCode(this.page).fill(data.zipCode);
}
  // ============================
  // 💾 SAVE SITE
  // ============================
  async saveSite() {
    await oncologyLocators.saveButton(this.page).click();
    console.log('🟢 Site saved');
  }

  // ============================
  // ❌ CANCEL SITE CREATION
  // ============================
  async cancelSite() {
    await oncologyLocators.cancelButton(this.page).click();
    console.log('🟡 Site creation cancelled');
  }

  // ============================
  // 🔁 COMPLETE FLOW (UTILITY)
  // ============================
  async createNewSite(data) {
    await this.openSitesTab();
    await this.clickAddNewSite();
    await this.selectSiteGroup();
    await this.page.waitForTimeout(500); 
    await this.fillSiteDetails(data);
    await this.saveSite();
  }
}
