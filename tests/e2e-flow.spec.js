const { test, expect } = require('@playwright/test');

const AuthAPI = require('../auth/auth.api');
const OTPApi = require('../apis/otp.api'); // 👈 IMPORTANT (same name)

test('Complete E2E API flow', async ({ request }) => {

  const auth = new AuthAPI(request);
  const otp = new OTPApi(request); 

  // 1️⃣ LOGIN
  const loginRes = await auth.login(
    'rharoon@medzah.com',
    'demouser1'
  );

  const loginBody = await loginRes.json();
  expect(loginBody.step).toBe('otp_required');

  // 2️⃣ OTP VERIFY
  const otpRes = await otp.verify(
    'rharoon@medzah.com',
    '123456'
  );

  expect(otpRes.ok()).toBeTruthy();

  const otpBody = await otpRes.json();
  const token = otpBody.token;
  expect(token).toBeTruthy();
});
