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

const user = users.Users

// ⭐ ADD ALLURE HEADER ONCE ⭐
test.beforeAll(async () => {
  await addAllureHeader()
})

// 🔐 LOGIN BEFORE EACH TEST
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
// ❌ DIRECT TO PATIENT – NEGATIVE TEST CASES (ALL IN ONE)
// ======================================================

test.describe('❌ Direct To Patient – Negative Scenarios', () => {

  test('NEG-01: Place Order without CSV upload', async ({ page }) => {
    const directPage = new DirectToPatientPage(page)
    const data = getDirectToPatientData()

    await directPage.fillPlanDetails(data)
    await directPage.fillContactDetails(data)
    await directPage.uploadPdfTemplate()
    await directPage.placeOrder()

    expect(await directPage.isOrderConfirmationVisible()).toBeFalsy()
  })

  test('NEG-02: Invalid CSV file upload', async ({ page }) => {
    const directPage = new DirectToPatientPage(page)

    await directPage.uploadInvalidCsv('test-files/csv/invalid.txt')

    const error = await directPage.getValidationError()
    expect(error).toBeTruthy()
  })

  test('NEG-03: Notes max length exceeded', async ({ page }) => {
    const directPage = new DirectToPatientPage(page)

    const longNotes = 'A'.repeat(5000)
    await directPage.enterNotes(longNotes)

    const error = await directPage.getValidationError()
    expect(error).toContain('limit')
  })

  test('NEG-04: Custom Requisition enabled but empty', async ({ page }) => {
    const directPage = new DirectToPatientPage(page)

    await directPage.enableCustomRequisition()
    await directPage.placeOrder()

    const error = await directPage.getValidationError()
    expect(error).toBeTruthy()
  })

  test('NEG-05: Patient details enabled but not saved', async ({ page }) => {
    const directPage = new DirectToPatientPage(page)

    await directPage.enablePatientDetails()
    await directPage.viewPatientDetails()
    await directPage.ClosePatientDetails()
    await directPage.placeOrder()

    expect(await directPage.isOrderConfirmationVisible()).toBeFalsy()
  })

  test('NEG-06: PDF not uploaded', async ({ page }) => {
    const directPage = new DirectToPatientPage(page)
    const data = getDirectToPatientData()

    await directPage.fillPlanDetails(data)
    await directPage.fillContactDetails(data)
    await directPage.uploadCsv()
    await directPage.placeOrder()

    expect(await directPage.isOrderConfirmationVisible()).toBeFalsy()
  })

  test('NEG-07: Invalid PDF format', async ({ page }) => {
    const directPage = new DirectToPatientPage(page)

    await directPage.uploadInvalidPdf('test-files/pdf/invalid.docx')

    const error = await directPage.getValidationError()
    expect(error).toBeTruthy()
  })

  test('NEG-08: Place Order API failure', async ({ page }) => {
    await page.route('**/placeOrder**', route =>
      route.fulfill({ status: 500 })
    )

    const directPage = new DirectToPatientPage(page)
    const data = getDirectToPatientData()

    await directPage.completeDirectToPatientFlow(data)

    expect(await directPage.isOrderConfirmationVisible()).toBeFalsy()
  })

})

// ⭐ AFTER EACH TEST – ALLURE ATTACHMENTS ⭐
test.afterEach(async ({ page }, testInfo) => {
  await attachScreenshot(page, 'Final Screen')
  await attachVideo(testInfo)
})
