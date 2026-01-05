import { test } from '@playwright/test';

import users from '../../config/user.json' assert { type: 'json' };

import { loginUser } from '../../utils/auth.utils.js';

import { LoginPage } from '../../pages/login.page.js';
import { DirectToPatientPage } from '../../pages/directToPatient/direcToPatient.page.js';
import { getDirectToPatientData } from '../../utils/faker/directToPatient.faker.js';

// ⭐ REUSABLE ALLURE HELPERS ⭐
import {
  addAllureHeader,
  attachScreenshot,
  attachVideo
} from '../../utils/allure/allure.helper.js';

const user = users.Users;

// ⭐ RUN ONLY ONCE – ADD LOGO + HEADER ⭐
test.beforeAll(async () => {
  await addAllureHeader();
});

// ⭐ LOGIN BEFORE EVERY TEST ⭐
test.beforeEach(async ({ page }) => {
  await loginUser(page, {
    url: user.url,
    email: user.email,
    password: user.password
  });

  const loginPage = new LoginPage(page);
  await loginPage.selectGroup('directToPatient');

  console.log('✅ Login successful & group selected');
});

// ⭐ MAIN TEST ⭐
test('Direct to Patient – Complete Flow (CSV + PDF + Place Order)', async ({ page }) => {
  const directToPatientPage = new DirectToPatientPage(page);

  const fakerData = getDirectToPatientData();

  await directToPatientPage.completeDirectToPatientFlow(fakerData);

  console.log('✅ Order placed successfully');
});

// ⭐ AFTER EACH TEST – ADD SCREENSHOT + VIDEO INTO ALLURE ⭐
test.afterEach(async ({ page }, testInfo) => {
  await attachScreenshot(page, 'Final Screen');
  await attachVideo(testInfo);
});



//below is case 2

// test('Direct To Patient – Orders Page Verify', async ({ page }) => {

//  const ordersPage = new OrdersVerificationPage(page);

//   await ordersPage.goToOrders();

//   // await ordersPage.openTop5Plans();

//   console.log('✅ Orders page opened & top 5 plans verified');
//   await page.pause(); 
// });