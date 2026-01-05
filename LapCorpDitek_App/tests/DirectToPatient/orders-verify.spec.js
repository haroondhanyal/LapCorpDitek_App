import { test } from '@playwright/test';

import users from '../../config/user.json' assert { type: 'json' };
import { loginUser } from '../../utils/auth.utils.js';

import { LoginPage } from '../../pages/login.page.js';
import { OrdersVerificationPage } from '../../pages/directToPatient/orders.page.js';

const user = users.Users;

test('Direct To Patient – Orders Page Verify', async ({ page }) => {

  // 🔐 Login again (fresh run)
  await loginUser(page, {
    url: user.url,
    email: user.email,
    password: user.password
  });

  // 🎯 Select Group
  const loginPage = new LoginPage(page);
  await loginPage.selectGroup('directToPatient');

  // 📄 Go to Orders
  const ordersPage = new OrdersVerificationPage(page);
  await ordersPage.goToOrders();

  // (optional)
  // await ordersPage.openTop5Plans();

  console.log('✅ Orders page opened successfully');
  // (optional)
//   await ordersPage.openTop5Plans();
//   console.log('✅ Orders selected sucessfully');
// await ordersPage.filtersClick();
// console.log('✅ Filters clicked sucessfully');


  // ⭐ open first order (change index as you like)
  await ordersPage.openOrderByIndex(0);

  console.log('✅ Order opened successfully');

  // ⭐ download CSV

  await ordersPage.csvFileDownload();

  console.log('✅  CSV File downloaded successfully');

// ⭐ download XLS
await ordersPage.xlsFileDownload();

console.log('✅  XLS File downloaded successfully');

// show patient details
await ordersPage.showPatientDetails();

console.log('✅  Patient details shown successfully');


await ordersPage.handleProtectedAccessPopup(1);

console.log('✅ Protected Access handled successfully');

// hide patient details
await ordersPage.hidePatientDetails();

console.log('✅  Patient details hidden successfully');

// openCloseFileView
await ordersPage.openCloseFileView();

console.log('✅  File view opened and closed successfully');  

  // Keep window open
  await page.pause();
});
