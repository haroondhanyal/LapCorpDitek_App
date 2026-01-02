import { test } from '@playwright/test';

import users from '../../config/user.json' assert { type: 'json' };

import { loginUser } from '../../utils/auth.utils.js';
import { LoginPage } from '../../pages/login.page.js';

import { AddNewSitePage } from '../../pages/singleSite/sitesFlow.page.js';
import { generateAddNewSiteData } from '../../utils/faker/singleSiteData.faker.js';

test('Single Site – Complete E2E Order Flow', async ({ page }) => {

  const user = users.Users;

  // ⭐ LOGIN
  await loginUser(page, {
    url: user.url,
    email: user.email,
    password: user.password
  });

  console.log('🟢 Logged in successfully');

  // ⭐ SELECT GROUP
  const loginPage = new LoginPage(page);
  await loginPage.selectGroup('singleSite');

  console.log('🟢 Single Site group selected');

  // ⭐ PAGE OBJECT
  const addSite = new AddNewSitePage(page);

  // ⭐ FAKE DATA
  const data = generateAddNewSiteData();

  // ⭐ FULL FLOW
  await addSite.completeAddNewSiteFlow(data);

  console.log('🎉 Add New Site successfully automated');

  await page.pause(); // optional debug
});
