import { DirectToPatientLocators } 
  from '../../locators/DirectPatient/directToPatient.locators.js'
import { filePaths } from '../../utils/filePaths.js'

export class DirectToPatientPage {
  constructor(page) {
    this.page = page
  }

  // =================================================
  // 🧾 PLAN / SITE DETAILS
  // =================================================
  async fillPlanDetails(data) {
    await DirectToPatientLocators.planName(this.page).fill(data.planName)
    await DirectToPatientLocators.planAddress(this.page).fill(data.planAddress)
    await DirectToPatientLocators.city(this.page).fill(data.city)
    await DirectToPatientLocators.state(this.page).fill(data.state)
    await DirectToPatientLocators.zipCode(this.page).fill(data.zipCode)
  }

  // =================================================
  // 👤 CONTACT DETAILS
  // =================================================
  async fillContactDetails(data) {
    await DirectToPatientLocators.contactName(this.page).fill(data.contactName)
    await DirectToPatientLocators.contactPhone(this.page).fill(data.contactPhone)

    const address = DirectToPatientLocators.contactAddress(this.page)
    if (await address.count() > 0) {
      await address.first().fill(data.contactAddress)
    }
  }

  // =================================================
  // 📝 OPTIONAL FIELDS
  // =================================================
  async fillSpecialInstructions(instructions) {
    if (instructions) {
      await DirectToPatientLocators
        .specialInstructions(this.page)
        .fill(instructions)
    }
  }

  async selectMailDate(mailDate) {
    if (mailDate) {
      await DirectToPatientLocators.mailDate(this.page).fill(mailDate)
    }
  }

  async fillLabTicket(labTicket) {
    if (labTicket) {
      await DirectToPatientLocators.labTicket(this.page).fill(labTicket)
    }
  }

  // =================================================
  // 📎 CSV
  // =================================================
  async uploadCsv() {
    await DirectToPatientLocators
      .csvFileInput(this.page)
      .setInputFiles(filePaths.csvSample)

    console.log('🟢 CSV uploaded')
  }

  async uploadInvalidCsv(filePath) {
    await DirectToPatientLocators
      .csvFileInput(this.page)
      .setInputFiles(filePath)

    console.log('🟥 Invalid CSV uploaded')
  }

  // =================================================
  // 🧾 AFTER CSV
  // =================================================
  async enterNotes(notes) {
    if (notes) {
      await DirectToPatientLocators.enterNotes(this.page).fill(notes)
      console.log('🟢 Notes entered')
    }
  }

  async enableCustomRequisition() {
    await DirectToPatientLocators.customRequisitionInput(this.page).click()
    console.log('🟢 Custom Requisition enabled')
  }

  async enablePatientDetails() {
    await DirectToPatientLocators.patientDetailsInput(this.page).click()
  }

  async viewPatientDetails() {
    await DirectToPatientLocators.viewPatientDetailsButton(this.page).click()
  }

  async ClosePatientDetails() {
    await DirectToPatientLocators.closePatientDetailsIcon(this.page).click()
  }

  // =================================================
  // 📎 PDF
  // =================================================
  async uploadPdfTemplate() {
    await DirectToPatientLocators
      .pdfFileInput(this.page)
      .setInputFiles(filePaths.pdfSample)

    console.log('🟢 PDF uploaded')
  }

  // =================================================
  // ❌ COMMON VALIDATION (NEGATIVE)
  // =================================================
  async getValidationError() {
    const error = this.page.locator(
      '.error-message, .validation-error, [role="alert"]'
    )

    await error.first().waitFor({ state: 'visible', timeout: 10000 })
    return await error.first().innerText()
  }

  async isNotesErrorVisible() {
    return await this.page
      .locator('#notes-error, .notes-error')
      .isVisible()
      .catch(() => false)
  }

  async isCustomRequisitionErrorVisible() {
    return await this.page
      .locator('#custom-requisition-error, .custom-requisition-error')
      .isVisible()
      .catch(() => false)
  }

  // =================================================
  // 🚀 PLACE ORDER
  // =================================================
  async placeOrder() {
    await this.page.locator('div[class*="loaderOverlay"]').waitFor({
      state: 'hidden',
      timeout: 60000
    })

    const button =
      DirectToPatientLocators.placeOrderButton(this.page)

    await button.waitFor({ state: 'visible' })
    await this.page.waitForLoadState('networkidle')
    await button.click()

    console.log('🟢 Place Order clicked')
  }

  // =================================================
  // ✅ POSITIVE CONFIRMATION
  // =================================================
  async handleOrderConfirmation() {
    const modal =
      DirectToPatientLocators.orderConfirmationModal(this.page)

    try {
      await modal.waitFor({ state: 'visible', timeout: 60000 })
      await DirectToPatientLocators
        .submitAdditionalOrderButton(this.page)
        .click()
    } catch {
      console.log('⚠ Order confirmation not shown')
    }
  }

  async isOrderConfirmationVisible() {
    try {
      return await DirectToPatientLocators
        .orderConfirmationModal(this.page)
        .isVisible()
    } catch {
      return false
    }
  }

  // =================================================
  // 🔁 BASE FLOW FOR NEGATIVE TESTS
  // =================================================
  async completeNegativeBaseFlow(data) {
    await this.fillPlanDetails(data)
    await this.fillContactDetails(data)
    await this.selectMailDate(data.mailDate)
    await this.fillLabTicket(data.labTicket)
  }

  // =================================================
  // ✅ COMPLETE POSITIVE FLOW
  // =================================================
  async completeDirectToPatientFlow(data) {
    await this.completeNegativeBaseFlow(data)

    await this.uploadCsv()
    await this.enterNotes(data.notes)
    await this.enableCustomRequisition()
    await this.enablePatientDetails()
    await this.viewPatientDetails()
    await this.ClosePatientDetails()
    await this.uploadPdfTemplate()
    await this.placeOrder()
    await this.handleOrderConfirmation()
  }
}