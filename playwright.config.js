// @ts-check
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({

  testDir: './tests',

  // ⭐ GLOBAL TEST TIMEOUT INCREASED TO 3 MINUTES
  timeout: 180000, // <-- added

  /* Parallel execution */
  fullyParallel: true,

  /* Safety on CI */
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,

  /* Reports */
  reporter: [
    ['html', { open: 'never' }],
  ['list'],
  ['allure-playwright']
  ],

  /* Global settings */
  use: {
    baseURL: 'https://dev-labcorp.ditekapp.com',
    headless: false,
    // screenshot: 'only-on-failure',
    screenshot: 'on',
    // video: 'retain-on-failure',
    video: 'on',
    trace: 'retain-on-failure',
    viewport: { width: 1920, height: 1080 },
    // viewport: null,
    actionTimeout: 15000,
    navigationTimeout: 180000,
  },

  /* Browsers — ONLY CHROMIUM ENABLED */
  projects: [
    {
      name: 'Chromium',
      use: { ...devices['Desktop Chrome'] },
    }
  ],

});
