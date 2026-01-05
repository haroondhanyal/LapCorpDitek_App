import { test } from '@playwright/test';

import users from '../../config/user.json' assert { type: 'json' };

import { loginUser } from '../../utils/auth.utils.js';
import { LoginPage } from '../../pages/login.page.js';

import { SingleSitePage } from '../../pages/singleSite/singleSite.page.js';
import { getSingleSiteData } from '../../utils/faker/singleSite.faker.js';

test('Single Site – Complete E2E Order Flow', async ({ page }) => {

  const user = users.Users;

  // ⭐ 1) LOGIN + OTP
  await loginUser(page, {
    url: user.url,
    email: user.email,
    password: user.password
  });

  console.log('🟢 Logged in successfully');

  // ⭐ 2) SELECT GROUP → Single Site
  const loginPage = new LoginPage(page);
  await loginPage.selectGroup('singleSite');

  console.log('🟢 Single Site group selected');

  // ⭐ 3) CREATE PAGE INSTANCE
  const singleSitePage = new SingleSitePage(page);

  // ⭐ 4) TEST DATA USING FAKER
  const data = getSingleSiteData();

  // ⭐ 5) RUN COMPLETE FLOW
  await singleSitePage.completeSingleSiteFlow(data);

  console.log('🎉 Single Site E2E flow completed successfully');

  await page.pause(); // optional debug
});
