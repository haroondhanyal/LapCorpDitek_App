const BASE_URL =
  'https://labcorpwebapis-f9ephua7b7fgfbez.eastus2-01.azurewebsites.net';

class AuthAPI {
  constructor(request) {
    this.request = request;
  }

  async login(payload) {
    return await this.request.post(
      `${BASE_URL}/users/authenticate-user`,
      {
        params: {
          username: payload.username,
          password: payload.password,
          mfa: payload.mfa ?? true,
          portal: payload.portal ?? 'ditek'
        }
      }
    );
  }
}

module.exports = AuthAPI;
