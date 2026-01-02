import { test } from '@playwright/test'
import { loginUser } from '../utils/auth.utils.js'
import users from '../config/user.json'
import { LoginPage } from '../pages/login.page.js'   // ✅ ADD THIS

test('Login with OTP (Static Backend OTP)', async ({ page }) => {

  const user = users.Users

  // 1️⃣ Login + OTP
  await loginUser(page, {
    url: user.url,
    email: user.email,
    password: user.password
  })

  console.log('➡️ OTP submitted, login flow completed')

  // 2️⃣ Create LoginPage instance  ✅ ADD THIS
  const loginPage = new LoginPage(page)

  // 3️⃣ Select group
  await loginPage.selectGroup('directToPatient')

  console.log('➡️ Direct to Patient selected, continued successfully')

  // 4️⃣ Keep window open
  await page.pause()
})
