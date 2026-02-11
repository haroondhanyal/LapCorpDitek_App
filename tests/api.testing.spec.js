const { test, expect } = require('@playwright/test');

test('Setting base URL here', async ({ request }) => {
  const response = await request.get('https://restful-booker.herokuapp.com/booking');

  expect(response.ok()).toBeTruthy();
  console.log(await response.json());
});
