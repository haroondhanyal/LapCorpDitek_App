class AuthorizeAPI {
  constructor(api) {
    this.api = api;
  }

  authorizeUser(payload) {
    // payload must contain: username, password, mfa, portal
    return this.api.post(
      '/users/authenticate-user',
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

module.exports = { AuthorizeAPI };