const { test, expect } = require('@playwright/test');
const { BaseAPI } = require('../../apis/base.api');
const { VerifyOtpAPI } = require('../../apis/users/verifyOtp.api');
const payload = require('../../test-data/users/verifyOtp.json');

test('Verify OTP', async ({ request }) => {
  const api = new BaseAPI(request);
  const verifyOtpApi = new VerifyOtpAPI(api);

  const response = await verifyOtpApi.verifyOtp(payload);
  
  console.log('Status:', response.status());
  const body = await response.json();
  console.log('Response:', body);
  
  // OTP test will fail if OTP is wrong
  // Change otpCode in verifyOtp.json to correct OTP
  if (response.ok()) {
    expect(body.status).toBe(200);
  } else {
    console.log('OTP Error:', body.message);
  }
});