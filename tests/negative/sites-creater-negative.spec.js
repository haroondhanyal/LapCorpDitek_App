import { test, expect } from '@playwright/test'
//test.describe.configure({ mode: 'serial' })

import users from '../../config/user.json' assert { type: 'json' }
import { loginUser } from '../../utils/auth.utils.js'
import { LoginPage } from '../../pages/login.page.js'
import { SitesPage } from '../../pages/directToPatient/sites.page.js'
import { generateSiteFormData } from '../../utils/faker/siteFaker.js'

const user = users.Users

// =====================================
// 🔐 LOGIN + GROUP BEFORE EACH TEST
// =====================================
test.beforeEach(async ({ page }) => {
  // 🔐 login + OTP
  await loginUser(page, {
    url: user.url,
    email: user.email,
    password: user.password
  })

  // 👥 group select
  const loginPage = new LoginPage(page)
  await loginPage.selectGroup('directToPatient')

  // 📄 open Sites page
  const sitesPage = new SitesPage(page)
  await sitesPage.openSitesPage()
})

// ======================================================
// ❌ SITES – NEGATIVE TEST CASES (NO AUTH FILE)
// ======================================================
test.describe('Sites – Negative Scenarios', () => {

test('NEG-01: Save without mandatory fields', async ({ page }) => {
  const sitesPage = new SitesPage(page)

  await sitesPage.clickAddNewSite()

  const saveBtn = page.locator('button:has-text("Save")')
  await expect(saveBtn).toBeDisabled()
})

  test('NEG-02: Invalid Site Number (alphabets)', async ({ page }) => {
    const sitesPage = new SitesPage(page)
    const data = generateSiteFormData()

    await sitesPage.clickAddNewSite()
    await sitesPage.enterSiteNumber('ABC12')
    await sitesPage.enterSiteName(data.siteName)
    await sitesPage.clickSave()

    await expect(
      page.locator('[aria-invalid="true"], .Mui-error')
    ).toHaveCountGreaterThan(0)
  })

  test('NEG-03: Duplicate Site Number', async ({ page }) => {
    const sitesPage = new SitesPage(page)

    await sitesPage.clickAddNewSite()
    await sitesPage.enterSiteNumber(1001) // existing
    await sitesPage.enterSiteName('Duplicate Site')
    await sitesPage.clickSave()

    await expect(
      page.locator('[aria-invalid="true"], .Mui-error')
    ).toHaveCountGreaterThan(0)
  })

  test('NEG-04: Invalid Zip Code', async ({ page }) => {
    const sitesPage = new SitesPage(page)
    const data = generateSiteFormData()

    await sitesPage.clickAddNewSite()
    await sitesPage.enterSiteNumber(data.siteNumber)
    await sitesPage.enterSiteName(data.siteName)
    await sitesPage.enterZipCode('12A4')
    await sitesPage.clickSave()

    await expect(
      page.locator('[aria-invalid="true"], .Mui-error')
    ).toHaveCountGreaterThan(0)
  })

  test('NEG-05: Billing address enabled but empty', async ({ page }) => {
    const sitesPage = new SitesPage(page)
    const data = generateSiteFormData()

    await sitesPage.clickAddNewSite()
    await sitesPage.enterSiteNumber(data.siteNumber)
    await sitesPage.enterSiteName(data.siteName)
    await sitesPage.enableDifferentBillingAddress()
    await sitesPage.clickSave()

    await expect(
      page.locator('[aria-invalid="true"], .Mui-error')
    ).toHaveCountGreaterThan(0)
  })

  test('NEG-06: Cancel should discard site creation', async ({ page }) => {
    const sitesPage = new SitesPage(page)
    const data = generateSiteFormData()

    await sitesPage.clickAddNewSite()
    await sitesPage.enterSiteNumber(data.siteNumber)
    await sitesPage.enterSiteName(data.siteName)
    await sitesPage.clickCancel()

    await expect(
      page.locator('[role="dialog"]')
    ).toBeHidden()
  })
})