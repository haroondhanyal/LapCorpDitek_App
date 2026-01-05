import { test } from '@playwright/test';

import users from '../../config/user.json' assert { type: 'json' };
import { loginUser } from '../../utils/auth.utils.js';

import { LoginPage } from '../../pages/login.page.js';
import { SitesPage } from '../../pages/directToPatient/sites.page.js';

import { generateSiteFormData  } from '../../utils/faker/siteFaker.js';

const user = users.Users;

test('Add New Site – Complete Flow', async ({ page }) => {

  // 🔐 Login
  await loginUser(page, {
    url: user.url,
    email: user.email,
    password: user.password
  });

  // 🎯 Select group
  const loginPage = new LoginPage(page);
  await loginPage.selectGroup('directToPatient');

  // 🟢 Open Sites page
  const sitesPage = new SitesPage(page);
  await sitesPage.openSitesPage();

  // 🎲 Generate fake data
  const siteData = generateSiteFormData ();

  // 🏁 Create Site
  await sitesPage.createSite(siteData);

  console.log('✅ E2E Site creation test completed');

  await page.pause(); // optional
});
