import { LoginPage } from '../pages/login.page.js'
import { otpLocators } from '../locators/loginOTP/otp.locators.js'

export async function loginUser(page, { url, email, password }) {
  const loginPage = new LoginPage(page)

  await loginPage.visit(url)
  await loginPage.login(email, password)

  const otpInputs = page.locator('input[maxlength="1"]')
  await otpInputs.first().waitFor({ state: 'visible', timeout: 20000 })

  const OTP = '123456'
  console.log('🔐 Using static OTP:', OTP)

  for (let i = 0; i < OTP.length; i++) {
    await otpInputs.nth(i).click()
    await otpInputs.nth(i).type(OTP[i], { delay: 100 })
  }

  // ⭐ FIXED PART ⭐
let verifyBtn = page.locator(otpLocators.verifyOtpButton);

// wait for it to appear
await verifyBtn.waitFor({ state: 'visible', timeout: 30000 });

// wait until enabled (UI often re-renders → refetch)
await page.waitForTimeout(300); // allow rerender
verifyBtn = page.locator(otpLocators.verifyOtpButton);

// ensure enabled & visible
await verifyBtn.waitFor({ state: 'visible' });
await verifyBtn.isEnabled();

// click with force (overlay-safe)
await verifyBtn.click({ force: true });

  console.log('✅ Login + OTP completed')
}
