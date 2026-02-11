const { test, expect } = require('@playwright/test');
const { BaseAPI } = require('../../apis/base.api');
const { AuthorizeAPI } = require('../../apis/users/authorize.api');

test.describe('Simple Token Tests', () => {
  test('Get token and test basic auth', async ({ request }) => {
    const api = new BaseAPI(request);
    const authorizeApi = new AuthorizeAPI(api);
    
    const credentials = {
      username: 'rharoon@medzah.com',
      password: 'demouser1',
      mfa: 'false',
      portal: 'ditek'
    };
    
    const response = await authorizeApi.authorizeUser(credentials);
    expect(response.ok()).toBeTruthy();
    
    const body = await response.json();
    
    console.log('✅ Token received!');
    console.log('Access Token expires in:', body.token?.expires_in, 'seconds');
    console.log('Refresh Token expires in:', body.token?.refresh_expires_in, 'seconds');
    
   
    // setToken(body.token);
  });
});