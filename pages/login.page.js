import { BasePage } from './base.page.js'
import { LoginSelectors } from '../locators/login/login.selectors.js'
import { SelectGroupSelectors } from '../locators/login/selectGroup.locators.js'

export class LoginPage extends BasePage {
  constructor(page) {
    super(page)

    // 🔐 Login Locators
    this.emailInput = this.getLocator(LoginSelectors.email)
    this.passwordInput = this.getLocator(LoginSelectors.password)
    this.rememberCheckbox = this.getLocator(LoginSelectors.rememberMe)
    this.signInButton = this.getLocator(LoginSelectors.signIn)

    // 👥 Group Selection Locators
    this.groupSelectors = SelectGroupSelectors
  }

  // 🔐 Login action
  async login(email, password) {
    await this.emailInput.waitFor({ state: 'visible', timeout: 10000 })
    await this.emailInput.fill(email)
    await this.passwordInput.fill(password)

    if (await this.rememberCheckbox.isVisible()) {
      await this.rememberCheckbox.check()
    }

    await this.signInButton.click()
  }

  // 👥 Group selection AFTER OTP (FINAL FIX)
 async selectGroup(groupName) {
  const groupLocator = this.groupSelectors[groupName]

  if (!groupLocator) {
    throw new Error(`❌ Invalid group name: ${groupName}`)
  }

 // 1️⃣ Locate & click group (Playwright auto-waits)
  const groupButton = this.page.locator(groupLocator)
  await groupButton.click({ timeout: 20000 })
  console.log(`🟢 Group clicked: ${groupName}`)

  // 2️⃣ Click Continue
  const continueBtn = this.page.locator(this.groupSelectors.continue)
  await continueBtn.click({ timeout: 20000 })
  console.log('🟢 Continue button clicked')

  console.log(`✅ Group selected successfully: ${groupName}`)
}

}
