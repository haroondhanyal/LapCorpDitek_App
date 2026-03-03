import { test, expect } from '@playwright/test'
import users from '../../config/user.json' assert { type: 'json' }

import { loginUser } from '../../utils/auth.utils.js'
import { LoginPage } from '../../pages/login.page.js'
import { DirectToPatientPage } from '../../pages/directToPatient/direcToPatient.page.js'
import { getDirectToPatientData } from '../../utils/faker/directToPatient.faker.js'

// ⭐ ALLURE HELPERS ⭐
import {
  addAllureHeader,
  attachScreenshot,
  attachVideo
} from '../../utils/allure/allure.helper.js'

// ✅ FIX JSON ACCESS (adjust if needed)
const user = users.Users || users


// ======================================================
// ⭐ ADD ALLURE HEADER
// ======================================================
test.beforeAll(async () => {
  await addAllureHeader()
})


// ======================================================
// 🔐 LOGIN BEFORE EACH TEST
// ======================================================
test.beforeEach(async ({ page }) => {

  await loginUser(page, {
    url: user.url,
    email: user.email,
    password: user.password
  })

  const loginPage = new LoginPage(page)
  await loginPage.selectGroup('directToPatient')

  console.log('✅ Login successful & group selected')
})


// ======================================================
// ✅ DIRECT TO PATIENT — COMPLETE E2E FLOW
// ======================================================

test.describe('✅ Direct To Patient – E2E Happy Flow', () => {

  test('E2E-01: User successfully places Direct To Patient Order', async ({ page }) => {

    const directPage = new DirectToPatientPage(page)
    const data = getDirectToPatientData()

    // 🧾 Plan Details
    await directPage.fillPlanDetails(data)

    // 👤 Contact Details
    await directPage.fillContactDetails(data)

    // 🗓 Optional Fields
    await directPage.selectMailDate(data.mailDate)
    await directPage.fillLabTicket(data.labTicket)
    await directPage.fillSpecialInstructions(data.notes)

    // 📎 Upload CSV
    await directPage.uploadCsv()

    // 📝 After CSV
    await directPage.enterNotes(data.notes)
    await directPage.enableCustomRequisition()

    // 👨‍⚕ Patient Details
    await directPage.enablePatientDetails()
    await directPage.viewPatientDetails()
    await directPage.ClosePatientDetails()

    // 📄 Upload PDF
    await directPage.uploadPdfTemplate()

    // 🚀 Place Order
    await directPage.placeOrder()

    // ✅ Confirmation
    await directPage.handleOrderConfirmation()

    // ✅ Assertion
    const orderPlaced =
      await directPage.isOrderConfirmationVisible()

    expect(orderPlaced).toBeTruthy()

    console.log('🎉 Direct To Patient order placed successfully')
  })

})


// ======================================================
// ⭐ AFTER EACH TEST – ALLURE ATTACHMENTS
// ======================================================
test.afterEach(async ({ page }, testInfo) => {
  await attachScreenshot(page, 'Final Screen')
  await attachVideo(testInfo)
})