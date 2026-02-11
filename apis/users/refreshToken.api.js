class RefreshTokenAPI {
  constructor(api) {
    this.api = api;
  }

  refreshToken(payload) {
    return this.api.post(
      '/users/refresh-token',  // Check endpoint
      payload,                 // Query params
      null,                    // No body
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  }
}

module.exports = { RefreshTokenAPI };