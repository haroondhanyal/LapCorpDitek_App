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
    await DirectToPatientLocators.planName(this.page)
      .fill(data.planName)

    await DirectToPatientLocators.planAddress(this.page)
      .fill(data.planAddress)

    await DirectToPatientLocators.city(this.page)
      .fill(data.city)

    await DirectToPatientLocators.state(this.page)
      .fill(data.state)

    await DirectToPatientLocators.zipCode(this.page)
      .fill(data.zipCode)
  }

  // =================================================
  // 👤 CONTACT DETAILS
  // =================================================
  async fillContactDetails(data) {
    await DirectToPatientLocators.contactName(this.page)
      .fill(data.contactName)

    await DirectToPatientLocators.contactPhone(this.page)
      .fill(data.contactPhone)

    const address =
      DirectToPatientLocators.contactAddress(this.page)

    if (await address.count() > 0) {
      await address.first().fill(data.contactAddress)
    }
  }

  // =================================================
  // 📝 SPECIAL INSTRUCTIONS
  // =================================================
  async fillSpecialInstructions(instructions) {
    if (instructions) {
      await DirectToPatientLocators
        .specialInstructions(this.page)
        .fill(instructions)
    }
  }

  // =================================================
  // 📅 MAIL DATE
  // =================================================
  async selectMailDate(mailDate) {
    if (mailDate) {
      await DirectToPatientLocators
        .mailDate(this.page)
        .fill(mailDate)
    }
  }

  // =================================================
  // 🧪 LAB TICKET
  // =================================================
  async fillLabTicket(labTicket) {
    if (labTicket) {
      await DirectToPatientLocators
        .labTicket(this.page)
        .fill(labTicket)
    }
  }

  // =================================================
  // 📎 CSV UPLOAD
  // =================================================
  async uploadCsv() {
    await DirectToPatientLocators
      .csvFileInput(this.page)
      .setInputFiles(filePaths.csvSample)

    console.log('🟢 CSV uploaded')
  }

  // =================================================
  // 🧾 AFTER CSV – PATIENT / REQUISITION FIELDS
  // =================================================

  // ✏️ Notes
  async enterNotes(notes) {
    if (notes) {
      await DirectToPatientLocators
        .enterNotes(this.page)
        .fill(notes)

      console.log('🟢 Notes entered')
    }
  }

 async enableCustomRequisition() {
  await DirectToPatientLocators
    .customRequisitionInput(this.page)
    .click()

  console.log('🟢 Custom Requisition checkbox enabled')
}

  // 📎 Patient Details 
async enablePatientDetails() {
  await DirectToPatientLocators
    .patientDetailsInput(this.page)
    .click()

  console.log('🟢 Patient Details checkbox enabled')
}

  // 👁️ View + Close Patient Details
  async viewPatientDetails() {
    await DirectToPatientLocators
      .viewPatientDetailsButton(this.page)
      .click()
    console.log('🟢 Patient details viewed')
  }

   async ClosePatientDetails() {
    await DirectToPatientLocators
      .closePatientDetailsIcon(this.page)
      .click()

    console.log('🟢 Patient details  closed')
  }

  // =================================================
  // 📎 PDF UPLOAD
  // =================================================
  async uploadPdfTemplate() {
    await DirectToPatientLocators
      .pdfFileInput(this.page)
      .setInputFiles(filePaths.pdfSample)

    console.log('🟢 PDF uploaded')
  }

  // =================================================
  // 🚀 PLACE ORDER
  // =================================================
  async placeOrder() {

  // 1️⃣ wait for loader to disappear
  await this.page.locator('div[class*="loaderOverlay"]').waitFor({
    state: 'hidden',
    timeout: 60000
  });

  // 2️⃣ ensure button is enabled & visible
  const button = DirectToPatientLocators.placeOrderButton(this.page);
  await button.waitFor({ state: 'visible' });
  await this.page.waitForLoadState('networkidle');

  // 3️⃣ click
  await button.click();

  console.log('🟢 Place Order clicked');
}

 // order confirmation handling

async handleOrderConfirmation() {

  // 👉 safety check
  if (this.page.isClosed()) {
    console.log('⚠ Page already closed — skipping confirmation handling')
    return
  }

  const modal = DirectToPatientLocators.orderConfirmationModal(this.page)

  console.log('⏳ Waiting for Order Confirmation modal...')

  try {

    // // 1️⃣ modal enters DOM
    // await modal.waitFor({ state: 'attached', timeout: 60000 })

    // 2️⃣ small animation wait
    await this.page.waitForTimeout(1000)

    // 3️⃣ modal becomes visible
    await modal.waitFor({ state: 'visible', timeout: 60000 })

    console.log('🟢 Order Confirmation modal appeared')

    // 4️⃣ button locator
    const submitAdditionalBtn =
      DirectToPatientLocators.submitAdditionalOrderButton(this.page)

    // 5️⃣ wait for button visible
    await submitAdditionalBtn.waitFor({
      state: 'visible',
      timeout: 40000
    })

    // 6️⃣ click button
    await submitAdditionalBtn.click()

    console.log('🟢 Submit Additional Order clicked')

  } catch (e) {
    console.log('⚠ Modal did NOT appear or page closed')
    console.log('Error:', e.message)
  }
}

  // =================================================
  // ✅ COMPLETE E2E FLOW (ONE CALL)
  // =================================================
  async completeDirectToPatientFlow(data) {
    // 1️⃣ Basic details
    await this.fillPlanDetails(data)
    await this.fillContactDetails(data)
    await this.fillSpecialInstructions(data.specialInstructions)

    // 2️⃣ Extra details
    await this.selectMailDate(data.mailDate)
    await this.fillLabTicket(data.labTicket)

    // 3️⃣ Uploads
    await this.uploadCsv()

    // 4️⃣ AFTER CSV
    await this.enterNotes(data.notes)
    await this.enableCustomRequisition()
    await this.enablePatientDetails()
    await this.viewPatientDetails()
    await this.ClosePatientDetails()

    // 5️⃣ PDF + Submit
    await this.uploadPdfTemplate()
    await this.placeOrder()
      // 🧾 WAIT & HANDLE CONFIRMATION MODAL
  await this.handleOrderConfirmation()
  }
}


