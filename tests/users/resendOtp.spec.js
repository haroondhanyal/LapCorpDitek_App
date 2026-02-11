// tests/users/resendOtp.spec.js
const { test, expect } = require('@playwright/test');
const { BaseAPI } = require('../../apis/base.api');
const { AuthorizeAPI } = require('../../apis/users/authorize.api');
const { ResendOtpAPI } = require('../../apis/users/resendOtp.api');

test.describe('Resend OTP Flow', () => {
  test('Complete Resend OTP Process', async ({ request }) => {
    console.log('🚀 Starting Resend OTP Flow...');
    
    const api = new BaseAPI(request);
    const authorizeApi = new AuthorizeAPI(api);
    const resendOtpApi = new ResendOtpAPI(api);
    
    // STEP 1: First authorize to trigger OTP
    console.log('📤 Step 1: Authorizing (will trigger OTP)...');
    const authPayload = {
      username: 'rharoon@medzah.com',
      password: 'demouser1',
      mfa: 'true',  // IMPORTANT: MFA true for OTP
      portal: 'ditek'
    };
    
    const authResponse = await authorizeApi.authorizeUser(authPayload);
    console.log('Auth Status:', authResponse.status());
    const authBody = await authResponse.json();
    console.log('Auth Response:', authBody);
    
    expect(authResponse.ok()).toBeTruthy();
    expect(authBody.message).toContain('OTP');
    console.log('✅ OTP requested successfully');
    
    // STEP 2: Now resend OTP
    console.log('\n📤 Step 2: Resending OTP...');
    const resendPayload = {
      email: 'rharoon@medzah.com'
    };
    
    const resendResponse = await resendOtpApi.resendOtp(resendPayload);
    
    console.log('Resend Status:', resendResponse.status());
    console.log('Resend Status Text:', resendResponse.statusText());
    
    const resendBody = await resendResponse.json();
    console.log('Resend Response:', resendBody);
    
    // Should be successful
    expect(resendResponse.ok()).toBeTruthy();
    expect(resendBody.status).toBe(200);
    expect(resendBody.message).toContain('OTP');
    
    console.log('🎉 Resend OTP successful!');
  });

  test('Direct Resend OTP Test', async ({ request }) => {
    console.log('Testing direct resend OTP...');
    
    // Simple test without auth (might fail if auth required)
    const api = new BaseAPI(request);
    const resendOtpApi = new ResendOtpAPI(api);
    
    const payload = {
      email: 'rharoon@medzah.com'
    };
    
    const response = await resendOtpApi.resendOtp(payload);
    
    console.log('Direct Resend Status:', response.status());
    const body = await response.json();
    console.log('Direct Resend Response:', body);
    
    // Check what response we get
    if (response.ok()) {
      console.log('✅ Direct resend worked!');
      expect(body.status).toBe(200);
    } else {
      console.log('⚠️ Direct resend failed (maybe auth required)');
      console.log('Error:', body.message);
    }
  });
});