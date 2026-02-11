const BASE_URL =
  'https://labcorpwebapis-f9ephua7b7fgfbez.eastus2-01.azurewebsites.net';

class OTPApi {
  constructor(request) {
    this.request = request;
  }

  async verify(username, otp) {
    return await this.request.post(
      `${BASE_URL}/users/verify-otp`,
      {
        params: {
          username,
          otp
        }
      }
    );
  }

  async resend(username) {
    return await this.request.post(
      `${BASE_URL}/users/resend-otp`,
      {
        params: { username }
      }
    );
  }
}

module.exports = OTPApi;
