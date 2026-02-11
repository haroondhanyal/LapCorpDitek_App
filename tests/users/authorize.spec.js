const { test, expect } = require('@playwright/test');
const { BaseAPI } = require('../../apis/base.api');
const { AuthorizeAPI } = require('../../apis/users/authorize.api');
const payload = require('../../test-data/users/authorize.json');

test('Authorize User', async ({ request }) => {
  const api = new BaseAPI(request);
  const authorizeApi = new AuthorizeAPI(api);

  const response = await authorizeApi.authorizeUser(payload);
  
  console.log('Status:', response.status());
  const body = await response.json();
  console.log('Response:', body);
  
  expect(response.ok()).toBeTruthy();
  expect(body.status).toBe(200);
});