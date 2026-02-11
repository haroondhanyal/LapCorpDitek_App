// apis/users/resendOtp.api.js
class ResendOtpAPI {
  constructor(api) {
    this.api = api;
  }

  resendOtp(payload) {
    // payload should contain: email
    return this.api.post(
      '/users/resend-otp',
      payload,
      null,
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }
    );
  }
}

module.exports = { ResendOtpAPI };