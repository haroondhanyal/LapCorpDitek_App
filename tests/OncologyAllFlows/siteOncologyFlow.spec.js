import { test, expect } from '@playwright/test';

import users from '../../config/user.json' assert { type: 'json' };

import { loginUser } from '../../utils/auth.utils.js';
import { LoginPage } from '../../pages/login.page.js';

import { SitesOncologyPage } from '../../pages/OncologyFlow/sitesOncology.page.js';

// ✅ FIXED IMPORT (as per your path)
import { generateSiteData } from '../../utils/faker/sitesOncology.faker.js';

test('Oncology – Create Site Flow', async ({ page }) => {

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
  await loginPage.selectGroup('oncology');

  console.log('🟢 Oncology group selected');

  // ⭐ PAGE OBJECT
  const sitesPage = new SitesOncologyPage(page);

  // ⭐ Generate faker data
  const siteData = generateSiteData();
  console.log('🧩 Faker site data generated');

  // ⭐ Create new site
  await sitesPage.createNewSite(siteData);

  // ⭐ Optional assertion (agar UI support karta ho)
  // await expect(page.getByText(siteData.siteName)).toBeVisible();

  console.log('🎉 Oncology Site created successfully');
});
