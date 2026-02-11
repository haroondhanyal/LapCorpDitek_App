const { test, expect } = require('@playwright/test');

const AuthAPI = require('../auth/auth.api');
const OTPApi = require('../apis/otp.api');
const { setToken } = require('../utils/tokenManager');

const loginData = require('../auth/login.json');

test('User Login + OTP + Save Token', async ({ request }) => {

  const auth = new AuthAPI(request);
  const otpApi = new OTPApi(request);

  // 1️⃣ LOGIN
  const loginRes = await auth.login(loginData);
  expect(loginRes.status()).toBe(200);

  const loginBody = await loginRes.json();
  console.log('AUTH RESPONSE:', loginBody);

  expect(loginBody.step).toBe('otp_required');

  //  MANUAL OTP comes from the email ( hard coded provided for testing)
  const otpCode = '123456'; 

  // 2️⃣ VERIFY OTP
  const otpRes = await otpApi.verify(loginData.username, otpCode);
  expect(otpRes.status()).toBe(200);

  const otpBody = await otpRes.json();
  console.log('OTP RESPONSE:', otpBody);

  const token =
    otpBody.token ||
    otpBody.access_token ||
    otpBody.accessToken;

  setToken(token);
  expect(token).toBeTruthy();
});
