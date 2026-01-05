import { test } from '@playwright/test';

import users from '../../config/user.json' assert { type: 'json' };

import { loginUser } from '../../utils/auth.utils.js';
import { LoginPage } from '../../pages/login.page.js';

import { OncologyBulkOrderPage } from '../../pages/OncologyFlow/bulkOrderCreation.page.js';
import { generateOncologyBulkOrderData } from '../../utils/faker/oncologyBulkOrder.faker.js';

test('Oncology – Bulk Order Complete Flow', async ({ page }) => {

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
  const bulkOrder = new OncologyBulkOrderPage(page);

  // ⭐ Generate faker data
  const data = generateOncologyBulkOrderData();

  console.log('🧩 Faker data generated');

  // ⭐ complete E2E bulk order flow
  await bulkOrder.completeOncologyBulkOrder(data);

  console.log('🎉 Bulk Oncology Order placed successfully');
});
