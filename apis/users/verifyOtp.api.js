class VerifyOtpAPI {
  constructor(api) {
    this.api = api;
  }

  verifyOtp(payload) {
    // payload must contain: email, otpCode
    return this.api.post(
      '/users/verify-otp',
      payload,  // This goes as query parameters
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

module.exports = { VerifyOtpAPI };