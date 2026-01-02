import { test } from '@playwright/test'
import { loginUser } from '../utils/auth.utils.js'
import users from '../config/user.json'

test('Dashboard should be visible after login', async ({ page }) => {

  const user = users.Users   

  await loginUser(page, {
    url: user.url,
    email: user.email,
    password: user.password
  })

  // browser open rahe
  await page.pause()
})
